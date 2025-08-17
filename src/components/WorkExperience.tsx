import WorkExperienceCard from "./WorkExperienceCard";

export default function WorkExperience() {
  const workExperiences = [
    {
      title: "Senior Software Engineer",
      company: "Acme Cloud",
      location: "United States",
      duration: "2022 - Present",
      description: "Led the design and delivery of a multi-tenant platform, decomposed critical monolith paths into services, improved p95 latency by 40%, defined SLOs and on-call rotations, and mentored junior engineers.",
      technologies: ["TypeScript", "Node.js", "React", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "Terraform", "GraphQL"]
    },
    {
      title: "Full Stack Developer",
      company: "TechStart Solutions",
      location: "San Francisco, CA",
      duration: "2020 - 2022",
      description: "Built responsive web applications using modern frameworks, collaborated with cross-functional teams to deliver features on time, optimized database queries reducing load times by 30%, and implemented CI/CD pipelines for automated deployment.",
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Git", "Jenkins", "HTML5", "CSS3", "REST APIs"]
    },
    {
      title: "Junior Software Developer",
      company: "Digital Innovations Inc",
      location: "Austin, TX",
      duration: "2018 - 2020",
      description: "Developed and maintained web applications, participated in code reviews and agile development processes, worked on bug fixes and feature enhancements, and gained experience with version control and testing frameworks.",
      technologies: ["Python", "Django", "JavaScript", "jQuery", "MySQL", "Git", "Bootstrap", "Linux", "JSON", "API Integration"]
    }
  ];

  return (
    <section className="flex flex-col align-center justify-center text-center py-20 bg-secondary">
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
