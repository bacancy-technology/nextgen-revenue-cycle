import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({ href = "/", compact = false, className }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      <div className="brand-gradient relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(75,193,209,0.34)]">
        <div className="absolute inset-[3px] rounded-[14px] border border-white/25" />
        <div className="absolute h-8 w-8 rounded-full bg-white/12 blur-md" />
        <svg
          viewBox="0 0 44 44"
          className="relative h-8 w-8 text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M7 23H14L18 16L22 28L26 20L29 23H37"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32.5" cy="12" r="3.2" fill="currentColor" opacity="0.92" />
        </svg>
      </div>
      {!compact ? (
        <div className="leading-tight">
          <p className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">
            PulseRCM
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Revenue Cycle Cloud
          </p>
        </div>
      ) : null}
    </Link>
  );
}
