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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 font-family-primary">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-4 p-2 text-gray-600 w-full whitespace-nowrap">
          <div className="flex items-center gap-2 shrink-0">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{company}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{location}</span>
          </div>
          {duration && (
            <div className="shrink-0">
              <span className="mt-2 text-xs text-gray-500 font-medium">
                {duration}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed text-base">{description}</p>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
