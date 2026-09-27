# Portfolio Redesign — "A software studio of one"

## Objective
Full redesign (layout, palette, typography, copy, motion) of the Astro portfolio to present Kevin Barreto as an independent software developer, consultant and freelancer. Mobile-first, light (non-white) theme, high-end animation.

## Problem / Why
The current site is a generic dark "glass + gradient" template with inflated copy ("Digital Reality Architect"), full-React hydration of static sections, unoptimized 1–5 MB screenshots, no SEO meta, no footer, and the career history is never rendered. It does not read as a credible independent consultant.

## Scope
- In: every section, copy, design tokens, fonts, motion system, case-study detail pages, SEO meta, image optimization, contact form UI.
- Keep verbatim: all 4 case studies (industry, title, challenge, solution, results, tags, URLs, fullDescription, images), services list, process steps + deliverables, work experience entries, contact form fields/options and the `/api/contact` request/response contract.
- Out: new projects, invented stats, publishing personal email/phone (not provided), deployment.

## Constraints
- Artifacts (code, UI copy) in English.
- `prefers-reduced-motion` fully respected; content visible without JS.
- Delivery strategy: `single-pr` (personal portfolio, single reviewer; recorded by orchestrator).
- TDD: strict mode enabled by session config (`Strict TDD Mode: enabled`). Runner: none existed → Vitest added in T1. Applies to pure logic (content integrity, metric parsing, contact validation); visual work verified by build + headless mobile screenshots.

## Tasks
- [x] T1 Foundation — tokens, fonts, BaseLayout, typed content modules (`src/data`), metric parser, contact validation extraction, Vitest (RED→GREEN). Route: delegated (writer trigger: 2+ non-trivial files).
- [x] T2 Shell + signature motion — preloader, nav + full-screen menu, cursor, Lenis, progress bar, hero particle field, marquee. Route: delegated.
- [x] T3 Content sections — manifesto, work stack cards, services, process, experience, principles. Route: delegated.
- [x] T4 Case study pages `/work/[slug]` with view transitions. Route: delegated.
- [ ] T5 Contact + footer, SEO meta, remove legacy components/deps, README. Route: delegated.
- [ ] T6 Verification — tests, build, mobile/desktop headless screenshots, reduced-motion pass. Route: delegated + parent spot check.

## Acceptance criteria
- `astro build` passes; `vitest run` passes.
- All 4 projects with unchanged data reachable from home and `/work/<slug>`.
- Contact form posts the same payload to `/api/contact`; API responses unchanged.
- No horizontal scroll at 360px; tap targets ≥ 44px.
- Reduced-motion users get static, fully readable content.

## Progress / Evidence
_(updated per task: commit SHA, checks run, review assessment)_

TDD: strict, source = session config; runner = Vitest 3.2 (`./node_modules/.bin/vitest run`, config via Astro `getViteConfig`).

### T1 Foundation
- RED: `./node_modules/.bin/vitest run` → 3 files failed, 0 tests (`Cannot find module './metric'`, `./contact-validation`, `./projects`) — tests written before implementation.
- GREEN: `./node_modules/.bin/vitest run` → 3 files, 49 tests passed.
- Build: `./node_modules/.bin/astro build` → Complete (needed `sharp` as a direct dependency under pnpm; `pnpm-workspace.yaml` allowBuilds esbuild/sharp = true).
- Notes: `package-lock.json` removed (pnpm only). API `/api/contact` now imports `src/lib/contact-validation.ts`; messages/status codes unchanged. Screenshots moved to `src/assets/work/<slug>.png`. `site` comes from `SITE_URL` or Vercel's production URL (no domain invented).
- Commit: `2980049` feat(foundation): add design tokens, typed content modules and tested metric/contact logic.

### T2 Shell + signature motion
- Route: delegated writer. Motion runtime in `src/scripts/motion/*` (one `init(): Cleanup` per effect, orchestrated on `astro:page-load` / torn down on `astro:before-swap`).
- Checks: `./node_modules/.bin/astro build` → Complete. Headless CDP screenshots (390, 360, 1440) of hero, open menu and preloader reviewed.
- Fixed during review: `<html data-preloader>` collided with the `[data-preloader]` selector (whole page clipped white) → renamed `data-has-preloader`; child-component classes needed `:global()`; hero title split waits for fonts and uses explicit lines.
- Commit: `cc96e69` feat(shell): add preloader, navigation menu, cursor, smooth scroll, hero dot field and marquee.

### T3 Content sections
- Route: delegated writer. Sections: Manifesto (#about, word scrub + fact count-ups), Work (#work, sticky stacked cards), Services (#services, accordion), Process (#process, pinned horizontal ≥1024 / drawn line on mobile), Experience (#experience, now rendered), Principles (tilt cards).
- Checks: `./node_modules/.bin/vitest run` → 49 passed; `./node_modules/.bin/astro build` → Complete. CDP screenshots 390 and 1440 reviewed.
- Fixed during review: process track inherited `max-width` (steps squeezed) → reset; SVG line `vector-effect` broke `pathLength` dashes → removed.
- Commit: `e61fef5` feat(sections): add manifesto, stacked work cards, services, process, experience and principles.

### T4 Case study pages
- Route: delegated writer. `src/pages/work/[slug].astro` (prerendered via getStaticPaths), shared `transition:name` `work-<slug>` on the browser frame (card ↔ case hero), story grid, count-up results, next-project band with cursor-following preview (fine pointers) / inline thumbnail (touch). Per-page title/description/OG + CreativeWork JSON-LD.
- Checks: CDP screenshots `/work/aesthete` (390) and `/work/amor-digital` (1440) reviewed; build below.

## Next step
T1.
