import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Target, Calendar, TrendingUp, Sparkles, Wand2, CalendarDays } from "lucide-react";
import {
  ChallengeCard,
  ChallengeOverview,
  SpecialEventCard,
} from "@/components/gamification";
import { challenges, specialEvents, type Challenge } from "@/data/mockGamification";
import { cn } from "@/lib/utils";

type Tab = "diario" | "semanal" | "especial" | "recomendado";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const weekProgress = [3, 4, 2, 5, 4, 3, 2]; // mock - desafios completos por dia

const Challenges = () => {
  const [tab, setTab] = useState<Tab>("diario");
  const [claimed, setClaimed] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => challenges.filter((c) => c.type === tab), [tab]);

  const handleClaim = (c: Challenge) => {
    if (claimed.has(c.id)) return;
    setClaimed((prev) => new Set(prev).add(c.id));
    toast.success(`+${c.xpReward} XP recebidos!`, {
      description: c.bonusReward ? `Bônus: ${c.bonusReward}` : undefined,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Target className="w-7 h-7 text-primary" />
          Desafios
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Missões inteligentes para acelerar seu progresso rumo ao ENEM.
        </p>
      </div>

      {/* Resumo geral */}
      <ChallengeOverview />

      {/* Eventos especiais */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Eventos especiais
          </h2>
          <span className="text-xs text-muted-foreground hidden sm:inline">Campanhas e missões com bônus</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialEvents.map((e) => (
            <SpecialEventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Timeline da semana */}
      <Card className="bg-card border-border">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Sua semana de desafios</p>
            </div>
            <span className="text-xs text-muted-foreground">23 desafios completos</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d, i) => {
              const total = weekProgress[i];
              const isToday = i === 4; // Sex mock
              return (
                <div key={d} className="space-y-1.5 text-center">
                  <div
                    className={cn(
                      "h-16 rounded-lg flex flex-col items-center justify-center transition-all",
                      isToday ? "bg-primary/15 ring-1 ring-primary/40" : "bg-secondary/40",
                    )}
                  >
                    <span className="font-heading text-lg font-bold tabular-nums">{total}</span>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">desafios</span>
                  </div>
                  <span className={cn(
                    "text-[11px] font-medium",
                    isToday ? "text-primary" : "text-muted-foreground",
                  )}>
                    {d}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <div className="overflow-x-auto -mx-1 px-1">
          <TabsList className="inline-flex w-max">
            <TabsTrigger value="diario" className="gap-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5" /> Diários
            </TabsTrigger>
            <TabsTrigger value="semanal" className="gap-1.5 text-xs">
              <TrendingUp className="w-3.5 h-3.5" /> Semanais
            </TabsTrigger>
            <TabsTrigger value="especial" className="gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Especiais
            </TabsTrigger>
            <TabsTrigger value="recomendado" className="gap-1.5 text-xs">
              <Wand2 className="w-3.5 h-3.5" /> Para você
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={tab} className="space-y-3 mt-5">
          {tab === "recomendado" && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Wand2 className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Desafios personalizados</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Recomendados com base nos seus erros, áreas fracas e ritmo de estudo.
                </p>
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            filtered.map((c) => (
              <ChallengeCard
                key={c.id}
                challenge={c}
                claimed={claimed.has(c.id)}
                onClaim={handleClaim}
              />
            ))
          ) : (
            <Card className="bg-card border-dashed border-border">
              <CardContent className="p-10 text-center space-y-2">
                <Target className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                <p className="font-medium">Nenhum desafio aqui agora</p>
                <p className="text-sm text-muted-foreground">
                  Volte mais tarde para ver novos desafios disponíveis.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Challenges;
