import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { nextWins } from "@/data/mockGamification";

export const NextWinsCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          Próximas vitórias
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {nextWins.map((w) => {
          const Icon = w.icon;
          return (
            <button
              key={w.id}
              className="w-full text-left flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-primary/30 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{w.title}</p>
                <p className="text-xs text-muted-foreground truncate">{w.reason}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-accent">+{w.xp} XP</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};
