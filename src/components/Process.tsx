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
    <div className="relative group">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Number and Icon */}
        <div className="flex-shrink-0 relative z-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-blue-400/20 group-hover:scale-110 transition-transform duration-300">
              {number}
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-[#0F172A] border border-white/10 flex items-center justify-center text-blue-400 shadow-lg">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light">{description}</p>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
              Key Deliverables
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm text-gray-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]" />
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
      title: "Strategic Discovery",
      description:
        "We begin by deconstructing your business goals. I conduct deep-dive research to uncover market opportunities and define the technical constraints, ensuring our roadmap aligns perfectly with your vision.",
      deliverables: [
        "Technical Specification",
        "Competitor Analysis",
        "Architecture Blueprint",
        "Project Roadmap",
      ],
    },
    {
      number: "02",
      icon: <Lightbulb size={20} />,
      title: "UX/UI Architecture",
      description:
        "Merging form and function. I create interactive high-fidelity prototypes that establish the visual language and user journey, allowing us to validate concepts before a single line of code is written.",
      deliverables: [
        "Interactive Prototypes",
        "Design System",
        "User Flow Maps",
        "Accessibility Audit",
      ],
    },
    {
      number: "03",
      icon: <Code2 size={20} />,
      title: "Full-Stack Engineering",
      description:
        "The build phase. I develop your solution using scalable, modern frameworks. Every component is crafted for performance, security, and maintainability, with rigorous testing at every step.",
      deliverables: [
        "Production-Ready Code",
        "API Documentation",
        "Unit & Integration Tests",
        "Performance Report",
      ],
    },
    {
      number: "04",
      icon: <Rocket size={20} />,
      title: "Deployment & Scale",
      description:
        "Launch is just the beginning. I handle the DevOps pipeline for a seamless release and set up monitoring tools to ensure your application scales effortlessly as your user base grows.",
      deliverables: [
        "CI/CD Pipeline",
        "Analytics Dashboard",
        "SEO Optimization",
        "Growth Strategy",
      ],
    },
  ];

  return (
    <section id="process" className="py-32 bg-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-blue-900/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">Methodology</span>
          <h2 className="heading-display text-4xl sm:text-5xl mb-6">
            The Blueprint for Success
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            A systematic approach to digital craftsmanship. I reduce risk and maximize value through a transparent, iterative process.
          </p>
        </div>

        <div className="relative space-y-24">
          {/* Connecting Line */}
          <div className="absolute left-10 top-10 bottom-10 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden md:block" />

          {steps.map((step, idx) => (
            <ProcessStep key={idx} {...step} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <div className="glass-panel inline-block p-10 md:p-16 max-w-4xl mx-auto relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
              Ready to Disrupt Your Industry?
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-lg font-light relative z-10">
              Let's collaborate to build something that sets new standards.
            </p>
            <a href="#contact" className="btn px-10 py-4 text-lg relative z-10">
              Start the Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
