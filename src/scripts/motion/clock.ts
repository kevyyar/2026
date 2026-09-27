import { $all, noop, type Cleanup } from "./env";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Mexico_City",
});

/** Live local time (America/Mexico_City) in every [data-clock], refreshed on each minute. */
export function init(): Cleanup {
  const clocks = $all<HTMLTimeElement>("[data-clock]");
  if (clocks.length === 0) return noop;

  let timer = 0;
  const render = () => {
    const now = new Date();
    const text = formatter.format(now);
    for (const clock of clocks) {
      clock.textContent = text;
      clock.dateTime = now.toISOString();
    }
    timer = window.setTimeout(render, 60_000 - (now.getTime() % 60_000) + 50);
  };
  render();

  return () => window.clearTimeout(timer);
}
