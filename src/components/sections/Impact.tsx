'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { impactStats } from '@/content/achievements';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Panel } from '@/components/ui/Card';
import { SectionGlow } from '@/components/ui/Backdrop';
import { useMounted } from '@/hooks';

/**
 * The contribution calendar is code-split and client-only.
 *
 * It fetches from an external API at runtime, so it cannot be server-rendered, and
 * it is far below the fold — loading it lazily keeps ~30kB and a network request
 * off the critical path entirely. `ssr: false` also prevents a hydration mismatch
 * between empty server markup and populated client markup.
 */
const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => (
    <div
      className="h-[140px] w-full animate-pulse rounded-lg bg-tint"
      aria-label="Loading contribution graph"
    />
  ),
});

/**
 * Impact — outcomes rather than activity.
 *
 * Every figure carries its source underneath. An unattributed number is a claim;
 * an attributed one is evidence, and it gives an interviewer a specific thread to pull.
 */
export function Impact() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  return (
    <Section id="impact" className="relative">
      <SectionGlow className="top-10" tone="signal" />

      <div className="container-page">
        <SectionHeader
          id="impact"
          eyebrow="Impact"
          title="The numbers, and where they came from."
          description="Each figure below is attributed to the role or project that produced it."
          align="center"
        />

        <StaggerGroup
          stagger={0.05}
          className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line-subtle bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {impactStats.map((stat) => (
            <RevealItem key={stat.id}>
              <div className="flex h-full flex-col gap-2 bg-canvas p-6 transition-colors duration-300 hover:bg-subtle">
                <span className="font-mono text-4xl font-semibold leading-none text-signal">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <span className="text-sm font-medium leading-snug text-fg">
                  {stat.label}
                </span>
                <span className="mt-auto pt-2 text-xs leading-snug text-fg-faint">
                  {stat.source}
                </span>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>

        {/* Contribution graph */}
        <Reveal delay={0.12}>
          <Panel className="mt-8 overflow-hidden p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold text-fg">
                Contribution activity
              </h3>
              <a
                href="https://github.com/bharath0616"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-fg-muted transition-colors hover:text-primary"
              >
                @bharath0616 ↗
              </a>
            </div>

            <div className="overflow-x-auto pb-2">
              {mounted && (
                <GitHubCalendar
                  username="bharath0616"
                  // Ramp derived from the site's own primary hue so the graph belongs
                  // to the design system instead of importing GitHub's green.
                  theme={{
                    light: ['#e8ecf4', '#b9c9ec', '#8aa5e0', '#5b81d4', '#3960b8'],
                    dark: ['#1a1d24', '#22375e', '#2f5192', '#456fc4', '#6b93e8'],
                  }}
                  colorScheme={resolvedTheme === 'light' ? 'light' : 'dark'}
                  blockSize={11}
                  blockMargin={3}
                  fontSize={12}
                />
              )}
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
