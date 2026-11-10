/**
 * Projects.
 * `onResume` marks the ones that are also on my PDF resume.
 */

import type { Metric } from './experience';

export type ProjectLink = {
  label: string;
  href: string;
  kind: 'github' | 'demo';
};

export type Project = {
  id: string;
  title: string;
  /** Small label shown above the title. */
  category: string;
  /** One-line summary. */
  tagline: string;
  year: string;
  featured: boolean;
  onResume: boolean;
  image: {
    src: string;
    /** Real image size, so the page doesn't jump while it loads. */
    width: number;
    height: number;
    alt: string;
  };
  problem: string;
  solution: string;
  architecture: readonly string[];
  impact: readonly string[];
  /** Optional big numbers above the text. Left empty for now. */
  metrics: readonly Metric[];
  stack: readonly string[];
  links: readonly ProjectLink[];
};

export const projects: readonly Project[] = [
  {
    id: 'financefix',
    title: 'Personalized Finance Assistance',
    category: 'Personal Finance App',
    tagline:
      'A MERN app (FinanceFix) to track income, expenses and investments in one place, with an AI chatbot.',
    year: '2024',
    featured: true,
    onResume: true,
    image: {
      src: '/projects/financefix.jpg',
      width: 1200,
      height: 800,
      alt: 'FinanceFix dashboard showing income, expense and investment tracking',
    },
    problem:
      'Most finance apps either track spending or show market data. I wanted both in one app.',
    solution:
      'Built with MongoDB, Express, React and Node.js. Users add their income and expenses, and the app uses finance APIs to suggest stocks and mutual funds based on their profile. It also has an AI chatbot for finance questions.',
    architecture: [
      'React frontend with debounced inputs',
      'Node.js and Express backend that calls the finance APIs',
      'MongoDB for users, transactions and portfolio data',
      'Pagination on the transaction and recommendation lists',
      'AI chatbot',
    ],
    impact: [
      'Cut API calls by about 50% using pagination and debouncing.',
      'Income, expenses and investments on one dashboard.',
      "Stock and mutual fund suggestions based on the user's profile.",
    ],
    metrics: [],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs', 'AI Chatbot'],
    links: [
      { label: 'Source', href: 'https://github.com/bharath0616/PFA', kind: 'github' },
      { label: 'Demo', href: 'https://youtu.be/c0dBCwHOros', kind: 'demo' },
    ],
  },
  {
    id: 'attritrack',
    title: 'AttriTrack',
    category: 'Machine Learning',
    tagline: 'A logistic regression model that predicts if a customer is likely to leave.',
    year: '2024',
    featured: true,
    onResume: true,
    image: {
      src: '/projects/attritrack.jpeg',
      width: 1200,
      height: 800,
      alt: 'AttriTrack customer churn prediction interface',
    },
    problem:
      'Companies want to know which customers might leave. The dataset I used had 100+ missing values, so it needed cleaning before training.',
    solution:
      'I cleaned the data with Pandas and trained a logistic regression model using scikit-learn. A Flask backend serves the model, and a small React frontend lets you enter customer details and see the prediction.',
    architecture: [
      'Data cleaning with Pandas and NumPy',
      'Logistic regression model trained with scikit-learn',
      'Flask backend that serves the model',
      'React frontend for entering customer details',
    ],
    impact: [
      'Got 90% accuracy on predicting customer attrition.',
      'Handled 100+ missing values during preprocessing.',
      'Can be used through a simple web app, not just a notebook.',
    ],
    metrics: [],
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Flask', 'React'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/AttriTrack', kind: 'github' }],
  },
  {
    id: 'ivyestate',
    title: 'IvyEstate',
    category: 'Real Estate Website',
    tagline: 'A real estate website where users can list, search and manage properties.',
    year: '2024',
    featured: true,
    onResume: false,
    image: {
      src: '/projects/ivyestate.png',
      width: 1200,
      height: 800,
      alt: 'IvyEstate property listing page',
    },
    problem:
      'I wanted to build a full property listing site where buyers can search listings and sellers can post properties with photos.',
    solution:
      'Built with the MERN stack. Users can sign in with email (JWT) or Google. Redux Toolkit handles the app state, sellers can upload photos, and buyers can search with filters.',
    architecture: [
      'JWT login, plus Google sign-in',
      'Redux Toolkit for listings and user state',
      'Express REST API with protected routes for creating, editing and deleting listings',
      'MongoDB for listings and users',
      'Image upload for property photos',
    ],
    impact: [
      'Sign in with email or Google.',
      'Search listings with filters.',
      'Create, edit and delete your own listings.',
      'Deployed and live on Render.',
    ],
    metrics: [],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux Toolkit', 'JWT', 'Google OAuth'],
    links: [
      { label: 'Source', href: 'https://github.com/bharath0616/IvyEstate', kind: 'github' },
      { label: 'Live Demo', href: 'https://ivyestate-zo0s.onrender.com/', kind: 'demo' },
    ],
  },
  {
    id: 'salus',
    title: 'Salus',
    category: 'Computer Vision',
    tagline: 'A video analytics project for safety and security, using ML with a MERN app.',
    year: '2024',
    featured: false,
    onResume: false,
    image: {
      src: '/projects/salus.png',
      width: 1200,
      height: 800,
      alt: 'Salus video analytics dashboard',
    },
    problem:
      'Security cameras record a lot of footage, but someone has to watch it to catch anything.',
    solution:
      'Salus uses machine learning models to analyse video for safety and security. I used the MERN stack for the dashboard and to connect the ML part to the app.',
    architecture: [
      'ML models that analyse the video',
      'MERN app for the dashboard',
      'Backend that sends the model results to the app',
    ],
    impact: [
      'The model analyses the video, so no one has to watch it all the time.',
      'Results show up in a dashboard.',
    ],
    metrics: [],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Machine Learning', 'Computer Vision'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/Salus', kind: 'github' }],
  },
] as const;

export const featuredProjects = projects.filter((p) => p.featured);
