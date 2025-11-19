import React from "react";
import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

type ProcessStepProps = {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
};

function ProcessStep({
  number,
  icon,
  title,
  description,
  deliverables,
}: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Number and Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold font-family-primary shadow-lg">
              {number}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-secondary border-2 border-white flex items-center justify-center text-primary">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-family-primary text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Deliverables
            </p>
            <ul className="space-y-2">
              {deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const steps = [
    {
      number: "01",
      icon: <Search size={20} />,
      title: "Discovery & Strategy",
      description:
        "I start by understanding your business, goals, and challenges. Through in-depth research and stakeholder interviews, I define the project scope and create a strategic roadmap.",
      deliverables: [
        "Project brief and requirements document",
        "User research and competitive analysis",
        "Strategic roadmap and timeline",
        "Technical architecture proposal",
      ],
    },
    {
      number: "02",
      icon: <Lightbulb size={20} />,
      title: "Design & Prototyping",
      description:
        "My design process creates wireframes and high-fidelity prototypes that bring your vision to life. I iterate based on feedback to ensure the solution meets user needs.",
      deliverables: [
        "Wireframes and user flows",
        "High-fidelity mockups",
        "Interactive prototypes",
        "Design system and style guide",
      ],
    },
    {
      number: "03",
      icon: <Code2 size={20} />,
      title: "Development & Testing",
      description:
        "I build your solution using modern technologies and best practices. Rigorous testing ensures quality, performance, and security before launch.",
      deliverables: [
        "Clean, maintainable codebase",
        "Quality assurance testing",
        "Performance optimization",
        "Security audit and compliance",
      ],
    },
    {
      number: "04",
      icon: <Rocket size={20} />,
      title: "Launch & Growth",
      description:
        "I deploy your product and monitor its performance. Post-launch, I provide ongoing support, gather user feedback, and continuously optimize for growth.",
      deliverables: [
        "Deployment and hosting setup",
        "Analytics and monitoring",
        "User training and documentation",
        "Ongoing support and maintenance",
      ],
    },
  ];

  return (
    <section id="process" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-display text-4xl sm:text-5xl mb-6">
            How I Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A proven process that delivers results. From discovery to launch and
            beyond, I'm with you every step of the way.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, idx) => (
            <div key={idx}>
              <ProcessStep {...step} />
              {idx < steps.length - 1 && (
                <div className="mt-12 md:mt-16 ml-10 h-12 w-px bg-gradient-to-b from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-family-primary text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Let's discuss your project and how I can help you achieve your
              goals.
            </p>
            <a href="#contact" className="btn inline-flex items-center px-8 py-4">
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
