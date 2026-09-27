import { formatMetric, parseMetric } from "../../lib/metric";
import { gsap, $all, noop, prefersReducedMotion, type Cleanup } from "./env";

/** Numeric [data-count] values count up when they enter the viewport; others stay static. */
export function init(): Cleanup {
  if (prefersReducedMotion()) return noop;
  const elements = $all<HTMLElement>("[data-count]");
  const tweens: gsap.core.Tween[] = [];

  for (const element of elements) {
    const value = element.dataset.count ?? "";
    const metric = parseMetric(value);
    if (!metric) continue;

    const from = Number(element.dataset.countFrom ?? 0);
    const state = { current: from };
    element.textContent = formatMetric(metric, from);

    tweens.push(
      gsap.to(state, {
        current: metric.number,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
        onUpdate: () => {
          element.textContent = formatMetric(metric, state.current);
        },
        onComplete: () => {
          element.textContent = value;
        },
      }),
    );
  }

  return () => {
    for (const tween of tweens) tween.kill();
    for (const element of elements) element.textContent = element.dataset.count ?? element.textContent;
  };
}
