import React, { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import CodeRain from "./CodeRain";
import gsap from "gsap";

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
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black selection:bg-blue-500/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-dark z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-black z-0 pointer-events-none" />
      
      <CodeRain className="opacity-40 z-0" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Sparkles className="text-blue-400" size={14} />
          <span className="text-sm font-medium text-blue-200 tracking-wide uppercase">
            Digital Reality Architect
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="heading-display text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500"
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            ref={subtitleRef}
            className="mt-6 text-xl md:text-2xl leading-relaxed text-gray-400 max-w-3xl mx-auto font-light"
          >
            {subtitle}
          </p>
        )}

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto"
        >
          <a
            href={ctaHref}
            className="btn px-8 py-4 text-lg w-full sm:w-auto justify-center group"
          >
            {ctaText}
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
          </a>
          {secondaryCtaText && secondaryCtaHref && (
            <a
              href={secondaryCtaHref}
              className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto justify-center"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
