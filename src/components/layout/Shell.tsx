'use client';

import { useState } from 'react';
import { Navbar } from './Navbar';
import { CommandPalette } from './CommandPalette';
import { ScrollProgress } from './ScrollProgress';
import { useHotkey } from '@/hooks';

/**
 * Client shell holding the interactive chrome.
 *
 * Isolating this here keeps `layout.tsx` and every section a server component —
 * only the nav, palette and progress bar ship interactivity to the browser, so the
 * page's static HTML (and therefore its LCP and crawlability) is unaffected.
 */
export function Shell() {
  const [commandOpen, setCommandOpen] = useState(false);

  useHotkey('k', () => setCommandOpen((open) => !open), { meta: true });
  useHotkey('Escape', () => setCommandOpen(false), { enabled: commandOpen });
  // Bare "/" opens search, matching the convention in GitHub, Linear and Slack.
  useHotkey('/', () => setCommandOpen(true));

  return (
    <>
      <ScrollProgress />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
