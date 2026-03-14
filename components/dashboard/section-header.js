import { Badge } from "@/components/ui/badge";

export function SectionHeader({ eyebrow, title, description, badge }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        {badge ? <Badge variant="outline">{badge}</Badge> : null}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
