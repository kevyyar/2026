import { gsap, noop, type Cleanup } from "./env";
import { releaseIntro, resetIntro } from "./intro";
import { startScroll } from "./lenis";

const VISITED_KEY = "kb:visited";

function markVisited(): void {
  try {
    sessionStorage.setItem(VISITED_KEY, "1");
  } catch {
    /* storage unavailable: the preloader may show again, which is harmless */
  }
}

/**
 * First visit per session only. The decision is made by the inline head script
 * (html.is-loading), which never sets it for reduced motion or client-side navigations.
 */
export function init(): Cleanup {
  const root = document.documentElement;
  const element = document.querySelector<HTMLElement>("[data-preloader]");

  if (!element || !root.classList.contains("is-loading")) {
    markVisited();
    releaseIntro();
    return noop;
  }

  resetIntro();
  const count = element.querySelector<HTMLElement>("[data-preloader-count]");
  const mark = element.querySelector<HTMLElement>("[data-preloader-mark]");
  const panel = element.querySelector<HTMLElement>("[data-preloader-panel]");
  const counter = { value: 0 };

  const finish = () => {
    root.classList.remove("is-loading");
    markVisited();
    startScroll();
    releaseIntro();
  };

  gsap.set(element, { clipPath: "inset(0 0 0% 0)" });
  const timeline = gsap.timeline({ onComplete: finish });
  timeline
    .from(mark, { scale: 0.6, rotate: -12, opacity: 0, duration: 0.6, ease: "expo.out" }, 0)
    .to(
      counter,
      {
        value: 100,
        duration: 1.05,
        ease: "power3.inOut",
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(counter.value)).padStart(3, "0");
        },
      },
      0,
    )
    .to(panel, { clipPath: "inset(0% 0 0 0)", duration: 0.42, ease: "expo.inOut" }, 0.95)
    .to(mark, { scale: 0.85, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.95)
    .add(() => releaseIntro(), 1.3)
    .to(element, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "expo.inOut" }, 1.3);

  return () => {
    timeline.kill();
    finish();
  };
}
