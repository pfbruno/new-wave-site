import { Zap, Flame, Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser, dailyGoals } from "@/data/mockGamification";

interface Props {
  className?: string;
  showStreak?: boolean;
  potentialXp?: number;
}

/**
 * Painel discreto de gamificação para colocar no topo de telas de estudo
 * (StudyArea, SimuladoResolver, etc). Mostra XP do dia, streak e meta diária.
 */
export const StudyRewardPanel = ({ className, showStreak = true, potentialXp }: Props) => {
  const goalsDone = dailyGoals.filter((g) => g.done).length;
  const totalGoals = dailyGoals.length;
  const xpToday = dailyGoals.filter((g) => g.done).reduce((s, g) => s + g.xp, 0);
  const questionsPct = Math.round((currentUser.questionsToday / currentUser.dailyGoal) * 100);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/80 backdrop-blur px-3 py-2 text-xs",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 text-accent font-semibold">
        <Zap className="w-3.5 h-3.5" />
        <span className="tabular-nums">+{xpToday} XP</span>
        <span className="text-muted-foreground font-normal">hoje</span>
      </div>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-1.5">
        <Target className="w-3.5 h-3.5 text-primary" />
        <span className="tabular-nums font-medium">
          {currentUser.questionsToday}/{currentUser.dailyGoal}
        </span>
        <span className="text-muted-foreground">questões</span>
        <span className="text-muted-foreground tabular-nums">({questionsPct}%)</span>
      </div>

      {showStreak && (
        <>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-destructive font-medium">
            <Flame className="w-3.5 h-3.5" />
            <span className="tabular-nums">{currentUser.streak}</span>
            <span className="text-muted-foreground font-normal">dias</span>
          </div>
        </>
      )}

      {potentialXp !== undefined && (
        <>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tabular-nums font-semibold">+{potentialXp} XP</span>
            <span className="text-muted-foreground">possíveis</span>
          </div>
        </>
      )}

      <div className="ml-auto flex items-center gap-1.5 text-muted-foreground">
        <span className="tabular-nums font-medium text-foreground">
          {goalsDone}/{totalGoals}
        </span>
        <span>metas do dia</span>
      </div>
    </div>
  );
};
