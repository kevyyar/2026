import React from "react";
import { Target, Users, Award, Heart } from "lucide-react";

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-family-primary text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default function About() {
  const values = [
    {
      icon: <Target size={28} />,
      title: "Results-Driven",
      description:
        "I measure success by your success. Every decision is guided by data and focused on achieving your business goals.",
    },
    {
      icon: <Users size={28} />,
      title: "Collaborative",
      description:
        "Your team becomes my team. I believe in transparent communication and working together every step of the way.",
    },
    {
      icon: <Award size={28} />,
      title: "Quality First",
      description:
        "I don't cut corners. From clean code to beautiful design, I maintain the highest standards in everything I deliver.",
    },
    {
      icon: <Heart size={28} />,
      title: "User-Focused",
      description:
        "Great products put users first. I create experiences that people love to use and that solve real problems.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "30+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="heading-display text-4xl sm:text-5xl mb-6">
              Building Digital Excellence Since 2020
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                I'm a modern freelance developer passionate about creating digital
                products that make a real impact. What started as a freelance
                operation has evolved into a dedicated partnership trusted by
                businesses across industries.
              </p>
              <p>
                I combine technical expertise with creative thinking to
                deliver solutions that don't just look good—they drive measurable
                results. From startups to established enterprises, I help
                businesses thrive in the digital landscape.
              </p>
              <p>
                I stay at the cutting edge of web technologies, using modern
                frameworks and best practices to build fast, secure, and scalable
                applications. But technology is just a tool—my real focus is on
                understanding your business and crafting solutions that help you
                succeed.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-secondary rounded-3xl p-12">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2 font-family-primary">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-family-primary text-gray-900 mb-4">
              What Drives Me
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My core values guide every project I take on and every
              relationship I build.
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
