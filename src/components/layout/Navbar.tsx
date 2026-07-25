'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { navItems, site } from '@/content/site';
import { useActiveSection, useLockBodyScroll, useScrollState } from '@/hooks';
import { ThemeToggle } from './ThemeToggle';
import { Magnetic } from '@/components/ui/Magnetic';
import { LinkButton } from '@/components/ui/Button';

const SECTION_IDS = navItems.map((item) => item.id);

/**
 * Primary navigation.
 *
 * Behaviour: condenses on scroll, hides on scroll-down, returns on scroll-up. The
 * active section indicator is a single shared element animated between tabs with
 * `layoutId`, so the pill physically travels rather than cross-fading — the motion
 * itself communicates the relationship between sections.
 */
export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { direction, scrolled } = useScrollState();
  const activeSection = useActiveSection(SECTION_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLockBodyScroll(mobileOpen);

  const desktopItems = useMemo(() => navItems.filter((item) => item.inNav), []);

  // Never hide the bar while the mobile sheet is open — it owns the close control.
  const hidden = direction === 'down' && !mobileOpen;

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            'container-page flex items-center justify-between gap-4 rounded-full',
            'transition-[background-color,border-color,box-shadow,padding] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
            // The nav is transparent at the top and only materializes once content
            // is behind it — so the hero is never framed by a floating chrome bar.
            scrolled
              ? 'glass !max-w-5xl py-2 shadow-[var(--shadow-soft)]'
              : 'border border-transparent py-3',
          )}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
            aria-label={`${site.name} — back to top`}
          >
            <span className="relative flex size-8 items-center justify-center rounded-lg bg-fg font-mono text-sm font-bold text-[color:var(--bg-base)]">
              BM
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-fg sm:block">
              {site.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {desktopItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-sm font-medium',
                      'transition-colors duration-250',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-tint"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommand}
              className={cn(
                'hidden items-center gap-2 rounded-full border border-line-subtle bg-tint-weak',
                'py-1.5 pl-3 pr-2 text-xs text-fg-muted lg:flex',
                'transition-colors duration-250 hover:bg-tint hover:text-fg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
              aria-label="Open command menu"
            >
              <Command className="size-3.5" />
              <span>Search</span>
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-faint">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <Magnetic strength={0.2} className="hidden sm:inline-flex">
              <LinkButton href="#contact" variant="primary" size="sm">
                Get in touch
              </LinkButton>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                'inline-flex size-9 items-center justify-center rounded-full md:hidden',
                'border border-line-subtle bg-tint-weak text-fg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-xl"
              onClick={closeMobile}
            />

            <motion.ul
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="container-page absolute inset-x-0 top-24 flex flex-col gap-1"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={closeMobile}
                    className={cn(
                      'flex items-baseline gap-3 rounded-xl px-4 py-3 text-2xl font-semibold',
                      'transition-colors duration-200',
                      activeSection === item.id ? 'text-fg' : 'text-fg-muted',
                      'hover:bg-tint hover:text-fg',
                    )}
                  >
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
