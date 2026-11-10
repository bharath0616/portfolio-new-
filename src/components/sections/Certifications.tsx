import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '@/content/certifications';
import { brandIcons } from '@/lib/icons';
import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealItem, StaggerGroup } from '@/components/ui/Reveal';

/**
 * Certifications.
 *
 * Each card states what the certification actually covers, not just its name —
 * recruiters recognize the issuer, engineers want to know the scope.
 *
 * Verification links render only when a credential URL exists. A dead "View
 * Certificate" link is worse than no link at all, so the action degrades away
 * rather than breaking.
 */
export function Certifications() {
  return (
    <Section id="certifications">
      <div className="container-page">
        <SectionHeader
          id="certifications"
          eyebrow="Certifications"
          title="Courses and certifications."
          description="Cloud and AI certifications from Google, Anthropic, Microsoft and AWS, plus Machine Learning A–Z on Udemy. Click any card to view the certificate."
        />

        <StaggerGroup stagger={0.06} className="mt-14 grid gap-5 sm:grid-cols-2">
          {certifications.map((cert) => {
            const BrandIcon = brandIcons[cert.brand];

            return (
              <RevealItem key={cert.id}>
                <article className="group/cert flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line-subtle bg-elevated p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-subtle bg-subtle text-fg"
                      aria-hidden
                    >
                      <BrandIcon className="size-5" />
                    </span>
                    <BadgeCheck className="size-5 shrink-0 text-signal" aria-hidden />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold leading-snug text-fg">
                      {cert.name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                      {cert.issuer}
                    </p>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {cert.scope}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex w-fit items-center gap-1.5 border-t border-line-subtle pt-4 text-sm font-medium text-fg-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      View certificate
                      <ExternalLink className="size-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </article>
              </RevealItem>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
