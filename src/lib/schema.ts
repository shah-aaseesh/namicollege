import { z } from "zod";
import {
  INQUIRY_COURSES,
  isProposedCourseRequired,
} from "@/lib/content/institutions";

const PHONE_SHAPE = /^[\d\s+().-]{7,20}$/;
const PHONE_EXTENSION = /\s*(?:extension|extn|ext|x)\.?\s*\d{1,6}$/i;

const SCHOOL_OR_COLLEGE_PROGRAMS = new Set<string>([
  "school-primary",
  "school-plus-two",
  "a-level",
]);

export function isSchoolOrCollegeProgram(program: string): boolean {
  return SCHOOL_OR_COLLEGE_PROGRAMS.has(program.trim());
}

export const isGuardianLedProgram = isSchoolOrCollegeProgram;

function isPhone(value: string) {
  const base = value.replace(PHONE_EXTENSION, "");
  if (!PHONE_SHAPE.test(base)) return false;
  const digits = base.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

function endOfToday() {
  const day = new Date();
  day.setHours(23, 59, 59, 999);
  return day.getTime();
}

function isBlank(value: string | null): value is null | "" {
  return value === null || value === "";
}

function requiredText(message: string) {
  return z.string().trim().min(1, message);
}

function optionalEmail(message: string) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || z.email().safeParse(value).success, {
      error: message,
    });
}

function optionalPhone(message: string) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || isPhone(value), { error: message });
}

function requiredPhone(missing: string, invalid: string) {
  return optionalPhone(invalid).refine((value) => value !== "", {
    error: missing,
  });
}

function optionalPastDate(unreadable: string, future: string) {
  return z
    .string()
    .trim()
    .nullable()
    .refine(
      (value) => isBlank(value) || !Number.isNaN(new Date(value).getTime()),
      { error: unreadable },
    )
    .refine(
      (value) => {
        if (isBlank(value)) return true;
        const time = new Date(value).getTime();
        return Number.isNaN(time) || time <= endOfToday();
      },
      { error: future },
    );
}

function requiredPastDate(missing: string, unreadable: string, future: string) {
  return optionalPastDate(unreadable, future).refine(
    (value) => !isBlank(value),
    { error: missing },
  );
}

type ConditionalField =
  | "proposedCourse"
  | "age"
  | "telephone"
  | "email"
  | "guardians"
  | "signature"
  | "signatureDate";

export const guardianSchema = z
  .object({
    id: z.string(),
    firstName: requiredText("Enter guardian's first name"),
    lastName: requiredText("Enter guardian's last name"),
    relationship: requiredText("Select relationship to student"),
    otherRelationship: z.string().trim(),
    contact: requiredPhone(
      "Enter guardian's contact number",
      "Enter a valid contact number",
    ),
    email: optionalEmail("Enter a valid email address, or leave blank"),
  })
  .superRefine((val, ctx) => {
    if (val.relationship === "Others" && val.otherRelationship === "") {
      ctx.addIssue({
        code: "custom",
        path: ["otherRelationship"],
        message: "Please specify relationship",
      });
    }
  });

export type Guardian = z.infer<typeof guardianSchema>;

export const qualificationSchema = z.object({
  id: z.string(),
  place: z.string().trim(),
  awards: z.string().trim(),
  graduationYear: z.string().trim(),
});

export type Qualification = z.infer<typeof qualificationSchema>;

export const employmentSchema = z.object({
  id: z.string(),
  dates: z.string().trim(),
  employer: z.string().trim(),
  position: z.string().trim(),
  duties: z.string().trim(),
});

export type Employment = z.infer<typeof employmentSchema>;

export const admissionsSchema = z
  .object({
    program: requiredText("Choose the programme you are applying for"),
    proposedCourse: z.string().trim(),
    surname: requiredText("Enter your surname"),
    firstName: requiredText("Enter your first name"),
    gender: z.string().trim(),
    dob: requiredPastDate(
      "Choose your date of birth",
      "That date of birth could not be read — pick it from the calendar",
      "Your date of birth cannot be in the future",
    ),
    age: z.string().trim(),
    nationality: requiredText("Enter your nationality"),
    telephone: optionalPhone("Enter a valid telephone number"),
    email: optionalEmail("Enter a valid email address"),
    specialNeeds: z.boolean(),

    // Guardians list
    guardians: z
      .array(guardianSchema)
      .min(1, "At least one guardian is required"),

    qualifications: z.array(qualificationSchema),
    pendingQualifications: z.string().trim(),
    employment: z.array(employmentSchema),
    personalStatement: z.string().trim(),
    howDidYouHear: z.array(z.string()),
    signature: z.string().trim(),
    signatureDate: optionalPastDate(
      "That date could not be read — pick it from the calendar",
      "The date you signed cannot be in the future",
    ),
  })
  .superRefine((data, ctx) => {
    const missing = (path: ConditionalField, message: string) => {
      ctx.addIssue({ code: "custom", path: [path], message });
    };

    if (isProposedCourseRequired(data.program) && data.proposedCourse === "") {
      const isSchoolPrimary = data.program === "school-primary";
      missing(
        "proposedCourse",
        isSchoolPrimary
          ? "Select the grade you are applying for"
          : "Select your proposed course",
      );
    }

    if (data.program === "school-primary") {
      if (data.age === "") {
        missing("age", "Enter student's age");
      }
    } else {
      // Telephone and email are compulsory for +2, A-Levels, Bachelors, Masters, etc.
      if (data.telephone === "") {
        missing("telephone", "Enter a telephone number we can reach you on");
      }
      if (data.email === "") {
        missing("email", "Enter your email address");
      }
    }

    if (data.signature === "") {
      missing("signature", "Type your full name to sign the declaration");
    }

    if (data.signature !== "" && isBlank(data.signatureDate)) {
      data.signatureDate = new Date().toISOString().slice(0, 10);
    }
  });

export type AdmissionsFormData = z.infer<typeof admissionsSchema>;

export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name" })
    .min(1, "Please enter your name"),
  email: z
    .string({ error: "Please enter your email address" })
    .min(1, "Please enter your email address")
    .pipe(z.email({ error: "Please enter a valid email address" })),
  phone: requiredPhone(
    "Please enter your phone number",
    "Please enter a valid phone number",
  ),
  topic: z
    .string({ error: "Please choose a subject" })
    .min(1, "Please choose a subject"),
  message: z
    .string({ error: "Please enter your message" })
    .min(1, "Please enter your message")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// The "Share your story" form on the Alumni page. The photo is checked
// separately (it travels as base64 next to these answers).
export const alumniStorySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  photo: z.any().optional(),
  wing: z.string().min(1, "Please select your academic wing"),
  program: z.string().trim().min(2, "Please enter your programme name"),
  graduationYear: z.string().trim().min(4, "Please enter your graduation year"),
  currentRole: z.string().trim().optional(),
  currentOrg: z.string().trim().optional(),
  location: z
    .string()
    .trim()
    .min(2, "Please enter your current city and country"),
  storyHeadline: z
    .string()
    .trim()
    .min(5, "Please give a short headline or key takeaway"),
  experience: z
    .string()
    .trim()
    .min(
      20,
      "Please share a few sentences about your experience (min 20 characters)",
    ),
  advice: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to share your experience with NAMI",
  }),
});

export type AlumniStoryFormData = z.infer<typeof alumniStorySchema>;
