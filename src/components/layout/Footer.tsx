import { ArrowUpRight, MapPin } from 'lucide-react';
import { navItems, site, socials } from '@/content/site';
import { socialIcons } from '@/lib/icons';
import { SectionDivider } from '@/components/ui/Section';

/**
 * Footer — a server component, so none of this ships JavaScript.
 * Repeats the two actions that matter (email, résumé) because a visitor who has
 * scrolled this far has finished reading and needs a next step in reach.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <SectionDivider />

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Identity + primary CTA */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-fg font-mono text-sm font-bold text-[color:var(--bg-base)]">
                BM
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {site.name}
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
              {site.currentTitle} at {site.currentCompany}. Building APIs, data pipelines and
              interfaces that are measured by what they improve.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="group inline-flex w-fit items-center gap-2 text-base font-medium text-fg transition-colors hover:text-primary"
            >
              {site.email}
              <ArrowUpRight className="size-4 transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <p className="flex items-center gap-2 text-sm text-fg-muted">
              <MapPin className="size-4 shrink-0" aria-hidden />
              {site.location}
            </p>
          </div>

          {/* Section index */}
          <nav aria-label="Footer">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
              Sections
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
              Elsewhere
            </h2>
            <ul className="flex flex-col gap-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <Icon className="size-4 shrink-0" aria-hidden />
                      {social.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  Résumé (PDF)
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-faint">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-fg-faint">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
