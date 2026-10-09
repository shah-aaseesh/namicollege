"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowReloadHorizontalIcon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import {
  CheckboxField,
  FileField,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { H3, H4, P } from "@/components/ui/typography";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
} from "@/lib/icons";
import { type AlumniStoryFormData, alumniStorySchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const WING_OPTIONS = [
  {
    value: "Undergraduate Program",
    label: "Undergraduate Program (BSc. / BBA)",
  },
  { value: "Graduate Program", label: "Graduate Program (MSc / MBA)" },
  { value: "Cambridge A Levels", label: "Cambridge A Levels (NAMI College)" },
  {
    value: "Secondary School",
    label: "Secondary School (NEB +2 / Science & Management)",
  },
  { value: "School", label: "NAMI International School" },
] as const;

const STEPS = [
  { id: 1, title: "Personal Details", short: "Contact" },
  { id: 2, title: "Academic Background", short: "Academics" },
  { id: 3, title: "Current Career", short: "Profession" },
  { id: 4, title: "Story & Reflection", short: "Story" },
] as const;

function _createAlumniMailto(
  email: string,
  values: AlumniStoryFormData,
): string {
  const subject = `Alumni Experience Submission — ${values.fullName} (${values.graduationYear})`;
  const body = [
    `ALUMNI EXPERIENCE & SPOTLIGHT SUBMISSION`,
    `========================================`,
    ``,
    `1. PERSONAL & CONTACT DETAILS`,
    `Full Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Phone/WhatsApp: ${values.phone || "Not provided"}`,
    `LinkedIn / Portfolio: ${values.linkedin || "Not provided"}`,
    ``,
    `2. NAMI ACADEMIC BACKGROUND`,
    `Institution / Wing: ${values.wing}`,
    `Programme / Course: ${values.program}`,
    `Graduation Year / Batch: ${values.graduationYear}`,
    ``,
    `3. CURRENT PROFESSIONAL PROFILE`,
    `Current Role / Designation: ${values.currentRole}`,
    `Current Organisation: ${values.currentOrg}`,
    `Location (City, Country): ${values.location}`,
    ``,
    `4. ALUMNI EXPERIENCE & STORY`,
    `Headline / Summary: "${values.storyHeadline}"`,
    ``,
    `Experience & Reflection:`,
    `${values.experience}`,
    ``,
    values.advice ? `Advice for Current Students:\n${values.advice}\n` : null,
    `Consent to publish: Yes`,
  ]
    .filter((line) => line !== null)
    .join("\r\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

/** The photo as base64 so it travels with the answers in one request. */
function photoPayload(
  file: File,
): Promise<{ name: string; type: string; data: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve({
        name: file.name,
        type: file.type,
        data: result.slice(result.indexOf(",") + 1),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function AlumniFormModal({
  email,
  isOpen,
  onClose,
}: {
  readonly email: string;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedData, setSubmittedData] =
    useState<AlumniStoryFormData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle escape key
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const { control, handleSubmit, trigger, reset } =
    useForm<AlumniStoryFormData>({
      resolver: zodResolver(alumniStorySchema),
      mode: "onTouched",
      defaultValues: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        photo: undefined,
        wing: "",
        program: "",
        graduationYear: "",
        currentRole: "",
        currentOrg: "",
        location: "",
        storyHeadline: "",
        experience: "",
        advice: "",
        consent: false,
      },
    });

  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // Hidden "website" field: people never see it, spam bots tend to fill it.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleNextStep = async () => {
    let isValidStep = false;

    if (currentStep === 1) {
      isValidStep = await trigger(["fullName", "email"]);
    } else if (currentStep === 2) {
      isValidStep = await trigger(["wing", "program", "graduationYear"]);
    } else if (currentStep === 3) {
      isValidStep = await trigger(["location", "currentRole", "currentOrg"]);
    }

    if (isValidStep) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: AlumniStoryFormData) => {
    setSubmitting(true);
    setSendError(null);
    try {
      const photo = data.photo instanceof File ? data.photo : null;
      if (photo !== null && photo.size > MAX_PHOTO_BYTES) {
        setSendError(
          "The photo is larger than 4 MB. Please choose a smaller one.",
        );
        return;
      }
      const { photo: _photo, ...answers } = data;
      const response = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: answers,
          photo: photo === null ? null : await photoPayload(photo),
          website: honeypotRef.current?.value ?? "",
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      if (!response.ok || !result?.ok) {
        setSendError(
          result?.message ??
            "Your story could not be sent right now. Please try again later.",
        );
        return;
      }
      setSubmittedData(data);
    } catch {
      setSendError(
        "Your story could not be sent. Check your internet connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setCurrentStep(1);
    setSubmittedData(null);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      aria-labelledby="share-experience-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="fixed inset-0 bg-transparent border-0 cursor-default"
        onClick={onClose}
        tabIndex={-1}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border border-border/80 bg-surface shadow-2xl my-auto overflow-hidden">
        {/* Top Dynamic Brand Accent Progress Bar */}
        <div className="h-1 w-full shrink-0 bg-neutral-100/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Modal Top Header */}
        <div className="p-5 sm:p-7 border-b border-border bg-neutral-50/50 relative shrink-0">
          {/* Close Button */}
          <button
            aria-label="Close dialog"
            className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 flex size-9 items-center justify-center rounded-full bg-white border border-border text-ink-muted hover:bg-neutral-100 hover:text-ink transition-colors cursor-pointer shadow-2xs"
            onClick={onClose}
            type="button"
          >
            <Icon className="size-4" icon={CloseIcon} />
          </button>

          <div className="pr-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 border border-primary-200/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-primary-700 uppercase mb-2">
              <span className="size-1.5 rounded-full bg-primary-700" />
              <span>SHARE YOUR STORY</span>
            </div>
            <h2
              className="font-display text-xl sm:text-2xl font-bold text-ink"
              id="share-experience-title"
            >
              Share Your NAMI Experience
            </h2>
          </div>

          {/* Stepper Progress Indicator */}
          {!submittedData && (
            <div className="mt-5">
              <div className="relative flex items-center justify-between">
                {/* Background Connecting Line */}
                <div className="absolute top-3.5 sm:top-4 inset-x-8 sm:inset-x-10 h-0.5 bg-neutral-200 -z-0" />
                {/* Active Connecting Progress */}
                <div
                  className="absolute top-3.5 sm:top-4 left-8 sm:left-10 h-0.5 bg-primary-700 -z-0 transition-all duration-500 ease-out"
                  style={{
                    width: `calc(${((currentStep - 1) / 3) * 100}% - ${((currentStep - 1) / 3) * (typeof window !== "undefined" && window.innerWidth < 640 ? 4 : 5)}rem)`,
                    maxWidth: "calc(100% - 4rem)",
                  }}
                />

                {STEPS.map((step) => {
                  const isDone = currentStep > step.id;
                  const isCurrent = currentStep === step.id;

                  return (
                    <div
                      className="relative z-10 flex flex-col items-center gap-1.5"
                      key={step.id}
                    >
                      <div
                        className={cn(
                          "flex size-7 sm:size-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 border-2",
                          isDone
                            ? "bg-primary-700 border-primary-700 text-white shadow-xs"
                            : isCurrent
                              ? "bg-primary-700 border-primary-700 text-white ring-4 ring-primary-100 shadow-sm"
                              : "bg-surface border-neutral-300 text-neutral-500",
                        )}
                      >
                        {isDone ? (
                          <Icon
                            className="size-3.5 text-white"
                            icon={CheckIcon}
                          />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs font-semibold text-center whitespace-nowrap transition-colors",
                          isCurrent
                            ? "text-primary-700 font-bold"
                            : isDone
                              ? "text-ink"
                              : "text-neutral-400",
                        )}
                      >
                        {step.short}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {submittedData ? (
            <div className="py-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xs">
                <Icon className="size-8 text-emerald-600" icon={Tick02Icon} />
              </div>
              <H3 className="font-display text-2xl text-ink sm:text-3xl">
                Thank You, {submittedData.fullName}!
              </H3>
              <P className="mx-auto mt-2.5 max-w-md text-ink-muted text-sm sm:text-base">
                Your alumni spotlight has been successfully submitted to the
                NAMI Alumni Relations team. We will review your story and
                feature it on the network.
              </P>

              <div className="my-6 max-w-md mx-auto p-5 rounded-2xl border border-border bg-neutral-50/80 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-ink-muted">Academic Wing:</span>
                  <span className="font-medium text-ink">
                    {submittedData.wing}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-ink-muted">Programme:</span>
                  <span className="font-medium text-ink">
                    {submittedData.program} ({submittedData.graduationYear})
                  </span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-ink-muted">Current Role:</span>
                  <span className="font-medium text-ink">
                    {submittedData.currentRole
                      ? `${submittedData.currentRole}${submittedData.currentOrg ? ` at ${submittedData.currentOrg}` : ""}`
                      : submittedData.currentOrg || "Alumnus"}
                  </span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  className={cn(
                    buttonVariants({ size: "lg", variant: "default" }),
                    "inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold shadow-md shadow-primary-700/20 cursor-pointer px-6",
                  )}
                  onClick={onClose}
                  type="button"
                >
                  <Icon className="size-4" icon={CheckIcon} />
                  <span>Done</span>
                </button>
                <button
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "inline-flex items-center gap-2 border-primary-200 text-ink hover:border-primary-400 hover:text-primary-700 cursor-pointer px-5",
                  )}
                  onClick={handleReset}
                  type="button"
                >
                  <Icon className="size-4" icon={ArrowReloadHorizontalIcon} />
                  <span>Submit Another Story</span>
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              {/* STEP 1: Personal & Contact */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-primary-100 pb-3">
                    <H4 className="text-base font-semibold text-ink">
                      Step 1: Personal & Contact Details
                    </H4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Let us know who you are and how we can stay in touch.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <TextField
                      control={control}
                      label="Full Name"
                      name="fullName"
                      placeholder="e.g. Aarav Sharma"
                      required
                    />
                    <TextField
                      control={control}
                      label="Email Address"
                      name="email"
                      placeholder="e.g. aarav@example.com"
                      required
                      type="email"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        control={control}
                        label="Phone / WhatsApp"
                        name="phone"
                        placeholder="e.g. +977 98XXXXXXXX"
                      />
                      <TextField
                        control={control}
                        label="LinkedIn Profile URL"
                        name="linkedin"
                        placeholder="e.g. linkedin.com/in/aarav"
                      />
                    </div>
                    <FileField
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      className="file:border-0 file:bg-primary-100 file:text-primary-800 file:text-xs file:font-semibold file:px-3 file:py-1 file:rounded-full file:mr-3 hover:file:bg-primary-200 cursor-pointer pt-2 text-xs sm:text-sm text-ink-muted"
                      control={control}
                      description="Upload a clear portrait or graduation photograph (JPG, PNG, WebP)"
                      label="Student / Alumnus Photograph (Optional)"
                      name="photo"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Background */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-primary-100 pb-3">
                    <H4 className="text-base font-semibold text-ink">
                      Step 2: Your NAMI Academic Journey
                    </H4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Tell us about your programme and graduating batch.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <SelectField
                      control={control}
                      label="Academic Wing"
                      name="wing"
                      options={WING_OPTIONS}
                      placeholder="Select your wing"
                      required
                    />
                    <TextField
                      control={control}
                      label="Programme / Degree"
                      name="program"
                      placeholder="e.g. BSc. (Hons) Computing or A-Levels"
                      required
                    />
                    <TextField
                      control={control}
                      label="Graduation Year / Batch"
                      name="graduationYear"
                      placeholder="e.g. 2021"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Current Profession */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-primary-100 pb-3">
                    <H4 className="text-base font-semibold text-ink">
                      Step 3: Current Professional Profile
                    </H4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Where are you working or studying right now?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <TextField
                      control={control}
                      label="Current Designation / Role (Optional)"
                      name="currentRole"
                      placeholder="e.g. Senior Software Engineer / Founder"
                    />
                    <TextField
                      control={control}
                      label="Company / Organization / University (Optional)"
                      name="currentOrg"
                      placeholder="e.g. Leapfrog Technology / Oxford University"
                    />
                    <TextField
                      control={control}
                      label="Current City & Country"
                      name="location"
                      placeholder="e.g. Kathmandu, Nepal / London, UK"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Story & Reflection */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-primary-100 pb-3">
                    <H4 className="text-base font-semibold text-ink">
                      Step 4: Your Story & Reflection
                    </H4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Share your fondest memories, key takeaways, and words of
                      inspiration.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <TextField
                      control={control}
                      label="Story Headline / Key Takeaway"
                      name="storyHeadline"
                      placeholder="e.g. How NAMI gave me the foundation to innovate"
                      required
                    />

                    <TextareaField
                      control={control}
                      description="Min 20 characters. Reflect on faculty, campus life, or memorable moments."
                      label="Your NAMI Experience & Journey"
                      name="experience"
                      placeholder="Tell us about your learning experience, faculty, campus life, and how NAMI prepared you for your career..."
                      required
                      rows={4}
                    />

                    <TextareaField
                      control={control}
                      description="Optional: Words of inspiration for upcoming students."
                      label="Advice for Current & Future Students"
                      name="advice"
                      placeholder="e.g. Focus on hands-on practical learning, collaborate actively..."
                      rows={2}
                    />

                    <div className="rounded-xl border border-primary-200/80 bg-primary-100/30 p-3.5 mt-2">
                      <CheckboxField
                        control={control}
                        description="I agree to share my story with NAMI and understand it may be featured in alumni spotlights, social media, or publications."
                        label="Consent to Share Story"
                        name="consent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {sendError === null ? null : (
                <p className="mt-5 text-xs sm:text-sm text-accent" role="alert">
                  {sendError} You can also email {email}.
                </p>
              )}

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

              {/* Modal Footer Controls */}
              <div className="mt-7 pt-4 border-t border-border flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    className={cn(
                      buttonVariants({ size: "default", variant: "outline" }),
                      "inline-flex items-center gap-1.5 border-neutral-300 text-ink hover:bg-neutral-100 cursor-pointer text-xs sm:text-sm",
                    )}
                    onClick={handlePrevStep}
                    type="button"
                  >
                    <Icon className="size-4" icon={ArrowLeftIcon} />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    className={cn(
                      buttonVariants({ size: "default", variant: "ghost" }),
                      "text-ink-muted hover:text-ink cursor-pointer text-xs sm:text-sm",
                    )}
                    onClick={onClose}
                    type="button"
                  >
                    <span>Cancel</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-muted font-medium hidden sm:inline">
                    Step {currentStep} of 4
                  </span>

                  {currentStep < 4 ? (
                    <button
                      className={cn(
                        buttonVariants({ size: "default", variant: "default" }),
                        "inline-flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold shadow-sm shadow-primary-700/20 cursor-pointer px-5 text-xs sm:text-sm",
                      )}
                      onClick={handleNextStep}
                      type="button"
                    >
                      <span>Continue</span>
                      <Icon className="size-4" icon={ArrowRightIcon} />
                    </button>
                  ) : (
                    <button
                      className={cn(
                        buttonVariants({ size: "default", variant: "default" }),
                        "inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold shadow-md shadow-primary-700/25 cursor-pointer px-6 text-xs sm:text-sm",
                      )}
                      disabled={submitting}
                      type="submit"
                    >
                      <Icon className="size-4" icon={SparklesIcon} />
                      <span>
                        {submitting ? "Submitting..." : "Submit Spotlight"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
