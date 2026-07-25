'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks';

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. Long counts feel slow to read; 1.4s is about the ceiling. */
  duration?: number;
  className?: string;
};

/**
 * Number that counts up when it scrolls into view.
 *
 * The animated digits are `aria-hidden` and the real value is exposed to screen
 * readers as static text — otherwise assistive tech announces every intermediate
 * frame. `tabular-nums` fixes digit width so the surrounding layout cannot shift
 * as the number grows (CLS).
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  );
}
