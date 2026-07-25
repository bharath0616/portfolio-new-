'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks';

/**
 * Light/dark switch.
 *
 * `next-themes` is configured with `defaultTheme="system"`, so the OS preference is
 * respected until the user overrides it, and the override then persists.
 *
 * The icon cross-fade only renders after mount — the server cannot know the
 * resolved theme, so rendering an icon during SSR would guarantee a hydration
 * mismatch. Before mount a same-sized placeholder holds the space, which keeps the
 * nav from shifting (CLS).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === 'dark';

  const buttonClasses = cn(
    'relative inline-flex size-9 items-center justify-center rounded-full',
    'border border-line-subtle bg-tint-weak text-fg-secondary',
    'transition-colors duration-250 hover:bg-tint hover:text-fg',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
    className,
  );

  if (!mounted) {
    return <div className={buttonClasses} aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={buttonClasses}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inline-flex"
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
