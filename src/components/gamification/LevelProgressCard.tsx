import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp } from "lucide-react";
import { XPProgressBar } from "./XPProgressBar";
import { currentUser } from "@/data/mockGamification";

export const LevelProgressCard = () => {
  const remaining = currentUser.xpToNextLevel - currentUser.xp;
  const pct = Math.round((currentUser.xp / currentUser.xpToNextLevel) * 100);

  return (
    <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/15 via-card to-accent/10">
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      <CardContent className="relative p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-heading font-bold text-primary-foreground shadow-lg shadow-primary/30">
              {currentUser.level}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-accent rounded-full p-1.5 ring-4 ring-card">
              <Sparkles className="w-3 h-3 text-accent-foreground" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Nível atual</p>
            <p className="font-heading text-2xl font-bold leading-tight">Nível {currentUser.level}</p>
            <p className="text-sm text-primary font-medium truncate">{currentUser.rankTitle}</p>
          </div>
        </div>

        <div className="space-y-2">
          <XPProgressBar current={currentUser.xp} total={currentUser.xpToNextLevel} size="lg" />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-accent" />
              Total: {currentUser.totalXp.toLocaleString()} XP
            </span>
            <span className="font-medium text-foreground">
              {remaining.toLocaleString()} XP para o nível {currentUser.level + 1}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
