/**
 * Leadership.
 *
 * Trimmed in the crisp pass: the previous "Consistent Academic Standing" and
 * "Multi-Cloud & AI Certified" entries restated the Education and Certifications
 * sections verbatim, and the standalone Impact section restated metrics already
 * shown on the roles and projects that produced them. Repetition reads as padding,
 * so both are gone and the numbers now live only at their source.
 */

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  period: string;
  detail: string;
  points: readonly string[];
};

export const leadership: Achievement = {
  id: 'ieee-tems',
  title: 'Technical Head',
  organization: 'IEEE TEMS',
  period: '2024 – 2025',
  detail:
    'Led the technical arm of the IEEE Technology and Engineering Management Society chapter.',
  points: [
    'Led 4 technical domains across the chapter.',
    'Mentored members through technical projects and skill development.',
    'Organized 2+ major events end to end.',
  ],
};
