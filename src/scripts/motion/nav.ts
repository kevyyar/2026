import { gsap, ScrollTrigger, combine, noop, type Cleanup } from "./env";

/** Scroll progress bar + hide-on-scroll-down / show-on-scroll-up navigation. */
export function init(): Cleanup {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (!nav) return noop;

  const bar = nav.querySelector<HTMLElement>("[data-scroll-progress]");
  const progress = bar
    ? gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      })
    : null;

  const visibility = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      if (document.documentElement.classList.contains("menu-open")) return;
      const hide = self.direction === 1 && self.scroll() > 160;
      nav.classList.toggle("is-hidden", hide);
    },
  });

  const showOnFocus = () => nav.classList.remove("is-hidden");
  nav.addEventListener("focusin", showOnFocus);

  return combine([
    () => progress?.scrollTrigger?.kill(),
    () => progress?.kill(),
    () => visibility.kill(),
    () => nav.removeEventListener("focusin", showOnFocus),
  ]);
}
