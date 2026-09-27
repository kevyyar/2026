import { $all, listen, combine, noop, type Cleanup } from "./env";

/**
 * "Copy" buttons next to the mailto link. They render hidden (no-JS users get the
 * plain mailto link) and are only revealed when the Clipboard API is available.
 */
export function init(): Cleanup {
  const buttons = $all<HTMLButtonElement>("[data-copy]");
  if (buttons.length === 0 || !navigator.clipboard?.writeText) return noop;

  const timers: number[] = [];

  return combine([
    ...buttons.map((button) => {
      const label = button.querySelector<HTMLElement>("[data-copy-label]");
      const status = button.closest("[data-copy-scope]")?.querySelector<HTMLElement>("[data-copy-status]");
      const idle = label?.textContent ?? "";
      const done = button.dataset.copyDone ?? "Copied";
      const failed = button.dataset.copyFailed ?? "Copy failed — use the email link";
      button.hidden = false;

      return listen(button, "click", async () => {
        const text = button.dataset.copy ?? "";
        let ok = true;
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          ok = false;
        }
        button.classList.toggle("is-copied", ok);
        if (label) label.textContent = ok ? done : idle;
        if (status) status.textContent = ok ? `${done}: ${text}` : failed;
        timers.push(
          window.setTimeout(() => {
            button.classList.remove("is-copied");
            if (label) label.textContent = idle;
            if (status) status.textContent = "";
          }, 2400),
        );
      });
    }),
    () => {
      for (const timer of timers) window.clearTimeout(timer);
      for (const button of buttons) button.hidden = true;
    },
  ]);
}
