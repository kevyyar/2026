import { gsap, $all, hasFinePointer, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";

const MAX_TILT = 7;

/** Principle cards tilt toward a fine pointer. */
export function init(): Cleanup {
  if (!hasFinePointer() || prefersReducedMotion()) return noop;
  const cards = $all<HTMLElement>("[data-tilt]");

  return combine(
    cards.flatMap((card) => {
      const inner = card.querySelector<HTMLElement>("[data-tilt-inner]") ?? card;
      gsap.set(inner, { transformPerspective: 900 });
      const rotateX = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
      const rotateY = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });

      return [
        listen(card, "pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(x * MAX_TILT * 2);
          rotateX(-y * MAX_TILT * 2);
        }),
        listen(card, "pointerleave", () => {
          rotateX(0);
          rotateY(0);
        }),
        () => gsap.set(inner, { clearProps: "transform" }),
      ];
    }),
  );
}
