/**
 * Certifications, in the same order as my resume.
 * If a card has no `credentialUrl`, the "View certificate" link is simply hidden.
 */

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  /** Brand key resolved by the icon registry. */
  brand: 'google' | 'microsoft' | 'aws' | 'udemy' | 'anthropic';
  /** Short note on what it covers. */
  scope: string;
  credentialUrl?: string;
};

export const certifications: readonly Certification[] = [
  {
    id: 'google-ai',
    name: 'Google AI Professional Certificate',
    issuer: 'Google',
    brand: 'google',
    scope: 'Using AI tools in everyday work, writing better prompts, and using AI responsibly.',
    credentialUrl:
      'https://drive.google.com/file/d/1VnH9XvdAnQ-KMyjf7dzwhEe0scXScnoD/view?usp=sharing',
  },
  {
    id: 'claude-developer',
    name: 'Claude Certified Developer - Foundations',
    issuer: 'Anthropic',
    brand: 'anthropic',
    scope: 'The basics of building applications with Claude and the Claude API.',
    credentialUrl: 'https://www.credly.com/badges/8f7d9ff1-b6bd-4418-817d-a29ee0120f1e',
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    brand: 'microsoft',
    scope: 'AI basics on Azure: machine learning, computer vision and NLP services.',
    credentialUrl:
      'https://learn.microsoft.com/en-us/users/bharathmudduluru-1633/credentials/accf25242fb4c94c',
  },
  {
    id: 'claude-architect',
    name: 'Claude Certified Architect - Foundations',
    issuer: 'Anthropic',
    brand: 'anthropic',
    scope: 'The basics of designing solutions and systems around Claude.',
    credentialUrl: 'https://www.credly.com/badges/12143ad1-9a82-4249-a181-e751fdd59dc4',
  },
  {
    id: 'aws-ccp',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    brand: 'aws',
    scope: 'Cloud basics: core AWS services, security and pricing.',
    credentialUrl: 'https://www.credly.com/badges/26cac6b2-cf6b-47d3-b0e9-c74d4e171883',
  },
  {
    id: 'ml-az',
    name: 'Machine Learning A-Z',
    issuer: 'Udemy',
    brand: 'udemy',
    scope: 'Hands-on ML course covering regression, classification, clustering and more.',
    credentialUrl:
      'https://drive.google.com/file/d/1PeBYhLGAFL7e0oQDC7FPeyce58-y3EfS/view?usp=sharing',
  },
] as const;
