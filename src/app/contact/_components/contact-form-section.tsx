import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type { ContactPageContent } from "@/lib/cms/pages/contact";
import { content } from "@/lib/content";
import { ContactForm } from "./contact-form";

export async function ContactFormSection({
  copy,
}: {
  readonly copy: ContactPageContent["form"];
}) {
  const [institution, levels] = await Promise.all([
    content.getInstitution(),
    content.getAcademicLevels(),
  ]);

  const email = institution.contact.email;
  if (email === null) return null;

  const topics = [
    copy.topicGeneral,
    ...levels.map((level) => institution.entities[level.entity].name),
    copy.topicOther,
  ];

  return (
    <section className="gutter-x section-y" id="enquiry">
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.description.replaceAll("{email}", email)}
          eyebrow={copy.label}
          layout="split"
          title={copy.title}
        />

        <Reveal className="mt-12 lg:mt-16 max-w-3xl">
          <ContactForm copy={copy} email={email} topics={topics} />
        </Reveal>
      </div>
    </section>
  );
}
