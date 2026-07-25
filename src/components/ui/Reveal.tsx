'use client';

import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { revealUp, staggerContainer, transitions, viewportOnce } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting. Use sparingly — stagger is usually better. */
  delay?: number;
  /** Travel distance in px. Kept small by default; large travel reads as a template. */
  y?: number;
  as?: ElementType;
};

/**
 * Scroll-triggered reveal.
 *
 * Under `prefers-reduced-motion` the element renders in its final state with no
 * transition at all — content must never depend on animation to become visible.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as as 'div'] ?? motion.div;

  if (reduced) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transitions.base, delay }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. 0.06–0.09 feels deliberate; above 0.15 feels slow. */
  stagger?: number;
  delay?: number;
  as?: ElementType;
};

/**
 * Parent that orchestrates its children's entrance.
 * Children must be `<RevealItem>` (or any element using the `revealUp` variants).
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = 'div',
}: StaggerProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as as 'div'] ?? motion.div;

  if (reduced) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: ElementType;
};

/** Child of `StaggerGroup`. Inherits its timing from the parent's orchestration. */
export function RevealItem({
  children,
  className,
  variants = revealUp,
  as = 'div',
}: RevealItemProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as as 'div'] ?? motion.div;

  if (reduced) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component className={cn(className)} variants={variants}>
      {children}
    </Component>
  );
}
