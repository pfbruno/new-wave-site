import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RankingPlayer } from "@/data/mockGamification";

interface Props {
  player: RankingPlayer;
  nextPlayer?: RankingPlayer;
}

export const UserPositionCard = ({ player, nextPlayer }: Props) => {
  const diff = player.prevRank - player.rank;
  const distanceXp = nextPlayer ? nextPlayer.weeklyXp - player.weeklyXp : 0;

  return (
    <Card className="border-2 border-primary/40 bg-gradient-to-r from-primary/15 via-card to-accent/10 sticky bottom-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <Badge variant="outline" className="text-primary border-primary/50 shrink-0 uppercase text-[10px]">
            Sua posição
          </Badge>
          <div className="font-heading font-bold text-lg shrink-0 tabular-nums">{player.rank}º</div>
          <Avatar className="w-10 h-10 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold text-sm">
              {player.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{player.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Nível {player.level}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-destructive" /> {player.streak}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-sm tabular-nums">{player.weeklyXp.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">XP semana</p>
          </div>
          <div className="shrink-0">
            {diff > 0 ? (
              <span className="flex items-center gap-0.5 text-xs font-semibold text-accent">
                <TrendingUp className="w-3.5 h-3.5" /> +{diff}
              </span>
            ) : diff < 0 ? (
              <span className="flex items-center gap-0.5 text-xs font-semibold text-destructive">
                <TrendingDown className="w-3.5 h-3.5" /> {diff}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground"><Minus className="w-3.5 h-3.5" /></span>
            )}
          </div>
        </div>

        {nextPlayer && distanceXp > 0 && (
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Faltam <span className="text-accent font-semibold tabular-nums">{distanceXp.toLocaleString()} XP</span> para alcançar {nextPlayer.name.split(" ")[0]}
            </span>
            <span className="text-muted-foreground hidden sm:inline">Continue assim!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
