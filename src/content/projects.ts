/**
 * Projects.
 *
 * Each one is written as: the problem → what I built → results → how it's built.
 * `onResume` marks the ones that are also listed on my PDF resume.
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
      'A MERN app (I called it FinanceFix) for tracking income, expenses and investments in one place, with an AI chatbot you can ask questions.',
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
      'Most finance apps either track your spending or show market data, not both. I wanted one app where you can see what you earn, what you spend, and where you could invest.',
    solution:
      "I built it on the MERN stack. You add your income and expenses, and the app pulls stock and mutual fund data from external APIs to suggest investments based on your profile. There's also an AI chatbot you can chat with about your finances.",
    architecture: [
      'React frontend, with debounced inputs so it does not fire a request on every keystroke',
      'Node.js + Express backend that handles all the external finance API calls',
      'MongoDB for users, transactions and portfolio data',
      'Pagination on the transaction and recommendation lists',
      'AI chatbot for finance questions',
    ],
    impact: [
      'Cut API calls by about 50% by adding pagination and debouncing.',
      'Income, expenses and investments all in one place, with real-time portfolio insights.',
      "Stock and mutual fund suggestions based on the user's own profile.",
    ],
    metrics: [{ value: '50%', label: 'Fewer API calls' }],
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
    tagline:
      'Predicts whether a customer is likely to leave, using a logistic regression model with 90% accuracy.',
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
      "Businesses want to know which customers are about to leave so they can do something before it happens. The catch is that real customer data is messy. The dataset I worked with had 100+ missing values.",
    solution:
      'I cleaned up the data first (handling the missing values and preprocessing the features), then trained a logistic regression model with Python and scikit-learn. The model runs behind a Flask backend, with a simple React frontend to enter customer details and see the prediction.',
    architecture: [
      'Data cleaning and preprocessing with Pandas and NumPy',
      'Logistic regression model trained with scikit-learn',
      'Flask backend that serves the model',
      'React frontend to enter customer details and see the result',
    ],
    impact: [
      'Got 90% accuracy predicting customer attrition.',
      'Improved dataset quality by 15% through preprocessing, which also helped the model perform better.',
      'Usable through a small web app instead of only a notebook.',
    ],
    metrics: [
      { value: '90%', label: 'Model accuracy' },
      { value: '15%', label: 'Better data quality' },
    ],
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Flask', 'React'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/AttriTrack', kind: 'github' }],
  },
  {
    id: 'ivyestate',
    title: 'IvyEstate',
    category: 'Real Estate Marketplace',
    tagline:
      'A MERN real estate site where people can list, browse and search properties, with JWT and Google sign-in.',
    year: '2024',
    featured: true,
    onResume: false,
    image: {
      src: '/projects/ivyestate.png',
      width: 1200,
      height: 800,
      alt: 'IvyEstate property marketplace listing page',
    },
    problem:
      'A property site needs to work for two kinds of users: buyers who want to quickly narrow down listings, and sellers who want an easy way to post a property with photos.',
    solution:
      'I built it with the MERN stack. Users can sign up with email and password (JWT) or with Google. Redux Toolkit manages the app state, sellers can upload property images, and buyers get search with filters.',
    architecture: [
      'JWT login, plus Google OAuth as another way to sign in',
      'Redux Toolkit for listing and user state',
      'Express REST API with protected routes for creating, editing and deleting listings',
      'MongoDB for listings and users',
      'Image upload for property photos',
    ],
    impact: [
      'Two ways to sign in, so sellers can get started quickly.',
      'Search with filters to find relevant listings fast.',
      'Full flow from browsing to creating and managing listings, deployed and live.',
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
    tagline:
      'A video analytics project for safety and security, using ML on camera footage with a MERN app on top.',
    year: '2024',
    featured: false,
    onResume: false,
    image: {
      src: '/projects/salus.png',
      width: 1200,
      height: 800,
      alt: 'Salus intelligent video analytics dashboard',
    },
    problem:
      "Security footage is only useful if someone is watching it, and having people watch cameras all day doesn't scale. Most of the time footage only gets checked after something has already happened.",
    solution:
      'Salus runs machine learning models on video to analyse it for safety and security. I used the MERN stack for the UI and to connect the ML part to the rest of the app.',
    architecture: [
      'ML models that analyse the video',
      'MERN app for the dashboard',
      'Backend that connects the model output to the app',
    ],
    impact: [
      "Moves from someone watching footage to the model doing the analysis.",
      'Shows the results in a dashboard instead of raw model output.',
    ],
    metrics: [],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Machine Learning', 'Computer Vision'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/Salus', kind: 'github' }],
  },
] as const;

export const featuredProjects = projects.filter((p) => p.featured);
