import { cn } from "@/lib/utils";

export function Avatar({ name, className }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary",
        className
      )}
    >
      {initials}
    </div>
  );
}
