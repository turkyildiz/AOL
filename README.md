# Air & Ocean Logistics (AOL)

Premium marketing site for **Air & Ocean Logistics** — a freight brokerage with assets.

- **Domain:** [airoceanlogistics.us](https://airoceanlogistics.us)
- **Stack:** Next.js (App Router) · Tailwind CSS · Vercel (deploy) · Supabase (forms/platform next)
- **Repo:** [turkyildiz/AOL](https://github.com/turkyildiz/AOL)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/services` | Air, ocean, truck, project cargo |
| `/coverage` | Modes & lanes |
| `/about` | Company story |
| `/contact` | Contact + form |
| `/quote` | Structured RFQ form |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit site content

Most copy, phone, email, services, and nav live in:

```
src/content/site.ts
```

## Brand assets

Logos live in `public/brand/`:

| File | Use |
|------|-----|
| `logo-header.jpg` | Header / footer horizontal lockup |
| `logo.jpg` | Full logo (light background) |
| `logo.png` | Dark-background mark variant |
| `logo-master.pdf` | Print / source master |

## Deploy (Vercel)

1. Import this GitHub repo in Vercel
2. Framework: Next.js (auto-detect)
3. Add custom domains: `airoceanlogistics.us` and `www`
4. At GoDaddy DNS:
   - **A** `@` → `76.76.21.21` (or value Vercel shows)
   - **CNAME** `www` → `cname.vercel-dns.com`
   - **Do not change MX** (Microsoft 365 mail)

## Forms + Supabase

Contact and quote forms save to Supabase via server actions (`leads`, `quote_requests`).

1. Run SQL in `supabase/migrations/0001_leads.sql` (see `supabase/README.md`)
2. Set env vars (`.env.local` + Vercel):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (recommended, server-only)
3. View rows in Supabase **Table Editor**

## Roadmap

1. **Done / in progress:** Marketing website  
2. **Next:** Supabase lead capture  
3. **Later:** Customer / partner / staff portals  

## License

Private — © Air Ocean Logistics, Inc.
