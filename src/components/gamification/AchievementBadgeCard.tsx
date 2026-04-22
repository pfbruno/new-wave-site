import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { rarityConfig, type AchievementBadge } from "@/data/mockGamification";

interface Props {
  badge: AchievementBadge;
  variant?: "default" | "compact";
}

export const AchievementBadgeCard = ({ badge, variant = "default" }: Props) => {
  const r = rarityConfig[badge.rarity];
  const Icon = badge.icon;
  const pct = Math.min(100, Math.round((badge.progress / badge.total) * 100));
  const nearComplete = !badge.unlocked && pct >= 75;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border transition-all duration-300",
        badge.unlocked
          ? cn("border-border hover:-translate-y-0.5", r.glow)
          : "border-border/60 opacity-90 hover:opacity-100",
        nearComplete && "ring-1 ring-accent/40",
      )}
    >
      {badge.rarity === "lendario" && badge.unlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15 pointer-events-none" />
      )}

      <CardContent className={cn("relative space-y-3", variant === "compact" ? "p-4" : "p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="relative">
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center ring-2 transition-all",
                badge.unlocked ? cn(r.bg, r.ring) : "bg-secondary/40 ring-border",
              )}
            >
              <Icon className={cn("w-7 h-7", badge.unlocked ? r.text : "text-muted-foreground/50")} />
            </div>
            {!badge.unlocked && (
              <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 ring-2 ring-border">
                <Lock className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
          </div>
          <Badge
            variant="outline"
            className={cn("text-[10px] uppercase tracking-wider shrink-0", r.text, r.ring.replace("ring", "border"))}
          >
            {r.label}
          </Badge>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-sm leading-tight">{badge.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">{badge.description}</p>
        </div>

        {!badge.unlocked && (
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700",
                  nearComplete ? "bg-gradient-to-r from-primary to-accent" : "bg-primary/70",
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground tabular-nums">
              {badge.progress}/{badge.total} {nearComplete && <span className="text-accent ml-1">· Quase lá!</span>}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <span className="text-xs font-semibold text-accent flex items-center gap-1">
            <Zap className="w-3 h-3" /> +{badge.xpReward} XP
          </span>
          {badge.unlocked && badge.unlockedAt && (
            <span className="text-[10px] text-muted-foreground">{badge.unlockedAt}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
