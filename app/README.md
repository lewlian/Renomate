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

**Full MVP scope implemented** (frontend only — backend placeholders in place).

- Expo SDK 56 with Expo Router (file-based navigation)
- NativeWind (Tailwind CSS for React Native) with design tokens from DesignSystem.md
- Google Fonts: Fraunces (display), Inter (body), JetBrains Mono (mono)
- 8 shared UI components: Button, Card, StatusPill, Input, SectionHeader, EmptyState, ListRow, Avatar
- Full TypeScript types from DataModel.md (16 enums, 19 entities)
- Mock data layer with realistic Singapore HDB renovation scenario
- Mock auth context with role switching (placeholder for Supabase Auth)

### Screens — Client role (homeowner)

| Screen | Features |
|---|---|
| Home | Dashboard: current phase, next decision, outstanding invoice, progress bar |
| Timeline | All 7 phases with status, planned/actual dates, segmented progress bar |
| Decisions | Decision queue with filters, tap for detail view, confirm decision flow |
| Money | Quotation breakdown, invoices with status, change order approve/reject |
| Defects | Snag list, create defect with photo picker, sign-off fixed defects |
| Files | File browser by category, upload via image picker |
| Channels | Channel list, threaded message view with bubbles |

### Screens — Designer role (ID firm)

| Screen | Features |
|---|---|
| Home | Today's overview: stats (pending decisions, overdue $, open defects), upcoming phase, quick actions |
| Project Setup | 3-step form: project details → timeline phases → invite client |
| Timeline | Start/complete phase actions |
| Decisions | Create decision form (title, deadline, options) |
| Money | Issue invoice, propose change order |
| Defects | Triage: assign trade, mark as fixed |
| Files | Upload files |
| Channels | Admin view |

### Detail screens

| Screen | Features |
|---|---|
| Decision detail | View options, select + confirm (client), read-only (designer) |
| Invoice detail | Payment info, mark paid with receipt upload (client), void (designer) |
| Defect detail | Status timeline, photo thumbnails, trade assignment, sign-off |

### Backend placeholders (to be wired later)

- Auth → Supabase Auth
- Data fetching → TanStack Query + Supabase client
- File uploads → Supabase Storage
- Push notifications → Expo Push
- Realtime channels → Supabase Realtime
- Audit log → Supabase Postgres triggers

## Project structure

```
app/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── _layout.tsx         # Root: fonts, providers, navigation
│   │   ├── index.tsx           # Auth redirect
│   │   ├── (auth)/             # Login + signup
│   │   ├── (tabs)/             # 7-tab layout
│   │   ├── decisions/          # Decision detail + create
│   │   ├── defects/            # Defect detail + create (with photo picker)
│   │   ├── invoices/           # Invoice detail + create + change orders
│   │   └── project-setup/      # Multi-step project creation (designer)
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
