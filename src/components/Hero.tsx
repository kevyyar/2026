import React from "react";
import { GithubIcon } from "lucide-react";

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
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Example interactivity; replace with your logic
    console.log("CTA clicked");
  }

  return (
    <section className="bg-grid py-20 flex flex-col align-center justify-center text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="heading-display text-gray-900 sm:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>
        )}
        <div className="mt-10">
          <a href={ctaHref} onClick={handleClick} className="btn inline-flex items-center">
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
