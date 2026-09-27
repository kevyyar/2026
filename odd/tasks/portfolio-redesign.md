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
- [x] T5 Contact + footer, SEO meta, remove legacy components/deps, README. Route: delegated.
- [x] T6 Verification — tests, build, mobile/desktop headless screenshots, reduced-motion pass. Route: delegated + parent spot check.

### Round 2 (owner feedback 2026-09-27)
Owner decisions: publish `kevyyar@icloud.com` + LinkedIn `https://www.linkedin.com/in/kevyyar/`; remove Aesthete, Voces Podcast and Amor Digital (sites no longer exist) and keep only Element Cleaning Systems; copy approved; add Spanish (default, `/`) + English (`/en/`) with a language switcher. Vercel: RESEND_* already set; `SITE_URL=https://iamkev.xyz` added to Production by orchestrator. Review follow-ups moved to `odd/tasks/portfolio-hardening.md`.
- [x] T7 Contact channels — email (`mailto:`) + LinkedIn in profile data, menu, contact section, footer, JSON-LD `sameAs`. Route: delegated (writer trigger: 2+ non-trivial files, bundled with T8/T9).
- [x] T8 Single case study — remove the 3 retired projects (data, images, tests, OG refs); redesign Work section and case page for one featured project (no "next project" loop to itself, no `(04)` / "04 case studies" copy). Route: delegated.
- [ ] T9 i18n ES (default) + EN — Astro i18n routing (`prefixDefaultLocale: false`), all UI copy and content data translated, language switcher in nav + menu preserving the equivalent page, `hreflang` alternates, `og:locale`, localized contact form messages, tests for dictionary/data parity and path helpers (TDD). Route: delegated.
- [ ] T10 Verification — tests, check, build, headless screenshots ES + EN at 390/1440, reduced motion. Route: delegated + parent spot check.

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
- Checks: CDP screenshots `/work/aesthete` (390) and `/work/amor-digital` (1440) reviewed; `astro build` → 4 case pages prerendered.
- Commit: `4cb41de` feat(work): add case study pages with shared-element view transitions.

### T5 Contact, footer, SEO, cleanup
- Route: delegated writer. ContactForm React island (`client:visible`): same fields, option values, sanitizers (shared from `src/lib/contact-validation.ts`) and exact POST payload; pill radio groups (optional, "Not sure yet" = empty value), floating labels, live counter, magnetic submit, check morph + particle burst, inline errors (`role=alert`, `aria-describedby`). Company now also requires ≥2 chars client-side (matches the API). Footer with fit-to-width wordmark. Home JSON-LD Person + ProfessionalService.
- Removed: 11 legacy React components, iA Writer font, `lucide-react`. README rewritten.
- Not done: `.env.example` could not be edited (deny rule) — `SITE_URL` is documented in README only.
- Checks: `./node_modules/.bin/vitest run` → 49 passed; `./node_modules/.bin/astro build` → Complete; contact/footer screenshots 390 + 1440 reviewed.
- Commit: `7b5f294` feat(contact): add contact form island, footer and structured data; remove legacy site.

### T6 Verification
- `./node_modules/.bin/vitest run` → 3 files, 49 tests passed.
- `./node_modules/.bin/astro check` → 65 files, 0 errors, 0 warnings, 0 hints (after pinning TypeScript 5.9; TS 7.0 has no programmatic API for `astro check`).
- `./node_modules/.bin/astro build` → Complete; `/` and 4 `/work/<slug>` pages prerendered.
- Headless Chromium (CDP) against the production static output (`.vercel/output/static`): home at 390/1440/360, case pages at 390/1440/1024/360, reduced motion (home + case at 390, first visit), no-JS (390), first-visit preloader. Each run scrolled the full page and then checked for visible text stuck at opacity 0 / visibility hidden → none; `scrollWidth == clientWidth` and `scrollX` stays 0 at 360/390/1024/1440 → no horizontal scroll; no console errors.
- Reduced motion: no preloader, no Lenis, manifesto words fully opaque, process numbers filled and line drawn. No-JS: all content visible, services panels expanded.
- Fixed: on desktop case pages the 4 result values overflowed into each other (e.g. "+180%4.8x") → smaller clamp at ≥1024 + nowrap; re-verified at 1440, 1024 and 360.
- Commit: `4b0174d` fix(work): keep case study result values inside their columns; add astro check.
- Delivery: `single-pr`, not pushed.

### T7 Contact channels
- `profile.email` / `profile.linkedin` added; rendered in menu footer (Email · LinkedIn · GitHub), contact section (large `mailto:` link + Copy button + LinkedIn/GitHub) and site footer. JSON-LD Person + ProfessionalService gain `email` and `sameAs: [LinkedIn, GitHub]`.
- Copy button (`src/scripts/motion/copy-email.ts`) is rendered `hidden` and only revealed when `navigator.clipboard.writeText` exists (no-JS → plain mailto link). Result is announced in an `aria-live="polite"` region.
- Checks: `./node_modules/.bin/vitest run` → 49 passed; `./node_modules/.bin/astro build` → Complete. CDP on the static build (:4501): with clipboard permission granted → label "Copied", `is-copied`, status "Copied: kevyyar@icloud.com", clipboard read back "kevyyar@icloud.com"; without permission → status "Couldn’t copy — use the email link". Contact/menu screenshots at 390 reviewed; STUCK [] and no horizontal scroll.

### T8 Single case study
- RED: `./node_modules/.bin/vitest run` → 2 failed / 46 passed (`expected [ 'element-cleaning-systems', …(3) ] to deeply equal [ 'element-cleaning-systems' ]`; `getProject("aesthete")` still resolved).
- GREEN: `./node_modules/.bin/vitest run` → 48 passed (ECS fields verbatim, exactly 1 project, `getProject` lookup).
- Removed: Aesthete, Voces Podcast, Amor Digital (data + images), `getNextProject`, `ProjectCard`, `NextProject`, `work-stack.ts`, `next-project.ts`. New `FeaturedProject` (ink card, clip reveal, parallax via generic `parallax.ts`, all 4 metrics with count-up, tags, CTA pill, shared `transition:name`), `ProjectCta` band on the case page ("Your project could be next → Start a project" → `/#contact`). Fact tile "04" → "1:1 — One point of contact, start to finish" (static, not a count-up).
- Checks: `./node_modules/.bin/astro check` → 0 errors; `./node_modules/.bin/astro build` → only `/work/element-cleaning-systems` prerendered. Screenshots of Work (390/1440) and case CTA (390) reviewed; STUCK [] and no horizontal scroll.

### Native review (RDD)
- Whole branch (`main..HEAD`): consent granted → `lens_context_budget_exceeded` (17k lines incl. lockfiles/images); no authority created. Split per work unit, each reviewed in a detached worktree.
- T1 `2980049` medium → granted → approved, acknowledged (`review-89fa00c421f5ee86`).
- T2 `cc96e69` medium → granted → approved, acknowledged (`review-0e9d4c7c26c742ca`).
- T3 `e61fef5` medium → granted → approved, acknowledged (`review-6c1e0472f6b16be4`).
- T4 `4cb41de` medium → granted → approved, acknowledged (`review-d9fe7cee77e054ec`).
- T5+T6 `7b5f294..4b0174d` medium → granted → approved, acknowledged (`review-05a86230e0d73808`).
- `9bb9515` docs-only (passive), not reviewed.
- Advisory follow-ups still present at HEAD (non-blocking): `astro.config.mjs` falls back to localhost `site` outside Vercel without `SITE_URL`; `BaseLayout.astro` after-swap does not restore `motion-failed`; preloader has no failsafe if a motion module throws; `footer.ts` cleanup does not kill its tween/ScrollTrigger; accordion/tilt/next-project cleanup leaves in-flight tweens; no tests for ContactForm submit, `getNextProject` wrap, or motion gates. Resolved by later commits: home content (T1), dangling anchors (T2).

## Next step
T7 → T10 (round 2). Then owner pushes `feat/portfolio-redesign` and opens the PR.
