'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { site, socials } from '@/content/site';
import { socialIcons } from '@/lib/icons';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { SectionGlow } from '@/components/ui/Backdrop';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact.
 *
 * The original site offered a mailto icon only. This adds a validated form while
 * keeping the direct email address visible and one-click copyable — some people
 * will always prefer their own mail client, and a form that is the only path is a
 * dead end when it fails.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { copied, copy } = useCopyToClipboard();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    // Validate on blur, then live once a field has errored — immediate validation
    // while someone is mid-word is hostile.
    mode: 'onTouched',
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Could not send your message.');
      }

      setStatus('sent');
      reset();
      window.setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please email me directly.',
      );
    }
  };

  return (
    <Section id="contact" className="relative">
      <SectionGlow className="top-0" tone="primary" />

      <div className="container-page">
        <SectionHeader
          id="contact"
          eyebrow="Contact"
          title="Get in touch"
          description="Send me a message here or email me directly."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Direct channels */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
                Direct
              </h3>

              {/* Email + copy affordance */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2.5 text-xl font-semibold text-fg transition-colors hover:text-primary"
                >
                  <Mail className="size-5 shrink-0 text-primary" aria-hidden />
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={() => void copy(site.email)}
                  className={cn(
                    'inline-flex size-9 items-center justify-center rounded-full',
                    'border border-line-subtle text-fg-muted transition-colors',
                    'hover:bg-tint hover:text-fg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                >
                  {copied ? (
                    <Check className="size-4 text-signal" aria-hidden />
                  ) : (
                    <Copy className="size-4" aria-hidden />
                  )}
                </button>
                {/* Politely announced to screen readers without stealing focus. */}
                <span role="status" aria-live="polite" className="sr-only">
                  {copied ? 'Email address copied to clipboard' : ''}
                </span>
              </div>

              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="inline-flex w-fit items-center gap-2.5 text-base text-fg-muted transition-colors hover:text-fg"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {site.phone}
              </a>

              <p className="inline-flex items-center gap-2.5 text-base text-fg-muted">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {site.location}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
                Elsewhere
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <li key={social.label}>
                      <Magnetic strength={0.3}>
                        <a
                          href={social.href}
                          target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className={cn(
                            'inline-flex items-center gap-2 rounded-full border border-line-subtle',
                            'bg-tint-weak px-4 py-2.5 text-sm text-fg-secondary',
                            'transition-colors duration-250 hover:bg-tint hover:text-fg',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                          )}
                        >
                          <Icon className="size-4 shrink-0" aria-hidden />
                          {social.label}
                          <ArrowUpRight className="size-3 opacity-50" aria-hidden />
                        </a>
                      </Magnetic>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="rounded-[var(--radius-card)] border border-line-subtle bg-tint-weak p-5 text-sm leading-relaxed text-fg-muted">
              Currently an {site.currentTitle} at {site.currentCompany}.{' '}
              <span className="text-fg">Open to software engineering and AI roles.</span>
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5 rounded-[var(--radius-panel)] border border-line-subtle bg-elevated p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    error={errors.name?.message}
                    required
                    {...register('name')}
                    autoComplete="name"
                    placeholder="Jane Doe"
                  />
                  <Field
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    required
                    {...register('email')}
                    autoComplete="email"
                    placeholder="jane@company.com"
                  />
                </div>

                <Field
                  label="Company"
                  hint="Optional"
                  error={errors.company?.message}
                  {...register('company')}
                  autoComplete="organization"
                  placeholder="Where you're writing from"
                />

                <Field
                  label="Message"
                  as="textarea"
                  error={errors.message?.message}
                  required
                  {...register('message')}
                  placeholder="What would you like to talk about?"
                  rows={5}
                />

                {/* Honeypot — hidden from users, irresistible to bots. Not `display:none`,
                    which some bots specifically skip. */}
                <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website')}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={cn(
                      'inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7',
                      'bg-fg text-sm font-medium text-[color:var(--bg-base)]',
                      'transition-[transform,box-shadow,opacity] duration-250',
                      'hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:scale-[0.97]',
                      'disabled:pointer-events-none disabled:opacity-60',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
                    )}
                  >
                    {status === 'sending' ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : status === 'sent' ? (
                      <Check className="size-4" aria-hidden />
                    ) : (
                      <Send className="size-4" aria-hidden />
                    )}
                    {status === 'sending'
                      ? 'Sending…'
                      : status === 'sent'
                        ? 'Message sent'
                        : 'Send message'}
                  </button>

                  <p className="text-xs text-fg-faint">
                    Or email{' '}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-fg-muted underline underline-offset-2 transition-colors hover:text-primary"
                    >
                      directly
                    </a>
                    .
                  </p>
                </div>

                {/* Status region — `aria-live` announces the result without moving focus. */}
                <div role="status" aria-live="polite" className="min-h-0">
                  <AnimatePresence mode="wait">
                    {status === 'sent' && (
                      <motion.p
                        key="sent"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 rounded-lg border border-[color-mix(in_oklab,var(--brand-signal)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-signal)_10%,transparent)] px-4 py-3 text-sm text-signal"
                      >
                        <Check className="size-4 shrink-0" aria-hidden />
                        Thanks! I got your message and I&apos;ll get back to you soon.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg border border-[color-mix(in_oklab,var(--color-error)_30%,transparent)] bg-[color-mix(in_oklab,var(--color-error)_10%,transparent)] px-4 py-3 text-sm text-[color:var(--color-error)]"
                      >
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  as?: 'input' | 'textarea';
  required?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'ref'
>;

/**
 * Form field.
 *
 * Uses a real `<label htmlFor>` (not a placeholder-as-label, which disappears the
 * moment someone types) and wires `aria-invalid` + `aria-describedby` to the error,
 * so a screen reader announces the problem with the field rather than separately.
 *
 * `forwardRef` is required for react-hook-form: `register()` returns a ref that must
 * reach the underlying DOM node for uncontrolled validation to work at all.
 */
const Field = forwardRef<HTMLInputElement & HTMLTextAreaElement, FieldProps>(function Field(
  { label, error, hint, as = 'input', required, name, ...props },
  ref,
) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const Tag = as as React.ElementType;

  const classes = cn(
    'w-full rounded-xl border bg-subtle px-4 py-3 text-sm text-fg',
    'transition-[border-color,box-shadow] duration-200',
    'placeholder:text-fg-faint',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0',
    error ? 'border-[var(--color-error)]' : 'border-line-subtle focus:border-primary',
    as === 'textarea' && 'resize-y min-h-32',
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 text-sm font-medium text-fg-secondary"
      >
        {label}
        {required && (
          <span className="text-[color:var(--color-error)]" aria-hidden>
            *
          </span>
        )}
        {hint && <span className="text-xs text-fg-faint">{hint}</span>}
      </label>

      <Tag
        ref={ref}
        id={id}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        className={classes}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-xs text-[color:var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
});
