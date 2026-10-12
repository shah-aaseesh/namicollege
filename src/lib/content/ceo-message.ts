import { pranilPandeyPortrait } from "./local/images";
import { type RichText, richText } from "./rich-text";
import type { ContentImage } from "./types";

export type CeoMessageCopy = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly message: RichText;
  /** How the message is signed (may differ from the leadership profile name). */
  readonly signature: string;
  readonly portrait: ContentImage;
};

export const ceoMessage: CeoMessageCopy = {
  slug: "leader-pranil-pandey",
  eyebrow: "Message from the CEO",
  heading: "A message from our Chief Executive Officer.",
  portrait: pranilPandeyPortrait,
  message: richText(
    "Since our establishment in 2012, NAMI has grown with a clear purpose: to create opportunities for quality, world-class education in Nepal and to contribute to the development of capable, responsible, and confident individuals.",
    "For us, education is not limited to academic achievement. It is about developing people who can think critically, adapt to change, recognize opportunities, work with others, and use their knowledge and abilities with integrity. Across our schools and higher education programmes, we strive to provide an environment where students can discover their strengths, pursue their aspirations, and develop the confidence to shape their own futures.",
    "At the heart of our work is our belief in people. We value knowledge and achievement alongside integrity, empathy, creativity, leadership, collaboration, and responsibility. We want our students and graduates to leave NAMI not only with qualifications and skills, but with the judgement, confidence, and sense of purpose to use them well.",
    "We also believe that meaningful education is a shared responsibility. Our students, parents, educators, staff, alumni, partners, and the wider NAMI community each contribute to the institution we continue to build. By working together, we can create an environment that encourages learning, supports growth, values different perspectives, and prepares individuals to participate positively in an evolving society.",
    "NAMI was founded with the belief that world-class education should have a place in Nepal. Today, that belief continues to shape our ambitions. The next chapter is not simply about becoming larger, but about becoming more consequential—expanding opportunity, raising standards, strengthening partnerships, and creating an institution whose influence reaches well beyond its campuses. I believe that what we build today will define what NAMI can contribute tomorrow.",
  ),
  signature: "Pranil Pandey, FCCA, MBA",
};
