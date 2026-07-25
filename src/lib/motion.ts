import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language.
 *
 * Two rules govern everything here:
 *  1. Only `transform` and `opacity` are animated — both are compositor-only
 *     properties, so they never trigger layout or paint and hold 60fps.
 *  2. Distances stay small (≤ 24px). Large travel reads as a template; short,
 *     fast movement reads as a product.
 */

/** Primary easing — decelerating, matches the feel of native iOS/macOS transitions. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const transitions = {
  fast: { duration: 0.25, ease: EASE_OUT },
  base: { duration: 0.55, ease: EASE_OUT },
  slow: { duration: 0.9, ease: EASE_OUT },
  spring: { type: 'spring', stiffness: 340, damping: 32, mass: 0.9 },
  springSoft: { type: 'spring', stiffness: 180, damping: 26 },
} satisfies Record<string, Transition>;

/** Standard scroll reveal: rise and fade. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const revealFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
};

/**
 * Parent container that staggers its children.
 * `delayChildren` gives the container itself a beat to settle first.
 */
export const staggerContainer = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Per-character text reveal — used only on the hero name, where it earns the cost. */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -60 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/**
 * Shared viewport config for scroll reveals.
 * `once: true` prevents the re-animation-on-every-scroll effect that makes long
 * pages feel unstable. The negative bottom margin fires the reveal slightly before
 * the element is fully in view, so it is settled by the time it is read.
 */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
