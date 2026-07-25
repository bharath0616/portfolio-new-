import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { site } from '@/content/site';

/**
 * Contact endpoint.
 *
 * Uses Resend when `RESEND_API_KEY` is configured and degrades to a logged,
 * accepted submission otherwise — so the form is never broken in an environment
 * that has not been given credentials yet. The UI surfaces a mailto fallback either
 * way, meaning a visitor always has a working path to reach out.
 */

export const runtime = 'nodejs';

/**
 * In-memory rate limit: 3 submissions per IP per 10 minutes.
 *
 * Adequate for a single-instance portfolio deployment. On a multi-instance or
 * fully serverless host this state is per-instance and resets on cold start —
 * move it to Upstash/Redis if that becomes a real concern.
 */
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many messages. Please try again later.' },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Please check the form and try again.' },
        { status: 400 },
      );
    }

    const { name, email, company, message, website } = parsed.data;

    // Honeypot tripped — respond 200 so the bot believes it succeeded.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // No mail provider configured. Accept the submission rather than showing the
      // visitor an error for a deployment-configuration gap.
      console.error('[contact] RESEND_API_KEY not set — submission not delivered:', {
        name,
        email,
      });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: site.email,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Could not send right now. Please email me directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[contact] Unexpected error:', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please email me directly.' },
      { status: 500 },
    );
  }
}
