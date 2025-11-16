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
        "Beautiful, intuitive interfaces that engage users and drive conversions. We blend aesthetics with usability to create memorable experiences.",
      features: [
        "User research and persona development",
        "Wireframing and prototyping",
        "Design systems and component libraries",
        "Responsive and accessible design",
      ],
    },
    {
      icon: <Rocket size={28} />,
      title: "Product Strategy",
      description:
        "From concept to launch, we help you build products that solve real problems and achieve business goals with data-driven decisions.",
      features: [
        "Market research and validation",
        "Product roadmap planning",
        "MVP development and iteration",
        "Go-to-market strategy",
      ],
    },
    {
      icon: <Zap size={28} />,
      title: "Performance Optimization",
      description:
        "Lightning-fast load times and seamless interactions. We optimize every aspect of your site for speed, SEO, and user experience.",
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
      title: "Analytics & Growth",
      description:
        "Make informed decisions with comprehensive analytics. We track what matters and help you optimize for continuous growth.",
      features: [
        "Analytics setup and integration",
        "Conversion rate optimization",
        "A/B testing and experimentation",
        "Performance reporting and insights",
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
            We combine technical excellence with strategic thinking to deliver results.
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
