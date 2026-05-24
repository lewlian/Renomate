# Renomate — App (React Native + Expo)

The mobile app for both homeowners (client role) and interior designers (designer role). **Single codebase, role-based access** — account type determines view and permissions, not separate apps.

## Getting started

```bash
cd app
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iOS/Android) to run on your phone.

## Source-of-truth references

- Scope and features: [`../Knowledge/MVP.md`](../Knowledge/MVP.md) → "Workstream 2: App MVP"
- Design system: [`../Knowledge/DesignSystem.md`](../Knowledge/DesignSystem.md)
- Database schema: [`../Knowledge/DataModel.md`](../Knowledge/DataModel.md)
- Tech stack: [`../Knowledge/Stack.md`](../Knowledge/Stack.md)

## Current state

**PR 1 complete: Scaffolding + Design System + Core UI + All Tabs**

- Expo SDK 56 with Expo Router (file-based navigation)
- NativeWind (Tailwind CSS for React Native) with design tokens from DesignSystem.md
- Google Fonts loaded: Fraunces (display), Inter (body), JetBrains Mono (mono)
- 8 shared UI components: Button, Card, StatusPill, Input, SectionHeader, EmptyState, ListRow, Avatar
- Full TypeScript types from DataModel.md (16 enums, 19 entity types)
- Mock data layer with realistic Singapore renovation scenario
- Mock auth context (placeholder for Supabase Auth)
- Role switching (client/designer) via avatar tap on home screen

### Screens implemented

| Tab | Status | Features |
|---|---|---|
| Home | Done | Dashboard with project summary, current phase, next decision, outstanding invoice |
| Timeline | Done | All 7 phases with status, planned/actual dates, progress bar |
| Decisions | Done | Decision queue with filters (all/pending/overdue/decided), deadline tracking |
| Money | Done | Quotation line items, invoices with status, change orders with tabs |
| Defects | Done | Snag list with status, location, trade assignment, photo count |
| Files | Done | File browser grouped by category (quotation, contract, render, etc.) |
| Channels | Done | Channel list with last message, thread view with message bubbles |
| Auth | Done | Login + signup screens with validation |

### Backend placeholders (to be wired later)

- Auth: mock context returns hardcoded user; swap for Supabase Auth
- Data: mock-data.ts provides all data; swap for TanStack Query + Supabase client
- File uploads: UI placeholder; wire to Supabase Storage
- Push notifications: not yet implemented; wire to Expo Push
- Channels: read-only mock messages; wire to Supabase Realtime

## Project structure

```
app/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── _layout.tsx         # Root: fonts, providers, navigation
│   │   ├── index.tsx           # Auth redirect
│   │   ├── (auth)/             # Login + signup
│   │   └── (tabs)/             # 7-tab layout (home, timeline, decisions, money, defects, files, channels)
│   ├── components/ui/          # Shared UI primitives
│   ├── constants/              # Design tokens (colors, typography)
│   ├── hooks/                  # useAuth
│   └── lib/                    # Types, mock data, auth context
├── app.json                    # Expo config
├── tailwind.config.js          # NativeWind design tokens
├── metro.config.js             # Metro + NativeWind
└── babel.config.js             # Babel + Reanimated
```

## Why mobile-first?

Singapore homeowners skew iOS, contractors and ID-firm site staff skew Android. One codebase is non-negotiable. Site work happens on phones, not laptops.
