import { site, SITE_URL, socials } from '@/content/site';
import { experience } from '@/content/experience';
import { education } from '@/content/education';
import { certifications } from '@/content/certifications';
import { projects } from '@/content/projects';
import { allSkills } from '@/content/skills';

/**
 * Schema.org structured data.
 *
 * This is what lets Google render a knowledge-panel-style result for a name query
 * instead of a plain blue link, and it is how AI search surfaces read a profile.
 * Built from the same content layer as the visible page, so the structured data can
 * never contradict what a human sees — which is exactly what triggers a spam flag.
 */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: site.name,
    givenName: 'Bharath',
    familyName: 'Mudduluru',
    url: SITE_URL,
    image: `${SITE_URL}/avatar.png`,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    jobTitle: site.currentTitle,
    description: site.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'Organization',
      name: site.currentCompany,
    },
    alumniOf: education.map((entry) => ({
      '@type': 'EducationalOrganization',
      name: entry.institution,
    })),
    hasCredential: certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: cert.issuer },
      ...(cert.credentialUrl ? { url: cert.credentialUrl } : {}),
    })),
    knowsAbout: allSkills.map((skill) => skill.name),
    sameAs: socials
      .filter((social) => social.href.startsWith('http'))
      .map((social) => social.href),
  };
}

/** Marks the page itself as a professional profile, which Google treats distinctly. */
export function buildProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${site.name} — ${site.role}`,
    mainEntity: { '@id': `${SITE_URL}/#person` },
    dateModified: new Date().toISOString(),
  };
}

/** Each project as a CreativeWork, so they can surface individually in search. */
export function buildProjectsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Projects by ${site.name}`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.tagline,
        author: { '@id': `${SITE_URL}/#person` },
        programmingLanguage: project.stack.join(', '),
        codeRepository: project.links.find((link) => link.kind === 'github')?.href,
        image: `${SITE_URL}${project.image.src}`,
      },
    })),
  };
}

/** Work history as an ItemList of OrganizationRole entries. */
export function buildExperienceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Work experience of ${site.name}`,
    itemListElement: experience.map((role, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'OrganizationRole',
        roleName: role.role,
        startDate: role.start,
        ...(role.end ? { endDate: role.end } : {}),
        description: role.summary,
        memberOf: { '@type': 'Organization', name: role.company },
      },
    })),
  };
}

/** Combined graph — one script tag rather than four. */
export function buildFullSchema() {
  return [
    buildPersonSchema(),
    buildProfilePageSchema(),
    buildExperienceSchema(),
    buildProjectsSchema(),
  ];
}
