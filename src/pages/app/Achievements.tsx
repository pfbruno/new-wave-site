import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Sparkles, Star, Lock } from "lucide-react";
import {
  AchievementBadgeCard,
  AchievementCollectionProgress,
  LevelProgressCard,
  StreakCard,
} from "@/components/gamification";
import {
  achievements,
  categoryLabels,
  type BadgeCategory,
  rarityConfig,
} from "@/data/mockGamification";
import { cn } from "@/lib/utils";

type FilterCategory = "todas" | BadgeCategory;

const filterTabs: { value: FilterCategory; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "consistencia", label: "Consistência" },
  { value: "estudo", label: "Estudo" },
  { value: "desempenho", label: "Desempenho" },
  { value: "dominio", label: "Por matéria" },
  { value: "revisao", label: "Revisão" },
  { value: "especial", label: "Especiais" },
];

const Achievements = () => {
  const [filter, setFilter] = useState<FilterCategory>("todas");

  const filtered = useMemo(
    () => (filter === "todas" ? achievements : achievements.filter((b) => b.category === filter)),
    [filter],
  );

  const unlocked = filtered.filter((b) => b.unlocked);
  const inProgress = filtered.filter((b) => !b.unlocked && b.progress / b.total >= 0.5);
  const locked = filtered.filter((b) => !b.unlocked && b.progress / b.total < 0.5);

  // Quase lá - próximos do desbloqueio (independente do filtro)
  const nearComplete = useMemo(
    () =>
      achievements
        .filter((b) => !b.unlocked && b.progress / b.total >= 0.6)
        .sort((a, b) => b.progress / b.total - a.progress / a.total)
        .slice(0, 4),
    [],
  );

  // Mais raros (lendários e épicos bloqueados)
  const rare = useMemo(
    () =>
      achievements
        .filter((b) => !b.unlocked && (b.rarity === "lendario" || b.rarity === "epico"))
        .slice(0, 4),
    [],
  );

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Trophy className="w-7 h-7 text-accent" />
          Conquistas
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Marque sua jornada rumo ao ENEM com badges por consistência, domínio e desempenho.
        </p>
      </div>

      {/* Player + coleção */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LevelProgressCard />
        </div>
        <StreakCard />
      </div>

      <AchievementCollectionProgress />

      {/* Quase lá */}
      {nearComplete.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Quase lá
            </h2>
            <span className="text-xs text-muted-foreground">
              {nearComplete.length} conquistas perto de desbloquear
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {nearComplete.map((b) => (
              <AchievementBadgeCard key={b.id} badge={b} />
            ))}
          </div>
        </section>
      )}

      {/* Mais raros */}
      {rare.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Mais raros
            </h2>
            <span className="text-xs text-muted-foreground">Conquistas lendárias e épicas</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {rare.map((b) => (
              <AchievementBadgeCard key={b.id} badge={b} />
            ))}
          </div>
        </section>
      )}

      {/* Filtros + listas */}
      <section className="space-y-4">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterCategory)}>
          <div className="overflow-x-auto -mx-1 px-1">
            <TabsList className="inline-flex w-max">
              {filterTabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="text-xs px-3">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={filter} className="space-y-6 mt-5">
            {/* Desbloqueadas */}
            {unlocked.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  Desbloqueadas
                  <span className="text-xs text-muted-foreground font-normal">({unlocked.length})</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {unlocked.map((b) => (
                    <AchievementBadgeCard key={b.id} badge={b} />
                  ))}
                </div>
              </div>
            )}

            {/* Em progresso */}
            {inProgress.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Em progresso
                  <span className="text-xs text-muted-foreground font-normal">({inProgress.length})</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {inProgress.map((b) => (
                    <AchievementBadgeCard key={b.id} badge={b} />
                  ))}
                </div>
              </div>
            )}

            {/* Bloqueadas */}
            {locked.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  A descobrir
                  <span className="text-xs text-muted-foreground font-normal">({locked.length})</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {locked.map((b) => (
                    <AchievementBadgeCard key={b.id} badge={b} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <Card className="bg-card border-dashed border-border">
                <CardContent className="p-10 text-center space-y-2">
                  <Trophy className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                  <p className="font-medium">Nada nessa categoria ainda</p>
                  <p className="text-sm text-muted-foreground">Continue estudando para desbloquear novas conquistas.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Achievements;
