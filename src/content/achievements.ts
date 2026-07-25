/**
 * Leadership, achievements, and headline impact statistics.
 */

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  period: string;
  icon: 'users' | 'award' | 'trophy' | 'target';
  detail: string;
  points: readonly string[];
};

export const achievements: readonly Achievement[] = [
  {
    id: 'ieee-tems',
    title: 'Technical Head',
    organization: 'IEEE TEMS',
    period: '2024 – 2025',
    icon: 'users',
    detail:
      'Elected to lead the technical arm of the IEEE Technology and Engineering Management Society chapter.',
    points: [
      'Led 4 technical domains across the chapter.',
      'Mentored members through technical projects and skill development.',
      'Organized 2+ major events end to end.',
    ],
  },
  {
    id: 'academic',
    title: 'Consistent Academic Standing',
    organization: 'VIT · TSBIE · CBSE',
    period: '2017 – 2025',
    icon: 'award',
    detail:
      'Sustained top-decile results across every stage of formal education.',
    points: [
      '8.77 CGPA in B.Tech Computer Science and Business Systems.',
      '95% in Class XII (TSBIE).',
      '94.4% in Class X (CBSE).',
    ],
  },
  {
    id: 'certified',
    title: 'Multi-Cloud & AI Certified',
    organization: 'Google · Microsoft · AWS',
    period: '2023 – 2025',
    icon: 'trophy',
    detail:
      'Certified across three major cloud and AI providers, plus applied machine learning.',
    points: [
      'Google AI Professional Certificate.',
      'Microsoft Certified: Azure AI Fundamentals.',
      'AWS Certified Cloud Practitioner.',
    ],
  },
] as const;

export type Stat = {
  id: string;
  /** Numeric portion, animated by the counter. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** The source of the number, so nothing on this section is unverifiable. */
  source: string;
};

/** Compact stat strip rendered in the hero. Kept to four — more becomes noise. */
export const heroStats: readonly Stat[] = [
  { id: 'exp', value: 2, suffix: '+', label: 'Years in industry', source: 'Since Nov 2023' },
  { id: 'companies', value: 3, label: 'Engineering roles', source: 'PwC, Urbanchat.ai, Neovatic' },
  { id: 'projects', value: 4, label: 'Shipped projects', source: 'Public on GitHub' },
  { id: 'certs', value: 4, label: 'Certifications', source: 'Google, Microsoft, AWS, Udemy' },
] as const;

/** Full impact section — outcomes, not activity. */
export const impactStats: readonly Stat[] = [
  {
    id: 'soql',
    value: 40,
    suffix: '%',
    label: 'Query processing time reduced',
    source: 'SOQL optimization at PwC',
  },
  {
    id: 'records',
    value: 10,
    suffix: 'K+',
    label: 'Records handled per transaction',
    source: 'Enterprise data integration at PwC',
  },
  {
    id: 'accuracy',
    value: 60,
    suffix: '%',
    label: 'Chatbot accuracy improvement',
    source: 'Prompt engineering + Pinecone at Urbanchat.ai',
  },
  {
    id: 'apicalls',
    value: 50,
    suffix: '%',
    label: 'External API calls eliminated',
    source: 'Pagination + debounce in FinanceFix',
  },
  {
    id: 'model',
    value: 90,
    suffix: '%',
    label: 'Churn model accuracy',
    source: 'Logistic regression in AttriTrack',
  },
  {
    id: 'issues',
    value: 20,
    suffix: '+',
    label: 'Production issues resolved',
    source: 'Live system support at PwC',
  },
  {
    id: 'manual',
    value: 50,
    suffix: '%',
    label: 'Manual effort automated away',
    source: 'UiPath RPA at Neovatic',
  },
  {
    id: 'delivery',
    value: 20,
    suffix: '%',
    label: 'Faster feature delivery',
    source: 'Agile sprint work at PwC',
  },
] as const;
