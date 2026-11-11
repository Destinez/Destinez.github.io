import {
  about,
  awards,
  certifications,
  contact,
  education,
  experience,
  hero,
  locale,
  person,
  skills,
} from "./content";
import type { ExperienceRole } from "./types";

export type EditorLang = "ts" | "md" | "json";

export type EditorFile = {
  id: string;
  filename: string;
  lang: EditorLang;
  code: string;
};

const EXPERIENCE_FILES: Record<string, string> = {
  freelance: "freelance.ts",
  africanstreams: "africanstreams.ts",
  "digital-switch": "digital-switch.ts",
  npa: "npa.ts",
  unites: "unites.ts",
  unicus: "unicus.ts",
};

function aboutTs(): string {
  const school = education[0];
  const lines = [
    "// about.ts",
    `// ${person.fullName} — ${person.location}`,
    "",
    "export const engineer = {",
    `  name: ${JSON.stringify(person.fullName)},`,
    `  role: ${JSON.stringify(hero.role)},`,
    `  location: ${JSON.stringify(person.location)},`,
    `  yearsShipping: ${person.yearsExperience},`,
    `  hireable: ${person.hireable},`,
    `  domains: ["fintech", "media streaming", "enterprise software"],`,
    `  current: "Freelance & contract",`,
    `  openTo: ${JSON.stringify(person.availability)},`,
    "} as const;",
    "",
    "export const summary = [",
    ...about.firstPerson.map((paragraph) => `  ${JSON.stringify(paragraph)},`),
    "];",
    "",
  ];

  if (school) {
    lines.push(
      "export const education = {",
      `  degree: ${JSON.stringify(school.degree)},`,
      `  institution: ${JSON.stringify(school.institution)},`,
      `  abbreviation: ${JSON.stringify(school.abbreviation)},`,
      `  period: ${JSON.stringify(school.periodLabel)},`,
      "} as const;",
      "",
    );
  }

  lines.push("export const certifications = [");
  for (const item of certifications) {
    lines.push(`  ${JSON.stringify(`${item.name} — ${item.issuer}`)},`);
  }
  lines.push("];", "", "export const awards = [");
  for (const award of awards) {
    lines.push(`  { year: ${award.year}, title: ${JSON.stringify(award.title)} },`);
  }
  lines.push("];", "", `export const githubBio = ${JSON.stringify(person.githubBio)};`, "");
  lines.push(`// Timezone used on this site: ${locale.timezoneLabel}.`);
  lines.push(`// Contact: ${contact.email}`);
  lines.push("");
  return lines.join("\n");
}

function profileMd(): string {
  const school = education[0];
  const lines = [
    `# ${person.fullName}`,
    "",
    hero.role,
    person.location,
    "",
    ...about.firstPerson.flatMap((paragraph) => [paragraph, ""]),
    "## Availability",
    "",
    hero.availabilityLine,
    "",
    "## Education",
    "",
  ];

  if (school) {
    lines.push(
      school.degree,
      `${school.institution} (${school.abbreviation})`,
      school.periodLabel,
      "",
    );
  }

  lines.push("## Certifications", "");
  for (const item of certifications) {
    lines.push(`- ${item.name} — ${item.issuer}`);
  }
  lines.push("", "## Awards", "");
  for (const award of awards) {
    lines.push(`- ${award.year} — ${award.title}`);
    if (award.note) lines.push(`  ${award.note}`);
  }
  lines.push("");
  return lines.join("\n");
}

function focusJson(): string {
  const payload = {
    name: person.fullName,
    location: person.location,
    skills: skills
      .filter((group) => group.group !== "Project-only chips")
      .map((group) => ({
        group: group.group,
        items: group.items,
      })),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

function experienceSource(role: ExperienceRole): string {
  const lines = [
    `// ${role.company}`,
    `// ${role.location} · ${role.periodLabel}`,
    "",
    "export const role = {",
    `  title: ${JSON.stringify(role.title)},`,
    `  company: ${JSON.stringify(role.company)},`,
    `  location: ${JSON.stringify(role.location)},`,
    `  period: ${JSON.stringify(role.periodLabel)},`,
    `  current: ${role.current},`,
  ];

  if (role.productName) {
    lines.push(`  product: ${JSON.stringify(role.productName)},`);
  }

  lines.push("  highlights: [");
  for (const highlight of role.highlights) {
    lines.push(`    ${JSON.stringify(highlight)},`);
  }
  lines.push("  ],");

  if (role.stackFromGithubReadme) {
    lines.push("  stackFromGithubReadme: [");
    for (const item of role.stackFromGithubReadme) {
      lines.push(`    ${JSON.stringify(item)},`);
    }
    lines.push("  ],");
  }

  if (role.attributedHeadcount) {
    lines.push(
      `  headcount: ${JSON.stringify(`${role.attributedHeadcount.value} ${role.attributedHeadcount.unit}`)},`,
    );
  }

  lines.push("} as const;", "");

  if (role.productName && role.productNameSource) {
    lines.push(`// Product name source: ${role.productNameSource}.`);
  }
  if (role.stackSource) lines.push(`// ${role.stackSource}`);
  if (role.codeNote) lines.push(`// ${role.codeNote}`);
  if (role.attributedHeadcount) {
    lines.push(`// Headcount: ${role.attributedHeadcount.attribution}`);
  }
  lines.push("");
  return lines.join("\n");
}

export const aboutTabList: readonly EditorFile[] = [
  { id: "about", filename: "about.ts", lang: "ts", code: aboutTs() },
  { id: "profile", filename: "profile.md", lang: "md", code: profileMd() },
  { id: "focus", filename: "focus.json", lang: "json", code: focusJson() },
];

export const experienceTabList: readonly EditorFile[] = experience.map((role) => ({
  id: role.id,
  filename: EXPERIENCE_FILES[role.id] ?? `${role.id}.ts`,
  lang: "ts" as const,
  code: experienceSource(role),
}));

export function portfolioFilenames(): string[] {
  return [...aboutTabList, ...experienceTabList].map((file) => file.filename);
}

export function readPortfolioFile(name: string): string | null {
  const key = name.trim().toLowerCase().replace(/^\.\//, "");
  const found = [...aboutTabList, ...experienceTabList].find((file) => file.filename.toLowerCase() === key);
  return found ? found.code : null;
}
