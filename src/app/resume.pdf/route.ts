import { site } from '@/content/site';

/**
 * /resume.pdf: always serves the latest version of my resume from Google Drive.
 *
 * To update the resume, replace the file on Drive *in place*:
 *   Drive → right-click the resume → File information → Manage versions →
 *   Upload new version.
 * That keeps the same link (same file ID), and the site picks up the new PDF
 * within about 5 minutes. No code change or redeploy needed.
 *
 * If Drive can't be reached, or sends back something that isn't a PDF (e.g. the
 * file was made private), this falls back to the copy in /public.
 */

// How often (in seconds) to check Drive for a new version.
export const revalidate = 300;

const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${site.resumeDriveId}`;

export async function GET() {
  try {
    const response = await fetch(DRIVE_DOWNLOAD_URL, { next: { revalidate } });
    const bytes = await response.arrayBuffer();

    // Every PDF starts with "%PDF-". Drive sends an HTML page instead when the
    // file is private, missing, or too large to skip its virus-scan warning.
    const isPdf = response.ok && new TextDecoder().decode(bytes.slice(0, 5)) === '%PDF-';
    if (!isPdf) {
      throw new Error(`Drive returned ${response.status} (${response.headers.get('content-type')})`);
    }

    return new Response(bytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${site.resumeFileName}"`,
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[resume] Could not load resume from Google Drive, using backup copy:', error);
    // Relative Location on purpose: this response can be cached at build time,
    // where there is no real host to build an absolute URL from.
    return new Response(null, {
      status: 307,
      headers: { Location: site.resumeFallbackPath, 'Cache-Control': 'no-store' },
    });
  }
}
