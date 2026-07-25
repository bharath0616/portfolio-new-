/**
 * Global site configuration and identity.
 * Every piece of contact/identity data on the site resolves from here.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bharathmudduluru.com';

export const site = {
  name: 'Bharath Mudduluru',
  firstName: 'Bharath',
  /** Primary positioning line. Lead with the current role — recruiters scan for it first. */
  role: 'Software Engineer',
  currentTitle: 'Associate',
  currentCompany: 'PwC',
  location: 'Hyderabad, India',
  timezone: 'Asia/Kolkata',
  email: 'mbharath1603@gmail.com',
  phone: '+91 9963431015',
  /** File lives in /public so it is served statically and is directly linkable. */
  resumePath: '/Bharath-Mudduluru-Resume.pdf',
  availability: {
    open: true,
    label: 'Open to Software Engineering roles',
  },
  /** Rotating roles for the hero typewriter. Ordered strongest-signal first. */
  roles: [
    'Software Engineer @ PwC',
    'Full-Stack Engineer',
    'Backend & API Developer',
    'Machine Learning Practitioner',
  ],
  tagline:
    'I build production systems that hold up under load — APIs, data pipelines, and interfaces measured by what they actually improve.',
  bio: [
    "I'm a Software Engineer at PwC, where I design and integrate APIs that move data between external systems and deliver business-critical features across Agile sprints.",
    'Before PwC I built Node.js and Express services at Urbanchat.ai — including a voice-AI integration — and lifted chatbot accuracy by roughly 60% through prompt engineering and Pinecone vector-database tuning.',
    'I work across the stack: C++ and Python for fundamentals and ML, the MERN stack and Next.js for product surfaces, and SQL wherever the data actually lives. I hold cloud and AI certifications from Google, Microsoft, and AWS.',
  ],
} as const;

export type SocialLink = {
  label: string;
  href: string;
  /** Icon key resolved in the icon registry — keeps content free of JSX. */
  icon: 'github' | 'linkedin' | 'mail' | 'instagram' | 'phone';
  /** Primary links surface in the hero; the rest live in the footer. */
  primary: boolean;
};

export const socials: readonly SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/bharath0616',
    icon: 'github',
    primary: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bharath-mudduluru-a6a331139/',
    icon: 'linkedin',
    primary: true,
  },
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    icon: 'mail',
    primary: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bharath0616/',
    icon: 'instagram',
    primary: false,
  },
] as const;

export type NavItem = {
  id: string;
  label: string;
  /** Shown in the compact desktop nav. Secondary items live in the command palette only. */
  inNav: boolean;
};

/**
 * Section order is the narrative order: who → proof → depth → contact.
 *
 * Trimmed in the crisp pass. Removed: Impact (restated metrics already shown on the
 * roles and projects that produced them), Timeline (restated Experience and
 * Education on one rail), Stack (a 26-icon grid duplicating Skills), and
 * Achievements (two of its three cards restated Education and Certifications).
 * Every one was a second telling of something the reader had already been told.
 */
export const navItems: readonly NavItem[] = [
  { id: 'about', label: 'About', inNav: true },
  { id: 'experience', label: 'Experience', inNav: true },
  { id: 'projects', label: 'Projects', inNav: true },
  { id: 'skills', label: 'Skills', inNav: true },
  { id: 'education', label: 'Education', inNav: false },
  { id: 'certifications', label: 'Certifications', inNav: false },
  { id: 'resume', label: 'Resume', inNav: true },
  { id: 'contact', label: 'Contact', inNav: true },
] as const;
