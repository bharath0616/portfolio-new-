'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion, useMediaQuery } from '@/hooks';

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. Above ~10 it stops looking premium. */
  max?: number;
  /** Renders a light source that tracks the cursor across the surface. */
  glare?: boolean;
};

/**
 * 3D tilt with cursor-tracked specular highlight.
 *
 * Replaces the `react-parallax-tilt` dependency (~14kB) with ~60 lines built on
 * MotionValues. Rotation is composited on the GPU and the highlight is a radial
 * gradient position, so a full tilt costs zero React renders and zero layout.
 */
export function Tilt({ children, className, max = 6, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = canHover && !reduced;

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 });

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, oklch(1 0 0 / 0.14), transparent 55%)`;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    // Invert Y so the card leans toward the cursor rather than away from it.
    rotateX.set((0.5 - py) * max * 2);
    rotateY.set((px - 0.5) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  if (!enabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        // Distant vanishing point — a short perspective exaggerates the rotation.
        perspective: 1400,
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          data-decorative-motion
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
