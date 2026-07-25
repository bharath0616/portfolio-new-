import { achievements } from '@/content/achievements';
import { achievementIcons } from '@/lib/icons';
import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealItem, StaggerGroup } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/Backdrop';

/**
 * Achievements and leadership.
 *
 * Leadership is the signal most engineering portfolios omit entirely, and it is
 * exactly what separates a strong individual contributor from a candidate who can
 * be trusted with scope. Giving it its own section rather than a résumé footnote.
 */
export function Achievements() {
  return (
    <Section id="achievements" className="relative">
      <SectionGlow className="top-10" tone="accent" />

      <div className="container-page">
        <SectionHeader
          id="achievements"
          eyebrow="Leadership & Recognition"
          title="Beyond writing code."
          description="Leading technical domains, mentoring, and a consistent record across every stage of study."
        />

        <StaggerGroup stagger={0.08} className="mt-14 grid gap-5 lg:grid-cols-3">
          {achievements.map((item) => {
            const Icon = achievementIcons[item.icon];

            return (
              <RevealItem key={item.id}>
                <article className="group/ach flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-line-subtle bg-elevated p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line-subtle bg-subtle text-primary transition-transform duration-300 group-hover/ach:scale-105"
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-semibold leading-snug text-fg">
                      {item.title}
                    </h3>
                    <p className="flex flex-wrap items-center gap-x-2 text-sm text-fg-muted">
                      <span className="font-medium text-primary">{item.organization}</span>
                      <span aria-hidden>·</span>
                      <span className="font-mono text-xs">{item.period}</span>
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-fg-secondary">
                    {item.detail}
                  </p>

                  <ul className="mt-auto flex flex-col gap-2.5 border-t border-line-subtle pt-5">
                    {item.points.map((point, index) => (
                      <li
                        key={index}
                        className="flex gap-2.5 text-sm leading-relaxed text-fg-muted"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-signal"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
