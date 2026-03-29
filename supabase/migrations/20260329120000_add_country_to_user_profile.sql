alter table "public"."user_profile"
add column "country" text;

drop view if exists "public"."user_full_view";

create or replace view "public"."user_full_view" as
select
  u.id as user_id,
  u.username,
  u.email,
  u.role,
  up.full_name,
  up.avatar_url,
  up.bio,
  up.phone_number,
  up.address,
  up.country,
  up.dob,
  u.created_at
from public.users u
left join public.user_profile up on u.id = up.user_id;
