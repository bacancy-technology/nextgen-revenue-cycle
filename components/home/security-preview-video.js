"use client";

import { useState } from "react";
import { CirclePlay } from "lucide-react";
import { VideoLightbox } from "@/components/ui/video-lightbox";

const previewVideoSource = "/videos/healthcare-doctor.mp4";

export function SecurityPreviewVideo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="security-video-glow relative overflow-hidden rounded-[22px] border border-white/20 bg-[linear-gradient(150deg,rgba(8,22,43,0.88),rgba(9,39,72,0.78),rgba(16,91,119,0.68))] p-6">
        <video
          className="security-video-pan absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/security-video-poster.svg"
          src={previewVideoSource}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,35,0.42),rgba(7,24,45,0.48))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(75,193,209,0.28),transparent_35%),radial-gradient(circle_at_84%_84%,rgba(123,216,227,0.24),transparent_30%)]" />
        <div className="absolute inset-x-6 top-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/40 bg-cyan-200/20 text-cyan-100 transition duration-300 hover:scale-110 hover:bg-cyan-200/30"
          aria-label="Play healthcare security preview"
        >
          <CirclePlay className="h-7 w-7" />
        </button>

        <div className="relative mt-14 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Policy pass", value: "99.2%" },
            { label: "Blocked events", value: "11" },
            { label: "Audit sync", value: "Realtime" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 p-2.5">
              <p className="text-[11px] uppercase tracking-[0.08em] text-cyan-100/70">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-cyan-50">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {isOpen ? (
        <VideoLightbox
          open={isOpen}
          onClose={() => setIsOpen(false)}
          src={previewVideoSource}
          poster="/images/security-video-poster.svg"
          title="Healthcare doctor workflow demo"
          caption="Real healthcare footage focused on clinician coordination and secure workflows."
        />
      ) : null}
    </>
  );
}
