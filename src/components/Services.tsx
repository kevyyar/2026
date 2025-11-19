import React from "react";
import { Code, Palette, Rocket, Shield, Zap, LineChart } from "lucide-react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-family-primary text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <Code size={28} />,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks and best practices. Scalable, performant, and tailored to your business needs.",
      features: [
        "React, Next.js, and Vue applications",
        "RESTful APIs and backend integration",
        "Database design and optimization",
        "Progressive Web Apps (PWA)",
      ],
    },
    {
      icon: <Palette size={28} />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that engage users and drive conversions. I blend aesthetics with usability to create memorable experiences.",
      features: [
        "User research and persona development",
        "Wireframing and prototyping",
        "Design systems and component libraries",
        "Responsive and accessible design",
      ],
    },
    {
      icon: <Rocket size={28} />,
      title: "Landing Pages & Websites",
      description:
        "Professional websites that convert visitors into customers. Perfect for businesses looking to establish or enhance their online presence.",
      features: [
        "Custom landing pages for campaigns",
        "Business websites and portfolios",
        "E-commerce storefronts",
        "Mobile-responsive across all devices",
      ],
    },
    {
      icon: <Zap size={28} />,
      title: "Performance Optimization",
      description:
        "Lightning-fast load times and seamless interactions. I optimize every aspect of your site for speed, SEO, and user experience.",
      features: [
        "Core Web Vitals optimization",
        "Image and asset optimization",
        "Caching and CDN strategies",
        "Code splitting and lazy loading",
      ],
    },
    {
      icon: <Shield size={28} />,
      title: "Maintenance & Support",
      description:
        "Keep your digital products running smoothly with proactive maintenance, updates, and dedicated support when you need it.",
      features: [
        "Security updates and monitoring",
        "Bug fixes and troubleshooting",
        "Feature enhancements",
        "24/7 support packages available",
      ],
    },
    {
      icon: <LineChart size={28} />,
      title: "Business Automation",
      description:
        "Streamline your operations with custom web tools and automations. Save time and reduce errors by automating repetitive tasks.",
      features: [
        "Custom dashboards and admin panels",
        "Workflow automation tools",
        "Data collection and reporting systems",
        "Third-party integrations (CRM, email, etc.)",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-secondary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-display text-4xl sm:text-5xl mb-6">
            Services Built for Growth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to help your business succeed.
            I combine technical excellence with strategic thinking to deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
