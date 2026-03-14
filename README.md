# PulseRCM

PulseRCM is a production-grade healthcare Revenue Cycle Management SaaS starter built with Next.js 14 App Router, React, TailwindCSS, shadcn-style components, React Hook Form, Zod, and Supabase.

It includes:

- Premium SaaS-style marketing and product UI
- Auth flows for login, registration, forgot password, and email verification
- Protected operational modules for dashboard, patients, appointments, claims, payments, reports, settings, and patient portal
- Supabase SSR auth wiring, middleware route protection, REST-style route handlers, and a multi-tenant schema/RLS migration scaffold
- Example charts, tables, dialogs, forms, skeletons, dark mode, error states, and empty states

## Tech Stack

- Next.js 14 App Router
- React 18
- TailwindCSS 3
- shadcn-style reusable UI primitives
- React Hook Form + Zod validation
- Supabase Auth, Postgres, Storage, and RLS
- Recharts for dashboard analytics

## Project Structure

```text
app/
  (auth)/
  api/
  appointments/
  claims/
  dashboard/
  patients/
  payments/
  portal/
  reports/
  settings/
components/
  charts/
  dashboard/
  forms/
  tables/
  ui/
lib/
  supabase/
  auth.js
  mock-data.js
  supabaseClient.js
  utils.js
services/
  claimService.js
  dashboardService.js
  patientService.js
  paymentService.js
supabase/
  migrations/
styles/
  globals.css
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gzfhtchprttmqqcnduyv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_lfL5luutJ55ztzFVx5cfbA_xPCmIds-
```

Optional local CLI secret:

```env
SUPABASE_ACCESS_TOKEN=your_supabase_personal_access_token
```

`.env.local` and `.env` are ignored by git.

## Setup

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Supabase Setup

1. Create or open your Supabase project.
2. In Supabase SQL Editor, run the migration in [20260314121000_init_rcm_platform.sql](/home/bacancy/Documents/hackathon/nextgen-revenue-cycle/supabase/migrations/20260314121000_init_rcm_platform.sql).
3. In Supabase Auth settings, add your local and production redirect URLs:
   - `http://localhost:3000/verify-email`
   - `https://your-vercel-domain/verify-email`
4. Create at least one organization row, then map authenticated users into `public.users`.
5. For document workflows, keep the `patient-documents` private storage bucket created by the migration.

## Auth + Routing Notes

- Protected routes are enforced through `middleware.js` using Supabase SSR session refresh.
- Dashboard, patients, appointments, claims, payments, reports, settings, portal, and protected API routes redirect unauthenticated users to `/login`.
- Browser auth flows use `@supabase/ssr` for sign-in, sign-up, and password reset.

## Data Strategy

- Server components fetch data with `Promise.all` where it improves page startup.
- Client components are used only where interactivity is needed: forms, filters, dialogs, charts, theme switching, and paginated tables.
- Services gracefully fall back to demo data if the target Supabase tables are not available yet, so the UI still renders cleanly during setup.

## Database Entities Included

The migration includes the required healthcare RCM entities:

- `users`
- `roles`
- `patients`
- `providers`
- `insurances`
- `appointments`
- `claims`
- `payments`
- `invoices`
- `denials`
- `appeals`
- `documents`
- `locations`
- `procedures`
- `diagnoses`
- `audit_logs`

It also adds `organizations` to support scalable multi-tenant SaaS architecture.

## REST API Structure

Example protected route handlers:

- `/api/patients`
- `/api/claims`
- `/api/payments`

These are good starting points for a Vercel-compatible REST layer backed by Supabase.

## Deployment

This project is ready for Vercel deployment:

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel Environment Variables.
4. Configure Supabase Auth redirect URLs for the deployed domain.

## Notes

- The current UI uses demo datasets until your Supabase tables are populated.
- To persist forms, connect the local form submit handlers in `components/forms/` to Supabase inserts or route handlers.
- To harden production RBAC further, customize the RLS policies in the migration to match your tenant model and operational rules.
