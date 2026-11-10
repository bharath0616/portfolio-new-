'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { skillGroups } from '@/content/skills';
import { groupIcons } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';

/**
 * Skills — a stack explorer, deliberately not a set of progress bars.
 *
 * A self-assigned "React 85%" is unfalsifiable and reads as filler to anyone
 * technical. Instead each skill shows *where it was actually used* on hover/focus,
 * which is verifiable against the experience section. Visual weight encodes depth
 * (core / strong / working) without pretending to be a measurement.
 */
export function Skills() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0]?.id ?? '');
  const current = skillGroups.find((group) => group.id === activeGroup) ?? skillGroups[0];

  return (
    <Section id="skills">
      <div className="container-page">
        <SectionHeader
          id="skills"
          eyebrow="Skills"
          title="What I work with"
          description="Hover over any skill to see where I've used it."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Category rail. `min-w-0` lets the tab row scroll sideways on small
              screens instead of stretching the grid (and the whole page) wider. */}
          <div className="min-w-0 lg:col-span-4">
            <div
              role="tablist"
              aria-label="Skill categories"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {skillGroups.map((group) => {
                const Icon = groupIcons[group.icon];
                const isActive = group.id === activeGroup;

                return (
                  <button
                    key={group.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`skills-panel-${group.id}`}
                    id={`skills-tab-${group.id}`}
                    onClick={() => setActiveGroup(group.id)}
                    className={cn(
                      'group/tab relative flex shrink-0 items-center gap-3.5 rounded-[var(--radius-card)]',
                      'border px-4 py-3.5 text-left transition-colors duration-300 lg:w-full',
                      isActive
                        ? 'border-line bg-elevated'
                        : 'border-transparent hover:border-line-subtle hover:bg-tint-weak',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300',
                        isActive
                          ? 'border-transparent bg-primary text-white'
                          : 'border-line-subtle bg-subtle text-fg-muted',
                      )}
                      aria-hidden
                    >
                      <Icon className="size-4" />
                    </span>

                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block whitespace-nowrap text-sm font-semibold transition-colors lg:whitespace-normal',
                          isActive ? 'text-fg' : 'text-fg-secondary',
                        )}
                      >
                        {group.label}
                      </span>
                      <span className="hidden text-xs text-fg-muted lg:block">
                        {group.skills.length} skills
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skill grid */}
          <div className="min-w-0 lg:col-span-8">
            {current && (
              <div
                role="tabpanel"
                id={`skills-panel-${current.id}`}
                aria-labelledby={`skills-tab-${current.id}`}
                tabIndex={0}
                className="focus-visible:outline-none"
              >
                <p className="text-lg leading-relaxed text-fg-secondary">
                  {current.blurb}
                </p>

                {/* `key` remounts the group so the stagger replays on every tab change. */}
                <StaggerGroup
                  key={current.id}
                  stagger={0.035}
                  className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {current.skills.map((skill) => (
                    <RevealItem key={skill.name}>
                      <SkillCard
                        name={skill.name}
                        level={skill.level}
                        context={skill.context}
                      />
                    </RevealItem>
                  ))}
                </StaggerGroup>
              </div>
            )}
          </div>
        </div>

        {/* Legend — makes the visual encoding explicit rather than leaving it to be guessed. */}
        <Reveal delay={0.1}>
          <dl className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-subtle pt-6 text-xs">
            {(
              [
                ['core', 'Use it every day'],
                ['strong', 'Comfortable with it'],
                ['working', "Have used it / still learning"],
              ] as const
            ).map(([level, label]) => (
              <div key={level} className="flex items-center gap-2.5">
                <dt className="sr-only">{level}</dt>
                <span className={cn('size-2 rounded-full', LEVEL_DOT[level])} aria-hidden />
                <dd className="text-fg-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

const LEVEL_DOT = {
  core: 'bg-primary',
  strong: 'bg-accent',
  working: 'bg-fg-faint',
} as const;

const LEVEL_RING = {
  core: 'group-hover/skill:border-primary',
  strong: 'group-hover/skill:border-accent',
  working: 'group-hover/skill:border-line-strong',
} as const;

function SkillCard({
  name,
  level,
  context,
}: {
  name: string;
  level: keyof typeof LEVEL_DOT;
  context?: string;
}) {
  return (
    <div
      // `tabIndex` makes the context reachable by keyboard, not hover only.
      tabIndex={0}
      className={cn(
        'group/skill relative overflow-hidden rounded-[var(--radius-card)] border border-line-subtle',
        'bg-elevated px-4 py-3.5 transition-colors duration-300',
        LEVEL_RING[level],
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn('size-2 shrink-0 rounded-full', LEVEL_DOT[level])} aria-hidden />
        <span className="text-sm font-medium text-fg">{name}</span>
      </div>

      {context && (
        <motion.p
          // Height animation reveals the context without reserving empty space when idle.
          initial={false}
          className={cn(
            'mt-0 max-h-0 overflow-hidden text-xs leading-snug text-fg-muted opacity-0',
            'transition-[max-height,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'group-hover/skill:mt-2 group-hover/skill:max-h-20 group-hover/skill:opacity-100',
            'group-focus-visible/skill:mt-2 group-focus-visible/skill:max-h-20 group-focus-visible/skill:opacity-100',
          )}
        >
          {context}
        </motion.p>
      )}
    </div>
  );
}
