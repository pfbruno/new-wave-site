import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { dailyGoals } from "@/data/mockGamification";

export const DailyGoalCard = ({ className }: { className?: string }) => {
  const completed = dailyGoals.filter((g) => g.done).length;
  const total = dailyGoals.length;
  const overallPct = Math.round((completed / total) * 100);
  const xpEarned = dailyGoals.filter((g) => g.done).reduce((s, g) => s + g.xp, 0);
  const xpAvailable = dailyGoals.reduce((s, g) => s + g.xp, 0);

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" /> Metas do dia
          </CardTitle>
          <span className="text-xs text-muted-foreground tabular-nums">
            {completed}/{total} concluídas · {overallPct}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {dailyGoals.map((g) => {
          const Icon = g.icon;
          const pct = Math.min(100, Math.round((g.current / g.target) * 100));
          return (
            <div key={g.id} className="space-y-1.5">
              <div className="flex items-center gap-2.5 text-sm">
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                    g.done ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {g.done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium truncate", g.done && "text-muted-foreground line-through")}>
                    {g.label}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                  {g.current}/{g.target} {g.unit}
                </span>
                <span className="text-xs font-semibold text-accent flex items-center gap-0.5 shrink-0">
                  <Zap className="w-3 h-3" />+{g.xp}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-secondary/60 ml-9">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    g.done ? "bg-accent" : "bg-primary",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="pt-2 mt-2 border-t border-border/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">XP do dia</span>
          <span className="font-semibold text-accent flex items-center gap-1 tabular-nums">
            <Zap className="w-3 h-3" /> {xpEarned}/{xpAvailable} XP
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
