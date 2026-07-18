-- Fix: allow website (anon key) to INSERT leads / quote_requests
-- Run in Supabase SQL Editor if form submit fails with RLS error 42501

-- Ensure grants
grant usage on schema public to anon, authenticated;
grant insert on table public.leads to anon, authenticated;
grant insert on table public.quote_requests to anon, authenticated;

-- Recreate insert policies
drop policy if exists "Anyone can submit a lead" on public.leads;
drop policy if exists "Anyone can submit a quote request" on public.quote_requests;

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
