import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  Ban,
  BadgeCheck,
  BookOpen,
  Camera,
  CameraOff,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Flag,
  Gift,
  Globe,
  GraduationCap,
  Hand,
  Heart,
  Link2,
  ListOrdered,
  Lock,
  LogOut,
  MessageCircle,
  Mic,
  MicOff,
  MicVocal,
  MoreHorizontal,
  Music2,
  Pause,
  Play,
  Plus,
  Send,
  Share2,
  Shield,
  SkipForward,
  Smile,
  Ticket,
  Trash2,
  Users,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import { burst, GiftTray, GIFTS } from "@/components/live";
import { CoverPick, SetupChip, SetupChoice, SetupProgress, SetupRecap, SetupSec, SetupToggle, TICKETS } from "@/components/setup";
import { ME, USERS } from "@/lib/catalog";
import { useNav } from "@/components/nav";
import { cn, compact, uid } from "@/lib/utils";
import { liveConstraints, setTrackOn, watchVoice, applyLinkQuality } from "@/lib/media";
import { useLink } from "@/lib/link";
import { LinkBanner } from "@/components/link-bar";

export type LiveKind = "story" | "openmic" | "slam" | "stand";

export type HostCfg = {
  title: string;
  desc: string;
  cover: string;
  priv: boolean;
  premium: boolean;
  comments: boolean;
  questions: boolean;
  maxGuests: number;
  slamMode: "solo" | "open";
  rules: string;
  commentWho: "all" | "followers" | "none";
  tickets: string;
};

const KINDS: {
  id: LiveKind;
  title: string;
  verb: string;
  line: string;
  badge?: string;
  cover: string;
  icon: typeof BookOpen;
}[] = [
  {
    id: "story",
    title: "Storytime",
    verb: "Raconte ton histoire.",
    line: "Je raconte, vous écoutez. Chat seulement — personne ne monte.",
    badge: "Chat seulement",
    cover: "/posters/sunrise.jpg",
    icon: BookOpen,
  },
  {
    id: "openmic",
    title: "Micro Ouvert",
    verb: "Anime. Partage. Échange.",
    line: "Les spectateurs demandent la parole et montent en vidéo.",
    badge: "Demander la parole",
    cover: "/posters/city.jpg",
    icon: Mic,
  },
  {
    id: "stand",
    title: "Stand-Up",
    verb: "Le micro t’appartient.",
    line: "Tu restes seul à l’écran. Le public pose des questions écrites.",
    badge: "Poser une question",
    cover: "/posters/latte.jpg",
    icon: GraduationCap,
  },
  {
    id: "slam",
    title: "Slam Thérapie",
    verb: "Tes mots. Ta voix. Ta scène.",
    line: "Une voix à la fois. Le slameur prend le grand écran, l’hôte reste en coin.",
    badge: "Demander à slamer",
    cover: "/posters/plants.jpg",
    icon: MicVocal,
  },
];

const LAUNCH: Record<LiveKind, string> = {
  story: "Lancer mon Storytime",
  openmic: "Lancer le Micro Ouvert",
  slam: "Ouvrir la scène",
  stand: "Lancer mon Stand-Up",
};

const COVERS: Record<LiveKind, string[]> = {
  story: ["/posters/sunrise.jpg", "/posters/plants.jpg", "/posters/latte.jpg", "/posters/city.jpg"],
  openmic: ["/posters/city.jpg", "/posters/pottery.jpg", "/posters/latte.jpg", "/posters/sunrise.jpg"],
  slam: ["/posters/plants.jpg", "/posters/city.jpg", "/posters/hoops.jpg", "/posters/sunrise.jpg"],
  stand: ["/posters/latte.jpg", "/posters/pottery.jpg", "/posters/bread.jpg", "/posters/city.jpg"],
};

const CAST = [USERS["u-maya"]!, USERS["u-noah"]!, USERS["u-luca"]!, USERS["u-ines"]!, USERS["u-sol"]!];
function faceOf(name: string) {
  return CAST.find((u) => u.name.startsWith(name))?.avatar ?? "";
}
const MUSIC = ["Piano", "Guitare", "Lo-fi", "Émotion", "Mélancolique", "Motivante", "Afro douce", "Sans musique"] as const;
const TRACKS: Record<(typeof MUSIC)[number], string[]> = {
  Piano: ["Clair de table", "Renaissance", "Nuit calme"],
  Guitare: ["Racines", "Corde ouverte", "Bois"],
  "Lo-fi": ["Fenêtre", "Brume", "Tard"],
  Émotion: ["Silence plein", "Lettre", "Cœur"],
  Mélancolique: ["Absence", "Pluie", "Loin"],
  Motivante: ["Debout", "Élan", "Feu"],
  "Afro douce": ["Mama", "Soleil", "Kora"],
  "Sans musique": [],
};
const LINES = ["j’écoute", "force", "la voix", "continue", "c’est fort", "bravo"];
const STORY_LINES = ["Tellement vrai", "Continue !", "j’ai vécu la même chose", "c’est fort", "force", "bravo"];
const REACTS = ["❤️", "🔥", "👏", "😂", "🙏", "✨", "💯", "😮", "🙌", "💪", "😍", "😭", "🥺", "😎", "🤔", "👀", "🌹", "🎉", "🥳", "🫶", "💥", "🌸", "☀️", "🎶"];
const RULES_DEF = "Respect · Pas de jugement · Bonne écoute";

type ChatLine = { id: string; name: string; text: string; at: number; fading?: boolean };
type Guest = { id: string; name: string; avatar: string; muted: boolean; cam: boolean; hand: boolean; speaking?: boolean };
type QSt = "wait" | "on" | "done" | "skip";
type QItem = { id: string; name: string; text: string; st: QSt; ago: string };
type SlamReq = { id: string; name: string; title: string; min: 1 | 3; music: string; track: string };
type SheetId = "gifts" | "share" | "more" | "slamAsk" | "qsAsk" | "react" | "askConfirm" | null;
type DrawId = "asks" | "qs" | "slam";
type Role = "host" | "guest" | "watch";
type SlamFlow = "confirm" | "backstage" | "notice" | null;
type CommentWho = "all" | "followers" | "none";

export type RecapStats = {
  kindLabel: string;
  title: string;
  cover: string;
  viewers: number;
  comments: number;
  likes: number;
  gifts: number;
  premium: boolean;
  ticketsSold: number;
  ticketPrice: string;
  seconds: number;
};

export function LiveRecap({ stats, onClose }: { stats: RecapStats; onClose: () => void }) {
  const cells = [
    { k: "Durée", v: fmtDuration(stats.seconds) },
    { k: "Spectateurs", v: compact(stats.viewers) },
    { k: "Commentaires", v: compact(stats.comments) },
    { k: "Tapotages", v: compact(stats.likes) },
    { k: "Cadeaux", v: compact(stats.gifts) },
  ];
  if (stats.premium) cells.push({ k: "Mbo tickets", v: compact(stats.ticketsSold) });
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-bg">
      <img src={stats.cover} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/50" />
      <div className="relative flex min-h-0 flex-1 flex-col px-5 pt-[calc(2.25rem+env(safe-area-inset-top))]">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-fg/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
          <span className="size-1.5 rounded-full bg-muted" />
          Terminé
        </span>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-accent">{stats.kindLabel}</p>
        <p className="mt-1 font-display text-4xl tracking-tight">Live terminé</p>
        <p className="mt-2 text-sm leading-snug text-fg/85">{stats.title}</p>
        <p className="mt-1 text-xs text-muted">Les compteurs sont figés à la fin du live.</p>
        <div className="mt-7 grid grid-cols-2 gap-2">
          {cells.map((c) => (
            <div key={c.k} className="rounded-xl bg-bg/60 px-3 py-3 ring-1 ring-fg/10">
              <p className="text-[10px] uppercase tracking-wider text-muted">{c.k}</p>
              <p className="mt-1 font-display text-2xl tabular-nums tracking-tight">{c.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-snug text-muted">
          {stats.premium
            ? `${stats.ticketsSold} Mbo ticket${stats.ticketsSold > 1 ? "s" : ""} vendu${stats.ticketsSold > 1 ? "s" : ""} · ${stats.ticketPrice} / entrée`
            : "Live gratuit"}
        </p>
        <div className="mt-auto pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-6">
          <Button size="lg" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LiveKinds({ onBack, onPick }: { onBack: () => void; onPick: (k: LiveKind) => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="flex shrink-0 items-center gap-2 px-2">
        <button type="button" className="flex size-12 items-center justify-center" onClick={onBack} aria-label="Retour">
          <ChevronRight className="size-6 rotate-180" />
        </button>
        <p className="flex-1 text-center font-display text-xl italic tracking-tight">Sway</p>
        <span className="size-12" />
      </header>
      <div className="flex shrink-0 items-center gap-3 px-4 pb-2 pt-1">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/12 text-accent ring-1 ring-accent/40">
          <Mic className="size-5" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-2xl leading-none tracking-tight">Talk Show</p>
          <p className="mt-1 text-xs text-accent">Exprime-toi. Inspire. Écoute. Échange.</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 px-4 py-2">
        <span className="h-px flex-1 bg-fg/12" />
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">Choisis ton format</p>
        <span className="h-px flex-1 bg-fg/12" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-none px-3 pt-1">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => onPick(k.id)}
            className="kind-card hub-tile flex min-h-0 flex-1 items-center gap-3 overflow-hidden rounded-2xl p-2 pr-3 text-left ring-1 ring-fg/15 transition-transform duration-150 ease-out active:scale-[0.99]"
            data-kind={k.id}
          >
            <span className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-xl sm:size-[5.5rem]">
              <img src={k.cover} alt="" className="size-full object-cover" />
              <span className="kind-wash absolute inset-0" />
              <span className="kind-ink absolute inset-0 flex items-center justify-center">
                <k.icon className="size-7 sm:size-8" strokeWidth={1.5} />
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-fg/90">{k.title}</span>
              <span className="kind-ink mt-0.5 block font-display text-[0.95rem] leading-snug tracking-tight sm:text-lg">{k.verb}</span>
              <span className="kind-line mt-1 block text-xs leading-snug text-muted">{k.line}</span>
              {k.badge ? (
                <span className="kind-chip mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
                  <Users className="size-3.5" />
                  {k.badge}
                </span>
              ) : null}
            </span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-current/40 sm:size-11">
              <ChevronRight className="kind-ink size-4 sm:size-5" />
            </span>
          </button>
        ))}
      </div>
      <div className="mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] mt-2 flex shrink-0 items-center gap-3 rounded-2xl bg-bg/30 px-3 py-2.5 ring-1 ring-fg/12">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
          <Shield className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium">Sois respectueux et bienveillant.</span>
          <span className="mt-0.5 block text-[11px] leading-snug text-muted">Un espace d’expression libre. Quatre formats, quatre règles.</span>
        </span>
      </div>
    </div>
  );
}

export function HostSetup({
  kind,
  onBack,
  onLaunch,
}: {
  kind: LiveKind;
  onBack: () => void;
  onLaunch: (cfg: HostCfg) => void;
}) {
  const def = KINDS.find((k) => k.id === kind)!;
  const covers = COVERS[kind];
  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState(kind === "story" ? "Le jour où j’ai tout recommencé" : "");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState(covers[0]!);
  const [priv, setPriv] = useState(false);
  const [premium, setPremium] = useState(false);
  const [tickets, setTickets] = useState("3");
  const [commentWho, setCommentWho] = useState<CommentWho>("all");
  const [questions, setQuestions] = useState(kind === "stand");
  const [maxGuests, setMaxGuests] = useState(4);
  const [slamMode, setSlamMode] = useState<"solo" | "open">("open");
  const [rules, setRules] = useState(RULES_DEF);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [draftRules, setDraftRules] = useState(RULES_DEF);

  const cfg: HostCfg = {
    title: title.trim() || def.title,
    desc,
    cover,
    priv,
    premium,
    comments: commentWho !== "none",
    questions: kind === "stand" ? questions : false,
    maxGuests: kind === "openmic" ? maxGuests : 0,
    slamMode,
    rules,
    commentWho,
    tickets,
  };

  if (step === 2) {
    return (
      <Shell title="Tout est prêt" onBack={() => setStep(1)} kind={kind} right={<span className="text-xs font-medium text-accent">2/2</span>}>
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <p className="mt-2 text-center text-sm text-muted">Vérifie avant de lancer ton {def.title}.</p>
          <SetupProgress step={2} />
          <div className="mt-4 overflow-hidden rounded-lg bg-surface">
            <div className="relative">
              <img src={cover} alt="" className="h-36 w-full object-cover" />
              <button
                type="button"
                onClick={() => setStep(1)}
                className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-bg/70 px-2.5 py-1 text-[10px]"
              >
                <Camera className="size-3" /> Modifier
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium">{title.trim() || def.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{desc || "Aucune description."}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <SetupRecap icon={priv ? <Lock className="size-4" /> : <Globe className="size-4" />} label="Visibilité" value={priv ? "Privé" : "Public"} onClick={() => setStep(1)} />
            <SetupRecap
              icon={premium ? <Ticket className="size-4" /> : <Users className="size-4" />}
              label="Accès"
              value={premium ? `Payant · ${tickets} ticket${tickets === "1" ? "" : "s"}` : "Gratuit"}
              onClick={() => setStep(1)}
            />
            <SetupRecap
              icon={<MessageCircle className="size-4" />}
              label="Commentaires"
              value={commentWho === "all" ? "Tout le monde" : commentWho === "followers" ? "Abonnés" : "Personne"}
              onClick={() => setStep(1)}
            />
            <SetupRecap icon={<BookOpen className="size-4" />} label="Règles" value={rules} onClick={() => setStep(1)} />
            {kind === "openmic" ? (
              <SetupRecap icon={<Users className="size-4" />} label="Invités" value={`Jusqu’à ${maxGuests} en vidéo`} onClick={() => setStep(1)} />
            ) : null}
            {kind === "slam" ? (
              <SetupRecap icon={<MicVocal className="size-4" />} label="Mode" value={slamMode === "solo" ? "Solo" : "Scène ouverte"} onClick={() => setStep(1)} />
            ) : null}
            {kind === "stand" ? (
              <SetupRecap icon={<CircleHelp className="size-4" />} label="Questions" value={questions ? "Acceptées" : "Fermées"} onClick={() => setStep(1)} />
            ) : null}
          </div>
          <div className="mt-4 flex gap-2.5 rounded-lg bg-surface p-3">
            <Flag className="mt-0.5 size-4 shrink-0 text-accent" />
            <p className="text-xs leading-snug text-muted">Respecte les règles de la communauté. Un écart peut fermer le live.</p>
          </div>
        </div>
        <div className="space-y-2 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <Button size="lg" onClick={() => onLaunch(cfg)}>
            {LAUNCH[kind]}
          </Button>
          <Button variant="line" size="lg" onClick={() => setStep(1)}>
            Modifier
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell title={`Configurer mon ${def.title}`} onBack={onBack} kind={kind} right={<span className="text-xs font-medium text-muted">1/2</span>}>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <div className="mt-3 flex items-center gap-3">
          <span className="kind-ink flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface ring-1 ring-current/30">
            <def.icon className="size-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none tracking-tight">{def.title}</p>
            <p className="kind-ink mt-1 text-xs">{def.verb}</p>
          </div>
        </div>
        <SetupProgress step={1} />

        <SetupSec n={1} title="Titre">
          <input
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              kind === "story"
                ? "De quoi veux-tu parler ?"
                : kind === "slam"
                  ? "Le titre de ton slam"
                  : kind === "openmic"
                    ? "Le sujet de ton Micro Ouvert"
                    : "Le titre de ton Stand-Up"
            }
            className="h-11 w-full rounded-md bg-bg px-3 text-sm outline-none placeholder:text-subtle"
          />
          <p className="mt-1 text-right text-[10px] text-muted">{title.length}/100</p>
        </SetupSec>
        <SetupSec n={2} title="Description">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder={kind === "slam" ? "De quoi parle ton slam ?" : "De quoi vas-tu parler ?"}
            className="w-full resize-none rounded-md bg-bg p-3 text-sm outline-none placeholder:text-subtle"
          />
        </SetupSec>
        <SetupSec n={3} title="Couverture">
          <CoverPick covers={covers} value={cover} onPick={setCover} />
        </SetupSec>
        <SetupSec n={4} title="Visibilité">
          <div className="flex gap-2">
            <SetupChoice on={!priv} icon={<Globe className="size-4" />} title="Public" line="Tout le monde peut entrer" onClick={() => setPriv(false)} />
            <SetupChoice on={priv} icon={<Lock className="size-4" />} title="Privé" line="Sur invitation" onClick={() => setPriv(true)} />
          </div>
        </SetupSec>
        <SetupSec n={5} title="Accès">
          <div className="flex gap-2">
            <SetupChoice on={!premium} icon={<Users className="size-4" />} title="Gratuit" line="Accès libre" onClick={() => setPremium(false)} />
            <SetupChoice on={premium} icon={<Ticket className="size-4" />} title="Payant" line="En tickets" onClick={() => setPremium(true)} />
          </div>
          {premium ? (
            <div className="mt-2 flex gap-1.5">
              {TICKETS.map((n) => (
                <SetupChip key={n} on={tickets === n} onClick={() => setTickets(n)}>
                  {n} ticket{n === "1" ? "" : "s"}
                </SetupChip>
              ))}
            </div>
          ) : null}
        </SetupSec>
        <SetupSec n={6} title="Commentaires">
          <div className="flex flex-wrap gap-1.5">
            <SetupChip on={commentWho === "all"} onClick={() => setCommentWho("all")}>
              Tout le monde
            </SetupChip>
            <SetupChip on={commentWho === "followers"} onClick={() => setCommentWho("followers")}>
              Abonnés
            </SetupChip>
            <SetupChip on={commentWho === "none"} onClick={() => setCommentWho("none")}>
              <span className="inline-flex items-center gap-1">
                <Ban className="size-3" /> Personne
              </span>
            </SetupChip>
          </div>
        </SetupSec>
        <SetupSec n={7} title="Règles">
          <button
            type="button"
            onClick={() => {
              setDraftRules(rules);
              setRulesOpen(true);
            }}
            className="flex h-11 w-full items-center gap-2 rounded-md bg-bg px-3 text-left text-sm"
          >
            <span className="min-w-0 flex-1 truncate">{rules}</span>
            <ChevronRight className="size-4 shrink-0 text-muted" />
          </button>
        </SetupSec>
        {kind === "stand" ? (
          <SetupSec n={8} title="Questions">
            <SetupToggle label="Accepter les questions écrites" on={questions} onClick={() => setQuestions(!questions)} />
          </SetupSec>
        ) : null}
        {kind === "openmic" ? (
          <SetupSec n={8} title="Invités sur scène">
            <p className="mb-2 text-xs text-muted">L’hôte anime. Jusqu’à 4 invités montent en vidéo.</p>
            <div className="flex gap-1.5">
              {[2, 3, 4].map((n) => (
                <SetupChip key={n} on={maxGuests === n} onClick={() => setMaxGuests(n)}>
                  {n}
                </SetupChip>
              ))}
            </div>
          </SetupSec>
        ) : null}
        {kind === "slam" ? (
          <SetupSec n={8} title="Mode">
            <div className="flex gap-1.5">
              <SetupChip on={slamMode === "solo"} onClick={() => setSlamMode("solo")}>
                Solo
              </SetupChip>
              <SetupChip on={slamMode === "open"} onClick={() => setSlamMode("open")}>
                Scène ouverte
              </SetupChip>
            </div>
          </SetupSec>
        ) : null}
      </div>
      <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <Button size="lg" disabled={title.trim().length < 2} onClick={() => setStep(2)}>
          Suivant
        </Button>
      </div>
      <LiveSheet open={rulesOpen} onClose={() => setRulesOpen(false)} title="Règles de ton live">
        <textarea
          value={draftRules}
          rows={4}
          onChange={(e) => setDraftRules(e.target.value)}
          className="mt-2 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
        />
        <Button
          size="lg"
          className="mt-3"
          onClick={() => {
            setRules(draftRules.trim() || RULES_DEF);
            setRulesOpen(false);
          }}
        >
          Enregistrer
        </Button>
      </LiveSheet>
    </Shell>
  );
}

export function HostRoom({
  kind,
  title,
  desc,
  cover,
  comments,
  questions,
  maxGuests,
  slamMode,
  rules = RULES_DEF,
  premium = false,
  tickets = "3",
  onLeave,
  startWatch,
}: HostCfg & { kind: LiveKind; onLeave: () => void; startWatch?: boolean }) {
  const { toast, setTab } = useNav();
  const link = useLink();
  const layer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const likesEl = useRef<HTMLSpanElement>(null);
  const comboEl = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const likes = useRef(12);
  const giftsN = useRef(0);
  const lastTap = useRef(0);
  const combo = useRef(0);
  const comboClear = useRef<number | null>(null);
  const [cam, setCam] = useState(false);
  const [viewers, setViewers] = useState(48);
  const [chat, setChat] = useState<ChatLine[]>(
    kind === "story"
      ? [
          { id: "1", name: "Maya", text: "Tellement vrai", at: Date.now() - 5000 },
          { id: "2", name: "Noah", text: "Continue !", at: Date.now() - 3200 },
          { id: "3", name: "Inès", text: "j’ai vécu la même chose", at: Date.now() - 1400 },
        ]
      : [{ id: "1", name: "maya.clay", text: "j’écoute", at: Date.now() }],
  );
  const [text, setText] = useState("");
  const [sheet, setSheet] = useState<SheetId>(null);
  const [draw, setDraw] = useState<DrawId | null>(null);
  const [role, setRole] = useState<Role>(startWatch ? "watch" : "host");
  const [follow, setFollow] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [asks, setAsks] = useState<Guest[]>(
    kind === "openmic"
      ? [
          { id: CAST[2]!.id, name: CAST[2]!.name.split(" ")[0]!, avatar: CAST[2]!.avatar, muted: false, cam: true, hand: false },
          { id: CAST[3]!.id, name: CAST[3]!.name.split(" ")[0]!, avatar: CAST[3]!.avatar, muted: false, cam: true, hand: false },
        ]
      : [],
  );
  const [onStage, setOnStage] = useState<Guest[]>(
    kind === "openmic"
      ? [
          { id: CAST[0]!.id, name: CAST[0]!.name.split(" ")[0]!, avatar: CAST[0]!.avatar, muted: false, cam: true, hand: false, speaking: true },
          { id: CAST[1]!.id, name: CAST[1]!.name.split(" ")[0]!, avatar: CAST[1]!.avatar, muted: false, cam: true, hand: true, speaking: false },
        ]
      : [],
  );
  const [asksOpen, setAsksOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [myHand, setMyHand] = useState(false);
  const [qs, setQs] = useState<QItem[]>(
    kind === "stand" && questions
      ? [
          { id: "q1", name: "Inès", text: "Comment savoir si on manque de confiance ?", st: "wait", ago: "Il y a 2 min" },
          { id: "q2", name: "Noah", text: "Par où commencer, concrètement ?", st: "wait", ago: "Il y a 5 min" },
          { id: "q3", name: "Sol", text: "Tu conseilles ça à qui ?", st: "wait", ago: "Il y a 8 min" },
          { id: "q4", name: "Maya", text: "Comment poser ses limites sans culpabiliser ?", st: "wait", ago: "Il y a 12 min" },
          { id: "q5", name: "Luca", text: "Un exercice simple à faire ce soir ?", st: "done", ago: "Il y a 28 min" },
          { id: "q6", name: "Anonyme", text: "Question hors sujet", st: "skip", ago: "Il y a 14 min" },
        ]
      : [],
  );
  const [qTab, setQTab] = useState<QSt>("wait");
  const [slam, setSlam] = useState<{ name: string; title: string; min: number; music: string; track: string; left: number } | null>(
    kind === "slam" && slamMode === "solo" ? { name: "Toi", title, min: 3, music: "Piano", track: "Renaissance", left: 180 } : null,
  );
  const [queue, setQueue] = useState<SlamReq[]>(
    slamMode === "open"
      ? [
          { id: "d", name: "Noah", title: "Dernier panier", min: 3, music: "Guitare", track: "Racines" },
          { id: "s", name: "Inès", title: "Le lait", min: 1, music: "Lo-fi", track: "Fenêtre" },
        ]
      : [],
  );
  const [requests, setRequests] = useState<SlamReq[]>(
    slamMode === "open"
      ? [
          { id: "r1", name: "Sol", title: "Ce que je n’ai jamais dit", min: 1, music: "Émotion", track: "Lettre" },
          { id: "r2", name: "Luca", title: "Les blessures invisibles", min: 3, music: "Piano", track: "Renaissance" },
        ]
      : [],
  );
  const [flow, setFlow] = useState<SlamFlow>(null);
  const [mine, setMine] = useState<SlamReq | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [nextUp, setNextUp] = useState<SlamReq | null>(null);
  const [thanks, setThanks] = useState<string | null>(null);
  const [ready, setReady] = useState<"idle" | "soon">("idle");
  const [soonLeft, setSoonLeft] = useState(30);
  const [formTitle, setFormTitle] = useState("");
  const [formMin, setFormMin] = useState<1 | 3>(3);
  const [formMusic, setFormMusic] = useState<(typeof MUSIC)[number]>("Piano");
  const [formTrack, setFormTrack] = useState("Renaissance");
  const [gifts, setGifts] = useState<{ id: number; x: number; kind: (typeof GIFTS)[number]["id"]; delay: number; drift: number; rot: number }[]>([]);
  const [mutedHost, setMutedHost] = useState(false);
  const [speakingMe, setSpeakingMe] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [askText, setAskText] = useState("");
  const [giftNote, setGiftNote] = useState<{ name: string; emoji: string; label: string; zems: number } | null>(null);
  const [quiet, setQuiet] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [kb, setKb] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [recap, setRecap] = useState(false);
  const [snap, setSnap] = useState<RecapStats | null>(null);
  const ended = useRef(false);
  const [slamRun, setSlamRun] = useState(true);
  const queueRef = useRef(queue);
  queueRef.current = queue;
  const host = role === "host";
  const guest = role === "guest" && kind === "openmic";
  const watch = !host && !guest;

  useEffect(() => {
    let stream: MediaStream | null = null;
    let stopVoice: (() => void) | undefined;
    let dead = false;
    const onAir = host || guest;
    void navigator.mediaDevices
      .getUserMedia(liveConstraints(onAir))
      .then((s) => {
        if (dead) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        streamRef.current = s;
        setCam(true);
        if (video.current) {
          video.current.srcObject = s;
          void video.current.play().catch(() => {});
        }
        if (onAir) stopVoice = watchVoice(s, setSpeakingMe);
      })
      .catch(() => {
        if (!dead) setCam(false);
      });
    return () => {
      dead = true;
      stopVoice?.();
      stream?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setSpeakingMe(false);
    };
  }, [host, guest]);

  useEffect(() => {
    setTrackOn(streamRef.current, "audio", (host || guest) && !mutedHost);
    if (mutedHost) setSpeakingMe(false);
  }, [mutedHost, host, guest]);

  useEffect(() => {
    setTrackOn(streamRef.current, "video", camOn);
  }, [camOn]);

  useEffect(() => {
    applyLinkQuality(streamRef.current, link !== "good");
  }, [link]);

  useEffect(() => {
    if (recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [recap]);

  useEffect(() => {
    if (recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      setViewers((v) => Math.max(12, v + Math.floor(Math.random() * 7) - 2));
    }, 1400);
    return () => window.clearInterval(t);
  }, [recap]);
  const peak = useRef(48);
  useEffect(() => {
    if (ended.current) return;
    peak.current = Math.max(peak.current, viewers);
  }, [viewers]);

  useEffect(() => {
    if (kind !== "story" || recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      burst(layer.current, 1, true);
      paintLikes(likes.current + 1);
    }, 3600);
    return () => window.clearInterval(t);
  }, [kind, recap]);

  useEffect(() => {
    if (kind !== "story") return;
    setRole((r) => (r === "guest" ? "watch" : r));
    setOnStage([]);
    setAsks([]);
    setMounted(false);
    setMyHand(false);
    setQs([]);
    setDraw(null);
  }, [kind]);

  useEffect(() => {
    if (kind !== "story" || recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      const u = CAST[Math.floor(Math.random() * CAST.length)]!;
      const g = GIFTS[Math.floor(Math.random() * GIFTS.length)]!;
      playGift(g, u.name.split(" ")[0]!);
      setChat((c) => [...c, { id: uid("g"), name: u.name.split(" ")[0]!, text: `envoie ${g.emoji} ${g.label.toLowerCase()}`, at: Date.now() }]);
    }, 11000);
    return () => window.clearInterval(t);
  }, [kind, recap]);

  useEffect(() => {
    if (recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      const u = CAST[Math.floor(Math.random() * CAST.length)]!;
      const story = kind === "story";
      const line = (story ? STORY_LINES : LINES)[Math.floor(Math.random() * (story ? STORY_LINES : LINES).length)]!;
      const next: ChatLine = { id: uid("c"), name: story ? u.name.split(" ")[0]! : u.handle, text: line, at: Date.now() };
      setChat((c) => (story ? [...c, next].slice(-13) : [...c.slice(-18), next]));
    }, kind === "story" ? 1600 : 4200);
    return () => window.clearInterval(t);
  }, [kind, recap]);

  const fadeId = kind === "story" ? chat.find((c) => c.fading)?.id : undefined;
  useEffect(() => {
    if (kind !== "story" || recap) return;
    const tick = window.setInterval(() => {
      if (ended.current) return;
      setChat((c) => {
        if (c.some((x) => x.fading) || c.length === 0) return c;
        const oldest = c[0]!;
        if (c.length > 12 || Date.now() - oldest.at > 14000) {
          return c.map((x, i) => (i === 0 ? { ...x, fading: true } : x));
        }
        return c;
      });
    }, 280);
    return () => window.clearInterval(tick);
  }, [kind, recap]);
  useEffect(() => {
    if (!fadeId) return;
    const t = window.setTimeout(() => setChat((c) => c.filter((x) => x.id !== fadeId)), 340);
    return () => window.clearTimeout(t);
  }, [fadeId]);

  useEffect(() => {
    if (kind !== "openmic" || !asksOpen) return;
    const t = window.setTimeout(() => {
      setAsks((a) => {
        if (a.length + onStage.length >= 5) return a;
        const next = CAST[a.length + onStage.length];
        if (!next) return a;
        return [...a, { id: next.id, name: next.name.split(" ")[0]!, avatar: next.avatar, muted: false, cam: true, hand: false }];
      });
    }, 1800);
    return () => window.clearTimeout(t);
  }, [kind, asks.length, asksOpen, onStage.length]);

  const slamOn = slam !== null;
  const bindVideo = useCallback((el: HTMLVideoElement | null) => {
    video.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
      void el.play().catch(() => {});
    }
  }, []);
  useEffect(() => {
    if (!slamOn || !slamRun || recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      setSlam((s) => {
        if (!s) return s;
        if (s.left <= 1) {
          setSlamRun(false);
          setThanks(s.name);
          window.setTimeout(() => {
            setThanks(null);
            const n0 = queueRef.current[0];
            if (n0) {
              setNextUp(n0);
              setQueue((q) => q.filter((x) => x.id !== n0.id));
              setCount(3);
            }
          }, 2200);
          return null;
        }
        return { ...s, left: s.left - 1 };
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [slamOn, slamRun, recap]);

  const startNow = (pick: SlamReq) => {
    setDraw(null);
    setQueue((q) => q.filter((x) => x.id !== pick.id));
    setNextUp(pick);
    setCount(3);
  };

  const startNext = (pick?: SlamReq) => {
    const n0 = pick ?? queueRef.current[0];
    if (!n0) {
      setReady("idle");
      return;
    }
    startNow(n0);
    setReady("idle");
  };

  useEffect(() => {
    if (count === null || recap) return;
    if (count === 0) {
      const s = nextUp;
      const t = window.setTimeout(() => {
        if (s) {
          setSlam({ name: s.name, title: s.title, min: s.min, music: s.music, track: s.track, left: s.min * 60 });
          setSlamRun(true);
          if (s.name === "Toi") {
            setMine(null);
            setFlow(null);
          }
        }
        setNextUp(null);
        setCount(null);
      }, 700);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => (c === null ? null : c - 1)), 900);
    return () => window.clearTimeout(t);
  }, [count, nextUp, recap]);

  useEffect(() => {
    if (ready !== "soon" || recap) return;
    setSoonLeft(30);
    const tick = window.setInterval(() => setSoonLeft((n) => Math.max(0, n - 1)), 1000);
  }, [ready, recap]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const sync = () => setKb(Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)));
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, []);

  const paintLikes = (n: number) => {
    likes.current = n;
    const t = compact(n);
    if (likesEl.current) likesEl.current.textContent = t;
  };
  const paintCombo = (n: number) => {
    combo.current = n;
    const el = comboEl.current;
    if (!el) return;
    el.textContent = n > 1 ? `x${n}` : "";
    el.style.opacity = n > 1 ? "1" : "0";
  };
  const tap = (e?: { clientX?: number; clientY?: number }) => {
    if (ended.current) return;
    let at: { x: number; y: number } | undefined;
    if (layer.current) {
      const r = layer.current.getBoundingClientRect();
      if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        at = x > r.width - 64 ? { x: r.width * 0.5, y: r.height * 0.42 } : { x, y };
      } else {
        at = { x: r.width * 0.5, y: r.height * 0.42 };
      }
    }
    burst(layer.current, 1, true, at);
    paintLikes(likes.current + 1);
  };
  const playGift = (g: (typeof GIFTS)[number], name: string) => {
    const n = g.zems >= 99 ? 5 : 3;
    const batch = Array.from({ length: n }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: 10 + Math.random() * 42,
      kind: g.id,
      delay: i * 90,
      drift: -28 + Math.random() * 56,
      rot: -18 + Math.random() * 36,
    }));
    setGifts((h) => [...h, ...batch]);
    window.setTimeout(() => setGifts((h) => h.filter((x) => !batch.some((b) => b.id === x.id))), 1750);
    setGiftNote({ name, emoji: g.emoji, label: g.label, zems: g.zems });
    window.setTimeout(() => setGiftNote(null), 2500);
  };
  const sendGift = (g: (typeof GIFTS)[number]) => {
    playGift(g, "Toi");
    burst(layer.current, 2, true);
    setChat((c) => [...c, { id: uid("g"), name: "toi", text: `envoie ${g.emoji} ${g.label.toLowerCase()}`, at: Date.now() }]);
    paintLikes(likes.current + 8);
    giftsN.current += 1;
    setSheet(null);
  };
  const sendChat = () => {
    const v = text.trim();
    if (!v) return;
    setChat((c) => [...c, { id: uid("c"), name: "toi", text: v, at: Date.now() }]);
    setText("");
    setEmojiOpen(false);
  };
  const askMount = () => {
    if (kind === "story" || kind === "stand") return;
    setAsks((a) => (a.some((x) => x.id === "me") ? a : [...a, { id: "me", name: "Toi", avatar: ME.avatar, muted: false, cam: true, hand: false }]));
    flash("Demande envoyée — l’hôte va te répondre");
  };
  const requestMount = () => {
    if (kind === "story" || kind === "stand") return;
    if (asks.some((x) => x.id === "me")) {
      flash("Ta demande est déjà partie");
      return;
    }
    openSheet("askConfirm");
  };
  const flash = (t: string) => {
    setNotice(t);
    window.setTimeout(() => setNotice(null), 2400);
  };
  const goHome = () => {
    setTab("home");
    onLeave();
  };
  const endLive = () => {
    ended.current = true;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (host) {
      setSnap({
        kindLabel: KINDS.find((k) => k.id === kind)?.title ?? "Live",
        title,
        cover,
        viewers: peak.current,
        comments: chat.length,
        likes: likes.current,
        gifts: giftsN.current,
        premium,
        ticketsSold: premium ? Math.max(1, Math.round(peak.current * 0.14)) : 0,
        ticketPrice: tickets,
        seconds,
      });
      setRecap(true);
    } else onLeave();
  };
  const acceptAsk = (a: Guest) => {
    if (kind === "story") return;
    if (onStage.length >= guestCap) {
      toast("Scène pleine — 4 invités max");
      return;
    }
    setOnStage((s) => [...s, { ...a, hand: false, speaking: false }]);
    setAsks((x) => x.filter((i) => i.id !== a.id));
    if (a.id === "me") {
      setMounted(true);
      setRole("guest");
    }
    flash(`${a.name} monte sur scène`);
  };
  const refuseAsk = (a: Guest) => {
    setAsks((x) => x.filter((i) => i.id !== a.id));
    if (a.id === "me") setMounted(false);
    flash(`Demande de ${a.name} refusée`);
  };
  const giveFloor = (id: string) => {
    if (kind === "story") return;
    setOnStage((s) => s.map((i) => ({ ...i, hand: i.id === id ? false : i.hand, speaking: i.id === id })));
    const g = onStage.find((i) => i.id === id);
    flash(g ? `Parole à ${g.name}` : "Parole donnée");
  };
  const kick = (id: string) => {
    const g = onStage.find((i) => i.id === id);
    setOnStage((s) => s.filter((i) => i.id !== id));
    if (id === "me") {
      setMounted(false);
      setMyHand(false);
      setRole((r) => (r === "guest" ? "watch" : r));
    }
    flash(g ? `${g.name} quitte la scène` : "Place libérée");
  };
  const leaveStage = () => {
    kick("me");
  };
  const cycleRole = () => {
    setDraw(null);
    setSheet(null);
    setFlow(null);
    if (kind !== "openmic") {
      setRole((r) => (r === "host" ? "watch" : "host"));
      setMounted(false);
      setMyHand(false);
      return;
    }
    if (role === "host") {
      const me: Guest = { id: "me", name: "Toi", avatar: ME.avatar, muted: false, cam: true, hand: false, speaking: false };
      setOnStage((s) => {
        if (s.some((x) => x.id === "me")) return s;
        if (s.length >= maxGuests) return [...s.slice(0, maxGuests - 1), me];
        return [...s, me];
      });
      setMounted(true);
      setRole("guest");
      return;
    }
    if (role === "guest") {
      setOnStage((s) => s.filter((x) => x.id !== "me"));
      setMounted(false);
      setMyHand(false);
      setRole("watch");
      return;
    }
    setRole("host");
  };

  const pin = kind === "stand" && questions ? qs.find((q) => q.st === "on") : undefined;
  const waiting = kind === "stand" && questions ? qs.filter((q) => q.st === "wait") : [];
  const slammer = slam && slam.name !== "Toi";
  const slamFace = slammer ? CAST.find((u) => u.name.startsWith(slam.name))?.avatar ?? cover : cover;
  const fmt = KINDS.find((k) => k.id === kind)!;
  const isMic = kind === "openmic";
  const isStory = kind === "story";
  const guestCap = isMic ? Math.min(4, Math.max(1, maxGuests || 4)) : 0;
  const slots = Array.from({ length: guestCap }, (_, i) => onStage[i] ?? null);
  const hands = onStage.filter((g) => g.hand);
  const total = slam ? slam.min * 60 : 1;
  const ratio = slam ? slam.left / total : 0;
  const circ = 2 * Math.PI * 44;
  const close = () => setSheet(null);
  const closeDraw = () => setDraw(null);
  const openDraw = (d: DrawId) => {
    if (kind === "story") return;
    setSheet(null);
    setDraw(d);
  };
  const openSheet = (s: SheetId) => {
    if (kind === "story" && (s === "qsAsk" || s === "slamAsk")) return;
    setDraw(null);
    setSheet(s);
  };

  const acceptSlam = (r: SlamReq) => {
    setRequests((x) => x.filter((i) => i.id !== r.id));
    setQueue((q) => [...q, r]);
    toast(`${r.name} entre dans la file`);
    if (r.name === "Toi") {
      setMine(r);
      setFlow("confirm");
      setDraw(null);
    }
  };
  const refuseSlam = (r: SlamReq) => {
    setRequests((x) => x.filter((i) => i.id !== r.id));
    toast(`Demande de ${r.name} refusée`);
  };
  const moveQ = (i: number, dir: -1 | 1) => {
    setQueue((q) => {
      const n = [...q];
      const j = i + dir;
      if (j < 0 || j >= n.length) return q;
      [n[i], n[j]] = [n[j]!, n[i]!];
      return n;
    });
  };
  const myPos = mine ? queue.findIndex((q) => q.id === mine.id) + 1 : 0;
  const etaMin = mine
    ? Math.max(1, Math.round((slam?.left ?? 0) / 60) + queue.slice(0, Math.max(0, myPos - 1)).reduce((a, q) => a + q.min, 0))
    : 0;

  const hostCam = (
    <>
      <video
        ref={bindVideo}
        muted
        playsInline
        autoPlay
        className={cn(
          "absolute inset-0 size-full object-cover -scale-x-100",
          (!cam || !camOn) && "opacity-0",
          speakingMe && !mutedHost && "outline outline-2 -outline-offset-2 outline-live",
        )}
      />
      {!cam || !camOn ? <img src={cover} alt="" className="absolute inset-0 size-full object-cover" /> : null}
    </>
  );

  const hostName = host ? ME.name.split(" ")[0]! : "Maya";
  const hostFace = (host ? ME.avatar : "/avatars/maya.jpg") || "/avatars/maya.jpg";

  const header = (
    <div className="absolute inset-x-0 top-0 z-20 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))]">
      <div className="flex items-start gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Face src={hostFace} name={hostName} size="lg" />
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-[13px] font-medium leading-tight">
              <span className="truncate">{hostName}</span>
              <BadgeCheck className="kind-ink size-3.5 shrink-0" aria-label="Vérifié" />
            </p>
            {host ? (
              <p className="mt-0.5 text-[10px] text-muted">Hôte</p>
            ) : (
              <button
                type="button"
                onClick={() => setFollow((f) => !f)}
                className={cn("mt-1 h-6 rounded-full px-2.5 text-[10px] font-medium", follow ? "bg-bg/50 text-muted" : "bg-accent text-accent-fg")}
              >
                {follow ? "Suivi" : "Suivre"}
              </button>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="flex items-center gap-1 rounded-full bg-bg/45 px-2 py-1 text-[10px] tabular-nums">
            <Users className="size-3" />
            {viewers}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-bg/45 px-2 py-1 text-[10px] tabular-nums">
            <Heart className="size-3 fill-heart text-heart" />
            <span ref={likesEl}>{compact(likes.current)}</span>
          </span>
          <button type="button" onClick={cycleRole} className="rounded-full bg-bg/40 px-2 py-1 text-[10px] font-medium">
            {role === "host" ? "Hôte" : role === "guest" ? "Invité" : "Public"}
          </button>
          <button type="button" className="flex size-8 items-center justify-center rounded-full bg-bg/40" onClick={() => openSheet("more")} aria-label="Plus">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-live px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-fg anim-live" />
          Live
        </span>
        <span className="kind-ink text-[11px] font-medium">{fmt.title}</span>
        {isMic ? (
          <span className="rounded-full bg-bg/45 px-2 py-0.5 text-[10px]">
            {onStage.length}/{guestCap} invités
          </span>
        ) : null}
      </div>
      {title && title !== fmt.title ? <p className="mt-1 truncate text-[13px] font-medium leading-snug text-fg/90">{title}</p> : null}
      {kind === "openmic" && host ? (
        <button
          type="button"
          onClick={() => openDraw("asks")}
          className="mt-1.5 flex items-center gap-1 rounded-full bg-bg/50 px-2 py-1 text-[10px] font-medium ring-1 ring-accent/40"
        >
          <Hand className="size-3 text-accent" /> Demandes ({asks.length + hands.length})
        </button>
      ) : null}
      {kind === "slam" && host ? (
        <button
          type="button"
          onClick={() => openDraw("slam")}
          className="mt-1.5 flex items-center gap-1 rounded-full bg-bg/50 px-2 py-1 text-[10px] font-medium ring-1 ring-accent/40"
        >
          <ListOrdered className="size-3 text-accent" /> File
          {requests.length > 0 ? (
            <span className="grid min-w-4 place-items-center rounded-full bg-live px-1 text-[9px]">{requests.length}</span>
          ) : null}
        </button>
      ) : null}
      {kind === "slam" && slam ? (
        <button
          type="button"
          className="absolute right-3 top-[calc(3.4rem+env(safe-area-inset-top))] z-10 grid size-12 place-items-center"
          onClick={() => host && setSlamRun((r) => !r)}
          aria-label={host ? (slamRun ? "Mettre en pause" : "Reprendre") : "Chrono"}
        >
          <svg viewBox="0 0 100 100" className="live-ring absolute inset-0 size-full">
            <circle cx="50" cy="50" r="44" fill="rgb(8 8 10 / 0.55)" />
            <circle cx="50" cy="50" r="44" stroke="rgb(242 238 230 / 0.16)" strokeWidth="6" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="var(--color-accent)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - ratio)}
            />
          </svg>
          <span className="relative text-center font-display text-[10px] tabular-nums leading-none">
            {host && !slamRun ? <Pause className="mx-auto size-3" /> : `${Math.floor(slam.left / 60)}:${String(slam.left % 60).padStart(2, "0")}`}
          </span>
        </button>
      ) : null}
    </div>
  );

  const chatCol = (
    <div
      className={cn(
        "z-10 flex flex-col",
        isMic
          ? "min-h-0 max-h-[8.5rem] shrink-0 gap-1 overflow-y-auto px-3 pt-1.5"
          : isStory
            ? "story-chat pointer-events-none absolute bottom-[8.25rem] left-3 z-10 w-[86%]"
            : "pointer-events-none absolute bottom-24 left-3 right-4 gap-1.5",
      )}
    >
      {comments
        ? (isStory ? chat : chat.slice(-(isMic ? 8 : 4))).map((c) => {
            const av = c.name === "toi" ? ME.avatar : CAST.find((u) => u.handle === c.name || u.name.startsWith(c.name))?.avatar;
            const who = c.name === "toi" ? "Toi" : c.name;
            if (isStory) {
              return (
                <p key={c.id} className={cn("story-line max-w-full text-[13px] leading-snug [text-shadow:0_1px_10px_rgb(0_0_0_/_0.75)]", c.fading && "is-out")}>
                  <span className="font-medium">{who}</span>
                  <span className="text-fg/90"> : {c.text}</span>
                </p>
              );
            }
            return (
              <p key={c.id} className="flex w-fit max-w-[90%] items-center gap-1.5 rounded-full bg-bg/45 py-0.5 pr-2 pl-0.5 text-xs">
                <Face src={av} name={who} size="xs" />
                <span className="min-w-0">
                  <span className="font-medium">{who}</span> <span className="text-fg/85">{c.text}</span>
                </span>
              </p>
            );
          })
        : null}
    </div>
  );

  const composer = comments ? (
    <div className="px-3">
      {emojiOpen ? (
        <div className="mb-2 grid grid-cols-8 gap-1 rounded-2xl bg-bg/80 p-2">
          {REACTS.map((e) => (
            <button
              key={e}
              type="button"
              aria-label={`Emoji ${e}`}
              onClick={() => {
                setText((d) => d + e);
                if (isStory) setChat((c) => [...c, { id: uid("c"), name: "toi", text: e, at: Date.now() }]);
              }}
              className="grid size-9 place-items-center rounded-md text-lg"
            >
              {e}
            </button>
          ))}
        </div>
      ) : null}
      <form
        className="flex items-center gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          sendChat();
        }}
      >
        <div className="relative min-w-0 flex-1">
          <button
            type="button"
            className="absolute left-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-fg/80"
            onClick={() => setEmojiOpen((o) => !o)}
            aria-label="Smileys"
          >
            <Smile className="size-4" />
          </button>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Dire quelque chose…"
            className="h-10 w-full rounded-full bg-bg/55 pr-9 pl-9 text-sm outline-none placeholder:text-fg/45"
          />
          <button type="submit" className="absolute right-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-accent" aria-label="Envoyer">
            <Send className="size-3.5" />
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-fg" onClick={() => openSheet("gifts")} aria-label="Cadeau">
            <Gift className="size-4" />
          </button>
          <button type="button" className="flex size-9 items-center justify-center rounded-full bg-bg/55" onClick={() => openSheet("share")} aria-label="Partager">
            <Share2 className="size-4" />
          </button>
          {kind === "openmic" && watch && !mounted ? (
            <button
              type="button"
              onClick={requestMount}
              aria-label={asks.some((x) => x.id === "me") ? "En attente de l’hôte" : "Demander la parole"}
              className={cn(
                "flex size-9 items-center justify-center rounded-full",
                asks.some((x) => x.id === "me") ? "bg-accent text-accent-fg" : "bg-bg/55",
              )}
            >
              <Hand className="size-4" />
            </button>
          ) : null}
          {kind === "slam" && slamMode === "open" && watch ? (
            <button
              type="button"
              onClick={() => (mine ? setFlow("backstage") : openSheet("slamAsk"))}
              aria-label={mine ? "Préparer ma performance" : "Demander à slamer"}
              className="flex size-9 items-center justify-center rounded-full bg-bg/55"
            >
              <MicVocal className="size-4" />
            </button>
          ) : null}
          {kind === "stand" && watch && questions ? (
            <button type="button" onClick={() => openSheet("qsAsk")} aria-label="Poser une question" className="flex size-9 items-center justify-center rounded-full bg-bg/55">
              <CircleHelp className="size-4" />
            </button>
          ) : null}
        </div>
      </form>
    </div>
  ) : (
    <p className="px-3 text-center text-xs text-muted">Commentaires coupés</p>
  );
  const sheets = (
    <>
      <GiftTray open={sheet === "gifts"} onPick={sendGift} onClose={close} />

      <LiveSheet open={sheet === "askConfirm"} onClose={close} title="Monter sur scène">
        <p className="text-sm leading-snug">Tu veux envoyer une demande pour monter ?</p>
        <p className="mt-1.5 text-xs text-muted">L’hôte verra ta demande et décidera.</p>
        <Button
          size="lg"
          className="mt-4"
          onClick={() => {
            askMount();
            close();
          }}
        >
          Envoyer la demande
        </Button>
        <Button variant="line" size="lg" className="mt-2" onClick={close}>
          Pas maintenant
        </Button>
      </LiveSheet>

      <LiveSheet open={sheet === "share"} onClose={close} title="Partager le live">
        {[
          { icon: <Link2 className="size-4" />, label: "Copier le lien", t: "Lien du live copié" },
          { icon: <MessageCircle className="size-4" />, label: "Envoyer en message", t: "Partagé en message" },
          { icon: <Share2 className="size-4" />, label: "WhatsApp", t: "Partagé sur WhatsApp" },
          { icon: <Share2 className="size-4" />, label: "Story", t: "Ajouté à ta story" },
          { icon: <Share2 className="size-4" />, label: "Partager ailleurs", t: "Feuille de partage ouverte" },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => {
              toast(o.t);
              close();
            }}
            className="mt-2 flex h-12 w-full items-center gap-3 rounded-lg bg-surface px-3 text-sm"
          >
            {o.icon}
            {o.label}
          </button>
        ))}
      </LiveSheet>

      <LiveSheet open={sheet === "more"} onClose={close} title={`Options du live · ${host ? "Hôte" : guest ? "Invité" : "Public"}`}>
        <p className="text-xs text-muted">{isStory ? "Chat seulement · personne ne monte" : fmt.title}</p>
        {(host
          ? [
              isStory ? { icon: camOn ? <Camera className="size-4 text-accent" /> : <CameraOff className="size-4" />, title: camOn ? "Couper la caméra" : "Allumer la caméra", sub: "Tu restes seul à l’écran", go: () => setCamOn((c) => !c) } : null,
              isStory ? { icon: mutedHost ? <MicOff className="size-4" /> : <Mic className="size-4 text-accent" />, title: mutedHost ? "Micro coupé" : "Couper le micro", sub: "Personne d’autre ne peut monter", go: () => setMutedHost((m) => !m) } : null,
              isStory ? { icon: <Share2 className="size-4" />, title: "Partager", sub: "Inviter à écouter ton histoire", go: () => openSheet("share") } : null,
              isMic ? { icon: <Users className="size-4 text-accent" />, title: "Gérer les places", sub: `${maxGuests} places max · ${Math.max(0, maxGuests - onStage.length)} libre(s)`, go: () => openDraw("asks") } : null,
              isMic ? { icon: <Hand className="size-4 text-accent" />, title: "Demandes de montée", sub: "Spectateurs qui veulent une place", badge: asks.length, go: () => openDraw("asks") } : null,
              isMic ? { icon: <Mic className="size-4 text-accent" />, title: "Demandes de parole", sub: "Mains levées sur scène", badge: hands.length, go: () => openDraw("asks") } : null,
              kind === "slam" ? { icon: <ListOrdered className="size-4 text-accent" />, title: "File d’attente", sub: `${queue.length} à suivre · ${requests.length} demande(s)`, badge: requests.length, go: () => openDraw("slam") } : null,
              kind === "stand" && questions ? { icon: <CircleHelp className="size-4 text-accent" />, title: "Questions", sub: `${waiting.length} en attente`, badge: waiting.length, go: () => openDraw("qs") } : null,
              { icon: <Flag className="size-4" />, title: "Règles", sub: rules, go: () => flash(rules) },
              { icon: <Flag className="size-4" />, title: "Modération / Signaler", sub: "Gérer un comportement", go: () => toast("Signalement envoyé") },
              { icon: <LogOut className="size-4 text-heart" />, title: "Terminer le live", sub: "Fermer pour tout le monde", go: endLive, danger: true },
            ]
          : guest
            ? [
                { icon: <Share2 className="size-4" />, title: "Partager", sub: "Inviter des amis à écouter", go: () => openSheet("share") },
                { icon: <Camera className="size-4" />, title: "Qualité vidéo", sub: link === "off" ? "Hors ligne · reconnexion…" : link === "weak" ? "Basse · connexion instable" : "Auto · adaptée à ta connexion", go: () => toast(link === "off" ? "Hors ligne · on réessaie" : link === "weak" ? "Qualité : Basse" : "Qualité : Auto") },
                { icon: <LogOut className="size-4" />, title: "Quitter la scène", sub: "Redevenir spectateur", go: leaveStage },
                { icon: <Flag className="size-4" />, title: "Signaler", sub: "Signaler un comportement", go: () => toast("Signalement envoyé") },
                { icon: <BookOpen className="size-4" />, title: "Règles", sub: rules, go: () => flash(rules) },
              ]
            : [
                { icon: <Share2 className="size-4" />, title: "Partager", sub: "Inviter des amis à écouter", go: () => openSheet("share") },
                { icon: <Camera className="size-4" />, title: "Qualité vidéo", sub: link === "off" ? "Hors ligne · reconnexion…" : link === "weak" ? "Basse · connexion instable" : "Auto · adaptée à ta connexion", go: () => toast(link === "off" ? "Hors ligne · on réessaie" : link === "weak" ? "Qualité : Basse" : "Qualité : Auto") },
                { icon: <VolumeX className="size-4" />, title: quiet ? "Rétablir le son" : "Couper le son du live", sub: "Continuer à lire le chat", go: () => { setQuiet((q) => !q); flash(quiet ? "Son rétabli" : "Son du live coupé"); } },
                { icon: <Flag className="size-4" />, title: "Signaler le live", sub: "Prévenir la modération", go: () => toast("Signalement envoyé") },
                { icon: <Ban className="size-4" />, title: "Ne plus recommander", sub: "Moins de lives comme celui-ci", go: () => toast("Ce live ne sera plus recommandé") },
                { icon: <BookOpen className="size-4" />, title: "Règles de la communauté", sub: rules, go: () => flash(rules) },
                { icon: <LogOut className="size-4 text-heart" />, title: "Quitter", sub: "Sortir du live", go: onLeave, danger: true },
              ]
        )
          .filter((x): x is NonNullable<typeof x> => Boolean(x))
          .map((it) => (
            <button
              key={it.title}
              type="button"
              onClick={() => {
                close();
                it.go();
              }}
              className={cn("mt-1.5 flex w-full items-center gap-3 rounded-lg bg-surface px-3 py-2.5 text-left", "danger" in it && it.danger && "text-heart")}
            >
              {it.icon}
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-sm">
                  {it.title}
                  {"badge" in it && it.badge ? (
                    <span className="grid min-w-4 place-items-center rounded-full bg-live px-1 text-[10px] text-fg">{it.badge}</span>
                  ) : null}
                </span>
                <span className="block truncate text-[11px] text-muted">{it.sub}</span>
              </span>
            </button>
          ))}
      </LiveSheet>

      {isMic ? (
      <>
      <LiveSheet open={sheet === "react"} onClose={close} title="Réactions">
        <div className="mt-2 flex flex-wrap gap-2">
          {REACTS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => {
                burst(layer.current, 2, true);
                close();
              }}
              className="flex size-12 items-center justify-center rounded-lg bg-surface-2 text-lg"
            >
              {e}
            </button>
          ))}
        </div>
      </LiveSheet>

      <SideSheet open={draw === "asks"} onClose={closeDraw} title="Demandes" sub={`${asks.length} pour monter · ${hands.length} main${hands.length > 1 ? "s" : ""} levée${hands.length > 1 ? "s" : ""}`}>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-muted">{Math.max(0, maxGuests - onStage.length)} place{maxGuests - onStage.length > 1 ? "s" : ""} libre{maxGuests - onStage.length > 1 ? "s" : ""}</p>
          {host ? (
            <button type="button" className="text-xs text-muted" onClick={() => setAsksOpen((v) => !v)}>
              {asksOpen ? "Fermer les demandes" : "Rouvrir"}
            </button>
          ) : null}
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Demandes de montée ({asks.length})</p>
        {asks.length === 0 ? <p className="py-2 text-xs text-muted">Aucune demande pour le moment.</p> : null}
        {asks.map((a) => (
          <div key={a.id} className="mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5">
            <Face src={a.avatar} name={a.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{a.name}</p>
              <p className="text-[11px] text-muted">Spectateur · veut monter</p>
            </div>
            {host ? (
              <div className="flex shrink-0 flex-col gap-1">
                <button type="button" className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-fg" onClick={() => acceptAsk(a)}>Faire monter</button>
                <button type="button" className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted" onClick={() => refuseAsk(a)}>Refuser</button>
              </div>
            ) : null}
          </div>
        ))}
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Demandes de parole ({hands.length})</p>
        {hands.length === 0 ? <p className="py-2 text-xs text-muted">Aucune main levée.</p> : null}
        {hands.map((a) => (
          <div key={a.id} className="mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5">
            <Face src={a.avatar} name={a.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{a.name}</p>
              <p className="text-[11px] text-muted">Sur scène · main levée</p>
            </div>
            {host ? (
              <div className="flex shrink-0 flex-col gap-1">
                <button type="button" className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-fg" onClick={() => giveFloor(a.id)}>Donner la parole</button>
                <button type="button" className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted" onClick={() => setOnStage((s) => s.map((i) => (i.id === a.id ? { ...i, hand: false } : i)))}>Refuser</button>
              </div>
            ) : null}
          </div>
        ))}
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Sur scène · {onStage.length}/{maxGuests}</p>
        {slots.map((g, i) =>
          g ? (
            <div key={g.id} className="mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5">
              <Face src={g.avatar} name={g.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  {g.name}
                  {g.speaking ? <span className="ml-1 text-[10px] text-accent">parle</span> : null}
                </p>
                <p className="text-[11px] text-muted">Place {i + 1}</p>
              </div>
              {host ? (
                <div className="flex items-center gap-1.5">
                  <button type="button" className="text-muted" aria-label="Micro" onClick={() => setOnStage((s) => s.map((x) => (x.id === g.id ? { ...x, muted: !x.muted } : x)))}>
                    {g.muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  </button>
                  <button type="button" className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted" onClick={() => kick(g.id)}>Faire descendre</button>
                </div>
              ) : null}
            </div>
          ) : (
            <div key={`free-${i}`} className="mt-1.5 flex items-center gap-2 rounded-lg border border-dashed border-accent/40 px-2.5 py-2.5">
              <span className="grid size-9 place-items-center rounded-full ring-1 ring-accent/50 text-accent"><Plus className="size-4" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm">Place libre</span>
                <span className="text-[11px] text-muted">Place {i + 1}</span>
              </span>
            </div>
          ),
        )}
      </SideSheet>
      </>
      ) : null}

      {kind === "slam" ? (
      <>
      <LiveSheet open={sheet === "slamAsk"} onClose={close} title="Demander à slamer" tall>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Titre de ton slam</p>
        <input
          value={formTitle}
          maxLength={48}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Ex. : J’ai appris à me choisir"
          className="mt-1.5 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
        />
        <p className="mt-1 text-right text-[10px] text-muted">{formTitle.length}/48</p>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Durée</p>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {([1, 3] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFormMin(d)}
              className={cn("rounded-lg py-4 text-center ring-1", formMin === d ? "bg-accent text-accent-fg ring-accent" : "bg-surface ring-line")}
            >
              <span className="block text-lg font-medium">{d} min</span>
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-muted">Uniquement 1 ou 3 minutes — c’est la règle de la scène.</p>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Ambiance</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {MUSIC.map((m) => (
            <SetupChip
              key={m}
              on={formMusic === m}
              onClick={() => {
                setFormMusic(m);
                setFormTrack(TRACKS[m][0] ?? "");
              }}
            >
              {m}
            </SetupChip>
          ))}
        </div>
        {formMusic === "Sans musique" ? (
          <p className="mt-3 rounded-lg bg-surface p-3 text-xs text-muted">Tu slameras a cappella — aucune mélodie ne sera lancée.</p>
        ) : (
          <>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Instrumentales · {formMusic} · {formMin} min</p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {TRACKS[formMusic].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormTrack(s)}
                  className={cn("flex items-center gap-2 rounded-lg px-3 py-2.5 text-left ring-1", formTrack === s ? "bg-accent/15 ring-accent/50" : "bg-surface ring-line")}
                >
                  {formTrack === s ? (
                    <span className="grid size-4 place-items-center rounded-full bg-accent text-accent-fg">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  ) : (
                    <Music2 className="size-4 text-muted" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm">{s}</span>
                    <span className="text-[10px] text-muted">{formMin}:00</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
        <Button
          size="lg"
          className="mt-4"
          disabled={formTitle.trim().length < 2}
          onClick={() => {
            const t = formTitle.trim();
            const req: SlamReq = { id: uid("s"), name: "Toi", title: t, min: formMin, music: formMusic, track: formTrack };
            setRequests((q) => [req, ...q]);
            setFormTitle("");
            flash("Demande envoyée à l’hôte");
            close();
            if (watch) {
              window.setTimeout(() => {
                setRequests((x) => x.filter((i) => i.id !== req.id));
                setQueue((q) => [...q, req]);
                setMine(req);
                setFlow("confirm");
              }, 1800);
            }
          }}
        >
          <Mic className="size-4" /> Envoyer ma demande
        </Button>
      </LiveSheet>

      <SideSheet open={draw === "slam"} onClose={closeDraw} title="Slam Thérapie — Scène ouverte" sub={`${queue.length} à suivre · ${requests.length} demande${requests.length > 1 ? "s" : ""}`}>
        {host && requests.length > 0 ? (
          <>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Demandes de passage ({requests.length})</p>
            {requests.map((r) => (
              <div key={r.id} className="mt-1.5 rounded-lg bg-surface p-2.5 ring-1 ring-accent/20">
                <div className="flex items-center gap-2">
                  <Face src={faceOf(r.name)} name={r.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{r.name}</p>
                    <p className="truncate text-[11px] italic text-muted">{r.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{r.min} min · {r.track || r.music}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5">
                  <button type="button" className="h-9 flex-1 rounded-md bg-surface-2 text-xs" onClick={() => refuseSlam(r)}>Refuser</button>
                  <button type="button" className="h-9 flex-1 rounded-md bg-accent text-xs font-medium text-accent-fg" onClick={() => acceptSlam(r)}>Accepter</button>
                </div>
              </div>
            ))}
            <p className="mt-1.5 text-[10px] text-muted">On n’entre dans la file qu’après acceptation.</p>
          </>
        ) : null}

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Sur scène</p>
        {slam ? (
          <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5 ring-1 ring-accent/30">
            <Face src={slam.name === "Toi" ? ME.avatar : slamFace} name={slam.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{slam.name}</p>
              <p className="truncate text-[11px] italic text-muted">{slam.title}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] text-muted">{slam.track || slam.music}</p>
              <p className="text-[11px] font-medium text-accent">{slam.min} min</p>
            </div>
          </div>
        ) : (
          <p className="py-2 text-xs text-muted">Personne sur scène.</p>
        )}

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">À suivre ({queue.length})</p>
        {queue.length === 0 ? <p className="mt-1.5 rounded-lg bg-surface p-3 text-xs text-muted">La file est vide — la scène est à toi.</p> : null}
        {queue.map((q, i) => (
          <div key={q.id} className={cn("mt-1.5 rounded-lg p-2.5", q.name === "Toi" ? "bg-accent/15 ring-1 ring-accent/40" : "bg-surface")}>
            <div className="flex items-center gap-2">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] font-medium text-accent">{i + 1}</span>
              <Face src={faceOf(q.name) || (q.name === "Toi" ? ME.avatar : undefined)} name={q.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{q.name}{q.name === "Toi" ? " (toi)" : ""}</p>
                <p className="truncate text-[11px] italic text-muted">{q.title}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] text-muted">{q.track || q.music}</p>
                <p className="text-[10px] font-medium text-accent">{q.min} min</p>
              </div>
            </div>
            {host ? (
              <div className="mt-2 flex items-center gap-1.5">
                <button type="button" className="grid size-7 place-items-center rounded-md bg-surface-2" aria-label="Monter" onClick={() => moveQ(i, -1)}><ChevronUp className="size-3.5" /></button>
                <button type="button" className="grid size-7 place-items-center rounded-md bg-surface-2" aria-label="Descendre" onClick={() => moveQ(i, 1)}><ChevronDown className="size-3.5" /></button>
                <button
                  type="button"
                  className="grid size-7 place-items-center rounded-md bg-surface-2 text-heart"
                  aria-label="Retirer"
                  onClick={() => {
                    setQueue((all) => all.filter((x) => x.id !== q.id));
                    flash(`${q.name} retiré de la file`);
                  }}
                >
                  <Trash2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="ml-auto flex items-center gap-1 rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-medium text-accent-fg"
                  onClick={() => startNow(q)}
                >
                  <SkipForward className="size-3" /> Passer maintenant
                </button>
              </div>
            ) : null}
          </div>
        ))}

        {host && slamMode === "open" && !slam ? (
          <Button size="sm" className="mt-3 w-full" disabled={!queue[0]} onClick={() => { closeDraw(); startNext(); }}>
            Faire monter le suivant
          </Button>
        ) : null}

        {slamMode === "open" ? (
          <div className="mt-4 rounded-lg bg-surface p-3">
            <p className="text-sm font-medium">Envie de slamer ?</p>
            <p className="mt-1 text-xs text-muted">Partage ton texte avec la communauté. 1 ou 3 minutes.</p>
            {mine ? (
              <>
                <p className="mt-2 text-[11px] font-medium text-accent">Tu es déjà dans la file (#{myPos || 1}) — ~{etaMin} min</p>
                <Button size="sm" className="mt-2 w-full" onClick={() => { closeDraw(); setFlow("backstage"); }}>
                  <Mic className="size-4" /> Préparer ma performance
                </Button>
              </>
            ) : (
              <Button size="sm" className="mt-2 w-full" onClick={() => { closeDraw(); openSheet("slamAsk"); }}>
                <Mic className="size-4" /> Demander à slamer
              </Button>
            )}
          </div>
        ) : null}

        <div className="mt-3 rounded-lg bg-surface p-3 text-xs text-muted">
          <p className="font-medium text-fg">Règles de la scène</p>
          <p className="mt-1">{rules}</p>
          <p className="mt-1">1 ou 3 minutes uniquement.</p>
        </div>
      </SideSheet>
      </>
      ) : null}

      {kind === "stand" ? (
      <>
      <SideSheet open={draw === "qs"} onClose={closeDraw} title="Questions" sub="Gère les questions de ton live">
        <div className="grid grid-cols-3 rounded-lg bg-surface p-1">
          {([
            ["wait", "En attente", waiting.length],
            ["done", "Répondues", qs.filter((q) => q.st === "done").length],
            ["skip", "Ignorées", qs.filter((q) => q.st === "skip").length],
          ] as const).map(([k, l, n]) => (
            <button
              key={k}
              type="button"
              onClick={() => setQTab(k)}
              className={cn("rounded-md py-1.5 text-[11px]", qTab === k ? "bg-accent text-accent-fg" : "text-muted")}
            >
              {l} ({n})
            </button>
          ))}
        </div>
        <div className="mt-3">
          {qs.filter((q) => (qTab === "wait" ? q.st === "wait" || q.st === "on" : q.st === qTab)).length === 0 ? (
            <p className="py-8 text-center text-xs text-muted">Aucune question ici pour l’instant.</p>
          ) : null}
          {qs
            .filter((q) => (qTab === "wait" ? q.st === "wait" || q.st === "on" : q.st === qTab))
            .map((q) => (
              <div key={q.id} className={cn("mb-2 rounded-lg px-3 py-2.5", q.st === "on" ? "bg-accent/20 ring-1 ring-accent/40" : "bg-surface")}>
                <div className="flex items-center gap-2">
                  <Face src={faceOf(q.name) || (q.name === "Toi" ? ME.avatar : undefined)} name={q.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{q.name}</p>
                    <p className="truncate text-[10px] text-muted">{q.ago}</p>
                  </div>
                  {q.st === "done" ? <Check className="size-4 text-accent" /> : null}
                </div>
                <p className="mt-1.5 text-sm leading-snug">{q.text}</p>
                {qTab === "wait" && host ? (
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      className="h-9 flex-1 rounded-md bg-surface-2 text-xs"
                      onClick={() => setQs((all) => all.map((i) => (i.id === q.id ? { ...i, st: "skip" } : i)))}
                    >
                      Ignorer
                    </button>
                    {q.st === "on" ? (
                      <button
                        type="button"
                        className="h-9 flex-1 rounded-md bg-accent text-xs text-accent-fg"
                        onClick={() => {
                          setQs((all) => all.map((i) => (i.id === q.id ? { ...i, st: "done" } : i)));
                          flash("Question répondue");
                        }}
                      >
                        Répondue
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="h-9 flex-1 rounded-md bg-accent text-xs text-accent-fg"
                        onClick={() => {
                          setQs((all) => all.map((i) => ({ ...i, st: i.id === q.id ? "on" : i.st === "on" ? "wait" : i.st })));
                          closeDraw();
                          if (q.name === "Toi") flash("L’hôte répond à ta question");
                        }}
                      >
                        Répondre
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          {qTab === "wait" && host && waiting.length > 0 ? (
            <button
              type="button"
              className="mt-1 flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-heart/15 text-xs text-heart"
              onClick={() => {
                setQs((all) => all.map((i) => (i.st === "wait" ? { ...i, st: "skip" } : i)));
                flash("Toutes les questions en attente ignorées");
              }}
            >
              <Trash2 className="size-3.5" /> Tout supprimer
            </button>
          ) : null}
        </div>
      </SideSheet>
      </>
      ) : null}
    </>
  );

  const stageBody = isMic ? (
    <div className="flex min-h-0 flex-[2.8] flex-col overflow-hidden bg-bg">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-0">{hostCam}</div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg/50 to-transparent" />
        <div ref={layer} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />
        <div className="absolute inset-0 z-[1]" onPointerDown={tap} />
        {header}
      </div>
      <div
        className="z-10 grid h-[6.25rem] shrink-0 gap-1.5 px-2 pb-1.5 pt-1"
        style={{ gridTemplateColumns: `repeat(${guestCap}, minmax(0, 1fr))` }}
      >
        {slots.map((g, i) =>
          g ? (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                if (host && g.hand) giveFloor(g.id);
                else if (g.id === "me") {
                  setMyHand((h) => !h);
                  setOnStage((s) => s.map((x) => (x.id === "me" ? { ...x, hand: !x.hand } : x)));
                }
              }}
              className={cn("mic-slot relative overflow-hidden rounded-md bg-surface-2", g.hand && "is-hand", g.speaking && "is-speak")}
            >
              <img src={g.avatar || cover} alt="" className="size-full object-cover" />
              {g.cam ? (
                <span className="absolute left-1 top-1 flex size-5 items-center justify-center rounded-full bg-bg/70">
                  <Camera className="size-2.5 text-accent" />
                </span>
              ) : null}
              {g.hand ? (
                <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-accent text-accent-fg">
                  <Hand className="size-3" />
                </span>
              ) : null}
              {g.hand ? (
                <span className="absolute inset-x-1 top-1/2 -translate-y-1/2 rounded-sm bg-bg/75 px-1 py-0.5 text-center text-[8px] leading-tight font-medium text-accent">
                  a demandé à parler
                </span>
              ) : null}
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-bg/70 px-1 py-0.5 text-[9px]">
                {g.muted ? <MicOff className="size-2.5" /> : <Mic className="size-2.5 text-accent" />}
                <span className="min-w-0 flex-1 truncate">{g.name}</span>
                {!g.muted && g.speaking ? <Wave /> : null}
              </span>
            </button>
          ) : (
            <button
              key={`e-${i}`}
              type="button"
              onClick={() => {
                if (host) openDraw("asks");
                else if (watch) requestMount();
              }}
              className="flex flex-col items-center justify-center rounded-md border border-dashed border-accent/45 bg-bg/35"
            >
              <span className="flex size-6 items-center justify-center rounded-full ring-1 ring-accent text-accent">
                <Plus className="size-3.5" />
              </span>
              <span className="mt-0.5 px-1 text-center text-[9px] leading-tight text-fg/85">Place libre</span>
            </button>
          ),
        )}
      </div>
    </div>
  ) : isStory ? (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0">{hostCam}</div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-bg/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-bg/45 to-transparent" />
      <div ref={layer} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />
      <div className="absolute inset-0 z-[1] touch-manipulation" onPointerDown={tap} />
      {header}
    </div>
  ) : (
    <div className="absolute inset-0">
      {kind === "slam" && slammer ? (
        <img src={slamFace} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="absolute inset-0">{hostCam}</div>
      )}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg/85 to-transparent" />
      <div ref={layer} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />
      <div className="absolute inset-0 z-[1]" onPointerDown={tap} />
      {header}
    </div>
  );

  if (recap && snap) {
    return <LiveRecap stats={snap} onClose={goHome} />;
  }

  return (
    <div data-kind={kind} className={cn("relative overflow-hidden bg-bg", isMic ? "flex h-full flex-col" : "h-full")}>
      {stageBody}
      <LinkBanner level={link} className="top-[4.7rem]" />

      {pin ? (
        <div className="absolute inset-x-3 top-[42%] z-10 rounded-lg bg-bg/75 px-3 py-2.5 ring-1 ring-accent/40">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent">
            <CircleHelp className="size-3" /> {pin.name} demande
          </p>
          <p className="mt-1 text-sm leading-snug">« {pin.text} »</p>
          {host ? (
            <button
              type="button"
              className="mt-2 flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-accent text-xs font-medium text-accent-fg"
              onClick={() => {
                setQs((all) => all.map((i) => (i.id === pin.id ? { ...i, st: "done" } : i)));
                toast("Question répondue");
              }}
            >
              <Check className="size-3.5" /> Question répondue
            </button>
          ) : null}
        </div>
      ) : null}

      {isMic && host && asks[0] ? (
        <div className="absolute inset-x-3 top-[7.4rem] z-20 rounded-lg bg-bg/80 px-3 py-2.5 ring-1 ring-accent/40">
          <p className="flex items-center gap-1.5 text-sm leading-snug">
            <Hand className="size-4 shrink-0 text-accent" />
            <span>
              <span className="font-medium">{asks[0].name}</span> souhaite prendre la parole
            </span>
          </p>
          <div className="mt-2 flex gap-2">
            <button type="button" className="h-10 flex-1 rounded-md bg-surface-2 text-xs" onClick={() => refuseAsk(asks[0]!)}>
              Refuser
            </button>
            <button type="button" className="h-10 flex-1 rounded-md bg-accent text-xs font-medium text-accent-fg" onClick={() => acceptAsk(asks[0]!)}>
              Accepter
            </button>
          </div>
        </div>
      ) : null}

      {kind === "slam" && slammer ? (
        <div className="absolute bottom-[5.75rem] right-3 z-20 size-20 overflow-hidden rounded-md outline outline-1 -outline-offset-1 outline-accent/50">
          {hostCam}
        </div>
      ) : null}

      {kind === "slam" && slam ? (
        <div className="pointer-events-none absolute left-3 right-24 top-[5.4rem] z-10">
          <p className="font-display text-lg leading-tight tracking-tight">{slam.name}</p>
          <p className="mt-0.5 truncate text-[11px] italic text-fg/80">{slam.title}</p>
          <button
            type="button"
            className="pointer-events-auto mt-1 inline-flex max-w-full items-center gap-1.5 rounded-md bg-bg/55 px-2 py-1 text-[10px]"
            onClick={() => toast(slam.track ? `${slam.track} · ${slam.music}` : "Sans musique — a cappella")}
          >
            <Music2 className="size-3 shrink-0 text-accent" />
            <span className="truncate">{slam.track || slam.music}</span>
            {slam.track ? slamRun ? <Play className="size-2.5 shrink-0 fill-accent text-accent" /> : <Pause className="size-2.5 shrink-0 text-muted" /> : null}
          </button>
        </div>
      ) : null}

      {kind === "stand" && host && questions ? (
        <button
          type="button"
          onClick={() => openDraw("qs")}
          className="absolute left-3 top-[42%] z-20 flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-xs font-medium text-accent-fg"
        >
          <CircleHelp className="size-3.5" /> Questions
          <span className="grid min-w-4 place-items-center rounded-full bg-accent-fg px-1 text-[10px] text-accent">{waiting.length}</span>
        </button>
      ) : null}

      <p ref={comboEl} className="pointer-events-none absolute bottom-40 right-16 z-20 font-display text-3xl italic tabular-nums opacity-0" />
      {gifts.map((h) => {
        const G = GIFTS.find((g) => g.id === h.kind);
        if (!G) return null;
        return (
          <span
            key={h.id}
            className="gift-float"
            style={{
              right: `${h.x}%`,
              ["--gift-delay" as string]: `${h.delay}ms`,
              ["--gift-x" as string]: `${h.drift}px`,
              ["--gift-r" as string]: `${h.rot}deg`,
            }}
          >
            {G.emoji}
          </span>
        );
      })}
      {giftNote ? (
        <div className="gift-banner pointer-events-none absolute left-3 top-[38%] z-[25] flex max-w-[72%] items-center gap-2 rounded-full bg-bg/80 py-1 pr-3 pl-1 ring-1 ring-accent/35">
          <Face
            src={giftNote.name === "Toi" ? ME.avatar || "/avatars/maya.jpg" : CAST.find((u) => u.name.startsWith(giftNote.name))?.avatar}
            name={giftNote.name}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{giftNote.name}</p>
            <p className="truncate text-[10px] text-muted">
              envoie {giftNote.label} · {giftNote.zems} Zems
            </p>
          </div>
          <span className="text-lg leading-none">{giftNote.emoji}</span>
        </div>
      ) : null}

      {isMic ? (
        <>
          {chatCol}
          <div className="shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1" style={kb ? { paddingBottom: kb } : undefined}>
            {composer}
            {host || guest ? (
              <div className="mx-2 mt-2 flex items-end justify-between rounded-2xl bg-bg/70 px-1.5 py-2 ring-1 ring-line">
                <Dock icon={<LogOut className="size-4" />} label={host ? "Quitter" : "Quitter la scène"} onClick={host ? endLive : leaveStage} />
                <Dock
                  icon={mutedHost ? <MicOff className="size-4" /> : <Mic className={cn("size-4", speakingMe && "text-live")} />}
                  label={mutedHost ? "Coupé" : speakingMe ? "Parle" : "Mic"}
                  onClick={() => setMutedHost((m) => !m)}
                />
                <Dock icon={camOn ? <Camera className="size-4" /> : <CameraOff className="size-4" />} label="Caméra" onClick={() => setCamOn((c) => !c)} />
                <button
                  type="button"
                  onClick={() => {
                    if (host) openDraw("asks");
                    else {
                      setMyHand((h) => !h);
                      setOnStage((s) => s.map((x) => (x.id === "me" ? { ...x, hand: !x.hand } : x)));
                    }
                  }}
                  className="relative -mt-3 flex size-14 shrink-0 flex-col items-center justify-center rounded-full bg-accent text-accent-fg"
                >
                  {host ? <Mic className="size-4" /> : <Hand className="size-4" />}
                  <span className="max-w-12 text-center text-[8px] leading-tight font-medium">{host ? "Parole" : myHand ? "Main levée" : "Parler"}</span>
                  {host && (asks.length + hands.length) > 0 ? (
                    <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-live text-[10px]">{asks.length + hands.length}</span>
                  ) : null}
                </button>
                <Dock icon={<Users className="size-4" />} label="Inviter" onClick={() => openSheet("share")} />
                <Dock icon={<Smile className="size-4" />} label="Réagir" onClick={() => openSheet("react")} />
                <Dock icon={<MoreHorizontal className="size-4" />} label="Plus" onClick={() => openSheet("more")} />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          {chatCol}
          <div className="absolute inset-x-0 bottom-0 z-10 pb-[max(0.6rem,env(safe-area-inset-bottom))]" style={kb ? { paddingBottom: kb } : undefined}>{composer}</div>
        </>
      )}

      <div className="pointer-events-none absolute inset-0 z-[70]">
      {sheets}

      {notice ? (
        <p className="pointer-events-auto absolute inset-x-6 top-[42%] z-[62] rounded-lg bg-bg/90 px-4 py-3 text-center text-sm font-medium ring-1 ring-accent/40">{notice}</p>
      ) : null}

      {quiet ? (
        <span className="absolute right-3 top-[7.4rem] z-20 flex items-center gap-1 rounded-full bg-bg/60 px-2 py-1 text-[10px] text-muted">
          <VolumeX className="size-3" /> Son coupé
        </span>
      ) : null}

      {sheet === "qsAsk" ? (
        <>
          <button type="button" className="ask-veil is-open pointer-events-auto absolute inset-0 z-[60]" aria-label="Fermer" onClick={close} />
          <div className="pointer-events-auto absolute inset-x-4 top-[22%] z-[61] rounded-2xl bg-bg p-4 ring-1 ring-accent/40">
            <p className="text-sm font-medium">Poser une question</p>
            <p className="mt-1 text-xs text-muted">Ta question est envoyée à l’hôte. Il choisit d’y répondre à l’antenne.</p>
            <textarea
              value={askText}
              onChange={(e) => setAskText(e.target.value)}
              rows={3}
              placeholder="Écris ta question…"
              className="mt-3 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
            />
            <Button
              size="lg"
              className="mt-3"
              disabled={!askText.trim()}
              onClick={() => {
                setQs((all) => [{ id: uid("q"), name: "Toi", text: askText.trim(), st: "wait", ago: "À l’instant" }, ...all]);
                setAskText("");
                flash("Question envoyée à l’hôte");
                close();
              }}
            >
              Envoyer
            </Button>
          </div>
        </>
      ) : null}

      {thanks ? (
        <div className="absolute inset-x-6 top-[42%] z-[62] rounded-lg bg-bg/90 px-4 py-3 text-center ring-1 ring-accent/50">
          <p className="text-sm font-medium text-accent">Merci {thanks}</p>
          <p className="mt-1 text-xs text-muted">Ta performance est terminée. Retour en spectateur.</p>
        </div>
      ) : null}

      {nextUp && count !== null ? (
        <div className="pointer-events-auto absolute inset-0 z-[63] grid place-items-center bg-bg/85">
          <div className="px-6 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Prochain sur scène</p>
            <p className="mt-2 font-display text-3xl leading-none">{nextUp.name}</p>
            <p className="mt-1.5 text-sm italic text-muted">{nextUp.title}</p>
            <p className="mt-1 text-xs text-muted">{nextUp.track || nextUp.music} · {nextUp.min} min</p>
            <p className="mt-4 font-display text-6xl leading-none text-accent">{count === 0 ? "●" : count}</p>
            {count === 0 ? <p className="mt-2 text-xs text-muted">Chrono et musique lancés</p> : null}
          </div>
        </div>
      ) : null}

      {flow === "notice" ? (
        <div className="pointer-events-auto absolute inset-x-3 top-[46%] z-[61] rounded-lg bg-bg p-3 ring-1 ring-accent/45">
          <p className="text-sm font-medium text-accent">Tu passes bientôt</p>
          <p className="mt-1 text-xs text-muted">Ta performance commence dans ~1 minute.</p>
          <div className="mt-2.5 flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => setFlow("backstage")}>Préparer ma performance</Button>
            <button type="button" className="rounded-md bg-surface px-3 text-xs" onClick={() => setFlow(null)}>Plus tard</button>
          </div>
        </div>
      ) : null}

      {flow === "backstage" && mine ? (
        <>
          <button type="button" className="ask-veil is-open pointer-events-auto absolute inset-0 z-[64]" aria-label="Fermer" onClick={() => setFlow(null)} />
          <div className="pointer-events-auto absolute inset-x-4 top-1/2 z-[65] -translate-y-1/2 rounded-2xl bg-bg p-4 ring-1 ring-accent/40">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">Backstage privé</p>
            <p className="mt-1 font-display text-xl">Tu es le prochain</p>
            <p className="mt-1 text-xs text-muted">Passage dans {String(Math.floor(soonLeft / 60)).padStart(2, "0")}:{String(soonLeft % 60).padStart(2, "0")} — personne ne te voit ni ne t’entend pour l’instant.</p>
            <div className="mt-3 flex flex-col gap-1.5">
              {[
                { icon: <Mic className="size-4 text-accent" />, label: "Micro prêt" },
                { icon: <Camera className="size-4 text-accent" />, label: "Caméra prête" },
                { icon: <Music2 className="size-4 text-accent" />, label: mine.track ? `${mine.track} — ${mine.music}` : mine.music },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5">
                  {c.icon}
                  <p className="min-w-0 flex-1 truncate text-sm">{c.label}</p>
                  <Check className="size-4 text-accent" />
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[11px] text-muted">Ta caméra ne s’allumera qu’après ta confirmation. Sans confirmation, l’hôte passe au suivant.</p>
            <Button
              size="lg"
              className="mt-3"
              onClick={() => {
                setReady("soon");
                setFlow(null);
                flash("Tu es prêt — l’hôte va te faire monter");
                startNow(mine);
              }}
            >
              Je suis prêt
            </Button>
            <button type="button" className="mt-1.5 flex h-11 w-full items-center justify-center rounded-md bg-surface text-sm text-muted" onClick={() => setFlow(null)}>
              Fermer
            </button>
          </div>
        </>
      ) : null}

      {flow === "confirm" && mine ? (
        <>
          <button type="button" className="ask-veil is-open pointer-events-auto absolute inset-0 z-[64]" aria-label="Fermer" onClick={() => setFlow(null)} />
          <div className="pointer-events-auto absolute inset-x-4 top-1/2 z-[65] -translate-y-1/2 rounded-2xl bg-bg p-4 text-center ring-1 ring-accent/45">
            <p className="text-sm font-medium text-accent">Ta demande a été acceptée</p>
            <p className="mt-2 text-sm">Tu es <span className="font-medium text-accent">#{myPos || 1}</span> dans la file d’attente.</p>
            <p className="mt-1 text-xs text-muted">Passage estimé dans ~{etaMin} min.</p>
            <div className="mt-3 rounded-lg bg-surface p-3 text-left">
              <p className="truncate text-sm font-medium">{mine.title}</p>
              <p className="mt-0.5 text-[11px] text-muted">{mine.min} min · {mine.track || mine.music}</p>
            </div>
            <Button size="lg" className="mt-3" onClick={() => setFlow(null)}>Super, je patiente</Button>
            <button type="button" className="mt-1.5 flex h-11 w-full items-center justify-center rounded-md bg-surface text-sm" onClick={() => setFlow("backstage")}>
              Préparer ma performance
            </button>
          </div>
        </>
      ) : null}
      </div>
    </div>
  );
}

function Shell({ title, onBack, children, right, kind }: { title: string; onBack: () => void; children: ReactNode; right?: ReactNode; kind?: LiveKind }) {
  return (
    <div data-kind={kind} className="relative flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center gap-2 px-3">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onBack} aria-label="Retour">
          <X className="size-5" />
        </button>
        <p className="flex-1 text-center text-sm font-medium">{title}</p>
        <span className="flex size-11 items-center justify-center">{right}</span>
      </header>
      {children}
    </div>
  );
}

function Dock({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-11 flex-col items-center gap-0.5 text-fg/85">
      {icon}
      <span className="text-[8px] leading-none">{label}</span>
    </button>
  );
}

function LiveSheet({
  open,
  onClose,
  title,
  tall,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  tall?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, start: 0, y: 0 });
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, input, textarea")) return;
    drag.current = { on: true, start: e.clientY, y: 0 };
    ref.current?.classList.add("is-drag");
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    const dy = Math.max(0, e.clientY - drag.current.start);
    drag.current.y = dy;
    if (ref.current) ref.current.style.transform = `translate3d(0,${dy}px,0)`;
  };
  const onUp = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    ref.current?.classList.remove("is-drag");
    if (drag.current.y > 90) {
      if (ref.current) ref.current.style.transform = "";
      onClose();
      return;
    }
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <>
      <button type="button" className={cn("ask-veil absolute inset-0 z-40", open && "is-open")} aria-label="Fermer" aria-hidden={!open} onClick={onClose} />
      <div
        ref={ref}
        className={cn("live-sheet absolute inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-bg px-4", open && "is-open", tall && "is-tall")}
        aria-hidden={!open}
        inert={!open || undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-fg/20" />
        <div className="mt-2 flex shrink-0 items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <button type="button" className="flex size-11 items-center justify-center" onClick={onClose} aria-label="Fermer">
            <X className="size-5" />
          </button>
        </div>
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
      </div>
    </>
  );
}

function SideSheet({
  open,
  onClose,
  title,
  sub,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  sub?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, start: 0, x: 0 });
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, input, textarea")) return;
    drag.current = { on: true, start: e.clientX, x: 0 };
    ref.current?.classList.add("is-drag");
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    const dx = Math.max(0, e.clientX - drag.current.start);
    drag.current.x = dx;
    if (ref.current) ref.current.style.transform = `translate3d(${dx}px,0,0)`;
  };
  const onUp = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    ref.current?.classList.remove("is-drag");
    if (drag.current.x > 80) {
      if (ref.current) ref.current.style.transform = "";
      onClose();
      return;
    }
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <>
      <button type="button" className={cn("ask-veil absolute inset-0 z-40", open && "is-open")} aria-label="Fermer" aria-hidden={!open} onClick={onClose} />
      <div
        ref={ref}
        className={cn("side-sheet absolute inset-y-0 right-0 z-50 flex flex-col bg-bg pl-6 pr-4", open && "is-open")}
        aria-hidden={!open}
        inert={!open || undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="side-handle" aria-hidden />
        <div className="mt-[calc(0.5rem+env(safe-area-inset-top))] flex shrink-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{title}</p>
            {sub ? <p className="text-xs text-muted">{sub}</p> : null}
          </div>
          <button type="button" className="flex size-11 shrink-0 items-center justify-center" onClick={onClose} aria-label="Fermer">
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-1 text-[11px] text-muted">Glisse vers la droite pour fermer.</p>
        <div className="no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
      </div>
    </>
  );
}

function Face({ src, name, size = "md" }: { src?: string; name: string; size?: "xs" | "sm" | "md" | "lg" }) {
  const dim = size === "xs" ? "size-5" : size === "sm" ? "size-8" : size === "lg" ? "size-11" : "size-9";
  return (
    <span className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 text-[10px]", dim)}>
      {src ? <img src={src} alt="" className="size-full object-cover" /> : name.charAt(0)}
    </span>
  );
}

function Wave() {
  return (
    <span className="eq" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="eq-bar anim-eq" />
      ))}
    </span>
  );
}

function fmtClock(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}

function fmtDuration(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `${r} s`;
  return `${m} min ${String(r).padStart(2, "0")} s`;
}
