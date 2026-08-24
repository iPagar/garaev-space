"use server";

import nodemailer from "nodemailer";
import {
  budgetRanges,
  buildProjectInquirySummary,
  contactConfig,
  getInquiryTypeLabel,
  getProjectInquiryFeedbackMessage,
  type InquiryType,
  initialProjectInquiryValues,
  inquiryTypes,
  type PreferredLanguage,
  type ProjectInquiryActionState,
  type ProjectInquiryValues,
  preferredLanguages,
  projectContexts,
  projectTimelines,
  roleContexts,
} from "../lib/contact";

function normalizeValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isPreferredLanguage(value: string): value is PreferredLanguage {
  return preferredLanguages.some((option) => option.value === value);
}

function isInquiryType(value: string): value is InquiryType {
  return inquiryTypes.some((option) => option.value === value);
}

function isAllowedChoice(value: string, allowedValues: readonly string[]) {
  return allowedValues.includes(value);
}

function extractValues(formData: FormData): ProjectInquiryValues {
  const preferredLanguageValue = normalizeValue(
    formData.get("preferredLanguage"),
  );
  const inquiryTypeValue = normalizeValue(formData.get("inquiryType"));

  return {
    budgetRange: normalizeValue(formData.get("budgetRange")),
    contact: normalizeValue(formData.get("contact")),
    inquiryType: isInquiryType(inquiryTypeValue)
      ? inquiryTypeValue
      : initialProjectInquiryValues.inquiryType,
    links: normalizeValue(formData.get("links")),
    message: normalizeValue(formData.get("message")),
    name: normalizeValue(formData.get("name")),
    preferredLanguage: isPreferredLanguage(preferredLanguageValue)
      ? preferredLanguageValue
      : initialProjectInquiryValues.preferredLanguage,
    timeline: normalizeValue(formData.get("timeline")),
    workContext: normalizeValue(formData.get("workContext")),
  };
}

function getReplyTo(contact: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : undefined;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatEmailHtml(values: ProjectInquiryValues) {
  const isProject = values.inquiryType === "project";
  const rows = [
    ["Inquiry type", getInquiryTypeLabel(values.inquiryType)],
    ["Preferred language", values.preferredLanguage],
    ["Name", values.name],
    ["Contact", values.contact],
    [isProject ? "Project stage" : "Role type", values.workContext],
    ["Timeline", values.timeline],
    ...(isProject ? [["Budget range", values.budgetRange]] : []),
    ["Links", values.links || "-"],
  ];

  const detailsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e4e4e7;font-weight:600;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e4e4e7;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#18181b;line-height:1.6;">
      <h1 style="font-size:20px;margin-bottom:16px;">New ${escapeHtml(values.inquiryType)} inquiry</h1>
      <table style="border-collapse:collapse;margin-bottom:24px;">
        ${detailsHtml}
      </table>
      <h2 style="font-size:16px;margin-bottom:8px;">Brief</h2>
      <div style="white-space:pre-wrap;border:1px solid #e4e4e7;padding:16px;border-radius:12px;">${escapeHtml(values.message)}</div>
    </div>
  `;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM ?? contactConfig.email;
  const to = process.env.SMTP_TO ?? contactConfig.email;

  if (!host || !port || !user || !password) {
    return null;
  }

  return {
    auth: {
      pass: password,
      user,
    },
    from,
    host,
    port: Number(port),
    secure: process.env.SMTP_SECURE === "true" || Number(port) === 465,
    to,
  };
}

export async function submitProjectInquiry(
  _previousState: ProjectInquiryActionState,
  formData: FormData,
): Promise<ProjectInquiryActionState> {
  const values = extractValues(formData);
  const allowedContexts =
    values.inquiryType === "project" ? projectContexts : roleContexts;

  if (
    !values.name ||
    !values.contact ||
    !values.message ||
    !isAllowedChoice(values.workContext, allowedContexts) ||
    !isAllowedChoice(values.timeline, projectTimelines) ||
    (values.inquiryType === "project" &&
      !isAllowedChoice(values.budgetRange, budgetRanges))
  ) {
    return {
      message: getProjectInquiryFeedbackMessage("validationError"),
      status: "error",
      submittedInquiryType: null,
      values,
    };
  }

  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return {
      message: getProjectInquiryFeedbackMessage("deliveryUnavailable"),
      status: "error",
      submittedInquiryType: null,
      values,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      auth: smtpConfig.auth,
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
    });

    await transporter.sendMail({
      from: smtpConfig.from,
      html: formatEmailHtml(values),
      replyTo: getReplyTo(values.contact),
      subject: `${getInquiryTypeLabel(values.inquiryType)} inquiry from ${values.name}`,
      text: buildProjectInquirySummary(values),
      to: smtpConfig.to,
    });

    return {
      message: getProjectInquiryFeedbackMessage("success"),
      status: "success",
      submittedInquiryType: values.inquiryType,
      values: initialProjectInquiryValues,
    };
  } catch {
    return {
      message: getProjectInquiryFeedbackMessage("deliveryUnavailable"),
      status: "error",
      submittedInquiryType: null,
      values,
    };
  }
}
