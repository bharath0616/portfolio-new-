'use client';

import { motion } from 'framer-motion';
import { Check, Download, FileText, Mail, Phone, Printer } from 'lucide-react';
import { useState } from 'react';
import { site } from '@/content/site';
import { experience } from '@/content/experience';
import { education } from '@/content/education';
import { certifications } from '@/content/certifications';
import { skillGroups } from '@/content/skills';
import { projects } from '@/content/projects';
import { leadership } from '@/content/achievements';
import { cn } from '@/lib/utils';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { Panel } from '@/components/ui/Card';

/**
 * Resume — the same content as my PDF, shown as normal text on the page,
 * with buttons to download the PDF or open it on Google Drive.
 */
export function Resume() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2600);
  };

  return (
    <Section id="resume">
      <div className="container-page">
        <SectionHeader
          id="resume"
          eyebrow="Resume"
          title="My resume"
          description="Download the PDF or view it on Google Drive."
        />

        {/* Actions */}
        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap items-center gap-3" data-no-print>
            <Magnetic strength={0.25}>
              <a
                href={site.resumePath}
                download={site.resumeFileName}
                onClick={handleDownload}
                className={cn(
                  'group/dl relative inline-flex h-13 items-center justify-center gap-2.5 overflow-hidden',
                  'rounded-full bg-fg px-7 text-base font-medium text-[color:var(--bg-base)]',
                  'shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-250',
                  'hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:scale-[0.97]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
                )}
              >
                {/* Icon swaps to a checkmark on click — confirms the download fired,
                    which a browser otherwise gives no feedback for. */}
                <motion.span
                  key={downloaded ? 'done' : 'idle'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                  className="flex"
                >
                  {downloaded ? (
                    <Check className="size-4" aria-hidden />
                  ) : (
                    <Download className="size-4 transition-transform duration-250 group-hover/dl:translate-y-0.5" aria-hidden />
                  )}
                </motion.span>
                {downloaded ? 'Downloading…' : 'Download PDF'}
              </a>
            </Magnetic>

            <a
              href={site.resumeDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex h-13 items-center gap-2.5 rounded-full border border-line-strong bg-tint-weak px-7',
                'text-base font-medium text-fg transition-colors duration-250 hover:bg-tint',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
            >
              <FileText className="size-4" aria-hidden />
              View on Google Drive
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className={cn(
                'inline-flex h-13 items-center gap-2.5 rounded-full px-5',
                'text-base font-medium text-fg-muted transition-colors duration-250',
                'hover:bg-tint hover:text-fg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
            >
              <Printer className="size-4" aria-hidden />
              Print
            </button>
          </div>
        </Reveal>

        {/* Readable résumé */}
        <Reveal delay={0.1}>
          <Panel className="mt-10 overflow-hidden">
            {/* Header */}
            <header className="border-b border-line-subtle bg-elevated p-7 sm:p-10">
              <h3 className="text-3xl font-semibold text-fg">{site.name}</h3>
              <p className="mt-1.5 text-lg text-fg-secondary">
                {site.currentTitle} at {site.currentCompany} · {site.location}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-primary"
                  >
                    <Mail className="size-3.5" aria-hidden />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-primary"
                  >
                    <Phone className="size-3.5" aria-hidden />
                    {site.phone}
                  </a>
                </li>
              </ul>
            </header>

            <div className="flex flex-col gap-10 p-7 sm:p-10">
              {/* Experience */}
              <ResumeBlock title="Experience">
                <div className="flex flex-col gap-7">
                  {experience.map((role) => (
                    <div key={role.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h5 className="text-base font-semibold text-fg">
                          {role.role} · <span className="text-primary">{role.company}</span>
                        </h5>
                        <span className="font-mono text-xs text-fg-faint">
                          {role.startLabel} - {role.endLabel}
                        </span>
                      </div>
                      <ul className="mt-2.5 flex flex-col gap-1.5">
                        {role.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex gap-2.5 text-sm leading-relaxed text-fg-muted"
                          >
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-fg-faint"
                              aria-hidden
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

              {/* Projects (only the ones on the PDF) */}
              <ResumeBlock title="Projects">
                <div className="flex flex-col gap-5">
                  {projects
                    .filter((project) => project.onResume)
                    .map((project) => (
                      <div key={project.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h5 className="text-base font-semibold text-fg">{project.title}</h5>
                          <span className="flex gap-3 font-mono text-xs">
                            {project.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-fg-faint transition-colors hover:text-primary"
                              >
                                {link.kind === 'github' ? 'GitHub' : link.label}
                              </a>
                            ))}
                          </span>
                        </div>
                        <ul className="mt-2.5 flex flex-col gap-1.5">
                          {project.impact.slice(0, 2).map((point, index) => (
                            <li
                              key={index}
                              className="flex gap-2.5 text-sm leading-relaxed text-fg-muted"
                            >
                              <span
                                className="mt-2 size-1 shrink-0 rounded-full bg-fg-faint"
                                aria-hidden
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </ResumeBlock>

              {/* Leadership */}
              <ResumeBlock title="Leadership">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h5 className="text-base font-semibold text-fg">
                    {leadership.title} · <span className="text-primary">{leadership.organization}</span>
                  </h5>
                  <span className="font-mono text-xs text-fg-faint">{leadership.period}</span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {leadership.points.join(' ')}
                </p>
              </ResumeBlock>

              {/* Skills */}
              <ResumeBlock title="Skills">
                <dl className="flex flex-col gap-3">
                  {skillGroups.map((group) => (
                    <div
                      key={group.id}
                      className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4"
                    >
                      <dt className="text-sm font-semibold text-fg">
                        {group.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-fg-muted">
                        {group.skills.map((skill) => skill.name).join(' · ')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ResumeBlock>

              {/* Education */}
              <ResumeBlock title="Education">
                <div className="flex flex-col gap-3">
                  {education.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                    >
                      <p className="text-sm text-fg">
                        <span className="font-semibold">{entry.qualification}</span>
                        {entry.field ? ` in ${entry.field}` : ''} ·{' '}
                        <span className="text-fg-muted">{entry.institution}</span> ·{' '}
                        <span className="text-signal">
                          {entry.score.value} {entry.score.label}
                        </span>
                      </p>
                      <span className="font-mono text-xs text-fg-faint">
                        {entry.start} - {entry.end}
                      </span>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

              {/* Certifications */}
              <ResumeBlock title="Certifications">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {certifications.map((cert) => (
                    <li key={cert.id} className="text-sm text-fg-muted">
                      <span className="font-medium text-fg">{cert.name}</span>
                      <span className="text-fg-faint">, {cert.issuer}</span>
                    </li>
                  ))}
                </ul>
              </ResumeBlock>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-4 border-b border-line-subtle pb-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
        {title}
      </h4>
      {children}
    </section>
  );
}
