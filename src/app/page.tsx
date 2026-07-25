import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { TechStack } from '@/components/sections/TechStack';
import { Impact } from '@/components/sections/Impact';
import { Timeline } from '@/components/sections/Timeline';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { Achievements } from '@/components/sections/Achievements';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';
import { SectionDivider } from '@/components/ui/Section';

/**
 * Single-page composition.
 *
 * Order is a narrative, not a checklist: identity → context → proof of work →
 * capability → evidence → credentials → the ask. A recruiter who stops reading at
 * any point has still seen the strongest available signal up to that point.
 *
 * This route is statically generated at build time — the entire page is HTML at
 * first byte, which is what makes the content crawlable and the LCP fast.
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
      <TechStack />
      <SectionDivider />
      <Impact />
      <Timeline />
      <SectionDivider />
      <Education />
      <Certifications />
      <Achievements />
      <SectionDivider />
      <Resume />
      <SectionDivider />
      <Contact />
    </>
  );
}
