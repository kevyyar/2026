import { ScrollTrigger, type Cleanup } from "./env";
import * as lenis from "./lenis";
import * as preloader from "./preloader";
import * as nav from "./nav";
import * as menu from "./menu";
import * as clock from "./clock";
import * as cursor from "./cursor";
import * as magnetic from "./magnetic";
import * as reveal from "./reveal";
import * as hero from "./hero";
import * as dotField from "./dot-field";
import * as marquee from "./marquee";
import * as manifesto from "./manifesto";
import * as countUp from "./countup";
import * as parallax from "./parallax";
import * as accordion from "./accordion";
import * as process from "./process";
import * as tilt from "./tilt";
import * as footer from "./footer";
import * as copyEmail from "./copy-email";

type MotionModule = { init: () => Cleanup };

/** Order matters: Lenis before the preloader (it unlocks scroll), preloader before intros. */
const modules: MotionModule[] = [
  lenis,
  preloader,
  nav,
  menu,
  clock,
  cursor,
  magnetic,
  hero,
  dotField,
  marquee,
  manifesto,
  accordion,
  parallax,
  process,
  reveal,
  countUp,
  tilt,
  footer,
  copyEmail,
];

let cleanups: Cleanup[] = [];

function boot(): void {
  teardown();
  document.documentElement.classList.add("motion-ready");
  ScrollTrigger.config({ ignoreMobileResize: true });

  for (const module of modules) {
    try {
      cleanups.push(module.init());
    } catch (error) {
      console.error("[motion] init failed", error);
    }
  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

function teardown(): void {
  for (const cleanup of cleanups.splice(0)) {
    try {
      cleanup();
    } catch (error) {
      console.error("[motion] cleanup failed", error);
    }
  }
  for (const trigger of ScrollTrigger.getAll()) trigger.kill();
}

document.addEventListener("astro:page-load", boot);
document.addEventListener("astro:before-swap", teardown);
