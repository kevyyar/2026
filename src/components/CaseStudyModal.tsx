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
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${
        isAnimating && isOpen ? "overlay-enter" : "overlay-exit"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Modal */}
      <div
        className={`relative bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden ${
          isAnimating && isOpen ? "drawer-enter" : "drawer-exit"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white shadow-lg border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 bg-gray-900">
            <img
              src={caseStudy.imageSrc}
              alt={caseStudy.imageAlt}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
            <div className="absolute top-6 right-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-white border border-white/10">
              {caseStudy.industry}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 -mt-12 relative z-10">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium text-blue-400 mb-3 tracking-widest uppercase">
                {caseStudy.client}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {caseStudy.title}
              </h2>
              {caseStudy.websiteUrl && (
                <a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2 text-sm font-medium border-b border-blue-400/30 hover:border-blue-400 pb-0.5"
                >
                  {caseStudy.websiteUrl.replace(/^https?:\/\//, "")}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-l-2 border-blue-500 pl-3">
                  The Challenge
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  {caseStudy.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-l-2 border-green-500 pl-3">
                  The Solution
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Full Description */}
            {caseStudy.fullDescription && (
              <div className="mb-12">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">
                  Deep Dive
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  {caseStudy.fullDescription}
                </p>
              </div>
            )}

            {/* Results */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-8 mb-12 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="text-green-400" size={24} />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  Measurable Outcomes
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {caseStudy.results.map((result, idx) => (
                  <div key={idx} className="text-center md:text-left">
                    <p className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                      {result.value}
                    </p>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">{result.metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-full text-sm font-medium transition-colors"
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
