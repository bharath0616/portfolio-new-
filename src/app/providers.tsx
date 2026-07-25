'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Client providers.
 *
 * `disableTransitionOnChange` suppresses CSS transitions for the instant the theme
 * class swaps — without it, every transitioning property on the page animates at
 * once and the switch reads as a slow smear rather than an instant change.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
