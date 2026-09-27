import Lenis from "lenis";
import { gsap, ScrollTrigger, listen, prefersReducedMotion, type Cleanup } from "./env";

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

function navOffset(): number {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  return nav ? -Math.round(nav.getBoundingClientRect().height * 0.6) : 0;
}

/** Scrolls to an element or position, through Lenis when active. */
export function scrollToTarget(target: HTMLElement | number, immediate = false): void {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : navOffset(), immediate });
    return;
  }
  const top =
    typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + navOffset();
  window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
}

export function stopScroll(): void {
  lenis?.stop();
}

export function startScroll(): void {
  lenis?.start();
}

/** Same-page anchor links scroll smoothly (with nav offset) and move focus to the target. */
function onAnchorClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
  if (!link || link.target === "_blank") return;

  const url = new URL(link.href, window.location.href);
  if (url.pathname !== window.location.pathname || !url.hash) return;

  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;

  event.preventDefault();
  document.dispatchEvent(new CustomEvent("kb:anchor"));
  scrollToTarget(target);

  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export function init(): Cleanup {
  const removeAnchors = listen(document, "click", onAnchorClick, { capture: true });

  if (prefersReducedMotion()) return removeAnchors;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  });

  const instance = lenis;
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  if (document.documentElement.classList.contains("is-loading")) instance.stop();

  return () => {
    removeAnchors();
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}
