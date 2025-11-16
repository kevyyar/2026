import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import CodeRain from "./CodeRain";

type HeroProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
};

export default function Hero({
  title,
  subtitle,
  ctaText = "Get started",
  ctaHref = "#",
  secondaryCtaText,
  secondaryCtaHref,
}: HeroProps) {
  return (
    <section id="home" className="bg-code relative overflow-hidden py-32 sm:py-40 flex flex-col align-center justify-center text-center">
      <CodeRain />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-8">
          <Sparkles className="text-primary" size={16} />
          <span className="text-sm font-medium text-primary">Transforming Ideas Into Digital Success</span>
        </div>
        <h1 className="heading-display text-4xl sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && (
          <p className="mt-8 text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto">{subtitle}</p>
        )}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={ctaHref} className="btn inline-flex items-center px-8 py-4 text-base">
            {ctaText}
            <ArrowRight className="ml-2" size={18} />
          </a>
          {secondaryCtaText && secondaryCtaHref && (
            <a href={secondaryCtaHref} className="btn-secondary inline-flex items-center px-8 py-4 text-base">
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
