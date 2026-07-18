# Supabase setup (Air & Ocean Logistics)

## 1. Create a project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Name e.g. `aol-prod`, pick a region (US East recommended)
3. Save the database password

## 2. Run the migration

1. Open **SQL Editor**
2. Paste the full contents of `migrations/0001_leads.sql`
3. **Run**

This creates:

| Table | Purpose |
|-------|---------|
| `leads` | Contact form |
| `quote_requests` | Truck quote form |

RLS allows **insert** from the website; **reads** only via service role / dashboard.

## 3. Copy API keys

**Project Settings → API:**

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server only)

## 4. Local env

Create `C:\Users\RLDEV\AOL\.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Restart `npm run dev`.

## 5. Vercel env

Project **aol** → **Settings** → **Environment Variables** → add the same three keys for **Production** (and Preview if you want).

Redeploy after saving.

## 6. View submissions

Supabase → **Table Editor** → `leads` or `quote_requests`.

## Test

1. Submit **Contact** and **Quote** on the site
2. Confirm rows appear in Table Editor
