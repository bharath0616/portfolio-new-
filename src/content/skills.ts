/**
 * Skills.
 *
 * Curated, not exhaustive. A 40-item list reads as a keyword dump and dilutes the
 * things actually worth interviewing on, so this keeps only what is (a) in current
 * industry demand, (b) AI/ML relevant, or (c) something with real depth behind it.
 *
 * Deliberately no percentage bars: a self-assigned "React 85%" is unfalsifiable and
 * reads as filler. Each skill instead carries `context` — where it was actually used
 * — which is verifiable against the experience section.
 *
 * Cut in the crisp pass: jQuery and UiPath RPA (legacy / niche), VS Code, Postman,
 * Jupyter, Bitbucket and Agile (tools and process, not differentiating skills),
 * MLflow and "NLP libraries" (too thin to defend in an interview).
 */

export type SkillLevel = 'core' | 'strong' | 'working';

export type Skill = {
  name: string;
  level: SkillLevel;
  /** Where this was used in practice. Rendered on hover/focus. */
  context: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  icon: 'code' | 'layers' | 'brain' | 'database' | 'wrench';
  skills: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    blurb: 'From preprocessing and training through to a model served behind an API.',
    icon: 'brain',
    skills: [
      { name: 'Python', level: 'strong', context: 'ML pipelines, preprocessing, model training' },
      { name: 'scikit-learn', level: 'strong', context: '90% accuracy classifier in AttriTrack' },
      { name: 'Prompt Engineering', level: 'strong', context: '~60% chatbot accuracy lift at Urbanchat.ai' },
      { name: 'Vector Search', level: 'strong', context: 'Pinecone retrieval tuning at Urbanchat.ai' },
      { name: 'Pandas', level: 'strong', context: 'Preprocessing 100+ missing values' },
      { name: 'NumPy', level: 'strong', context: 'Numerical work underpinning ML pipelines' },
      { name: 'PyTorch', level: 'working', context: 'Deep learning experimentation' },
      { name: 'TensorFlow', level: 'working', context: 'Deep learning experimentation' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Interfaces that stay fast and accessible as they grow.',
    icon: 'layers',
    skills: [
      { name: 'React', level: 'core', context: 'Primary UI library since 2023' },
      { name: 'Next.js', level: 'strong', context: 'App Router, SSG, server components' },
      { name: 'TypeScript', level: 'strong', context: 'Typed application code, including this site' },
      { name: 'Tailwind CSS', level: 'strong', context: 'Design-token driven styling' },
      { name: 'Redux Toolkit', level: 'strong', context: 'Global state in IvyEstate' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    blurb: 'Services, persistence, and the contracts between systems.',
    icon: 'database',
    skills: [
      { name: 'Node.js', level: 'core', context: 'Service layer at Urbanchat.ai and Neovatic' },
      { name: 'Express', level: 'core', context: 'REST APIs across every full-stack project' },
      { name: 'REST API Design', level: 'strong', context: 'Request/response mapping at PwC' },
      { name: 'MongoDB', level: 'strong', context: 'Document modelling in the MERN stack' },
      { name: 'SQL', level: 'strong', context: 'Relational querying and schema design' },
      { name: 'Flask', level: 'working', context: 'Model serving in AttriTrack' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages & Platform',
    blurb: 'Fundamentals, plus the enterprise platform I build on daily.',
    icon: 'code',
    skills: [
      { name: 'JavaScript', level: 'core', context: 'Full-stack product work across every role' },
      { name: 'C++', level: 'strong', context: 'Data structures, algorithms, systems fundamentals' },
      { name: 'Apex', level: 'strong', context: 'Business-critical backend logic at PwC' },
      { name: 'LWC', level: 'strong', context: 'Lightning Web Components at PwC' },
      { name: 'SOQL', level: 'strong', context: 'Query optimization — 30–40% faster at PwC' },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    blurb: 'How the work ships and stays shipped.',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 'core', context: 'Version control across every role' },
      { name: 'CI/CD', level: 'strong', context: 'Pipeline integration at PwC' },
      { name: 'Docker', level: 'working', context: 'Containerized local environments' },
    ],
  },
] as const;

/** Flattened view for the command palette and structured data. */
export const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.label })));
