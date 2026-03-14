import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  CalendarCheck2,
  CirclePlay,
  Clock3,
  LayoutDashboard,
  Mail,
  MonitorCog,
  Shield,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  UserRound,
  WalletCards,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { SecurityPreviewVideo } from "@/components/home/security-preview-video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { analyticsKpis, summaryMetrics } from "@/lib/mock-data";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";

const featureCards = [
  {
    icon: CalendarCheck2,
    title: "Patient access + scheduling",
    description:
      "Move from appointment creation to reminder workflows, waitlist fills, and real-time eligibility readiness.",
  },
  {
    icon: Stethoscope,
    title: "Coding + claim orchestration",
    description:
      "Validate ICD-10 and procedure codes, batch submissions, and denial recovery from one claims workbench.",
  },
  {
    icon: BadgeDollarSign,
    title: "Payments + A/R control",
    description:
      "Unify patient statements, portal payments, installment plans, ERA posting, and aging follow-up.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-ready operations",
    description:
      "Role-based access, audit logs, secure document handling, and RLS-first multi-tenant architecture.",
  },
];

const heroSignals = [
  {
    icon: ShieldCheck,
    title: "Eligibility first",
    detail: "Coverage checks complete before staff start claim work.",
  },
  {
    icon: Activity,
    title: "Denials routed faster",
    detail: "Exceptions land in focused work queues instead of inbox noise.",
  },
  {
    icon: WalletCards,
    title: "Patient collections synced",
    detail: "Statements, portal payments, and balances stay aligned in real time.",
  },
];

const moduleMetrics = [
  { label: "Eligibility latency", value: "< 2s" },
  { label: "Auto scrub coverage", value: "98.4%" },
  { label: "Patient payment success", value: "74%" },
];

const analyticsTracks = [
  {
    icon: BadgeDollarSign,
    title: "Revenue overview and trend analysis",
    description: "Net collections, payer mix movement, and provider-level recovery pacing.",
    metric: "$482.7k",
    signal: "+12.4% vs last month",
    tone: "text-emerald-600",
    fill: 76,
  },
  {
    icon: Activity,
    title: "Claims funnel from created to paid",
    description: "See where claims stall, then route fixes before denials grow.",
    metric: "96.2%",
    signal: "Clean claim rate",
    tone: "text-[#118293] dark:text-[#7bd8e3]",
    fill: 82,
  },
  {
    icon: WalletCards,
    title: "A/R aging and collection workflows",
    description: "Work aging buckets by risk score and automate patient outreach windows.",
    metric: "34.1",
    signal: "Days in A/R",
    tone: "text-[#118293] dark:text-[#7bd8e3]",
    fill: 73,
  },
  {
    icon: ShieldCheck,
    title: "Role-based patient portal and documents",
    description: "Controlled access to statements, uploads, and payment events with audit logs.",
    metric: "24/7",
    signal: "Portal uptime target",
    tone: "text-emerald-600",
    fill: 88,
  },
];

const securityChecklist = [
  "Policy-based access for admin, billing staff, provider, and patient roles.",
  "Tenant-aware RLS boundaries for claims, payments, and documents.",
  "Audit-first event capture for sensitive workflow actions.",
];

const securityPillars = [
  {
    icon: ShieldCheck,
    title: "Supabase Auth with role-aware user profiles",
    detail: "Session-aware access controls with protected route handling.",
    metric: "Auth",
  },
  {
    icon: LayoutDashboard,
    title: "REST route handlers for patients, claims, and payments",
    detail: "Predictable API contracts designed for scalable SaaS modules.",
    metric: "API",
  },
  {
    icon: MonitorCog,
    title: "Tailwind + shadcn-style component system",
    detail: "Composable UI architecture with reusable design primitives.",
    metric: "UI",
  },
  {
    icon: Shield,
    title: "Responsive dark mode, skeletons, empty states, and error boundaries",
    detail: "Reliable UX coverage for every loading and failure state.",
    metric: "UX",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative bg-[linear-gradient(to_bottom,rgba(248,250,252,1),rgba(248,250,252,1))] dark:bg-[linear-gradient(to_bottom,rgba(2,6,23,1),rgba(2,6,23,1))]">
        <div className="relative z-10 w-full px-4 py-8 sm:px-6 lg:px-8">
          <header className="hero-rise relative w-full overflow-hidden rounded-[34px] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
            <div className="absolute inset-y-0 left-[18%] hidden w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:block dark:via-white/10" />
            <div className="absolute inset-y-0 right-[19%] hidden w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:block dark:via-white/10" />
            <div className="flex w-full flex-wrap items-center gap-4 lg:grid lg:grid-cols-[minmax(260px,1.2fr)_minmax(320px,1fr)_minmax(280px,1.1fr)] lg:gap-6">
              <div className="min-w-0 justify-self-start">
                <BrandLogo />
              </div>
              <nav className="mx-auto hidden w-full max-w-[360px] items-center justify-center gap-2 rounded-full border border-slate-200/70 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-600 lg:flex dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                {[
                  { href: "#modules", label: "Modules" },
                  { href: "#analytics", label: "Analytics" },
                  { href: "#security", label: "Security" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-auto flex w-full items-center justify-end gap-3 lg:w-auto">
                <Button asChild variant="ghost" className="hidden rounded-full px-5 sm:inline-flex">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild className="brand-gradient rounded-full px-6 shadow-[0_16px_40px_rgba(75,193,209,0.3)] hover:opacity-95">
                  <Link href="/register">Request workspace</Link>
                </Button>
              </div>
            </div>
          </header>
        </div>

        <div className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(247,252,253,0.98)_0%,rgba(233,247,250,0.96)_44%,rgba(206,238,243,0.84)_100%)] dark:bg-[linear-gradient(120deg,rgba(2,6,23,0.95)_0%,rgba(8,20,35,0.9)_48%,rgba(10,32,44,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_34%,rgba(75,193,209,0.22),transparent_42%),radial-gradient(circle_at_58%_86%,rgba(123,216,227,0.2),transparent_36%),radial-gradient(circle_at_85%_24%,rgba(17,130,147,0.18),transparent_38%)] dark:bg-[radial-gradient(circle_at_14%_32%,rgba(75,193,209,0.2),transparent_40%),radial-gradient(circle_at_82%_22%,rgba(75,193,209,0.14),transparent_34%),radial-gradient(circle_at_62%_80%,rgba(8,153,173,0.14),transparent_42%)]" />
            <div className="absolute right-0 top-0 h-full w-[48%] bg-[linear-gradient(180deg,rgba(75,193,209,0.08),rgba(15,23,42,0.06))] dark:bg-[linear-gradient(180deg,rgba(11,35,44,0.35),rgba(11,35,44,0.14))]" />
            <div className="hero-drift absolute -left-24 top-28 h-[360px] w-[360px] rounded-full bg-[#4bc1d1]/20 blur-3xl" />
            <div className="hero-drift absolute left-[28%] top-10 h-[240px] w-[240px] rounded-full bg-white/70 blur-3xl dark:bg-white/5" />
            <div className="hero-drift absolute right-[-120px] top-20 h-[560px] w-[560px] rounded-full bg-[#4bc1d1]/18 blur-3xl" />
            <div className="hero-glow-breathe absolute right-[5%] top-[96px] hidden h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(75,193,209,0.18),rgba(75,193,209,0.06)_38%,transparent_72%)] lg:block" />
            <div className="hero-glow-breathe absolute right-[10%] top-[158px] hidden h-[520px] w-[460px] rounded-[56px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] shadow-[0_30px_90px_rgba(75,193,209,0.08)] backdrop-blur-[2px] lg:block dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
            <div className="hero-glow-breathe absolute right-[14%] top-[136px] hidden h-[420px] w-[420px] rounded-full border border-white/20 bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(75,193,209,0.04),transparent_72%)] blur-3xl lg:block dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05),rgba(75,193,209,0.04),transparent_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.35))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.32))]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 pb-10 pt-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(640px,1.08fr)] lg:items-start lg:gap-10 xl:gap-12">
            <div className="max-w-[760px] space-y-8">
              <div className="space-y-5">
                <Badge className="brand-tint hero-shimmer hero-rise hero-rise-delay-1 rounded-full px-4 py-1.5 text-sm text-primary">
                  Premium healthcare SaaS starter
                </Badge>
                <h1 className="hero-rise hero-rise-delay-2 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                  A modern healthcare RCM platform built for{" "}
                  <span className="bg-gradient-to-r from-[#118293] via-[#4bc1d1] to-[#7bd8e3] bg-clip-text text-transparent">
                    faster billing workflows.
                  </span>
                </h1>
                <p className="hero-rise hero-rise-delay-3 max-w-2xl text-lg text-muted-foreground">
                  PulseRCM combines scheduling, eligibility, coding, claims,
                  patient payments, analytics, and auditability in one Next.js +
                  Supabase architecture designed for scale.
                </p>
              </div>
              <div className="hero-rise hero-rise-delay-4 flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group brand-gradient cta-sheen px-6 shadow-[0_18px_45px_rgba(75,193,209,0.28)]"
                >
                  <Link href="/dashboard">
                    <CirclePlay className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Show demo
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="group border border-[#4bc1d1]/20 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <Link href="/dashboard">
                    Explore dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group border-white/80 bg-white/70 shadow-[0_14px_34px_rgba(75,193,209,0.08)] backdrop-blur hover:border-[#4bc1d1]/30 hover:bg-white dark:border-white/10 dark:bg-white/5"
                >
                  <Link href="/portal">View patient portal</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {summaryMetrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric.label}
                    className="hero-card-hover hero-rise hero-rise-delay-4 relative overflow-hidden rounded-[24px] border border-border/60 bg-white/70 p-4 shadow-sm dark:bg-slate-950/60"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/60 to-transparent" />
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="mt-3 text-2xl font-semibold">
                      {typeof metric.value === "number"
                        ? metric.label.toLowerCase().includes("collections")
                          ? formatCurrency(metric.value)
                          : formatCompactNumber(metric.value)
                        : metric.value}
                    </p>
                    <p className="mt-2 text-sm text-emerald-600">{metric.change}</p>
                  </div>
                ))}
              </div>

              <div className="hero-rise hero-rise-delay-4 relative overflow-hidden rounded-[28px] border border-white/70 bg-white/68 p-5 shadow-[0_20px_55px_rgba(75,193,209,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/62">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/70 to-transparent" />
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Workflow signal
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                      Revenue operations stay aligned across front office and billing.
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Built for teams that need fewer handoffs.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {heroSignals.map((signal) => (
                    <div
                      key={signal.title}
                      className="rounded-[22px] border border-border/60 bg-background/72 p-4 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <signal.icon className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-slate-950 dark:text-white">{signal.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-rise hero-rise-delay-3 relative flex w-full flex-col gap-6 lg:mt-2 lg:max-w-none lg:justify-self-end">
              <div className="hero-rise hero-rise-delay-4 hero-float-slow pointer-events-none absolute -left-10 top-24 z-20 hidden w-52 rounded-[26px] border border-white/70 bg-white/82 p-4 shadow-[0_18px_45px_rgba(75,193,209,0.16)] backdrop-blur xl:block dark:border-white/10 dark:bg-slate-950/72">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Eligibility
                    </p>
                    <p className="mt-2 text-2xl font-semibold">128</p>
                    <p className="mt-1 text-sm text-emerald-600">Verified this week</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                    <Shield className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="hero-rise hero-rise-delay-4 hero-float pointer-events-none absolute -right-8 bottom-10 z-20 hidden w-48 rounded-[26px] border border-white/70 bg-white/82 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur xl:block dark:border-white/10 dark:bg-slate-950/72">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      A/R trend
                    </p>
                    <p className="mt-2 text-2xl font-semibold">34.1</p>
                    <p className="mt-1 text-sm text-muted-foreground">Days in A/R</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                    <Clock3 className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div id="demo-preview" className="preview-scan hero-preview-motion surface relative overflow-hidden rounded-[32px] border-white/70 bg-white/86 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950/76">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,193,209,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.16),transparent_38%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(75,193,209,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_38%)]" />
                <div className="absolute inset-0 bg-hero-grid opacity-60 [background-size:100%_100%,40px_40px,40px_40px]" />
                <div className="absolute inset-x-8 top-4 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/60 to-transparent" />
                <div className="absolute -right-16 top-10 h-32 w-32 rounded-full bg-[#4bc1d1]/14 blur-3xl" />
                <div className="relative space-y-5">
                  <div className="relative flex items-center justify-between rounded-[24px] border border-border/60 bg-background/85 p-4">
                    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/50 to-transparent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Operations snapshot</p>
                      <p className="text-2xl font-semibold">Today&apos;s revenue pulse</p>
                    </div>
                    <Badge variant="success" className="gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                      Live queue
                    </Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {analyticsKpis.map((item) => (
                      <div
                        key={item.label}
                        className="hero-card-hover rounded-[24px] border border-border/60 bg-background/90 p-5"
                      >
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="mt-3 text-3xl font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="relative overflow-hidden rounded-[24px] border border-[#1b2648]/90 bg-[linear-gradient(160deg,#030612_0%,#081127_48%,#0c1a3a_100%)] p-5 text-slate-50 shadow-[0_24px_65px_rgba(3,10,28,0.48)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_10%,rgba(75,193,209,0.2),transparent_34%),radial-gradient(circle_at_14%_100%,rgba(90,122,255,0.14),transparent_42%)]" />
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                    <div className="relative mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Claim command center</p>
                        <p className="text-2xl font-semibold">Batch submission ready</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="border-cyan-300/30 bg-cyan-400/12 text-cyan-200">
                          Auto triage on
                        </Badge>
                        <Activity className="h-5 w-5 text-cyan-300" />
                      </div>
                    </div>
                    <div className="relative grid gap-3">
                      {[
                        {
                          label: "Ready",
                          tone: "bg-emerald-400/12 text-emerald-300 border-emerald-300/30",
                          text: "28 claims passed scrub rules and are queued for clearinghouse delivery.",
                        },
                        {
                          label: "Needs review",
                          tone: "bg-amber-300/12 text-amber-200 border-amber-200/35",
                          text: "6 denials need appeal documentation before noon.",
                        },
                        {
                          label: "Patient balance",
                          tone: "bg-cyan-300/12 text-cyan-200 border-cyan-300/30",
                          text: "14 patient statements are awaiting portal payment reminders.",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.09]"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(75,193,209,0.9)]" />
                              <span className="text-xs uppercase tracking-[0.14em] text-slate-300">Queue item</span>
                            </div>
                            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${item.tone}`}>
                              {item.label}
                            </span>
                          </div>
                          <p className="text-[15px] leading-7 text-slate-100/95">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-rise hero-rise-delay-4 group relative overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(243,253,254,0.9)_46%,rgba(210,242,247,0.82)_100%)] p-5 shadow-[0_24px_58px_rgba(75,193,209,0.18)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(9,19,34,0.9)_0%,rgba(10,27,43,0.84)_58%,rgba(10,39,50,0.8)_100%)]">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/80 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_24%,rgba(255,255,255,0.56),transparent_35%),radial-gradient(circle_at_92%_90%,rgba(75,193,209,0.2),transparent_36%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(75,193,209,0.12),transparent_30%),radial-gradient(circle_at_88%_86%,rgba(75,193,209,0.1),transparent_34%)]" />
                <div className="absolute inset-0 bg-hero-grid opacity-[0.28] [background-size:100%_100%,42px_42px,42px_42px]" />

                <div className="relative mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Queue health
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Assignment velocity and follow-up readiness
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Health score 92
                    </span>
                    <Badge variant="outline" className="border-emerald-400/35 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300">
                      Stable
                    </Badge>
                  </div>
                </div>

                <div className="relative grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-background/90 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Claims touched in 1h</p>
                      <p className="text-xs font-semibold text-emerald-600">+8% / hour</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-4xl font-semibold leading-none">72</p>
                      <div className="flex items-end gap-1">
                        <span className="h-2 w-1.5 rounded-full bg-primary/30" />
                        <span className="h-3 w-1.5 rounded-full bg-primary/40" />
                        <span className="h-4 w-1.5 rounded-full bg-primary/55" />
                        <span className="h-5 w-1.5 rounded-full bg-primary/70" />
                        <span className="h-6 w-1.5 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/90 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Follow-ups assigned</p>
                      <p className="text-xs font-semibold text-[#118293] dark:text-[#7bd8e3]">Auto-routed</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-4xl font-semibold leading-none">19</p>
                      <div className="flex items-end gap-1">
                        <span className="h-3 w-1.5 rounded-full bg-primary/35" />
                        <span className="h-4 w-1.5 rounded-full bg-primary/50" />
                        <span className="h-4 w-1.5 rounded-full bg-primary/60" />
                        <span className="h-5 w-1.5 rounded-full bg-primary/75" />
                        <span className="h-6 w-1.5 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 grid gap-2.5">
                  {[
                    { tag: "Priority", text: "10 denials tagged to specialist queues and ready for outreach." },
                    { tag: "Eligibility", text: "Mismatch alerts dropped 18% after live insurance validation." },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-start gap-3 rounded-2xl border border-white/40 bg-white/65 p-3 text-sm text-slate-700 transition-colors duration-300 hover:bg-white/85 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    >
                      <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-[#118293] shadow-[0_0_10px_rgba(75,193,209,0.75)] dark:bg-[#7bd8e3]" />
                      <p>
                        <span className="mr-2 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                          {item.tag}
                        </span>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section id="modules" className="relative overflow-hidden border-y border-border/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(246,251,253,0.96)_0%,rgba(237,248,250,0.94)_48%,rgba(216,242,247,0.9)_100%)] dark:bg-[linear-gradient(120deg,rgba(5,11,24,0.96)_0%,rgba(7,20,35,0.94)_54%,rgba(8,29,39,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(75,193,209,0.2),transparent_38%),radial-gradient(circle_at_88%_82%,rgba(123,216,227,0.24),transparent_34%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(75,193,209,0.16),transparent_36%),radial-gradient(circle_at_82%_80%,rgba(75,193,209,0.14),transparent_36%)]" />
          <div className="absolute right-[-110px] top-[-100px] h-[340px] w-[340px] rounded-full bg-white/45 blur-3xl dark:bg-[#4bc1d1]/10" />
          <div className="absolute -left-20 bottom-[-120px] h-[280px] w-[280px] rounded-full bg-[#4bc1d1]/20 blur-3xl dark:bg-[#4bc1d1]/12" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 py-20 sm:px-6 lg:px-10">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:items-center">
            <div className="max-w-2xl space-y-6">
              <Badge className="brand-tint rounded-full px-4 py-1.5 text-sm text-primary">
                Purpose-built modules
              </Badge>
              <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Front-office clarity, back-office control, patient-friendly self service.
              </h2>
              <p className="text-lg text-muted-foreground">
                The platform is shaped around the workflows revenue teams actually manage:
                intake, eligibility, coding, claim movement, payment posting, A/R worklists,
                and reporting.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {moduleMetrics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/60 bg-white/65 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/55"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="hidden xl:block">
                <div className="modules-rail-mask">
                  <div className="modules-rail py-2">
                    {[...featureCards, ...featureCards].map((feature, index) => (
                      <article
                        key={`${feature.title}-${index}`}
                        className="modules-slide-card group relative w-[340px] overflow-hidden rounded-[28px] border border-white/65 bg-[linear-gradient(160deg,rgba(255,255,255,0.9)_0%,rgba(241,252,253,0.9)_52%,rgba(219,244,248,0.85)_100%)] p-6 shadow-[0_18px_50px_rgba(75,193,209,0.14)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(8,16,31,0.86)_0%,rgba(10,27,43,0.82)_55%,rgba(10,38,50,0.76)_100%)]"
                      >
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/70 to-transparent" />
                        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#4bc1d1]/16 blur-2xl" />
                        <div className="relative mb-5 flex items-start justify-between gap-4">
                          <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                            <feature.icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            Module {((index % featureCards.length) + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                          {feature.description}
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#118293] dark:text-[#7bd8e3]">
                          Learn workflow
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:hidden">
                {featureCards.map((feature, index) => (
                  <article
                    key={feature.title}
                    className="relative overflow-hidden rounded-[26px] border border-white/65 bg-[linear-gradient(160deg,rgba(255,255,255,0.9)_0%,rgba(241,252,253,0.9)_52%,rgba(219,244,248,0.85)_100%)] p-6 shadow-[0_18px_50px_rgba(75,193,209,0.14)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(8,16,31,0.86)_0%,rgba(10,27,43,0.82)_55%,rgba(10,38,50,0.76)_100%)]"
                  >
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/70 to-transparent" />
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        Module {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="analytics" className="relative overflow-hidden border-y border-border/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(246,251,253,0.98)_0%,rgba(235,248,251,0.96)_48%,rgba(213,243,248,0.9)_100%)] dark:bg-[linear-gradient(118deg,rgba(3,10,22,0.98)_0%,rgba(5,18,34,0.96)_52%,rgba(8,30,40,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_22%,rgba(75,193,209,0.18),transparent_34%),radial-gradient(circle_at_88%_76%,rgba(123,216,227,0.26),transparent_36%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(75,193,209,0.15),transparent_30%),radial-gradient(circle_at_86%_78%,rgba(75,193,209,0.14),transparent_34%)]" />
          <div className="analytics-orbit absolute -left-24 top-14 h-[220px] w-[220px] rounded-full border border-[#4bc1d1]/25 bg-[#4bc1d1]/12 blur-2xl" />
          <div className="analytics-orbit absolute -right-20 bottom-[-40px] h-[260px] w-[260px] rounded-full border border-[#4bc1d1]/25 bg-white/45 blur-3xl dark:bg-[#4bc1d1]/10" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 py-20 sm:px-6 lg:px-10">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:items-center">
            <div className="space-y-6">
              <Badge className="brand-tint rounded-full px-4 py-1.5 text-sm text-primary">
                Executive visibility
              </Badge>
              <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Dashboards designed like a premium SaaS command center.
              </h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Stripe-like KPI density, Linear-style focus, and healthcare-safe wording
                help teams move quickly without increasing cognitive load.
              </p>

              <div className="analytics-beat relative overflow-hidden rounded-[30px] border border-white/65 bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(242,253,254,0.9)_52%,rgba(216,244,248,0.84)_100%)] p-5 shadow-[0_20px_54px_rgba(75,193,209,0.16)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(8,16,31,0.88)_0%,rgba(9,25,41,0.84)_52%,rgba(9,35,45,0.8)_100%)]">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/80 to-transparent" />
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold tracking-[0.08em] text-slate-800 dark:text-slate-200">
                    Command center pulse
                  </p>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                    Live analytics
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  {[24, 30, 26, 35, 28, 38, 44, 40, 46, 52, 49, 58].map((height, index) => (
                    <div key={height + index} className="relative flex-1">
                      <div
                        className="w-full rounded-t-xl bg-[linear-gradient(180deg,rgba(75,193,209,0.9),rgba(17,130,147,0.65))] opacity-90"
                        style={{ height: `${height}px` }}
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Operational throughput increased this week as denials were rerouted earlier in the cycle.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:auto-rows-fr">
              {analyticsTracks.map((item) => (
                <article
                  key={item.title}
                  className="group relative flex h-full min-h-[255px] flex-col overflow-hidden rounded-[26px] border border-white/65 bg-[linear-gradient(145deg,rgba(255,255,255,0.92)_0%,rgba(241,252,253,0.92)_54%,rgba(220,246,249,0.86)_100%)] p-5 shadow-[0_18px_46px_rgba(75,193,209,0.14)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(75,193,209,0.22)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(8,16,31,0.9)_0%,rgba(10,26,42,0.84)_54%,rgba(10,37,48,0.8)_100%)]"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/70 to-transparent" />
                  <div className="absolute -right-10 top-2 h-20 w-20 rounded-full bg-[#4bc1d1]/14 blur-2xl" />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="rounded-2xl bg-primary/12 p-2.5 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className={`rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold ${item.tone}`}>
                      {item.signal}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <p className="text-4xl font-semibold leading-none text-slate-950 dark:text-white">
                      {item.metric}
                    </p>
                    <div className="w-28">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-primary/15">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#4bc1d1,#118293)]"
                          style={{ width: `${item.fill}%` }}
                        />
                      </div>
                      <p className="mt-2 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Realtime
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="relative overflow-hidden border-y border-border/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(247,252,253,0.98)_0%,rgba(236,249,252,0.96)_48%,rgba(215,244,248,0.92)_100%)] dark:bg-[linear-gradient(118deg,rgba(4,10,23,0.98)_0%,rgba(6,18,34,0.95)_52%,rgba(9,30,39,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_22%,rgba(75,193,209,0.16),transparent_35%),radial-gradient(circle_at_85%_82%,rgba(123,216,227,0.24),transparent_34%)] dark:bg-[radial-gradient(circle_at_15%_22%,rgba(75,193,209,0.13),transparent_33%),radial-gradient(circle_at_85%_82%,rgba(75,193,209,0.13),transparent_33%)]" />
          <div className="security-stack-float absolute -left-24 bottom-[-120px] h-[280px] w-[280px] rounded-full bg-[#4bc1d1]/18 blur-3xl" />
          <div className="security-stack-float-delay absolute -right-20 top-[-100px] h-[260px] w-[260px] rounded-full bg-white/45 blur-3xl dark:bg-[#4bc1d1]/10" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 py-20 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center">
            <div className="space-y-6">
              <Badge className="brand-tint rounded-full px-4 py-1.5 text-sm text-primary">
                Supabase-first security
              </Badge>
              <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Multi-tenant schema, RLS, protected routes, and audit-friendly access patterns.
              </h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                The starter includes SSR auth wiring, route protection, storage-ready document
                handling, and a migration scaffold for healthcare RCM entities.
              </p>

              <div className="grid gap-3">
                {securityChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/65 bg-white/68 p-3 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/55 dark:text-slate-300"
                  >
                    <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-[#118293] shadow-[0_0_10px_rgba(75,193,209,0.75)] dark:bg-[#7bd8e3]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="group/security relative mx-auto w-full max-w-[720px]">
              <div className="security-stack-float pointer-events-none absolute -left-10 top-12 h-[180px] w-[180px] rounded-[28px] border border-white/55 bg-white/65 shadow-[0_18px_44px_rgba(75,193,209,0.15)] backdrop-blur dark:border-white/10 dark:bg-slate-900/45" />
              <div className="security-stack-float-delay pointer-events-none absolute -right-8 bottom-6 h-[160px] w-[170px] rounded-[26px] border border-white/55 bg-[#4bc1d1]/20 shadow-[0_18px_44px_rgba(75,193,209,0.2)] backdrop-blur dark:border-white/10 dark:bg-[#4bc1d1]/16" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92)_0%,rgba(241,252,253,0.9)_56%,rgba(219,244,248,0.85)_100%)] p-5 shadow-[0_26px_70px_rgba(75,193,209,0.2)] backdrop-blur transition duration-500 group-hover/security:-translate-y-1 group-hover/security:shadow-[0_36px_90px_rgba(75,193,209,0.3)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(8,16,31,0.9)_0%,rgba(9,25,41,0.86)_56%,rgba(9,35,45,0.82)_100%)]">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/80 to-transparent" />
                <div className="absolute inset-0 bg-hero-grid opacity-35 [background-size:100%_100%,42px_42px,42px_42px]" />

                <div className="relative rounded-[26px] border border-white/60 bg-[linear-gradient(155deg,rgba(9,32,62,0.95)_0%,rgba(10,56,98,0.92)_58%,rgba(15,94,127,0.86)_100%)] p-5 text-slate-100 shadow-[0_22px_50px_rgba(8,21,42,0.4)] dark:border-white/10">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold tracking-[0.08em] text-cyan-100/90">
                      Security architecture preview
                    </p>
                    <Badge className="border-cyan-200/35 bg-cyan-200/15 text-cyan-100">
                      Live policy checks
                    </Badge>
                  </div>

                  <SecurityPreviewVideo />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {securityPillars.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[24px] border border-white/65 bg-white/72 p-5 shadow-[0_14px_36px_rgba(75,193,209,0.1)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(75,193,209,0.2)] dark:border-white/10 dark:bg-slate-950/58"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/70 to-transparent" />
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-primary/12 p-2.5 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-6 text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative isolate mt-24 overflow-hidden border-t border-[#4bc1d1]/35 bg-[linear-gradient(180deg,rgba(236,248,251,0.35)_0%,rgba(156,225,234,0.58)_100%)] dark:bg-[linear-gradient(180deg,rgba(8,26,34,0.72)_0%,rgba(9,42,52,0.88)_100%)]">
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-28 bg-[linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(248,250,252,0.62)_38%,rgba(248,250,252,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,1)_0%,rgba(15,23,42,0.62)_38%,rgba(15,23,42,0)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#4bc1d1]/45" />
        <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
          <span className="h-[5px] w-48 rounded-full bg-[linear-gradient(90deg,rgba(75,193,209,0),rgba(75,193,209,0.82),rgba(75,193,209,0))]" />
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/footer-texture.svg')] bg-cover bg-center opacity-80 dark:opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(237,250,252,0.92)_0%,rgba(174,231,239,0.72)_45%,rgba(97,194,208,0.8)_100%)] dark:bg-[linear-gradient(180deg,rgba(10,31,39,0.88)_0%,rgba(11,41,50,0.82)_45%,rgba(12,57,67,0.86)_100%)]" />
          <div className="absolute -left-24 bottom-[-150px] h-[320px] w-[320px] rounded-full bg-white/35 blur-3xl dark:bg-[#7bd8e3]/20" />
          <div className="absolute -right-10 top-10 h-[280px] w-[280px] rounded-full bg-[#4bc1d1]/35 blur-3xl dark:bg-[#4bc1d1]/25" />
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.78),rgba(255,255,255,0)_72%)] dark:bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.08),rgba(255,255,255,0)_72%)]" />
        </div>

        <div className="relative z-10 w-full pb-20 pt-28">
          <div className="w-full border-y border-white/50 bg-white/22 px-4 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/24 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto w-full max-w-[1700px]">
            <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
              <div className="space-y-5">
                <BrandLogo />
                <p className="max-w-sm text-sm leading-7 text-slate-700 dark:text-slate-300">
                  Modern healthcare revenue cycle software for patient access, claims operations,
                  collections, analytics, and secure document workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full border border-white/55 bg-white/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#0f6f7b] dark:border-white/10 dark:bg-white/5 dark:text-[#7bd8e3]">
                    HIPAA-aware workflows
                  </span>
                  <span className="inline-flex rounded-full border border-white/55 bg-white/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#0f6f7b] dark:border-white/10 dark:bg-white/5 dark:text-[#7bd8e3]">
                    Audit-ready architecture
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900/80 dark:text-slate-100/80">
                  Platform
                </h3>
                <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <Link href="/dashboard" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <LayoutDashboard className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Dashboard
                  </Link>
                  <Link href="/patients" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <UserRound className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Patient management
                  </Link>
                  <Link href="/claims" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <Stethoscope className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Claims lifecycle
                  </Link>
                  <Link href="/payments" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <WalletCards className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Payments
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900/80 dark:text-slate-100/80">
                  Workflows
                </h3>
                <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <Link href="/appointments" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <BadgeDollarSign className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Scheduling
                  </Link>
                  <Link href="/reports" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <Activity className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Analytics
                  </Link>
                  <Link href="/portal" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <UserRound className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Patient portal
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 transition hover:text-slate-950 dark:hover:text-white">
                    <MonitorCog className="h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    Admin controls
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900/80 dark:text-slate-100/80">
                  Contact
                </h3>
                <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <PhoneCall className="mt-0.5 h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    <p>Designed for clinics, billing teams, and healthcare operators.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    <p>Support: support@pulsercm.app</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[#118293] dark:text-[#7bd8e3]" />
                    <p>Vercel + Supabase ready</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/45 pt-5 text-xs text-slate-700/85 dark:border-white/10 dark:text-slate-300/85 sm:flex-row sm:items-center sm:justify-between">
              <p>PulseRCM platform for healthcare revenue cycle teams.</p>
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="transition hover:text-slate-950 dark:hover:text-white">
                  Dashboard
                </Link>
                <Link href="/reports" className="transition hover:text-slate-950 dark:hover:text-white">
                  Reports
                </Link>
                <Link href="/settings" className="transition hover:text-slate-950 dark:hover:text-white">
                  Settings
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
