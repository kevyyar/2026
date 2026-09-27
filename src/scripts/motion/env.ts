import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** Every motion module exports `init(): Cleanup`. */
export type Cleanup = () => void;

export const noop: Cleanup = () => {};

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const DESKTOP = "(min-width: 1024px)";

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION).matches;
}

export function hasFinePointer(): boolean {
  return window.matchMedia(FINE_POINTER).matches;
}

export function $all<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** Adds an event listener and returns its removal. */
export function listen<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
export function listen<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
export function listen<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
export function listen(
  target: EventTarget,
  type: string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions,
): Cleanup {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

export function combine(cleanups: Array<Cleanup | undefined | null>): Cleanup {
  return () => {
    for (const cleanup of cleanups) cleanup?.();
  };
}
