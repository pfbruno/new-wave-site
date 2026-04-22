import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RankingPlayer } from "@/data/mockGamification";

interface Props {
  players: RankingPlayer[]; // assume sorted with rank 1,2,3
}

export const RankingPodium = ({ players }: Props) => {
  if (players.length < 3) return null;
  const podium = [
    { player: players[1], rank: 2, height: "h-28 md:h-36", icon: Medal, accent: "from-muted-foreground/30 to-transparent", text: "text-muted-foreground" },
    { player: players[0], rank: 1, height: "h-36 md:h-48", icon: Crown, accent: "from-accent/40 to-accent/5", text: "text-accent" },
    { player: players[2], rank: 3, height: "h-24 md:h-32", icon: Award, accent: "from-primary/35 to-primary/5", text: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-5 items-end">
      {podium.map(({ player, rank, height, icon: Icon, accent, text }) => (
        <div key={player.name} className="flex flex-col items-center">
          <div className="relative mb-3">
            <Avatar className={cn("w-14 h-14 md:w-20 md:h-20 ring-2 ring-card", rank === 1 && "shadow-[0_0_36px_-6px_hsl(var(--accent)/0.6)]")}>
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                {player.initials}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -top-2 -right-2 bg-card rounded-full p-1.5 ring-2 ring-border",
              rank === 1 && "ring-accent/40",
            )}>
              <Icon className={cn("w-4 h-4", text)} />
            </div>
          </div>
          <p className="text-xs md:text-sm font-semibold text-center line-clamp-1 px-1">{player.name}</p>
          <p className="text-[11px] text-muted-foreground">Nível {player.level}</p>

          <Card className={cn(
            "w-full mt-3 border-border bg-gradient-to-b",
            accent,
            height,
            "flex items-center justify-center transition-all",
          )}>
            <CardContent className="p-2 text-center space-y-0.5">
              <p className={cn("text-3xl md:text-4xl font-heading font-bold", text)}>{rank}º</p>
              <p className="text-[11px] text-muted-foreground tabular-nums">
                {player.weeklyXp.toLocaleString()} XP
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
