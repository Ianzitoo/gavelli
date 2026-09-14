import { cn } from "@/lib/utils";

/**
 * Visible marker for anything that is NOT final launch content:
 * development imagery or catalogue fallbacks.
 */
export function DevPlaceholderBadge({
  className,
  label = "DEV PLACEHOLDER",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none z-10 inline-flex items-center rounded-full border border-destructive/40 bg-destructive/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-destructive-foreground uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}
