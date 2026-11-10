/**
 * Education. Used by the Education section, the on-page resume and the
 * structured data, so a change here shows up everywhere.
 */

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  field?: string;
  start: string;
  end: string;
  /** Headline academic result, pre-formatted for display. */
  score: { value: string; label: string };
  location: string;
};

export const education: readonly Education[] = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    qualification: 'B.Tech',
    field: 'Computer Science and Business Systems',
    start: '2021',
    end: '2025',
    score: { value: '8.77', label: 'CGPA' },
    location: 'Vellore, India',
  },
  {
    id: 'fiitjee',
    institution: 'FIITJEE',
    qualification: 'HSC — Class XII',
    start: '2019',
    end: '2021',
    score: { value: '95%', label: 'TSBIE' },
    location: 'Hyderabad, India',
  },
  {
    id: 'sanskruthi',
    institution: 'Sanskruthi Global School',
    qualification: 'High School — Class X',
    start: '2017',
    end: '2019',
    score: { value: '94.4%', label: 'CBSE' },
    location: 'Hyderabad, India',
  },
] as const;
