import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { recentUnlocks, rarityConfig } from "@/data/mockGamification";

export const RecentUnlocksPanel = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            Conquistas recentes
          </CardTitle>
          <Button asChild variant="ghost" size="sm" className="text-xs text-primary h-7 px-2">
            <Link to="/app/conquistas">
              Ver todas <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {recentUnlocks.map((b) => {
          const r = rarityConfig[b.rarity];
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center ring-1", r.bg, r.ring)}>
                <Icon className={cn("w-4 h-4", r.text)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{b.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{r.label} · {b.unlockedAt}</p>
              </div>
              <span className="text-xs font-semibold text-accent shrink-0">+{b.xpReward} XP</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
