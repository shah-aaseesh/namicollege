"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  type Control,
  type FieldPath,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  CheckboxGroupField,
  DateField,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { H2, H3, H5, H6, P } from "@/components/ui/typography";
import {
  findInquiryCourse,
  INQUIRY_COURSES,
  type InquiryCourse,
} from "@/lib/content/institutions";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  DownloadIcon,
  PlusIcon,
  TrashIcon,
} from "@/lib/icons";
import {
  type AdmissionsFormData,
  admissionsSchema,
  isSchoolOrCollegeProgram,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

type StepKey =
  | "course"
  | "student"
  | "parents"
  | "history"
  | "employment"
  | "additional";

type Step = {
  readonly key: StepKey;
  readonly label: string;
};

const PROGRAM_OPTIONS = INQUIRY_COURSES.map((course) => ({
  value: course.id,
  label: course.label,
}));

const HEAR_OPTIONS = [
  "Social Media",
  "Friends / Family",
  "School / College",
  "Advertisement",
  "Website",
  "Other",
] as const;

const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
] as const;

const RELATIONSHIP_OPTIONS = [
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Sibling", label: "Sibling" },
  { value: "Local Guardian", label: "Local Guardian" },
  { value: "Others", label: "Others" },
] as const;

const STEP_FIELDS: Record<StepKey, readonly FieldPath<AdmissionsFormData>[]> = {
  course: ["program", "proposedCourse"],
  student: [
    "firstName",
    "surname",
    "gender",
    "dob",
    "age",
    "nationality",
    "telephone",
    "email",
    "specialNeeds",
  ],
  parents: ["guardians"],
  history: ["qualifications", "pendingQualifications"],
  employment: ["employment"],
  additional: [
    "personalStatement",
    "howDidYouHear",
    "signature",
    "signatureDate",
  ],
};

function stepsForCourse(course: InquiryCourse | undefined): readonly Step[] {
  const steps: Step[] = [
    { key: "course", label: "Course Details" },
    { key: "student", label: "Student Details" },
    { key: "parents", label: "Guardian Details" },
  ];
  if (!course || course.asksEducationHistory) {
    steps.push({
      key: "history",
      label: course?.historyStepLabel ?? "Qualifications",
    });
  }
  if (!course || course.asksEmploymentHistory) {
    steps.push({ key: "employment", label: "Employment History" });
  }
  steps.push({
    key: "additional",
    label: "Additional Information & Signatures",
  });
  return steps;
}

function emptyGuardian() {
  return {
    id: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    relationship: "",
    otherRelationship: "",
    contact: "",
    email: "",
  };
}

function emptyEmployment() {
  return {
    id: crypto.randomUUID(),
    dates: "",
    employer: "",
    position: "",
    duties: "",
  };
}

function GuardianRow({
  control,
  index,
  showRemove,
  onRemove,
}: {
  control: Control<AdmissionsFormData>;
  index: number;
  showRemove: boolean;
  onRemove: () => void;
}) {
  const watchedRelationship =
    useWatch({
      control,
      name: `guardians.${index}.relationship`,
    }) ?? "";

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-border bg-muted/40 relative space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-ink-muted text-xs uppercase tracking-wider">
          Guardian {index + 1}
        </h4>
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove guardian ${index + 1}`}
            className="text-ink-muted hover:text-accent transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Icon icon={TrashIcon} className="size-4" />
            <span>Remove</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TextField
          control={control}
          name={`guardians.${index}.firstName`}
          label="First Name"
          autoComplete="given-name"
          required
        />
        <TextField
          control={control}
          name={`guardians.${index}.lastName`}
          label="Last Name"
          autoComplete="family-name"
          required
        />
        <SelectField
          control={control}
          name={`guardians.${index}.relationship`}
          label="Relationship Status"
          placeholder="Select relationship"
          options={RELATIONSHIP_OPTIONS}
          required
        />
        {watchedRelationship === "Others" && (
          <TextField
            control={control}
            name={`guardians.${index}.otherRelationship`}
            label="Specify Relationship"
            placeholder="e.g. Grandparent, Uncle, Aunt"
            required
          />
        )}
        <TextField
          control={control}
          name={`guardians.${index}.contact`}
          label="Contact Number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />
        <TextField
          control={control}
          name={`guardians.${index}.email`}
          label="Email Address"
          type="email"
          inputMode="email"
          autoComplete="email"
        />
      </div>
    </div>
  );
}

function QualificationRow({
  control,
  index,
  onRemove,
}: {
  control: Control<AdmissionsFormData>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-muted/50 relative">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove qualification ${index + 1}`}
        className="absolute top-4 right-4 text-ink-muted hover:text-accent transition-colors"
      >
        <Icon icon={TrashIcon} className="size-4" />
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
        <TextField
          control={control}
          name={`qualifications.${index}.place`}
          label="Previous Institution"
          required
        />
        <TextField
          control={control}
          name={`qualifications.${index}.awards`}
          label="Awards / Grades"
          placeholder="e.g. GPA 3.8 / A+"
        />
        <TextField
          control={control}
          name={`qualifications.${index}.graduationYear`}
          label="Graduation Year"
          placeholder="e.g. 2024"
        />
      </div>
    </div>
  );
}

function EmploymentRow({
  control,
  index,
  showRemove,
  onRemove,
}: {
  control: Control<AdmissionsFormData>;
  index: number;
  showRemove: boolean;
  onRemove: () => void;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-muted/50 relative">
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove employment entry ${index + 1}`}
          className="absolute top-4 right-4 text-ink-muted hover:text-accent transition-colors"
        >
          <Icon icon={TrashIcon} className="size-4" />
        </button>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
        <TextField
          control={control}
          name={`employment.${index}.employer`}
          label="Employer Name & Address"
        />
        <TextField
          control={control}
          name={`employment.${index}.dates`}
          label="Dates (From - To)"
          placeholder="e.g. Jan 2021 - Present"
        />
        <TextField
          control={control}
          name={`employment.${index}.position`}
          label="Position Held"
        />
        <div className="lg:col-span-2">
          <TextareaField
            control={control}
            name={`employment.${index}.duties`}
            label="Brief Description of Duties"
          />
        </div>
      </div>
    </div>
  );
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  // Hidden "website" field: people never see it, spam bots tend to fill it.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  const [focusStepKey, setFocusStepKey] = useState<StepKey | null>(null);

  const { control, setValue, getValues, trigger, getFieldState, formState } =
    useForm<AdmissionsFormData>({
      resolver: zodResolver(admissionsSchema),
      mode: "onTouched",
      defaultValues: {
        program: "",
        proposedCourse: "",
        surname: "",
        firstName: "",
        gender: "",
        dob: null,
        age: "",
        nationality: "",
        telephone: "",
        email: "",
        specialNeeds: false,
        guardians: [emptyGuardian()],
        qualifications: [
          {
            id: "1",
            place: "",
            awards: "",
            graduationYear: "",
          },
        ],
        pendingQualifications: "",
        employment: [
          { id: "1", dates: "", employer: "", position: "", duties: "" },
        ],
        personalStatement: "",
        howDidYouHear: [],
        signature: "",
        signatureDate: new Date().toISOString().split("T")[0],
      },
    });

  const {
    fields: guardianFields,
    append: appendGuardian,
    remove: removeGuardian,
  } = useFieldArray({
    control,
    name: "guardians",
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
    replace: replaceEmployment,
  } = useFieldArray({
    control,
    name: "employment",
  });

  const selectedProgram = useWatch({ control, name: "program" }) ?? "";
  const isSchoolOrCollege = isSchoolOrCollegeProgram(selectedProgram);
  const course = findInquiryCourse(selectedProgram);
  const steps = stepsForCourse(course);
  const stepIndex = Math.min(currentStep, steps.length - 1);
  const activeStep = steps[stepIndex];
  const activeStepKey = activeStep?.key;

  const stepHasError = (key: StepKey) =>
    STEP_FIELDS[key].some(
      (name) => getFieldState(name, formState).error !== undefined,
    );

  const searchParams = useSearchParams();

  useEffect(() => {
    const programParam = searchParams.get("program");
    const courseParam =
      searchParams.get("course") || searchParams.get("proposedCourse");

    if (programParam) {
      let mappedProgram = programParam;
      if (programParam === "school") mappedProgram = "school-plus-two";
      if (programParam === "college" || programParam === "a-levels")
        mappedProgram = "a-level";
      if (programParam === "bachelors") mappedProgram = "degree";

      const matched = findInquiryCourse(mappedProgram);
      if (matched) {
        setValue("program", matched.id);
        if (courseParam) {
          const decoded = decodeURIComponent(courseParam);
          const foundCourse = matched.proposedCourses?.find(
            (c) =>
              c.value.toLowerCase() === decoded.toLowerCase() ||
              c.label.toLowerCase().includes(decoded.toLowerCase()),
          );
          if (foundCourse) {
            setValue("proposedCourse", foundCourse.value);
          } else {
            setValue("proposedCourse", decoded);
          }
        }
      }
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (!isSubmitted) return;
    confirmationRef.current?.focus();
  }, [isSubmitted]);

  useEffect(() => {
    if (focusStepKey === null || activeStepKey !== focusStepKey) return;
    setFocusStepKey(null);
    void trigger(STEP_FIELDS[focusStepKey], { shouldFocus: true });
  }, [focusStepKey, activeStepKey, trigger]);

  const addQualification = () => {
    appendQualification({
      id: crypto.randomUUID(),
      place: "",
      awards: "",
      graduationYear: "",
    });
  };

  const addEmployment = () => {
    appendEmployment(emptyEmployment());
  };

  const selectCourse = (value: string) => {
    setValue("proposedCourse", "");
    const next = value ? findInquiryCourse(value) : undefined;
    if (!next?.asksPendingQualifications) setValue("pendingQualifications", "");
    if (!next?.asksEmploymentHistory) replaceEmployment([emptyEmployment()]);
  };

  const goToStep = (step: number) => {
    if (step < 0 || step >= steps.length || step === stepIndex) return;

    gsap.to(formRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setCurrentStep(step);
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      },
    });
  };

  const goToNextStep = async () => {
    if (!activeStep) return;
    const passed = await trigger(STEP_FIELDS[activeStep.key], {
      shouldFocus: true,
    });
    if (!passed) return;
    goToStep(stepIndex + 1);
  };

  const submitForm = async () => {
    setSubmitError(null);

    const passed = await trigger(undefined, { shouldFocus: true });
    if (!passed) {
      const firstBrokenStep = steps.findIndex((step) =>
        STEP_FIELDS[step.key].some(
          (name) => getFieldState(name).error !== undefined,
        ),
      );
      setSubmitError(
        "Some answers still need attention. Check the highlighted steps, then submit again.",
      );
      const target = steps[firstBrokenStep];
      if (target && firstBrokenStep !== stepIndex) {
        setFocusStepKey(target.key);
        goToStep(firstBrokenStep);
      }
      return;
    }

    setPdfError(null);
    setSendFailed(false);
    setIsSending(true);
    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: admissionsSchema.parse(getValues()),
          website: honeypotRef.current?.value ?? "",
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        reference?: string | null;
        message?: string;
      } | null;
      if (!response.ok || !result?.ok) {
        setSendFailed(true);
        setSubmitError(
          result?.message ??
            "Your application could not be sent right now. Please try again, or download your PDF instead.",
        );
        return;
      }
      setReference(result.reference ?? null);
      setIsSubmitted(true);
    } catch {
      setSendFailed(true);
      setSubmitError(
        "Your application could not be sent. Check your internet connection and try again, or download your PDF instead.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const downloadPdf = async () => {
    setPdfError(null);
    setIsPreparingPdf(true);
    try {
      const { downloadInquiryPdf } = await import("@/lib/inquiry-pdf");
      await downloadInquiryPdf(admissionsSchema.parse(getValues()));
    } catch (error) {
      setPdfError(
        error instanceof Error
          ? error.message
          : "The PDF could not be created. Please try again.",
      );
    } finally {
      setIsPreparingPdf(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep?.key) {
      case "course": {
        const proposedCourseOptions = course?.proposedCourses ?? [];
        const showProposedCourse = Boolean(
          selectedProgram && proposedCourseOptions.length > 0,
        );

        return (
          <div className="space-y-6">
            <H6 as="h3" className="text-ink mb-6">
              Course Details
            </H6>
            <div className="space-y-4">
              <SelectField
                control={control}
                name="program"
                label="Program"
                options={PROGRAM_OPTIONS}
                placeholder="Select a program"
                required
                onValueChange={selectCourse}
              />
              {showProposedCourse && (
                <SelectField
                  control={control}
                  name="proposedCourse"
                  label={
                    course?.proposedCourseLabel ??
                    (course?.id === "school-primary"
                      ? "Grade"
                      : "Proposed Course")
                  }
                  options={proposedCourseOptions}
                  placeholder={
                    course?.id === "school-primary"
                      ? "Select a grade"
                      : "Select a course"
                  }
                  required
                />
              )}
            </div>
          </div>
        );
      }
      case "student":
        return (
          <div className="space-y-6">
            <H6 as="h3" className="text-ink mb-6">
              Student Details
            </H6>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TextField
                control={control}
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                required
              />
              <TextField
                control={control}
                name="surname"
                label="Surname"
                autoComplete="family-name"
                required
              />
              <SelectField
                control={control}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={GENDER_OPTIONS}
              />
              <DateField
                control={control}
                name="dob"
                label="Date of Birth"
                required
              />
              <TextField
                control={control}
                name="nationality"
                label="Nationality"
                autoComplete="country-name"
                required
              />
              {selectedProgram === "school-primary" ? (
                <TextField
                  control={control}
                  name="age"
                  label="Age"
                  type="number"
                  min={3}
                  max={18}
                  placeholder="e.g. 7"
                  required
                />
              ) : (
                <TextField
                  control={control}
                  name="telephone"
                  label="Telephone Number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              )}
              {selectedProgram !== "school-primary" && (
                <TextField
                  control={control}
                  name="email"
                  label="Email Address"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                />
              )}
              <CheckboxField
                control={control}
                name="specialNeeds"
                label="Do you have any special needs or medical conditions we should be aware of?"
                className="lg:col-span-2 mt-2"
              />
            </div>
          </div>
        );
      case "parents": {
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <H6 as="h3" className="text-ink">
                  Guardian Details
                </H6>
                <P className="text-sm text-ink-muted mt-1">
                  Add details for one or more parents / guardians.
                </P>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => appendGuardian(emptyGuardian())}
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add Guardian
              </Button>
            </div>

            <div className="space-y-6">
              {guardianFields.map((field, index) => (
                <GuardianRow
                  key={field.id}
                  control={control}
                  index={index}
                  showRemove={guardianFields.length > 1}
                  onRemove={() => removeGuardian(index)}
                />
              ))}
            </div>
          </div>
        );
      }
      case "history":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <H6 as="h3" className="text-ink">
                {course?.historyHeading ?? "Qualifications Achieved"}
              </H6>
              <Button
                type="button"
                size="sm"
                onClick={addQualification}
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add
              </Button>
            </div>

            <div className="space-y-6">
              {qualificationFields.length === 0 ? (
                <P className="text-sm text-ink-muted">
                  No entries added. If you have not studied anywhere before,
                  leave this empty and continue.
                </P>
              ) : (
                qualificationFields.map((field, index) => (
                  <QualificationRow
                    key={field.id}
                    control={control}
                    index={index}
                    onRemove={() => removeQualification(index)}
                  />
                ))
              )}
            </div>

            {(!course || course.asksPendingQualifications) && (
              <div className="space-y-4 pt-6 border-t border-border/50">
                <H3 className="text-lg font-display text-ink">
                  Qualifications Pending
                </H3>
                <TextareaField
                  control={control}
                  name="pendingQualifications"
                  label="Are you currently awaiting any results?"
                  placeholder="Please list any exams taken for which results are pending..."
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>
        );
      case "employment":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <H6 as="h3" className="text-ink">
                Employment History
              </H6>
              <Button
                type="button"
                size="sm"
                onClick={addEmployment}
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add
              </Button>
            </div>

            <div className="space-y-6">
              {employmentFields.map((field, index) => (
                <EmploymentRow
                  key={field.id}
                  control={control}
                  index={index}
                  showRemove={employmentFields.length > 1}
                  onRemove={() => removeEmployment(index)}
                />
              ))}
            </div>
          </div>
        );
      case "additional":
        return (
          <div className="space-y-8">
            <H6 as="h3" className="text-ink mb-6">
              Additional Information & Signatures
            </H6>

            <div className="space-y-4">
              <TextareaField
                control={control}
                name="personalStatement"
                label="Personal Statement"
                description="Please provide a brief statement supporting your application."
                className="min-h-[120px]"
              />

              <div className="pt-6">
                <CheckboxGroupField
                  control={control}
                  name="howDidYouHear"
                  legend="How did you hear of NAMI?"
                  options={HEAR_OPTIONS}
                />
              </div>

              <div className="space-y-4 pt-8 border-t border-border/50">
                <H3 className="text-lg font-display text-ink">Declaration</H3>
                <P className="text-sm text-ink-muted">
                  By signing below, I confirm that the information provided in
                  this application is accurate and complete to the best of my
                  knowledge.
                </P>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 items-start">
                  <TextField
                    control={control}
                    name="signature"
                    label={
                      isSchoolOrCollege
                        ? "Applicant / Guardian Signature (Type Full Name)"
                        : "Student Signature (Type Full Name)"
                    }
                    placeholder="Type full name"
                    autoComplete="name"
                    required
                  />
                  <div>
                    <span className="block text-sm font-medium text-ink mb-1.5">
                      Date
                    </span>
                    <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-border bg-muted/60 px-3.5 text-sm text-ink select-none">
                      <Icon
                        icon={CalendarIcon}
                        className="size-4 text-ink-muted shrink-0"
                      />
                      <span>
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl" ref={containerRef}>
      <div className="bg-surface border border-border rounded-2xl shadow-sm flex flex-col md:flex-row min-h-[600px]">
        <div className="bg-muted w-full md:w-64 lg:w-80 p-6 md:p-8 shrink-0 border-b md:border-b-0 md:border-r border-border rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
          <H6 as="h2" className="font-semibold text-ink mb-8">
            Inquiry Form
          </H6>
          <ul className="space-y-6">
            {steps.map((step, index) => {
              const isActive = !isSubmitted && index === stepIndex;
              const isPast = isSubmitted || index < stepIndex;
              const hasError = stepHasError(step.key);
              const canJump = !isSubmitted && (isPast || hasError);

              return (
                <li
                  key={step.key}
                  className="flex items-center gap-4 relative group min-h-9"
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-[15px] sm:left-[13px] top-8 w-[2px] h-8 -z-10 transition-colors duration-500",
                        isPast ? "bg-accent" : "bg-border",
                      )}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => canJump && goToStep(index)}
                    disabled={!canJump && !isActive}
                    aria-label={`Step ${index + 1}: ${step.label}`}
                    className={cn(
                      "flex items-center justify-center size-8 sm:size-7 rounded-full text-xs font-semibold shrink-0 transition-all duration-300",
                      isActive && "ring-4 ring-accent/20 scale-110",
                      canJump && "cursor-pointer",
                      hasError
                        ? "bg-surface text-accent border-2 border-accent"
                        : isActive
                          ? "bg-accent text-white"
                          : isPast
                            ? "bg-accent text-white hover:scale-110"
                            : "bg-surface text-ink-muted border border-border",
                    )}
                  >
                    {isPast && !hasError ? (
                      <Icon icon={CheckIcon} className="size-3" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => canJump && goToStep(index)}
                    disabled={!canJump && !isActive}
                    className={cn(
                      "text-sm font-medium text-left rounded-sm py-1 transition-colors duration-300",
                      canJump && "cursor-pointer",
                      hasError
                        ? "text-accent"
                        : isActive
                          ? "text-ink"
                          : isPast
                            ? "text-ink group-hover:text-accent"
                            : "text-ink-muted",
                    )}
                  >
                    {step.label}
                    {hasError && (
                      <span className="sr-only"> — needs attention</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <form
          noValidate
          onSubmit={(event) => event.preventDefault()}
          className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between"
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
          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
              <span className="flex items-center justify-center size-16 rounded-full bg-accent text-accent-ink">
                <Icon icon={CheckIcon} className="size-7" />
              </span>

              <div className="max-w-md space-y-3">
                <H5
                  as="h3"
                  ref={confirmationRef}
                  tabIndex={-1}
                  className="text-ink"
                >
                  Your application has been sent
                </H5>
                {reference ? (
                  <P className="font-semibold text-ink">
                    Reference: {reference}
                  </P>
                ) : null}
                <P className="text-ink-muted">
                  Thank you. The admissions office has received your application
                  and will contact you. Download a copy as a PDF for your
                  records and bring it with you.
                </P>
              </div>

              {pdfError && (
                <P role="alert" className="text-xs text-accent">
                  {pdfError}
                </P>
              )}

              <div className="flex flex-col md:flex-row items-center gap-3">
                <Button
                  type="button"
                  size="lg"
                  onClick={downloadPdf}
                  disabled={isPreparingPdf}
                  className="gap-2 px-6"
                >
                  {isPreparingPdf ? "Preparing PDF" : "Download PDF"}
                  <Icon icon={DownloadIcon} className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div ref={formRef} className="flex-1">
                {renderStepContent()}
              </div>

              <div className="mt-12 pt-6 border-t border-border flex flex-col gap-4">
                {submitError && (
                  <div className="flex flex-wrap items-center gap-3">
                    <P role="alert" className="text-xs text-accent">
                      {submitError}
                    </P>
                    {sendFailed ? (
                      <Button
                        type="button"
                        size="sm"
                        onClick={downloadPdf}
                        disabled={isPreparingPdf}
                        className="gap-2 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
                      >
                        {isPreparingPdf ? "Preparing PDF" : "Download PDF"}
                        <Icon icon={DownloadIcon} className="size-4" />
                      </Button>
                    ) : null}
                  </div>
                )}
                {pdfError && !isSubmitted ? (
                  <P role="alert" className="text-xs text-accent">
                    {pdfError}
                  </P>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Button
                    type="button"
                    size="lg"
                    variant="default"
                    onClick={() => goToStep(stepIndex - 1)}
                    disabled={stepIndex === 0}
                    className="px-6 border border-border"
                  >
                    Previous
                  </Button>

                  {stepIndex < steps.length - 1 ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={goToNextStep}
                      className="gap-2 px-6"
                    >
                      Next Step{" "}
                      <Icon icon={ArrowRightIcon} className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      onClick={submitForm}
                      disabled={isSending}
                      className="gap-2 px-6"
                    >
                      {isSending ? "Sending…" : "Submit application"}{" "}
                      <Icon icon={CheckIcon} className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export function AdmissionsFormSection() {
  return (
    <section className="section-y gutter-x" id="apply">
      <div className="mx-auto max-w-page">
        <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <H2 className="font-display mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Start Your Application
          </H2>
          <P className="text-ink-muted text-base sm:text-lg">
            Tell us about yourself in the form below and submit it. Your
            application goes straight to our admissions office, and you can
            download a copy as a PDF.
          </P>
        </div>

        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-ink-muted">
              Loading application form...
            </div>
          }
        >
          <MultiStepForm />
        </Suspense>
      </div>
    </section>
  );
}
