'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks';

type TypewriterProps = {
  phrases: readonly string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  /** How long a completed phrase rests before deleting. */
  holdMs?: number;
};

/**
 * Cycling type-on effect.
 *
 * Replaces the `typewriter-effect` dependency with ~50 lines and no DOM library.
 *
 * Accessibility: the animated text is `aria-hidden` and the full phrase list is
 * exposed once as static text. Without that, a screen reader announces a fresh
 * partial string on every keystroke, which is unusable. Under reduced-motion the
 * first phrase renders statically with no cycling at all.
 */
export function Typewriter({
  phrases,
  className,
  typeSpeed = 55,
  deleteSpeed = 28,
  holdMs = 1900,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || phrases.length === 0) return;

    const current = phrases[index % phrases.length] ?? '';

    // Phrase fully typed → hold, then start deleting.
    if (!deleting && text === current) {
      const timer = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(timer);
    }

    // Phrase fully deleted → advance to the next one.
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, holdMs, reduced]);

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        data-decorative-motion
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.08em] animate-[caret_1.1s_steps(1)_infinite] bg-primary"
      />
      {/* Static equivalent for assistive tech — announced once, never re-announced. */}
      <span className="sr-only">{phrases.join('. ')}</span>
    </span>
  );
}
