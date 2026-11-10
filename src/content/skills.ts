/**
 * Skills, grouped roughly the same way as on my resume.
 *
 * Each skill has a level (how much I use it) and a short note on where I've
 * used it, which shows up when you hover over it.
 */

export type SkillLevel = 'core' | 'strong' | 'working';

export type Skill = {
  name: string;
  level: SkillLevel;
  /** Where I've used it. Shown on hover/focus. */
  context: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  icon: 'code' | 'layers' | 'brain' | 'database' | 'wrench' | 'cloud';
  skills: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  // First, so it's the tab people see when they reach the section — it's my day job.
  {
    id: 'salesforce',
    label: 'Salesforce',
    blurb: 'What I work with day to day at PwC.',
    icon: 'cloud',
    skills: [
      { name: 'Salesforce Platform', level: 'core', context: 'Client projects at PwC since July 2025' },
      { name: 'Agentforce', level: 'strong', context: 'Building Gen AI agents on Salesforce at PwC' },
      { name: 'Apex', level: 'core', context: 'Backend logic for client features at PwC' },
      { name: 'LWC', level: 'core', context: 'UI components at PwC, including reusable ones' },
      { name: 'SOQL', level: 'core', context: 'Writing and tuning queries over 10K+ records' },
      { name: 'API Integrations', level: 'strong', context: 'Request/response mapping with external systems' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'The languages I write code in most.',
    icon: 'code',
    skills: [
      { name: 'JavaScript', level: 'core', context: 'Every day at work (LWC) and in my web projects' },
      { name: 'Python', level: 'strong', context: 'ML projects and data cleaning' },
      { name: 'SQL', level: 'strong', context: 'Queries in my projects, and SOQL at PwC' },
      { name: 'C++', level: 'strong', context: 'DSA and coursework in college' },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    blurb: 'Mostly the MERN stack. This site is built with Next.js and Tailwind.',
    icon: 'layers',
    skills: [
      { name: 'React', level: 'strong', context: 'Frontend for most of my projects' },
      { name: 'Node.js', level: 'strong', context: 'Backend APIs at Urbanchat.ai and in my projects' },
      { name: 'Express', level: 'strong', context: 'REST APIs in my MERN projects' },
      { name: 'MongoDB', level: 'strong', context: 'Database for my MERN projects' },
      { name: 'Next.js', level: 'working', context: 'Used to build this portfolio' },
      { name: 'Tailwind CSS', level: 'working', context: 'Styling for this portfolio' },
      { name: 'Redux Toolkit', level: 'working', context: 'State management in IvyEstate' },
      { name: 'jQuery', level: 'working', context: 'Simple DOM work and small scripts' },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning & AI',
    blurb: 'Gen AI at work (Agentforce at PwC, chatbots at Urbanchat.ai), plus ML from projects and courses.',
    icon: 'brain',
    skills: [
      { name: 'Gen AI & LLMs', level: 'strong', context: 'Agentforce agents at PwC and chatbot work at Urbanchat.ai' },
      { name: 'scikit-learn', level: 'strong', context: 'Logistic regression model in AttriTrack' },
      { name: 'Pandas', level: 'strong', context: 'Cleaning data and handling missing values' },
      { name: 'NumPy', level: 'strong', context: 'Number work in my ML projects' },
      { name: 'Jupyter Notebook', level: 'strong', context: 'Where most of my ML work starts' },
      { name: 'Prompt Engineering', level: 'strong', context: 'Improving chatbot answers at Urbanchat.ai' },
      { name: 'Pinecone', level: 'working', context: 'Vector database tuning at Urbanchat.ai' },
      { name: 'TensorFlow', level: 'working', context: 'Learning projects and coursework' },
      { name: 'PyTorch', level: 'working', context: 'Learning projects and coursework' },
      { name: 'NLP libraries', level: 'working', context: 'Basic text processing' },
      { name: 'MLflow', level: 'working', context: 'Tracking ML experiments' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    blurb: 'What I use to write, test and ship code.',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 'core', context: 'Version control at work and on my projects' },
      { name: 'GitHub', level: 'core', context: 'Where all my personal projects live' },
      { name: 'VS Code', level: 'core', context: 'My everyday editor' },
      { name: 'Bitbucket', level: 'strong', context: 'Code reviews and CI/CD at PwC' },
      { name: 'Postman', level: 'strong', context: 'Testing APIs' },
      { name: 'Docker', level: 'working', context: 'Running apps in containers locally' },
    ],
  },
] as const;

/** Flat list, used by the command palette and structured data. */
export const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.label })));
