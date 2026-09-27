import { gsap, SplitText, listen, combine, noop, prefersReducedMotion, type Cleanup } from "./env";
import { scrollToTarget } from "./lenis";

/** Sizes the footer wordmark to exactly fill its container. */
function fit(wordmark: HTMLElement): void {
  const container = wordmark.parentElement;
  if (!container) return;
  const available = container.clientWidth - parseFloat(getComputedStyle(container).paddingLeft) * 2;
  wordmark.style.fontSize = "100px";
  const natural = wordmark.scrollWidth;
  if (natural > 0) wordmark.style.fontSize = `${Math.floor((available / natural) * 100 * 0.995)}px`;
}

/** Footer: fit-to-width wordmark with letters rising from a mask, and "Back to top". */
export function init(): Cleanup {
  const footer = document.querySelector<HTMLElement>("[data-footer]");
  if (!footer) return noop;
  const wordmark = footer.querySelector<HTMLElement>("[data-wordmark]");
  const backToTop = footer.querySelector<HTMLButtonElement>("[data-back-to-top]");
  const cleanups: Cleanup[] = [];

  if (wordmark) {
    const refit = () => fit(wordmark);
    refit();
    document.fonts?.ready.then(refit);
    const observer = new ResizeObserver(refit);
    observer.observe(footer);
    cleanups.push(() => observer.disconnect());

    if (!prefersReducedMotion()) {
      let split: SplitText | null = null;
      let cancelled = false;
      (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (cancelled) return;
        refit();
        split = SplitText.create(wordmark, { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: wordmark, start: "top 95%", once: true },
        });
      });
      cleanups.push(() => {
        cancelled = true;
        split?.revert();
      });
    }
  }

  if (backToTop) {
    cleanups.push(
      listen(backToTop, "click", () => {
        scrollToTarget(0);
        document.querySelector<HTMLElement>("#main")?.focus({ preventScroll: true });
      }),
    );
  }

  return combine(cleanups);
}
