# Portfolio Hardening — review follow-ups

## Objective
Fix the non-blocking reliability findings surfaced by the native review of the portfolio redesign (`feat/portfolio-redesign`), plus issues found while configuring Vercel. Each task is independent and sized for its own session.

## Problem / Why
The redesign passed review, but the reviewer flagged motion-runtime edge cases (content that can stay hidden or overlays that can stay up when a module fails), cleanup leaks across view-transition navigations, SEO URL fallbacks, and missing tests around user-critical flows.

## Scope
- In: the findings listed below, with tests where the logic is testable.
- Out: new features, visual redesign, copy changes.

## Constraints
- TDD strict (session config); runner Vitest (`./node_modules/.bin/vitest run`). Motion modules may need `jsdom` (or `happy-dom`) as a Vitest environment for DOM-level tests.
- Motion must keep respecting `prefers-reduced-motion` and the no-JS path.
- One Conventional Commit per task, no AI attribution.

## Tasks
- [ ] H1 Preloader failsafe — `src/scripts/motion/index.ts`, `src/scripts/motion/preloader.ts`, `src/layouts/BaseLayout.astro`. If any motion module throws during boot, `html.is-loading` and the fixed preloader overlay (z-index 180, overflow hidden) can stay forever. Add a hard timeout / error path that always releases the preloader and scroll lock. Acceptance: a test that makes a module throw still ends with the overlay removed and scrolling enabled.
- [ ] H2 `motion-failed` lost after navigation — `src/layouts/BaseLayout.astro` (inline 4s safety net + `astro:after-swap` handler). After a ClientRouter swap only `js` is re-added, so `[data-reveal]` / hero content can stay hidden if motion failed. Restore `motion-failed` on swap or re-arm the timer. Acceptance: covered by a test or a documented manual CDP check with motion disabled.
- [ ] H3 Footer cleanup leak — `src/scripts/motion/footer.ts`. Cleanup only reverts SplitText; kill the `gsap.from` tween and its ScrollTrigger, guard the first `document.fonts.ready.then(refit)` with the cancelled flag, and make `fit()` ignore zero/negative widths.
- [ ] H4 In-flight tween cleanup — `src/scripts/motion/accordion.ts` (kill panel/chip tweens; single `ScrollTrigger.refresh()` after init instead of one per item), `src/scripts/motion/tilt.ts` (`gsap.killTweensOf(inner)` before `clearProps`), `src/scripts/motion/work-stack.ts` (guard missing `[data-stack-shade]`), `src/scripts/motion/countup.ts` (reject non-finite `data-count-from`).
- [ ] H5 Next-project preview polish — `src/scripts/motion/next-project.ts`. Ease rotation back to 0 on idle/leave, and re-sync the preview position on scroll (Lenis) while the pointer is still.
- [ ] H6 Tests for critical flows — `ContactForm.tsx` submit (exact payload incl. empty optional fields, non-JSON / non-OK fallback, network error, reset on success) with Testing Library; `getProject` / `getNextProject` (wrap, unknown slug) in `src/data/projects.test.ts`; `nextIndex` in `src/pages/work/[slug].astro` should not rely on reference identity; accordion ARIA state.
- [ ] H7 SEO origin safety — `astro.config.mjs`. Outside Vercel without `SITE_URL`, `site` falls back to `http://localhost:4321` and leaks into canonical/OG URLs; an empty `SITE_URL` passes `??`. Fail the production build (or warn loudly) when no real origin is set; treat empty string as unset. Note: `SITE_URL=https://iamkev.xyz` is now set in Vercel Production.
- [ ] H8 `www` duplicate host — `https://www.iamkev.xyz` and `https://iamkev.xyz` both return 200 (no redirect). Configure a 308 redirect from `www` to the apex in Vercel domains (or `vercel.json`) so canonical content has one host.
- [ ] H9 Deterministic ids and counts — `src/components/ui/RotatingBadge.astro` uses `Math.random` for the textPath id (nondeterministic builds, possible collisions); `src/components/sections/Process.astro` hard-codes `01`/`04` progress labels instead of deriving from data.

## Acceptance criteria
- `vitest run`, `astro check`, `astro build` pass after each task.
- No regression in reduced-motion and no-JS rendering (headless check at 390px).

## Progress / Evidence
_(none yet)_

## Next step
H1 (highest user-facing risk: a stuck preloader hides the whole site).
