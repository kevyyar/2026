import type { Project } from "./types";
import ecsImage from "../assets/work/element-cleaning-systems.png";

export const projects: Project[] = [
  {
    slug: "element-cleaning-systems",
    client: "Element Cleaning Systems",
    industry: "Industrial Services",
    title: "Digital Transformation for Janitorial Leader",
    image: ecsImage,
    imageAlt: "Element Cleaning Systems Website",
    challenge:
      "A premier janitorial company lacked the digital footprint to compete for enterprise contracts, relying solely on word-of-mouth.",
    solution:
      "I engineered a high-performance, bilingual platform that positions ECS as a market leader, featuring automated quoting and regional mapping.",
    results: [
      { label: "Quote Requests", value: "+340%" },
      { label: "Contract Size", value: "+45%" },
      { label: "SEO Rank", value: "#1" },
      { label: "RFP Wins", value: "+28%" },
    ],
    tags: ["Next.js", "Tailwind", "Strapi", "Resend"],
    websiteUrl: "https://elementjanitorial.com",
    fullDescription:
      "I designed and developed a fully responsive website. I implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

