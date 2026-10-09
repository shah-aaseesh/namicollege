import type { Metadata } from "next";
import { getContactPage } from "@/lib/cms/pages/contact";
import { createMetadata } from "@/lib/seo";
import { CollegeLocations } from "./_components/college-locations";
import { ContactFormSection } from "./_components/contact-form-section";
import { ContactMasthead } from "./_components/contact-masthead";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPage();
  return createMetadata({
    path: "/contact",
    title: seo.title,
    description: seo.description,
  });
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <>
      <ContactMasthead copy={page.masthead} />
      <ContactFormSection copy={page.form} />
      <CollegeLocations copy={page.locations} />
    </>
  );
}
