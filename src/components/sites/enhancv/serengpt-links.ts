/** Destinations on the official SerenGPT site (https://serengpt.ai/es). */
export const SG_ORIGIN = "https://serengpt.ai";
export const SG_BASE = `${SG_ORIGIN}/es`;

export const sg = {
  home: SG_BASE,
  preparation: `${SG_BASE}/user-panel`,
  jobSearch: `${SG_BASE}/job-search`,
  market: `${SG_BASE}/dashboard`,
  login: `${SG_BASE}/onboarding?returnUrl=%2Fes`,
  myCv: `${SG_BASE}/my-cv`,
  myPhoto: `${SG_BASE}/my-photo`,
  coverLetter: `${SG_BASE}/cover-letter`,
  jobInterview: `${SG_BASE}/job-interview`,
  employability: `${SG_BASE}/employability`,
  recruiterZone: `${SG_BASE}/recruiter-zone`,
  cvAnalysis: `${SG_BASE}/recruiter-zone/cv-analysis`,
  blog: `${SG_BASE}/blog`,
  news: `${SG_BASE}/news`,
  resources: `${SG_BASE}/resources`,
  contacts: `${SG_BASE}/contacts`,
} as const;

export const sgLanguages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
] as const;
