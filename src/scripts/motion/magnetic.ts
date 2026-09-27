import { gsap, $all, hasFinePointer, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";

const STRENGTH = 0.32;

/** Primary CTAs drift toward the pointer and spring back on leave (fine pointers only). */
export function init(): Cleanup {
  if (!hasFinePointer() || prefersReducedMotion()) return noop;
  const elements = $all<HTMLElement>("[data-magnetic]");
  if (elements.length === 0) return noop;

  return combine(
    elements.flatMap((element) => {
      const x = gsap.quickTo(element, "x", { duration: 0.6, ease: "power3.out" });
      const y = gsap.quickTo(element, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        x((event.clientX - (rect.left + rect.width / 2)) * STRENGTH);
        y((event.clientY - (rect.top + rect.height / 2)) * STRENGTH);
      };
      const onLeave = () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: true });
      };

      return [
        listen(element, "pointermove", onMove),
        listen(element, "pointerleave", onLeave),
        () => gsap.set(element, { clearProps: "transform" }),
      ];
    }),
  );
}
