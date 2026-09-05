"use server";

import nodemailer from "nodemailer";
import {
  buildProjectInquirySummary,
  contactConfig,
  extractProjectInquiryValues,
  getProjectInquiryFeedbackMessage,
  initialProjectInquiryValues,
  type ProjectInquiryActionState,
  validateProjectInquiry,
} from "../lib/contact";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !user ||
    !password
  )
    return null;
  return {
    auth: { pass: password, user },
    from: process.env.SMTP_FROM ?? contactConfig.email,
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    to: process.env.SMTP_TO ?? contactConfig.email,
  };
}

export async function submitProjectInquiry(
  _previousState: ProjectInquiryActionState,
  formData: FormData,
): Promise<ProjectInquiryActionState> {
  const values = extractProjectInquiryValues(formData);
  const fieldErrors = validateProjectInquiry(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: getProjectInquiryFeedbackMessage("validationError"),
      status: "error",
      fieldErrors,
      values,
    };
  }

  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return {
      message: getProjectInquiryFeedbackMessage("deliveryUnavailable"),
      status: "error",
      fieldErrors: {},
      values,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      auth: smtpConfig.auth,
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    const result = await transporter.sendMail({
      from: smtpConfig.from,
      replyTo: values.email.trim(),
      subject: "New website inquiry",
      text: buildProjectInquirySummary(values),
      to: smtpConfig.to,
    });

    if (result.accepted.length === 0)
      throw new Error("SMTP did not accept a recipient");

    return {
      message: getProjectInquiryFeedbackMessage("success"),
      status: "success",
      fieldErrors: {},
      values: initialProjectInquiryValues,
    };
  } catch {
    return {
      message: getProjectInquiryFeedbackMessage("deliveryUnavailable"),
      status: "error",
      fieldErrors: {},
      values,
    };
  }
}
