import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';
import { SectionDivider } from '@/components/ui/Section';

/**
 * Single-page composition.
 *
 * Order is a narrative, not a checklist: identity → context → proof of work →
 * capability → credentials → the ask. A recruiter who stops reading at any point
 * has still seen the strongest available signal up to that point.
 *
 * Eight sections, down from thirteen. Impact, Timeline, Stack and Achievements were
 * removed because each restated content the reader had already seen — length is not
 * the same as substance, and repetition actively costs credibility.
 *
 * Statically generated at build time: the entire page is HTML at first byte, which
 * is what makes the content crawlable and the LCP fast.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Education />
      <Certifications />
      <SectionDivider />
      <Resume />
      <SectionDivider />
      <Contact />
    </>
  );
}
