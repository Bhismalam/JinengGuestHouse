-- Jineng GuestHouse — booking availability schema
-- Paste this whole file into the Supabase SQL editor and run it once.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  room_units smallint not null check (room_units in (1, 2)),
  check_in date not null,
  check_out date not null check (check_out > check_in),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- The public site may only create bookings, never read, edit, or delete them.
-- The admin manages bookings from the Supabase dashboard (Table Editor), which
-- uses the service role and bypasses RLS entirely.
create policy "Public can insert bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

-- Availability-only view: exposes just the fields needed to compute free dates,
-- never guest name/email/phone. Deliberately NOT security_invoker, so it runs
-- with the view owner's privileges and can read bookings despite anon having
-- no SELECT policy on the base table above.
create or replace view public.booking_availability as
  select check_in, check_out, room_units
  from public.bookings
  where status in ('pending', 'confirmed');

grant select on public.booking_availability to anon;
