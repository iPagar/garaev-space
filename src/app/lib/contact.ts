export const contactConfig = {
  email: "contact@pavelgaraev.com",
  telegramHandle: "@ipagar",
  telegramUrl: "https://t.me/ipagar",
  responseTime: "I usually reply within 1-2 business days.",
} as const;

export type PreferredLanguage = "english" | "russian";

export type ProjectInquiryValues = {
  budgetRange: string;
  contact: string;
  links: string;
  message: string;
  name: string;
  preferredLanguage: PreferredLanguage;
  projectStage: string;
  timeline: string;
};

export type ProjectInquiryActionState = {
  message: string;
  status: "idle" | "success" | "error";
  values: ProjectInquiryValues;
};

export const preferredLanguages = [
  {
    value: "russian",
    label: "Русский",
    description: "Отвечу на русском.",
  },
  {
    value: "english",
    label: "English",
    description: "I will reply in English.",
  },
] as const;

export const projectStages = [
  "Idea",
  "Designs ready",
  "Existing product",
  "Need audit or consultation",
  "Need end-to-end build",
] as const;

export const projectTimelines = [
  "ASAP",
  "Within 2-4 weeks",
  "Within 1-3 months",
  "Just exploring",
] as const;

export const budgetRanges = [
  "$1k-$3k",
  "$3k-$7k",
  "$7k-$15k",
  "$15k+",
] as const;

export const initialProjectInquiryValues: ProjectInquiryValues = {
  budgetRange: budgetRanges[0],
  contact: "",
  links: "",
  message: "",
  name: "",
  preferredLanguage: preferredLanguages[0].value,
  projectStage: projectStages[0],
  timeline: projectTimelines[1],
};

export const initialProjectInquiryActionState: ProjectInquiryActionState = {
  message: "",
  status: "idle",
  values: initialProjectInquiryValues,
};

export function getLanguageLabel(language: PreferredLanguage) {
  return (
    preferredLanguages.find((option) => option.value === language)?.label ??
    language
  );
}

export function buildProjectInquirySummary(values: ProjectInquiryValues) {
  return [
    "Project inquiry",
    "",
    `Preferred language: ${getLanguageLabel(values.preferredLanguage)}`,
    `Name: ${values.name.trim() || "-"}`,
    `Contact: ${values.contact.trim() || "-"}`,
    `Project stage: ${values.projectStage}`,
    `Timeline: ${values.timeline}`,
    `Budget range: ${values.budgetRange}`,
    `Links: ${values.links.trim() || "-"}`,
    "",
    "Brief:",
    values.message.trim() || "-",
  ].join("\n");
}
