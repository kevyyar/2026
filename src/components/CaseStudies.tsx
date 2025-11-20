import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import CaseStudyModal from "./CaseStudyModal";

type CaseStudyProps = {
  client: string;
  industry: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  tags: string[];
  href?: string;
};

function CaseStudyCard({
  client,
  industry,
  title,
  imageSrc,
  imageAlt,
  challenge,
  solution,
  results,
  tags,
  href = "#",
  onClick,
}: CaseStudyProps & { onClick?: () => void }) {
  return (
    <article className="group glass-panel overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-gray-900">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-sm font-medium text-gray-300">
          {industry}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-400 mb-2 tracking-wide uppercase">{client}</p>
          <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>

        <div className="space-y-6 mb-8 flex-grow">
          <div>
            <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Challenge
            </h4>
            <p className="text-gray-400 leading-relaxed text-sm">{challenge}</p>
          </div>
          {/* Solution hidden in summary card to save space, shown in modal mostly, or keep brief */}
        </div>

        {/* Results */}
        <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-400" size={16} />
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">
              Impact
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {results.map((result, idx) => (
              <div key={idx}>
                <p className="text-xl font-bold text-white mb-1">
                  {result.value}
                </p>
                <p className="text-xs text-gray-500">{result.metric}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onClick}
          className="mt-auto inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 hover:gap-4 transition-all cursor-pointer group/btn w-full justify-between border-t border-white/10 pt-6"
        >
          <span>Explore Case Study</span>
          <ArrowUpRight size={18} className="transition-transform group-hover/btn:rotate-45" />
        </button>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      client: "Element Cleaning Systems",
      industry: "Industrial Services",
      title: "Digital Transformation for Janitorial Leader",
      imageSrc: "/ecs-site.png",
      imageAlt: "Element Cleaning Systems Website",
      challenge:
        "A premier janitorial company lacked the digital footprint to compete for enterprise contracts, relying solely on word-of-mouth.",
      solution:
        "I engineered a high-performance, bilingual platform that positions ECS as a market leader, featuring automated quoting and regional mapping.",
      results: [
        { metric: "Quote Requests", value: "+340%" },
        { metric: "Contract Size", value: "+45%" },
        { metric: "SEO Rank", value: "#1" },
        { metric: "RFP Wins", value: "+28%" },
      ],
      tags: ["Next.js", "Tailwind", "Strapi", "Resend"],
      href: "#",
      websiteUrl: "https://elementjanitorial.com",
      fullDescription:
        "I designed and developed a fully responsive website. I implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs.",
    },
    {
      client: "GreenLeaf Organics",
      industry: "E-commerce",
      title: "Revolutionizing the Purchase Journey",
      imageSrc: "https://picsum.photos/seed/greenleaf/800/600",
      imageAlt: "GreenLeaf e-commerce storefront",
      challenge:
        "High traffic but low conversion rates plagued this organic retailer due to friction-heavy checkout flows.",
      solution:
        "A complete UX overhaul and Shopify Plus integration streamlined the path to purchase, resulting in record-breaking conversion metrics.",
      results: [
        { metric: "Conversion Rate", value: "+112%" },
        { metric: "Cart Abandonment", value: "-58%" },
        { metric: "Mobile Sales", value: "+145%" },
        { metric: "Revenue", value: "+89%" },
      ],
      tags: ["Shopify Plus", "React", "UX Research", "CRO"],
      href: "#",
      websiteUrl: "https://greenleaforganics.example.com",
      fullDescription:
        "Through extensive user testing and analytics review, I identified key friction points in the customer journey. My redesign focused on streamlining the checkout process from 5 steps to 2, improving product discovery, and creating a mobile-first experience that drives conversions.",
    },
    {
      client: "HealthTrack Pro",
      industry: "HealthTech",
      title: "Next-Gen HIPAA Patient Portal",
      imageSrc: "https://picsum.photos/seed/healthtrack/800/600",
      imageAlt: "HealthTrack patient portal",
      challenge:
        "Balancing strict HIPAA compliance with a consumer-grade user experience for a growing healthcare provider.",
      solution:
        "I architected a secure, end-to-end encrypted portal that simplifies patient interaction without compromising on data sovereignty.",
      results: [
        { metric: "Adoption Rate", value: "85%" },
        { metric: "Security Audit", value: "A+" },
        { metric: "Support Load", value: "-72%" },
        { metric: "Efficiency", value: "15hrs/wk" },
      ],
      tags: ["React", "Node.js", "Encryption", "AWS"],
      href: "#",
      websiteUrl: "https://healthtrackpro.example.com",
      fullDescription:
        "Security and usability were paramount for this project. I implemented end-to-end encryption for all patient data, two-factor authentication, and comprehensive audit logging. The interface was designed to be intuitive for patients of all technical skill levels while providing healthcare providers with powerful tools for patient management.",
    },
  ];

  return (
    <section id="case-studies" className="py-32 bg-black relative">
      <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">Selected Works</span>
          <h2 className="heading-display text-4xl sm:text-5xl mb-6">
            Digital Breakthroughs
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            A curated collection of deployed solutions where technical prowess met business ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {caseStudies.slice(0, 2).map((study, idx) => (
            <CaseStudyCard
              key={idx}
              {...study}
              onClick={() => setSelectedCase(idx)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1">
           {caseStudies.slice(2).map((study, idx) => (
            <div key={idx} className="max-w-4xl mx-auto w-full">
              <CaseStudyCard
                {...study}
                onClick={() => setSelectedCase(idx + 2)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CaseStudyModal
        isOpen={selectedCase !== null}
        onClose={() => setSelectedCase(null)}
        caseStudy={selectedCase !== null ? caseStudies[selectedCase] : null}
      />
    </section>
  );
}
