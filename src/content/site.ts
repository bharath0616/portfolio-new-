/**
 * Basic site info — name, contact details, links and the hero/about text.
 * Everything else on the site pulls these values from here.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bharath1603.vercel.app';

/**
 * Google Drive file ID of my resume (the part after /file/d/ in the share link).
 * The site always serves the latest version of this file — see
 * src/app/resume.pdf/route.ts for how to update it.
 */
const RESUME_DRIVE_ID = '13gETqEz6jmemN-dPhf9-esHRSQAgyON6';

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
  /** Always the latest resume, pulled from Google Drive. Used for downloads. */
  resumePath: '/resume.pdf',
  resumeFileName: 'Bharath-Mudduluru-Resume.pdf',
  resumeDriveId: RESUME_DRIVE_ID,
  /** Same file opened in Google Drive's viewer. */
  resumeDriveUrl: `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/view?usp=sharing`,
  /** Backup copy in /public, only used if Google Drive can't be reached. */
  resumeFallbackPath: '/Bharath-Mudduluru-Resume.pdf',
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
    'Salesforce developer at PwC, working with Apex, LWC, APIs and Agentforce to build Gen AI agents. I also build web apps and AI projects.',
  bio: [
    "Hi, I'm Bharath. I work at PwC as an Associate on Salesforce projects. I build features with Apex and LWC, connect Salesforce with other systems using APIs, and fix production issues. I also work with Agentforce, building Gen AI agents on Salesforce that use LLMs.",
    'Before PwC, I worked on the backend of an AI chatbot at Urbanchat.ai using Node.js and Express. Before that, I did a web development internship at Neovatic Technologies.',
    'I finished my B.Tech at VIT in 2025. In my free time I build web apps and AI and machine learning projects.',
  ],
} as const;

export type SocialLink = {
  label: string;
  href: string;
  /** Icon key resolved in the icon registry — keeps content free of JSX. */
  icon: 'github' | 'linkedin' | 'mail' | 'phone';
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
