import { Folder, ExternalLink, GithubIcon } from "lucide-react";

type ProjectCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  problem: string;
  imageAlt?: string;
  demoHref?: string;
  repoHref?: string;
  className?: string;
};

export default function ProjectCard({
  imageSrc,
  imageAlt = "",
  title,
  description,
  problem,
  demoHref,
  repoHref,
  className = "",
}: ProjectCardProps) {
  return (
    <article
      className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full ${className}`}
    >
      <div className="flex flex-col">
        {/* Image on top as background */}
        <div
          className="relative w-full h-48 sm:h-56 md:h-64 bg-secondary/50"
          role="img"
          aria-label={imageAlt || title}
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle overlay to match site’s soft fade vibe */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10 pointer-events-none" />
        </div>

        {/* Content below image */}
        <div className="p-6 md:p-8 flex flex-col gap-5 text-left">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Folder className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl text-gray-900 font-family-primary">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-base">{description}</p>

          {/* Problem it solves */}
          <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
            <h4 className="text-xs tracking-wide uppercase text-primary">
              Problem it solves
            </h4>
            <p className="mt-2 text-gray-700 leading-relaxed">{problem}</p>
          </div>

          {/* Actions (optional) */}
          {(demoHref || repoHref) && (
            <div className="mt-2 flex flex-wrap gap-3">
              {demoHref && (
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn inline-flex items-center"
                >
                  Live Demo
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              )}
              {repoHref && (
                <a
                  href={repoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex items-center"
                >
                  Source
                  <GithubIcon className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
