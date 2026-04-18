"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitProjectInquiry } from "../contact/actions";
import {
  budgetRanges,
  contactConfig,
  initialProjectInquiryActionState,
  initialProjectInquiryValues,
  type ProjectInquiryValues,
  preferredLanguages,
  projectStages,
  projectTimelines,
} from "../lib/contact";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send inquiry"}
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

  useEffect(() => {
    setForm(formValues);
  }, [formValues]);

  function updateField<Key extends keyof ProjectInquiryValues>(
    key: Key,
    value: ProjectInquiryValues[Key],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.7fr)] lg:items-start">
      <form
        action={formAction}
        className="rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8"
      >
        <div className="border-b border-zinc-800/80 pb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            Project brief
          </h2>
          <p className="mt-3 max-w-2xl text-sm/6 text-zinc-400">
            Enough context to understand the task, timeline, and budget.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm/6 font-semibold text-zinc-100">
              Preferred language
            </legend>
            <p className="mt-1 text-sm/6 text-zinc-500">
              Pick the language you want to use for the conversation.
            </p>
            <div className="mt-5 space-y-3">
              {preferredLanguages.map((option) => (
                <label
                  key={option.value}
                  className="group relative block rounded-2xl border border-zinc-800/80 bg-zinc-950/60 px-5 py-4 has-checked:border-zinc-400 has-checked:bg-zinc-900 has-checked:outline has-checked:outline-1 has-checked:outline-zinc-400"
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
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-100">
                      {option.label}
                    </span>
                    <span className="mt-1 text-sm/6 text-zinc-500">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${formId}-name`}
                className="block text-sm/6 font-medium text-zinc-100"
              >
                Name
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-contact`}
                className="block text-sm/6 font-medium text-zinc-100"
              >
                Email or Telegram
              </label>
              <input
                id={`${formId}-contact`}
                name="contact"
                type="text"
                value={form.contact}
                onChange={(event) => updateField("contact", event.target.value)}
                className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                placeholder="name@example.com or @username"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-stage`}
                className="block text-sm/6 font-medium text-zinc-100"
              >
                Project stage
              </label>
              <select
                id={`${formId}-stage`}
                name="projectStage"
                value={form.projectStage}
                onChange={(event) =>
                  updateField("projectStage", event.target.value)
                }
                className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              >
                {projectStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`${formId}-timeline`}
                className="block text-sm/6 font-medium text-zinc-100"
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
                className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              >
                {projectTimelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-budget`}
                className="block text-sm/6 font-medium text-zinc-100"
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
                className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              >
                {budgetRanges.map((budgetRange) => (
                  <option key={budgetRange} value={budgetRange}>
                    {budgetRange}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-links`}
                className="block text-sm/6 font-medium text-zinc-100"
              >
                Links
              </label>
              <input
                id={`${formId}-links`}
                name="links"
                type="text"
                value={form.links}
                onChange={(event) => updateField("links", event.target.value)}
                className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                placeholder="Site, Figma, repo, Notion, brief"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-message`}
                className="block text-sm/6 font-medium text-zinc-100"
              >
                What do you need help with?
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={6}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="mt-2 block w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-3 text-sm/6 text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                placeholder="A short outline of the project, current problem, and expected outcome."
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-zinc-800/80 pt-8">
          <SubmitButton />
          <p className="text-sm/6 text-zinc-500">
            {contactConfig.responseTime}
          </p>
        </div>

        {actionState.status !== "idle" ? (
          <p
            className={`mt-6 text-sm/6 ${
              actionState.status === "success"
                ? "text-emerald-400"
                : "text-rose-400"
            }`}
          >
            {actionState.message}
          </p>
        ) : null}
      </form>

      <aside className="space-y-6">
        <div className="rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Contact
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-100">
            Direct message also works
          </h3>
          <p className="mt-4 text-sm/6 text-zinc-400">
            If you prefer not to use the form, send a message in Telegram or by
            email.
          </p>
          <div className="mt-6 space-y-3 text-sm/6 text-zinc-400">
            <p>
              Telegram:{" "}
              <a
                href={contactConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-100 hover:text-zinc-300"
              >
                {contactConfig.telegramHandle}
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${contactConfig.email}`}
                className="font-medium text-zinc-100 hover:text-zinc-300"
              >
                {contactConfig.email}
              </a>
            </p>
            <p>{contactConfig.responseTime}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
