# Deploy Notes

## Environment Variables (Vercel → Project Settings)

| Var | Purpose | Required? |
|---|---|---|
| `DATABASE_URL` | Neon Postgres connection string for persisting submissions | Yes for production capture |

If `DATABASE_URL` is unset, serverless functions log submissions to stdout and return 202. The frontend still shows success - useful for staging or pre-DB launch, but no list is captured.

## First-time Vercel Setup

1. Project Settings → Build & Development Settings:
   - Framework Preset: **Other** (vercel.json controls this)
   - Build Command: leave default (uses `vercel.json` → `vite build`)
   - Output Directory: leave default (uses `vercel.json` → `dist/public`)
2. Environment Variables: add `DATABASE_URL` (from Neon → connection string).
3. (Optional) Custom domain: add `zebrawell.com` if you own it; update `index.html` canonical/OG URLs accordingly.
4. (Optional) Vercel Web Analytics: enable in Project → Analytics tab. Frontend already wires `@vercel/analytics` and `@vercel/speed-insights`.

## Database Setup (Neon)

Tables are defined in `shared/schema.ts`. To create them:

```bash
# Set DATABASE_URL locally first
export DATABASE_URL="postgresql://..."
npm run db:push
```

This runs `drizzle-kit push` and creates the four tables: `preorder_reservations`, `contact_submissions`, `sample_requests`, `waitlist_submissions`.

## API Routes (live as Vercel Serverless Functions)

| Route | Method | Purpose |
|---|---|---|
| `/api/waitlist` | POST | Hero / preorder email capture |
| `/api/preorder` | POST | Full reservation form |
| `/api/contact` | POST | Contact form |
| `/api/request-sample` | POST | Sample request |

All return `201` on DB success, `202` when DB is unavailable (still logs the submission to Vercel's function logs), `400` on validation failure.

## Reading Captured Submissions

When `DATABASE_URL` is set, query Neon directly:

```sql
select email, created_at from waitlist_submissions order by created_at desc;
select * from preorder_reservations order by created_at desc;
```

Or build a tiny `/api/admin/*` route protected by an admin token.
