import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { categoryLabels, achievements, type BadgeCategory } from "@/data/mockGamification";
import { cn } from "@/lib/utils";

export const AchievementCollectionProgress = ({ className }: { className?: string }) => {
  const total = achievements.length;
  const unlocked = achievements.filter((a) => a.unlocked).length;
  const pct = Math.round((unlocked / total) * 100);
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  const categories = Object.keys(categoryLabels) as BadgeCategory[];

  return (
    <Card className={cn("bg-gradient-to-br from-card via-card to-primary/5 border-border", className)}>
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative shrink-0">
            <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
              <circle cx="55" cy="55" r={radius} stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
              <circle
                cx="55"
                cy="55"
                r={radius}
                stroke="url(#grad)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Trophy className="w-4 h-4 text-accent mb-0.5" />
              <span className="font-heading text-xl font-bold leading-none">{pct}%</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">{unlocked}/{total}</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-2.5">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Coleção de conquistas</p>
              <p className="font-heading text-lg font-bold">Sua jornada ENEM</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {categories.map((c) => {
                const catBadges = achievements.filter((a) => a.category === c);
                const catUnlocked = catBadges.filter((a) => a.unlocked).length;
                return (
                  <div key={c} className="px-2.5 py-1.5 rounded-md bg-secondary/40 border border-border/50">
                    <p className="text-[10px] text-muted-foreground truncate">{categoryLabels[c]}</p>
                    <p className="text-xs font-semibold tabular-nums">
                      {catUnlocked}/{catBadges.length}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
