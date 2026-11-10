'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Layers3,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
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

/** Filter options. Which projects match is worked out from each project's stack. */
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
 * Every project starts collapsed, showing just its category and title. Clicking
 * the card opens the full details (screenshot, links, write-up, stack). More than
 * one can be open at a time, so opening one never shifts the card you clicked.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());

  const visible = useMemo(() => projects.filter((p) => matchesFilter(p, filter)), [filter]);

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Section id="projects" className="relative">
      <SectionGlow className="top-0" tone="primary" />

      <div className="container-page">
        <SectionHeader
          id="projects"
          eyebrow="Projects"
          title="Things I've built"
          description="Projects from college and my free time. Click a project to see more."
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

        {/* Project list */}
        <div className="mt-10 flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                isOpen={open.has(project.id)}
                onToggle={() => toggle(project.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-fg-muted">No projects match this filter.</p>
        )}
      </div>
    </Section>
  );
}

function ProjectItem({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headingId = `project-${project.id}-title`;
  const panelId = `project-${project.id}-panel`;

  return (
    <motion.article
      // "position" only: animates cards sliding when the filter changes, without
      // stretching a card's contents while it opens or closes.
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={transitions.base}
      className={cn(
        'rounded-[var(--radius-card)] border border-line-subtle bg-elevated',
        'transition-[border-color,box-shadow] duration-300 hover:border-line',
        isOpen && 'border-line shadow-[var(--shadow-soft)]',
      )}
    >
      {/* Heading row: the only thing shown until the card is opened. */}
      <h3>
        <button
          type="button"
          id={headingId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={cn(
            'flex w-full items-center justify-between gap-4 rounded-[var(--radius-card)] p-5 text-left sm:p-7',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          )}
        >
          <span className="min-w-0">
            <span className="block font-mono text-xs uppercase tracking-[0.16em] text-primary">
              {project.category}
            </span>
            <span className="mt-2 block text-2xl font-semibold leading-tight text-fg sm:text-3xl">
              {project.title}
            </span>
          </span>
          <ChevronDown
            className={cn(
              'size-5 shrink-0 text-fg-faint transition-transform duration-300',
              isOpen && 'rotate-180',
            )}
            aria-hidden
          />
        </button>
      </h3>

      {/* Full details */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line-subtle p-5 sm:p-7">
              <ProjectDetails project={project} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
      {/* Preview */}
      <div className="lg:col-span-7">
        <Tilt max={4}>
          <SpotlightCard className="overflow-hidden">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-subtle">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={cn(
                  'size-full object-cover object-top',
                  'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'group-hover/card:scale-[1.03]',
                )}
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
                    aria-label={`${link.label}: ${project.title} (opens in a new tab)`}
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

      {/* Write-up */}
      <div className="flex flex-col gap-6 lg:col-span-5">
        <p className="text-base leading-relaxed text-fg-secondary">{project.tagline}</p>

        {/* Big numbers, only if a project has any. */}
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

        <div className="flex flex-col gap-5">
          <CaseBlock icon={Target} label="Why I built it" tone="warning">
            {project.problem}
          </CaseBlock>

          <CaseBlock icon={Lightbulb} label="What I built" tone="primary">
            {project.solution}
          </CaseBlock>

          <CaseBlock icon={TrendingUp} label="Features" tone="signal">
            <ul className="flex flex-col gap-2">
              {project.impact.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>

          <CaseBlock icon={Layers3} label="Tech details" tone="muted">
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
    </div>
  );
}

const TONES = {
  primary: 'text-primary',
  signal: 'text-signal',
  warning: 'text-[color:var(--color-warning)]',
  muted: 'text-fg-faint',
} as const;

/** Labelled block in a project's write-up. The icon is decorative; the label carries meaning. */
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
