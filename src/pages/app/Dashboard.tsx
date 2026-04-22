import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Target,
  Flame,
  Sparkles,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LevelProgressCard,
  StreakCard,
  DailyGoalCard,
  SubjectMasteryCard,
  RecentUnlocksPanel,
  NextWinsCard,
  WeeklyEvolutionCard,
  MotivationalInsightCard,
  ChallengeCard,
} from "@/components/gamification";
import {
  currentUser,
  subjectMasteries,
  challenges,
  focusToday,
} from "@/data/mockGamification";

const Dashboard = () => {
  const activeChallenges = challenges
    .filter((c) => c.type === "diario" && c.status === "ativo")
    .slice(0, 2);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Greeting */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">
            Bom dia, {currentUser.name.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {currentUser.streak} dias de constância. Continue firme rumo ao ENEM.
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold"
        >
          <Link to="/app/simulados">
            Continuar estudando
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Resumo do dia (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-none tabular-nums">
                  {currentUser.questionsToday}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  de {currentUser.dailyGoal} questões
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-none">{currentUser.studyTimeToday}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">tempo hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Flame className="w-4 h-4 text-destructive" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-none tabular-nums">
                  {currentUser.streak}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">dias de sequência</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-none tabular-nums">
                  {currentUser.weeklyAccuracy}%
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">acerto semanal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/15 to-card border-accent/30 col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-none tabular-nums">
                  +{currentUser.weeklyXp.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">XP esta semana</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Linha 1: Nível + Streak + Foco do dia */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LevelProgressCard />
        </div>
        <StreakCard />
      </div>

      {/* Foco do dia + Metas + Desafios */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Foco do dia */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-primary/10 via-card to-card border-primary/30">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Foco do dia</p>
                <p className="font-heading text-base font-bold leading-tight">{focusToday.area}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">{focusToday.topic}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{focusToday.reason}</p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full border-primary/30 text-primary hover:bg-primary/10">
              <Link to="/app/estudo">
                Estudar agora
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Metas do dia */}
        <DailyGoalCard className="lg:col-span-2" />
      </div>

      {/* Domínio por área do ENEM */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" /> Domínio por área do ENEM
            </h2>
            <p className="text-xs text-muted-foreground">Seu nível e evolução em cada área</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
            <Link to="/app/analytics">
              Ver detalhes <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {subjectMasteries.map((s) => (
            <SubjectMasteryCard key={s.id} subject={s} compact />
          ))}
        </div>
      </div>

      {/* Linha de blocos */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Desafios ativos */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Desafios ativos
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs text-primary h-7 px-2">
                <Link to="/app/desafios">
                  Central de desafios <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {activeChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </CardContent>
        </Card>

        <NextWinsCard className="lg:col-span-1" />
      </div>

      {/* Conquistas + Evolução + Insights */}
      <div className="grid lg:grid-cols-3 gap-4">
        <RecentUnlocksPanel className="lg:col-span-1" />
        <WeeklyEvolutionCard className="lg:col-span-1" />
        <MotivationalInsightCard className="lg:col-span-1" />
      </div>
    </div>
  );
};

export default Dashboard;
