import { cn } from '@/lib/utils';

/**
 * Ambient page backdrop: aurora → grid → noise, composed in that order.
 *
 * Every layer is purely decorative (`aria-hidden`, `pointer-events-none`) and
 * carries `data-decorative-motion`, which the global reduced-motion and
 * forced-colors rules use to remove it entirely.
 *
 * Contrast is protected by construction: the aurora blobs are ~0.16 alpha, heavily
 * blurred, and sit at negative z-index behind an opaque page background. They tint
 * the canvas without ever landing between text and its background.
 */
export function Backdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none fixed inset-0 -z-50 overflow-hidden', className)}
    >
      {/* Base wash so the aurora has something to sit on. */}
      <div className="absolute inset-0 bg-canvas" />

      {/* Aurora field. Three slow, offset blobs read as organic rather than looping. */}
      <div
        data-decorative-motion
        className="absolute -top-[30%] left-[-15%] size-[70vw] max-h-[900px] max-w-[900px] animate-[aurora_24s_ease-in-out_infinite] rounded-full blur-[110px]"
        style={{ background: 'var(--aurora-1)' }}
      />
      <div
        data-decorative-motion
        className="absolute -right-[15%] top-[5%] size-[60vw] max-h-[800px] max-w-[800px] animate-[aurora_30s_ease-in-out_infinite_reverse] rounded-full blur-[120px]"
        style={{ background: 'var(--aurora-2)' }}
      />
      <div
        data-decorative-motion
        className="absolute bottom-[-20%] left-[25%] size-[55vw] max-h-[700px] max-w-[700px] animate-[aurora_36s_ease-in-out_infinite] rounded-full blur-[130px]"
        style={{ background: 'var(--aurora-3)' }}
      />

      {/* Engineering grid, faded at the edges so it never terminates in a hard line. */}
      <div className="grid-overlay absolute inset-0 mask-fade-y opacity-60" />

      {/* Film grain. An inline SVG turbulence — no network request, no image decode. */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 'var(--noise-opacity)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/**
 * Section-scoped glow. Used to give individual sections their own visual identity
 * without introducing a second full-page background layer.
 */
export function SectionGlow({
  className,
  tone = 'primary',
}: {
  className?: string;
  tone?: 'primary' | 'accent' | 'signal';
}) {
  const color =
    tone === 'accent'
      ? 'var(--brand-accent)'
      : tone === 'signal'
        ? 'var(--brand-signal)'
        : 'var(--brand-primary)';

  return (
    <div
      aria-hidden
      data-decorative-motion
      className={cn(
        'pointer-events-none absolute left-1/2 -z-10 h-[420px] w-[min(900px,90vw)]',
        '-translate-x-1/2 rounded-full blur-[130px] opacity-[0.10]',
        className,
      )}
      style={{ background: color }}
    />
  );
}
