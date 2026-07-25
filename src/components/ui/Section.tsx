import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Removes the default vertical rhythm when a section manages its own spacing. */
  bare?: boolean;
};

/**
 * Section landmark.
 *
 * Renders a real `<section>` with `aria-labelledby` pointing at its heading, so
 * screen-reader users can jump between sections via the landmark rotor — which is
 * the a11y equivalent of the visual nav.
 */
export function Section({ id, children, className, bare = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative scroll-mt-24', !bare && 'py-24 sm:py-32 lg:py-40', className)}
    >
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  id: string;
  /** Small monospace label above the title — orients the reader instantly. */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-px w-8 bg-gradient-to-r from-transparent to-primary"
        />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
      </div>

      <h2
        id={`${id}-heading`}
        className="max-w-3xl text-4xl font-semibold text-fg"
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-relaxed text-fg-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

/** Full-bleed hairline used to separate sections without a heavy border. */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'h-px w-full bg-gradient-to-r from-transparent via-line to-transparent',
        className,
      )}
    />
  );
}
