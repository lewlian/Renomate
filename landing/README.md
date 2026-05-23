# Renomate — Landing Page

The marketing landing page. Next.js 14 (App Router) + TypeScript + Tailwind + framer-motion.

Built first per the workstream order in `../Knowledge/MVP.md`:
1. Validate demand via homeowner waitlist signups.
2. Capture ID firm leads via contact form.
3. Force the design system to be real before app development starts.

## Run it locally

```bash
cd landing
npm install     # first time only
npm run dev
```

Open <http://localhost:3000>.

## Source-of-truth references

- **Full plan (sections, copy, animations, visuals)**: [`../Knowledge/LandingPlan.md`](../Knowledge/LandingPlan.md) — the brief this codebase implements.
- Design system + tokens: [`../Knowledge/DesignSystem.md`](../Knowledge/DesignSystem.md). Tokens are mirrored in `tailwind.config.ts`.
- Design preview (palette/type only, in HTML): [`../Knowledge/design-preview.html`](../Knowledge/design-preview.html).
- Landing-page scope (Workstream 1): [`../Knowledge/MVP.md`](../Knowledge/MVP.md).
- Data model for forms backend: [`../Knowledge/DataModel.md`](../Knowledge/DataModel.md) §11 (`waitlist`).

## Project structure

```
landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Fonts (Fraunces, Inter, JetBrains Mono), metadata
│   │   ├── page.tsx          # Composes every section in order
│   │   └── globals.css       # Tailwind + base styles + reduced-motion override
│   └── components/
│       ├── ui/               # Button, Pill, ScrollReveal, AnimatedNumber,
│       │                     # MagneticButton, ModalShell
│       ├── modals/           # WaitlistModal, DesignerContactModal, ModalContext
│       └── sections/         # The 15 page sections (Nav, Hero, ... Footer)
├── tailwind.config.ts        # Design tokens from DesignSystem.md
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── package.json
```

## What works today

- All 15 sections from `LandingPlan.md` v2.0 implemented.
- Animations: scroll-triggered reveals (framer-motion), hero parallax + magnetic-style mockup, animated number counters in the stats section, tabbed segmented content with sliding pill indicator (framer `layoutId`), sticky-scroll feature deep-dive with crossfading visuals, animated FAQ accordion, modal forms with backdrop blur + escape-to-close.
- Both forms (waitlist + designer contact) submit to a stubbed handler that simulates a 600ms request, then shows a success state. **Not wired to Supabase yet.**
- All animations respect `prefers-reduced-motion`.

## What's stubbed / next

- Form submissions are stubbed. Wire to Supabase `waitlist` table next (see `../Knowledge/DataModel.md` §11). One table, two `audience` values (`homeowner` / `id_firm`).
- Visual mockups in cards (Timeline, Decisions, Money, Defects) are styled CSS placeholders showing realistic-looking data. Replace with real screenshots once the app exists.
- Domain (`renomate.sg`) and email (`hello@renomate.sg`) are placeholders — register/configure before sharing the page publicly.
- Deploy: Vercel. `npm run build` works; `vercel` CLI for first deploy.
- Analytics: not added. Suggest Plausible or Vercel Analytics — both lightweight, both PDPA-friendly.

## Notes

- Inter and Fraunces are loaded via `next/font/google` (zero CLS, no FOUT).
- No images yet (`public/` is empty). When real assets arrive, prefer AVIF/WebP and use `next/image` with proper `sizes`.
- The previous static `preview.html` has been removed — superseded by this real implementation.
