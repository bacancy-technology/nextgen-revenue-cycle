"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { AuthShowcaseCarousel } from "@/components/auth/auth-showcase-carousel";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  const routeConfig = useMemo(() => {
    if (pathname?.includes("/register")) {
      return {
        variant: "register",
        bgImage: "/images/auth-register-bg.svg",
        pageImage:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2400&q=80",
        formImage:
          "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=1600&q=80",
        formImageAlt: "Healthcare team coordinating patient care with digital records.",
        formImageLabel: "Provider + billing onboarding",
      };
    }

    if (pathname?.includes("/forgot-password")) {
      return {
        variant: "forgot",
        bgImage: "/images/auth-recovery-bg.svg",
        pageImage:
          "https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?auto=format&fit=crop&w=2400&q=80",
      };
    }

    if (pathname?.includes("/verify-email")) {
      return {
        variant: "verify",
        bgImage: "/images/auth-verify-bg.svg",
        pageImage:
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=2400&q=80",
      };
    }

    return {
      variant: "login",
      bgImage: "/images/auth-login-bg.svg",
      pageImage:
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=2400&q=80",
      formImage:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
      formImageAlt: "Nurse and clinician collaborating over patient workflow data.",
      formImageLabel: "Patient access + claims coordination",
    };
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(130deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_46%,rgba(232,238,245,1)_100%)] dark:bg-[linear-gradient(130deg,rgba(2,6,23,1)_0%,rgba(8,18,35,1)_46%,rgba(10,28,38,1)_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55 dark:opacity-36"
          style={{ backgroundImage: `url('${routeConfig.pageImage}')` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-28 dark:opacity-16"
          style={{ backgroundImage: `url('${routeConfig.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.3)_0%,rgba(75,193,209,0.3)_48%,rgba(16,185,129,0.28)_100%)] dark:bg-[linear-gradient(120deg,rgba(14,30,73,0.58)_0%,rgba(12,51,70,0.54)_50%,rgba(7,50,45,0.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,255,255,0.44),transparent_36%),radial-gradient(circle_at_86%_86%,rgba(255,255,255,0.2),transparent_34%)] dark:bg-[radial-gradient(circle_at_12%_14%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_86%_86%,rgba(255,255,255,0.08),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.66)_0%,rgba(241,245,249,0.62)_46%,rgba(229,239,244,0.58)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.5)_0%,rgba(6,15,34,0.54)_52%,rgba(7,20,35,0.56)_100%)]" />
      </div>

      <div className="relative container flex min-h-screen items-center justify-center py-10">
        <div className="grid w-full max-w-[1320px] gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="hidden h-full lg:block">
            <div className="h-full rounded-[36px] bg-[linear-gradient(145deg,rgba(15,23,42,0.16)_0%,rgba(75,193,209,0.28)_100%)] p-[1px] shadow-[0_26px_78px_rgba(15,23,42,0.24)]">
              <AuthShowcaseCarousel variant={routeConfig.variant} />
            </div>
          </div>

          <div className="surface flex h-full min-h-[780px] flex-col rounded-[32px] border-white/70 bg-white/75 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/72 sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <BrandLogo compact />
              <Link href="/" className="text-sm text-primary hover:underline">
                Back to site
              </Link>
            </div>
            {routeConfig.formImage ? (
              <div className="mb-8 overflow-hidden rounded-[24px] border border-[#4bc1d1]/25 bg-slate-900/80 shadow-[0_14px_45px_rgba(7,25,46,0.22)]">
                <div className="relative">
                  <img
                    src={routeConfig.formImage}
                    alt={routeConfig.formImageAlt}
                    className="h-36 w-full object-cover object-center sm:h-40"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,13,28,0.62)_0%,rgba(3,13,28,0.18)_42%,rgba(3,13,28,0.62)_100%)]" />
                  <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100/95">
                      {routeConfig.formImageLabel}
                    </p>
                    <span className="rounded-full border border-cyan-200/35 bg-cyan-200/18 px-2.5 py-1 text-[11px] font-semibold text-cyan-50">
                      Live view
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="flex flex-1 flex-col">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
