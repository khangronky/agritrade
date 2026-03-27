create view "public"."user_full_view" as
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
  up.dob,
  u.created_at
from public.users u
left join public.user_profile up on u.id = up.user_id;