-- Banco compartilhado do NPa Bocaina
-- Execute este script UMA VEZ no SQL Editor do projeto Supabase.

create table if not exists public.app_state (
  id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

drop policy if exists "app_state_select_own" on public.app_state;
drop policy if exists "app_state_insert_own" on public.app_state;
drop policy if exists "app_state_update_own" on public.app_state;
drop policy if exists "app_state_delete_own" on public.app_state;

create policy "app_state_select_own"
  on public.app_state for select
  to authenticated
  using (auth.uid() = id);

create policy "app_state_insert_own"
  on public.app_state for insert
  to authenticated
  with check (auth.uid() = id);

create policy "app_state_update_own"
  on public.app_state for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "app_state_delete_own"
  on public.app_state for delete
  to authenticated
  using (auth.uid() = id);

create or replace function public.set_app_state_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_state_updated_at on public.app_state;
create trigger app_state_updated_at
before update on public.app_state
for each row execute function public.set_app_state_updated_at();
