alter table "public"."users"
add column "role" text,
add column "onboarding_status" text not null default 'pending',
add column "onboarding_step" smallint not null default 1,
add column "onboarding_completed_at" timestamp with time zone;

alter table "public"."users"
add constraint "users_role_check"
check ("role" = any (array['farmer'::text, 'trader'::text]));

alter table "public"."users"
add constraint "users_onboarding_status_check"
check (
  "onboarding_status" = any (array['pending'::text, 'completed'::text])
);

alter table "public"."users"
add constraint "users_onboarding_step_check"
check ("onboarding_step" between 1 and 3);
