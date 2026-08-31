export type ProjectRange = {
  description: string;
  inclusions: readonly string[];
  name: string;
  price: string;
};

export type PricingFaq = {
  answer: string;
  question: string;
};

export const projectRanges: readonly ProjectRange[] = [
  {
    name: "Focused delivery",
    price: "$1,500–$5,000",
    description:
      "For a bounded problem with a clear outcome in an existing product or workflow.",
    inclusions: [
      "Technical audits and delivery plans",
      "Third-party integrations",
      "Production fixes and improvements",
      "One focused feature or workflow",
    ],
  },
  {
    name: "Product milestone",
    price: "$5,000–$15,000",
    description:
      "For a substantial product area that can be planned and delivered as one milestone.",
    inclusions: [
      "A web application area or module",
      "CMS and editorial workflows",
      "A React Native milestone",
      "An internal tool or platform phase",
    ],
  },
  {
    name: "Full product delivery",
    price: "$15,000–$30,000",
    description:
      "For an end-to-end release spanning several parts of the product and its delivery.",
    inclusions: [
      "An MVP or product rebuild",
      "Web and mobile delivery",
      "Architecture, backend, and integrations",
      "Production release and handover",
    ],
  },
] as const;

export const pricingFaqs: readonly PricingFaq[] = [
  {
    question: "Fixed price or hourly?",
    answer:
      "Most project work is scoped as a fixed milestone with agreed deliverables, timing, and price. When the codebase or requirements contain important unknowns, I propose a short paid discovery before fixing the delivery estimate.",
  },
  {
    question: "What do you need for an estimate?",
    answer:
      "Send the outcome you need, what already exists, the main constraints, and any relevant product, repository, design, or documentation links. A deadline and decision-maker context also help me produce a useful estimate.",
  },
  {
    question: "Can you work in an existing codebase?",
    answer:
      "Yes. A focused engagement can start with the current application, infrastructure, and delivery process. I first review the relevant code and constraints, then define the smallest responsible scope for the requested outcome.",
  },
  {
    question: "What is included in the price?",
    answer:
      "The proposal lists the agreed implementation, appropriate testing, delivery work, and handover. Hosting, paid third-party services, content production, and other external costs are identified separately when they apply.",
  },
  {
    question: "How are scope changes handled?",
    answer:
      "If a new request changes the agreed outcome or delivery effort, I explain the impact and estimate it before continuing. Small clarifications stay inside the milestone; material additions become a separate scope or follow-up phase.",
  },
  {
    question: "Can we start with paid discovery?",
    answer:
      "Yes. Discovery is useful when the product, codebase, integrations, or requirements need investigation first. It ends with documented findings, delivery risks, a recommended scope, and a more reliable estimate.",
  },
] as const;
