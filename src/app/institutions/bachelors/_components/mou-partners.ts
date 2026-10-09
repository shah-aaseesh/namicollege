// The partners the site shipped with. They seed the CMS defaults, and each logo
// keeps its hand-tuned size while it is still in use.
export type MouPartner = {
  readonly id: string;
  readonly organization: string;
  readonly logo: string;
  readonly width: number;
  readonly height: number;
  readonly domain: string;
  readonly logoClass: string;
};

export const MOU_PARTNERS: readonly MouPartner[] = [
  {
    id: "websurfer",
    organization: "Web Surfer The Broad Band Company",
    logo: "/logos/mou/websurfer-logo-brighter1920x658-removebg-preview.png",
    width: 854,
    height: 292,
    domain: "Broadband & Telecommunications",
    logoClass: "max-h-20 w-auto max-w-[210px] sm:max-w-[230px]",
  },
  {
    id: "machan",
    organization: "Machan Wildlife Resort Pvt. Ltd",
    logo: "/logos/mou/machian-removebg-preview.png",
    width: 447,
    height: 447,
    domain: "Eco-Tourism & Hospitality",
    logoClass: "max-h-24 w-auto max-w-[170px] sm:max-w-[190px]",
  },
  {
    id: "suraj-interior",
    organization: "Suraj Interior And Designers Pvt. Ltd",
    logo: "/logos/mou/Suraj-removebg-preview.png",
    width: 447,
    height: 559,
    domain: "Architecture & Interior Design",
    logoClass: "max-h-24 w-auto max-w-[160px] sm:max-w-[180px]",
  },
  {
    id: "cross-web",
    organization: "Cross Web Office Automation Pvt. Ltd",
    logo: "/logos/mou/Cross_web-removebg-preview.png",
    width: 400,
    height: 400,
    domain: "Office Automation & IT Solutions",
    logoClass: "max-h-22 w-auto max-w-[180px] sm:max-w-[200px]",
  },
  {
    id: "startup-discovery",
    organization: "Startup Discovery Asia",
    logo: "/logos/mou/Startup_Discovery-removebg-preview.png",
    width: 480,
    height: 175,
    domain: "Incubation & Venture Acceleration",
    logoClass: "max-h-20 w-auto max-w-[210px] sm:max-w-[230px]",
  },
];
