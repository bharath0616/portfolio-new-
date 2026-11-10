'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CornerDownLeft,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { navItems, site, socials } from '@/content/site';
import { projects } from '@/content/projects';
import { useLockBodyScroll } from '@/hooks';

type CommandAction = {
  id: string;
  label: string;
  group: 'Navigate' | 'Projects' | 'Links' | 'Actions';
  /** Extra terms folded into matching so "cv" finds "Resume". */
  keywords?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
  hint?: string;
};

/**
 * ⌘K command palette — spotlight search over every section, project and action.
 *
 * Implemented as a proper modal dialog: focus moves in on open, Tab is trapped
 * inside, Escape closes, and focus returns to the trigger. Arrow keys move a
 * `aria-activedescendant` cursor rather than moving DOM focus, which is the
 * combobox pattern screen readers expect.
 */
export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useLockBodyScroll(open);

  const go = useCallback(
    (id: string) => {
      onClose();
      // Defer so the dialog unmounts before the scroll starts, otherwise the
      // scroll-lock cleanup fights the smooth scroll.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [onClose],
  );

  const openExternal = useCallback(
    (href: string) => {
      onClose();
      window.open(href, '_blank', 'noopener,noreferrer');
    },
    [onClose],
  );

  const actions = useMemo<CommandAction[]>(() => {
    const socialIconMap = { github: Github, linkedin: Linkedin, mail: Mail } as const;

    return [
      ...navItems.map((item) => ({
        id: `nav-${item.id}`,
        label: item.label,
        group: 'Navigate' as const,
        icon: ArrowRight,
        run: () => go(item.id),
      })),
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        label: project.title,
        group: 'Projects' as const,
        keywords: `${project.category} ${project.stack.join(' ')}`,
        icon: FileText,
        hint: project.category,
        run: () => go('projects'),
      })),
      ...socials
        .filter((social) => social.icon in socialIconMap)
        .map((social) => ({
          id: `social-${social.label}`,
          label: social.label,
          group: 'Links' as const,
          icon: socialIconMap[social.icon as keyof typeof socialIconMap],
          hint: 'Opens in new tab',
          run: () => openExternal(social.href),
        })),
      {
        id: 'download-resume',
        label: 'View resume',
        group: 'Actions',
        keywords: 'cv pdf hire download drive',
        icon: Download,
        hint: 'Google Drive',
        run: () => {
          onClose();
          window.open(site.resumeDriveUrl, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        keywords: 'contact mail reach',
        icon: Mail,
        hint: site.email,
        run: () => {
          void navigator.clipboard.writeText(site.email);
          onClose();
        },
      },
      {
        id: 'toggle-theme',
        label: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`,
        group: 'Actions',
        keywords: 'dark light appearance',
        icon: resolvedTheme === 'dark' ? Sun : Moon,
        run: () => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          onClose();
        },
      },
    ];
  }, [go, openExternal, onClose, resolvedTheme, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.group} ${action.keywords ?? ''}`.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandAction[]>();
    for (const action of results) {
      const bucket = map.get(action.group) ?? [];
      bucket.push(action);
      map.set(action.group, bucket);
    }
    return [...map.entries()];
  }, [results]);

  // Reset transient state whenever the palette opens, and manage focus.
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      setQuery('');
      setCursor(0);
      // rAF ensures the input exists and the entry animation has begun.
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      previouslyFocused.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    node?.scrollIntoView({ block: 'nearest' });
  }, [cursor, open]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      results[cursor]?.run();
      return;
    }
    // Focus trap: the dialog contains exactly one tabbable element, so Tab is a no-op.
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-[var(--bg-inset)]/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
            className={cn(
              'relative w-full max-w-xl overflow-hidden rounded-2xl',
              'border border-line bg-elevated shadow-[var(--shadow-float)]',
            )}
          >
            <div className="flex items-center gap-3 border-b border-line-subtle px-4">
              <Search className="size-4 shrink-0 text-fg-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections, projects, actions…"
                className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-fg-faint"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-faint sm:block">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              id="command-list"
              role="listbox"
              aria-label="Results"
              className="max-h-[52vh] overflow-y-auto overscroll-contain p-2"
            >
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-fg-muted">
                  No results for “{query}”
                </p>
              )}

              {grouped.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
                    {group}
                  </div>
                  {items.map((action) => {
                    flatIndex += 1;
                    const isActive = flatIndex === cursor;
                    const Icon = action.icon;
                    const index = flatIndex;

                    return (
                      <button
                        key={action.id}
                        id={`cmd-${action.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        tabIndex={-1}
                        onMouseMove={() => setCursor(index)}
                        onClick={action.run}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left',
                          'text-sm transition-colors duration-100',
                          isActive ? 'bg-tint text-fg' : 'text-fg-secondary',
                        )}
                      >
                        <Icon className="size-4 shrink-0 text-fg-faint" aria-hidden />
                        <span className="flex-1 truncate">{action.label}</span>
                        {action.hint && (
                          <span className="hidden truncate text-xs text-fg-faint sm:block">
                            {action.hint}
                          </span>
                        )}
                        {isActive && (
                          <CornerDownLeft className="size-3.5 shrink-0 text-fg-faint" aria-hidden />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line-subtle px-4 py-2.5 text-xs text-fg-faint">
              <span className="flex items-center gap-1.5">
                <ExternalLink className="size-3" aria-hidden />
                {site.name}
              </span>
              <span className="hidden gap-3 font-mono sm:flex">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
