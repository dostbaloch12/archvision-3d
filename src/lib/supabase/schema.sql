create table if not exists public.journal_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.journal_subscribers enable row level security;

create policy "public_insert_journal"
on public.journal_subscribers
for insert
to anon
with check (true);

create policy "no_public_select_journal"
on public.journal_subscribers
for select
to anon
using (false);