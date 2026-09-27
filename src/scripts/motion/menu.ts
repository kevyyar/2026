import { gsap, $all, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";
import { startScroll, stopScroll } from "./lenis";

const FOCUSABLE = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

/** Full-screen menu: circular reveal from the toggle, focus trap, Esc, scroll lock. */
export function init(): Cleanup {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return noop;

  const root = document.documentElement;
  const label = toggle.querySelector<HTMLElement>("[data-menu-label]");
  const texts = $all<HTMLElement>("[data-menu-text]", menu);
  const foot = menu.querySelector<HTMLElement>("[data-menu-foot]");
  let isOpen = false;
  let timeline: gsap.core.Timeline | null = null;

  /** Circle clip-path centred on the toggle (explicit px so GSAP can interpolate it). */
  const circle = (radius: string) => {
    const rect = toggle.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    menu.style.setProperty("--menu-x", `${x}px`);
    menu.style.setProperty("--menu-y", `${y}px`);
    return `circle(${radius} at ${x}px ${y}px)`;
  };

  const open = () => {
    if (isOpen) return;
    isOpen = true;
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    if (label) label.textContent = "Close";
    root.classList.add("menu-open");
    root.style.overflow = "hidden";
    stopScroll();
    timeline?.kill();

    if (prefersReducedMotion()) {
      menu.classList.add("is-open");
    } else {
      timeline = gsap
        .timeline()
        .fromTo(
          menu,
          { clipPath: circle("0%") },
          { clipPath: circle("150%"), duration: 0.9, ease: "expo.inOut" },
        )
        .fromTo(
          texts,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" },
          0.3,
        )
        .fromTo(foot, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.55)
        .add(() => menu.classList.add("is-open"));
    }

    menu.querySelector<HTMLElement>("[data-menu-link]")?.focus({ preventScroll: true });
  };

  const close = (restoreFocus = true) => {
    if (!isOpen) return;
    isOpen = false;
    toggle.setAttribute("aria-expanded", "false");
    if (label) label.textContent = "Menu";
    root.classList.remove("menu-open");
    root.style.overflow = "";
    startScroll();
    timeline?.kill();

    const hide = () => {
      menu.hidden = true;
      menu.classList.remove("is-open");
      gsap.set([menu, ...texts, foot], { clearProps: "all" });
    };

    if (prefersReducedMotion()) {
      hide();
    } else {
      timeline = gsap
        .timeline({ onComplete: hide })
        .to(texts, { yPercent: -110, duration: 0.45, stagger: 0.03, ease: "power3.in" })
        .to(menu, { clipPath: circle("0%"), duration: 0.7, ease: "expo.inOut" }, 0.15);
    }

    if (restoreFocus) toggle.focus({ preventScroll: true });
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (!isOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;

    const focusables = [toggle, ...$all<HTMLElement>(FOCUSABLE, menu)];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    const inside = active && focusables.includes(active);

    if (event.shiftKey && (active === first || !inside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !inside)) {
      event.preventDefault();
      first.focus();
    }
  };

  // Same-page anchors are intercepted (capture phase) by lenis.ts, which announces
  // `kb:anchor` before scrolling: close first so scrolling is unlocked.
  const onLinkClick = (event: MouseEvent) => {
    if ((event.target as Element).closest("[data-menu-link]")) close(false);
  };

  return combine([
    listen(toggle, "click", () => (isOpen ? close() : open())),
    listen(document, "keydown", onKeydown),
    listen(menu, "click", onLinkClick),
    listen(document, "kb:anchor" as keyof DocumentEventMap, () => close(false)),
    () => {
      timeline?.kill();
      if (isOpen) close(false);
      menu.hidden = true;
      root.style.overflow = "";
      root.classList.remove("menu-open");
    },
  ]);
}
