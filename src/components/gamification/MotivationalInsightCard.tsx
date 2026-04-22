import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motivationalInsights } from "@/data/mockGamification";

const toneStyles = {
  positive: "border-accent/30 bg-accent/5 text-accent",
  neutral: "border-primary/30 bg-primary/5 text-primary",
  warning: "border-destructive/30 bg-destructive/5 text-destructive",
};

export const MotivationalInsightCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardContent className="p-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Insights da semana</p>
        <div className="space-y-2">
          {motivationalInsights.map((i) => {
            const Icon = i.icon;
            return (
              <div
                key={i.id}
                className={cn(
                  "flex items-center gap-2.5 text-sm rounded-lg border px-3 py-2",
                  toneStyles[i.tone],
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-foreground/90 leading-tight">{i.text}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
