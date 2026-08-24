"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitProjectInquiry } from "../contact/actions";
import {
  budgetRanges,
  contactConfig,
  type InquiryType,
  initialProjectInquiryActionState,
  initialProjectInquiryValues,
  inquiryTypes,
  type ProjectInquiryValues,
  preferredLanguages,
  projectContexts,
  projectTimelines,
  roleContexts,
} from "../lib/contact";

const inputClassName =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send details"}
    </button>
  );
}

export default function ProjectInquiryForm() {
  const [state, formAction] = useActionState(
    submitProjectInquiry,
    initialProjectInquiryActionState,
  );
  const actionState = state ?? initialProjectInquiryActionState;
  const formValues = actionState.values ?? initialProjectInquiryValues;
  const [form, setForm] = useState<ProjectInquiryValues>(
    initialProjectInquiryValues,
  );
  const formId = useId();
  const workContexts =
    form.inquiryType === "project" ? projectContexts : roleContexts;

  useEffect(() => {
    setForm(formValues);
  }, [formValues]);

  useEffect(() => {
    if (actionState.status !== "success" || !actionState.submittedInquiryType) {
      return;
    }

    const trackingWindow = window as typeof window & {
      dataLayer: Array<Record<string, string>>;
    };
    trackingWindow.dataLayer = trackingWindow.dataLayer ?? [];
    trackingWindow.dataLayer.push({
      event: "lead_form_submit",
      inquiry_type: actionState.submittedInquiryType,
    });
  }, [actionState.status, actionState.submittedInquiryType]);

  function updateField<Key extends keyof ProjectInquiryValues>(
    key: Key,
    value: ProjectInquiryValues[Key],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateInquiryType(inquiryType: InquiryType) {
    setForm((current) => ({
      ...current,
      inquiryType,
      workContext:
        inquiryType === "project" ? projectContexts[0] : roleContexts[0],
    }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.55fr)] lg:items-start">
      <form
        action={formAction}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="border-b border-slate-200 pb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Work details
          </h2>
          <p className="mt-3 max-w-2xl text-sm/6 text-slate-600">
            Share enough context for me to understand the work and reply with a
            relevant next step.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <fieldset>
            <legend className="text-sm/6 font-semibold text-slate-950">
              What are you contacting me about
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {inquiryTypes.map((option) => (
                <label
                  key={option.value}
                  className="relative block rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 has-checked:border-blue-600 has-checked:bg-blue-50 has-checked:ring-1 has-checked:ring-blue-600"
                >
                  <input
                    checked={form.inquiryType === option.value}
                    name="inquiryType"
                    type="radio"
                    value={option.value}
                    onChange={() => updateInquiryType(option.value)}
                    className="absolute inset-0 appearance-none focus:outline-none"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-950">
                      {option.label}
                    </span>
                    <span className="mt-1 text-sm/6 text-slate-600">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm/6 font-semibold text-slate-950">
              Preferred language
            </legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {preferredLanguages.map((option) => (
                <label
                  key={option.value}
                  className="relative rounded-lg border border-slate-300 bg-white px-4 py-2.5 has-checked:border-blue-600 has-checked:bg-blue-50 has-checked:ring-1 has-checked:ring-blue-600"
                >
                  <input
                    checked={form.preferredLanguage === option.value}
                    name="preferredLanguage"
                    type="radio"
                    value={option.value}
                    onChange={() =>
                      updateField("preferredLanguage", option.value)
                    }
                    className="absolute inset-0 appearance-none focus:outline-none"
                  />
                  <span className="text-sm font-medium text-slate-800">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${formId}-name`}
                className="block text-sm/6 font-medium text-slate-950"
              >
                Name
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={inputClassName}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-contact`}
                className="block text-sm/6 font-medium text-slate-950"
              >
                Email or Telegram
              </label>
              <input
                id={`${formId}-contact`}
                name="contact"
                type="text"
                value={form.contact}
                onChange={(event) => updateField("contact", event.target.value)}
                className={inputClassName}
                placeholder="name@example.com or @username"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-context`}
                className="block text-sm/6 font-medium text-slate-950"
              >
                {form.inquiryType === "project" ? "Project stage" : "Role type"}
              </label>
              <select
                id={`${formId}-context`}
                name="workContext"
                value={form.workContext}
                onChange={(event) =>
                  updateField("workContext", event.target.value)
                }
                className={inputClassName}
              >
                {workContexts.map((context) => (
                  <option key={context} value={context}>
                    {context}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`${formId}-timeline`}
                className="block text-sm/6 font-medium text-slate-950"
              >
                Timeline
              </label>
              <select
                id={`${formId}-timeline`}
                name="timeline"
                value={form.timeline}
                onChange={(event) =>
                  updateField("timeline", event.target.value)
                }
                className={inputClassName}
              >
                {projectTimelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </div>

            {form.inquiryType === "project" ? (
              <div className="sm:col-span-2">
                <label
                  htmlFor={`${formId}-budget`}
                  className="block text-sm/6 font-medium text-slate-950"
                >
                  Budget range
                </label>
                <select
                  id={`${formId}-budget`}
                  name="budgetRange"
                  value={form.budgetRange}
                  onChange={(event) =>
                    updateField("budgetRange", event.target.value)
                  }
                  className={inputClassName}
                >
                  {budgetRanges.map((budgetRange) => (
                    <option key={budgetRange} value={budgetRange}>
                      {budgetRange}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input type="hidden" name="budgetRange" value="" />
            )}

            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-links`}
                className="block text-sm/6 font-medium text-slate-950"
              >
                Links
              </label>
              <input
                id={`${formId}-links`}
                name="links"
                type="text"
                value={form.links}
                onChange={(event) => updateField("links", event.target.value)}
                className={inputClassName}
                placeholder="Company, product, job description, brief, or repository"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-message`}
                className="block text-sm/6 font-medium text-slate-950"
              >
                Details
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={6}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className={inputClassName}
                placeholder="Describe the product or role, the current situation, and what you need from me."
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-8">
          <SubmitButton />
          <p className="text-sm/6 text-slate-500">
            {contactConfig.responseTime}
          </p>
        </div>

        {actionState.status !== "idle" ? (
          <p
            className={`mt-6 text-sm/6 ${
              actionState.status === "success"
                ? "text-emerald-700"
                : "text-rose-700"
            }`}
          >
            {actionState.message}
          </p>
        ) : null}
      </form>

      <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Direct contact
        </h2>
        <p className="mt-4 text-sm/6 text-slate-600">
          You can also send the same details through Telegram or email.
        </p>
        <dl className="mt-6 space-y-5 border-t border-slate-200 pt-6">
          <div>
            <dt className="text-sm text-slate-500">Telegram</dt>
            <dd className="mt-1">
              <a
                href={contactConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-950 hover:text-blue-700"
              >
                {contactConfig.telegramHandle}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${contactConfig.email}`}
                className="font-semibold text-slate-950 hover:text-blue-700"
              >
                {contactConfig.email}
              </a>
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
