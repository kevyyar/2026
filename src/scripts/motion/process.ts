import { gsap, ScrollTrigger, $all, DESKTOP, MOTION_OK, noop, type Cleanup } from "./env";

/**
 * Process steps.
 * Desktop: the section pins and the steps scroll horizontally with a progress bar.
 * Mobile: a vertical line draws with scroll; outlined numbers fill as they pass the centre.
 */
export function init(): Cleanup {
  const pin = document.querySelector<HTMLElement>("[data-process]");
  const track = pin?.querySelector<HTMLElement>("[data-process-track]");
  if (!pin || !track) return noop;

  const steps = $all<HTMLElement>("[data-process-step]", pin);
  const line = pin.querySelector<SVGPathElement>("[data-process-line]");
  const progress = pin.querySelector<HTMLElement>("[data-process-progress]");
  const mm = gsap.matchMedia();

  mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
    const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

    const scroll = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress) gsap.set(progress, { scaleX: self.progress });
        },
      },
    });

    for (const step of steps) {
      ScrollTrigger.create({
        trigger: step,
        containerAnimation: scroll,
        start: "left 70%",
        end: "right 30%",
        toggleClass: "is-active",
      });
    }
  });

  mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
    if (line) {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: track, start: "top 60%", end: "bottom 60%", scrub: true },
      });
    }
    for (const step of steps) {
      ScrollTrigger.create({
        trigger: step,
        start: "top 55%",
        end: "bottom 45%",
        toggleClass: "is-active",
      });
    }
  });

  return () => mm.revert();
}
