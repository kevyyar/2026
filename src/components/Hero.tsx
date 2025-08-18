import React from "react";
import { GithubIcon } from "lucide-react";
import CodeRain from "./CodeRain";

type HeroProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function Hero({
  title,
  subtitle,
  ctaText = "Get started",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section id="#home" className="bg-code relative overflow-hidden py-20 flex flex-col align-center justify-center text-center">
      <CodeRain />
      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="heading-display sm:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>
        )}
        <div className="mt-10">
          <a href={ctaHref} className="btn inline-flex items-center">
            {ctaText}
            <span>
              <GithubIcon className="ml-2" size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
