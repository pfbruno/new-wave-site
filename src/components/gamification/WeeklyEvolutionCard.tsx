import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { weeklyEvolution } from "@/data/mockGamification";

export const WeeklyEvolutionCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Evolução semanal</CardTitle>
        <p className="text-xs text-muted-foreground">Comparado à semana anterior</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {weeklyEvolution.map((e) => {
            const delta = e.current - e.previous;
            const positive = delta >= 0;
            return (
              <div key={e.metric} className="rounded-lg border border-border bg-secondary/30 p-3 space-y-1">
                <p className="text-[11px] text-muted-foreground leading-tight">{e.metric}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-xl font-bold tabular-nums">
                    {e.current}
                    {e.unit}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-medium flex items-center gap-0.5 tabular-nums",
                      positive ? "text-accent" : "text-destructive",
                    )}
                  >
                    {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {positive ? "+" : ""}
                    {Math.round(((delta / e.previous) * 100) * 10) / 10}%
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground tabular-nums">
                  Antes: {e.previous}
                  {e.unit}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
