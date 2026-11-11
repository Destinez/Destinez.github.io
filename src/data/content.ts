import type {
  AboutContent,
  Award,
  CaseStudy,
  Certification,
  Contact,
  EducationItem,
  ExperienceRole,
  ExperienceStripItem,
  HeroContent,
  PageProject,
  Person,
  Project,
  SkillGroup,
} from "./types";

/**
 * Site copy. Edit this file — the page reads it from here.
 * Facts are from the CV and the public GitHub profile. Do not add a phone number.
 */

const preferredTagline =
  "Full-stack engineer with eight years shipping production systems across fintech, media streaming, and enterprise software.";

export const locale = {
  timezoneLabel: "Africa/Lagos",
} as const;

export const person = {
  fullName: "Obaro Destiny Udurie",
  shortName: "Obaro",
  headline: "Software Engineer",
  headlineLong: "Senior Full Stack Engineer",
  location: "Lagos, Nigeria",
  yearsExperience: 8,
  hireable: true,
  availability:
    "Open to relocation and visa-sponsored roles in the EU, UK, Canada, Australia, and New Zealand.",
  githubBio:
    "Senior Full Stack Engineer · Nest.js, React/Next.js, TypeScript, Node.js · 8 yrs shipping production web apps · Lagos · Open to visa-sponsored roles",
} as const satisfies Person;

export const hero = {
  name: person.fullName,
  role: "Software Engineer — Full Stack",
  preferredTaglineIndex: 0,
  taglineOptions: [
    preferredTagline,
    "I design and ship the work that has to hold: payment APIs, streaming pipelines, and the systems government and HR teams actually run on.",
    "Lagos-based senior full-stack engineer. TypeScript, React, and Node — from a four-port federal appraisal platform to a streaming engine built for Africa.",
    "End-to-end, no hand-holding. Backends, data models, and interfaces that other developers can maintain — and that actually ship.",
    "Building production software at the intersection of fintech, streaming, and civic systems. Open to visa-sponsored roles.",
    "Senior Full Stack Engineer · Lagos · Open to relocation.",
  ],
  supportingOneLiner:
    "I've built and shipped production systems end to end, from payment integrations and HR platforms to a streaming engine serving users across Africa.",
  availabilityLine: person.availability,
} as const satisfies HeroContent;

export const about = {
  thirdPerson: [
    "Obaro Destiny Udurie is a full-stack software engineer based in Lagos, Nigeria, with eight years of experience across fintech, media streaming, and enterprise software. He builds and ships production systems end to end — APIs, data models, and the interfaces people actually use — and is currently doing freelance and contract work after in-house roles in streaming, HR tech, and government systems.",
    "His recent professional work includes the backend and admin dashboard for APEL, a Nigerian fintech product at apel.com.ng; the movie streaming engine at Africanstreams (AfroDB); SwitchHRM, an HR management product; a performance appraisal system deployed across all four Nigerian Ports Authority ports; and forms-management software for the Edo State Ministry of Health. On GitHub he publishes full-stack TypeScript work covering API design, relational data modelling, auth, confidential computing, and LLM-backed tools.",
    "He works well without hand-holding, writes code other developers can maintain, and cares about what actually ships. He holds a BSc in Computer Science from the Federal University of Petroleum Resources, Effurun (2015–2019), and is open to relocation and visa-sponsored roles.",
  ],
  firstPerson: [
    "I'm a full-stack engineer based in Lagos, with eight years across fintech, media streaming, and enterprise software. I've shipped production systems end to end — from payment integrations and HR platforms to a streaming engine serving users across Africa.",
    "Recently I've built the backend and admin dashboard for APEL (apel.com.ng), the streaming engine at Africanstreams (AfroDB), SwitchHRM, a performance appraisal system now running across all four NPA ports, and forms-management software for the Edo State Ministry of Health. My public GitHub work is full-stack TypeScript: APIs, relational data models, auth, confidential computing, and LLM-backed tools.",
    "I work well without hand-holding, write code other developers can maintain, and care about what actually ships.",
  ],
} as const satisfies AboutContent;

export const experience: readonly ExperienceRole[] = [
  {
    id: "freelance",
    title: "Software Engineer",
    company: "Freelance",
    location: "Lagos, Nigeria (Remote)",
    start: "2025-01",
    end: null,
    current: true,
    periodLabel: "Jan 2025 – Present",
    highlights: [
      "Built and deployed the backend and admin dashboard for APEL (apel.com.ng), a Nigerian fintech mobile app, covering APIs, data models, and the admin interface used to manage users and transactions.",
      "Developed a forms management software for the Edo State Government Ministry of Health, handling multi-step digital form workflows and data collection across health facilities.",
      "Took on additional client projects in logistics, media, and blockchain, managing full project delivery from requirements through to deployment with minimal supervision.",
    ],
  },
  {
    id: "africanstreams",
    title: "Full Stack Developer",
    company: "Africanstreams (AfroDB)",
    location: "Canada (Remote)",
    start: "2023-11",
    end: "2024-12",
    current: false,
    periodLabel: "Nov 2023 – Dec 2024",
    highlights: [
      "Built the movie streaming engine from the ground up, structuring the backend as microservices (user auth, content delivery, billing) and exposing a GraphQL API layer to the React frontend.",
      "Set up CDN delivery and media transcoding pipelines, and profiled the app to cut buffering rates noticeably for users on slower connections.",
      "Covered both the React frontend and Node/Express backend across the platform's full stack.",
    ],
  },
  {
    id: "digital-switch",
    title: "Software Engineer",
    company: "Digital Switch Concept",
    location: "Lagos, Nigeria",
    start: "2022-05",
    end: "2023-11",
    current: false,
    periodLabel: "May 2022 – Nov 2023",
    highlights: [
      "Led frontend development of SwitchHRM, the company's flagship HR management product, building the employee records, leave, payroll, and performance review modules in React and Laravel.",
      "Set up Playwright end-to-end tests covering SwitchHRM's core HR workflows, and built the UI for a Cisco NetAcad student platform wired to backend APIs through the admin panel.",
      "Constructed a rendering module for ID card printing software and maintained performance and stability across all live products.",
    ],
  },
  {
    id: "npa",
    title: "Software Developer (Contract)",
    company: "Nigerian Ports Authority (NPA)",
    location: "Nigeria",
    start: "2023-02",
    end: "2023-05",
    current: false,
    periodLabel: "Feb 2023 – May 2023",
    highlights: [
      "Built a performance appraisal system deployed across all four NPA ports in Nigeria, replacing a manual paper-based process.",
      "The KPI module let managers define their own metrics and formulas, with scores calculated automatically and a three-stage review workflow covering self-assessment, line manager review, and final approval.",
      "Modelled the data and validation rules to keep results consistent across all four separate port instances.",
    ],
    productName: "METPRO",
    productNameSource: "public LinkedIn post, 2 Jun 2023",
    stackFromGithubReadme: [
      "Node.js",
      "Express",
      "React",
      "relational data model",
      "Excel reporting",
    ],
    stackSource: "As stated on the public GitHub profile README, not the CV.",
    codeNote: "Code is the client's and is not public.",
    attributedHeadcount: {
      value: "4,000+",
      unit: "employees",
      attribution:
        "as stated on the public GitHub profile README and a public LinkedIn post, 2 Jun 2023. Not on the CV. Not independently audited.",
    },
  },
  {
    id: "unites",
    title: "Software Developer",
    company: "UNITeS Integrated",
    location: "Lagos, Nigeria",
    start: "2022-01",
    end: "2022-05",
    current: false,
    periodLabel: "Jan 2022 – May 2022",
    highlights: [
      "Built the company website in Laravel and Vanilla JS, and created event landing pages with Paystack, Flutterwave, and Skrill payment integration.",
      "Worked with the in-house designer to implement layouts correctly across all screen sizes.",
    ],
  },
  {
    id: "unicus",
    title: "Software Developer Intern",
    company: "UNICUS ITS",
    location: "Warri, Nigeria",
    start: "2018-07",
    end: "2020-01",
    current: false,
    periodLabel: "Jul 2018 – Jan 2020",
    highlights: [
      "Built client-facing interfaces across multiple projects and led a small team to develop a Health Symptom Checker app showcased at PTI.",
      "Built facial recognition systems using Python, OpenCV, and TensorFlow, training and deploying models for real-time identity verification.",
    ],
  },
];

export const skills: readonly SkillGroup[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "Solidity"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "SASS"],
  },
  {
    group: "Backend & APIs",
    items: ["Node.js", "Express", "Nest.js", "Laravel", "GraphQL", "REST APIs"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Sequelize", "Drizzle ORM", "Supabase"],
  },
  {
    group: "Cloud, DevOps & delivery",
    items: ["AWS", "Docker", "Linux", "Vercel", "Render", "GitHub Actions", "CDN"],
  },
  {
    group: "Testing & observability",
    items: ["Playwright", "Testing & QA", "New Relic"],
  },
  {
    group: "Media streaming",
    items: ["CDN delivery", "Media transcoding", "Media streaming"],
  },
  {
    group: "Web3",
    items: ["Solidity", "Web3", "Foundry", "FHEVM", "SIWE"],
  },
  {
    group: "Payments",
    items: ["Paystack", "Flutterwave", "Skrill"],
    sourceNote: "From UNITeS Integrated work on the CV.",
  },
  {
    group: "AI in products",
    items: ["Anthropic Claude APIs"],
    sourceNote: "From the public GitHub README and project READMEs.",
  },
  {
    group: "Earlier / specialist",
    items: ["OpenCV", "TensorFlow"],
    sourceNote: "Facial recognition work at UNICUS ITS, on the CV.",
  },
  {
    group: "Project-only chips",
    items: [
      "Hono",
      "wagmi/viem",
      "RainbowKit",
      "TanStack Query",
      "Zustand",
      "Motion",
      "OGL (WebGL)",
      "Remotion",
      "Redux Toolkit",
      "Material UI",
      "Chart.js",
      "Bootstrap / reactstrap",
      "Tavily",
      "Polymarket CLOB",
      "OKX x402",
    ],
    sourceNote: "Appear in featured repo READMEs. Shown on project cards, not in the core skill groups.",
  },
];

export const projects: readonly Project[] = [
  {
    rank: 1,
    id: "veil",
    name: "Veil",
    oneLiner:
      "A confidential group-expense app: split bills and settle up without exposing balances to the group or a central server.",
    description:
      "Full-stack TypeScript project. Expense amounts are encrypted in the browser and stored on-chain as FHE ciphertexts (Zama FHEVM on Ethereum Sepolia); the API stores only metadata. Includes Sign-In with Ethereum, encrypted confidential-USDC repayments, and a Foundry test suite (14 tests named in the README).",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "wagmi/viem",
      "RainbowKit",
      "TanStack Query",
      "Zustand",
      "Node.js",
      "Hono",
      "Drizzle ORM",
      "PostgreSQL",
      "zod",
      "jose",
      "Solidity",
      "Foundry",
      "FHEVM",
      "SIWE",
    ],
    repoUrl: "https://github.com/Destinez/Veil",
    liveUrl: null,
    language: "TypeScript",
    lastUpdatedLagos: "8 Oct 2026, 04:31 Africa/Lagos",
    license: "MIT",
    featuredReason:
      "Deepest public repo (212 files): frontend, API, and contracts, with auth, schema, and privacy design spelled out.",
  },
  {
    rank: 2,
    id: "orbitals",
    name: "Orbitals · Resonance",
    oneLiner:
      "An npm-workspace monorepo for a generative-art NFT campaign: scroll-driven React site, Node/Postgres registration API with tests, and a deterministic artwork generator the browser can reproduce pixel-for-pixel.",
    description:
      "Workspaces cover a React 19 / Vite campaign site (Motion, OGL/WebGL, Zustand), a framework-free Node.js 22 + PostgreSQL registration API with tests, signed-cookie sessions and rate limits, and a deterministic PNG + metadata generator. A Remotion trailer exists but is work-in-progress and not part of the build.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Motion",
      "OGL (WebGL)",
      "Zustand",
      "Node.js 22",
      "PostgreSQL",
      "node:test",
      "pngjs",
      "Docker Compose",
    ],
    repoUrl: "https://github.com/Destinez/orbitals",
    liveUrl: null,
    language: "TypeScript",
    lastUpdatedLagos: "8 Oct 2026, 04:32 Africa/Lagos",
    license: "MIT",
    featuredReason:
      "127 files, real monorepo structure, tests, and a pixel-compare verify:render check. Strong systems-design piece.",
  },
  {
    rank: 3,
    id: "fpl-briefing",
    name: "FPL Deadline Brief",
    repoName: "fpl-briefing-A2MCP",
    oneLiner:
      "A Dockerised TypeScript/Express API that turns a Fantasy Premier League team ID into transfer, captain, and rotation advice — deterministic engines plus Claude for the write-up, with pay-per-call endpoints.",
    description:
      "Four Express endpoints behind optional OKX x402 payments. Deterministic squad, transfer, captain, and rotation-risk engines; Claude Haiku writes the briefing and falls back to a deterministic summary if the API key is missing. Shipped as a Docker image, with smoke tests and a production startup check that refuses SKIP_PAYMENTS.",
    stack: ["TypeScript", "Node.js 20+", "Express 5", "Anthropic Claude SDK", "OKX x402", "Docker"],
    repoUrl: "https://github.com/Destinez/fpl-briefing-A2MCP",
    liveUrl: null,
    language: "TypeScript",
    lastUpdatedLagos: "8 Oct 2026, 03:53 Africa/Lagos",
    license: "MIT",
    featuredReason:
      "Production-minded API design: health checks, 402 payments, deterministic LLM fallback, smoke scripts, and Docker.",
  },
  {
    rank: 4,
    id: "polymarket-agent",
    name: "polymarket-agent",
    oneLiner:
      "A TypeScript agent that scans Polymarket, researches news with Tavily, estimates odds with Claude, and proposes half-Kelly paper trades that still need a human yes in the terminal.",
    description:
      "Scheduled CLI agent (every 2 hours, plus a weekly review). Filters markets, gathers recent news, asks Claude for a probability, sizes a half-Kelly paper trade, and requires terminal approval before logging to Supabase.",
    stack: [
      "TypeScript",
      "Node.js",
      "Anthropic Claude",
      "Tavily",
      "Polymarket CLOB client",
      "Supabase",
      "node-cron",
      "inquirer",
    ],
    repoUrl: "https://github.com/Destinez/polymarket-agent",
    liveUrl: null,
    language: "TypeScript",
    lastUpdatedLagos: "8 Oct 2026, 03:54 Africa/Lagos",
    license: "MIT",
    caveats: [
      "Experimental and paper trading only — real order execution is not implemented.",
      "Market-resolution tracking is unfinished, so win rate and P&L stay at zero until that is built.",
      "Not financial advice.",
    ],
    featuredReason: "Clear architecture, human-in-the-loop design, and honest limitations. Useful AI-systems piece.",
  },
  {
    rank: 5,
    id: "paybox-dashboard",
    name: "Paybox Dashboard",
    oneLiner:
      "A responsive fintech wallet dashboard UI — balances, inflows, and transaction charts in Naira — built with React, Redux Toolkit, Material UI, and Chart.js.",
    description:
      "Front-end only; figures are static sample data in Naira. Includes a hideable wallet balance, summary cards, a Chart.js doughnut comparison, collapsible sidebar, and notifications navbar.",
    stack: [
      "React 18",
      "Vite 4",
      "Redux Toolkit",
      "Bootstrap 5 / reactstrap",
      "Material UI icons",
      "Sass",
      "Chart.js",
      "React Router 6",
    ],
    repoUrl: "https://github.com/Destinez/paybox-dashboard",
    liveUrl: "https://destinez.github.io/paybox-dashboard/",
    liveUrlNote:
      "Checked 11 Nov 2026 (Africa/Lagos): the Pages URL returned HTTP 200. index.html references /assets/ at the domain root, and those URLs 404. The same files load under /paybox-dashboard/assets/. The demo may not render until the Vite base path is fixed.",
    language: "JavaScript",
    lastUpdatedLagos: "8 Oct 2026, 03:55 Africa/Lagos",
    license: null,
    featuredReason: "Closest public UI to his fintech client work, and the only public repo with a Pages URL.",
  },
  {
    rank: 6,
    id: "blutech",
    name: "Blutech",
    oneLiner:
      "A front-end take-home: a Figma design implemented in React + Vite, with a searchable, filterable product catalogue fed by a REST API through React Context.",
    description:
      "Take-home assessment for Blutech Solutions LLC, not a production product. Implements a provided Figma design, fetches a public product catalogue, and manages search/filter state with React Context.",
    stack: ["React", "Vite", "reactstrap", "React Context", "fetch"],
    repoUrl: "https://github.com/Destinez/Blutech",
    liveUrl: null,
    language: "JavaScript",
    lastUpdatedLagos: "8 Oct 2026, 03:55 Africa/Lagos",
    license: "MIT",
    label: "Take-home assessment — not a production product",
    featuredReason: "Included as craft (Figma accuracy, API state), clearly labelled as a take-home.",
  },
];

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "apel",
    name: "APEL",
    company: "APEL",
    role: "Software Engineer (Freelance)",
    periodLabel: "Jan 2025 – Present",
    oneLiner:
      "Backend and admin dashboard for a Nigerian fintech mobile app — APIs, data models, and the interface used to manage users and transactions.",
    summary:
      "Built and deployed the backend and admin dashboard for APEL, a Nigerian fintech mobile app, covering APIs, data models, and the admin interface used to manage users and transactions.",
    liveUrl: "https://apel.com.ng",
    urlNote:
      "apel.com.ng is the company's marketing site (securities trading, trusteeship, fund management, and the Invest Smart app), not a demo of the admin dashboard.",
    metrics: [],
    codePublic: false,
  },
  {
    id: "africanstreams",
    name: "Africanstreams / AfroDB",
    company: "Africanstreams (AfroDB)",
    role: "Full Stack Developer",
    periodLabel: "Nov 2023 – Dec 2024",
    oneLiner:
      "A movie streaming engine built from the ground up — microservices, GraphQL, React, CDN delivery, and transcoding.",
    summary:
      "Built the movie streaming engine from the ground up, structuring the backend as microservices (user auth, content delivery, billing) and exposing a GraphQL API layer to the React frontend. Set up CDN delivery and media transcoding pipelines, and profiled the app to cut buffering rates noticeably for users on slower connections. Covered both the React frontend and Node/Express backend.",
    stack: ["React", "Node.js", "Express", "GraphQL", "CDN", "media transcoding"],
    liveUrl: null,
    urlNote: "No public product URL verified.",
    metrics: [],
    codePublic: false,
  },
  {
    id: "switchhrm",
    name: "SwitchHRM",
    company: "Digital Switch Concept",
    role: "Software Engineer",
    periodLabel: "May 2022 – Nov 2023",
    oneLiner:
      "Led frontend development of a flagship HR platform — employee records, leave, payroll, and performance reviews — with Playwright coverage of core workflows.",
    summary:
      "Led frontend development of SwitchHRM, the company's flagship HR management product, building the employee records, leave, payroll, and performance review modules in React and Laravel, and set up Playwright end-to-end tests covering core HR workflows.",
    relatedDelivery: [
      "UI for a Cisco NetAcad student platform wired to backend APIs through the admin panel.",
      "A rendering module for ID card printing software.",
    ],
    stack: ["React", "Laravel", "Playwright"],
    liveUrl: null,
    urlNote: "No public demo URL verified.",
    metrics: [],
    codePublic: false,
  },
  {
    id: "npa-appraisal",
    name: "NPA performance appraisal system",
    productName: "METPRO",
    productNameSource: "public LinkedIn post, 2 Jun 2023",
    company: "Nigerian Ports Authority (NPA)",
    role: "Software Developer (Contract)",
    periodLabel: "Feb 2023 – May 2023",
    oneLiner:
      "A performance appraisal system deployed across all four NPA ports, replacing a paper-based process, with configurable KPIs and a three-stage review workflow.",
    summary:
      "Built a performance appraisal system deployed across all four NPA ports in Nigeria, replacing a manual paper-based process. The KPI module let managers define their own metrics and formulas, with scores calculated automatically and a three-stage review workflow covering self-assessment, line manager review, and final approval. Data and validation rules were modelled to keep results consistent across all four separate port instances.",
    stack: ["Node.js", "Express", "React", "relational data model", "Excel reporting"],
    stackSource: "Stack as stated on the public GitHub profile README, not the CV.",
    liveUrl: null,
    urlNote: "Internal government system. No public URL.",
    metrics: [
      {
        label: "Ports deployed",
        value: "All four NPA ports",
        source: "CV",
        onCv: true,
      },
      {
        label: "Employees using the system",
        value: "4,000+",
        source: "GitHub profile README and public LinkedIn post, 2 Jun 2023",
        onCv: false,
        guidance: "Not independently audited.",
      },
    ],
    codePublic: false,
    codeNote: "Code is the client's and is not public.",
  },
  {
    id: "edo-moh-forms",
    name: "Edo State Ministry of Health forms management",
    company: "Edo State Government Ministry of Health",
    role: "Software Engineer (Freelance)",
    periodLabel: "Jan 2025 – Present",
    oneLiner:
      "Multi-step digital form workflows and data collection across health facilities for the Edo State Ministry of Health.",
    summary:
      "Developed a forms management software for the Edo State Government Ministry of Health, handling multi-step digital form workflows and data collection across health facilities.",
    liveUrl: null,
    urlNote: "No public URL found.",
    metrics: [],
    codePublic: false,
  },
];

export const education = [
  {
    degree: "Bachelor of Science, Computer Science",
    institution: "Federal University of Petroleum Resources, Effurun",
    abbreviation: "FUPRE",
    periodLabel: "2015 – 2019",
  },
] as const satisfies readonly EducationItem[];

export const certifications = [
  {
    name: "ALX Software Engineering Programme",
    issuer: "ALX Africa",
  },
  {
    name: "Professional Software Development Certification",
    issuer: "UNICUS ITS, Warri",
  },
] as const satisfies readonly Certification[];

export const awards: readonly Award[] = [
  { year: 2019, title: "Best Developer Runner-up, FUPRE" },
  { year: 2018, title: "Team Lead, RESHAPE Dev Team, UNICUS ITS" },
  {
    year: 2009,
    title: "Shell BP Scholarship Awardee",
    note: "A public LinkedIn education entry also lists a Shell BP scholarship issued Jul 2009.",
  },
];

export const contact = {
  email: "obarodestinez@gmail.com",
  github: "https://github.com/Destinez",
  linkedin: "https://linkedin.com/in/obarooooo",
} as const satisfies Contact;

export const seo = {
  title: "Obaro Destiny Udurie — Software Engineer, Full Stack",
  description: preferredTagline,
  url: "https://destinez.github.io/",
  image: "https://destinez.github.io/og.png",
} as const;

export const navItems = [
  { id: "hero", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "path", label: "Path" },
  { id: "terminal", label: "Shell" },
  { id: "contact", label: "Contact" },
] as const;

export const pageHeroLine =
  "Full-stack engineer. Eight years across fintech, media streaming, and enterprise software.";

const veilProject = projects.find((item) => item.id === "veil");
const payboxProject = projects.find((item) => item.id === "paybox-dashboard");

/** The three cards on the page. Other repos stay in `projects` for the terminal. */
export const pageProjects: readonly PageProject[] = [
  {
    id: "veil",
    name: "Veil",
    oneLiner: "Confidential group expenses. Balances stay encrypted.",
    status: null,
    repoUrl: veilProject?.repoUrl ?? null,
    liveUrl: veilProject?.liveUrl ?? null,
    chips: ["TypeScript", "React", "FHEVM", "Solidity"],
  },
  {
    id: "opencivic",
    name: "OpenCivic NG",
    oneLiner:
      "Nigerian civic-tech: polling-unit lookup, election info, and result tracking, with roles and an audit log.",
    status: "In development",
    repoUrl: null,
    liveUrl: null,
    chips: [],
  },
  {
    id: "paybox-payments",
    name: "Paybox Payments",
    oneLiner:
      "Being rebuilt as a Paystack test-mode payments dashboard, with webhooks, retries, and idempotency.",
    status: "In development",
    repoUrl: payboxProject?.repoUrl ?? null,
    liveUrl: null,
    chips: ["Paystack", "Webhooks", "Idempotency"],
  },
];

/** One public line per employer. Fuller notes stay on the terminal. */
export const experienceStrip: readonly ExperienceStripItem[] = [
  { id: "apel", company: "APEL", line: "Fintech backend and admin dashboard." },
  { id: "africanstreams", company: "Africanstreams / AfroDB", line: "Movie streaming engine, full stack." },
  { id: "digital-switch", company: "Digital Switch Concept", line: "SwitchHRM, the company’s HR product." },
  { id: "npa", company: "Nigerian Ports Authority", line: "Performance appraisal across the four ports." },
  { id: "edo", company: "Edo State Ministry of Health", line: "Digital forms for health facilities." },
  { id: "unites", company: "UNITeS Integrated", line: "Company site and payment landing pages." },
];

export const coreSkills = skills.filter((group) => group.group !== "Project-only chips");
