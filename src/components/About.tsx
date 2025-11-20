import React from "react";
import { Target, Users, Award, Heart } from "lucide-react";

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-light text-sm">{description}</p>
    </div>
  );
}

export default function About() {
  const values = [
    {
      icon: <Target size={28} />,
      title: "Strategic Precision",
      description:
        "I don't just write code; I engineer outcomes. Every decision is calculated to maximize your ROI and technical scalability.",
    },
    {
      icon: <Users size={28} />,
      title: "Radical Transparency",
      description:
        "You are never in the dark. I operate as an extension of your team, providing clear updates and collaborative decision-making.",
    },
    {
      icon: <Award size={28} />,
      title: "Engineering Excellence",
      description:
        "Compromise is not in my vocabulary. I adhere to strict coding standards to ensure your product is robust, secure, and scalable.",
    },
    {
      icon: <Heart size={28} />,
      title: "Human-Centric Design",
      description:
        "Technology serves people. I craft experiences that are intuitive, accessible, and delightful, turning users into advocates.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Deployed" },
    { value: "30+", label: "Global Partners" },
    { value: "5+", label: "Years Innovation" },
    { value: "98%", label: "Retention Rate" },
  ];

  return (
    <section id="about" className="py-32 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">The Vision</span>
            <h2 className="heading-display text-4xl sm:text-5xl mb-6">
              Architecting the Digital Frontier
            </h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-light">
              <p>
                I am a digital product architect obsessed with the intersection of design and engineering. What began as a pursuit of perfect code has evolved into a holistic practice of building digital ecosystems that thrive.
              </p>
              <p>
                I partner with visionaries—from agile startups to established enterprises—to translate complex requirements into elegant, high-performance solutions. My work is not just about shipping features; it's about creating competitive advantages.
              </p>
              <p>
                Leveraging the bleeding edge of web technology (React, Astro, Serverless), I build applications that are fast, secure, and ready for the future. But ultimately, technology is the means; your success is the end.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="glass-panel rounded-3xl p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 relative z-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold text-white mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    {stat.value}
                  </div>
                  <div className="text-blue-400 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Core Philosophy
            </h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              The principles that govern my work and ensure delivery excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <ValueCard key={idx} {...value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
