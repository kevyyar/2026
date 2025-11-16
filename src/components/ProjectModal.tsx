import { useState, useEffect } from "react";
import { X, ExternalLink, GithubIcon, Folder } from "lucide-react";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    problem: string;
    websiteUrl?: string;
    demoHref?: string;
    repoHref?: string;
    technologies?: string[];
    fullDescription?: string;
  } | null;
};

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isAnimating) return null;
  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isAnimating && isOpen ? "overlay-enter" : "overlay-exit"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${
          isAnimating && isOpen ? "drawer-enter" : "drawer-exit"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-900" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-80 bg-secondary/50">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.imageSrc})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                <Folder className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-family-primary text-gray-900 mb-2">
                  {project.title}
                </h2>
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-tertiary transition-colors inline-flex items-center gap-1 text-sm"
                  >
                    {project.websiteUrl.replace(/^https?:\/\//, "")}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
              {project.fullDescription && (
                <p className="text-gray-700 leading-relaxed mt-4">
                  {project.fullDescription}
                </p>
              )}
            </div>

            {/* Problem Section */}
            <div className="rounded-xl border border-primary/15 bg-primary/5 p-6 mb-8">
              <h3 className="text-xs tracking-wide uppercase text-primary font-semibold mb-3">
                Problem it solves
              </h3>
              <p className="text-gray-700 leading-relaxed">{project.problem}</p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary border border-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {(project.demoHref || project.repoHref) && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                {project.demoHref && (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn inline-flex items-center"
                  >
                    Live Demo
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
                {project.repoHref && (
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary inline-flex items-center"
                  >
                    Source Code
                    <GithubIcon className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
