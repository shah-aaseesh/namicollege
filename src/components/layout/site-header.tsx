import { getSitePage } from "@/lib/cms/pages/site";
import { hasImage } from "@/lib/cms/types";
import { content } from "@/lib/content";
import { SiteHeaderShell } from "./site-header-shell";
import type { SiteMetaLink } from "./site-nav-panel";
import type { SiteNavItem } from "./site-nav-sections";

function channel(value: string | null, scheme: "mailto:"): SiteMetaLink | null {
  if (value === null) return null;
  return {
    label: value,
    href: `${scheme}${value.replace(/\s+/g, "")}`,
    external: false,
  };
}

export async function SiteHeader() {
  const [institution, site] = await Promise.all([
    content.getInstitution(),
    getSitePage(),
  ]);
  const { menu } = site;
  const group = institution.entities.institute;

  const items: SiteNavItem[] = menu.items.map((item) => ({
    label: item.label,
    href: item.href,
    ...(item.descriptor.trim() === "" ? {} : { descriptor: item.descriptor }),
    ...(item.children.length === 0
      ? {}
      : {
          children: item.children.map((child) => ({
            label: child.label,
            href: child.href,
          })),
        }),
  }));

  const places = institution.campuses.map(
    (campus) => `${campus.locality}, ${campus.city}`,
  );

  const links: SiteMetaLink[] = [
    channel(institution.contact.email, "mailto:"),
    ...institution.contact.websites.map((site) => ({
      label: site.label,
      href: site.destination === "legacy" ? null : site.href,
      external: site.destination === "external",
    })),
  ].filter((link) => link !== null) as SiteMetaLink[];

  return (
    <SiteHeaderShell
      items={items}
      links={links}
      panel={{
        text: menu.panelText,
        image: hasImage(menu.panelImage) ? menu.panelImage : null,
        button: menu.panelButton.label.trim() === "" ? null : menu.panelButton,
      }}
      places={places}
      siteName={group.name}
    />
  );
}
