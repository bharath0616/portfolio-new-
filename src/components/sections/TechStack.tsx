'use client';

import { techStack } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealItem, StaggerGroup } from '@/components/ui/Reveal';

/**
 * Tech stack ecosystem grid.
 *
 * Icons sit monochrome by default and adopt their brand color only on hover, so the
 * grid reads as one calm system rather than 26 competing logos — while still letting
 * a recruiter's eye lock onto a specific technology they are scanning for.
 *
 * The brand color is applied via a CSS variable set inline, which keeps the
 * per-icon color out of the class list and lets one rule handle every tile.
 */
export function TechStack() {
  return (
    <Section id="stack">
      <div className="container-page">
        <SectionHeader
          id="stack"
          eyebrow="Ecosystem"
          title="Everything I reach for."
          description="The full toolchain across languages, frameworks, data, machine learning and delivery."
          align="center"
        />

        <StaggerGroup
          stagger={0.02}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          {techStack.map((tech) => (
            <RevealItem key={tech.name}>
              <div
                className={cn(
                  'group/tech flex aspect-square flex-col items-center justify-center gap-2.5',
                  'rounded-[var(--radius-card)] border border-line-subtle bg-elevated p-3',
                  'transition-[border-color,transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'hover:-translate-y-1 hover:border-line hover:bg-subtle',
                )}
                style={{ '--tech-color': tech.color } as React.CSSProperties}
              >
                <tech.Icon
                  className={cn(
                    'size-7 shrink-0 text-fg-muted transition-colors duration-300 sm:size-8',
                    'group-hover/tech:text-[color:var(--tech-color)]',
                  )}
                  aria-hidden
                />
                <span className="text-center font-mono text-[10px] leading-tight text-fg-faint transition-colors duration-300 group-hover/tech:text-fg-secondary sm:text-2xs">
                  {tech.name}
                </span>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
