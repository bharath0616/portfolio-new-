import type { Metadata } from 'next';
import { ArrowLeft, Home } from 'lucide-react';
import { navItems, site } from '@/content/site';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  // A 404 should never be indexed — it dilutes the site's crawl signal.
  robots: { index: false, follow: true },
};

/**
 * Custom 404.
 *
 * Every dead end still offers a route back into the content rather than a bare
 * error — the visitor arrived looking for something, so give them the index.
 */
export default function NotFound() {
  return (
    <div className="container-page flex min-h-svh flex-col items-center justify-center py-32 text-center">
      <p
        className="font-mono text-6xl font-semibold leading-none text-gradient"
        aria-hidden
      >
        404
      </p>

      <h1 className="mt-6 text-3xl font-semibold text-fg">
        This page doesn&apos;t exist.
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
        The link may be outdated or mistyped. Everything on this site lives on a single
        page. Pick a section below.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <LinkButton href="/" variant="primary" size="lg">
          <Home className="size-4" aria-hidden />
          Back to {site.firstName}&apos;s portfolio
        </LinkButton>
        <LinkButton href="/#projects" variant="secondary" size="lg">
          <ArrowLeft className="size-4" aria-hidden />
          View projects
        </LinkButton>
      </div>

      <nav aria-label="Sections" className="mt-14 border-t border-line-subtle pt-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
