'use client';

import { useCallback, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Renders a gradient hairline that lights up around the cursor. */
  border?: boolean;
  as?: 'div' | 'article' | 'li';
};

/**
 * Card with a cursor-tracked spotlight and an optional gradient border.
 *
 * The cursor position is written straight to CSS custom properties on the DOM node
 * — deliberately bypassing React state. A `useState` here would re-render the card
 * (and its whole subtree) on every mousemove; this approach costs two style writes
 * and stays on the compositor.
 */
export function SpotlightCard({
  children,
  className,
  border = true,
  as: Component = 'div',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Component
      // @ts-expect-error — polymorphic ref across div/article/li element types.
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        'group/card relative isolate overflow-hidden rounded-[var(--radius-card)]',
        'border border-line-subtle bg-elevated',
        'transition-[border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'hover:border-line hover:shadow-[var(--shadow-lift)]',
        className,
      )}
      style={
        {
          // Sensible default so the first hover does not jump from the top-left corner.
          '--spot-x': '50%',
          '--spot-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Spotlight wash — sits behind content, fades in only on hover. */}
      <div
        aria-hidden
        data-decorative-motion
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 opacity-0',
          'transition-opacity duration-500 group-hover/card:opacity-100',
        )}
        style={{
          background:
            'radial-gradient(340px circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--brand-primary) 14%, transparent), transparent 70%)',
        }}
      />

      {/* Gradient hairline. Drawn as a masked ring so it never bleeds inward. */}
      {border && (
        <div
          aria-hidden
          data-decorative-motion
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0',
            'transition-opacity duration-500 group-hover/card:opacity-100',
          )}
          style={{
            background:
              'radial-gradient(320px circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--brand-primary) 55%, transparent), transparent 65%)',
            padding: '1px',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {children}
    </Component>
  );
}

/** Flat panel without hover choreography — used for dense, read-only content. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-line-subtle bg-subtle',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Metric display. The value uses tabular figures and the mint "signal" color that
 * is reserved site-wide for measured outcomes — so a number in that color always
 * means the same thing.
 */
export function MetricTile({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="font-mono text-xl font-semibold leading-none text-signal">
        {value}
      </span>
      <span className="text-xs leading-snug text-fg-muted">{label}</span>
    </div>
  );
}
