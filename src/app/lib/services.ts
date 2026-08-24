export type Service = {
  description: string;
  metaDescription: string;
  relatedCaseSlugs: string[];
  scope: string[];
  shortDescription: string;
  situations: string[];
  slug: string;
  stack: string[];
  title: string;
};

export const services: Service[] = [
  {
    slug: "web-application-development",
    title: "Web application development",
    shortDescription:
      "Production web applications, internal platforms, dashboards, payments, and external integrations.",
    description:
      "I build and extend web applications across the frontend, backend, data model, integrations, and deployment setup. The work can cover a new product or a focused part of an existing system.",
    metaDescription:
      "Web application development with React, Next.js, Node.js, NestJS, PostgreSQL, integrations, payments, and production delivery.",
    scope: [
      "Product architecture and technical planning",
      "React and Next.js interfaces",
      "Node.js and NestJS APIs",
      "PostgreSQL data models and operational workflows",
      "Authentication, payments, webhooks, and third-party integrations",
      "Testing, CI/CD, logging, and observability",
    ],
    situations: [
      "A product needs its first production version",
      "An internal process needs a purpose-built web application",
      "An existing application needs new workflows or integrations",
      "A team needs one engineer to own work across the stack",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
    ],
    relatedCaseSlugs: [
      "investigation-data-platform",
      "operations-data-platform",
    ],
  },
  {
    slug: "nextjs-development",
    title: "Next.js development",
    shortDescription:
      "Next.js products, content-driven sites, admin interfaces, and performance work for existing applications.",
    description:
      "I use Next.js for production interfaces that need server rendering, application workflows, content integration, or a clear path from implementation to deployment.",
    metaDescription:
      "Next.js development for production applications, admin interfaces, content platforms, integrations, and performance improvements.",
    scope: [
      "Application structure and routing",
      "Server and client component boundaries",
      "Authentication and protected application areas",
      "API and CMS integrations",
      "Accessibility and localization",
      "Performance, caching, and deployment work",
    ],
    situations: [
      "A React product is moving to Next.js",
      "A site needs application features as well as content",
      "An existing Next.js codebase needs focused engineering work",
      "A team needs help with rendering, caching, or production behavior",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "REST",
      "GraphQL",
      "Sanity",
    ],
    relatedCaseSlugs: [
      "investigation-data-platform",
      "operations-data-platform",
    ],
  },
  {
    slug: "react-native-development",
    title: "React Native development",
    shortDescription:
      "Cross-platform mobile products for iOS and Android, including onboarding, payments, subscriptions, and API integration.",
    description:
      "I build React Native applications as part of a complete product system, including the mobile interface, backend integration, release work, payments, subscriptions, and analytics.",
    metaDescription:
      "React Native development for iOS and Android applications, payments, subscriptions, API integration, and production releases.",
    scope: [
      "Application structure and navigation",
      "Reusable mobile interfaces",
      "Backend and third-party API integration",
      "Payments and subscription flows",
      "App Store and Google Play release work",
      "Analytics, error handling, and production fixes",
    ],
    situations: [
      "A product needs one codebase for iOS and Android",
      "An existing application needs new product flows",
      "A mobile product needs payments or subscriptions",
      "A release needs engineering work beyond the interface",
    ],
    stack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "REST",
      "RevenueCat",
      "Firebase",
    ],
    relatedCaseSlugs: ["cross-platform-banking-application"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
