import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getSitePage } from "@/lib/cms/pages/site";
import { content, type EntityRole } from "@/lib/content";
import { ArrowRightIcon, DownloadIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface InstitutionEnrollCtaProps {
  readonly id?: string;
  readonly institution?: EntityRole;
  readonly eyebrow?: string;
  readonly heading?: string;
  readonly description?: string;
  readonly applyLabel?: string;
  readonly applyHref?: string;
  readonly brochureLabel?: string;
  readonly brochureHref?: string;
  readonly phone?: string;
  readonly className?: string;
}

// Each prop overrides the text edited in WordPress (Site Settings → Enroll Banner).
// The phone number comes from Site Settings → Institution Contacts.
export async function InstitutionEnrollCta({
  id = "enroll",
  institution = "school",
  eyebrow,
  heading,
  description,
  applyLabel,
  applyHref,
  brochureLabel,
  brochureHref,
  phone,
  className,
}: InstitutionEnrollCtaProps) {
  const [{ enroll }, profile] = await Promise.all([
    getSitePage(),
    content.getInstitution(),
  ]);
  const copy = {
    school: {
      heading: enroll.schoolHeading,
      description: enroll.schoolDescription,
      apply: enroll.schoolApply,
      brochure: enroll.schoolBrochure,
    },
    college: {
      heading: enroll.collegeHeading,
      description: enroll.collegeDescription,
      apply: enroll.collegeApply,
      brochure: enroll.collegeBrochure,
    },
    institute: {
      heading: enroll.instituteHeading,
      description: enroll.instituteDescription,
      apply: enroll.instituteApply,
      brochure: enroll.instituteBrochure,
    },
  }[institution];
  const effectiveHeading = heading ?? copy.heading;
  const effectiveDescription = description ?? copy.description;
  const effectiveApplyLabel = applyLabel ?? copy.apply.label;
  const effectiveApplyHref = applyHref ?? (copy.apply.href || "/admissions");
  const effectiveBrochureLabel = brochureLabel ?? copy.brochure.label;
  const effectiveBrochureHref =
    brochureHref ?? (copy.brochure.href || "/admissions");
  const effectivePhone = phone ?? profile.contact.byEntity[institution].phone;

  const isSchool = institution === "school";
  const isCollege = institution === "college";
  const isInstitute = institution === "institute";

  return (
    <section
      className={cn(
        isSchool && "bg-[#284540] text-white",
        isCollege && "field-brand",
        isInstitute && "field-ink",
        "gutter-x section-y",
        className,
      )}
      id={id}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal stagger={0.08}>
          {eyebrow && (
            <RevealItem>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-xs",
                  isSchool &&
                    "border border-[#F7CD00]/40 bg-[#F7CD00]/15 text-[#F7CD00]",
                  isCollege &&
                    "border border-[#FFAD00]/40 bg-white/15 text-[#FFAD00]",
                  isInstitute &&
                    "border border-[#BD1B21]/40 bg-[#BD1B21]/15 text-[#BD1B21]",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full animate-pulse",
                    isSchool && "bg-[#F7CD00]",
                    isCollege && "bg-[#FFAD00]",
                    isInstitute && "bg-[#BD1B21]",
                  )}
                />
                {eyebrow}
              </span>
            </RevealItem>
          )}

          <SplitText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-balance text-white tracking-tight"
          >
            {effectiveHeading}
          </SplitText>

          <RevealItem className="mt-3 sm:mt-4 mx-auto max-w-2xl">
            <p
              className={cn(
                "font-body text-sm sm:text-base leading-relaxed",
                isCollege ? "text-primary-100/90" : "text-white/85",
              )}
            >
              {effectiveDescription}
            </p>
          </RevealItem>

          {/* Action Button Row */}
          <RevealItem className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary Action: Apply Now */}
            {effectiveApplyLabel.trim() === "" ? null : (
              <Link
                href={effectiveApplyHref as Route}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto justify-center",
                  isCollege
                    ? "bg-white text-primary-800 hover:bg-neutral-100 font-semibold shadow-md"
                    : "bg-[#BD1B21] text-white hover:bg-[#9e1419] font-semibold shadow-lg border border-[#BD1B21]/60",
                )}
              >
                <span>{effectiveApplyLabel}</span>
                <Icon
                  icon={ArrowRightIcon}
                  className={cn(
                    "size-4",
                    isCollege ? "text-primary-800" : "text-white",
                  )}
                />
              </Link>
            )}

            {/* Brochure Action: Download Brochure */}
            {effectiveBrochureLabel.trim() === "" ? null : (
              <Link
                href={effectiveBrochureHref as Route}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto justify-center border-white/35 bg-white/10 text-white hover:bg-white/20 hover:border-white shadow-sm backdrop-blur-xs",
                )}
              >
                <Icon
                  icon={DownloadIcon}
                  className={cn(
                    "size-4",
                    isSchool && "text-[#F7CD00]",
                    !isSchool && "text-white/80",
                  )}
                />
                <span>{effectiveBrochureLabel}</span>
              </Link>
            )}
          </RevealItem>

          {/* Help Line / Contact Link */}
          {effectivePhone && (
            <RevealItem
              className={cn(
                "mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm",
                isSchool ? "text-white/85" : "text-primary-100",
              )}
            >
              <Icon
                icon={PhoneIcon}
                className={cn(
                  "size-3.5",
                  isSchool && "text-[#F7CD00]",
                  !isSchool && "text-primary-200",
                )}
              />
              <span>{enroll.helpText}</span>
              <Link
                href={
                  `tel:${(effectivePhone.split(/[/,]/)[0] ?? "").replace(/[^+\d]/g, "")}` as Route
                }
                className="font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
              >
                {effectivePhone}
              </Link>
            </RevealItem>
          )}
        </Reveal>
      </div>
    </section>
  );
}
