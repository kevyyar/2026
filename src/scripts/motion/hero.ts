import { gsap, SplitText, $all, noop, prefersReducedMotion, type Cleanup } from "./env";
import { whenIntroReady } from "./intro";

/** Hero intro (masked per-character title reveal) and scroll-out as the next sheet slides over. */
export function init(): Cleanup {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero || prefersReducedMotion()) return noop;

  const title = hero.querySelector<HTMLElement>("[data-hero-title]");
  const content = hero.querySelector<HTMLElement>("[data-hero-content]");
  const fades = $all<HTMLElement>("[data-hero-fade]", hero);
  const badge = hero.querySelector<HTMLElement>("[data-hero-badge]");
  const canvas = hero.querySelector<HTMLElement>("[data-dot-field]");
  let cancelled = false;
  let split: SplitText | null = null;

  let intro: gsap.core.Timeline | null = null;

  const play = () => {
    if (cancelled) return;
    intro = gsap.timeline({
      defaults: { ease: "expo.out" },
      // Restore natural text so the title reflows on resize after the intro.
      onComplete: () => split?.revert(),
    });

    if (title) {
      // Split only after fonts load so line breaks match the final layout.
      split = SplitText.create(title, { type: "lines,chars", mask: "lines", linesClass: "split-line" });
      gsap.set(title, { visibility: "visible" });
      intro.from(split.chars, { yPercent: 115, rotate: 6, duration: 1.25, stagger: 0.022 }, 0);
    }
    if (fades.length) {
      gsap.set(fades, { y: 24 });
      intro.to(fades, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.45);
    }
    if (badge) intro.from(badge, { scale: 0.4, rotate: -90, opacity: 0, duration: 1.4 }, 0.6);
    if (canvas) intro.from(canvas, { opacity: 0, duration: 1.6, ease: "power2.out" }, 0.2);
  };

  Promise.all([document.fonts?.ready, whenIntroReady()]).then(play);

  const scrollOut = content
    ? gsap.to(content, {
        yPercent: 22,
        scale: 0.94,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      })
    : null;

  return () => {
    cancelled = true;
    intro?.kill();
    scrollOut?.scrollTrigger?.kill();
    scrollOut?.kill();
    split?.revert();
  };
}
