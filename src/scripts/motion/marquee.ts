import { gsap, ScrollTrigger, $all, noop, prefersReducedMotion, type Cleanup } from "./env";

/** Percent of the track travelled per second at rest (the track holds 4 identical groups). */
const BASE_SPEED = 25 / 24;

/** Crossed marquee bands; scroll velocity speeds them up and scrolling up reverses them. */
export function init(): Cleanup {
  const bands = $all<HTMLElement>("[data-marquee-band]");
  if (bands.length === 0 || prefersReducedMotion()) return noop;

  const loops = bands.flatMap((band) => {
    const track = band.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return [];
    return [
      {
        direction: Number(band.dataset.direction ?? 1),
        position: -12.5,
        setX: gsap.quickSetter(track, "xPercent") as (value: number) => void,
      },
    ];
  });

  const boost = { value: 1 };
  let scrollSign = 1;
  let visible = true;
  const wrap = gsap.utils.wrap(-25, 0);

  const velocity = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      scrollSign = self.direction;
      gsap.killTweensOf(boost);
      boost.value = gsap.utils.clamp(1, 8, 1 + Math.abs(self.getVelocity()) / 300);
      gsap.to(boost, { value: 1, duration: 1.2, ease: "power3.out" });
    },
  });

  const tick = (_time: number, deltaTime: number) => {
    if (!visible) return;
    const distance = (BASE_SPEED * boost.value * scrollSign * Math.min(deltaTime, 64)) / 1000;
    for (const loop of loops) {
      // Positive direction moves right, negative moves left.
      loop.position = wrap(loop.position + distance * loop.direction);
      loop.setX(loop.position);
    }
  };
  gsap.ticker.add(tick);

  const container = bands[0].closest<HTMLElement>("[data-marquee]");
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  if (container) observer.observe(container);

  return () => {
    gsap.ticker.remove(tick);
    velocity.kill();
    observer.disconnect();
    gsap.killTweensOf(boost);
  };
}
