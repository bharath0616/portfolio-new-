import { GraduationCap, Users } from 'lucide-react';
import { education } from '@/content/education';
import { leadership } from '@/content/achievements';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';

/**
 * Education, with the leadership role folded in.
 *
 * The score is promoted to the visual anchor of each card — a strong CGPA or board
 * percentage is a screening filter at many companies, so it should not be buried in
 * a line of prose.
 *
 * Leadership lives here rather than in its own section: it is one entry, and a
 * whole section for a single card reads as padding. It is still the signal most
 * engineering portfolios omit, so it keeps a distinct visual treatment.
 */
export function Education() {
  return (
    <Section id="education">
      <div className="container-page">
        <SectionHeader
          id="education"
          eyebrow="Education"
          title="Academic foundation."
          description="Computer Science and Business Systems at VIT, with consistent results across every stage."
        />

        <StaggerGroup stagger={0.07} className="mt-14 grid gap-5 md:grid-cols-3">
          {education.map((entry) => (
            <RevealItem key={entry.id}>
              <article className="group/edu flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-line-subtle bg-elevated p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-subtle bg-subtle text-fg-secondary"
                    aria-hidden
                  >
                    <GraduationCap className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-fg-faint">
                    {entry.start} — {entry.end}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-semibold leading-snug text-fg">
                    {entry.qualification}
                  </h3>
                  {entry.field && (
                    <p className="text-sm leading-snug text-fg-secondary">
                      {entry.field}
                    </p>
                  )}
                  <p className="text-sm text-fg-muted">{entry.institution}</p>
                  <p className="text-xs text-fg-faint">{entry.location}</p>
                </div>

                <div className="mt-auto flex items-baseline gap-2 border-t border-line-subtle pt-4">
                  <span className="font-mono text-3xl font-semibold leading-none text-signal">
                    {entry.score.value}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">
                    {entry.score.label}
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </StaggerGroup>

        {/* Leadership */}
        <Reveal delay={0.1}>
          <article className="mt-5 flex flex-col gap-5 rounded-[var(--radius-card)] border border-line-subtle bg-elevated p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-7">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-subtle bg-subtle text-primary"
              aria-hidden
            >
              <Users className="size-5" />
            </span>

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold leading-snug text-fg">
                  {leadership.title} ·{' '}
                  <span className="text-primary">{leadership.organization}</span>
                </h3>
                <span className="font-mono text-xs text-fg-faint">{leadership.period}</span>
              </div>

              <p className="text-sm leading-relaxed text-fg-secondary">{leadership.detail}</p>

              <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {leadership.points.map((point, index) => (
                  <li key={index} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
