import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle2, Zap, Clock, Flame } from "lucide-react";
import { challenges, currentUser } from "@/data/mockGamification";

export const ChallengeOverview = () => {
  const active = challenges.filter((c) => c.status === "ativo").length;
  const completedToday = challenges.filter(
    (c) => c.type === "diario" && c.status === "completo",
  ).length;
  const dailyTotal = challenges.filter((c) => c.type === "diario").length;
  const xpAvailableToday = challenges
    .filter((c) => c.type === "diario")
    .reduce((s, c) => s + c.xpReward, 0);
  const xpEarnedToday = challenges
    .filter((c) => c.type === "diario" && c.status === "completo")
    .reduce((s, c) => s + c.xpReward, 0);

  const stats = [
    {
      label: "Concluídos hoje",
      value: `${completedToday}/${dailyTotal}`,
      icon: CheckCircle2,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Desafios ativos",
      value: active,
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "XP disponível",
      value: `${xpEarnedToday}/${xpAvailableToday}`,
      icon: Zap,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Streak desafios",
      value: `${currentUser.streak} dias`,
      icon: Flame,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      label: "Próximo reset",
      value: "7h 23m",
      icon: Clock,
      color: "text-muted-foreground",
      bg: "bg-secondary",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-primary/8 via-card to-accent/8 border-primary/20">
      <CardContent className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground leading-tight">
                  {s.label}
                </p>
              </div>
              <p className="font-heading text-xl font-bold tabular-nums">{s.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
