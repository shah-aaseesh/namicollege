import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { getSitePage } from "@/lib/cms/pages/site";
import {
  content,
  type EntityContactChannel,
  type EntityRole,
  type SocialPlatform,
  type SocialProfile,
} from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { SiteFooterWordmark } from "./site-footer-wordmark";
import { SiteNewsletterBand } from "./site-newsletter-band";

// WhatsApp has its own floating button, so the footer leaves it out.
const FOOTER_SOCIAL_ICONS: Partial<
  Record<SocialPlatform, typeof FacebookIcon>
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
};

function telHref(num: string): Route {
  return `tel:${(num.split("/")[0] ?? "").replace(/[^+\d]/g, "")}` as Route;
}

function EntityContacts({
  ariaPrefix,
  channel,
  className,
  detailsClassName,
  href,
  name,
  socials,
  tagline,
}: {
  readonly ariaPrefix: string;
  readonly channel: EntityContactChannel;
  readonly className: string;
  readonly detailsClassName: string;
  readonly href: string;
  readonly name: string;
  readonly socials: readonly SocialProfile[];
  readonly tagline: string;
}) {
  // Each institution links to its own Facebook page when it has one.
  const links = socials.map((social) =>
    social.platform === "facebook" && channel.facebook
      ? { ...social, href: channel.facebook }
      : social,
  );
  const phones = channel.phone.split(", ").filter((num) => num !== "");

  return (
    <div className={className}>
      <Link href={href as Route} className="group block">
        <span className="block font-body text-sm font-semibold text-white transition-colors group-hover:text-white group-hover:underline underline-offset-4">
          {name}
        </span>
        <span className="mt-0.5 block font-body text-xs text-white/75">
          {tagline}
        </span>
      </Link>

      <div className={detailsClassName}>
        {phones.length === 0 ? null : (
          <div className="flex items-center gap-2 text-white/90">
            <Icon icon={PhoneIcon} className="size-3.5 shrink-0 text-white" />
            <div className="flex flex-col">
              {phones.map((num) => (
                <Link
                  key={num}
                  href={telHref(num)}
                  className="transition-colors hover:text-white"
                >
                  {num}
                </Link>
              ))}
            </div>
          </div>
        )}
        {channel.email === "" ? null : (
          <Link
            href={`mailto:${channel.email}` as Route}
            className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <Icon icon={MailIcon} className="size-3.5 shrink-0 text-white" />
            <span>{channel.email}</span>
          </Link>
        )}
        {channel.admissionsEmail && (
          <Link
            href={`mailto:${channel.admissionsEmail}` as Route}
            className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <Icon icon={MailIcon} className="size-3.5 shrink-0 text-white" />
            <span>{channel.admissionsEmail}</span>
          </Link>
        )}
      </div>

      {links.length === 0 ? null : (
        <div className="mt-3 flex items-center gap-2">
          {links.map((social) => {
            const icon = FOOTER_SOCIAL_ICONS[social.platform];
            if (!icon) return null;
            return (
              <Link
                key={social.platform}
                href={social.href as Route}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                aria-label={`${ariaPrefix} ${social.label}`}
              >
                <Icon icon={icon} className="size-3.5" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export async function SiteFooter() {
  const [institution, site] = await Promise.all([
    content.getInstitution(),
    getSitePage(),
  ]);
  const { contact, entities } = institution;
  const { footer } = site;
  const group = entities.institute;

  const socials = contact.socialProfiles.filter(
    (social) => FOOTER_SOCIAL_ICONS[social.platform] !== undefined,
  );

  const entityProps = (role: EntityRole, ariaPrefix: string) => ({
    ariaPrefix,
    channel: contact.byEntity[role],
    name: entities[role].name,
    socials,
  });

  return (
    <>
      <SiteNewsletterBand onFooterSeam standfirst={group.name} />

      <footer className="field-brand border-t border-primary-800/80">
        <div className="gutter-x py-10 sm:py-12 lg:py-14">
          <Reveal
            className="mx-auto grid max-w-page grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12"
            stagger={0.06}
            y={16}
          >
            <div className="flex flex-col lg:col-span-4">
              <div>
                <Link
                  className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2"
                  href="/"
                  aria-label="NAMI Home"
                >
                  <SiteFooterWordmark name={group.name} />
                </Link>

                {footer.about.trim() === "" ? null : (
                  <p className="mt-4 font-body text-xs font-normal leading-relaxed text-white/90 text-justify">
                    {footer.about}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Eyebrow
                as="h2"
                className="text-xs font-semibold uppercase tracking-widest text-white"
              >
                {footer.quickLinksTitle}
              </Eyebrow>
              <ul className="mt-4 space-y-2.5 font-body text-xs">
                {footer.quickLinks.map((item, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: links are an ordered CMS list
                  <li key={index}>
                    <Link
                      href={item.href as Route}
                      className="inline-block py-1 text-white/85 transition-colors hover:text-white hover:underline underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <Eyebrow
                as="h2"
                className="text-xs font-semibold uppercase tracking-widest text-white"
              >
                {footer.contactsTitle}
              </Eyebrow>

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <EntityContacts
                  {...entityProps("school", "NAMI School")}
                  className="border-t border-white/15 pt-4"
                  detailsClassName="mt-3 space-y-1.5 font-body text-xs"
                  href={institutionPath("school")}
                  tagline={footer.schoolTagline}
                />
                <EntityContacts
                  {...entityProps("college", "NAMI College")}
                  className="border-t border-white/15 pt-4"
                  detailsClassName="mt-3 space-y-1.5 font-body text-xs"
                  href={institutionPath("college")}
                  tagline={footer.collegeTagline}
                />
                <EntityContacts
                  {...entityProps("institute", "NAMI Institute")}
                  className="border-t border-white/15 pt-4 sm:col-span-2"
                  detailsClassName="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 font-body text-xs"
                  href={institutionPath("bachelors")}
                  tagline={footer.instituteTagline}
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div
          id="site-footer-bottom-bar"
          className="field-ink gutter-x py-4 sm:py-5 border-t border-neutral-800"
        >
          <div className="mx-auto max-w-page flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="font-body text-xs text-neutral-300">
              © {new Date().getFullYear()} {group.name}
              {group.establishedYear
                ? ` · Estd. ${group.establishedYear}`
                : null}
              . All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-body text-neutral-400 justify-center sm:justify-end">
              {footer.bottomLinks.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: links are an ordered CMS list
                <span className="contents" key={index}>
                  {index === 0 ? null : (
                    <span className="text-neutral-600">•</span>
                  )}
                  <Link
                    href={item.href as Route}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
