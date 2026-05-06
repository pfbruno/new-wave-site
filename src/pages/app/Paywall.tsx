import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Sparkles,
  Crown,
  Zap,
  MessageSquareText,
  ListChecks,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type PaywallContext = "general" | "chat";

const copy: Record<PaywallContext, { title: string; subtitle: string }> = {
  general: {
    title: "Você atingiu seu limite diário gratuito",
    subtitle:
      "Você já utilizou seu limite de hoje no plano Free. Para continuar estudando agora, escolha um plano Pro ou volte amanhã com um novo limite gratuito.",
  },
  chat: {
    title: "Você atingiu o limite diário do Chat IA",
    subtitle:
      "Você já usou suas gerações gratuitas de hoje. Continue com o plano Pro ou volte amanhã para novas interações.",
  },
};

const monthlyBenefits = [
  "Responda mais questões por dia",
  "Continue seus simulados e treinos sem bloqueio diário",
  "Use o Chat IA com limite ampliado",
  "Acompanhe sua evolução com mais profundidade",
  "Ideal para rotina de estudo contínua",
];

const annualBenefits = [
  "Todos os benefícios do plano mensal",
  "Melhor custo-benefício",
  "Ideal para preparação de longo prazo para o ENEM",
  "Menos interrupções na rotina de estudo",
  "Acesso contínuo aos recursos Pro",
];

const comparison = [
  {
    label: "Questões por dia",
    free: "10 questões",
    pro: "Uso ampliado",
    icon: ListChecks,
  },
  {
    label: "Chat IA",
    free: "5 gerações",
    pro: "Limite ampliado",
    icon: MessageSquareText,
  },
  {
    label: "Provas, simulados e treinos",
    free: "Com limite diário",
    pro: "Sem bloqueio diário padrão",
    icon: Zap,
  },
  {
    label: "Indicação de uso",
    free: "Para testar a plataforma",
    pro: "Para preparação constante",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    q: "O que acontece se eu não assinar?",
    a: "Você pode voltar amanhã e usar novamente o limite gratuito diário.",
  },
  {
    q: "O plano Free perde acesso às provas?",
    a: "Não. O plano Free continua com acesso à plataforma, mas com limite diário de uso.",
  },
  {
    q: "O limite vale para quais áreas?",
    a: "O limite de questões vale para Provas, Simulados e Modo Treinar. O Chat IA possui um limite separado.",
  },
  {
    q: "Posso cancelar o plano Pro?",
    a: "Sim. O cancelamento pode ser feito a qualquer momento conforme a plataforma de pagamento utilizada na contratação, sem fidelidade obrigatória.",
  },
  {
    q: "O plano anual vale a pena?",
    a: "Sim, para quem pretende estudar por vários meses e quer reduzir interrupções na rotina.",
  },
];

const Paywall = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const context = (params.get("context") as PaywallContext) || "general";
  const { title, subtitle } = copy[context];

  const onClickMonthly = () => {
    // Placeholder para integração futura com checkout
    console.log("checkout:monthly");
  };

  const onClickAnnual = () => {
    // Placeholder para integração futura com checkout
    console.log("checkout:annual");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[320px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold leading-none">MinhAprovação</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Plataforma inteligente de estudos
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/app")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Voltar ao dashboard</span>
            <span className="sm:hidden">Voltar</span>
          </Button>
        </header>

        {/* Limit reached */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr,1fr] lg:items-center">
          <div>
            <Badge
              variant="outline"
              className="border-destructive/40 bg-destructive/10 text-destructive"
            >
              <Clock className="mr-1.5 h-3 w-3" />
              Limite diário atingido
            </Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </div>

          <Card className="border-border/60 bg-card/60 backdrop-blur">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wider">
                Seu status hoje
              </CardDescription>
              <CardTitle className="flex items-center justify-between text-xl">
                Plano atual
                <Badge variant="secondary" className="text-xs font-medium">
                  Free
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <StatusRow icon={ListChecks} label="Questões gratuitas" value="10 / dia" />
              <StatusRow icon={MessageSquareText} label="Chat IA gratuito" value="5 gerações / dia" />
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-destructive">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                </span>
                <span className="text-sm font-medium">Limite diário atingido</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Plans */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <PlanCard
            name="Pro Mensal"
            description="Para quem quer continuar estudando sem esperar o próximo dia."
            price="R$ XX,XX"
            period="/mês"
            benefits={monthlyBenefits}
            ctaLabel="Assinar mensal"
            onClick={onClickMonthly}
          />
          <PlanCard
            name="Pro Anual"
            description="Para quem quer se preparar com constância durante o ano."
            price="R$ XX,XX"
            period="/ano"
            benefits={annualBenefits}
            ctaLabel="Assinar anual"
            onClick={onClickAnnual}
            highlighted
            badge="Melhor escolha"
            footnote="Economize em relação ao plano mensal."
          />
        </section>

        {/* Comparison */}
        <section className="mt-14">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Free vs Pro</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare o que muda na sua rotina de estudo.
            </p>
          </div>

          <Card className="mt-6 overflow-hidden border-border/60 bg-card/60 backdrop-blur">
            <div className="grid grid-cols-[1.2fr,1fr,1fr] divide-x divide-border/60 border-b border-border/60 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="px-4 py-3 sm:px-6">Recurso</div>
              <div className="px-4 py-3 text-center sm:px-6">Free</div>
              <div className="flex items-center justify-center gap-1.5 bg-primary/5 px-4 py-3 text-primary sm:px-6">
                <Crown className="h-3.5 w-3.5" />
                Pro
              </div>
            </div>
            {comparison.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.2fr,1fr,1fr] divide-x divide-border/60 border-b border-border/60 last:border-b-0"
              >
                <div className="flex items-center gap-2.5 px-4 py-4 text-sm font-medium sm:px-6">
                  <row.icon className="h-4 w-4 text-muted-foreground" />
                  {row.label}
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center text-sm text-muted-foreground sm:px-6">
                  {row.free}
                </div>
                <div className="flex items-center justify-center bg-primary/5 px-4 py-4 text-center text-sm font-medium text-foreground sm:px-6">
                  {row.pro}
                </div>
              </div>
            ))}
          </Card>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            O uso ampliado segue uma política de uso justo para garantir qualidade do serviço.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Perguntas frequentes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tire suas dúvidas antes de assinar.
            </p>
          </div>

          <Card className="mt-6 border-border/60 bg-card/60 px-2 backdrop-blur sm:px-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="border-border/60 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline sm:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-14 rounded-2xl border border-border/60 bg-card/40 p-6 text-center backdrop-blur sm:p-8">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sem promessas falsas de aprovação. A MinhAprovação ajuda você a estudar com mais
            consistência, revisar erros e acompanhar sua evolução.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => navigate("/app")}>
              Voltar amanhã
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/app")}
              className="text-muted-foreground hover:text-foreground"
            >
              Voltar ao dashboard
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

const StatusRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2.5">
    <div className="flex items-center gap-2.5 text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  benefits: string[];
  ctaLabel: string;
  onClick: () => void;
  highlighted?: boolean;
  badge?: string;
  footnote?: string;
}

const PlanCard = ({
  name,
  description,
  price,
  period,
  benefits,
  ctaLabel,
  onClick,
  highlighted,
  badge,
  footnote,
}: PlanCardProps) => (
  <div
    className={cn(
      "relative flex flex-col rounded-2xl border p-6 backdrop-blur transition-all sm:p-8",
      highlighted
        ? "border-primary/50 bg-gradient-to-b from-primary/10 via-card/80 to-card shadow-2xl shadow-primary/10"
        : "border-border/60 bg-card/60 hover:border-border",
    )}
  >
    {badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge className="bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30">
          <Crown className="mr-1 h-3 w-3" />
          {badge}
        </Badge>
      </div>
    )}

    <div className="flex items-center gap-2">
      <h3 className="font-heading text-xl font-bold">{name}</h3>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>

    <div className="mt-6 flex items-baseline gap-1">
      <span className="font-heading text-4xl font-bold tracking-tight">{price}</span>
      <span className="text-sm text-muted-foreground">{period}</span>
    </div>
    {footnote && (
      <p className="mt-1 text-xs font-medium text-accent">{footnote}</p>
    )}

    <ul className="mt-6 flex-1 space-y-3">
      {benefits.map((b) => (
        <li key={b} className="flex items-start gap-2.5 text-sm">
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              highlighted ? "bg-accent/20 text-accent" : "bg-primary/15 text-primary",
            )}
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="text-foreground/90">{b}</span>
        </li>
      ))}
    </ul>

    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "mt-8 w-full font-semibold",
        highlighted
          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
          : "",
      )}
      variant={highlighted ? "default" : "secondary"}
    >
      {ctaLabel}
    </Button>
  </div>
);

export default Paywall;
