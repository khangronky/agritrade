create table "public"."user_profile" (
  "user_id" uuid not null default gen_random_uuid(),
  "full_name" text,
  "avatar_url" text,
  "bio" text,
  "phone_number" text,
  "address" text,
  "dob" date,
  "created_at" timestamp with time zone not null default now()
);

alter table "public"."user_profile" enable row level security;

CREATE UNIQUE INDEX user_profile_pkey ON public.user_profile USING btree (user_id);

alter table "public"."user_profile" add constraint "user_profile_pkey" PRIMARY KEY using index "user_profile_pkey";

alter table "public"."user_profile" add constraint "user_profile_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_profile" validate constraint "user_profile_user_id_fkey";

grant delete on table "public"."user_profile" to "anon";

grant insert on table "public"."user_profile" to "anon";

grant references on table "public"."user_profile" to "anon";

grant select on table "public"."user_profile" to "anon";

grant trigger on table "public"."user_profile" to "anon";

grant truncate on table "public"."user_profile" to "anon";

grant update on table "public"."user_profile" to "anon";

grant delete on table "public"."user_profile" to "authenticated";

grant insert on table "public"."user_profile" to "authenticated";

grant references on table "public"."user_profile" to "authenticated";

grant select on table "public"."user_profile" to "authenticated";

grant trigger on table "public"."user_profile" to "authenticated";

grant truncate on table "public"."user_profile" to "authenticated";

grant update on table "public"."user_profile" to "authenticated";

grant delete on table "public"."user_profile" to "service_role";

grant insert on table "public"."user_profile" to "service_role";

grant references on table "public"."user_profile" to "service_role";

grant select on table "public"."user_profile" to "service_role";

grant trigger on table "public"."user_profile" to "service_role";

grant truncate on table "public"."user_profile" to "service_role";

grant update on table "public"."user_profile" to "service_role";

create policy "Enable read access for authenticated users"
on "public"."user_profile"
as permissive
for select
to authenticated
using (true);

create policy "Enable update for users based on their uid"
on "public"."user_profile"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));

create or replace function public.handle_new_user_profile()
returns trigger as $$
begin
  insert into public.user_profile (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_user_created
  after insert on public.users
  for each row execute procedure public.handle_new_user_profile();