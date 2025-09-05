-------------------
-- USER PROFILES --
-------------------
create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  discord_id        text unique,
  username          text,
  avatar_url        text,
  presence          text not null default 'offline'
                        check (presence in ('online', 'offline')),
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table public.profiles enable row level security;


-- Trigger updated timestamp
create or replace function public.set_updated_at()
returns trigger
language  plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();


-- Allows authenticated users to see each other's display name/avatar/...
drop policy if exists "profiles: read for all authenticated" on public.profiles;
create policy "profiles: read for all authenticated"
on public.profiles for select
to authenticated
using (true);

-- Users create their own profile row.
drop policy if exists "profiles: insert own" on public.profiles;
create policy "profiles: insert own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

-- Let users update their own profile
drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);


-------------
-- SERVERS --
-------------
create table if not exists public.servers (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  owner_id          uuid not null references auth.users(id) on delete cascade,
  created_at        timestamptz default now()
);

alter table public.servers enable row level security;

-- Allow anyone authenticated to create a server they own
drop policy if exists "servers: insert own" on public.servers;
create policy "servers: insert own"
on public.servers for insert
to authenticated
with check (owner_id = auth.uid());

-- Owner can update their own server. 
-- 'with check' keeps owner_id from changing (can't transfer ownership)
drop policy if exists "servers: owner update own" on public.servers;
create policy "servers: owner update own"
on public.servers for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

-- Owner can delete their own server.
drop policy if exists "servers: owner delete own" on public.servers;
create policy "servers: owner delete own"
on public.servers for delete
to authenticated
using (owner_id = auth.uid());


-----------------------
-- SERVER MEMBERSHIP --
-----------------------
create table if not exists public.server_members (
  server_id         uuid not null references public.servers(id) on delete cascade,
  user_id           uuid not null references public.profiles(id) on delete cascade,
  role              text default 'member',
  joined_at         timestamptz default now(),
  primary key (server_id, user_id)
);
-- ^^^ Many to many

alter table public.server_members enable row level security;

-- which servers is this user in
create index if not exists idx_server_members_user on public.server_members(user_id);

-- Only members can read a server
drop policy if exists "members: read if member" on public.server_members;
create policy "members: read if member"
on public.server_members for select
to authenticated
using (exists (
  select 1
  from public.server_members sm
  where sm.server_id = server_members.server_id
        and sm.user_id = auth.uid()
));

-- Allow users to join a server
--(implement invites later)
drop policy if exists "members: self join" on public.server_members;
create policy "members: self join"
on public.server_members for insert
to authenticated
with check (user_id = auth.uid());

-- Allow users to leave a server
drop policy if exists "members: self leave" on public.server_members;
create policy "members: self leave"
on public.server_members for delete
to authenticated
using (user_id = auth.uid())
