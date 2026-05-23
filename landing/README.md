# Renomate — Landing Page

The marketing landing page. Built **first**, before any app code, to:

1. Validate demand via homeowner waitlist signups.
2. Capture ID firm leads via contact form.
3. Force the design system to be real before app development starts.

## Source-of-truth references

- **Full plan (sections, copy, animations, visuals)**: [`../Knowledge/LandingPlan.md`](../Knowledge/LandingPlan.md) ← read this first
- Design system: [`../Knowledge/DesignSystem.md`](../Knowledge/DesignSystem.md)
- Design preview (rendered): [`../Knowledge/design-preview.html`](../Knowledge/design-preview.html)
- Landing-page scope (Workstream 1): [`../Knowledge/MVP.md`](../Knowledge/MVP.md)

## Current state

`preview.html` — a self-contained static rendering of the **v1.0** landing page direction. Superseded by `../Knowledge/LandingPlan.md` (v2.0): the v1.0 tone leaned too heavily on positioning against WhatsApp and is being reframed. `preview.html` is kept temporarily as a reference for the design-system-in-use; it will be rebuilt from the v2.0 plan once that plan is approved.

The production landing page will be built in **Next.js (App Router) + Tailwind** with the same design tokens, deployed on Vercel, with a Supabase backend for the waitlist + contact form submissions (see `../Knowledge/DataModel.md` §11 for the `waitlist` table schema).

## Build plan (when ready)

1. Scaffold Next.js 14 (App Router) with TypeScript + Tailwind.
2. Port design system tokens (palette, type scale, spacing) to `tailwind.config.ts`.
3. Set up Fraunces + Inter via `next/font/google`.
4. Build sections in this order: hero, problem, four values, how it works, ID firm, FAQ, footer.
5. Forms: client-side validation → Supabase insert → confirmation state.
6. Analytics: lightweight (Plausible or Vercel Analytics — no GA).
7. Deploy to Vercel, custom domain.
