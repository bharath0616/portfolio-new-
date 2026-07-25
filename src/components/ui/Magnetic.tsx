'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion, useMediaQuery } from '@/hooks';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element travels toward the cursor, as a fraction of the offset. */
  strength?: number;
  /** Optional inner element that moves further, creating parallax depth. */
  innerStrength?: number;
};

/**
 * Magnetic hover: the element drifts toward the cursor while it is over it.
 *
 * Disabled entirely on touch devices (there is no hover, and the pointer events
 * would fight scrolling) and under reduced-motion. Movement is driven by
 * MotionValues rather than React state, so tracking the cursor never re-renders.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  innerStrength = 0,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const innerX = useTransform(springX, (v) => v * innerStrength);
  const innerY = useTransform(springY, (v) => v * innerStrength);

  const enabled = canHover && !reduced;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Offset from the element's centre, scaled down so it never fully chases the cursor.
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <div className={cn('inline-flex', className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {innerStrength > 0 ? (
        <motion.div style={{ x: innerX, y: innerY }} className="inline-flex">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
