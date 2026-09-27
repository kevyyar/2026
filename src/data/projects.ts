import type { Project } from "./types";
import ecsImage from "../assets/work/element-cleaning-systems.png";
import aestheteImage from "../assets/work/aesthete.png";
import vocesImage from "../assets/work/voces-podcast.png";
import amorImage from "../assets/work/amor-digital.png";

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
  {
    slug: "aesthete",
    client: "Aesthete",
    industry: "E-commerce",
    title: "Abstract Expressionism Meets Modern Commerce",
    image: aestheteImage,
    imageAlt: "Aesthete fashion e-commerce storefront",
    challenge:
      "A curated fashion brand needed an immersive digital experience that captured their avant-garde aesthetic while driving conversions.",
    solution:
      "I crafted a visually striking, dark-themed storefront with cinematic transitions and typography that elevates the shopping experience to match the brand's artistic vision.",
    results: [
      { label: "Avg Session", value: "+87%" },
      { label: "Conversion", value: "+64%" },
      { label: "Brand Recall", value: "92%" },
      { label: "Return Rate", value: "+156%" },
    ],
    tags: ["Next.js", "Framer Motion", "Shopify", "UX Design"],
    websiteUrl: "https://aesthete-nine.vercel.app",
    fullDescription:
      "I designed and developed a premium e-commerce experience that positions Aesthete as a destination for abstract expressionism in fashion. The site features dramatic typography, carefully orchestrated animations, and a moody aesthetic that resonates with their discerning clientele.",
  },
  {
    slug: "voces-podcast",
    client: "Voces Podcast",
    industry: "Media",
    title: "Amplifying Local Stories with Global Reach",
    image: vocesImage,
    imageAlt: "Voces podcast platform",
    challenge:
      "A Spanish-language podcast needed a distinctive platform to showcase episodes and build community around authentic entrepreneurial stories.",
    solution:
      "I designed a warm, editorial-style platform with bold typography and a vinyl-inspired visual motif that honors the intimacy of audio storytelling.",
    results: [
      { label: "Listeners", value: "+230%" },
      { label: "Avg Listen", value: "92%" },
      { label: "Subscribers", value: "+180%" },
      { label: "Engagement", value: "4.8x" },
    ],
    tags: ["Next.js", "Podcast RSS", "Spanish", "Editorial Design"],
    websiteUrl: "https://podcast-fer-2026.vercel.app",
    fullDescription:
      "I built a bilingual podcast platform featuring episode showcases, integrated audio players, and a warm cream-and-orange aesthetic. The design draws inspiration from vinyl records, emphasizing the authentic, human-centered nature of the storytelling.",
  },
  {
    slug: "amor-digital",
    client: "Amor Digital",
    industry: "SaaS",
    title: "Digital Wedding Invitations Made Beautiful",
    image: amorImage,
    imageAlt: "Amor Digital wedding invitation builder",
    challenge:
      "Couples needed an elegant way to create and share digital wedding invitations without design skills, while tracking RSVPs in real-time.",
    solution:
      "I built a no-code invitation builder with stunning templates, live RSVP tracking, and personalized guest experiences—all in under 2 minutes.",
    results: [
      { label: "Couples", value: "1,000+" },
      { label: "Setup Time", value: "2 min" },
      { label: "Satisfaction", value: "98%" },
      { label: "RSVP Rate", value: "94%" },
    ],
    tags: ["Next.js", "Supabase", "Spanish", "No-Code Builder"],
    websiteUrl: "https://digital-invitations-mu.vercel.app",
    fullDescription:
      "I designed and developed a SaaS platform enabling couples to create beautiful, personalized digital wedding invitations. Features include template selection, live preview, RSVP tracking with QR codes, and guest management—all wrapped in a warm, romantic aesthetic.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after `slug`, wrapping to the first one. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
