import { getSitePage } from "@/lib/cms/pages/site";
import { hasImage } from "@/lib/cms/types";
import { SiteCtaBand } from "./site-cta-band";

/** The newsletter band with its text from WordPress (Site Settings → Newsletter). */
export async function SiteNewsletterBand({
  standfirst,
  onFooterSeam,
  className,
}: {
  readonly standfirst: string;
  readonly onFooterSeam?: boolean;
  readonly className?: string;
}) {
  const { newsletter } = await getSitePage();

  return (
    <SiteCtaBand
      className={className}
      copy={{
        qr: hasImage(newsletter.qr) ? newsletter.qr : null,
        namePlaceholder: newsletter.namePlaceholder,
        emailPlaceholder: newsletter.emailPlaceholder,
        buttonLabel: newsletter.buttonLabel,
      }}
      heading={newsletter.heading}
      onFooterSeam={onFooterSeam}
      standfirst={standfirst}
    />
  );
}
