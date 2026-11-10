'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, MapPin } from 'lucide-react';
import { site, socials } from '@/content/site';
import { socialIcons, techStack } from '@/lib/icons';
import { charReveal, staggerContainer, transitions } from '@/lib/motion';
import { cn, splitChars } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks';
import { StatusBadge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { Typewriter } from '@/components/ui/Typewriter';
import { SectionGlow } from '@/components/ui/Backdrop';

/**
 * Hero.
 *
 * Reading order is the recruiter's scan order: status → name → current role →
 * one-line value proposition → résumé and contact actions.
 *
 * The name renders as real, selectable text (per-character spans, not an image or
 * canvas), so it is copyable, searchable, indexable and readable by assistive tech.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const nameWords = site.name.split(' ');
  const primarySocials = socials.filter((social) => social.primary);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      <SectionGlow className="-top-40" tone="primary" />

      <div className="container-page">
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex max-w-4xl flex-col items-start gap-7"
        >
          {/* Availability — the first thing a recruiter scans for. */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transitions.base}
          >
            <StatusBadge>{site.availability.label}</StatusBadge>
          </motion.div>

          {/*
            Name. Sized to fit on one line on desktop; on phones it wraps between
            the first and last name. Each word is `nowrap` so the per-letter
            animation spans can never break a word in the middle.

            Solid colour on purpose — gradient text (`background-clip: text`) does
            not paint through the individually transformed letters and would make
            the name invisible.
          */}
          <h1
            id="hero-heading"
            className="text-[clamp(2.75rem,1.5rem+5vw,5rem)] font-semibold leading-[1] text-fg"
          >
            <span className="sr-only">{site.name}</span>
            {reduced ? (
              <span aria-hidden className="block">
                {site.name}
              </span>
            ) : (
              <motion.span
                aria-hidden
                variants={staggerContainer(0.028, 0.15)}
                className="block"
              >
                {nameWords.map((word, wordIndex) => (
                  <Fragment key={`${word}-${wordIndex}`}>
                    {wordIndex > 0 && ' '}
                    <span className="inline-block whitespace-nowrap [perspective:800px]">
                      {splitChars(word).map((char, index) => (
                        <motion.span
                          key={`${char}-${index}`}
                          variants={charReveal}
                          className="inline-block will-change-transform"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </motion.span>
            )}
          </h1>

          {/* Rotating role */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={transitions.base}
            className="flex min-h-[1.6em] items-center font-mono text-lg text-fg-secondary sm:text-xl"
          >
            <span aria-hidden className="mr-2 text-primary">
              ▹
            </span>
            <Typewriter phrases={site.roles} />
          </motion.p>

          {/* Value proposition */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={transitions.base}
            className="max-w-2xl text-lg leading-relaxed text-fg-muted"
          >
            {site.tagline}
          </motion.p>

          {/* Context line */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={transitions.base}
            className="flex items-center gap-2 text-sm text-fg-muted"
          >
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
            {site.location}
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={transitions.base}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25}>
              <LinkButton href={site.resumePath} variant="primary" size="lg" download>
                <Download className="size-4" aria-hidden />
                Download resume
              </LinkButton>
            </Magnetic>

            <Magnetic strength={0.25}>
              <LinkButton href="#contact" variant="secondary" size="lg">
                Get in touch
              </LinkButton>
            </Magnetic>

            {/* Social icons */}
            <ul className="ml-1 flex items-center gap-1">
              {primarySocials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <Magnetic strength={0.4}>
                      <a
                        href={social.href}
                        target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={cn(
                          'inline-flex size-11 items-center justify-center rounded-full',
                          'text-fg-muted transition-colors duration-250',
                          'hover:bg-tint hover:text-fg',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        )}
                      >
                        <Icon className="size-[18px]" aria-hidden />
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Technology marquee — visual texture and a fast read of the stack. */}
      <div
        className="mask-fade-x pointer-events-none mt-20 select-none overflow-hidden"
        aria-hidden
        data-decorative-motion
      >
        <div className="flex w-max animate-[marquee_42s_linear_infinite] gap-12 pr-12">
          {/* Duplicated once so the -50% translate loops seamlessly. */}
          {[...techStack, ...techStack].map((tech, index) => (
            <span key={`${tech.name}-${index}`} className="flex items-center gap-2.5 text-fg-faint">
              <tech.Icon className="size-5 shrink-0" />
              <span className="whitespace-nowrap font-mono text-xs">{tech.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className={cn(
          'absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2',
          'text-xs text-fg-faint transition-colors hover:text-fg lg:flex',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
        aria-label="Scroll to About section"
      >
        <span className="font-mono uppercase tracking-[0.16em]">Scroll</span>
        <motion.span
          data-decorative-motion
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
