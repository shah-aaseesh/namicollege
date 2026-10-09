import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { UpdateBoard } from "@/components/shared/update-board";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { P } from "@/components/ui/typography";
import type { HomeNotices } from "@/lib/cms/pages/home";
import type { CmsLink } from "@/lib/cms/types";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HOME_TEASER_COUNT = 3;

function UpdateCta({ className, link }: { className?: string; link: CmsLink }) {
  return (
    <Link
      className={cn(
        buttonVariants({ size: "lg", variant: "default" }),
        className,
      )}
      href={link.href as Route}
    >
      {link.label}
      <Icon icon={ArrowRightIcon} />
    </Link>
  );
}

export async function Updates({ notices }: { notices: HomeNotices }) {
  const allUpdates = await content.getUpdates();

  const updates = allUpdates
    .filter((item) => item.kind === "notice" || item.kind === "news")
    .slice(0, HOME_TEASER_COUNT);

  const hasButton =
    notices.button.label.trim() !== "" && notices.button.href.trim() !== "";
  const indexHref = hasButton ? (notices.button.href as Route) : null;

  return (
    <section className="gutter-x section-y-compact" id="updates">
      <div className="mx-auto max-w-page">
        <SectionHeader
          action={hasButton ? <UpdateCta link={notices.button} /> : null}
          eyebrow={notices.label || undefined}
          layout="action"
          title={notices.title || undefined}
        />

        {updates.length === 0 && notices.emptyState.trim() !== "" ? (
          <P className="mt-8 max-w-xl">{notices.emptyState}</P>
        ) : null}

        {updates.length === 0 ? null : (
          <Reveal className="mt-6 sm:mt-8" stagger={0.08}>
            <UpdateBoard indexHref={indexHref} items={updates} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
