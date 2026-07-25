import { Briefcase, GraduationCap, Medal } from 'lucide-react';
import { experience } from '@/content/experience';
import { education } from '@/content/education';
import { achievements } from '@/content/achievements';
import { cn } from '@/lib/utils';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

type TimelineEntry = {
  id: string;
  /** Sort key — the year the entry began. */
  sortYear: number;
  period: string;
  title: string;
  subtitle: string;
  kind: 'work' | 'education' | 'milestone';
};

/**
 * Merged chronology, derived from the same content the other sections render.
 *
 * Deriving rather than duplicating means a change to a job title or a graduation
 * year propagates here automatically — there is no second copy to forget.
 */
function buildTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    ...experience.map((role) => ({
      id: `work-${role.id}`,
      sortYear: Number(role.start.slice(0, 4)),
      period: `${role.startLabel} — ${role.endLabel}`,
      title: role.role,
      subtitle: role.company,
      kind: 'work' as const,
    })),
    ...education.map((entry) => ({
      id: `edu-${entry.id}`,
      sortYear: Number(entry.start),
      period: `${entry.start} — ${entry.end}`,
      title: entry.qualification,
      subtitle: `${entry.institution} · ${entry.score.value} ${entry.score.label}`,
      kind: 'education' as const,
    })),
    {
      id: 'milestone-ieee',
      sortYear: 2024,
      period: achievements[0]?.period ?? '2024 – 2025',
      title: achievements[0]?.title ?? 'Technical Head',
      subtitle: achievements[0]?.organization ?? 'IEEE TEMS',
      kind: 'milestone' as const,
    },
  ];

  // Newest first — recency is what a recruiter reads.
  return entries.sort((a, b) => b.sortYear - a.sortYear);
}

const KIND_META = {
  work: { Icon: Briefcase, label: 'Role', className: 'border-primary/40 bg-primary/10 text-primary' },
  education: {
    Icon: GraduationCap,
    label: 'Education',
    className: 'border-accent/40 bg-accent/10 text-accent',
  },
  milestone: {
    Icon: Medal,
    label: 'Leadership',
    className: 'border-signal/40 bg-signal/10 text-signal',
  },
} as const;

/**
 * Timeline — the whole journey on one rail.
 *
 * Server component: it is static content, so it ships zero JavaScript beyond the
 * reveal wrappers.
 */
export function Timeline() {
  const entries = buildTimeline();

  return (
    <Section id="timeline">
      <div className="container-page">
        <SectionHeader
          id="timeline"
          eyebrow="Journey"
          title="Nine years, in order."
          description="Education, roles and leadership on a single chronology."
        />

        <ol className="relative mt-16 max-w-3xl">
          {/* Continuous rail behind the markers, faded at both ends. */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-transparent via-line to-transparent"
          />

          {entries.map((entry, index) => {
            const meta = KIND_META[entry.kind];

            return (
              <li key={entry.id}>
                <Reveal delay={Math.min(index * 0.04, 0.3)}>
                  <div className="group/entry relative grid grid-cols-[32px_1fr] items-start gap-5 pb-8">
                    <span
                      className={cn(
                        'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border',
                        'bg-canvas transition-transform duration-300 group-hover/entry:scale-110',
                        meta.className,
                      )}
                      aria-hidden
                    >
                      <meta.Icon className="size-3.5" />
                    </span>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-1">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-snug text-fg">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-fg-muted">{entry.subtitle}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-fg-faint">
                        {entry.period}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
