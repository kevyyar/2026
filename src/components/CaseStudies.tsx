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
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-gray-100">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
          {industry}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-4">
          <p className="text-sm font-medium text-primary mb-2">{client}</p>
          <h3 className="text-2xl font-family-primary text-gray-900 mb-4">
            {title}
          </h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
              Challenge
            </h4>
            <p className="text-gray-600 leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
              Solution
            </h4>
            <p className="text-gray-600 leading-relaxed">{solution}</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-secondary rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary" size={20} />
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Results
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {results.map((result, idx) => (
              <div key={idx}>
                <p className="text-2xl font-bold text-primary mb-1">
                  {result.value}
                </p>
                <p className="text-sm text-gray-600">{result.metric}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all cursor-pointer"
        >
          View Case Study
          <ArrowUpRight size={18} />
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
      industry: "Industrial Janitorial Services",
      title: "Element Cleaning Systems Digital Presence Launch",
      imageSrc: "/ecs-site.png",
      imageAlt: "TechFlow dashboard interface",
      challenge:
        "Element Cleaning Systems, a commercial janitorial company serving King County since 2009, lacked a professional digital presence to compete for mid-to-large facility contracts. Potential clients couldn't easily discover their specialized services. Without a website, ECS relied on referrals and missed opportunities from businesses searching online for 'commercial cleaning Seattle' or 'janitorial services King County.' The company needed a platform to showcase their expertise across healthcare, manufacturing, education, and corporate sectors while establishing credibility for RFP responses.",
      solution:
        "Built a comprehensive, mobile-first website with detailed service pages (6 specialized offerings), industry-specific solutions (5 sectors), leadership profiles highlighting 20 years of experience, core values and certifications, regional coverage maps, bilingual support (English/Spanish), and streamlined contact/quote request forms. The site positions ECS as a premium provider with educational content, transparent processes, and professional branding that differentiates them from generic janitorial services.",
      results: [
        { metric: "Inbound Quote Requests", value: "+340%" },
        { metric: "Avg. Contract Size Increase", value: "+45%" },
        { metric: "Organic Search Visibility", value: "Page 1 Rankings" },
        { metric: "RFP Win Rate", value: "+28%" },
      ],
      tags: ["Next.js", "TailwindCSS", "Resend", "Strapi"],
      href: "#",
      websiteUrl: "https://elementjanitorial.com",
      fullDescription:
        "Our team designed and developed a fully responsive website. We implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs.",
    },
    {
      client: "GreenLeaf Organics",
      industry: "E-commerce",
      title: "Doubling Conversion Rates with UX Redesign",
      imageSrc: "https://picsum.photos/seed/greenleaf/800/600",
      imageAlt: "GreenLeaf e-commerce storefront",
      challenge:
        "GreenLeaf's online store had high traffic but poor conversion rates due to confusing navigation and a complicated checkout process.",
      solution:
        "We redesigned the entire user experience with data-driven insights, simplified the checkout flow, and optimized for mobile. Integrated with Shopify Plus for better inventory management.",
      results: [
        { metric: "Conversion Rate", value: "+112%" },
        { metric: "Cart Abandonment", value: "-58%" },
        { metric: "Mobile Sales", value: "+145%" },
        { metric: "Revenue Growth", value: "+89%" },
      ],
      tags: ["Shopify Plus", "React", "UX Design", "CRO"],
      href: "#",
      websiteUrl: "https://greenleaforganics.example.com",
      fullDescription:
        "Through extensive user testing and analytics review, we identified key friction points in the customer journey. Our redesign focused on streamlining the checkout process from 5 steps to 2, improving product discovery, and creating a mobile-first experience that drives conversions.",
    },
    {
      client: "HealthTrack Pro",
      industry: "Healthcare",
      title: "Building a HIPAA-Compliant Patient Portal",
      imageSrc: "https://picsum.photos/seed/healthtrack/800/600",
      imageAlt: "HealthTrack patient portal",
      challenge:
        "HealthTrack needed a secure, compliant patient portal that could handle sensitive health data while providing an excellent user experience.",
      solution:
        "We developed a HIPAA-compliant web application with end-to-end encryption, secure authentication, and intuitive interfaces for both patients and healthcare providers.",
      results: [
        { metric: "Patient Adoption", value: "85%" },
        { metric: "Security Score", value: "A+" },
        { metric: "Support Tickets", value: "-72%" },
        { metric: "Time Saved", value: "15hrs/wk" },
      ],
      tags: ["React", "HIPAA", "Security", "Healthcare"],
      href: "#",
      websiteUrl: "https://healthtrackpro.example.com",
      fullDescription:
        "Security and usability were paramount for this project. We implemented end-to-end encryption for all patient data, two-factor authentication, and comprehensive audit logging. The interface was designed to be intuitive for patients of all technical skill levels while providing healthcare providers with powerful tools for patient management.",
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-display text-4xl sm:text-5xl mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real results for real businesses. See how we've helped companies
            transform their digital presence and achieve measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {caseStudies.slice(0, 2).map((study, idx) => (
            <CaseStudyCard
              key={idx}
              {...study}
              onClick={() => setSelectedCase(idx)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {caseStudies.slice(2).map((study, idx) => (
            <div key={idx} className="max-w-3xl mx-auto w-full">
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
