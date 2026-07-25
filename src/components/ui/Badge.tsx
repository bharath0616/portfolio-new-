import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'signal' | 'primary';
  size?: 'sm' | 'md';
};

const variants = {
  default: 'bg-tint text-fg-secondary border-transparent',
  outline: 'bg-transparent text-fg-muted border-line',
  signal: 'bg-[color-mix(in_oklab,var(--brand-signal)_14%,transparent)] text-signal border-[color-mix(in_oklab,var(--brand-signal)_28%,transparent)]',
  primary:
    'bg-[color-mix(in_oklab,var(--brand-primary)_13%,transparent)] text-primary border-[color-mix(in_oklab,var(--brand-primary)_26%,transparent)]',
} as const;

const sizes = {
  sm: 'h-6 px-2.5 text-2xs',
  md: 'h-7 px-3 text-xs',
} as const;

/** Compact label for technologies, categories and status. */
export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium leading-none',
        'transition-colors duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Availability indicator with a pulsing dot.
 * The dot is decorative; the text carries the meaning for screen readers.
 */
export function StatusBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-2.5 pr-4',
        'bg-tint-weak text-xs font-medium text-fg-secondary backdrop-blur-sm',
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0" aria-hidden="true">
        <span
          data-decorative-motion
          className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success)] opacity-70"
        />
        <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success)]" />
      </span>
      {children}
    </span>
  );
}
