import {
  about,
  awards,
  caseStudies,
  certifications,
  contact,
  coreSkills,
  education,
  experience,
  hero,
  person,
  projects,
} from "../data/content";
import { portfolioFilenames, readPortfolioFile } from "../data/editorFiles";
import type { CaseStudy, ExperienceRole, Project } from "../data/types";

export type Segment =
  | { type: "text"; value: string }
  | { type: "dim"; value: string }
  | { type: "strong"; value: string }
  | { type: "link"; value: string; href: string };

export type Block = {
  tone: "in" | "out" | "err";
  segments: Segment[];
};

export type CommandResult = {
  clear?: true;
  navigate?: string;
  blocks: Block[];
};

const COMMANDS = [
  "help",
  "about",
  "projects",
  "experience",
  "cases",
  "skills",
  "education",
  "contact",
  "resume",
  "open",
  "ls",
  "cat",
  "whoami",
  "history",
  "clear",
] as const;

const OPEN_TARGETS = [
  "top",
  "about",
  "experience",
  "projects",
  "cases",
  "skills",
  "terminal",
  "education",
  "contact",
] as const;

const OPEN_IDS: Record<string, string> = {
  top: "top",
  hero: "top",
  about: "about",
  experience: "experience",
  projects: "projects",
  work: "projects",
  cases: "cases",
  case: "cases",
  skills: "skills",
  terminal: "terminal",
  shell: "terminal",
  education: "education",
  background: "education",
  contact: "contact",
};

const ALIASES: Record<string, string> = {
  "?": "help",
  man: "help",
  case: "cases",
  repos: "projects",
  awards: "education",
  certs: "education",
  certifications: "education",
};

function text(value: string): Segment {
  return { type: "text", value };
}

function dim(value: string): Segment {
  return { type: "dim", value };
}

function strong(value: string): Segment {
  return { type: "strong", value };
}

function link(value: string, href: string): Segment {
  return { type: "link", value, href };
}

function out(segments: Segment[]): Block {
  return { tone: "out", segments };
}

function err(segments: Segment[]): Block {
  return { tone: "err", segments };
}

function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function norm(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function longestCommonPrefix(items: readonly string[]): string {
  const first = items[0];
  if (first === undefined) return "";
  let prefix = first;
  for (const item of items) {
    let i = 0;
    const limit = Math.min(prefix.length, item.length);
    while (i < limit && prefix.charAt(i) === item.charAt(i)) i += 1;
    prefix = prefix.slice(0, i);
    if (!prefix) break;
  }
  return prefix;
}

function poolFor(cmd: string): readonly string[] | null {
  switch (cmd) {
    case "open":
      return OPEN_TARGETS;
    case "cat":
      return portfolioFilenames();
    case "projects":
      return projects.map((project) => project.id);
    case "cases":
      return caseStudies.map((study) => study.id);
    case "experience":
      return experience.map((role) => role.id);
    default:
      return null;
  }
}

export function autocomplete(input: string): { completion: string; matches: string[] } {
  const trail = /\s$/.test(input);
  const parts = input.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { completion: "", matches: [...COMMANDS] };

  if (parts.length === 1 && !trail) {
    const partial = (parts[0] ?? "").toLowerCase();
    const matches = COMMANDS.filter((command) => command.startsWith(partial));
    return { completion: longestCommonPrefix(matches), matches: [...matches] };
  }

  const cmd = (parts[0] ?? "").toLowerCase();
  const partial = (trail ? "" : (parts[1] ?? "")).toLowerCase();
  const pool = poolFor(cmd);
  if (!pool) return { completion: input, matches: [] };
  const matches = pool.filter((item) => item.toLowerCase().startsWith(partial));
  if (matches.length === 0) return { completion: input, matches: [] };
  return { completion: `${cmd} ${longestCommonPrefix(matches)}`, matches: [...matches] };
}

export function completeInput(input: string): { next: string; matches: string[] } {
  const suggestion = autocomplete(input);
  if (suggestion.matches.length === 0) return { next: input, matches: [] };

  const trail = /\s$/.test(input);
  const parts = input.trim().split(/\s+/).filter(Boolean);
  const only = suggestion.matches[0];

  if (suggestion.matches.length === 1 && only) {
    if (parts.length === 0 || (parts.length === 1 && !trail)) {
      const pool = poolFor(only);
      if (pool && only.startsWith(input.trim().toLowerCase())) {
        return { next: `${only} `, matches: [...pool] };
      }
      return { next: only, matches: [] };
    }
    const head = (parts[0] ?? "").toLowerCase();
    return { next: `${head} ${only}`, matches: [] };
  }

  return { next: suggestion.completion, matches: suggestion.matches };
}

export function applyHint(input: string, match: string): string {
  const trail = /\s$/.test(input);
  const parts = input.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0 || (parts.length === 1 && !trail)) {
    return poolFor(match) ? `${match} ` : match;
  }
  const head = (parts[0] ?? "").toLowerCase();
  return `${head} ${match}`;
}

function parseCommand(raw: string): { cmd: string; arg: string } {
  const trimmed = raw.trim();
  const match = /^(\S+)(?:\s+([\s\S]*))?$/.exec(trimmed);
  if (!match) return { cmd: "", arg: "" };
  const token = (match[1] ?? "").toLowerCase();
  return { cmd: ALIASES[token] ?? token, arg: (match[2] ?? "").trim() };
}

function matchNamed<T>(items: readonly T[], query: string, keys: (item: T) => readonly string[]): T[] {
  const key = norm(query);
  if (!key) return [];
  const values = (item: T) => keys(item).map(norm).filter(Boolean);
  const exact = items.filter((item) => values(item).includes(key));
  if (exact.length > 0) return [...exact];
  const starts = items.filter((item) => values(item).some((value) => value.startsWith(key)));
  if (starts.length > 0) return [...starts];
  return items.filter((item) => values(item).some((value) => value.includes(key)));
}

function ambiguous(labels: readonly string[]): Block[] {
  return [err([text("Which one?")]), out([dim(labels.join("  ·  "))])];
}

function projectBlocks(project: Project, detailed: boolean): Block[] {
  const blocks: Block[] = [
    out([strong(project.name), dim(`  ${project.language}`)]),
    out([text(project.oneLiner)]),
  ];
  if (project.label) blocks.push(out([dim(project.label)]));
  if (detailed) {
    blocks.push(out([text(project.description)]));
    blocks.push(out([dim(project.stack.join("  ·  "))]));
    blocks.push(out([dim(project.featuredReason)]));
    if (project.caveats) {
      for (const caveat of project.caveats) blocks.push(out([text(`• ${caveat}`)]));
    }
  }
  blocks.push(out([dim("repo  "), link(prettyUrl(project.repoUrl), project.repoUrl)]));
  if (project.liveUrl) {
    blocks.push(out([dim("live  "), link(prettyUrl(project.liveUrl), project.liveUrl)]));
    if (project.liveUrlNote) blocks.push(out([dim(project.liveUrlNote)]));
  }
  blocks.push(out([dim(`Updated ${project.lastUpdatedLagos}`)]));
  return blocks;
}

function roleBlocks(role: ExperienceRole): Block[] {
  const blocks: Block[] = [
    out([strong(`${role.title} — ${role.company}`)]),
    out([dim(`${role.periodLabel} · ${role.location}`)]),
  ];
  if (role.productName) {
    blocks.push(out([dim(`Product: ${role.productName} (${role.productNameSource ?? "public source"}).`)]));
  }
  for (const highlight of role.highlights) blocks.push(out([text(`• ${highlight}`)]));
  if (role.stackFromGithubReadme) {
    blocks.push(out([dim(role.stackFromGithubReadme.join("  ·  "))]));
  }
  if (role.stackSource) blocks.push(out([dim(role.stackSource)]));
  if (role.codeNote) blocks.push(out([dim(role.codeNote)]));
  if (role.attributedHeadcount) {
    blocks.push(
      out([
        text(
          `${role.attributedHeadcount.value} ${role.attributedHeadcount.unit} — ${role.attributedHeadcount.attribution}`,
        ),
      ]),
    );
  }
  return blocks;
}

function caseBlocks(study: CaseStudy, detailed: boolean): Block[] {
  const blocks: Block[] = [
    out([strong(study.name)]),
    out([dim(`${study.role} · ${study.company} · ${study.periodLabel}`)]),
    out([text(detailed ? study.summary : study.oneLiner)]),
  ];
  if (study.productName) {
    blocks.push(out([dim(`Product name ${study.productName} — ${study.productNameSource ?? "public source"}.`)]));
  }
  if (detailed && study.relatedDelivery) {
    blocks.push(out([dim("Also in this role")]));
    for (const item of study.relatedDelivery) blocks.push(out([text(`• ${item}`)]));
  }
  if (detailed && study.stack) {
    const source = study.stackSource ? ` ${study.stackSource}` : "";
    blocks.push(out([dim(`${study.stack.join("  ·  ")}.${source}`)]));
  }
  if (study.liveUrl) {
    blocks.push(out([dim("site  "), link(prettyUrl(study.liveUrl), study.liveUrl)]));
  }
  blocks.push(out([dim(study.urlNote)]));
  for (const metric of study.metrics) {
    const audit = metric.onCv ? metric.source : `${metric.source}. ${metric.guidance ?? ""}`.trim();
    blocks.push(out([text(`${metric.label}: ${metric.value} — ${audit}`)]));
  }
  if (study.codeNote) blocks.push(out([dim(study.codeNote)]));
  return blocks;
}

function helpBlocks(): Block[] {
  const rows: Array<[string, string]> = [
    ["help", "show this list"],
    ["about", "short bio"],
    ["projects [name]", "featured repositories"],
    ["experience [id]", "roles, newest first"],
    ["cases [id]", "professional case studies"],
    ["skills", "core skill groups"],
    ["education", "degree, certificates, awards"],
    ["contact", "email, GitHub, LinkedIn"],
    ["resume", "text résumé from the CV"],
    ["open <section>", "scroll to a section"],
    ["ls", "list sections"],
    ["cat <file>", "print an editor file"],
    ["whoami", "name, role, location"],
    ["history", "commands from this visit"],
    ["clear", "clear the screen"],
  ];
  return [
    out([strong("Commands")]),
    ...rows.map(([name, blurb]) => out([strong(name.padEnd(18, " ")), text(blurb)])),
    out([dim("Tab completes. Up and Down walk history. ? focuses this shell.")]),
  ];
}

function resumeBlocks(): Block[] {
  const blocks: Block[] = [
    out([strong(person.fullName)]),
    out([text(hero.role)]),
    out([text(person.location)]),
    out([link(contact.email, `mailto:${contact.email}`)]),
    out([link(prettyUrl(contact.github), contact.github)]),
    out([link(prettyUrl(contact.linkedin), contact.linkedin)]),
    out([text("")]),
    out([strong("Summary")]),
    ...about.firstPerson.map((paragraph) => out([text(paragraph)])),
    out([text(hero.availabilityLine)]),
    out([text("")]),
    out([strong("Experience")]),
  ];

  for (const role of experience) {
    blocks.push(...roleBlocks(role), out([text("")]));
  }

  blocks.push(out([strong("Selected public repositories")]));
  for (const project of projects) {
    blocks.push(out([strong(project.name)]), out([text(project.oneLiner)]), out([link(prettyUrl(project.repoUrl), project.repoUrl)]));
    if (project.label) blocks.push(out([dim(project.label)]));
    if (project.caveats) {
      for (const caveat of project.caveats) blocks.push(out([dim(caveat)]));
    }
  }

  blocks.push(out([text("")]), out([strong("Selected engagements")]));
  for (const study of caseStudies) {
    blocks.push(...caseBlocks(study, false));
  }

  const school = education[0];
  blocks.push(out([text("")]), out([strong("Education")]));
  if (school) {
    blocks.push(out([text(`${school.degree}`)]), out([text(`${school.institution} (${school.abbreviation})`)]), out([text(school.periodLabel)]));
  }
  blocks.push(out([text("")]), out([strong("Certifications")]));
  for (const item of certifications) blocks.push(out([text(`${item.name} — ${item.issuer}`)]));
  blocks.push(out([text("")]), out([strong("Awards")]));
  for (const award of awards) {
    blocks.push(out([text(`${award.year} — ${award.title}`)]));
    if (award.note) blocks.push(out([dim(award.note)]));
  }
  return blocks;
}

export function welcomeBlocks(): Block[] {
  return [
    out([strong(`${person.fullName} — portfolio shell`)]),
    out([dim(`${person.location} · ${hero.role}`)]),
    out([text("Type help for commands. Tab completes. Up and Down walk history.")]),
  ];
}

export function runCommand(raw: string, ctx: { history: readonly string[] }): CommandResult {
  const { cmd, arg } = parseCommand(raw);
  if (!cmd) return { blocks: [] };

  if (cmd === "clear") return { clear: true, blocks: [] };

  if (cmd === "help") return { blocks: helpBlocks() };

  if (cmd === "whoami") {
    return {
      blocks: [
        out([strong(person.fullName)]),
        out([text(hero.role)]),
        out([text(person.location)]),
        out([text(hero.availabilityLine)]),
      ],
    };
  }

  if (cmd === "about") {
    const school = education[0];
    const blocks = about.firstPerson.map((paragraph) => out([text(paragraph)]));
    blocks.push(out([text(hero.availabilityLine)]));
    if (school) {
      blocks.push(
        out([
          text(
            `${school.degree} — ${school.institution} (${school.abbreviation}), ${school.periodLabel}.`,
          ),
        ]),
      );
    }
    return { blocks };
  }

  if (cmd === "projects") {
    if (!arg) {
      return {
        blocks: projects.flatMap((project) => [...projectBlocks(project, false), out([text("")])]),
      };
    }
    const found = matchNamed(projects, arg, (project) => [project.id, project.name, project.repoName ?? ""]);
    if (found.length === 0) return { blocks: [err([text(`No project matches “${arg}”.`)])] };
    if (found.length > 1) return { blocks: ambiguous(found.map((project) => project.name)) };
    const project = found[0];
    return project ? { blocks: projectBlocks(project, true) } : { blocks: [] };
  }

  if (cmd === "experience") {
    if (!arg) {
      return {
        blocks: [
          ...experience.flatMap((role) => [
            out([strong(`${role.title} — ${role.company}`)]),
            out([dim(`${role.periodLabel} · ${role.location}`)]),
          ]),
          out([dim("Add an id for the write-up. Example: experience npa")]),
        ],
      };
    }
    const found = matchNamed(experience, arg, (role) => [role.id, role.company, role.title]);
    if (found.length === 0) return { blocks: [err([text(`No role matches “${arg}”.`)])] };
    if (found.length > 1) return { blocks: ambiguous(found.map((role) => role.company)) };
    const role = found[0];
    return role ? { blocks: roleBlocks(role) } : { blocks: [] };
  }

  if (cmd === "cases") {
    if (!arg) {
      return { blocks: caseStudies.flatMap((study) => [...caseBlocks(study, false), out([text("")])]) };
    }
    const found = matchNamed(caseStudies, arg, (study) => [study.id, study.name, study.company]);
    if (found.length === 0) return { blocks: [err([text(`No case study matches “${arg}”.`)])] };
    if (found.length > 1) return { blocks: ambiguous(found.map((study) => study.name)) };
    const study = found[0];
    return study ? { blocks: caseBlocks(study, true) } : { blocks: [] };
  }

  if (cmd === "skills") {
    const blocks: Block[] = [];
    for (const group of coreSkills) {
      blocks.push(out([strong(group.group)]));
      blocks.push(out([text(group.items.join("  ·  "))]));
      if (group.sourceNote) blocks.push(out([dim(group.sourceNote)]));
    }
    blocks.push(out([dim("Repo-specific libraries are listed on the project cards.")]));
    return { blocks };
  }

  if (cmd === "education") {
    const school = education[0];
    const blocks: Block[] = [out([strong("Education")])];
    if (school) {
      blocks.push(out([text(school.degree)]), out([text(`${school.institution} (${school.abbreviation})`)]), out([text(school.periodLabel)]));
    }
    blocks.push(out([strong("Certifications")]));
    for (const item of certifications) blocks.push(out([text(`${item.name} — ${item.issuer}`)]));
    blocks.push(out([strong("Awards")]));
    for (const award of awards) {
      blocks.push(out([text(`${award.year} — ${award.title}`)]));
      if (award.note) blocks.push(out([dim(award.note)]));
    }
    return { blocks };
  }

  if (cmd === "contact") {
    return {
      blocks: [
        out([strong("Email"), text("  "), link(contact.email, `mailto:${contact.email}`)]),
        out([strong("GitHub"), text("  "), link(prettyUrl(contact.github), contact.github)]),
        out([strong("LinkedIn"), text("  "), link(prettyUrl(contact.linkedin), contact.linkedin)]),
        out([dim(hero.availabilityLine)]),
      ],
    };
  }

  if (cmd === "resume") return { blocks: resumeBlocks() };

  if (cmd === "ls") {
    return {
      blocks: [
        out([dim("sections")]),
        out([text(OPEN_TARGETS.filter((id) => id !== "top").join("  "))]),
        out([dim("files")]),
        out([text(portfolioFilenames().join("  "))]),
      ],
    };
  }

  if (cmd === "open") {
    if (!arg) {
      return {
        blocks: [err([text("Usage: open <section>")]), out([dim(OPEN_TARGETS.join("  "))])],
      };
    }
    const token = arg.toLowerCase().split(/\s+/)[0] ?? "";
    const id = OPEN_IDS[token];
    if (!id) {
      return {
        blocks: [err([text(`No section “${arg}”.`)]), out([dim(OPEN_TARGETS.join("  "))])],
      };
    }
    return {
      navigate: `#${id}`,
      blocks: [out([text(id === "top" ? "Opening the top." : `Opening ${id}.`)])],
    };
  }

  if (cmd === "cat") {
    if (!arg) {
      return {
        blocks: [err([text("Usage: cat <file>")]), out([dim(portfolioFilenames().join("  "))])],
      };
    }
    const file = readPortfolioFile(arg);
    if (file === null) {
      return {
        blocks: [err([text(`No file “${arg}”.`)]), out([dim(portfolioFilenames().join("  "))])],
      };
    }
    return { blocks: file.split("\n").map((line) => out([text(line)])) };
  }

  if (cmd === "history") {
    if (ctx.history.length === 0) return { blocks: [out([dim("No commands yet.")])] };
    return {
      blocks: ctx.history.map((command, index) => out([dim(String(index + 1).padStart(3, " ")), text(`  ${command}`)])),
    };
  }

  return {
    blocks: [err([text(`command not found: ${cmd}`)]), out([dim("Type help for the list.")])],
  };
}
