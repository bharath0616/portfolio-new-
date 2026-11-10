import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { site, SITE_URL } from '@/content/site';
import { buildFullSchema } from '@/lib/jsonld';
import { Providers } from './providers';
import { Shell } from '@/components/layout/Shell';
import { Footer } from '@/components/layout/Footer';
import { Backdrop } from '@/components/ui/Backdrop';
import './globals.css';

/**
 * Fonts are self-hosted at build time by `next/font`.
 *
 * That removes the render-blocking request to Google's CDN, eliminates a
 * third-party origin from the critical path, and, because Next generates a
 * matching `size-adjust` fallback, produces effectively zero layout shift when the
 * webfont swaps in. Both families are variable, so all weights cost one file each.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  // Only the weights actually used, so the variable axis is subset accordingly.
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-jb',
  weight: ['400', '500', '600'],
});

const description = `${site.name}, ${site.currentTitle} at ${site.currentCompany}. Software engineer working with Salesforce (Apex, LWC, Agentforce), Gen AI agents and the MERN stack. Based in ${site.location}.`;

export const metadata: Metadata = {
  // Makes every relative URL below resolve absolutely, required for OG tags.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
    'Software Engineer',
    'Full Stack Developer',
    'Salesforce Developer',
    'Apex',
    'LWC',
    'Agentforce',
    'Gen AI',
    'LLM',
    'React Developer',
    'Node.js Developer',
    'MERN Stack',
    'PwC',
    'Hyderabad',
    'India',
    'Portfolio',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Bharath',
    lastName: 'Mudduluru',
    username: 'bharath0616',
    title: `${site.name} | ${site.role}`,
    description,
    url: SITE_URL,
    siteName: `${site.name} | Portfolio`,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.currentTitle} at ${site.currentCompany}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.role}`,
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Not capped at 1, clamping zoom is a WCAG 1.4.4 failure.
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0e13' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildFullSchema();

  return (
    <html
      lang="en"
      // next-themes writes the theme class here before paint; React would otherwise
      // warn about the server/client attribute difference.
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Structured data. Injected as a raw script tag rather than via next/script
            so it is present in the initial HTML for crawlers that do not run JS. */}
        <script
          type="application/ld+json"
          // Content is built from our own typed content layer, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-svh antialiased">
        <Providers>
          {/* First tabbable element on the page, lets keyboard and screen-reader
              users bypass the navigation entirely. */}
          <a
            href="#main"
            className="sr-focusable left-4 top-4 z-[100] rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-[color:var(--bg-base)] shadow-lg"
          >
            Skip to content
          </a>

          <Backdrop />
          <Shell />

          <main id="main" tabIndex={-1} className="relative focus:outline-none">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
