import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

/** Short list along the bottom of the share card. */
const CAPABILITIES = [
  'Salesforce · Apex · LWC',
  'Agentforce · Gen AI',
  'AI & Machine Learning',
  'Web Apps & APIs',
] as const;

/**
 * Dynamically generated social preview card.
 *
 * Generated from the content layer at build time, so the image a recruiter sees in
 * Slack, LinkedIn or iMessage can never go stale relative to the site. Replaces the
 * previous behaviour, where sharing the URL produced a blank card.
 *
 * Note: `next/og` supports a restricted CSS subset (flexbox only, no grid, no CSS
 * variables), so this file intentionally uses inline styles and explicit hex values.
 */
// Deliberately NOT `runtime = 'edge'`, the edge runtime opts this route out of
// static generation, which would mean re-rendering the card on every social-crawler
// hit. On the Node runtime it is prerendered once at build time and served as a
// static PNG.
export const alt = `${site.name} | ${site.currentTitle} at ${site.currentCompany}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0c0e13',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Aurora accents, matching the site's own backdrop. */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,124,255,0.30), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            right: -140,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,116,255,0.24), transparent 70%)',
          }}
        />

        {/* Top row: monogram + availability */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 14,
                background: '#f2f4f8',
                color: '#0c0e13',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              BM
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: '#98a0b3' }}>
              {site.location}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 24px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
              fontSize: 22,
              color: '#c8cede',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#34d399',
              }}
            />
            {site.availability.label}
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 94,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: 36, color: '#7ba2ff', letterSpacing: -0.5 }}>
            {site.currentTitle} at {site.currentCompany} · {site.role}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#98a0b3',
              maxWidth: 940,
              lineHeight: 1.45,
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* Capability strip */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 32,
          }}
        >
          {CAPABILITIES.map((item) => (
            <div
              key={item}
              style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: '#c8cede' }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#7ba2ff',
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
