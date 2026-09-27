# Kevin Barreto — portfolio

Personal site of Kevin Barreto, independent software developer & consultant. "A software studio of one."

## Stack

- [Astro 5](https://astro.build) (`output: "server"`, Vercel adapter). Pages are prerendered; only `/api/contact` runs on the server.
- Tailwind CSS v4 (tokens in `src/styles/global.css`) + scoped component styles.
- Motion: GSAP (ScrollTrigger, SplitText) and Lenis, as vanilla TypeScript modules. Respects `prefers-reduced-motion`.
- One React island: the contact form (`react-hook-form`), hydrated with `client:visible`.
- Email delivery through [Resend](https://resend.com).
- Fonts self-hosted via Fontsource: Bricolage Grotesque, Instrument Serif, JetBrains Mono.

## Scripts

Uses pnpm (single lockfile: `pnpm-lock.yaml`).

| Command        | Action                                   |
| -------------- | ---------------------------------------- |
| `pnpm install` | Install dependencies                     |
| `pnpm dev`     | Dev server at `localhost:4321`           |
| `pnpm build`   | Production build (Vercel output)         |
| `pnpm test`    | Unit tests (Vitest)                      |

## Environment variables

Copy `.env.example` to `.env`:

| Variable            | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `RESEND_API_KEY`    | Resend API key used by `/api/contact`                    |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Kevin <hello@yourdomain.com>`     |
| `RESEND_TO_EMAIL`   | Inbox that receives inquiries                            |
| `SITE_URL`          | Optional. Canonical origin for SEO/OG URLs (falls back to Vercel's production URL) |

## Structure

```text
src/
├── data/            # Typed content: profile, projects, services, process, experience, principles
├── lib/             # Pure, tested logic: metric parsing (count-ups), contact validation
├── layouts/         # BaseLayout: SEO, fonts, preloader, nav, footer, motion runtime
├── components/
│   ├── layout/      # Nav + menu, preloader, cursor, footer, SEO
│   ├── sections/    # Home page sections (zero JS)
│   ├── work/        # Project card, browser frame, next-project band
│   ├── contact/     # ContactForm React island
│   └── ui/          # Small shared pieces
├── scripts/motion/  # One module per effect, each exporting init(): cleanup
├── pages/
│   ├── index.astro
│   ├── work/[slug].astro   # Case studies (view transitions)
│   └── api/contact.ts      # POST endpoint (server)
└── assets/work/     # Project screenshots (optimized by astro:assets)
```

To add a case study, add its screenshot to `src/assets/work/` and an entry to `src/data/projects.ts`; the card and `/work/<slug>` page are generated from it (then update the content tests in `src/data/projects.test.ts`).
