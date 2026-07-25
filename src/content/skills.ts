/**
 * Skills, grouped by the way an engineer actually thinks about their stack.
 *
 * Deliberately no percentage bars: a self-assigned "React 85%" is unfalsifiable and
 * reads as filler. Instead each skill carries a `level` used only for visual weight,
 * and `context` — where it was actually used — which is the verifiable part.
 */

export type SkillLevel = 'core' | 'strong' | 'working';

export type Skill = {
  name: string;
  level: SkillLevel;
  /** Where this was used in practice. Rendered on hover/focus. */
  context?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  /** Short description of the group's role in the stack. */
  blurb: string;
  icon: 'code' | 'layers' | 'brain' | 'wrench' | 'database' | 'cloud';
  skills: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'The foundation — systems thinking in C++, data work in Python and SQL.',
    icon: 'code',
    skills: [
      { name: 'C++', level: 'core', context: 'Data structures, algorithms, systems fundamentals' },
      { name: 'JavaScript', level: 'core', context: 'Full-stack product work across every role' },
      { name: 'Python', level: 'strong', context: 'ML pipelines, preprocessing, model training' },
      { name: 'SQL', level: 'strong', context: 'Relational querying and schema design' },
      { name: 'Apex', level: 'strong', context: 'Business-critical backend logic at PwC' },
      { name: 'SOQL', level: 'strong', context: 'Query optimization — 30–40% faster at PwC' },
      { name: 'TypeScript', level: 'working', context: 'Typed application code, including this site' },
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
      { name: 'Tailwind CSS', level: 'strong', context: 'Design-token driven styling' },
      { name: 'Redux Toolkit', level: 'strong', context: 'Global state in IvyEstate' },
      { name: 'LWC', level: 'strong', context: 'Lightning Web Components at PwC' },
      { name: 'jQuery', level: 'working', context: 'Legacy interface maintenance' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    blurb: 'APIs, persistence, and the contracts between services.',
    icon: 'database',
    skills: [
      { name: 'Node.js', level: 'core', context: 'Service layer at Urbanchat.ai and Neovatic' },
      { name: 'Express', level: 'core', context: 'REST APIs across every full-stack project' },
      { name: 'MongoDB', level: 'strong', context: 'Document modelling in the MERN stack' },
      { name: 'REST API Design', level: 'strong', context: 'Request/response mapping at PwC' },
      { name: 'Flask', level: 'working', context: 'Model serving in AttriTrack' },
      { name: 'Pinecone', level: 'working', context: 'Vector search — 60% accuracy lift' },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning & AI',
    blurb: 'From preprocessing through training to a served endpoint.',
    icon: 'brain',
    skills: [
      { name: 'scikit-learn', level: 'strong', context: '90% accuracy classifier in AttriTrack' },
      { name: 'Pandas', level: 'strong', context: 'Preprocessing 100+ missing values' },
      { name: 'NumPy', level: 'strong', context: 'Numerical work underpinning ML pipelines' },
      { name: 'TensorFlow', level: 'working', context: 'Deep learning experimentation' },
      { name: 'PyTorch', level: 'working', context: 'Deep learning experimentation' },
      { name: 'Prompt Engineering', level: 'strong', context: 'Chatbot accuracy work at Urbanchat.ai' },
      { name: 'NLP Libraries', level: 'working', context: 'Text processing for conversational AI' },
      { name: 'MLflow', level: 'working', context: 'Experiment tracking' },
    ],
  },
  {
    id: 'tooling',
    label: 'Tooling & Delivery',
    blurb: 'How the work actually ships and stays shipped.',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 'core', context: 'Version control across every role' },
      { name: 'GitHub', level: 'core', context: 'Source hosting and code review' },
      { name: 'Bitbucket', level: 'strong', context: 'Code review and CI/CD at PwC' },
      { name: 'CI/CD', level: 'strong', context: 'Pipeline integration at PwC' },
      { name: 'Docker', level: 'working', context: 'Containerized local environments' },
      { name: 'Postman', level: 'strong', context: 'API contract testing' },
      { name: 'Agile', level: 'strong', context: '20% faster delivery across sprints' },
      { name: 'UiPath RPA', level: 'working', context: '50% manual effort removed at Neovatic' },
      { name: 'Jupyter', level: 'strong', context: 'Exploratory data analysis' },
      { name: 'VS Code', level: 'core', context: 'Primary editor' },
    ],
  },
] as const;

/** Flattened view for the command palette and search. */
export const allSkills = skillGroups.flatMap((g) =>
  g.skills.map((s) => ({ ...s, group: g.label })),
);
