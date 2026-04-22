// Mock data centralizado de gamificação para StudyPro ENEM
// Todos os dados são coerentes entre Dashboard, Achievements, Challenges e Ranking
import {
  Flame,
  Target,
  BookOpen,
  Brain,
  Award,
  Crown,
  Trophy,
  Sparkles,
  Calculator,
  Microscope,
  Globe,
  Languages,
  PenLine,
  TrendingUp,
  Zap,
  CheckCircle2,
  RefreshCw,
  Clock,
  GraduationCap,
  Layers,
  type LucideIcon,
} from "lucide-react";

// ============ TIPOS ============
export type EnemArea = "matematica" | "linguagens" | "humanas" | "natureza" | "redacao";
export type MasteryStatus = "forte" | "mediana" | "revisar";
export type BadgeRarity = "comum" | "raro" | "epico" | "lendario";
export type BadgeCategory =
  | "consistencia"
  | "estudo"
  | "desempenho"
  | "dominio"
  | "revisao"
  | "especial";
export type BadgeState = "unlocked" | "in_progress" | "near" | "locked";
export type ChallengeType = "diario" | "semanal" | "especial" | "recomendado";
export type ChallengeStatus = "ativo" | "completo" | "expirado" | "claimed";
export type ChallengeDifficulty = "facil" | "medio" | "dificil";

// ============ USUÁRIO ATUAL ============
export const currentUser = {
  name: "João Pedro",
  initials: "JP",
  level: 14,
  rankTitle: "Vestibulando Avançado",
  xp: 3420,
  xpToNextLevel: 4500,
  totalXp: 28560,
  streak: 12,
  longestStreak: 23,
  weeklyXp: 2180,
  weeklyAccuracy: 74,
  lastWeekAccuracy: 68,
  questionsAnswered: 1420,
  questionsToday: 42,
  dailyGoal: 60,
  studyTimeToday: "2h 35min",
  studyTimeWeek: "14h 20min",
  reviewedErrors: 87,
  miniSimuladosDone: 9,
  globalRankPosition: 47,
  prevRankPosition: 52,
};

// ============ ÁREAS DO ENEM ============
export interface SubjectMastery {
  id: EnemArea;
  name: string;
  shortName: string;
  icon: LucideIcon;
  level: number;
  mastery: number; // 0-100
  trend: number; // delta vs semana anterior
  status: MasteryStatus;
  topQuestions: number;
  weakTopic: string;
  strongTopic: string;
  color: string; // tailwind utility for accent line
}

export const subjectMasteries: SubjectMastery[] = [
  {
    id: "matematica",
    name: "Matemática e suas Tecnologias",
    shortName: "Matemática",
    icon: Calculator,
    level: 11,
    mastery: 64,
    trend: 8,
    status: "mediana",
    topQuestions: 312,
    weakTopic: "Trigonometria",
    strongTopic: "Funções",
    color: "primary",
  },
  {
    id: "linguagens",
    name: "Linguagens, Códigos e suas Tecnologias",
    shortName: "Linguagens",
    icon: Languages,
    level: 13,
    mastery: 78,
    trend: 5,
    status: "forte",
    topQuestions: 286,
    weakTopic: "Interpretação de texto",
    strongTopic: "Literatura",
    color: "accent",
  },
  {
    id: "humanas",
    name: "Ciências Humanas e suas Tecnologias",
    shortName: "Humanas",
    icon: Globe,
    level: 12,
    mastery: 71,
    trend: 3,
    status: "forte",
    topQuestions: 264,
    weakTopic: "Geopolítica",
    strongTopic: "Brasil República",
    color: "primary",
  },
  {
    id: "natureza",
    name: "Ciências da Natureza e suas Tecnologias",
    shortName: "Natureza",
    icon: Microscope,
    level: 9,
    mastery: 52,
    trend: -2,
    status: "revisar",
    topQuestions: 248,
    weakTopic: "Termodinâmica",
    strongTopic: "Citologia",
    color: "destructive",
  },
  {
    id: "redacao",
    name: "Redação",
    shortName: "Redação",
    icon: PenLine,
    level: 10,
    mastery: 68,
    trend: 12,
    status: "mediana",
    topQuestions: 14,
    weakTopic: "Proposta de intervenção",
    strongTopic: "Coesão",
    color: "accent",
  },
];

// ============ METAS DO DIA / SEMANA ============
export interface DailyGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  icon: LucideIcon;
  xp: number;
  done: boolean;
}

export const dailyGoals: DailyGoal[] = [
  { id: "g1", label: "Resolver questões", current: 42, target: 60, unit: "questões", icon: BookOpen, xp: 60, done: false },
  { id: "g2", label: "Tempo de estudo", current: 155, target: 180, unit: "min", icon: Clock, xp: 40, done: false },
  { id: "g3", label: "Revisar erros", current: 8, target: 8, unit: "erros", icon: RefreshCw, xp: 30, done: true },
  { id: "g4", label: "Mini simulado", current: 0, target: 1, unit: "", icon: Layers, xp: 80, done: false },
];

export const focusToday = {
  area: "Matemática",
  topic: "Funções do 2º grau",
  reason: "Você acertou 58% das últimas questões dessa matéria",
};

// ============ CONQUISTAS / BADGES ============
export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  rarity: BadgeRarity;
  category: BadgeCategory;
  xpReward: number;
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedAt?: string;
  area?: EnemArea;
}

export const achievements: AchievementBadge[] = [
  // Consistência
  { id: "b1", title: "Primeiro Passo", description: "Conclua seu primeiro simulado", icon: GraduationCap, rarity: "comum", category: "consistencia", xpReward: 50, progress: 1, total: 1, unlocked: true, unlockedAt: "Há 2 meses" },
  { id: "b2", title: "Constância", description: "3 dias seguidos de estudo", icon: Flame, rarity: "comum", category: "consistencia", xpReward: 80, progress: 3, total: 3, unlocked: true, unlockedAt: "Há 1 mês" },
  { id: "b3", title: "Semana Cheia", description: "7 dias seguidos de estudo", icon: Flame, rarity: "raro", category: "consistencia", xpReward: 200, progress: 7, total: 7, unlocked: true, unlockedAt: "Há 1 semana" },
  { id: "b4", title: "Foco Quinzenal", description: "15 dias seguidos de estudo", icon: Flame, rarity: "epico", category: "consistencia", xpReward: 500, progress: 12, total: 15, unlocked: false },
  { id: "b5", title: "Imparável", description: "30 dias seguidos de estudo", icon: Flame, rarity: "lendario", category: "consistencia", xpReward: 1500, progress: 12, total: 30, unlocked: false },

  // Estudo
  { id: "b6", title: "50 Questões", description: "Resolva 50 questões oficiais", icon: BookOpen, rarity: "comum", category: "estudo", xpReward: 60, progress: 50, total: 50, unlocked: true, unlockedAt: "Há 3 semanas" },
  { id: "b7", title: "Centurião", description: "Resolva 100 questões oficiais", icon: BookOpen, rarity: "raro", category: "estudo", xpReward: 150, progress: 100, total: 100, unlocked: true, unlockedAt: "Há 2 semanas" },
  { id: "b8", title: "250 Questões", description: "Resolva 250 questões oficiais", icon: BookOpen, rarity: "epico", category: "estudo", xpReward: 400, progress: 250, total: 250, unlocked: true, unlockedAt: "Há 4 dias" },
  { id: "b9", title: "Mil Questões", description: "Resolva 1000 questões oficiais", icon: BookOpen, rarity: "lendario", category: "estudo", xpReward: 1200, progress: 1420, total: 1000, unlocked: true, unlockedAt: "Há 2 dias" },

  // Revisão
  { id: "b10", title: "Aprendendo com erros", description: "Revise 20 questões erradas", icon: RefreshCw, rarity: "raro", category: "revisao", xpReward: 180, progress: 20, total: 20, unlocked: true, unlockedAt: "Hoje" },
  { id: "b11", title: "Caçador de erros", description: "Revise 100 questões erradas", icon: RefreshCw, rarity: "epico", category: "revisao", xpReward: 500, progress: 87, total: 100, unlocked: false },

  // Domínio por matéria
  { id: "b12", title: "Funções na cabeça", description: "Domine o tópico Funções (80% acerto)", icon: Brain, rarity: "raro", category: "dominio", xpReward: 250, progress: 8, total: 10, unlocked: false, area: "matematica" },
  { id: "b13", title: "Linguagens em alta", description: "Linguagens com 75%+ de acerto na semana", icon: Languages, rarity: "raro", category: "dominio", xpReward: 250, progress: 78, total: 75, unlocked: true, unlockedAt: "Esta semana", area: "linguagens" },
  { id: "b14", title: "Matemática em evolução", description: "+10% de acerto em Matemática vs semana anterior", icon: TrendingUp, rarity: "epico", category: "dominio", xpReward: 400, progress: 8, total: 10, unlocked: false, area: "matematica" },
  { id: "b15", title: "Reta da Natureza", description: "Eleve Natureza para nível 12", icon: Microscope, rarity: "epico", category: "dominio", xpReward: 600, progress: 9, total: 12, unlocked: false, area: "natureza" },

  // Desempenho
  { id: "b16", title: "Acerto cirúrgico", description: "Atinja 80% em um simulado oficial", icon: Target, rarity: "raro", category: "desempenho", xpReward: 200, progress: 1, total: 1, unlocked: true, unlockedAt: "Há 5 dias" },
  { id: "b17", title: "Mestre do simulado", description: "90% em 5 simulados oficiais", icon: Crown, rarity: "lendario", category: "desempenho", xpReward: 1500, progress: 2, total: 5, unlocked: false },
  { id: "b18", title: "5 Mini Simulados", description: "Conclua 5 mini simulados", icon: Layers, rarity: "comum", category: "desempenho", xpReward: 120, progress: 9, total: 5, unlocked: true, unlockedAt: "Há 6 dias" },

  // Especiais ENEM
  { id: "b19", title: "Redação em dia", description: "Entregue 4 redações no mês", icon: PenLine, rarity: "raro", category: "especial", xpReward: 300, progress: 3, total: 4, unlocked: false, area: "redacao" },
  { id: "b20", title: "Reta Final ENEM", description: "Conclua o programa de revisão final", icon: Trophy, rarity: "lendario", category: "especial", xpReward: 2500, progress: 0, total: 30, unlocked: false },
  { id: "b21", title: "Semana de Foco", description: "Cumpra todas as metas diárias por 7 dias", icon: Sparkles, rarity: "epico", category: "especial", xpReward: 700, progress: 5, total: 7, unlocked: false },
];

// ============ DESAFIOS ============
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  status: ChallengeStatus;
  progress: number;
  total: number;
  xpReward: number;
  bonusReward?: string;
  icon: LucideIcon;
  expiresIn: string;
  difficulty: ChallengeDifficulty;
  area?: EnemArea;
}

export const challenges: Challenge[] = [
  // Diários
  { id: "d1", title: "Resolva 30 questões hoje", description: "Mantenha o ritmo do dia", type: "diario", status: "ativo", progress: 22, total: 30, xpReward: 80, icon: BookOpen, expiresIn: "7h 23min", difficulty: "facil" },
  { id: "d2", title: "Revise 5 erros antigos", description: "Reforce o conhecimento revisando", type: "diario", status: "completo", progress: 5, total: 5, xpReward: 60, icon: RefreshCw, expiresIn: "7h 23min", difficulty: "facil" },
  { id: "d3", title: "Estude 1h30 hoje", description: "Acumule 90 minutos de estudo", type: "diario", status: "ativo", progress: 75, total: 90, xpReward: 70, icon: Clock, expiresIn: "7h 23min", difficulty: "facil" },
  { id: "d4", title: "Acerte 70%+ em um mini simulado", description: "Demonstre domínio em uma sessão rápida", type: "diario", status: "ativo", progress: 0, total: 1, xpReward: 150, bonusReward: "+10 XP em revisão", icon: Target, expiresIn: "7h 23min", difficulty: "medio" },

  // Semanais
  { id: "w1", title: "Maratona da Semana", description: "Resolva 200 questões esta semana", type: "semanal", status: "ativo", progress: 142, total: 200, xpReward: 500, bonusReward: "+10% XP por 24h", icon: Flame, expiresIn: "3 dias", difficulty: "medio" },
  { id: "w2", title: "Diversidade de áreas", description: "Pratique todas as 5 áreas do ENEM", type: "semanal", status: "ativo", progress: 4, total: 5, xpReward: 400, icon: Sparkles, expiresIn: "3 dias", difficulty: "medio" },
  { id: "w3", title: "Sequência Imparável", description: "Estude todos os dias da semana", type: "semanal", status: "ativo", progress: 5, total: 7, xpReward: 600, bonusReward: "Badge Imparável", icon: Flame, expiresIn: "3 dias", difficulty: "dificil" },
  { id: "w4", title: "Reforço em Natureza", description: "Resolva 40 questões de Ciências da Natureza", type: "semanal", status: "ativo", progress: 12, total: 40, xpReward: 350, icon: Microscope, expiresIn: "3 dias", difficulty: "medio", area: "natureza" },

  // Especiais
  { id: "s1", title: "Desafio ENEM 2026", description: "Complete 5 simulados completos com média de 70%", type: "especial", status: "ativo", progress: 2, total: 5, xpReward: 1500, bonusReward: "Badge Lendário + Aula exclusiva", icon: Trophy, expiresIn: "15 dias", difficulty: "dificil" },
  { id: "s2", title: "Missão Redação", description: "Entregue 4 redações com nota acima de 800", type: "especial", status: "ativo", progress: 1, total: 4, xpReward: 1200, bonusReward: "Correção premium", icon: PenLine, expiresIn: "10 dias", difficulty: "dificil", area: "redacao" },

  // Recomendados (personalizados)
  { id: "r1", title: "Revise 10 erros de Funções", description: "Sua taxa de acerto em Funções caiu 6%", type: "recomendado", status: "ativo", progress: 3, total: 10, xpReward: 180, icon: RefreshCw, expiresIn: "Hoje", difficulty: "medio", area: "matematica" },
  { id: "r2", title: "15 questões de Humanas", description: "Mantenha o ritmo na sua área forte", type: "recomendado", status: "ativo", progress: 6, total: 15, xpReward: 120, icon: Globe, expiresIn: "Hoje", difficulty: "facil", area: "humanas" },
  { id: "r3", title: "Mini simulado de Linguagens", description: "Reforce sua melhor área", type: "recomendado", status: "ativo", progress: 0, total: 1, xpReward: 200, icon: Languages, expiresIn: "Hoje", difficulty: "medio", area: "linguagens" },
  { id: "r4", title: "Volte a estudar Natureza", description: "Você não estuda essa área há 4 dias", type: "recomendado", status: "ativo", progress: 0, total: 1, xpReward: 150, icon: Microscope, expiresIn: "Hoje", difficulty: "facil", area: "natureza" },
];

// ============ EVENTOS ESPECIAIS ============
export interface SpecialEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  daysLeft: number;
  participants: number;
  xpBonus: string;
  highlight?: boolean;
}

export const specialEvents: SpecialEvent[] = [
  { id: "e1", title: "Reta Final ENEM 2026", subtitle: "Programa intensivo", description: "30 dias de revisão guiada com IA", icon: Trophy, daysLeft: 28, participants: 12480, xpBonus: "+50% XP em revisão", highlight: true },
  { id: "e2", title: "Semana da Matemática", subtitle: "Evento sazonal", description: "Foco total em funções, geometria e estatística", icon: Calculator, daysLeft: 4, participants: 3420, xpBonus: "+20% XP em Matemática" },
  { id: "e3", title: "Missão Redação", subtitle: "Mensal", description: "Treine sua redação com correção premium", icon: PenLine, daysLeft: 12, participants: 1890, xpBonus: "Correção gratuita" },
];

// ============ RANKING ============
export interface RankingPlayer {
  rank: number;
  prevRank: number;
  name: string;
  initials: string;
  level: number;
  xp: number;
  weeklyXp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export const rankingPlayers: RankingPlayer[] = [
  { rank: 1, prevRank: 2, name: "Mariana Silva", initials: "MS", level: 28, xp: 58420, weeklyXp: 4820, streak: 45 },
  { rank: 2, prevRank: 1, name: "Pedro Oliveira", initials: "PO", level: 27, xp: 56100, weeklyXp: 4350, streak: 38 },
  { rank: 3, prevRank: 3, name: "Ana Costa", initials: "AC", level: 26, xp: 54200, weeklyXp: 4120, streak: 22 },
  { rank: 4, prevRank: 6, name: "Lucas Santos", initials: "LS", level: 24, xp: 48900, weeklyXp: 3980, streak: 15 },
  { rank: 5, prevRank: 4, name: "Beatriz Lima", initials: "BL", level: 23, xp: 47200, weeklyXp: 3650, streak: 28 },
  { rank: 6, prevRank: 5, name: "Rafael Souza", initials: "RS", level: 22, xp: 45100, weeklyXp: 3420, streak: 12 },
  { rank: 7, prevRank: 9, name: "Juliana Alves", initials: "JA", level: 21, xp: 43500, weeklyXp: 3290, streak: 19 },
  { rank: 8, prevRank: 8, name: "Carlos Rocha", initials: "CR", level: 20, xp: 41800, weeklyXp: 3150, streak: 9 },
  { rank: 9, prevRank: 7, name: "Fernanda Dias", initials: "FD", level: 19, xp: 39500, weeklyXp: 3020, streak: 14 },
  { rank: 10, prevRank: 12, name: "Thiago Mendes", initials: "TM", level: 18, xp: 37200, weeklyXp: 2890, streak: 7 },
  { rank: 47, prevRank: 52, name: "João Pedro (Você)", initials: "JP", level: 14, xp: 28560, weeklyXp: 2180, streak: 12, isCurrentUser: true },
];

// ============ EVOLUÇÃO SEMANAL ============
export interface WeeklyEvolution {
  metric: string;
  current: number;
  previous: number;
  unit: string;
  positive: boolean;
}

export const weeklyEvolution: WeeklyEvolution[] = [
  { metric: "Taxa de acerto", current: 74, previous: 68, unit: "%", positive: true },
  { metric: "Questões resolvidas", current: 220, previous: 184, unit: "", positive: true },
  { metric: "Tempo de estudo", current: 14.3, previous: 12.5, unit: "h", positive: true },
  { metric: "Constância", current: 6, previous: 5, unit: "dias", positive: true },
];

// ============ CONQUISTAS RECENTES (DASHBOARD) ============
export const recentUnlocks = achievements
  .filter((a) => a.unlocked && a.unlockedAt)
  .slice(0, 4);

// ============ PRÓXIMAS METAS RECOMENDADAS ============
export interface NextWin {
  id: string;
  title: string;
  reason: string;
  icon: LucideIcon;
  xp: number;
  area?: EnemArea;
}

export const nextWins: NextWin[] = [
  { id: "n1", title: "Revisar Funções do 2º grau", reason: "Melhora estimada de 12% em Matemática", icon: RefreshCw, xp: 80, area: "matematica" },
  { id: "n2", title: "Mini simulado de Humanas", reason: "Reforce sua área forte", icon: Layers, xp: 100, area: "humanas" },
  { id: "n3", title: "10 questões de Natureza", reason: "Você não estuda há 4 dias", icon: Microscope, xp: 60, area: "natureza" },
  { id: "n4", title: "Treine 1 redação esta semana", reason: "Faltam 1 entrega para o badge", icon: PenLine, xp: 200, area: "redacao" },
];

// ============ MENSAGENS DE MOTIVAÇÃO ============
export const motivationalInsights = [
  { id: "m1", text: "Você melhorou 6% em Matemática nesta semana", icon: TrendingUp, tone: "positive" as const },
  { id: "m2", text: "Faltam 18 questões para bater sua meta diária", icon: Target, tone: "neutral" as const },
  { id: "m3", text: "Sua área que mais precisa de atenção é Natureza", icon: Microscope, tone: "warning" as const },
  { id: "m4", text: "Você está há 12 dias sem perder o ritmo. Continue!", icon: Flame, tone: "positive" as const },
];

// ============ HELPERS ============
export const rarityConfig: Record<BadgeRarity, { label: string; ring: string; bg: string; text: string; glow: string }> = {
  comum: {
    label: "Comum",
    ring: "ring-muted-foreground/30",
    bg: "bg-muted/40",
    text: "text-muted-foreground",
    glow: "",
  },
  raro: {
    label: "Raro",
    ring: "ring-primary/40",
    bg: "bg-primary/10",
    text: "text-primary",
    glow: "shadow-[0_0_24px_-6px_hsl(var(--primary)/0.45)]",
  },
  epico: {
    label: "Épico",
    ring: "ring-accent/50",
    bg: "bg-accent/10",
    text: "text-accent",
    glow: "shadow-[0_0_28px_-6px_hsl(var(--accent)/0.5)]",
  },
  lendario: {
    label: "Lendário",
    ring: "ring-accent/70",
    bg: "bg-gradient-to-br from-primary/20 via-card to-accent/20",
    text: "text-accent",
    glow: "shadow-[0_0_36px_-6px_hsl(var(--accent)/0.65)]",
  },
};

export const masteryConfig: Record<MasteryStatus, { label: string; text: string; bg: string; border: string }> = {
  forte: { label: "Forte", text: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  mediana: { label: "Mediana", text: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  revisar: { label: "Revisar", text: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
};

export const difficultyConfig: Record<ChallengeDifficulty, { label: string; classes: string }> = {
  facil: { label: "Fácil", classes: "text-accent border-accent/40 bg-accent/10" },
  medio: { label: "Médio", classes: "text-primary border-primary/40 bg-primary/10" },
  dificil: { label: "Difícil", classes: "text-destructive border-destructive/40 bg-destructive/10" },
};

export const categoryLabels: Record<BadgeCategory, string> = {
  consistencia: "Consistência",
  estudo: "Estudo",
  desempenho: "Desempenho",
  dominio: "Domínio por Matéria",
  revisao: "Revisão",
  especial: "Especiais ENEM",
};
