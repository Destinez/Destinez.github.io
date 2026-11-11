export type Person = {
  fullName: string;
  shortName: string;
  headline: string;
  headlineLong: string;
  location: string;
  yearsExperience: number;
  hireable: boolean;
  availability: string;
  githubBio: string;
};

export type HeroContent = {
  name: string;
  role: string;
  preferredTaglineIndex: number;
  taglineOptions: readonly string[];
  supportingOneLiner: string;
  availabilityLine: string;
};

export type AboutContent = {
  thirdPerson: readonly string[];
  firstPerson: readonly string[];
};

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string | null;
  current: boolean;
  periodLabel: string;
  highlights: readonly string[];
  productName?: string;
  productNameSource?: string;
  stackFromGithubReadme?: readonly string[];
  stackSource?: string;
  codeNote?: string;
  attributedHeadcount?: {
    value: string;
    unit: string;
    attribution: string;
  };
};

export type SkillGroup = {
  group: string;
  items: readonly string[];
  sourceNote?: string;
};

export type Project = {
  rank: number;
  id: string;
  name: string;
  repoName?: string;
  oneLiner: string;
  description: string;
  stack: readonly string[];
  repoUrl: string;
  liveUrl: string | null;
  liveUrlNote?: string;
  language: string;
  lastUpdatedLagos: string;
  license: string | null;
  featuredReason: string;
  caveats?: readonly string[];
  label?: string;
};

export type CaseMetric = {
  label: string;
  value: string;
  source: string;
  onCv: boolean;
  guidance?: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  productName?: string;
  productNameSource?: string;
  company: string;
  role: string;
  periodLabel: string;
  oneLiner: string;
  summary: string;
  relatedDelivery?: readonly string[];
  stack?: readonly string[];
  stackSource?: string;
  liveUrl: string | null;
  urlNote: string;
  metrics: readonly CaseMetric[];
  codePublic: boolean;
  codeNote?: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  abbreviation: string;
  periodLabel: string;
};

export type Certification = {
  name: string;
  issuer: string;
};

export type Award = {
  year: number;
  title: string;
  note?: string;
};

export type Contact = {
  email: string;
  github: string;
  linkedin: string;
};

export type PageProject = {
  id: string;
  name: string;
  oneLiner: string;
  status: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  chips: readonly string[];
};

export type ExperienceStripItem = {
  id: string;
  company: string;
  line: string;
};
