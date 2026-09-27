import { gsap, $all, noop, prefersReducedMotion, type Cleanup } from "./env";

/**
 * Sticky stacked project cards: as the next card arrives, the previous one
 * scales down and dims. Card images drift inside their frames (parallax).
 */
export function init(): Cleanup {
  const items = $all<HTMLElement>("[data-stack-item]");
  if (items.length === 0 || prefersReducedMotion()) return noop;

  const tweens: gsap.core.Animation[] = [];

  items.forEach((item, index) => {
    const card = item.querySelector<HTMLElement>("[data-stack-card]");
    const shade = item.querySelector<HTMLElement>("[data-stack-shade]");
    const image = item.querySelector<HTMLElement>("[data-parallax]");
    const next = items[index + 1];

    if (card && next) {
      const stickyTop = () => parseFloat(getComputedStyle(next).top) || 0;
      tweens.push(
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => `top ${stickyTop()}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(card, { scale: 0.9, ease: "none" }, 0)
          .to(shade, { opacity: 0.45, ease: "none" }, 0),
      );
    }

    if (image) {
      tweens.push(
        gsap.fromTo(
          image,
          { scale: 1.14, yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          },
        ),
      );
    }
  });

  return () => {
    for (const tween of tweens) {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
}
