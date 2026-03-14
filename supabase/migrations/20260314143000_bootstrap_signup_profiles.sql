insert into public.roles (name, description)
values
  ('admin', 'Full workspace administration'),
  ('billing_staff', 'Claims, payments, scheduling, and reporting'),
  ('provider', 'Clinical and schedule access'),
  ('patient', 'Patient portal access')
on conflict (name) do update
set description = excluded.description;

create or replace function public.bootstrap_workspace_for_auth_user(
  user_id uuid,
  user_email text,
  user_meta jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_role_name text;
  v_role_id uuid;
  v_org_id uuid;
  v_org_name text;
  v_org_slug_base text;
  v_org_slug text;
  v_full_name text;
begin
  if exists (
    select 1
    from public.users u
    where u.id = bootstrap_workspace_for_auth_user.user_id
  ) then
    return;
  end if;

  v_role_name := coalesce(nullif(trim(user_meta ->> 'role'), ''), 'billing_staff');

  select r.id
  into v_role_id
  from public.roles r
  where r.name = v_role_name;

  if v_role_id is null then
    select r.id
    into v_role_id
    from public.roles r
    where r.name = 'billing_staff';
  end if;

  if v_role_id is null then
    raise exception 'billing_staff role is missing from public.roles';
  end if;

  v_full_name := coalesce(
    nullif(trim(user_meta ->> 'full_name'), ''),
    nullif(trim(split_part(coalesce(user_email, ''), '@', 1)), ''),
    'New User'
  );

  v_org_name := coalesce(
    nullif(trim(user_meta ->> 'organization_name'), ''),
    v_full_name || '''s Workspace'
  );

  v_org_slug_base := trim(
    both '-'
    from regexp_replace(
      lower(
        coalesce(
          nullif(trim(user_meta ->> 'organization_name'), ''),
          nullif(trim(split_part(coalesce(user_email, ''), '@', 1)), ''),
          'workspace'
        )
      ),
      '[^a-z0-9]+',
      '-',
      'g'
    )
  );

  if v_org_slug_base = '' then
    v_org_slug_base := 'workspace';
  end if;

  v_org_slug := left(v_org_slug_base, 40) || '-' || left(user_id::text, 8);

  insert into public.organizations (name, slug, billing_email)
  values (v_org_name, v_org_slug, user_email)
  returning id into v_org_id;

  insert into public.users (id, organization_id, role_id, full_name, email)
  values (
    user_id,
    v_org_id,
    v_role_id,
    v_full_name,
    coalesce(user_email, user_id::text || '@example.com')
  );
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.bootstrap_workspace_for_auth_user(
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

do $$
declare
  auth_user record;
begin
  for auth_user in
    select
      au.id,
      au.email,
      coalesce(au.raw_user_meta_data, '{}'::jsonb) as raw_user_meta_data
    from auth.users au
    where not exists (
      select 1
      from public.users pu
      where pu.id = au.id
    )
  loop
    perform public.bootstrap_workspace_for_auth_user(
      auth_user.id,
      auth_user.email,
      auth_user.raw_user_meta_data
    );
  end loop;
end;
$$;
