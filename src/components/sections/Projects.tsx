'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, Layers3, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects, type Project } from '@/content/projects';
import { cn } from '@/lib/utils';
import { transitions } from '@/lib/motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { SpotlightCard } from '@/components/ui/Card';
import { Tilt } from '@/components/ui/Tilt';
import { SectionGlow } from '@/components/ui/Backdrop';

/** Filter facets, derived from the data so they can never drift out of sync. */
const FILTERS = ['All', 'Full-Stack', 'Machine Learning'] as const;
type Filter = (typeof FILTERS)[number];

const ML_TAGS = new Set(['scikit-learn', 'Machine Learning', 'Computer Vision', 'Python']);

function matchesFilter(project: Project, filter: Filter) {
  if (filter === 'All') return true;
  const isML = project.stack.some((tech) => ML_TAGS.has(tech));
  return filter === 'Machine Learning' ? isML : !isML;
}

/**
 * Projects.
 *
 * Structured as problem → approach → impact rather than a feature dump, because
 * that is the shape an interviewer reads for and the shape they will ask about.
 *
 * Filtering animates with `layout` so cards physically reflow instead of the list
 * snapping — the motion shows what was removed rather than just presenting a new set.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(() => projects.filter((p) => matchesFilter(p, filter)), [filter]);

  return (
    <Section id="projects" className="relative">
      <SectionGlow className="top-0" tone="primary" />

      <div className="container-page">
        <SectionHeader
          id="projects"
          eyebrow="Selected Work"
          title="Four projects, each solving a problem I can defend."
          description="Every entry below states the constraint it was built against and what measurably changed. Source is public for all of them."
        />

        {/* Filter */}
        <Reveal delay={0.08}>
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-line-subtle bg-tint-weak p-1"
          >
            {FILTERS.map((option) => {
              const isActive = filter === option;
              const count = projects.filter((p) => matchesFilter(p, option)).length;

              return (
                <button
                  key={option}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(option)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium',
                    'transition-colors duration-250',
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-elevated shadow-[var(--shadow-soft)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {option}
                  <span className="ml-1.5 font-mono text-2xs text-fg-faint">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Case studies */}
        <motion.div layout className="mt-14 flex flex-col gap-20 lg:gap-28">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCase key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-fg-muted">No projects match this filter.</p>
        )}
      </div>
    </Section>
  );
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  // Alternate the image side so the page has rhythm instead of a repeating column.
  const imageFirst = index % 2 === 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={transitions.base}
      className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14"
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Preview */}
      <div className={cn('lg:col-span-7', !imageFirst && 'lg:order-2')}>
        <Tilt max={4}>
          <SpotlightCard className="overflow-hidden">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-subtle">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className={cn(
                  'size-full object-cover object-top',
                  'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'group-hover/card:scale-[1.03]',
                )}
                // Only the first case study is above the fold on a tall screen.
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>

            {/* Action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle p-4">
              <span className="font-mono text-2xs uppercase tracking-[0.16em] text-fg-faint">
                {project.year}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'group/link inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5',
                      'text-sm font-medium transition-colors duration-250',
                      link.kind === 'demo'
                        ? 'bg-fg text-[color:var(--bg-base)] hover:bg-fg/90'
                        : 'border border-line text-fg-secondary hover:bg-tint hover:text-fg',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    )}
                    aria-label={`${link.label} — ${project.title} (opens in a new tab)`}
                  >
                    {link.kind === 'github' ? (
                      <Github className="size-3.5" aria-hidden />
                    ) : (
                      <ArrowUpRight className="size-3.5 transition-transform duration-250 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </Tilt>
      </div>

      {/* Narrative */}
      <div className={cn('flex flex-col gap-6 lg:col-span-5', !imageFirst && 'lg:order-1')}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            {project.category}
          </p>
          <h3
            id={`project-${project.id}-title`}
            className="mt-2.5 text-3xl font-semibold text-fg"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-fg-secondary">
            {project.tagline}
          </p>
        </div>

        {/* Metrics — omitted entirely when a project has no measured outcome,
            rather than padded with invented ones. */}
        {project.metrics.length > 0 && (
          <dl className="flex flex-wrap gap-x-8 gap-y-4 border-y border-line-subtle py-5">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dd className="font-mono text-2xl font-semibold leading-none text-signal">
                  {metric.value}
                </dd>
                <dt className="text-xs text-fg-muted">{metric.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {/* Problem → Solution → Impact */}
        <div className="flex flex-col gap-5">
          <CaseBlock icon={Target} label="Problem" tone="warning">
            {project.problem}
          </CaseBlock>

          <CaseBlock icon={Lightbulb} label="Approach" tone="primary">
            {project.solution}
          </CaseBlock>

          <CaseBlock icon={TrendingUp} label="Impact" tone="signal">
            <ul className="flex flex-col gap-2">
              {project.impact.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>

          <CaseBlock icon={Layers3} label="Architecture" tone="muted">
            <ul className="flex flex-col gap-2 font-mono text-xs leading-relaxed">
              {project.architecture.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="shrink-0 text-fg-faint" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>
        </div>

        {/* Stack */}
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge variant="outline" size="sm">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

const TONES = {
  primary: 'text-primary',
  signal: 'text-signal',
  warning: 'text-[color:var(--color-warning)]',
  muted: 'text-fg-faint',
} as const;

/** Labelled block within a case study. The icon is decorative; the label carries meaning. */
function CaseBlock({
  icon: Icon,
  label,
  tone,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: keyof typeof TONES;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-fg-faint">
        <Icon className={cn('size-3.5', TONES[tone])} aria-hidden />
        {label}
      </h4>
      <div className="text-sm leading-relaxed text-fg-muted">{children}</div>
    </div>
  );
}
