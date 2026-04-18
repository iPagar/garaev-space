"use server";

import nodemailer from "nodemailer";
import {
  budgetRanges,
  buildProjectInquirySummary,
  contactConfig,
  initialProjectInquiryValues,
  type ProjectInquiryActionState,
  type PreferredLanguage,
  type ProjectInquiryValues,
  preferredLanguages,
  projectStages,
  projectTimelines,
} from "../lib/contact";

function normalizeValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isPreferredLanguage(value: string): value is PreferredLanguage {
  return preferredLanguages.some((option) => option.value === value);
}

function isAllowedChoice(value: string, allowedValues: readonly string[]) {
  return allowedValues.includes(value);
}

function extractValues(formData: FormData): ProjectInquiryValues {
  const preferredLanguageValue = normalizeValue(
    formData.get("preferredLanguage"),
  );

  return {
    budgetRange: normalizeValue(formData.get("budgetRange")),
    contact: normalizeValue(formData.get("contact")),
    links: normalizeValue(formData.get("links")),
    message: normalizeValue(formData.get("message")),
    name: normalizeValue(formData.get("name")),
    preferredLanguage: isPreferredLanguage(preferredLanguageValue)
      ? preferredLanguageValue
      : initialProjectInquiryValues.preferredLanguage,
    projectStage: normalizeValue(formData.get("projectStage")),
    timeline: normalizeValue(formData.get("timeline")),
  };
}

function getReplyTo(contact: string) {
  return contact.includes("@") ? contact : undefined;
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
  const rows = [
    ["Preferred language", values.preferredLanguage],
    ["Name", values.name],
    ["Contact", values.contact],
    ["Project stage", values.projectStage],
    ["Timeline", values.timeline],
    ["Budget range", values.budgetRange],
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
      <h1 style="font-size:20px;margin-bottom:16px;">New project inquiry</h1>
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

  if (
    !values.name ||
    !values.contact ||
    !values.message ||
    !isAllowedChoice(values.projectStage, projectStages) ||
    !isAllowedChoice(values.timeline, projectTimelines) ||
    !isAllowedChoice(values.budgetRange, budgetRanges)
  ) {
    return {
      message:
        "Please fill out the required fields before sending the inquiry.",
      status: "error",
      values,
    };
  }

  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return {
      message:
        "SMTP is not configured yet. Add the SMTP env variables and try again.",
      status: "error",
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
      subject: `Project inquiry from ${values.name}`,
      text: buildProjectInquirySummary(values),
      to: smtpConfig.to,
    });

    return {
      message:
        "Your inquiry has been sent. I will get back to you by email or Telegram.",
      status: "success",
      values: initialProjectInquiryValues,
    };
  } catch {
    return {
      message:
        "The inquiry could not be sent. Check SMTP settings and try again.",
      status: "error",
      values,
    };
  }
}
