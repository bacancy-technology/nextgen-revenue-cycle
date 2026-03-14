create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

insert into public.roles (name, description)
values
  ('admin', 'Full workspace administration'),
  ('billing_staff', 'Claims, payments, scheduling, and reporting'),
  ('provider', 'Clinical and schedule access'),
  ('patient', 'Patient portal access')
on conflict (name) do update
set description = excluded.description;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  billing_email text,
  timezone text not null default 'America/Chicago',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role_id uuid not null references public.roles(id),
  full_name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  code text not null,
  address_line_1 text,
  city text,
  state text,
  postal_code text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, code)
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  location_id uuid references public.locations(id) on delete set null,
  npi text not null,
  specialty text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, npi)
);

create table if not exists public.insurances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  payer_name text not null,
  payer_code text,
  plan_type text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  portal_user_id uuid references auth.users(id) on delete set null,
  primary_provider_id uuid references public.providers(id) on delete set null,
  primary_insurance_id uuid references public.insurances(id) on delete set null,
  location_id uuid references public.locations(id) on delete set null,
  mrn text not null,
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  sex text,
  email text,
  phone text,
  status text not null default 'active',
  balance_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, mrn)
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  appointment_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled',
  reminder_status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.procedures (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  cpt_code text not null,
  description text not null,
  charge_cents integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, cpt_code)
);

create table if not exists public.diagnoses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  icd10_code text not null,
  description text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, icd10_code)
);

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  procedure_id uuid references public.procedures(id) on delete set null,
  diagnosis_id uuid references public.diagnoses(id) on delete set null,
  insurance_id uuid references public.insurances(id) on delete set null,
  claim_number text not null,
  status text not null default 'draft',
  charge_cents integer not null,
  submitted_at timestamptz,
  accepted_at timestamptz,
  paid_at timestamptz,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, claim_number)
);

create table if not exists public.denials (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  claim_id uuid not null references public.claims(id) on delete cascade,
  denial_code text,
  denial_reason text not null,
  denial_status text not null default 'open',
  denied_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appeals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  denial_id uuid not null references public.denials(id) on delete cascade,
  submitted_by uuid references public.users(id) on delete set null,
  appeal_status text not null default 'draft',
  submitted_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  claim_id uuid references public.claims(id) on delete set null,
  invoice_number text not null,
  status text not null default 'open',
  due_date date,
  total_cents integer not null,
  balance_cents integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, invoice_number)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  claim_id uuid references public.claims(id) on delete set null,
  payment_source text not null,
  status text not null default 'pending',
  amount_cents integer not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  claim_id uuid references public.claims(id) on delete set null,
  uploaded_by uuid references public.users(id) on delete set null,
  document_type text not null,
  file_name text not null,
  storage_bucket text not null default 'patient-documents',
  storage_path text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid references public.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_users_organization_id on public.users (organization_id);
create index if not exists idx_users_role_id on public.users (role_id);
create index if not exists idx_locations_organization_id on public.locations (organization_id);
create index if not exists idx_providers_organization_id on public.providers (organization_id);
create index if not exists idx_providers_user_id on public.providers (user_id);
create index if not exists idx_insurances_organization_id on public.insurances (organization_id);
create index if not exists idx_patients_organization_id on public.patients (organization_id);
create index if not exists idx_patients_portal_user_id on public.patients (portal_user_id);
create index if not exists idx_patients_primary_provider_id on public.patients (primary_provider_id);
create index if not exists idx_appointments_organization_id on public.appointments (organization_id);
create index if not exists idx_appointments_patient_id on public.appointments (patient_id);
create index if not exists idx_appointments_provider_id_starts_at on public.appointments (provider_id, starts_at);
create index if not exists idx_procedures_organization_id on public.procedures (organization_id);
create index if not exists idx_diagnoses_organization_id on public.diagnoses (organization_id);
create index if not exists idx_claims_organization_id on public.claims (organization_id);
create index if not exists idx_claims_patient_id on public.claims (patient_id);
create index if not exists idx_claims_status on public.claims (status);
create index if not exists idx_denials_organization_id on public.denials (organization_id);
create index if not exists idx_denials_claim_id on public.denials (claim_id);
create index if not exists idx_appeals_organization_id on public.appeals (organization_id);
create index if not exists idx_appeals_denial_id on public.appeals (denial_id);
create index if not exists idx_invoices_organization_id on public.invoices (organization_id);
create index if not exists idx_invoices_patient_id on public.invoices (patient_id);
create index if not exists idx_payments_organization_id on public.payments (organization_id);
create index if not exists idx_payments_patient_id on public.payments (patient_id);
create index if not exists idx_documents_organization_id on public.documents (organization_id);
create index if not exists idx_documents_patient_id on public.documents (patient_id);
create index if not exists idx_audit_logs_organization_id_created_at on public.audit_logs (organization_id, created_at desc);

create or replace function public.current_organization_id()
returns uuid
language sql
stable
security invoker
set search_path = ''
as $$
  select organization_id
  from public.users
  where id = (select auth.uid())
$$;

create or replace function public.current_role_name()
returns text
language sql
stable
security invoker
set search_path = ''
as $$
  select r.name
  from public.users u
  join public.roles r on r.id = u.role_id
  where u.id = (select auth.uid())
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(public.current_role_name() = 'admin', false)
$$;

create or replace function public.is_staff_or_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(public.current_role_name() in ('admin', 'billing_staff', 'provider'), false)
$$;

create or replace function public.belongs_to_current_org(target_organization_id uuid)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select target_organization_id = public.current_organization_id()
$$;

create or replace function public.is_patient_owner(target_patient_id uuid)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1
    from public.patients p
    where p.id = target_patient_id
      and p.portal_user_id = (select auth.uid())
  )
$$;

drop trigger if exists set_organizations_updated_at on public.organizations;
create trigger set_organizations_updated_at before update on public.organizations
for each row execute function public.set_updated_at();

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists set_locations_updated_at on public.locations;
create trigger set_locations_updated_at before update on public.locations
for each row execute function public.set_updated_at();

drop trigger if exists set_providers_updated_at on public.providers;
create trigger set_providers_updated_at before update on public.providers
for each row execute function public.set_updated_at();

drop trigger if exists set_insurances_updated_at on public.insurances;
create trigger set_insurances_updated_at before update on public.insurances
for each row execute function public.set_updated_at();

drop trigger if exists set_patients_updated_at on public.patients;
create trigger set_patients_updated_at before update on public.patients
for each row execute function public.set_updated_at();

drop trigger if exists set_appointments_updated_at on public.appointments;
create trigger set_appointments_updated_at before update on public.appointments
for each row execute function public.set_updated_at();

drop trigger if exists set_procedures_updated_at on public.procedures;
create trigger set_procedures_updated_at before update on public.procedures
for each row execute function public.set_updated_at();

drop trigger if exists set_diagnoses_updated_at on public.diagnoses;
create trigger set_diagnoses_updated_at before update on public.diagnoses
for each row execute function public.set_updated_at();

drop trigger if exists set_claims_updated_at on public.claims;
create trigger set_claims_updated_at before update on public.claims
for each row execute function public.set_updated_at();

drop trigger if exists set_denials_updated_at on public.denials;
create trigger set_denials_updated_at before update on public.denials
for each row execute function public.set_updated_at();

drop trigger if exists set_appeals_updated_at on public.appeals;
create trigger set_appeals_updated_at before update on public.appeals
for each row execute function public.set_updated_at();

drop trigger if exists set_invoices_updated_at on public.invoices;
create trigger set_invoices_updated_at before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists set_payments_updated_at on public.payments;
create trigger set_payments_updated_at before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists set_documents_updated_at on public.documents;
create trigger set_documents_updated_at before update on public.documents
for each row execute function public.set_updated_at();

alter table public.roles enable row level security;
alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.locations enable row level security;
alter table public.providers enable row level security;
alter table public.insurances enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.procedures enable row level security;
alter table public.diagnoses enable row level security;
alter table public.claims enable row level security;
alter table public.denials enable row level security;
alter table public.appeals enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.documents enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "roles_select" on public.roles;
create policy "roles_select" on public.roles
for select to authenticated
using (true);

drop policy if exists "roles_admin_write" on public.roles;
create policy "roles_admin_write" on public.roles
for insert to authenticated
with check (public.is_admin());

drop policy if exists "roles_admin_update" on public.roles;
create policy "roles_admin_update" on public.roles
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "organizations_select" on public.organizations;
create policy "organizations_select" on public.organizations
for select to authenticated
using (id = public.current_organization_id());

drop policy if exists "organizations_admin_insert" on public.organizations;
create policy "organizations_admin_insert" on public.organizations
for insert to authenticated
with check (public.is_admin());

drop policy if exists "organizations_admin_update" on public.organizations;
create policy "organizations_admin_update" on public.organizations
for update to authenticated
using (id = public.current_organization_id() and public.is_admin())
with check (id = public.current_organization_id() and public.is_admin());

drop policy if exists "users_select" on public.users;
create policy "users_select" on public.users
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "users_insert" on public.users;
create policy "users_insert" on public.users
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_admin());

drop policy if exists "users_update" on public.users;
create policy "users_update" on public.users
for update to authenticated
using (
  organization_id = public.current_organization_id()
  and (public.is_admin() or id = (select auth.uid()))
)
with check (
  organization_id = public.current_organization_id()
  and (public.is_admin() or id = (select auth.uid()))
);

drop policy if exists "locations_select" on public.locations;
create policy "locations_select" on public.locations
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "locations_write" on public.locations;
create policy "locations_write" on public.locations
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "locations_update" on public.locations;
create policy "locations_update" on public.locations
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "providers_select" on public.providers;
create policy "providers_select" on public.providers
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "providers_write" on public.providers;
create policy "providers_write" on public.providers
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_admin());

drop policy if exists "providers_update" on public.providers;
create policy "providers_update" on public.providers
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_admin())
with check (organization_id = public.current_organization_id() and public.is_admin());

drop policy if exists "insurances_select" on public.insurances;
create policy "insurances_select" on public.insurances
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "insurances_write" on public.insurances;
create policy "insurances_write" on public.insurances
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "insurances_update" on public.insurances;
create policy "insurances_update" on public.insurances
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "patients_select" on public.patients;
create policy "patients_select" on public.patients
for select to authenticated
using (
  organization_id = public.current_organization_id()
  or portal_user_id = (select auth.uid())
);

drop policy if exists "patients_insert" on public.patients;
create policy "patients_insert" on public.patients
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "patients_update" on public.patients;
create policy "patients_update" on public.patients
for update to authenticated
using (
  organization_id = public.current_organization_id()
  and public.is_staff_or_admin()
)
with check (
  organization_id = public.current_organization_id()
  and public.is_staff_or_admin()
);

drop policy if exists "appointments_select" on public.appointments;
create policy "appointments_select" on public.appointments
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "appointments_insert" on public.appointments;
create policy "appointments_insert" on public.appointments
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "appointments_update" on public.appointments;
create policy "appointments_update" on public.appointments
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "procedures_select" on public.procedures;
create policy "procedures_select" on public.procedures
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "procedures_write" on public.procedures;
create policy "procedures_write" on public.procedures
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "procedures_update" on public.procedures;
create policy "procedures_update" on public.procedures
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "diagnoses_select" on public.diagnoses;
create policy "diagnoses_select" on public.diagnoses
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "diagnoses_write" on public.diagnoses;
create policy "diagnoses_write" on public.diagnoses
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "diagnoses_update" on public.diagnoses;
create policy "diagnoses_update" on public.diagnoses
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "claims_select" on public.claims;
create policy "claims_select" on public.claims
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "claims_insert" on public.claims;
create policy "claims_insert" on public.claims
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "claims_update" on public.claims;
create policy "claims_update" on public.claims
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "denials_select" on public.denials;
create policy "denials_select" on public.denials
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "denials_insert" on public.denials;
create policy "denials_insert" on public.denials
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "denials_update" on public.denials;
create policy "denials_update" on public.denials
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "appeals_select" on public.appeals;
create policy "appeals_select" on public.appeals
for select to authenticated
using (organization_id = public.current_organization_id());

drop policy if exists "appeals_insert" on public.appeals;
create policy "appeals_insert" on public.appeals
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "appeals_update" on public.appeals;
create policy "appeals_update" on public.appeals
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "invoices_select" on public.invoices;
create policy "invoices_select" on public.invoices
for select to authenticated
using (
  organization_id = public.current_organization_id()
  or public.is_patient_owner(patient_id)
);

drop policy if exists "invoices_insert" on public.invoices;
create policy "invoices_insert" on public.invoices
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "invoices_update" on public.invoices;
create policy "invoices_update" on public.invoices
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "payments_select" on public.payments;
create policy "payments_select" on public.payments
for select to authenticated
using (
  organization_id = public.current_organization_id()
  or public.is_patient_owner(patient_id)
);

drop policy if exists "payments_insert" on public.payments;
create policy "payments_insert" on public.payments
for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  or public.is_patient_owner(patient_id)
);

drop policy if exists "payments_update" on public.payments;
create policy "payments_update" on public.payments
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "documents_select" on public.documents;
create policy "documents_select" on public.documents
for select to authenticated
using (
  organization_id = public.current_organization_id()
  or public.is_patient_owner(patient_id)
);

drop policy if exists "documents_insert" on public.documents;
create policy "documents_insert" on public.documents
for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  or public.is_patient_owner(patient_id)
);

drop policy if exists "documents_update" on public.documents;
create policy "documents_update" on public.documents
for update to authenticated
using (organization_id = public.current_organization_id() and public.is_staff_or_admin())
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

drop policy if exists "audit_logs_select" on public.audit_logs;
create policy "audit_logs_select" on public.audit_logs
for select to authenticated
using (organization_id = public.current_organization_id() and public.is_admin());

drop policy if exists "audit_logs_insert" on public.audit_logs;
create policy "audit_logs_insert" on public.audit_logs
for insert to authenticated
with check (organization_id = public.current_organization_id() and public.is_staff_or_admin());

insert into storage.buckets (id, name, public)
values ('patient-documents', 'patient-documents', false)
on conflict (id) do nothing;

drop policy if exists "patient_documents_select" on storage.objects;
create policy "patient_documents_select" on storage.objects
for select to authenticated
using (bucket_id = 'patient-documents');

drop policy if exists "patient_documents_insert" on storage.objects;
create policy "patient_documents_insert" on storage.objects
for insert to authenticated
with check (bucket_id = 'patient-documents');

drop policy if exists "patient_documents_update" on storage.objects;
create policy "patient_documents_update" on storage.objects
for update to authenticated
using (bucket_id = 'patient-documents')
with check (bucket_id = 'patient-documents');
