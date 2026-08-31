export const contactConfig = {
  email: "contact@pavelgaraev.com",
  telegramHandle: "@ipagar",
  telegramUrl: "https://t.me/ipagar",
  responseTime: "I usually reply within 1-2 business days.",
} as const;

export type PreferredLanguage = "english" | "russian";
export type InquiryType = "project" | "role";

export type ProjectInquiryValues = {
  budgetRange: string;
  contact: string;
  inquiryType: InquiryType;
  links: string;
  message: string;
  name: string;
  preferredLanguage: PreferredLanguage;
  timeline: string;
  workContext: string;
};

export type ProjectInquiryActionState = {
  message: string;
  status: "idle" | "success" | "error";
  submittedInquiryType: InquiryType | null;
  values: ProjectInquiryValues;
};

type ProjectInquiryFeedbackKey =
  | "validationError"
  | "deliveryUnavailable"
  | "success";

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

export const inquiryTypes = [
  {
    value: "project",
    label: "Project",
    description:
      "A new product, an existing system, or focused engineering work.",
  },
  {
    value: "role",
    label: "Role",
    description: "A full-time, contract, or part-time engineering role.",
  },
] as const;

export const projectContexts = [
  "Idea",
  "Designs ready",
  "Existing product",
  "Need audit or consultation",
  "Need end-to-end build",
] as const;

export const roleContexts = [
  "Full-time role",
  "Contract role",
  "Part-time role",
  "Advisory work",
] as const;

export const projectTimelines = [
  "ASAP",
  "Within 2-4 weeks",
  "Within 1-3 months",
  "Just exploring",
] as const;

export const budgetRanges = [
  "$1,500–$5,000",
  "$5,000–$15,000",
  "$15,000–$30,000",
  "Need help estimating",
] as const;

export const initialProjectInquiryValues: ProjectInquiryValues = {
  budgetRange: budgetRanges[0],
  contact: "",
  inquiryType: inquiryTypes[0].value,
  links: "",
  message: "",
  name: "",
  preferredLanguage: preferredLanguages[0].value,
  timeline: projectTimelines[1],
  workContext: projectContexts[0],
};

export const initialProjectInquiryActionState: ProjectInquiryActionState = {
  message: "",
  status: "idle",
  submittedInquiryType: null,
  values: initialProjectInquiryValues,
};

export function getLanguageLabel(language: PreferredLanguage) {
  return (
    preferredLanguages.find((option) => option.value === language)?.label ??
    language
  );
}

export function getInquiryTypeLabel(inquiryType: InquiryType) {
  return (
    inquiryTypes.find((option) => option.value === inquiryType)?.label ??
    inquiryType
  );
}

export function buildProjectInquirySummary(values: ProjectInquiryValues) {
  const isProject = values.inquiryType === "project";

  return [
    `${getInquiryTypeLabel(values.inquiryType)} inquiry`,
    "",
    `Preferred language: ${getLanguageLabel(values.preferredLanguage)}`,
    `Name: ${values.name.trim() || "-"}`,
    `Contact: ${values.contact.trim() || "-"}`,
    `${isProject ? "Project stage" : "Role type"}: ${values.workContext}`,
    `Timeline: ${values.timeline}`,
    ...(isProject ? [`Budget range: ${values.budgetRange}`] : []),
    `Links: ${values.links.trim() || "-"}`,
    "",
    "Details",
    values.message.trim() || "-",
  ].join("\n");
}

export function getProjectInquiryFeedbackMessage(
  key: ProjectInquiryFeedbackKey,
) {
  const errorMessages = {
    deliveryUnavailable:
      "The message did not go through. Please try again or contact me by email or Telegram.",
    validationError:
      "Please fill out the required fields before sending the inquiry.",
  } satisfies Record<Exclude<ProjectInquiryFeedbackKey, "success">, string>;

  if (key !== "success") {
    return errorMessages[key];
  }

  return "Your message has been sent. I will get back to you by email or Telegram.";
}
