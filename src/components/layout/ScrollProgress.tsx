'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * `useScroll` writes to a MotionValue, and `scaleX` is applied on the compositor —
 * so the bar tracks scroll without a single React render or layout pass. The spring
 * smooths the trackpad's noisy delta into continuous motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 340,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      data-decorative-motion
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-accent to-signal"
    />
  );
}
