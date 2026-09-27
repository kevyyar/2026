import { gsap, hasFinePointer, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";

const HOVERABLE = "a, button, [role='button'], label, [data-cursor='hover']";

/** Dot + lagging ring cursor for fine pointers; grows on interactive elements, "View" on work cards. */
export function init(): Cleanup {
  const root = document.querySelector<HTMLElement>("[data-cursor-root]");
  const dot = root?.querySelector<HTMLElement>("[data-cursor-dot]");
  const ring = root?.querySelector<HTMLElement>("[data-cursor-ring]");
  if (!root || !dot || !ring || !hasFinePointer() || prefersReducedMotion()) return noop;

  document.documentElement.classList.add("has-cursor");

  const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
  const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    root.classList.add("is-visible");
    dotX(event.clientX);
    dotY(event.clientY);
    ringX(event.clientX);
    ringY(event.clientY);
  };

  const onOver = (event: PointerEvent) => {
    const target = event.target as Element | null;
    const view = target?.closest("[data-cursor='view']");
    root.classList.toggle("is-view", Boolean(view));
    root.classList.toggle("is-hover", !view && Boolean(target?.closest(HOVERABLE)));
  };

  const onLeave = () => root.classList.remove("is-visible");
  const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
  const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4, ease: "back.out(3)" });

  return combine([
    listen(window, "pointermove", onMove, { passive: true }),
    listen(document, "pointerover", onOver, { passive: true }),
    listen(document.documentElement, "pointerleave", onLeave),
    listen(window, "pointerdown", onDown, { passive: true }),
    listen(window, "pointerup", onUp, { passive: true }),
    () => {
      document.documentElement.classList.remove("has-cursor");
      root.classList.remove("is-visible", "is-hover", "is-view");
    },
  ]);
}
