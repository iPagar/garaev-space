export const contactConfig = {
  email: "contact@pavelgaraev.com",
  responseTime: "I usually reply within 1–2 business days.",
} as const;

export type ProjectInquiryValues = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

export type ProjectInquiryErrors = Partial<
  Record<keyof ProjectInquiryValues, string>
>;

export type ProjectInquiryActionState = {
  message: string;
  status: "idle" | "success" | "error";
  fieldErrors: ProjectInquiryErrors;
  values: ProjectInquiryValues;
};

export const inquiryLimits = {
  name: 120,
  email: 254,
  organization: 200,
  message: 10000,
} as const;

export const initialProjectInquiryValues: ProjectInquiryValues = {
  name: "",
  email: "",
  organization: "",
  message: "",
};

export const initialProjectInquiryActionState: ProjectInquiryActionState = {
  message: "",
  status: "idle",
  fieldErrors: {},
  values: initialProjectInquiryValues,
};

export function validateProjectInquiry(
  values: ProjectInquiryValues,
): ProjectInquiryErrors {
  const errors: ProjectInquiryErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim())
    errors.message = "Please tell me a little about your project or role.";
  for (const key of Object.keys(
    inquiryLimits,
  ) as (keyof ProjectInquiryValues)[]) {
    if (values[key].length > inquiryLimits[key])
      errors[key] = `Please use no more than ${inquiryLimits[key]} characters.`;
  }
  return errors;
}

export function extractProjectInquiryValues(
  formData: FormData,
): ProjectInquiryValues {
  function value(key: keyof ProjectInquiryValues) {
    const entry = formData.get(key);
    return typeof entry === "string" ? entry : "";
  }
  return {
    name: value("name"),
    email: value("email"),
    organization: value("organization"),
    message: value("message"),
  };
}

export function buildProjectInquirySummary(values: ProjectInquiryValues) {
  return [
    "Website inquiry",
    "",
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Organization: ${values.organization.trim() || "Not provided"}`,
    "",
    "Project details",
    values.message.trim(),
  ].join("\n");
}

export function getProjectInquiryFeedbackMessage(
  key: "validationError" | "deliveryUnavailable" | "success",
) {
  const messages = {
    validationError: "Please check the highlighted fields.",
    deliveryUnavailable:
      "Your message could not be sent. Your details are still here — please try again or email me directly.",
    success:
      "Thanks — your message has been received. I’ll reply to the email address you provided.",
  };
  return messages[key];
}
