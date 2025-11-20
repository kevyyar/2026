import WorkExperienceCard from "./WorkExperienceCard";

export default function WorkExperience() {
  const workExperiences = [
    {
      title: "Software Developer",
      company: "Softtek",
      location: "Mexico",
      duration: "2022 - Present",
      description:
        "Frontend-focused developer building polished, accessible product experiences with React, Next.js, and Vue. I partner closely with design and product to turn requirements into fast, maintainable UI, and I use AI daily to accelerate delivery and deepen learning. On the backend I work with Firebase and some Node.js for lightweight APIs. Comfortable in CMS ecosystems like Drupal, I ship thoughtfully: reusable components, SSR/SEO, performance budgets, and pragmatic testing that keeps features moving while preserving quality.",
      technologies: [
        "TypeScript",
        "React",
        "Next.js",
        "Vue",
        "Node.js",
        "Firebase",
        "Drupal",
      ],
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      location: "Mexico",
      duration: "2019 - 2022",
      description:
        "Built and launched websites for local businesses needing a strong digital presence. Led end-to-end delivery—from discovery and scoping to UI implementation and handoff—while improving client communication, requirement gathering, and project planning. Focused on clean, responsive frontends and usability, which accelerated my learning and solidified core web fundamentals.",
      technologies: ["JavaScript", "HTML5", "CSS3"],
    },
  ];

  return (
    <section id="experience" className="flex flex-col align-center justify-center text-center py-32 bg-black">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-12">
        <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">Career Trajectory</span>
        <h1 className="heading-display text-4xl sm:text-5xl">Professional Evolution</h1>
        <p className="mt-6 text-xl leading-relaxed text-gray-400 font-light">
          My journey from solo creator to enterprise engineer.
        </p>
      </div>
      <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col">
          {workExperiences.map((experience, index) => (
            <div key={index} className="group">
              {/* Dot at the beginning of each card */}
              <div className="flex relative">
                <div className="w-8 flex justify-center relative z-10">
                  <div className="w-3 h-3 rounded-full bg-black border-2 border-blue-500 shadow-[0_0_10px_#3b82f6] group-hover:scale-125 transition-transform duration-300"></div>
                </div>
                <div className="flex-1"></div>
              </div>

              {/* Line segment that matches the card height */}
              <div className="flex items-stretch">
                <div className="w-8 flex justify-center">
                  <div className="w-px bg-gradient-to-b from-blue-500 via-blue-900 to-gray-900 h-full opacity-50"></div>
                </div>
                <div className="flex-1 pl-8 pb-16">
                  <WorkExperienceCard
                    title={experience.title}
                    company={experience.company}
                    location={experience.location}
                    duration={experience.duration}
                    description={experience.description}
                    technologies={experience.technologies}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
