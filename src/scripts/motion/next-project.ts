import { gsap, hasFinePointer, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";

/** "Next project" band: the next project's screenshot follows a fine pointer while hovering. */
export function init(): Cleanup {
  const band = document.querySelector<HTMLElement>("[data-next]");
  const preview = band?.querySelector<HTMLElement>("[data-next-preview]");
  if (!band || !preview || !hasFinePointer() || prefersReducedMotion()) return noop;

  gsap.set(preview, { scale: 0.6 });
  const x = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
  const y = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
  const rotate = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3.out" });
  let lastX = 0;

  const place = (event: PointerEvent) => {
    const rect = band.getBoundingClientRect();
    const localX = event.clientX - rect.left - preview.offsetWidth / 2;
    const localY = event.clientY - rect.top - preview.offsetHeight / 2;
    x(localX);
    y(localY);
    rotate(gsap.utils.clamp(-8, 8, (event.clientX - lastX) * 0.4));
    lastX = event.clientX;
  };

  return combine([
    listen(band, "pointerenter", (event) => {
      const rect = band.getBoundingClientRect();
      gsap.set(preview, {
        x: event.clientX - rect.left - preview.offsetWidth / 2,
        y: event.clientY - rect.top - preview.offsetHeight / 2,
      });
      lastX = event.clientX;
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out", overwrite: "auto" });
    }),
    listen(band, "pointermove", place),
    listen(band, "pointerleave", () => {
      gsap.to(preview, { opacity: 0, scale: 0.6, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    }),
  ]);
}
