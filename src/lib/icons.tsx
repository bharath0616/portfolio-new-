import type { ComponentType, SVGProps } from 'react';
import {
  SiGithub,
  SiInstagram,
  SiGoogle,
  SiUdemy,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiRedux,
  SiFlask,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiDocker,
  SiPostman,
  SiGit,
  SiJquery,
  SiBitbucket,
  SiJupyter,
  SiMysql,
} from 'react-icons/si';
// LinkedIn, AWS and Salesforce marks were dropped from the `si` set in react-icons v5;
// the Font Awesome 6 set still carries them.
import { FaAws, FaLinkedin, FaSalesforce } from 'react-icons/fa6';
import { TbBrandVscode } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';
import { Mail, Phone, Users, Award, Trophy, Target, Code, Layers, Brain, Wrench, Database, Cloud } from 'lucide-react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Central icon registry.
 *
 * Content files reference icons by string key so they stay pure data (serializable,
 * no JSX, usable from server components). This is the single place a key becomes a
 * component, which also means every icon import is tree-shaken from one location.
 */
export const socialIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
  instagram: SiInstagram,
  mail: Mail,
  phone: Phone,
} satisfies Record<string, IconComponent>;

export const brandIcons = {
  google: SiGoogle,
  microsoft: VscAzure,
  aws: FaAws,
  udemy: SiUdemy,
} satisfies Record<string, IconComponent>;

export const groupIcons = {
  code: Code,
  layers: Layers,
  brain: Brain,
  wrench: Wrench,
  database: Database,
  cloud: Cloud,
} satisfies Record<string, IconComponent>;

export const achievementIcons = {
  users: Users,
  award: Award,
  trophy: Trophy,
  target: Target,
} satisfies Record<string, IconComponent>;

export type TechIcon = {
  name: string;
  Icon: IconComponent;
  /** Brand color, used at low opacity on hover only — never as a fill. */
  color: string;
};

/**
 * Technology marquee. Ordered to open with the strongest signals.
 * Colors are the official brand hexes; they appear only on hover so the default
 * state stays monochrome and calm.
 */
export const techStack: readonly TechIcon[] = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express', Icon: SiExpress, color: '#FFFFFF' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'SQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Redux', Icon: SiRedux, color: '#764ABC' },
  { name: 'Flask', Icon: SiFlask, color: '#FFFFFF' },
  { name: 'scikit-learn', Icon: SiScikitlearn, color: '#F7931E' },
  { name: 'TensorFlow', Icon: SiTensorflow, color: '#FF6F00' },
  { name: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Pandas', Icon: SiPandas, color: '#150458' },
  { name: 'NumPy', Icon: SiNumpy, color: '#4DABCF' },
  { name: 'Jupyter', Icon: SiJupyter, color: '#F37626' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Bitbucket', Icon: SiBitbucket, color: '#0052CC' },
  { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
  { name: 'VS Code', Icon: TbBrandVscode, color: '#007ACC' },
  { name: 'Salesforce', Icon: FaSalesforce, color: '#00A1E0' },
  { name: 'jQuery', Icon: SiJquery, color: '#0769AD' },
] as const;
