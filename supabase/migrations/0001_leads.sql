-- Air & Ocean Logistics — public website lead capture
-- Run this in Supabase SQL Editor (or via supabase db push)

create extension if not exists "pgcrypto";

-- Contact form submissions
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text,
  source text not null default 'contact',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Quote / RFQ submissions
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  mode text,
  equipment text,
  origin text,
  destination text,
  ready_date date,
  weight text,
  cargo text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_status_idx on public.quote_requests (status);

-- Row Level Security: no public reads; inserts allowed for anon (website forms)
alter table public.leads enable row level security;
alter table public.quote_requests enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Anyone can submit a lead" on public.leads;
drop policy if exists "Anyone can submit a quote request" on public.quote_requests;
drop policy if exists "Service role full access leads" on public.leads;
drop policy if exists "Service role full access quotes" on public.quote_requests;

create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can submit a quote request"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (true);

-- Note: SELECT/UPDATE/DELETE only via service role (bypasses RLS) in Supabase dashboard
-- or future staff auth policies.
