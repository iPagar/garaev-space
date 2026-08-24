export type CaseStudy = {
  context: string;
  contribution: string[];
  delivered: string[];
  metaDescription: string;
  relatedServiceSlugs: string[];
  result: string;
  slug: string;
  stack: string[];
  summary: string;
  title: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "investigation-data-platform",
    title: "Investigation data platform",
    summary:
      "A production system for persistent search, external data collection, structured findings, and graph-based investigation work.",
    metaDescription:
      "A full-stack investigation platform combining persistent search, external integrations, LLM-assisted structuring, PostgreSQL, and Neo4j.",
    context:
      "The product brings investigation work into one application. It connects external sources, stores structured findings, supports persistent searches, and presents relationships through a graph interface.",
    contribution: [
      "Worked across architecture, backend, frontend, and production delivery",
      "Built persistent search and external integration workflows",
      "Implemented LLM-assisted structuring with schema validation",
      "Connected relational data with graph-based exploration",
      "Added application workflows for authentication, exports, and operational use",
    ],
    delivered: [
      "Search and investigation workflows",
      "External source integrations",
      "Structured LLM output",
      "Graph exploration interface",
      "Exports and production operations",
    ],
    result:
      "The delivered system supports investigation work from data collection and structuring through relationship analysis and export.",
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Neo4j",
      "OpenAI",
      "Docker",
    ],
    relatedServiceSlugs: ["web-application-development", "nextjs-development"],
  },
  {
    slug: "operations-data-platform",
    title: "Operations data platform",
    summary:
      "An internal application for managing complex records, validation, search, filters, exports, and day-to-day operational workflows.",
    metaDescription:
      "An internal operations platform for complex records, validation, search, filters, exports, and administrative workflows.",
    context:
      "The team needed a reliable interface for working with a large operational dataset. The application had to support structured editing, validation, search, filters, and exports without moving work between unrelated tools.",
    contribution: [
      "Designed application workflows around operational tasks",
      "Built data-heavy tables, filters, and record views",
      "Implemented validation and controlled editing",
      "Added import and export workflows",
      "Worked on API behavior, testing, and production stability",
    ],
    delivered: [
      "Record management",
      "Search and filters",
      "Validation workflows",
      "Imports and exports",
      "Administrative access controls",
    ],
    result:
      "The application consolidates record management and routine operational work in one controlled interface.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "REST"],
    relatedServiceSlugs: ["web-application-development", "nextjs-development"],
  },
  {
    slug: "cross-platform-banking-application",
    title: "Cross-platform banking application",
    summary:
      "A React Native application for iOS and Android with onboarding, account workflows, payments, forms, and backend integration.",
    metaDescription:
      "A React Native banking application for iOS and Android with onboarding, payments, forms, and backend integration.",
    context:
      "The mobile product needed a shared implementation for iOS and Android while retaining the product flows expected from a banking application.",
    contribution: [
      "Built cross-platform interfaces and navigation",
      "Implemented onboarding and form workflows",
      "Integrated account and payment APIs",
      "Handled validation and error states",
      "Supported release and production fixes",
    ],
    delivered: [
      "iOS and Android application",
      "Onboarding flows",
      "Account workflows",
      "Payment integration",
      "Form validation and error handling",
    ],
    result:
      "The delivered application covered the core mobile banking flows in one React Native codebase for both platforms.",
    stack: ["TypeScript", "React Native", "iOS", "Android", "REST", "Payments"],
    relatedServiceSlugs: ["react-native-development"],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
