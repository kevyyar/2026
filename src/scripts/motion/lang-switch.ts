import { $all, listen, combine, noop, type Cleanup } from "./env";

/**
 * Language links point at the equivalent page in the other locale. Section ids are
 * identical across locales, so the current #hash is carried over on click.
 */
export function init(): Cleanup {
  const links = $all<HTMLAnchorElement>("[data-lang-link]");
  if (links.length === 0) return noop;

  return combine(
    links.map((link) =>
      listen(link, "click", () => {
        const { hash } = window.location;
        if (!hash || link.getAttribute("aria-current") === "true") return;
        const url = new URL(link.href);
        url.hash = hash;
        link.href = url.href;
      }),
    ),
  );
}
