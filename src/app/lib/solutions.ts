export type Solution = {
  audience: string;
  description: string;
  eyebrow: string;
  faqs: Array<{ answer: string; question: string }>;
  fit: string[];
  image: string;
  imageAlt: string;
  metaDescription: string;
  outcomes: Array<{ description: string; title: string }>;
  path: string;
  problems: Array<{ description: string; title: string }>;
  proof: {
    description: string;
    href: string;
    linkLabel: string;
    points: string[];
    title: string;
  };
  slug: string;
  title: string;
};

export const solutions: Solution[] = [
  {
    slug: "investigation-research-platforms",
    path: "/solutions/investigation-research-platforms",
    eyebrow: "For investigation and research teams",
    title: "Software for investigation and research teams",
    audience:
      "Journalism, OSINT, due-diligence, and research teams working with many sources, documents, entities, and relationships.",
    description:
      "I build focused tools that bring collection, structured findings, search, relationship analysis, and exports into one dependable workflow.",
    metaDescription:
      "Custom investigation and research software for search, data collection, structured findings, graph analysis, and operational workflows.",
    image: "/solutions/investigation.jpg",
    imageAlt: "Researcher working on a laptop above a city",
    problems: [
      {
        title: "Evidence is split across tools",
        description:
          "Links, documents, notes, spreadsheets, and external search results are difficult to review as one investigation.",
      },
      {
        title: "Sources change or disappear",
        description:
          "A useful source needs a repeatable collection and archiving workflow, not a browser bookmark someone has to remember.",
      },
      {
        title: "Entities are hard to connect",
        description:
          "Names, companies, events, documents, and locations need structure before a team can follow relationships confidently.",
      },
      {
        title: "AI output cannot be trusted blindly",
        description:
          "Generated findings need schemas, validation, source context, and a review step before they become operational data.",
      },
      {
        title: "Handoffs create duplicate work",
        description:
          "Researchers repeatedly reformat the same material for colleagues, reports, exports, and downstream systems.",
      },
      {
        title: "The tool is not built for daily use",
        description:
          "A promising prototype still needs authentication, permissions, failure states, observability, and production operations.",
      },
    ],
    outcomes: [
      {
        title: "Persistent search and collection",
        description:
          "Run repeatable searches, connect external sources, preserve results, and make collection status visible.",
      },
      {
        title: "Structured investigation records",
        description:
          "Turn documents and findings into validated entities, relationships, notes, and reviewable source material.",
      },
      {
        title: "Graph and data exploration",
        description:
          "Give researchers practical search, filters, record views, and relationship exploration without hiding the underlying evidence.",
      },
      {
        title: "Production delivery",
        description:
          "Cover the web application, APIs, data model, integrations, exports, tests, deployment, and ongoing improvement.",
      },
    ],
    proof: {
      title: "A production investigation data platform",
      description:
        "I have worked across architecture, backend, frontend, and production delivery for a system that supports investigations from external data collection through structured findings, relationship analysis, and export.",
      points: [
        "Persistent search and external integrations",
        "Schema-validated LLM-assisted structuring",
        "PostgreSQL records and Neo4j graph exploration",
        "Authentication, exports, and operational workflows",
      ],
      href: "/case-studies/investigation-data-platform",
      linkLabel: "Read the anonymous case study",
    },
    fit: [
      "You already understand the research workflow and need an engineer to turn it into dependable software.",
      "You have a working product that needs a new data source, workflow, interface, or production hardening.",
      "You want one senior engineer who can work across the interface, API, data model, integrations, and deployment.",
    ],
    faqs: [
      {
        question: "Can you join an existing research product?",
        answer:
          "Yes. I can own a defined product area, integration, data workflow, or frontend while working with an existing product and engineering team.",
      },
      {
        question: "Do you build with AI?",
        answer:
          "When it improves a real workflow. I treat model output as untrusted input and add schemas, validation, source context, review states, and failure handling.",
      },
      {
        question: "Can the work stay anonymous?",
        answer:
          "Yes. The public case study can describe the problem, contribution, and technical work without naming the organization or exposing sensitive data.",
      },
      {
        question: "Do you only take complete rebuilds?",
        answer:
          "No. A focused improvement to a working system is often a better engagement than replacing the product.",
      },
    ],
  },
  {
    slug: "publishing-platforms",
    path: "/solutions/publishing-platforms",
    eyebrow: "For independent media and publishers",
    title: "Publishing systems for independent media",
    audience:
      "Independent newsrooms, nonprofit media, research organizations, and editorial teams that own their publishing workflow.",
    description:
      "I build and improve publishing websites, editorial workflows, integrations, and data-driven features without forcing editors to work around the technology.",
    metaDescription:
      "Publishing websites and editorial systems for independent media, with CMS workflows, integrations, performance, accessibility, and multilingual delivery.",
    image: "/solutions/publishing.jpg",
    imageAlt: "Small independent team standing together",
    problems: [
      {
        title: "Publishing takes too many steps",
        description:
          "Stories move through unnecessary handoffs, repeated checks, and manual formatting before they can reach readers.",
      },
      {
        title: "Work is split between too many tools",
        description:
          "Drafts, feedback, images, planning, and publication status are scattered across the CMS, documents, email, and chat.",
      },
      {
        title: "The CMS ignores editorial roles",
        description:
          "Reporters, editors, the picture desk, and audience teams need different views and controls, but often get the same generic interface.",
      },
      {
        title: "Images create a separate workflow",
        description:
          "Finding the right asset, checking usage rights, cropping it, and attaching metadata can delay a story or create publication risk.",
      },
      {
        title: "Plugins and hosting slow the site down",
        description:
          "Independent publishers often inherit fragile plugins, expensive maintenance, slow pages, and updates nobody wants to touch.",
      },
      {
        title: "The audience relationship is fragmented",
        description:
          "Newsletters, memberships, donations, analytics, and the website do not share a clear flow, or remain locked inside one platform.",
      },
    ],
    outcomes: [
      {
        title: "A shorter publishing workflow",
        description:
          "Remove avoidable handoffs and make drafts, review states, assets, metadata, and publication status visible in the right place.",
      },
      {
        title: "Tools shaped around editorial roles",
        description:
          "Give reporters, editors, administrators, and audience teams the controls they need without turning the CMS into a cockpit.",
      },
      {
        title: "A faster, maintainable publication",
        description:
          "Improve article pages, archives, search, images, metadata, accessibility, and performance without depending on a pile of fragile plugins.",
      },
      {
        title: "Connected audience tools",
        description:
          "Connect newsletters, forms, memberships, donations, and analytics while keeping the code, content, accounts, and documentation under the organization’s control.",
      },
    ],
    proof: {
      title: "Independent publishing and editorial delivery",
      description:
        "My work includes independent-media websites, multilingual content, CMS-backed editorial pages, structured archives, forms, analytics, and production maintenance.",
      points: [
        "Next.js publishing interfaces and structured routes",
        "CMS content models and editorial controls",
        "Multilingual content and metadata",
        "Forms, analytics, infrastructure, and ongoing delivery",
      ],
      href: "/services/nextjs-development",
      linkLabel: "See the related Next.js service",
    },
    fit: [
      "Your editors can explain where the current publishing workflow wastes time or prevents a useful format.",
      "You need a developer who can work with editorial, design, data, and infrastructure rather than only implement isolated pages.",
      "You want to improve a working system or replace a clearly identified bottleneck, not redesign for its own sake.",
    ],
    faqs: [
      {
        question: "Do you replace the newsroom’s current CMS?",
        answer:
          "Only when the existing system is the actual constraint. I can also improve the frontend, content model, integrations, or workflow around the current CMS.",
      },
      {
        question: "Can you work with an existing designer?",
        answer:
          "Yes. I can implement an established design system and focus on the product, content, and technical details needed for production delivery.",
      },
      {
        question: "Can the site support multiple languages?",
        answer:
          "Yes. That includes locale-aware routes, content relationships, metadata, navigation, and removing stale translation keys when the implementation changes.",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "I can stay involved for focused improvements and maintenance, or hand over a documented system to an internal team.",
      },
    ],
  },
  {
    slug: "internal-tools",
    path: "/solutions/internal-tools",
    eyebrow: "For mission-driven operations teams",
    title: "Internal tools that replace fragile spreadsheets",
    audience:
      "Small and mid-sized nonprofits, research programs, service organizations, and operational teams with a defined workflow to improve.",
    description:
      "I turn repeated data entry, disconnected records, manual validation, and reporting work into a controlled web application your team can actually operate.",
    metaDescription:
      "Custom internal tools for mission-driven teams: records, validation, workflows, permissions, integrations, dashboards, imports, and exports.",
    image: "/solutions/operations.jpg",
    imageAlt: "Team working together in an open office",
    problems: [
      {
        title: "A spreadsheet became the system",
        description:
          "The file now carries operational rules, history, and risk that were never designed to live in cells and shared-drive copies.",
      },
      {
        title: "The same data is entered repeatedly",
        description:
          "Forms, CRM records, email, reports, and partner systems do not share a dependable source of truth.",
      },
      {
        title: "Errors appear at reporting time",
        description:
          "Missing fields and inconsistent values are discovered after weeks of work because validation happens too late.",
      },
      {
        title: "Access is all or nothing",
        description:
          "Staff, partners, and administrators need different views and permissions without circulating more copies of sensitive data.",
      },
      {
        title: "Reporting is a monthly reconstruction",
        description:
          "Someone manually merges sources, repairs categories, and rebuilds the same exports instead of using a repeatable workflow.",
      },
      {
        title: "A prototype has no owner",
        description:
          "A useful internal app still needs reliable APIs, data migrations, tests, deployment, backups, and clear operational responsibility.",
      },
    ],
    outcomes: [
      {
        title: "Controlled records and workflows",
        description:
          "Create structured records, validation rules, task states, history, and permissions around the work the team already understands.",
      },
      {
        title: "Search, filters, and reporting",
        description:
          "Make operational data findable and turn repeated spreadsheet work into saved filters, dashboards, and dependable exports.",
      },
      {
        title: "Integrations without duplicate entry",
        description:
          "Connect forms, external APIs, CRM or payment tools, imports, notifications, and downstream reporting where the value is clear.",
      },
      {
        title: "A staged delivery path",
        description:
          "Start with the highest-cost workflow, put it into use, and expand only after the team can verify that it reduces work or risk.",
      },
    ],
    proof: {
      title: "A data-heavy operations platform",
      description:
        "I have delivered an internal application for structured records, controlled editing, validation, search, filters, imports, exports, and administrative access.",
      points: [
        "Operational records and controlled editing",
        "Search, filters, and record views",
        "Validation, imports, and exports",
        "API behavior, testing, and production stability",
      ],
      href: "/case-studies/operations-data-platform",
      linkLabel: "Read the anonymous case study",
    },
    fit: [
      "The team can identify one repeated workflow, the people involved, and the current source data.",
      "A focused first release can create value before every department and exception is included.",
      "You need custom workflow or integration work that an off-the-shelf tool does not cover cleanly.",
    ],
    faqs: [
      {
        question: "Should we buy software instead?",
        answer:
          "Often, yes. I would first check whether an existing product covers the workflow well enough. Custom work makes sense when the remaining gap is important, repeated, and specific to your operation.",
      },
      {
        question: "Can you start from our spreadsheets?",
        answer:
          "Yes. They help reveal the current entities, rules, exceptions, and reports. The goal is to model the workflow deliberately rather than reproduce every accidental spreadsheet behavior.",
      },
      {
        question: "Can the tool connect to our existing services?",
        answer:
          "Yes, when they provide a workable API or export. I can cover integration design, authentication, data mapping, retries, and operational visibility.",
      },
      {
        question: "Do you work with sensitive data?",
        answer:
          "I can implement role-based access, audit-friendly workflows, secure deployment, and data minimization. Formal compliance scope and organizational policies need to be agreed separately.",
      },
    ],
  },
];

export const agencySolution: Solution = {
  slug: "for-agencies",
  path: "/for-agencies",
  eyebrow: "For product and development agencies",
  title: "A senior engineering partner for agency delivery",
  audience:
    "Product studios and development agencies that need experienced web, backend, data, or React Native capacity for a client engagement.",
  description:
    "I can join a defined project, own a difficult product area, or carry a build across frontend, backend, integrations, mobile, and production delivery.",
  metaDescription:
    "Senior white-label and contract engineering for agencies delivering Next.js, Node.js, data, AI, and React Native client products.",
  image: "/solutions/agencies.jpg",
  imageAlt: "Laptop ready for focused engineering work",
  problems: [
    {
      title: "The deadline cannot wait for hiring",
      description:
        "A client milestone is fixed, but the right senior engineer is not available inside the current delivery team.",
    },
    {
      title: "The work crosses team boundaries",
      description:
        "A feature spans product decisions, frontend, APIs, data, integrations, deployment, and mobile release details.",
    },
    {
      title: "A codebase needs ownership",
      description:
        "The project needs someone who can understand existing decisions, reduce uncertainty, and deliver without a long chain of handoffs.",
    },
    {
      title: "The mobile scope arrived late",
      description:
        "The client now needs iOS and Android delivery, payments, subscriptions, forms, or App Store work alongside the web product.",
    },
    {
      title: "A specialist cannot cover the gap",
      description:
        "The agency needs one experienced contributor who can move between layers instead of staffing several narrow roles.",
    },
    {
      title: "The handoff must protect the relationship",
      description:
        "Communication, repository access, documentation, scope boundaries, and client ownership need to stay clear throughout delivery.",
    },
  ],
  outcomes: [
    {
      title: "A defined delivery owner",
      description:
        "Give me a product area, milestone, or technical problem with clear access and decision-makers; I can take it from investigation to production.",
    },
    {
      title: "Web and backend coverage",
      description:
        "Build Next.js interfaces, Node.js and NestJS APIs, PostgreSQL data models, integrations, tests, and deployment workflows.",
    },
    {
      title: "React Native delivery",
      description:
        "Cover shared iOS and Android features, onboarding, forms, payments, subscriptions, APIs, and release preparation.",
    },
    {
      title: "White-label or embedded work",
      description:
        "Work directly with the agency team, follow the established client communication model, and leave the code and context with the delivery organization.",
    },
  ],
  proof: {
    title: "Web, data, AI, and mobile client delivery",
    description:
      "My agency experience includes production websites, data-heavy platforms, backend integrations, and a cross-platform banking application.",
    points: [
      "Next.js, React, Node.js, NestJS, and PostgreSQL",
      "React Native delivery for iOS and Android",
      "Payments, forms, authentication, and API integrations",
      "Architecture, testing, CI/CD, Docker, and production operations",
    ],
    href: "/case-studies/cross-platform-banking-application",
    linkLabel: "Read the anonymous mobile case",
  },
  fit: [
    "You need a senior individual contributor to own a defined product area or delivery milestone.",
    "The engagement has a responsible product or delivery lead, access to the real codebase, and a clear path for decisions.",
    "You value direct technical communication, honest scope boundaries, and ownership through release and handoff.",
  ],
  faqs: [
    {
      question: "Can you work white-label?",
      answer:
        "Yes. We can agree how I appear in client communication, who owns decisions, and how code, documentation, and access are handed back to the agency.",
    },
    {
      question: "Can you join an existing codebase?",
      answer:
        "Yes. I first establish the current architecture, deployment path, conventions, and known risks, then work inside that system unless a change is necessary.",
    },
    {
      question: "Do you take short engagements?",
      answer:
        "A focused audit, rescue, integration, release, or feature can work well when the outcome and access are clear. Longer embedded delivery is also possible.",
    },
    {
      question: "Will you contact our client directly?",
      answer:
        "Only within the communication model we agree. I do not use an agency engagement to bypass the agency or solicit its client.",
    },
  ],
};

export const allSolutions = [...solutions, agencySolution];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
