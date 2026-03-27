update public.users set username = split_part(email, '@', 1)
where username is null;

alter table public.users
alter column username set not null;

alter table public.users
add constraint users_username_unique_constraint unique (username);

alter table public.users
add constraint users_email_unique_constraint unique (email);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, username, email)
  values (
    new.id,
    split_part(new.email, '@', 1),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Function to handle user updates
create or replace function public.handle_user_update()
returns trigger as $$
begin
  update public.users
  set
    email = new.email
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;