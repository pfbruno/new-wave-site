import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Gift, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { difficultyConfig, type Challenge } from "@/data/mockGamification";

interface Props {
  challenge: Challenge;
  claimed?: boolean;
  onClaim?: (c: Challenge) => void;
}

export const ChallengeCard = ({ challenge, claimed = false, onClaim }: Props) => {
  const Icon = challenge.icon;
  const pct = Math.min(100, Math.round((challenge.progress / challenge.total) * 100));
  const isComplete = challenge.status === "completo" || pct >= 100;
  const diff = difficultyConfig[challenge.difficulty];

  return (
    <Card
      className={cn(
        "border-border bg-card transition-all hover:border-primary/40",
        isComplete && !claimed && "border-accent/50 bg-accent/5",
        claimed && "opacity-70",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3.5">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
              isComplete ? "bg-accent/15 ring-1 ring-accent/30" : "bg-primary/10",
            )}
          >
            {isComplete ? (
              <CheckCircle2 className="w-6 h-6 text-accent" />
            ) : (
              <Icon className="w-6 h-6 text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-2.5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm leading-tight">{challenge.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{challenge.description}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge variant="outline" className={cn("text-[10px] uppercase", diff.classes)}>
                  {diff.label}
                </Badge>
                <Badge variant="outline" className="text-[10px] gap-1 text-muted-foreground border-border">
                  <Clock className="w-3 h-3" /> {challenge.expiresIn}
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground tabular-nums">
                  {challenge.progress}/{challenge.total}
                </span>
                <span className="font-medium tabular-nums">{pct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isComplete ? "bg-accent" : "bg-gradient-to-r from-primary to-primary/70",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="flex items-center gap-1 font-semibold text-accent">
                  <Zap className="w-3.5 h-3.5" /> +{challenge.xpReward} XP
                </span>
                {challenge.bonusReward && (
                  <span className="flex items-center gap-1 text-primary">
                    <Gift className="w-3 h-3" /> {challenge.bonusReward}
                  </span>
                )}
              </div>
              {isComplete && onClaim && (
                <Button
                  size="sm"
                  onClick={() => onClaim(challenge)}
                  disabled={claimed}
                  className={cn(
                    "h-8 text-xs",
                    !claimed && "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90",
                  )}
                >
                  {claimed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resgatado
                    </>
                  ) : (
                    <>
                      <Gift className="w-3.5 h-3.5 mr-1" /> Resgatar
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
