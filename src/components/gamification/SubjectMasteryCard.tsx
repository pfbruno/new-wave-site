import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { masteryConfig, type SubjectMastery } from "@/data/mockGamification";

interface SubjectMasteryCardProps {
  subject: SubjectMastery;
  compact?: boolean;
}

export const SubjectMasteryCard = ({ subject, compact = false }: SubjectMasteryCardProps) => {
  const Icon = subject.icon;
  const m = masteryConfig[subject.status];
  const TrendIcon = subject.trend > 0 ? TrendingUp : subject.trend < 0 ? TrendingDown : Minus;
  const trendColor =
    subject.trend > 0 ? "text-accent" : subject.trend < 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <Card className={cn("group bg-card border-border hover:border-primary/40 transition-colors", m.border, "border-l-2")}>
      <CardContent className={cn("space-y-3", compact ? "p-4" : "p-5")}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", m.bg)}>
              <Icon className={cn("w-5 h-5", m.text)} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm leading-tight truncate">{subject.shortName}</p>
              <p className="text-xs text-muted-foreground">Nível {subject.level}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider shrink-0", m.text, m.border)}>
            {m.label}
          </Badge>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-2xl font-bold tabular-nums">{subject.mastery}%</span>
            <span className={cn("flex items-center gap-1 text-xs font-medium tabular-nums", trendColor)}>
              <TrendIcon className="w-3 h-3" />
              {subject.trend > 0 ? "+" : ""}
              {subject.trend}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                subject.status === "forte" && "bg-accent",
                subject.status === "mediana" && "bg-primary",
                subject.status === "revisar" && "bg-destructive",
              )}
              style={{ width: `${subject.mastery}%` }}
            />
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <p className="text-muted-foreground">Tópico forte</p>
              <p className="font-medium text-accent truncate">{subject.strongTopic}</p>
            </div>
            <div>
              <p className="text-muted-foreground">A revisar</p>
              <p className="font-medium text-destructive truncate">{subject.weakTopic}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
