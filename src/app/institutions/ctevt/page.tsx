import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Display, Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { withEmphasis } from "@/lib/cms/emphasis";
import { getCtevtPage } from "@/lib/cms/pages/ctevt";
import { type CmsLink, hasImage, isExternalHref } from "@/lib/cms/types";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCtevtPage();

  return createMetadata({
    path: "/institutions/ctevt",
    title: seo.title,
    description: seo.description,
  });
}

/** A CMS button: site pages use client-side navigation, everything else a plain link. */
function ButtonLink({
  link,
  className,
  newTab = false,
  children,
}: {
  readonly link: CmsLink;
  readonly className: string;
  readonly newTab?: boolean;
  readonly children: ReactNode;
}) {
  if (newTab || isExternalHref(link.href) || !link.href.startsWith("/")) {
    return (
      <a
        className={className}
        href={link.href}
        {...(newTab || isExternalHref(link.href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={link.href as Route}>
      {children}
    </Link>
  );
}

function hasButton(link: CmsLink): boolean {
  return link.label.trim() !== "" && link.href.trim() !== "";
}

export default async function CtevtAffiliationPage() {
  const {
    hero,
    overview,
    programmes,
    about,
    approval,
    standards,
    skills,
    recognition,
    commitment,
  } = await getCtevtPage();

  return (
    <div className="min-h-screen bg-surface">
      {/* Masthead Header */}
      <section className="gutter-x section-y-masthead border-b border-border/80 bg-surface-raised relative overflow-hidden">
        <div className="mx-auto max-w-page">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <Eyebrow>{hero.label}</Eyebrow>
              <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
                {hero.title}
              </Display>
              {hero.subtitle.trim() === "" ? null : (
                <H3
                  as="p"
                  className="mt-2 text-lg sm:text-xl font-medium text-accent"
                >
                  {hero.subtitle}
                </H3>
              )}
              {hero.intro.trim() === "" ? null : (
                <p className="mt-4 font-body text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl text-justify [text-align-last:left]">
                  {withEmphasis(hero.intro, "text-ink font-semibold")}
                </p>
              )}
            </div>

            {hasImage(hero.logo) ? (
              <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-surface border border-border shadow-xs">
                <Image
                  alt={hero.logo.alt}
                  className="h-24 w-auto object-contain"
                  height={96}
                  src={hero.logo.src}
                  width={120}
                />
                <span className="mt-3 text-xs font-semibold text-accent uppercase tracking-wider text-center">
                  {hero.logoCaption}
                </span>
                <span className="text-[11px] text-ink-muted font-medium text-center">
                  {hero.logoSubcaption}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="gutter-x section-y space-y-16 lg:space-y-20">
        <div className="mx-auto max-w-page space-y-16 lg:space-y-20">
          {/* Overview Statement */}
          {overview.text.trim() === "" ? null : (
            <Reveal>
              <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6 sm:p-8 lg:p-10">
                <P className="text-base sm:text-lg font-medium text-ink leading-relaxed text-justify [text-align-last:left]">
                  {withEmphasis(overview.text, "text-accent font-semibold")}
                </P>
              </div>
            </Reveal>
          )}

          {/* CTEVT-Approved Training Programs Table */}
          {programmes.items.length === 0 ? null : (
            <section className="space-y-6">
              <Reveal className="flex flex-col gap-3">
                <Eyebrow>{programmes.label}</Eyebrow>
                <H2 className="text-2xl sm:text-3xl font-bold text-ink">
                  {programmes.title}
                </H2>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  {programmes.description}
                </p>
              </Reveal>

              <Reveal className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-body">
                    <thead>
                      <tr className="border-b border-border bg-surface-raised">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink">
                          {programmes.programmeHeading}
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink hidden sm:table-cell">
                          {programmes.sectorHeading}
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-accent text-right">
                          {programmes.durationHeading}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {programmes.items.map((program, idx) => (
                        <tr
                          // biome-ignore lint/suspicious/noArrayIndexKey: programmes are an ordered CMS list
                          key={idx}
                          className="transition-colors hover:bg-surface-raised/40"
                        >
                          <td className="px-6 py-5">
                            <p className="text-base font-semibold text-ink">
                              {program.title}
                            </p>
                            <p className="text-xs text-ink-muted mt-1 sm:hidden">
                              {program.sector}
                            </p>
                          </td>
                          <td className="px-6 py-5 text-sm text-ink-muted hidden sm:table-cell">
                            {program.sector}
                          </td>
                          <td className="px-6 py-5 text-right font-semibold text-sm sm:text-base text-accent">
                            {program.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </section>
          )}

          {/* Grid: About CTEVT & Institutional Approval Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* About CTEVT */}
            <Reveal className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="space-y-4">
                <Eyebrow>{about.label}</Eyebrow>
                <H3 className="text-xl sm:text-2xl font-bold text-ink">
                  {about.title}
                </H3>
                {about.paragraphs.map((paragraph, idx) => (
                  <P
                    // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are an ordered CMS list
                    key={idx}
                    className="text-justify [text-align-last:left] text-ink/85 leading-relaxed text-sm sm:text-base"
                  >
                    {withEmphasis(paragraph, "text-ink font-semibold")}
                  </P>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-xs text-ink-muted">
                <span>{about.footerLeft}</span>
                <span className="font-semibold text-accent">
                  {about.footerRight}
                </span>
              </div>
            </Reveal>

            {/* NAMI's CTEVT Approval */}
            <Reveal className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="space-y-4">
                <Eyebrow>{approval.label}</Eyebrow>
                <H3 className="text-xl sm:text-2xl font-bold text-ink">
                  {approval.title}
                </H3>
                <dl className="space-y-3 font-body text-xs sm:text-sm">
                  {approval.items.map((info, idx) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: details are an ordered CMS list
                      key={idx}
                      className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-border/40 gap-1"
                    >
                      <dt className="font-semibold text-ink shrink-0 sm:w-1/3">
                        {info.label}:
                      </dt>
                      <dd className="text-ink-muted sm:w-2/3 sm:text-right">
                        {info.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                {approval.note.trim() === "" ? null : (
                  <p className="font-body text-xs text-ink-muted italic pt-2">
                    {approval.note}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs font-medium text-ink-muted">
                  {approval.footerLeft}
                </span>
                {approval.badge.trim() === "" ? null : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
                    {approval.badge}
                  </span>
                )}
              </div>
            </Reveal>
          </div>

          {/* Training Standards */}
          {standards.items.length === 0 ? null : (
            <section className="space-y-6">
              <Reveal className="flex flex-col gap-3">
                <Eyebrow>{standards.label}</Eyebrow>
                <H2 className="text-2xl sm:text-3xl font-bold text-ink">
                  {standards.title}
                </H2>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  {standards.description}
                </p>
              </Reveal>

              <Reveal
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
                stagger={0.04}
              >
                {standards.items.map((standard, idx) => (
                  <RevealItem
                    // biome-ignore lint/suspicious/noArrayIndexKey: standards are an ordered CMS list
                    key={idx}
                    className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border border-border/70 bg-surface shadow-2xs"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xs mt-0.5">
                      ✓
                    </span>
                    <p className="font-body text-xs sm:text-sm text-ink leading-relaxed font-medium">
                      {standard}
                    </p>
                  </RevealItem>
                ))}
              </Reveal>
            </section>
          )}

          {/* Skills for the Hospitality Industry */}
          <section className="rounded-3xl border border-border bg-surface-raised p-6 sm:p-8 lg:p-12 shadow-xs">
            <Reveal className="space-y-6">
              <div className="space-y-3">
                <Eyebrow>{skills.label}</Eyebrow>
                <H2 className="text-2xl sm:text-3xl font-bold text-ink">
                  {skills.title}
                </H2>
              </div>

              {skills.paragraphs.map((paragraph, idx) => (
                <P
                  // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are an ordered CMS list
                  key={idx}
                  className="text-justify [text-align-last:left] text-ink/90 leading-relaxed text-sm sm:text-base"
                >
                  {withEmphasis(paragraph, "text-ink font-semibold")}
                </P>
              ))}

              {skills.tags.length === 0 ? null : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4">
                  {skills.tags.map((item, idx) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: tags are an ordered CMS list
                      key={idx}
                      className="p-3 rounded-xl border border-border bg-surface text-center"
                    >
                      <p className="font-body text-xs font-semibold text-accent">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </section>

          {/* Official Recognition Card */}
          <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
            <Reveal className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <Eyebrow>{recognition.label}</Eyebrow>
                <H3 className="text-xl sm:text-2xl font-bold text-ink">
                  {recognition.title}
                </H3>
                {recognition.subtitle.trim() === "" ? null : (
                  <p className="font-body text-sm font-semibold text-accent">
                    {recognition.subtitle}
                  </p>
                )}
                <p className="font-body text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {recognition.description}
                </p>

                {recognition.facts.length === 0 ? null : (
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-ink">
                    {recognition.facts.map((fact, idx) => (
                      <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: facts are an ordered CMS list
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border"
                      >
                        {fact.label}: <strong>{fact.value}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                {hasButton(recognition.letterButton) ? (
                  <ButtonLink
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-all duration-200 shadow-sm text-center"
                    link={recognition.letterButton}
                    newTab
                  >
                    <span>{recognition.letterButton.label}</span>
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </ButtonLink>
                ) : null}
                {hasButton(recognition.contactButton) ? (
                  <ButtonLink
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-surface border border-border text-ink hover:bg-surface-raised transition-all duration-200 text-center"
                    link={recognition.contactButton}
                  >
                    <span>{recognition.contactButton.label}</span>
                  </ButtonLink>
                ) : null}
              </div>
            </Reveal>
          </section>

          {/* Our Commitment & Creed */}
          {commitment.title.trim() === "" ? null : (
            <Reveal>
              <div className="rounded-3xl border border-accent/20 bg-accent text-white p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden shadow-md">
                <div className="max-w-3xl mx-auto space-y-4 relative z-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                    {commitment.label}
                  </p>
                  <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {commitment.title}
                  </H2>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body max-w-2xl mx-auto">
                    {commitment.description}
                  </p>
                  {hasButton(commitment.button) ? (
                    <div className="pt-4">
                      <ButtonLink
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-accent hover:bg-white/90 transition-all duration-200 shadow-sm"
                        link={commitment.button}
                      >
                        <span>{commitment.button.label}</span>
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
