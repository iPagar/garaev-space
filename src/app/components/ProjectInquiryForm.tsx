"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useState } from "react";
import { submitProjectInquiry } from "../contact/actions";
import {
  contactConfig,
  extractProjectInquiryValues,
  getProjectInquiryFeedbackMessage,
  initialProjectInquiryActionState,
  initialProjectInquiryValues,
  inquiryLimits,
  type ProjectInquiryActionState,
  type ProjectInquiryErrors,
  type ProjectInquiryValues,
  validateProjectInquiry,
} from "../lib/contact";

export default function ProjectInquiryForm() {
  const [form, setForm] = useState<ProjectInquiryValues>(
    initialProjectInquiryValues,
  );
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [errors, setErrors] = useState<ProjectInquiryErrors>({});
  const [state, formAction, pending] = useActionState(
    async (
      previous: ProjectInquiryActionState,
      data: FormData,
    ): Promise<ProjectInquiryActionState> => {
      try {
        const result = await submitProjectInquiry(previous, data);
        setErrors(result.fieldErrors);
        setFeedbackVisible(true);
        if (result.status === "success") setForm(initialProjectInquiryValues);
        return result;
      } catch {
        setFeedbackVisible(true);
        return {
          status: "error",
          message: getProjectInquiryFeedbackMessage("deliveryUnavailable"),
          fieldErrors: {},
          values: extractProjectInquiryValues(data),
        };
      }
    },
    initialProjectInquiryActionState,
  );
  const formId = useId();

  useEffect(() => {
    if (state.status !== "success") return;
    const trackingWindow = window as typeof window & {
      dataLayer?: Array<Record<string, string>>;
    };
    trackingWindow.dataLayer ??= [];
    trackingWindow.dataLayer.push({
      event: "lead_form_submit",
      inquiry_type: "contact",
    });
  }, [state]);

  function updateField(key: keyof ProjectInquiryValues, value: string) {
    setFeedbackVisible(false);
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function fieldProps(key: keyof ProjectInquiryValues) {
    return {
      id: `${formId}-${key}`,
      name: key,
      value: form[key],
      maxLength: inquiryLimits[key],
      className:
        "block w-full border border-neutral-400 bg-white px-3.5 py-[13px] text-sm/[1.7] text-black placeholder:text-neutral-500 aria-invalid:border-2 aria-invalid:border-black [&:is(textarea)]:min-h-[155px] [&:is(textarea)]:resize-y focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? `${formId}-${key}-error` : undefined,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => updateField(key, event.target.value),
    };
  }

  function fieldError(key: keyof ProjectInquiryValues) {
    return errors[key] ? (
      <p
        id={`${formId}-${key}-error`}
        className="mt-2 text-xs/6 font-medium text-black"
      >
        {errors[key]}
      </p>
    ) : null;
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-busy={pending}
      className="border border-neutral-300 bg-white p-5 sm:p-8"
      onSubmit={(event) => {
        setFeedbackVisible(false);
        const validation = validateProjectInquiry(form);
        setErrors(validation);
        if (Object.keys(validation).length > 0) {
          event.preventDefault();
          const firstField = Object.keys(validation)[0];
          const element = event.currentTarget.elements.namedItem(firstField);
          if (element instanceof HTMLElement) element.focus();
        }
      }}
    >
      <fieldset disabled={pending}>
        <legend className="sr-only">Contact details</legend>
        <div className="grid grid-cols-1 gap-x-5 gap-y-[26px] min-[481px]:grid-cols-2">
          <div>
            <label
              className="mb-2.5 block text-xs font-semibold [&>span]:font-normal [&>span]:text-neutral-600"
              htmlFor={`${formId}-name`}
            >
              Name
            </label>
            <input
              {...fieldProps("name")}
              autoComplete="name"
              placeholder="Your name"
              required
            />
            {fieldError("name")}
          </div>
          <div>
            <label
              className="mb-2.5 block text-xs font-semibold [&>span]:font-normal [&>span]:text-neutral-600"
              htmlFor={`${formId}-email`}
            >
              Email
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              placeholder="you@organization.org"
              required
            />
            {fieldError("email")}
          </div>
          <div className="col-span-full">
            <label
              className="mb-2.5 block text-xs font-semibold [&>span]:font-normal [&>span]:text-neutral-600"
              htmlFor={`${formId}-organization`}
            >
              Organization <span>— optional</span>
            </label>
            <input
              {...fieldProps("organization")}
              autoComplete="organization"
              placeholder="Your organization or team"
            />
            {fieldError("organization")}
          </div>
          <div className="col-span-full">
            <label
              className="mb-2.5 block text-xs font-semibold [&>span]:font-normal [&>span]:text-neutral-600"
              htmlFor={`${formId}-message`}
            >
              Project details
            </label>
            <textarea
              {...fieldProps("message")}
              rows={6}
              placeholder="What are you working on, and how can I help?"
              required
            />
            {fieldError("message")}
          </div>
        </div>
      </fieldset>
      <p className="mt-3 text-[11px] text-neutral-600">
        Name, email, and project details are required.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="border border-black bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          disabled={pending}
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <Link
          href="/privacy"
          className="text-xs text-neutral-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          Privacy Policy
        </Link>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {feedbackVisible && !pending && state.status !== "idle" ? (
          <div className="mt-6 border border-black p-4 text-sm/7">
            <p>{state.message}</p>
            {state.status === "error" ? (
              <a
                href={`mailto:${contactConfig.email}`}
                className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                {contactConfig.email}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
