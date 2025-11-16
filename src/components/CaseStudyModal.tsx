import { useState, useEffect } from "react";
import { X, TrendingUp, ArrowUpRight } from "lucide-react";

type CaseStudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: {
    client: string;
    industry: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    challenge: string;
    solution: string;
    results: {
      metric: string;
      value: string;
    }[];
    tags: string[];
    websiteUrl?: string;
    fullDescription?: string;
  } | null;
};

export default function CaseStudyModal({
  isOpen,
  onClose,
  caseStudy,
}: CaseStudyModalProps) {
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
  if (!caseStudy) return null;

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
        className={`relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden ${
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
          <div className="relative w-full h-64 md:h-96 bg-gray-100">
            <img
              src={caseStudy.imageSrc}
              alt={caseStudy.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700">
              {caseStudy.industry}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium text-primary mb-3">
                {caseStudy.client}
              </p>
              <h2 className="text-3xl md:text-4xl font-family-primary text-gray-900 mb-4">
                {caseStudy.title}
              </h2>
              {caseStudy.websiteUrl && (
                <a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-tertiary transition-colors inline-flex items-center gap-1 text-sm"
                >
                  {caseStudy.websiteUrl.replace(/^https?:\/\//, "")}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Challenge
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Solution
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Full Description */}
            {caseStudy.fullDescription && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Details
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {caseStudy.fullDescription}
                </p>
              </div>
            )}

            {/* Results */}
            <div className="bg-secondary rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-primary" size={24} />
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Results
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {caseStudy.results.map((result, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-bold text-primary mb-2">
                      {result.value}
                    </p>
                    <p className="text-sm text-gray-600">{result.metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
