import Image from 'next/image';
import { Compass, Gamepad2, Plane, Trophy } from 'lucide-react';
import { site } from '@/content/site';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';
import { Panel } from '@/components/ui/Card';

/** Interests, preserved from the original site but given structure and icons. */
const interests = [
  { icon: Trophy, label: 'Sports' },
  { icon: Plane, label: 'Travelling' },
  { icon: Compass, label: 'Cubing' },
  { icon: Gamepad2, label: 'E-sports' },
] as const;

/** Facts a recruiter scans for before reading prose. */
const quickFacts = [
  { label: 'Currently', value: `${site.currentTitle} at ${site.currentCompany}` },
  { label: 'Based in', value: site.location },
  { label: 'Certifications', value: 'Google, Anthropic, Microsoft, AWS' },
  { label: 'Work on', value: 'Salesforce, web development' },
] as const;

/**
 * About — a server component. Static content should never cost the client any JS.
 *
 * Layout is asymmetric (7/5) rather than a centered column, so the section has its
 * own identity while still reading top-to-bottom on mobile.
 */
export function About() {
  return (
    <Section id="about">
      <div className="container-page">
        <SectionHeader
          id="about"
          eyebrow="About"
          title="About me"
          description="Software engineer from Hyderabad, working at PwC since July 2025."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Narrative */}
          <div className="lg:col-span-7">
            <StaggerGroup className="flex flex-col gap-6" stagger={0.08}>
              {site.bio.map((paragraph, index) => (
                <RevealItem key={index}>
                  <p
                    className={
                      index === 0
                        ? 'text-xl leading-relaxed text-fg'
                        : 'text-base leading-relaxed text-fg-muted'
                    }
                  >
                    {paragraph}
                  </p>
                </RevealItem>
              ))}
            </StaggerGroup>

            {/* Quick facts — a definition list, which is both the right semantics
                and the fastest scannable format for this content. */}
            <Reveal delay={0.1}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-subtle bg-[var(--border-subtle)] sm:grid-cols-2">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1.5 bg-canvas p-5">
                    <dt className="font-mono text-2xs uppercase tracking-[0.16em] text-fg-faint">
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-medium text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
                  Outside of work
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {interests.map((interest) => (
                    <li
                      key={interest.label}
                      className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-tint-weak px-3.5 py-1.5 text-sm text-fg-secondary"
                    >
                      <interest.icon className="size-3.5 text-primary" aria-hidden />
                      {interest.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <Panel className="overflow-hidden p-0">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-subtle">
                  <Image
                    src="/avatar.png"
                    alt={`Portrait of ${site.name}`}
                    fill
                    // Tells the optimizer the real rendered width per breakpoint so it
                    // never ships a 2x desktop image to a phone.
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                  {/* Bottom scrim so the caption stays legible over any image. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-line-subtle p-5">
                  <div>
                    <p className="text-base font-semibold text-fg">{site.name}</p>
                    <p className="text-sm text-fg-muted">
                      {site.currentTitle}, {site.currentCompany}
                    </p>
                  </div>
                  <span className="font-mono text-2xs uppercase tracking-[0.16em] text-fg-faint">
                    {site.location.split(',')[0]}
                  </span>
                </div>
              </Panel>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
