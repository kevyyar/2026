import { gsap, SplitText, noop, prefersReducedMotion, type Cleanup } from "./env";

/** Manifesto words brighten from 15% to 100% opacity as the paragraph scrolls through. */
export function init(): Cleanup {
  const statement = document.querySelector<HTMLElement>("[data-manifesto]");
  if (!statement || prefersReducedMotion()) return noop;

  const split = SplitText.create(statement, {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
  });

  return () => split.revert();
}
