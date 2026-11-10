/**
 * Work experience.
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
      'I work on Salesforce projects. I build features with Apex and LWC, work on Gen AI agents with Agentforce, connect Salesforce to other systems using APIs, and fix production issues.',
    highlights: [
      'Worked with Agentforce to build Gen AI agents in Salesforce that use LLMs.',
      'Built API integrations between Salesforce and external systems, including request and response mapping.',
      'Wrote and optimized SOQL queries for transactions that handle 10K+ records.',
      'Developed Salesforce features using Apex, LWC and JavaScript in Agile sprints.',
      'Fixed 20+ production issues and built reusable LWC components.',
      'Used Git and Bitbucket for version control, code reviews and CI/CD.',
    ],
    stack: ['Salesforce', 'Agentforce', 'Gen AI', 'LLMs', 'Apex', 'LWC', 'JavaScript', 'SOQL', 'REST APIs', 'Git', 'Bitbucket', 'CI/CD', 'Agile'],
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
    summary: 'Worked on the backend of an AI chatbot product.',
    highlights: [
      'Built and maintained Node.js and Express APIs, and shipped a voice AI integration among other features.',
      "Improved the chatbot's answers using prompt engineering and Pinecone (a vector database).",
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
    summary: 'A short internship where I built a web app and automated some manual tasks.',
    highlights: [
      'Built a React and Node.js app that works with real-time data.',
      'Automated data extraction and emails using UiPath RPA.',
    ],
    stack: ['React', 'Node.js', 'UiPath RPA'],
  },
] as const;
