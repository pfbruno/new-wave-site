import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/data/mockGamification";

const days = ["S", "T", "Q", "Q", "S", "S", "D"];
// Mock dos últimos 7 dias - todos completos exceto domingo passado
const last7 = [true, true, true, true, true, true, false];

export const StreakCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("bg-gradient-to-br from-destructive/10 via-card to-card border-destructive/20", className)}>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-destructive/15 flex items-center justify-center">
                <Flame className="w-6 h-6 text-destructive" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-destructive/20 blur-md -z-10" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Sequência</p>
              <p className="font-heading text-2xl font-bold leading-none">
                {currentUser.streak} <span className="text-sm text-muted-foreground font-normal">dias</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Recorde</p>
            <p className="text-sm font-semibold">{currentUser.longestStreak} dias</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={cn(
                  "w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-semibold",
                  last7[i]
                    ? "bg-destructive/20 text-destructive ring-1 ring-destructive/40"
                    : "bg-secondary/50 text-muted-foreground/40",
                )}
              >
                {last7[i] ? <Flame className="w-3 h-3" /> : d}
              </div>
              <span className="text-[10px] text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
