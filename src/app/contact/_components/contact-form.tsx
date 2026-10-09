"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "next";
import Link from "next/link";
import type { FocusEvent, FormEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import { SelectField, TextareaField, TextField } from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { H5, P } from "@/components/ui/typography";
import type { ContactPageContent } from "@/lib/cms/pages/contact";
import { ArrowUpRightIcon } from "@/lib/icons";
import { type ContactFormData, contactSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const FIELDS = ["name", "email", "phone", "topic", "message"] as const;

type FieldName = (typeof FIELDS)[number];
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function isFormControl(node: unknown): node is FormControl {
  return (
    node instanceof HTMLInputElement ||
    node instanceof HTMLSelectElement ||
    node instanceof HTMLTextAreaElement
  );
}

function controlOf(form: HTMLFormElement, name: FieldName): FormControl | null {
  const node = form.elements.namedItem(name);
  return isFormControl(node) ? node : null;
}

export function ContactForm({
  copy,
  email,
  topics,
}: {
  copy: ContactPageContent["form"];
  email: string;
  topics: readonly string[];
}) {
  const [attempted, setAttempted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // Hidden "website" field: people never see it, spam bots tend to fill it.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const topicOptions = useMemo(
    () => topics.map((topic) => ({ value: topic, label: topic })),
    [topics],
  );
  const { control, trigger, getFieldState, getValues, reset } =
    useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
      mode: "onTouched",
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      },
    });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setAttempted(true);

    const valid = await trigger();
    if (!valid) {
      const firstInvalid = FIELDS.find(
        (name) => getFieldState(name).error !== undefined,
      );
      if (firstInvalid !== undefined) {
        controlOf(form, firstInvalid)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSendError(null);
    setIsSuccess(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: getValues(),
          website: honeypotRef.current?.value ?? "",
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      if (!response.ok || !result?.ok) {
        setSendError(
          result?.message ?? "Your message could not be sent right now.",
        );
        return;
      }
      setIsSuccess(true);
      reset();
      setAttempted(false);
    } catch {
      setSendError(
        "Your message could not be sent. Check your internet connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (!attempted) return;
    const control = event.target;
    if (!isFormControl(control)) return;
    const name = FIELDS.find((field) => field === control.name);
    if (name === undefined) return;
    void trigger(name);
  }

  return (
    <div>
      {isSuccess && (
        <div
          className="mb-10 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-300"
          role="status"
        >
          <H5 as="h3" className="text-emerald-950 font-semibold mb-1">
            {copy.successTitle}
          </H5>
          <P className="text-emerald-800 text-sm sm:text-base">
            {copy.successText}
          </P>
        </div>
      )}

      <form
        className="grid gap-6 sm:grid-cols-2"
        noValidate
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] size-px overflow-hidden"
        >
          <label>
            Website
            <input
              autoComplete="off"
              name="website"
              ref={honeypotRef}
              tabIndex={-1}
              type="text"
            />
          </label>
        </div>
        <TextField
          autoComplete="name"
          className="font-body text-base text-ink placeholder:text-ink-muted"
          control={control}
          label={copy.nameLabel}
          name="name"
          required
          type="text"
        />

        <TextField
          autoComplete="email"
          className="font-body text-base text-ink placeholder:text-ink-muted"
          control={control}
          label={copy.emailLabel}
          name="email"
          required
          type="email"
        />

        <TextField
          autoComplete="tel"
          className="font-body text-base text-ink placeholder:text-ink-muted"
          control={control}
          label={copy.phoneLabel}
          name="phone"
          required
          type="tel"
        />

        <SelectField
          className="font-body text-base text-ink"
          control={control}
          label={copy.topicLabel}
          name="topic"
          options={topicOptions}
          placeholder={copy.topicPlaceholder}
          required
        />

        <div className="sm:col-span-2">
          <TextareaField
            className="font-body text-base text-ink resize-y placeholder:text-ink-muted"
            control={control}
            label={copy.messageLabel}
            maxLength={2000}
            name="message"
            required
            rows={6}
          />
        </div>

        {sendError === null ? null : (
          <p
            className="font-body text-sm text-accent sm:col-span-2"
            role="alert"
          >
            {sendError} {copy.directPrompt}{" "}
            <Link
              className="underline underline-offset-4"
              href={`mailto:${email}` as Route}
            >
              {email}
            </Link>
          </p>
        )}

        <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending message..." : copy.submitLabel}
            <Icon icon={ArrowUpRightIcon} />
          </button>
          <p className="font-body text-sm text-ink-muted">
            {copy.directPrompt}{" "}
            <Link
              className="text-accent underline underline-offset-4 transition-colors hover:text-ink"
              href={`mailto:${email}` as Route}
            >
              {email}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
