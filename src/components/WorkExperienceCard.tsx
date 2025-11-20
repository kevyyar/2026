import { Building2, MapPin, Briefcase } from "lucide-react";

interface WorkExperienceCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  duration?: string;
}

export default function WorkExperienceCard({
  title,
  company,
  location,
  description,
  technologies,
  duration,
}: WorkExperienceCardProps) {
  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-blue-500/30 group text-left">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
          </div>
          {duration && (
             <div className="shrink-0 bg-white/5 px-3 py-1 rounded-full border border-white/10">
               <span className="text-xs text-gray-300 font-medium">
                 {duration}
               </span>
             </div>
           )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-gray-400 w-full">
          <div className="flex items-center gap-2 shrink-0">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-300">{company}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-gray-400 leading-relaxed text-base font-light">{description}</p>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-blue-500/5 hover:bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/10 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
