import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Flame, Sparkles, TrendingUp, TrendingDown, Minus, Globe2, Users, BookOpen } from "lucide-react";
import {
  RankingPodium,
  UserPositionCard,
  RankingInsightCard,
} from "@/components/gamification";
import { rankingPlayers } from "@/data/mockGamification";
import { cn } from "@/lib/utils";

type Period = "semanal" | "mensal" | "geral";
type Scope = "global" | "amigos" | "turma";

const RankChange = ({ rank, prev }: { rank: number; prev: number }) => {
  const diff = prev - rank;
  if (diff > 0)
    return (
      <span className="flex items-center gap-0.5 text-xs font-semibold text-accent tabular-nums">
        <TrendingUp className="w-3 h-3" />+{diff}
      </span>
    );
  if (diff < 0)
    return (
      <span className="flex items-center gap-0.5 text-xs font-semibold text-destructive tabular-nums">
        <TrendingDown className="w-3 h-3" />
        {diff}
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
      <Minus className="w-3 h-3" />
    </span>
  );
};

const Ranking = () => {
  const [period, setPeriod] = useState<Period>("semanal");
  const [scope, setScope] = useState<Scope>("global");

  const top3 = rankingPlayers.slice(0, 3);
  const rest = rankingPlayers.slice(3, 10);
  const currentUserPlayer = rankingPlayers.find((p) => p.isCurrentUser);
  const nextPlayer = rankingPlayers
    .filter((p) => !p.isCurrentUser && p.rank < (currentUserPlayer?.rank || Infinity))
    .sort((a, b) => b.rank - a.rank)[0];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Trophy className="w-7 h-7 text-accent" />
          Ranking
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Acompanhe sua evolução. Foque em superar você mesmo, semana após semana.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList>
            <TabsTrigger value="semanal" className="text-xs">Semanal</TabsTrigger>
            <TabsTrigger value="mensal" className="text-xs">Mensal</TabsTrigger>
            <TabsTrigger value="geral" className="text-xs">Geral</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs value={scope} onValueChange={(v) => setScope(v as Scope)}>
          <TabsList>
            <TabsTrigger value="global" className="text-xs gap-1.5"><Globe2 className="w-3 h-3" /> Global</TabsTrigger>
            <TabsTrigger value="amigos" className="text-xs gap-1.5"><Users className="w-3 h-3" /> Amigos</TabsTrigger>
            <TabsTrigger value="turma" className="text-xs gap-1.5"><BookOpen className="w-3 h-3" /> Turma</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pódio */}
      <Card className="relative overflow-hidden bg-gradient-to-b from-card via-card to-primary/5 border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/10 blur-3xl pointer-events-none" />
        <CardContent className="relative p-5 md:p-8">
          <RankingPodium players={top3} />
        </CardContent>
      </Card>

      {/* Insights pessoais */}
      <RankingInsightCard />

      {/* Grid: lista + insights/recortes */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Lista */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Top vestibulandos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {rest.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-border transition-all"
              >
                <div className="w-7 text-center font-bold text-muted-foreground tabular-nums">{p.rank}</div>
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{p.name}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>Nível {p.level}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Flame className="w-3 h-3 text-destructive" /> {p.streak}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm tabular-nums">{p.weeklyXp.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">XP</p>
                </div>
                <RankChange rank={p.rank} prev={p.prevRank} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recortes alternativos */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-destructive" />
                Top constância
              </CardTitle>
              <p className="text-[11px] text-muted-foreground">Quem mais mantém a sequência</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {rankingPlayers
                .slice(0, 5)
                .sort((a, b) => b.streak - a.streak)
                .slice(0, 4)
                .map((p, i) => (
                  <div key={p.name} className="flex items-center gap-2.5 text-sm">
                    <span className="w-5 text-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="bg-secondary text-[10px] font-semibold">
                        {p.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-1 truncate text-xs font-medium">{p.name}</span>
                    <span className="flex items-center gap-1 text-xs text-destructive font-semibold tabular-nums">
                      <Flame className="w-3 h-3" /> {p.streak}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
            <CardContent className="p-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Filosofia saudável</p>
              <p className="text-sm font-semibold leading-snug">
                O ranking é um espelho do seu esforço.
              </p>
              <p className="text-xs text-muted-foreground leading-snug">
                Foque em superar a sua versão da semana passada. A consistência sempre vence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky bottom: posição do usuário */}
      {currentUserPlayer && <UserPositionCard player={currentUserPlayer} nextPlayer={nextPlayer} />}
    </div>
  );
};

export default Ranking;
