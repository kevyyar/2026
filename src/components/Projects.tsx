import ProjectCard from "./ProjectCard";

export default function Projects() {
  const projects = [
    {
      title: "Dev Journal",
      imageSrc: "https://picsum.photos/seed/devjournal/800/600",
      imageAlt: "Dev Journal app screenshot",
      description:
        "A minimalist, markdown-first note-taking app for developers with keyboard-first UX, tags, and quick search.",
      problem:
        "Context switching and scattered notes slow down coding sessions. This app centralizes dev notes with fast navigation and a clean writing experience.",
      demoHref: "#",
      repoHref: "#",
    },
    {
      title: "TaskBoard",
      imageSrc: "https://picsum.photos/seed/taskboard/800/600",
      imageAlt: "TaskBoard kanban screenshot",
      description:
        "A kanban-style task tracker focused on personal productivity, offline mode, and fluid drag-and-drop.",
      problem:
        "Most tools are heavy for solo workflows. TaskBoard keeps focus tight, fast, and frictionless while working offline.",
      demoHref: "#",
      repoHref: "#",
    },
    {
      title: "API Scout",
      imageSrc: "https://picsum.photos/seed/apiscout/800/600",
      imageAlt: "API Scout dashboard screenshot",
      description:
        "Lightweight API client for quick testing, saving requests, and generating typed snippets for fetch/axios.",
      problem:
        "Developers often jump between tools to test APIs and write code snippets. API Scout streamlines both in one place.",
      demoHref: "#",
      repoHref: "#",
    },
    {
      title: "Portfolio Builder",
      imageSrc: "https://picsum.photos/seed/portfolio/800/600",
      imageAlt: "Portfolio Builder landing screenshot",
      description:
        "A templated portfolio generator with ready-to-ship sections, themes, and accessible components.",
      problem:
        "Setting up a personal site takes time. This tool accelerates it with opinionated, accessible defaults.",
      demoHref: "#",
      repoHref: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="flex flex-col align-center justify-center text-center py-20 bg-secondary"
    >
      {/* Heading + Description */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="heading-display text-3xl">Projects</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          A selection of personal projects where I explore ideas, ship small
          tools, and polish UX. Built with modern web stacks and a focus on
          simplicity, speed, and accessibility.
        </p>
      </div>

      {/* Grid of project cards */}
      <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p, idx) => (
            <ProjectCard
              key={idx}
              imageSrc={p.imageSrc}
              imageAlt={p.imageAlt}
              title={p.title}
              description={p.description}
              problem={p.problem}
              demoHref={p.demoHref}
              repoHref={p.repoHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
