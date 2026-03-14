"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function VideoLightbox({
  open,
  onClose,
  src,
  poster,
  title = "Video preview",
  caption,
}) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[400] overflow-y-auto bg-slate-950/82 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label="Close video preview"
        onClick={onClose}
      />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/16 bg-[linear-gradient(145deg,rgba(5,20,40,0.98)_0%,rgba(9,39,72,0.96)_58%,rgba(11,78,108,0.94)_100%)] shadow-[0_28px_90px_rgba(2,8,23,0.58)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[0.08em] text-cyan-100">
                {title}
              </p>
              {caption ? (
                <p className="mt-1 text-xs text-cyan-100/72">{caption}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-200/12 text-cyan-100 transition hover:bg-cyan-200/22"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-black">
            <video
              ref={videoRef}
              className="aspect-video w-full max-h-[78vh] bg-black object-contain"
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={poster}
              src={src}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
