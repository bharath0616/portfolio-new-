/**
 * Work experience. Bullets are taken from my resume.
 * `metrics` are the numbers shown on each card even when it's collapsed.
 */

export type Metric = {
  value: string;
  label: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  /** Used for sorting and <time> tags. `null` end = current job. */
  start: string;
  end: string | null;
  startLabel: string;
  endLabel: string;
  location: string;
  type: 'Full-time' | 'Internship';
  /** Short line shown under the title. */
  summary: string;
  highlights: readonly string[];
  metrics: readonly Metric[];
  stack: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    id: 'pwc',
    company: 'PwC',
    role: 'Associate',
    start: '2025-07',
    end: null,
    startLabel: 'Jul 2025',
    endLabel: 'Present',
    location: 'India',
    type: 'Full-time',
    summary:
      'I work on Salesforce projects here: building features in Apex and LWC, integrating APIs with external systems, and fixing production issues.',
    highlights: [
      'Designed and integrated APIs with request/response mapping, enabling data exchange across external systems.',
      'Processed 10K+ records per transaction and optimized SOQL queries, reducing processing time by 30–40%.',
      'Developed and delivered business-critical features using Apex, LWC and JavaScript, improving workflow efficiency by 25%+ and speeding up feature delivery by 20% across Agile sprints.',
      'Resolved 20+ production issues to improve system stability, and created reusable components that reduced frontend effort by 25%.',
      'Used Git and Bitbucket for version control, code reviews and CI/CD.',
    ],
    metrics: [
      { value: '30–40%', label: 'Less processing time' },
      { value: '10K+', label: 'Records / transaction' },
      { value: '20+', label: 'Prod issues fixed' },
    ],
    stack: ['Apex', 'LWC', 'JavaScript', 'SOQL', 'REST APIs', 'Git', 'Bitbucket', 'CI/CD', 'Agile'],
  },
  {
    id: 'urbanchat',
    company: 'Urbanchat.ai',
    role: 'Backend Engineer',
    start: '2024-06',
    end: '2024-09',
    startLabel: 'Jun 2024',
    endLabel: 'Sep 2024',
    location: 'Remote',
    type: 'Internship',
    summary:
      'Worked on the backend of their AI chatbot: building Node.js APIs and making the bot give better answers.',
    highlights: [
      'Built and maintained Node.js and Express APIs and shipped 2+ features, including a voice AI integration.',
      'Improved chatbot accuracy by ~60% using prompt engineering and Pinecone vector database optimization.',
    ],
    metrics: [
      { value: '~60%', label: 'Better chatbot accuracy' },
      { value: '2+', label: 'Features shipped' },
    ],
    stack: ['Node.js', 'Express', 'Pinecone', 'Prompt Engineering', 'Voice AI', 'REST APIs'],
  },
  {
    id: 'neovatic',
    company: 'Neovatic Technologies Pvt Ltd',
    role: 'Web Developer Intern',
    start: '2023-11',
    end: '2023-12',
    startLabel: 'Nov 2023',
    endLabel: 'Dec 2023',
    location: 'India',
    type: 'Internship',
    summary:
      'A short internship where I built a React + Node.js app and automated some manual work using UiPath.',
    highlights: [
      'Developed a React + Node.js application with real-time data handling, improving data retrieval speed by 20–25%.',
      'Automated workflows using UiPath RPA (data extraction and emails), cutting manual effort by 50%.',
    ],
    metrics: [
      { value: '20–25%', label: 'Faster data retrieval' },
      { value: '50%', label: 'Less manual work' },
    ],
    stack: ['React', 'Node.js', 'UiPath RPA', 'Automation'],
  },
] as const;
