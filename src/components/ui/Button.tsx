'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'signal';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] ' +
  'duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ' +
  // Ring offset uses the page background so the focus ring reads on any surface.
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[var(--bg-base)]';

const variants: Record<Variant, string> = {
  // Solid fill — reserved for the single most important action in any view.
  primary:
    'bg-fg text-[color:var(--bg-base)] hover:bg-fg/90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5',
  // Hairline outline that fills on hover — the default for secondary actions.
  secondary:
    'border border-line-strong bg-tint-weak text-fg hover:bg-tint hover:border-fg-faint hover:-translate-y-0.5',
  ghost: 'text-fg-secondary hover:text-fg hover:bg-tint',
  signal:
    'bg-primary text-white hover:bg-primary-lo shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

type LinkButtonProps = CommonProps & {
  href: string;
  /** External links get `target=_blank` plus the required rel hardening. */
  external?: boolean;
  download?: boolean;
  'aria-label'?: string;
};

/**
 * Anchor styled as a button.
 *
 * Internal hrefs route through `next/link` for prefetching; external and hash
 * links use a plain anchor so the browser handles them natively.
 */
export function LinkButton({
  href,
  external,
  download,
  variant = 'secondary',
  size = 'md',
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isInternalRoute = href.startsWith('/') && !download;

  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} download={download} className={classes} {...props}>
      {children}
    </a>
  );
}
