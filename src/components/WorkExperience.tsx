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
    <section id="experience" className="flex flex-col align-center justify-center text-center py-20 bg-secondary">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="heading-display text-3xl">Work Experience</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          My story so far being a developer, from my first job to my current
          role.
        </p>
      </div>
      <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col">
          {workExperiences.map((experience, index) => (
            <div key={index}>
              {/* Dot at the beginning of each card */}
              <div className="flex">
                <div className="w-6 flex justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary border-2 border-primary"></div>
                </div>
                <div className="flex-1"></div>
              </div>

              {/* Line segment that matches the card height */}
              <div className="flex items-stretch">
                <div className="w-6 flex justify-center">
                  <div className="w-px bg-primary h-full"></div>
                </div>
                <div className="flex-1">
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

              {/* Connecting line between cards */}
              {index !== workExperiences.length - 1 && (
                <div className="flex">
                  <div className="w-6 flex justify-center">
                    <div className="w-px bg-primary h-8"></div>
                  </div>
                  <div className="flex-1 h-8"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
