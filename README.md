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
│  └─ achievements.ts      # Leadership role
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

### Sections

`Hero → About → Experience → Projects → Skills → Education → Certifications →
Résumé → Contact`

Eight sections, down from thirteen. **Impact**, **Timeline**, **Stack** and
**Achievements** were removed because each restated content the reader had already
seen — Impact repeated metrics already shown on the roles and projects that
produced them, Timeline repeated Experience and Education on one rail, Stack was a
26-icon grid duplicating Skills, and two of Achievements' three cards repeated
Education and Certifications. The surviving leadership entry moved into Education.

Length is not the same as substance; repetition costs credibility.

### Editorial rules

- **Numbers appear once, at their source.** A metric lives on the role or project
  that produced it, and nowhere else.
- **No invented metrics.** A project with no measured outcome renders no metric
  strip rather than padding one out. `metrics: []` is a valid, intentional state.
- **Skills are curated, not exhaustive.** Editors, API clients and notebooks are
  not differentiating skills. Legacy and niche tooling is omitted from Skills but
  retained in Experience where it is a factual record of the work.

---

## Design system

Tokens are authored in **OKLCH** in `globals.css`, then mapped into Tailwind via
`@theme inline`. Because the mapping is `inline`, the utilities reference live CSS
variables — a theme change is a variable swap, not a class-tree rewrite.

- **Themes** — light / dark / system, via `next-themes` on the `class` strategy.
- **Contrast** — every foreground token clears **WCAG AA 4.5:1** against every
  surface in *both* themes. Light-mode values are set independently rather than
  mirrored from dark, because the same lightness does not read the same on both.
- **Naming rule** — a color token must never share a name with a font-size step
  (`2xs … 6xl`). Both namespaces generate `text-<name>` and Tailwind resolves color
  first, so `--color-base` beside `--text-base` silently turns `text-base` into a
  color. Hence `canvas`, not `base`.
- **Arbitrary values** — always type-hint colors as `text-[color:var(--x)]`. A bare
  `text-[var(--x)]` is ambiguous and Tailwind resolves it to `color`, never
  `font-size`.
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
