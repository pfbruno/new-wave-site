import { cn } from "@/lib/utils";

interface XPProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const XPProgressBar = ({ current, total, className, showLabel = true, size = "md" }: XPProgressBarProps) => {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3" };

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">XP</span>
          <span className="font-medium tabular-nums">
            {current.toLocaleString()} / {total.toLocaleString()}
          </span>
        </div>
      )}
      <div className={cn("relative w-full overflow-hidden rounded-full bg-secondary/60", heights[size])}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-700 ease-out shadow-[0_0_12px_-2px_hsl(var(--primary)/0.6)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
