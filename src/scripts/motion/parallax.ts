import { gsap, $all, noop, prefersReducedMotion, type Cleanup } from "./env";

/** Images marked [data-parallax] drift inside their frames while scrolling past. */
export function init(): Cleanup {
  const images = $all<HTMLElement>("[data-parallax]");
  if (images.length === 0 || prefersReducedMotion()) return noop;

  const tweens = images.map((image) =>
    gsap.fromTo(
      image,
      { scale: 1.14, yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: image.closest("figure") ?? image,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    ),
  );

  return () => {
    for (const tween of tweens) {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
}
