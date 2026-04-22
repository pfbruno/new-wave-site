import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Users } from "lucide-react";
import { currentUser } from "@/data/mockGamification";

const insights = [
  {
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-accent/10",
    text: `Você subiu ${currentUser.prevRankPosition - currentUser.globalRankPosition} posições esta semana`,
  },
  {
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10",
    text: "Faltam 240 XP para entrar no top 30",
  },
  {
    icon: Users,
    color: "text-accent",
    bg: "bg-accent/10",
    text: "Você está acima de 82% dos vestibulandos da sua turma",
  },
];

export const RankingInsightCard = () => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 space-y-2.5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Sua evolução</p>
        {insights.map((i, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${i.bg}`}>
              <i.icon className={`w-4 h-4 ${i.color}`} />
            </div>
            <span className="text-foreground/90">{i.text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
