/**
 * Professional experience. Every bullet is traceable to the resume;
 * `metrics` pulls the quantified outcomes forward so they survive a 15-second scan.
 */

export type Metric = {
  value: string;
  label: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  /** ISO-ish start/end used for sorting and <time> semantics. `null` end = current. */
  start: string;
  end: string | null;
  startLabel: string;
  endLabel: string;
  location: string;
  type: 'Full-time' | 'Internship';
  /** One-line framing of the mandate, above the bullet detail. */
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
      'Building and integrating business-critical enterprise features on the Salesforce platform, from API contracts through to production support.',
    highlights: [
      'Designed and integrated APIs with request/response mapping, enabling data exchange across external systems.',
      'Processed 10K+ records per transaction and optimized SOQL queries, reducing processing time by 30–40%.',
      'Developed and delivered scalable, business-critical features using Apex, LWC, and JavaScript — improving workflow efficiency by 25%+ and accelerating feature delivery by 20% across Agile sprints.',
      'Resolved 20+ production issues to improve system stability, and built reusable components that cut frontend effort by 25%.',
      'Used Git and Bitbucket for version control, enabling collaborative development, code reviews, and CI/CD integration.',
    ],
    metrics: [
      { value: '30–40%', label: 'Query time reduced' },
      { value: '10K+', label: 'Records / transaction' },
      { value: '20+', label: 'Production issues resolved' },
      { value: '25%', label: 'Frontend effort saved' },
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
      'Owned backend services for a conversational AI product, spanning API delivery and retrieval-quality tuning.',
    highlights: [
      'Built and maintained Node.js and Express APIs, delivering 2+ features including a voice AI integration.',
      'Improved chatbot accuracy by ~60% through prompt engineering and Pinecone vector database optimization.',
    ],
    metrics: [
      { value: '~60%', label: 'Chatbot accuracy lift' },
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
      'Delivered a real-time React application and automated the manual workflows feeding it.',
    highlights: [
      'Developed a React + Node.js application with real-time data handling, improving data retrieval speed by 20–25%.',
      'Automated workflows using UiPath RPA, reducing manual effort by 50% through data extraction and email automation.',
    ],
    metrics: [
      { value: '20–25%', label: 'Faster data retrieval' },
      { value: '50%', label: 'Manual effort removed' },
    ],
    stack: ['React', 'Node.js', 'UiPath RPA', 'Automation'],
  },
] as const;
