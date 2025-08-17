import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

type CodeRainProps = {
  /**
   * Number of symbols to render. If not provided, a responsive number is chosen.
   */
  count?: number;
  /**
   * The list of symbols to rain down. Provide simple strings; they’ll be rendered as text.
   */
  symbols?: string[];
  /**
   * Optional className for the container (positioning etc. handled internally).
   */
  className?: string;
  /**
   * Minimum and maximum fall duration in seconds for each symbol.
   */
  speedRange?: { min: number; max: number };
  /**
   * Control base opacity range per symbol. Final value is randomized within this range.
   */
  opacityRange?: { min: number; max: number };
  /**
   * Font size range in px. Randomized per symbol.
   */
  fontSizeRange?: { min: number; max: number };
};

type SymbolSpec = {
  text: string;
  fontSize: number;
  opacity: number;
  rotate: number;
  leftPct: number;
  topPct: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export default function CodeRain({
  count,
  symbols = [
    "{}",
    "[]",
    "()",
    "<>",
    "</>",
    "<code/>",
    "</code>",
    "</>",
    "::",
    "=>",
    "</html>",
    "<div/>",
    "</script>",
    "export",
    "import",
    "() => {}"
  ],
  className = "",
  speedRange = { min: 8, max: 16 },
  opacityRange = { min: 0.12, max: 0.28 },
  fontSizeRange = { min: 14, max: 38 },
}: CodeRainProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Track container size to adapt animation bounds and density
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initialize with current size
    const rect = el.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    // Watch for resize to keep animations within bounds
    const ro =
      "ResizeObserver" in window
        ? new ResizeObserver((entries) => {
            const r = entries[0]?.contentRect;
            if (r) setSize({ width: r.width, height: r.height });
          })
        : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  const effectiveCount = useMemo(() => {
    if (typeof count === "number") return count;
    // Responsive defaults based on container width
    if (size.width >= 1024) return 48;
    if (size.width >= 640) return 26;
    return 14;
  }, [count, size.width]);

  const specs: SymbolSpec[] = useMemo(() => {
    const items: SymbolSpec[] = [];
    const minFS = fontSizeRange.min;
    const maxFS = fontSizeRange.max;
    const minOp = opacityRange.min;
    const maxOp = opacityRange.max;
    for (let i = 0; i < effectiveCount; i++) {
      items.push({
        text: pick(symbols),
        fontSize: Math.round(rand(minFS, maxFS)),
        opacity: clamp(rand(minOp, maxOp), 0, 1),
        rotate: Math.round(rand(-40, 40)),
        // For reduced-motion static layout, scatter using percentages
        leftPct: rand(3, 97),
        topPct: rand(0, 100),
      });
    }
    return items;
  }, [effectiveCount, symbols, fontSizeRange.min, fontSizeRange.max, opacityRange.min, opacityRange.max]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (reducedMotion) return; // Respect reduced motion: no animations

    // Clear any previous animations within this container
    gsap.killTweensOf(el.querySelectorAll(".js-code-symbol"));

    const width = size.width || el.clientWidth || 0;
    const height = size.height || el.clientHeight || 0;
    if (!width || !height) return;

    // Create a tween for each symbol
    const nodes = Array.from(el.querySelectorAll<HTMLSpanElement>(".js-code-symbol"));

    const cleanups: Array<() => void> = [];

    nodes.forEach((node) => {
      // Randomize starting params
      const startX = rand(0, width);
      const startY = rand(-300, -50);
      const endY = height + 100;
      const startRot = rand(-45, 45);
      const rotDelta = rand(-90, 90);
      const duration = rand(speedRange.min, speedRange.max);
      const delay = rand(0, 6);
      const sway = rand(8, 40);
      const swayDur = rand(2.5, 6);

      gsap.set(node, {
        x: startX,
        y: startY,
        rotate: startRot,
        force3D: true,
        willChange: "transform, opacity",
      });

      // Vertical fall
      const fall = gsap.to(node, {
        y: endY,
        rotate: startRot + rotDelta,
        duration,
        ease: "none",
        delay,
        repeat: -1,
        onRepeat: () => {
          // On each loop, respawn at a new horizontal position and slightly different rotation
          gsap.set(node, {
            x: rand(0, width),
            y: rand(-300, -50),
            rotate: rand(-45, 45),
          });
        },
      });

      // Subtle horizontal sway
      const swayTween = gsap.to(node, {
        x: `+=${sway}`,
        duration: swayDur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });

      // Keep references to kill on cleanup
      cleanups.push(() => {
        fall.kill();
        swayTween.kill();
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [reducedMotion, size.height, size.width, speedRange.max, speedRange.min]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className || ""}`}
      aria-hidden="true"
      style={{
        // Ensure it sits behind hero content by default; content can set higher z-index
        zIndex: 0,
        fontFamily: "var(--font-family-secondary)",
      }}
    >
      {specs.map((s, i) => (
        <span
          key={i}
          className="js-code-symbol absolute"
          style={{
            color: "var(--color-primary)",
            opacity: s.opacity,
            fontSize: `${s.fontSize}px`,
            // For reduced motion, statically scatter with percent-based positioning
            left: reducedMotion ? `${s.leftPct}%` : 0,
            top: reducedMotion ? `${s.topPct}%` : 0,
            transform: reducedMotion
              ? `translate3d(-50%, -50%, 0) rotate(${s.rotate}deg)`
              : undefined,
            whiteSpace: "pre",
          }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
