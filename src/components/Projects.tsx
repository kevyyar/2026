import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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
      websiteUrl: "https://devjournal.example.com",
      technologies: ["React", "TypeScript", "IndexedDB", "Markdown"],
      fullDescription:
        "Built for developers who need to capture ideas, code snippets, and technical notes without leaving their flow. Features include syntax highlighting, keyboard shortcuts, and offline-first architecture.",
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
      websiteUrl: "https://taskboard.example.com",
      technologies: ["React", "DnD Kit", "LocalStorage", "Tailwind CSS"],
      fullDescription:
        "Drag-and-drop interface built with accessibility in mind. Works entirely offline, with optional cloud sync. Perfect for managing personal projects and daily todos.",
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
      websiteUrl: "https://apiscout.example.com",
      technologies: ["React", "Monaco Editor", "TypeScript", "Vite"],
      fullDescription:
        "Test REST APIs, save collections, and auto-generate TypeScript code snippets. Includes authentication helpers, request history, and environment variables support.",
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
      websiteUrl: "https://portfoliobuilder.example.com",
      technologies: ["Astro", "React", "Tailwind CSS", "MDX"],
      fullDescription:
        "Choose from professionally designed templates, customize content and styling, then export production-ready code. Built with modern web standards and optimized for performance.",
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
              onClick={() => setSelectedProject(idx)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject !== null ? projects[selectedProject] : null}
      />
    </section>
  );
}
