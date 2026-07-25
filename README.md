# Bharath Mudduluru — Portfolio

Personal engineering portfolio. Single-page, statically generated, dual-theme.

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Copy `.env.example` to `.env.local` for contact-form delivery and the canonical
site URL. Both are optional — the app degrades gracefully without them.

---

## Architecture

```
src/
├─ app/                    # Routes, metadata, SEO endpoints
│  ├─ layout.tsx           # Fonts, metadata, JSON-LD, providers, skip link
│  ├─ page.tsx             # Section composition
│  ├─ globals.css          # Design tokens + Tailwind theme mapping
│  ├─ opengraph-image.tsx  # Social card, generated at build time
│  ├─ sitemap.ts / robots.ts / manifest.ts
│  ├─ not-found.tsx
│  └─ api/contact/route.ts # Validated, rate-limited form endpoint
│
├─ content/                # ← Single source of truth. Edit here.
│  ├─ site.ts              # Identity, socials, navigation
│  ├─ experience.ts        # Roles, highlights, metrics
│  ├─ projects.ts          # Case studies
│  ├─ skills.ts            # Grouped skills + where each was used
│  ├─ education.ts
│  ├─ certifications.ts
│  └─ achievements.ts      # Leadership + impact statistics
│
├─ components/
│  ├─ ui/                  # Primitives: Reveal, Tilt, Magnetic, Counter, …
│  ├─ layout/              # Navbar, Footer, CommandPalette, ScrollProgress
│  └─ sections/            # One file per page section
│
├─ hooks/                  # Scroll state, active section, media query, hotkeys
└─ lib/                    # utils, motion language, icon registry, JSON-LD
```

### Content is data, not markup

Every fact on the site lives in `src/content/*.ts` as typed data. Sections render
it. Adding a project means adding an object to `projects.ts` — no component is
touched, and the command palette, JSON-LD, sitemap and OG image pick it up
automatically.

The `Timeline` section is *derived* from `experience`, `education` and
`achievements` rather than duplicating them, so a corrected date propagates
everywhere at once.

---

## Design system

Tokens are authored in **OKLCH** in `globals.css`, then mapped into Tailwind via
`@theme inline`. Because the mapping is `inline`, the utilities reference live CSS
variables — a theme change is a variable swap, not a class-tree rewrite.

- **Themes** — light / dark / system, via `next-themes` on the `class` strategy.
- **Contrast** — every foreground token clears **WCAG AA 4.5:1** against every
  surface in *both* themes. Light-mode values are set independently rather than
  mirrored from dark, because the same lightness does not read the same on both.
- **Type** — fluid `clamp()` scale interpolating between 360px and 1440px, so
  headings never jump at a breakpoint.
- **Motion** — only `transform` and `opacity` are animated (compositor-only, no
  layout or paint). `prefers-reduced-motion` removes decorative motion entirely
  via the `[data-decorative-motion]` hook.

---

## Accessibility

- Semantic landmarks; one `<h1>`; ordered heading hierarchy
- Skip-to-content link as the first tabbable element
- Full keyboard operation, including the command palette (`⌘K` / `/`)
- `aria-expanded` / `aria-controls` on every disclosure; combobox pattern in the palette
- Animated counters and the typewriter expose static text to screen readers
- Visible focus rings; `prefers-reduced-motion` and `forced-colors` honored
- Zoom is not capped (WCAG 1.4.4)

---

## Performance

- Statically generated — full HTML at first byte
- `next/font` self-hosts both families with size-adjusted fallbacks (no CLS)
- `next/image` with AVIF/WebP, explicit dimensions and per-breakpoint `sizes`
- Contribution calendar is `dynamic()` + `ssr: false`, off the critical path
- Sections are server components; only the nav, palette and interactive sections
  ship JavaScript
- `optimizePackageImports` keeps icon barrel files from bloating the bundle

---

## Deployment

Deploys to Vercel with no configuration. Set `NEXT_PUBLIC_SITE_URL` to the
production origin so canonical URLs, the sitemap and Open Graph images resolve
correctly.

---

## License

MIT — see [LICENSE](LICENSE).
