'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { experience } from '@/content/experience';
import { cn } from '@/lib/utils';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { SectionGlow } from '@/components/ui/Backdrop';

/**
 * Experience — an expandable vertical timeline.
 *
 * The current role starts expanded and older roles start collapsed: recency is
 * what a recruiter reads, and collapsing the rest keeps the whole history visible
 * on one screen without a wall of bullets.
 *
 * Each card is a real `<button>` controlling a region via `aria-expanded` /
 * `aria-controls`, so the disclosure works with a keyboard and is announced
 * correctly. Content is not unmounted-only — the height animation is applied to a
 * wrapper so the text remains in the accessibility tree while open.
 */
export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <Section id="experience" className="relative">
      <SectionGlow className="top-20" tone="accent" />

      <div className="container-page">
        <SectionHeader
          id="experience"
          eyebrow="Experience"
          title="Work experience"
          description="My job at PwC and two roles I did during college. Click a card to see more."
        />

        <ol className="mt-16 flex flex-col">
          {experience.map((role, index) => {
            const isOpen = expanded === role.id;
            const isCurrent = role.end === null;
            const isLast = index === experience.length - 1;

            return (
              <li key={role.id} className="relative">
                <Reveal delay={index * 0.06}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8">
                    {/* Timeline rail */}
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'relative mt-6 flex size-3 shrink-0 items-center justify-center rounded-full',
                          isCurrent ? 'bg-primary' : 'bg-fg-faint',
                        )}
                        aria-hidden
                      >
                        {isCurrent && (
                          <span
                            data-decorative-motion
                            className="absolute size-3 animate-ping rounded-full bg-primary opacity-60"
                          />
                        )}
                      </span>
                      {!isLast && (
                        <span
                          aria-hidden
                          className="mt-2 w-px flex-1 bg-gradient-to-b from-line via-line-subtle to-transparent"
                        />
                      )}
                    </div>

                    {/* Card */}
                    <div className={cn('pb-8', isLast && 'pb-0')}>
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : role.id)}
                        aria-expanded={isOpen}
                        aria-controls={`experience-panel-${role.id}`}
                        className={cn(
                          'group/exp w-full rounded-[var(--radius-card)] border border-line-subtle bg-elevated',
                          'p-5 text-left transition-[border-color,box-shadow] duration-300 sm:p-7',
                          'hover:border-line hover:shadow-[var(--shadow-soft)]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
                          isOpen && 'border-line shadow-[var(--shadow-soft)]',
                        )}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex min-w-0 items-start gap-4">
                            <span
                              className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-subtle bg-subtle"
                              aria-hidden
                            >
                              <Building2 className="size-5 text-fg-secondary" />
                            </span>

                            <div className="min-w-0">
                              <h3 className="text-xl font-semibold leading-tight text-fg">
                                {role.role}
                              </h3>
                              <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-fg-muted">
                                <span className="font-medium text-primary">{role.company}</span>
                                <span aria-hidden>·</span>
                                <span>{role.location}</span>
                                <span aria-hidden>·</span>
                                <span>{role.type}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <span className="font-mono text-xs text-fg-muted">
                              <time dateTime={role.start}>{role.startLabel}</time>
                              {' - '}
                              {role.end ? (
                                <time dateTime={role.end}>{role.endLabel}</time>
                              ) : (
                                <span className="text-primary">{role.endLabel}</span>
                              )}
                            </span>
                            <ChevronDown
                              className={cn(
                                'size-4 shrink-0 text-fg-faint transition-transform duration-300',
                                isOpen && 'rotate-180',
                              )}
                              aria-hidden
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-base leading-relaxed text-fg-secondary">
                          {role.summary}
                        </p>
                      </button>

                      {/* Expandable detail */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`experience-panel-${role.id}`}
                            role="region"
                            aria-label={`${role.role} at ${role.company}, details`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pt-6 sm:px-7">
                              <h4 className="font-mono text-2xs uppercase tracking-[0.16em] text-fg-faint">
                                What I did
                              </h4>
                              <ul className="mt-4 flex flex-col gap-3">
                                {role.highlights.map((highlight, i) => (
                                  <li
                                    key={i}
                                    className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                                  >
                                    <span
                                      className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                                      aria-hidden
                                    />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>

                              <h4 className="mt-7 font-mono text-2xs uppercase tracking-[0.16em] text-fg-faint">
                                Stack
                              </h4>
                              <ul className="mt-3 flex flex-wrap gap-2">
                                {role.stack.map((tech) => (
                                  <li key={tech}>
                                    <Badge variant="outline" size="sm">
                                      {tech}
                                    </Badge>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
