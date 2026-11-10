/**
 * Leadership role from college. Shown at the bottom of the Education section.
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
  period: '2024 - 2025',
  detail: 'I was the Technical Head of our IEEE TEMS chapter in college.',
  points: [
    'Led 4 technical domains.',
    'Mentored members on their technical work.',
    'Organized 2+ major events.',
  ],
};
