/**
 * Project case studies.
 *
 * Each entry is structured as problem → approach → impact rather than a feature list,
 * because that is the shape a hiring engineer reads for. `featured` projects render
 * as full-width case studies; the rest render as a compact grid.
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
  /** Short category label rendered as an eyebrow above the title. */
  category: string;
  /** One sentence. Must stand alone if everything else is collapsed. */
  tagline: string;
  year: string;
  featured: boolean;
  image: {
    src: string;
    /** Intrinsic dimensions prevent layout shift (CLS) on load. */
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
    title: 'FinanceFix',
    category: 'Personal Finance Platform',
    tagline:
      'A MERN finance platform that tracks income, expenses and investments, with an AI assistant layered over live market data.',
    year: '2024',
    featured: true,
    image: {
      src: '/projects/financefix.jpg',
      width: 1200,
      height: 800,
      alt: 'FinanceFix dashboard showing income, expense and investment tracking',
    },
    problem:
      'Personal finance tools either track spending or surface market data — rarely both. Users had no single view connecting what they earn and spend to what they should invest in, and the market data required to close that gap is expensive to fetch on every interaction.',
    solution:
      'I built a MERN platform unifying income, expense and investment tracking with real-time portfolio insights, then integrated external financial APIs for stock and mutual-fund recommendations matched to each user\'s profile. An AI chatbot sits on top as a dialogue-based interface to the same data.',
    architecture: [
      'React SPA with a debounced query layer so keystrokes do not become network requests',
      'Express/Node REST API mediating every third-party financial data call',
      'MongoDB documents modelling users, transactions and portfolio positions',
      'Server-side pagination on transaction and recommendation feeds',
      'AI chatbot integration for conversational access to portfolio state',
    ],
    impact: [
      'Cut external API calls by 50% through pagination and debounce optimization, directly reducing rate-limit pressure and cost per session.',
      'Delivered real-time portfolio insight alongside tracking, removing the need for a second tool.',
      'Personalized stock and mutual-fund recommendations driven by the user\'s own financial profile.',
    ],
    // Only genuinely measured figures. "3-in-1" was a feature count dressed up as
    // a metric — the kind of thing an interviewer discounts the rest of the page for.
    metrics: [{ value: '50%', label: 'Fewer API calls' }],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs', 'AI Chatbot'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/PFA', kind: 'github' }],
  },
  {
    id: 'ivyestate',
    title: 'IvyEstate',
    category: 'Real Estate Marketplace',
    tagline:
      'A full-stack property marketplace with dual-mode authentication, image uploads and advanced search across listings.',
    year: '2024',
    featured: true,
    image: {
      src: '/projects/ivyestate.png',
      width: 1200,
      height: 800,
      alt: 'IvyEstate property marketplace listing page',
    },
    problem:
      'A property marketplace has to serve two opposed users at once: buyers who need to filter a large listing set down to a handful, and sellers who need a low-friction path to publishing a listing with images. Getting authentication wrong blocks both.',
    solution:
      'I built a marketplace on the MERN stack with JWT authentication alongside Google OAuth, so users can sign in with either. Redux Toolkit centralizes listing and session state, image upload handles seller media, and an advanced search layer filters listings by the attributes buyers actually query.',
    architecture: [
      'JWT session auth with Google OAuth as an alternate identity provider',
      'Redux Toolkit store as the single source of truth for listings and auth state',
      'Express REST API with protected create/update/delete listing routes',
      'MongoDB listing schema indexed for the advanced search filters',
      'Image upload pipeline for seller-supplied property media',
    ],
    impact: [
      'Two authentication paths — credentials or Google — removing signup friction for sellers.',
      'Advanced search narrows a full listing set to relevant results, which is the core buyer workflow.',
      'Full listing lifecycle: browse, create, update and manage, deployed and publicly reachable.',
    ],
    // No measured outcome for this one, so it shows none rather than inventing a
    // number. The live demo is the proof here.
    metrics: [],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux Toolkit', 'JWT', 'Google OAuth'],
    links: [
      { label: 'Source', href: 'https://github.com/bharath0616/IvyEstate', kind: 'github' },
      { label: 'Live Demo', href: 'https://ivyestate-zo0s.onrender.com/', kind: 'demo' },
    ],
  },
  {
    id: 'attritrack',
    title: 'AttriTrack',
    category: 'Predictive Analytics',
    tagline:
      'A churn-prediction service reaching 90% accuracy, served through a Flask API behind a React interface.',
    year: '2024',
    featured: true,
    image: {
      src: '/projects/attritrack.jpeg',
      width: 1200,
      height: 800,
      alt: 'AttriTrack customer churn prediction interface',
    },
    problem:
      'Customer attrition is only actionable if it is predicted before the customer leaves — and the raw customer data available for that prediction is incomplete, with missing values across more than a hundred fields.',
    solution:
      'I trained a logistic regression classifier in Python and scikit-learn to score churn likelihood per customer, but the accuracy came from the preprocessing rather than the model: handling 100+ missing values and cleaning the dataset before training. The model is served by a Flask backend and consumed by a React frontend.',
    architecture: [
      'Preprocessing pipeline handling 100+ missing values and feature cleaning',
      'Logistic regression classifier trained with Python and scikit-learn',
      'Flask backend serving the trained model behind a prediction endpoint',
      'React frontend for entering customer attributes and reading predictions',
    ],
    impact: [
      'Reached 90% accuracy predicting whether a customer is likely to churn.',
      'Improved dataset quality by 15% through preprocessing — the change that moved model performance most.',
      'Packaged the model as a served endpoint rather than a notebook, making it consumable by a product.',
    ],
    metrics: [
      { value: '90%', label: 'Model accuracy' },
      { value: '15%', label: 'Dataset quality gain' },
    ],
    stack: ['Python', 'scikit-learn', 'Flask', 'React', 'Pandas', 'NumPy'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/AttriTrack', kind: 'github' }],
  },
  {
    id: 'salus',
    title: 'Salus',
    category: 'Computer Vision',
    tagline:
      'Intelligent video analytics for safety and security, pairing ML inference with a MERN application layer.',
    year: '2024',
    featured: false,
    image: {
      src: '/projects/salus.png',
      width: 1200,
      height: 800,
      alt: 'Salus intelligent video analytics dashboard',
    },
    problem:
      'Security camera footage is only useful if somebody is watching it. Continuous human monitoring does not scale, so incidents are typically reviewed after the fact instead of detected as they happen.',
    solution:
      'I built Salus to apply machine learning to video streams for safety and security analysis, with a MERN stack handling the interface and the integration between the ML layer and the application.',
    architecture: [
      'Machine learning models performing analysis over video input',
      'MERN application layer for the operator interface',
      'Integration layer connecting inference output to the application state',
    ],
    impact: [
      'Moves video review from manual observation toward automated analysis.',
      'Presents inference results through an operator-facing interface rather than raw model output.',
    ],
    metrics: [],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Machine Learning', 'Computer Vision'],
    links: [{ label: 'Source', href: 'https://github.com/bharath0616/Salus', kind: 'github' }],
  },
] as const;

export const featuredProjects = projects.filter((p) => p.featured);
