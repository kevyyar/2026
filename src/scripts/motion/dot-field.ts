import { combine, listen, noop, prefersReducedMotion, type Cleanup } from "./env";

const INK = "rgba(20, 18, 16, 0.42)";
const SIGNAL = "#FF4A1C";
const SPRING = 0.045;
const DAMPING = 0.86;
const IDLE_AFTER_MS = 1600;

type Ripple = { x: number; y: number; born: number };

/**
 * Interactive dot grid behind the hero. Dots are springs anchored to a grid:
 * the pointer (mouse or touch) repels them, taps send a ripple, and when nobody
 * interacts a slow wave keeps the field breathing. Pauses off-screen and in
 * background tabs; draws a single static frame for reduced motion.
 */
export function init(): Cleanup {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-dot-field]");
  const host = canvas?.closest<HTMLElement>("[data-hero]");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !host || !ctx) return noop;

  const reduced = prefersReducedMotion();
  let width = 0;
  let height = 0;
  let count = 0;
  let ox = new Float32Array(0);
  let oy = new Float32Array(0);
  let px = new Float32Array(0);
  let py = new Float32Array(0);
  let vx = new Float32Array(0);
  let vy = new Float32Array(0);
  let accent = new Uint8Array(0);

  const pointer = { x: -9999, y: -9999, active: false, last: 0 };
  const ripples: Ripple[] = [];
  let radius = 140;
  let frame = 0;
  let running = false;
  let inView = true;
  let lastTime = 0;
  let idle = 1;

  const build = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gap = width < 640 ? 26 : 34;
    radius = width < 640 ? 110 : 150;
    const cols = Math.ceil(width / gap) + 1;
    const rows = Math.ceil(height / gap) + 1;
    const offsetX = (width - (cols - 1) * gap) / 2;
    const offsetY = (height - (rows - 1) * gap) / 2;
    count = cols * rows;
    ox = new Float32Array(count);
    oy = new Float32Array(count);
    px = new Float32Array(count);
    py = new Float32Array(count);
    vx = new Float32Array(count);
    vy = new Float32Array(count);
    accent = new Uint8Array(count);

    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    for (let row = 0, i = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++, i++) {
        ox[i] = px[i] = offsetX + col * gap;
        oy[i] = py[i] = offsetY + row * gap;
        accent[i] = random() < 0.025 ? 1 : 0;
      }
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (const pass of [0, 1]) {
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        if (accent[i] !== pass) continue;
        const dx = px[i] - ox[i];
        const dy = py[i] - oy[i];
        const displacement = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.07, 2.2);
        const r = (pass ? 2.1 : 1.15) + displacement;
        ctx.moveTo(px[i] + r, py[i]);
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
      }
      ctx.fillStyle = pass ? SIGNAL : INK;
      ctx.fill();
    }
  };

  const step = (time: number) => {
    const dt = Math.min((time - (lastTime || time)) / 16.667, 2.5);
    lastTime = time;

    const quiet = time - pointer.last > IDLE_AFTER_MS;
    idle += ((quiet ? 1 : 0) - idle) * 0.02 * dt;
    const waveTime = time * 0.0011;
    const r2 = radius * radius;

    for (let r = ripples.length - 1; r >= 0; r--) {
      if (time - ripples[r].born > 1100) ripples.splice(r, 1);
    }

    for (let i = 0; i < count; i++) {
      const waveX = Math.sin(waveTime + oy[i] * 0.012) * 4 * idle;
      const waveY = Math.cos(waveTime * 0.8 + ox[i] * 0.01) * 4 * idle;
      let ax = (ox[i] + waveX - px[i]) * SPRING;
      let ay = (oy[i] + waveY - py[i]) * SPRING;

      if (pointer.active) {
        const dx = px[i] - pointer.x;
        const dy = py[i] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / radius) ** 2 * 3.2;
          ax += (dx / d) * force;
          ay += (dy / d) * force;
        }
      }

      for (const ripple of ripples) {
        const front = ((time - ripple.born) / 1100) * Math.max(width, height) * 0.7;
        const dx = px[i] - ripple.x;
        const dy = py[i] - ripple.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const band = Math.abs(d - front);
        if (band < 36) {
          const force = (1 - band / 36) * 2.4 * (1 - (time - ripple.born) / 1100);
          ax += (dx / d) * force;
          ay += (dy / d) * force;
        }
      }

      vx[i] = (vx[i] + ax * dt) * DAMPING;
      vy[i] = (vy[i] + ay * dt) * DAMPING;
      px[i] += vx[i] * dt;
      py[i] += vy[i] * dt;
    }

    draw();
    frame = requestAnimationFrame(step);
  };

  const start = () => {
    if (running || reduced || !inView || document.hidden) return;
    running = true;
    lastTime = 0;
    frame = requestAnimationFrame(step);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const toLocal = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
    pointer.active = true;
    pointer.last = performance.now();
  };

  const ripple = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    ripples.push({ x: clientX - rect.left, y: clientY - rect.top, born: performance.now() });
    if (ripples.length > 4) ripples.shift();
  };

  build();
  draw();

  if (reduced) {
    const observer = new ResizeObserver(() => {
      build();
      draw();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }

  const resizeObserver = new ResizeObserver(() => {
    build();
    draw();
  });
  resizeObserver.observe(canvas);

  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) start();
    else stop();
  });
  visibility.observe(canvas);

  const release = () => {
    pointer.active = false;
  };

  start();

  return combine([
    listen(host, "pointermove", (event) => {
      if (event.pointerType === "mouse") toLocal(event.clientX, event.clientY);
    }),
    listen(host, "pointerleave", release),
    listen(host, "pointerdown", (event) => {
      if (event.pointerType === "mouse") ripple(event.clientX, event.clientY);
    }),
    listen(
      host,
      "touchstart",
      (event) => {
        const touch = event.touches[0];
        if (!touch) return;
        toLocal(touch.clientX, touch.clientY);
        ripple(touch.clientX, touch.clientY);
      },
      { passive: true },
    ),
    listen(
      host,
      "touchmove",
      (event) => {
        const touch = event.touches[0];
        if (touch) toLocal(touch.clientX, touch.clientY);
      },
      { passive: true },
    ),
    listen(host, "touchend", release, { passive: true }),
    listen(document, "visibilitychange", () => (document.hidden ? stop() : start())),
    () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
    },
  ]);
}
