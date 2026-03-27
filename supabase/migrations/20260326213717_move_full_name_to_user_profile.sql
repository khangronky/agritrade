insert into "public"."user_profile" (user_id)
select id from "public"."users";

update "public"."user_profile"
set full_name = (select u.full_name from public.users u where user_id = u.id);

alter table "public"."users"
drop column full_name;