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

## Forms (current)

Contact and quote forms currently prepare a `mailto:` handoff and log payload in the browser console. Next step: wire to Supabase `leads` / `quote_requests` tables.

## Roadmap

1. **Done / in progress:** Marketing website  
2. **Next:** Supabase lead capture  
3. **Later:** Customer / partner / staff portals  

## License

Private — © Air Ocean Logistics, Inc.
