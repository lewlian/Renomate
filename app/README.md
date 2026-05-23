# Renomate — App (React Native + Expo)

The mobile app for both homeowners (client role) and interior designers (designer role). **Single codebase, role-based access** — account type determines view and permissions, not separate apps.

Built *after* the landing page is live and at least one ID firm has committed to being a pilot partner.

## Source-of-truth references

- Scope and features: [`../Knowledge/MVP.md`](../Knowledge/MVP.md) → "Workstream 2: App MVP"
- Design system: [`../Knowledge/DesignSystem.md`](../Knowledge/DesignSystem.md)
- Database schema: [`../Knowledge/DataModel.md`](../Knowledge/DataModel.md)
- Tech stack: [`../Knowledge/Stack.md`](../Knowledge/Stack.md)

## Current state

Empty. No code yet by design — landing-page validation comes first.

## Build plan (when ready)

1. Scaffold Expo SDK with EAS Build + EAS Update, TypeScript, Expo Router.
2. Set up Supabase project in Singapore region, apply migrations from `../Knowledge/DataModel.md` §15.
3. Share design tokens with `landing/` via a small `packages/ui/` if we go monorepo, else duplicate the token file initially.
4. Auth: Supabase Auth with role-based RLS per `../Knowledge/DataModel.md` §13.
5. Build the eight shared-core entities (timeline, decisions, money, channels, files, defects, audit log, invites).
6. Build the two role views (client tabs, designer tabs) per `../Knowledge/MVP.md`.
7. EAS Update for OTA releases during beta.

## Why mobile-first?

Singapore homeowners skew iOS, contractors and ID-firm site staff skew Android. One codebase is non-negotiable. Site work happens on phones, not laptops.
