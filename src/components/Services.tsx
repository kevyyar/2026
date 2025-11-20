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
    <div className="group relative glass-panel p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 leading-relaxed mb-6 font-light">{description}</p>
        <ul className="space-y-3 border-t border-white/5 pt-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0 shadow-[0_0_5px_#3b82f6]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <Code size={28} />,
      title: "Full-Stack Engineering",
      description:
        "Architecting scalable, high-performance applications using cutting-edge frameworks. I build robust digital infrastructure designed for growth.",
      features: [
        "Next.js & React Ecosystems",
        "Scalable Cloud Architecture",
        "API Design & Integration",
        "Complex State Management",
      ],
    },
    {
      icon: <Palette size={28} />,
      title: "Premium UI/UX Design",
      description:
        "Crafting intuitive, aesthetic interfaces that captivate users. I merge behavioral psychology with visual design to drive engagement.",
      features: [
        "High-Fidelity Prototyping",
        "Design Systems & Tokens",
        "Micro-Interactions & Motion",
        "Accessibility (WCAG) First",
      ],
    },
    {
      icon: <Rocket size={28} />,
      title: "Digital Product Launch",
      description:
        "Turning concepts into market-ready products. From MVP to full-scale deployment, I ensure a smooth trajectory for your digital assets.",
      features: [
        "Strategic MVP Development",
        "Marketing-Ready Landing Pages",
        "E-commerce Solutions",
        "Cross-Platform Compatibility",
      ],
    },
    {
      icon: <Zap size={28} />,
      title: "Performance Engineering",
      description:
        "Obsessive optimization for lightning-fast load times. Speed is a feature, and I ensure your application delivers instantaneous responses.",
      features: [
        "Core Web Vitals Mastery",
        "Advanced Caching Strategies",
        "Bundle Size Optimization",
        "Server-Side Rendering (SSR)",
      ],
    },
    {
      icon: <Shield size={28} />,
      title: "Security & Maintenance",
      description:
        "Fortifying your digital presence. Proactive monitoring and updates keep your business secure and running without interruption.",
      features: [
        "Automated Testing Pipelines",
        "Security Audits & Hardening",
        "Real-time Error Monitoring",
        "Continuous Integration (CI/CD)",
      ],
    },
    {
      icon: <LineChart size={28} />,
      title: "Data-Driven Automation",
      description:
        "Leveraging data to streamline operations. I build custom tools that automate workflows and provide actionable business intelligence.",
      features: [
        "Custom Dashboards & Admin Panels",
        "Workflow Automation",
        "Data Visualization",
        "Third-Party API Integration",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-32 bg-black relative"
    >
       {/* Subtle background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">Capabilities</span>
          <h2 className="heading-display text-4xl sm:text-5xl mb-6">
            Engineering Digital Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            I provide a comprehensive suite of technical services designed to elevate your brand and streamline your operations.
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
