# Renomate

A coordination workspace for Singapore home renovations — the system of record between an Interior Design firm, the homeowner, and every sub-contractor on the project.

Renovation today happens across scattered WhatsApp groups (one with the ID, one per sub-trade) and basic questions — *when does hacking start, what decisions are still pending, what was billed, what was paid* — become hard to answer mid-project. Renomate gives every project one place for the structured stuff that chat is terrible at: **timeline, decisions, prices, invoices.**

## Repository structure

```
renomate/
├── Knowledge/   — planning docs (research, MVP, design system, copy, data model, stack)
├── landing/     — the marketing landing page (built first)
└── app/         — the React Native + Expo app (built after landing-page validation)
```

Always refer to `Knowledge/` as the source of truth for *why* something is built a particular way.

| Doc | Read when |
|---|---|
| [`Knowledge/README.md`](./Knowledge/README.md) | Full project overview and current status |
| [`Knowledge/Research.md`](./Knowledge/Research.md) | Market sizing, competitors, ID-firm value prop |
| [`Knowledge/MVP.md`](./Knowledge/MVP.md) | Scope: landing → client app → designer app |
| [`Knowledge/DesignSystem.md`](./Knowledge/DesignSystem.md) | Visual language, palette, typography, components |
| [`Knowledge/design-preview.html`](./Knowledge/design-preview.html) | Open in a browser to see the design system rendered |
| [`Knowledge/LandingPlan.md`](./Knowledge/LandingPlan.md) | Full landing-page plan: sections, copy, animations, visual placeholders |
| [`Knowledge/DataModel.md`](./Knowledge/DataModel.md) | Proposed Postgres schema for Supabase setup |
| [`Knowledge/Stack.md`](./Knowledge/Stack.md) | Tech stack and per-choice rationale |

## Current status

Research and design-system phase complete. Building the landing page next; React Native app follows after landing-page validation and founder discovery calls.

## Built by

[Sean Lew (lewlian)](https://github.com/lewlian) — a Singapore homeowner who renovated and decided this had to exist.
