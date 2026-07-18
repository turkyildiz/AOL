-- Optional: index target-rate offer statuses for ops filtering.
-- App already works using status values + JSON in message without this.
-- Run in Supabase SQL Editor when convenient.

-- Status values used by the site:
--   new, quoted, target_submitted, hot_target
-- message JSON for target offers includes:
--   source, marketBest, targetRate, gapPct, aggressive, flexiblePickup, canWait, notes

create index if not exists quote_requests_status_created_idx
  on public.quote_requests (status, created_at desc);

comment on column public.quote_requests.status is
  'new | quoted | target_submitted | hot_target | working | covered | passed';

comment on column public.quote_requests.message is
  'Free text or JSON payload (instant quote snapshot / target rate offer)';
