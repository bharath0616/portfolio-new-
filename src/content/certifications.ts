/**
 * Professional certifications.
 *
 * `credentialUrl` is intentionally left undefined where the verification link was not
 * available. The UI degrades gracefully — cards without a URL simply omit the verify
 * action rather than rendering a dead link. Fill these in to activate them.
 */

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  /** Brand key resolved by the icon registry. */
  brand: 'google' | 'microsoft' | 'aws' | 'udemy';
  /** What the certification actually attests to — recruiters skim issuers, engineers read scope. */
  scope: string;
  credentialUrl?: string;
};

export const certifications: readonly Certification[] = [
  {
    id: 'google-ai',
    name: 'Google AI Professional Certificate',
    issuer: 'Google',
    brand: 'google',
    scope: 'Applied AI foundations, prompt design, and responsible deployment practice.',
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    brand: 'microsoft',
    scope: 'Core AI workloads on Azure — machine learning, NLP, and computer vision services.',
  },
  {
    id: 'aws-ccp',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    brand: 'aws',
    scope: 'Cloud architecture fundamentals, core AWS services, security and cost models.',
  },
  {
    id: 'ml-az',
    name: 'Machine Learning A–Z',
    issuer: 'Udemy',
    brand: 'udemy',
    scope: 'End-to-end ML: regression, classification, clustering, and model evaluation.',
  },
] as const;
