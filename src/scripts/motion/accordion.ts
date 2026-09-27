import { gsap, ScrollTrigger, $all, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";

/**
 * Services accordion. Panels render open (readable without JS); on init all but
 * the first collapse. Buttons carry aria-expanded / aria-controls.
 */
export function init(): Cleanup {
  const items = $all<HTMLElement>("[data-accordion-item]");
  if (items.length === 0) return noop;
  const reduced = prefersReducedMotion();

  const setState = (item: HTMLElement, open: boolean, animate: boolean) => {
    const button = item.querySelector<HTMLButtonElement>("[data-accordion-button]");
    const panel = item.querySelector<HTMLElement>("[data-accordion-panel]");
    if (!button || !panel) return;

    button.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
    gsap.killTweensOf(panel);

    if (!animate || reduced) {
      panel.hidden = !open;
      gsap.set(panel, { clearProps: "height" });
      ScrollTrigger.refresh();
      return;
    }

    if (open) {
      panel.hidden = false;
      gsap.fromTo(
        panel,
        { height: 0 },
        { height: "auto", duration: 0.7, ease: "expo.out", onComplete: () => ScrollTrigger.refresh() },
      );
      gsap.fromTo(
        panel.querySelectorAll(".chip"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "expo.out", delay: 0.1 },
      );
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.5,
        ease: "expo.inOut",
        onComplete: () => {
          panel.hidden = true;
          gsap.set(panel, { clearProps: "height" });
          ScrollTrigger.refresh();
        },
      });
    }
  };

  items.forEach((item, index) => setState(item, index === 0, false));

  return combine(
    items.map((item) => {
      const button = item.querySelector<HTMLButtonElement>("[data-accordion-button]");
      if (!button) return noop;
      return listen(button, "click", () => {
        setState(item, button.getAttribute("aria-expanded") !== "true", true);
      });
    }),
  );
}
