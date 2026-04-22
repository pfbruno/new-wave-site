import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpecialEvent } from "@/data/mockGamification";

export const SpecialEventCard = ({ event }: { event: SpecialEvent }) => {
  const Icon = event.icon;
  return (
    <Card
      className={cn(
        "relative overflow-hidden border transition-all hover:-translate-y-0.5",
        event.highlight
          ? "border-accent/40 bg-gradient-to-br from-accent/15 via-card to-primary/10"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      {event.highlight && (
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      )}
      <CardContent className="relative p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                event.highlight ? "bg-accent/20" : "bg-primary/10",
              )}
            >
              <Icon className={cn("w-6 h-6", event.highlight ? "text-accent" : "text-primary")} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{event.subtitle}</p>
              <p className="font-heading text-base font-bold leading-tight truncate">{event.title}</p>
            </div>
          </div>
          {event.highlight && (
            <Badge className="bg-accent text-accent-foreground border-0 text-[10px] uppercase">Destaque</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-snug">{event.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {event.daysLeft} dias restantes
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {event.participants.toLocaleString()} participantes
          </span>
          <Badge variant="outline" className="text-[10px] text-accent border-accent/40 gap-1">
            <Zap className="w-3 h-3" /> {event.xpBonus}
          </Badge>
        </div>

        <Button
          variant={event.highlight ? "default" : "outline"}
          size="sm"
          className={cn(
            "w-full gap-1.5",
            event.highlight && "bg-gradient-to-r from-primary to-accent text-primary-foreground",
          )}
        >
          Participar
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
};
