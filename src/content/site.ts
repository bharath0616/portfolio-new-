/**
 * Basic site info — name, contact details, links and the hero/about text.
 * Everything else on the site pulls these values from here.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bharath1603.vercel.app';

export const site = {
  name: 'Bharath Mudduluru',
  firstName: 'Bharath',
  role: 'Software Engineer',
  currentTitle: 'Associate',
  currentCompany: 'PwC',
  location: 'Hyderabad, India',
  timezone: 'Asia/Kolkata',
  email: 'mbharath1603@gmail.com',
  phone: '+91 9963431015',
  /** Local copy in /public, used for downloads. */
  resumePath: '/Bharath-Mudduluru-Resume.pdf',
  /** Same resume on Google Drive, used for "view" links. */
  resumeDriveUrl:
    'https://drive.google.com/file/d/13gETqEz6jmemN-dPhf9-esHRSQAgyON6/view?usp=sharing',
  availability: {
    open: true,
    label: 'Open to Software Engineering roles',
  },
  /** Lines that rotate in the hero typewriter. */
  roles: [
    'Associate @ PwC',
    'Salesforce Developer',
    'Full-Stack Developer',
    'Backend Developer',
  ],
  tagline:
    "I work on Salesforce at PwC, mostly Apex, LWC and API integrations. Before that I built Node.js backends and React apps, and I like trying out machine learning on the side.",
  bio: [
    "Hi, I'm Bharath. I'm an Associate at PwC, where I work on Salesforce projects: building features with Apex and LWC, connecting APIs to external systems, and fixing issues that come up in production.",
    'Before PwC, I was a backend engineer at Urbanchat.ai. I built Node.js and Express APIs for their AI chatbot, worked on a voice AI feature, and improved how accurate the bot was using prompt engineering and Pinecone. Before that, I did a short web development internship at Neovatic Technologies.',
    "I finished my B.Tech in Computer Science and Business Systems at VIT in 2025. In my free time I build side projects, mostly MERN apps and some ML, and I've done certifications from Google, Microsoft, AWS and Anthropic along the way.",
  ],
} as const;

export type SocialLink = {
  label: string;
  href: string;
  /** Icon key resolved in the icon registry — keeps content free of JSX. */
  icon: 'github' | 'linkedin' | 'mail' | 'instagram' | 'phone';
  /** Primary links show up in the hero; the rest only in the footer/contact. */
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
  /** Shown in the desktop nav. The rest are reachable from the command palette. */
  inNav: boolean;
};

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
