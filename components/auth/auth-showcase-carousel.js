"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CirclePlay,
  CreditCard,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VideoLightbox } from "@/components/ui/video-lightbox";

const healthcareVideoSource = "/videos/healthcare-doctor.mp4";

const slidesByVariant = {
  login: [
    {
      id: "overview",
      badge: "Healthcare RCM platform",
      title: "A cleaner revenue cycle workspace for patient access, billing, and collections.",
      description:
        "PulseRCM brings appointment readiness, eligibility, claims management, payments, analytics, and patient self-service into one secure SaaS shell.",
      render: "overview",
    },
    {
      id: "video",
      badge: "Workflow preview",
      title: "Watch claims move from intake to payment in one command center.",
      description:
        "The team tracks denials, follow-ups, and patient balances with fewer handoffs and faster response cycles.",
      render: "video",
    },
    {
      id: "stack",
      badge: "Operational snapshots",
      title: "Layered analytics, billing tasks, and patient portal activity in one place.",
      description:
        "Side-by-side visibility for billing staff, providers, and admins keeps priorities aligned every hour.",
      render: "stack",
    },
  ],
  register: [
    {
      id: "overview",
      badge: "Workspace onboarding",
      title: "Create your practice workspace and invite billing and provider teams quickly.",
      description:
        "Set up roles, locations, and operational modules in minutes with a guided onboarding path.",
      render: "overview",
    },
    {
      id: "video",
      badge: "Team setup demo",
      title: "Preview how teams configure claims, schedules, and collections by role.",
      description:
        "From admin controls to staff assignment, onboarding stays clear and fast.",
      render: "video",
    },
    {
      id: "stack",
      badge: "Launch checklist",
      title: "Track setup progress across users, permissions, and workflow readiness.",
      description:
        "Go live with confidence using one shared operational launch board.",
      render: "stack",
    },
  ],
  forgot: [
    {
      id: "overview",
      badge: "Secure account recovery",
      title: "Recover access safely without blocking day-to-day billing operations.",
      description:
        "Reset flows are designed for speed, verification, and secure re-entry into your workspace.",
      render: "overview",
    },
    {
      id: "video",
      badge: "Recovery flow",
      title: "See secure reset, re-verification, and role-protected login checkpoints.",
      description:
        "Every step is logged to preserve auditability and tenant isolation.",
      render: "video",
    },
    {
      id: "stack",
      badge: "Security timeline",
      title: "Recovery events, alerts, and session health in one visual sequence.",
      description:
        "Teams can restore access while preserving compliance requirements.",
      render: "stack",
    },
  ],
  verify: [
    {
      id: "overview",
      badge: "Email verification",
      title: "Verify access to activate secure workflows for your healthcare team.",
      description:
        "Email verification ensures trusted users, protected routes, and compliance-ready access.",
      render: "overview",
    },
    {
      id: "video",
      badge: "Activation preview",
      title: "Watch workspace activation unlock claims, payments, and reporting modules.",
      description:
        "Verification confirms identity before operational data becomes available.",
      render: "video",
    },
    {
      id: "stack",
      badge: "Trusted access",
      title: "Role activation status and verification checkpoints in one compact panel.",
      description:
        "Stay aligned on who is active, pending, or awaiting confirmation.",
      render: "stack",
    },
  ],
};

function OverviewSlide() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[24px] border border-white/65 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/50">
        <ShieldCheck className="mb-4 h-6 w-6 text-primary" />
        <p className="font-semibold">Role-based access</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Admin, billing, provider, and patient workflows with protected routes.
        </p>
      </div>
      <div className="rounded-[24px] border border-white/65 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/50">
        <Sparkles className="mb-4 h-6 w-6 text-primary" />
        <p className="font-semibold">Fast operational UX</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Clear queues, charting, and task-first screens for front office and billing teams.
        </p>
      </div>
    </div>
  );
}

function VideoSlide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-[26px] border border-white/65 bg-[linear-gradient(150deg,rgba(5,18,38,0.95),rgba(8,38,72,0.9),rgba(12,92,123,0.78))] p-5 text-slate-100 shadow-[0_24px_64px_rgba(7,25,46,0.38)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(75,193,209,0.3),transparent_36%),radial-gradient(circle_at_88%_82%,rgba(123,216,227,0.24),transparent_36%)]" />
        <div className="relative mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-[0.08em] text-cyan-100">Live workflow reel</p>
          <Badge className="border-cyan-200/30 bg-cyan-200/15 text-cyan-100">Demo clip</Badge>
        </div>
        <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-black/20 p-6">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-78"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={healthcareVideoSource}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,35,0.42),rgba(7,24,45,0.48))]" />
          <div className="absolute inset-x-6 top-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Play healthcare demo video"
            className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/40 bg-cyan-200/20 text-cyan-50 transition duration-300 hover:scale-110 hover:bg-cyan-200/30"
          >
            <CirclePlay className="h-7 w-7" />
          </button>
          <div className="relative mt-14 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Queue ready", value: "28 claims" },
              { label: "Needs review", value: "6 denials" },
              { label: "Patient follow-up", value: "14 pending" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 p-2.5">
                <p className="text-[11px] uppercase tracking-[0.08em] text-cyan-100/70">{item.label}</p>
                <p className="mt-1 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpen ? (
        <VideoLightbox
          open={isOpen}
          onClose={() => setIsOpen(false)}
          src={healthcareVideoSource}
          title="Healthcare operations demo"
          caption="Preview the RCM workflow reel without it getting trapped inside the auth card."
        />
      ) : null}
    </>
  );
}

function StackSlide() {
  return (
    <div className="relative h-[292px]">
      <div className="absolute right-0 top-4 h-[248px] w-[84%] rounded-[24px] border border-white/60 bg-white/70 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.1)] backdrop-blur dark:border-white/10 dark:bg-slate-950/52">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Revenue pulse</p>
          <p className="text-xs font-semibold text-emerald-600">+12.4%</p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {["Clean claim rate 96.2%", "Days in A/R 34.1", "Claims in flight 1.2K", "Denial rate 4.8%"].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs font-medium text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 h-[250px] w-[68%] rounded-[24px] border border-white/65 bg-[linear-gradient(150deg,rgba(255,255,255,0.88),rgba(240,252,254,0.86),rgba(209,243,248,0.75))] p-4 shadow-[0_18px_45px_rgba(75,193,209,0.18)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(150deg,rgba(8,17,33,0.85),rgba(9,28,45,0.82),rgba(9,39,51,0.75))]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Billing lane</p>
          <Layers3 className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-2.5">
          {[
            "4 claims ready for submission",
            "2 appeals awaiting attachments",
            "3 patient statements sent",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-border/60 bg-white/70 px-3 py-2 text-xs text-slate-700 dark:bg-white/5 dark:text-slate-300">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
          <CreditCard className="h-3.5 w-3.5" />
          Collections synced
        </div>
      </div>
    </div>
  );
}

function SlideVisual({ slide }) {
  if (slide.render === "video") {
    return <VideoSlide />;
  }

  if (slide.render === "stack") {
    return <StackSlide />;
  }

  return <OverviewSlide />;
}

export function AuthShowcaseCarousel({ variant = "login" }) {
  const slides = slidesByVariant[variant] || slidesByVariant.login;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [variant]);

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(id);
  }, [paused]);

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="auth-carousel relative flex h-full min-h-[780px] flex-col overflow-hidden rounded-[34px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.98)_0%,rgba(246,251,255,0.97)_56%,rgba(231,244,251,0.95)_100%)] p-9 shadow-[0_32px_92px_rgba(15,23,42,0.22)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.75)_0%,rgba(229,246,252,0.42)_56%,rgba(75,193,209,0.18)_100%)] dark:bg-[linear-gradient(130deg,rgba(255,255,255,0.04)_0%,rgba(75,193,209,0.08)_60%,rgba(75,193,209,0.04)_100%)]" />
        <div className="absolute -left-10 top-16 h-28 w-28 rounded-full bg-white/62 blur-2xl dark:bg-[#4bc1d1]/10" />
        <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-[#4bc1d1]/22 blur-2xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4bc1d1]/60 to-transparent" />
      </div>

      <div className="relative min-h-[620px] flex-1">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`absolute inset-0 flex flex-col justify-between transition-all duration-500 ${
              index === active
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-4 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">
                {slide.badge}
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-balance">
                  {slide.title}
                </h1>
                <p className="max-w-xl text-base leading-8 text-muted-foreground">
                  {slide.description}
                </p>
              </div>
            </div>

            <SlideVisual slide={slide} />
          </article>
        ))}
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === active ? "w-8 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/55"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/65 bg-white/65 text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/65 bg-white/65 text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
