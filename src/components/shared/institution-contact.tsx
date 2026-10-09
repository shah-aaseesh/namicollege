import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { getSitePage } from "@/lib/cms/pages/site";
import type { Campus, EntityRole } from "@/lib/content";
import { content } from "@/lib/content";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsappIcon,
  YouTubeIcon,
} from "@/lib/icons";

const MAP_ORIGIN = "https://www.google.com/maps";

function mapSrc(campus: Campus): string {
  if (campus.embedMapUrl) {
    return campus.embedMapUrl;
  }
  const params = new URLSearchParams({
    q: `${campus.locality}, ${campus.city}, Nepal`,
    output: "embed",
    hl: "en",
    z: "15",
  });
  return `${MAP_ORIGIN}?${params.toString()}`;
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsappIcon,
} as const;

export async function InstitutionContact({
  id = "contact",
  institution: role,
}: {
  readonly id?: string;
  readonly institution: EntityRole;
}) {
  const [profile, { contactBlock: labels }] = await Promise.all([
    content.getInstitution(),
    getSitePage(),
  ]);
  const entity = profile.entities[role];
  const entityContact = profile.contact.byEntity[role];

  const campus =
    role === "institute"
      ? (profile.campuses.find((c) => c.slug === "new-baneshwor") ??
        profile.campuses[0])
      : (profile.campuses.find((c) => c.slug === "gokarneshwor") ??
        profile.campuses[0]);

  if (!campus) return null;

  const entityFacebook = entityContact.facebook;
  const socials = (profile.contact.socialProfiles ?? [])
    .map((social) => {
      if (social.platform === "facebook" && entityFacebook) {
        return { ...social, href: entityFacebook };
      }
      return social;
    })
    .slice(0, 4);

  return (
    <section
      className="gutter-x section-y-compact border-t border-border/40"
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader eyebrow={labels.label} title={labels.title} />

        <Reveal
          className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch"
          y={16}
        >
          {/* Left: Contact Info Card */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between rounded-2xl border border-border/80 bg-surface-raised/60 p-5 sm:p-6 lg:p-7 shadow-xs space-y-5">
            <div className="space-y-4 sm:space-y-4.5">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-4.5 sm:size-5" icon={LocationIcon} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {labels.addressLabel}
                  </span>
                  <p className="mt-0.5 font-medium text-ink text-sm sm:text-base leading-snug">
                    {campus.streetAddress ? `${campus.streetAddress}, ` : ""}
                    {campus.locality}, {campus.city}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-4.5 sm:size-5" icon={PhoneIcon} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {labels.phoneLabel}
                  </span>
                  <Link
                    className="mt-0.5 block font-medium text-ink hover:text-accent transition-colors text-sm sm:text-base leading-snug"
                    href={
                      `tel:${(entityContact.phone.split(/[/,]/)[0] ?? "").replace(/[^+\d]/g, "")}` as Route
                    }
                  >
                    {entityContact.phone}
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-4.5 sm:size-5" icon={MailIcon} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {labels.emailLabel}
                  </span>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-ink text-sm sm:text-base leading-snug">
                    <Link
                      className="hover:text-accent transition-colors"
                      href={`mailto:${entityContact.email}` as Route}
                    >
                      {entityContact.email}
                    </Link>
                    {entityContact.admissionsEmail && (
                      <>
                        <span className="text-ink-muted/50 hidden sm:inline">
                          •
                        </span>
                        <Link
                          className="hover:text-accent transition-colors"
                          href={
                            `mailto:${entityContact.admissionsEmail}` as Route
                          }
                        >
                          {entityContact.admissionsEmail}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-ink-muted">
                  {labels.followLabel} {entity.name}
                </span>
                <ul className="flex items-center gap-2">
                  {socials.map((social) => {
                    const IconComponent =
                      SOCIAL_ICONS[
                        social.platform as keyof typeof SOCIAL_ICONS
                      ] ?? GlobeIcon;

                    return (
                      <li key={social.platform}>
                        <Link
                          aria-label={`${entity.name} on ${social.label}`}
                          className="flex size-8.5 sm:size-9 items-center justify-center rounded-full border border-border/80 bg-surface text-ink-muted transition-all hover:scale-105 hover:border-ink hover:bg-ink hover:text-white"
                          href={social.href as Route}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon className="size-4" icon={IconComponent} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Map Container */}
          <div className="lg:col-span-6 xl:col-span-7 overflow-hidden rounded-2xl border border-border/80 bg-neutral-100 shadow-xs min-h-[260px] sm:min-h-[300px] h-full flex">
            <iframe
              className="w-full h-full min-h-[260px] sm:min-h-[300px] block border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc(campus)}
              title={`${entity.name} location map`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
