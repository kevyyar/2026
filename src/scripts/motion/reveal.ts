import { gsap, ScrollTrigger, SplitText, $all, noop, prefersReducedMotion, type Cleanup } from "./env";

/**
 * Reusable scroll reveals:
 *   data-reveal="fade"  — rise + fade (batched)
 *   data-reveal="lines" — masked line reveal
 *   data-reveal="rule"  — 1px rule draws from the left
 *   data-reveal="clip"  — inset clip-path opens
 * Optional data-reveal-delay (seconds).
 */
export function init(): Cleanup {
  if (prefersReducedMotion()) return noop;

  const triggers: ScrollTrigger[] = [];
  const splits: SplitText[] = [];
  const delayOf = (el: Element) => Number((el as HTMLElement).dataset.revealDelay ?? 0);

  const fades = $all("[data-reveal='fade']");
  if (fades.length) {
    triggers.push(
      ...ScrollTrigger.batch(fades, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            delay: delayOf(batch[0]),
          }),
      }),
    );
  }

  for (const el of $all("[data-reveal='lines']")) {
    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      },
    });
    splits.push(split);
  }

  for (const el of $all("[data-reveal='rule']")) {
    gsap.to(el, {
      scaleX: 1,
      duration: 1.4,
      ease: "expo.inOut",
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  }

  for (const el of $all("[data-reveal='clip']")) {
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0% round 20px)",
      duration: 1.4,
      ease: "expo.out",
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  }

  return () => {
    for (const trigger of triggers) trigger.kill();
    for (const split of splits) split.revert();
  };
}
