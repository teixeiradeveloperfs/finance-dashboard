create table if not exists public.finance_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text not null default 'Conta corrente',
  balance_cents bigint not null default 0,
  badge text not null default '',
  color text not null default '#03C494',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#0EA5E9',
  trend_percent numeric(8, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('income', 'expense')),
  color text not null default '#03C494',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references public.finance_accounts(id) on delete set null,
  project_id uuid references public.finance_projects(id) on delete set null,
  category_id uuid references public.finance_categories(id) on delete set null,
  description text not null,
  kind text not null check (kind in ('income', 'expense')),
  amount_cents bigint not null check (amount_cents >= 0),
  occurred_on date not null default current_date,
  status text not null default 'posted' check (status in ('posted', 'pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists finance_accounts_user_id_idx on public.finance_accounts(user_id);
create index if not exists finance_projects_user_id_idx on public.finance_projects(user_id);
create index if not exists finance_categories_user_id_idx on public.finance_categories(user_id);
create index if not exists finance_transactions_user_id_idx on public.finance_transactions(user_id);
create index if not exists finance_transactions_occurred_on_idx on public.finance_transactions(user_id, occurred_on desc);

alter table public.finance_accounts enable row level security;
alter table public.finance_projects enable row level security;
alter table public.finance_categories enable row level security;
alter table public.finance_transactions enable row level security;

drop policy if exists "Users can manage own finance accounts" on public.finance_accounts;
create policy "Users can manage own finance accounts"
on public.finance_accounts
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage own finance projects" on public.finance_projects;
create policy "Users can manage own finance projects"
on public.finance_projects
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage own finance categories" on public.finance_categories;
create policy "Users can manage own finance categories"
on public.finance_categories
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage own finance transactions" on public.finance_transactions;
create policy "Users can manage own finance transactions"
on public.finance_transactions
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
