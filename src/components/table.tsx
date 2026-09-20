import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  Ban,
  BookOpen,
  CircleHelp,
  Dices,
  Gift,
  Globe,
  Hand,
  Heart,
  Lock,
  MessageCircle,
  Mic,
  MicOff,
  Pencil,
  Plus,
  Ticket,
  Users,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { burst, GiftGrid, GIFTS } from "@/components/live";
import { LiveRecap, type RecapStats } from "@/components/live-host";
import { FeltShader } from "@/components/felt-shader";
import { CoverPick, SetupChip, SetupChoice, SetupProgress, SetupRecap, SetupSec, SetupToggle, TICKETS } from "@/components/setup";
import { ME, USERS, type User } from "@/lib/catalog";
import { useSway } from "@/lib/store";
import { useNav } from "@/components/nav";
import { Button } from "@/components/ui";
import { cn, compact, uid } from "@/lib/utils";

const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const QUESTIONS = [
  "Qu’est-ce que tu n’as dit à personne cette semaine ?",
  "Tu mentirais pour protéger quelqu’un ?",
  "Quel silence te pèse, vraiment ?",
  "La dernière fois que tu as eu peur.",
  "Qui t’a manqué, sans le dire.",
  "Un secret que tu gardes encore.",
  "Tu quitterais tout demain ?",
  "Ce que tu fuis, en ce moment.",
  "À qui tu dois encore un mot.",
  "Le mensonge le plus utile.",
  "Ce que tu n’oses pas vouloir.",
  "Si on t’écoutait pour de vrai.",
];

const CUPS = [
  { x: 50, y: 3.8 },
  { x: 6, y: 28 },
  { x: 6, y: 72 },
  { x: 50, y: 96.2 },
  { x: 94, y: 72 },
  { x: 94, y: 28 },
];
const WAITING = [USERS["u-jules"]!, USERS["u-luca"]!, USERS["u-rina"]!];
const JOINERS = ["Dina", "Kadi", "Samir"];
const SPECTATE = ["j’écoute", "force", "la question est dure", "je reste", "continue", "bravo"];
const SPECTATE_QS = [
  { from: "Dina", to: "u-maya", text: "Tu partirais sans un mot ?" },
  { from: "Kadi", to: "u-theo", text: "Qui tu protèges encore ?" },
];

const SEAT_POS = [
  { x: 50, y: 107 },
  { x: 6, y: 88 },
  { x: -7, y: 50 },
  { x: 6, y: 12 },
  { x: 50, y: -4 },
  { x: 94, y: 12 },
  { x: 107, y: 50 },
  { x: 94, y: 88 },
];

const hostIndex = (n: 4 | 6 | 8) => (n === 8 ? 4 : n === 6 ? 3 : 2);

const seatLayout = (n: 4 | 6 | 8) => {
  if (n === 8) return SEAT_POS;
  if (n === 4) return [SEAT_POS[0]!, SEAT_POS[2]!, SEAT_POS[4]!, SEAT_POS[6]!];
  const rx = 57;
  const ry = 55.5;
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return { x: +(50 - rx * Math.sin(a)).toFixed(1), y: +(50 + ry * Math.cos(a)).toFixed(1) };
  });
};

export type WoodId = "noyer" | "chene" | "fume" | "loupe";

export const WOODS: { id: WoodId; label: string; line: string }[] = [
  { id: "noyer", label: "Noyer", line: "Grain droit, foncé" },
  { id: "chene", label: "Chêne", line: "Sable clair" },
  { id: "fume", label: "Fumé", line: "Presque encre" },
  { id: "loupe", label: "Loupe", line: "Tourbillons" },
];

export type TableCfg = {
  title: string;
  desc: string;
  cover: string;
  wood: WoodId;
  places: 4 | 6 | 8;
  priv: boolean;
  premium: boolean;
  tickets: string;
  comments: "all" | "subs" | "off";
  questions: boolean;
  rules: string;
};

const COVERS = ["/posters/pottery.jpg", "/posters/sunrise.jpg", "/posters/city.jpg", "/posters/plants.jpg"];
const COMMENT_OPTS: { id: TableCfg["comments"]; label: string }[] = [
  { id: "all", label: "Tout le monde" },
  { id: "subs", label: "Abonnés" },
  { id: "off", label: "Personne" },
];

const readWood = (): WoodId => {
  try {
    const v = localStorage.getItem("sway-wood");
    if (v === "noyer" || v === "chene" || v === "fume" || v === "loupe") return v;
  } catch {
    /* ignore */
  }
  return "noyer";
};

const DEFAULT_CFG = (): TableCfg => ({
  title: "Une question à la fois",
  desc: "",
  cover: COVERS[0]!,
  wood: readWood(),
  places: 8,
  priv: false,
  premium: false,
  tickets: "3",
  comments: "all",
  questions: true,
  rules: "Respect. Pas de jugement. Une question à la fois.",
});

type Seat = { user: User | null; muted: boolean; cam: boolean };

const START: Seat[] = [
  { user: USERS["u-ines"]!, muted: false, cam: false },
  { user: USERS["u-maya"]!, muted: false, cam: false },
  { user: null, muted: true, cam: false },
  { user: USERS["u-theo"]!, muted: true, cam: false },
  { user: { ...ME }, muted: false, cam: true },
  { user: null, muted: true, cam: false },
  { user: USERS["u-sol"]!, muted: false, cam: false },
  { user: USERS["u-noah"]!, muted: true, cam: false },
];

const GUESTS = [USERS["u-ines"]!, USERS["u-maya"]!, USERS["u-theo"]!, USERS["u-sol"]!, USERS["u-noah"]!];

const openSeats = (n: 4 | 6 | 8, me: User): Seat[] => {
  if (n === 8) {
    const next = START.map((s) => ({ ...s }));
    next[4] = { user: me, muted: false, cam: true };
    return next;
  }
  const hostI = hostIndex(n);
  const seats: Seat[] = Array.from({ length: n }, () => ({ user: null, muted: true, cam: false }));
  seats[hostI] = { user: me, muted: false, cam: true };
  const fill = n === 4 ? 1 : 2;
  let g = 0;
  for (let i = 0; i < n && g < fill; i++) {
    if (i === hostI) continue;
    const u = GUESTS[g++];
    if (!u) break;
    seats[i] = { user: u, muted: false, cam: false };
  }
  return seats;
};

type Line = { id: string; name: string; text: string; kind: "chat" | "join"; at: number; out?: boolean };
type Ask = { id: string; user: User };
type SpectatorQ = { id: string; from: string; to: User; text: string };

export function TableSetup({
  onBack,
  onLaunch,
  draft,
}: {
  onBack: () => void;
  onLaunch: (cfg: TableCfg) => void;
  draft?: TableCfg;
}) {
  const [step, setStep] = useState<"edit" | "review">(draft ? "review" : "edit");
  const [title, setTitle] = useState(draft?.title ?? DEFAULT_CFG().title);
  const [desc, setDesc] = useState(draft?.desc ?? "");
  const [cover, setCover] = useState(draft?.cover ?? COVERS[0]!);
  const [wood, setWood] = useState<WoodId>(draft?.wood ?? readWood());
  const [places, setPlaces] = useState<4 | 6 | 8>(draft?.places ?? 8);
  const [priv, setPriv] = useState(draft?.priv ?? false);
  const [premium, setPremium] = useState(draft?.premium ?? false);
  const [tickets, setTickets] = useState(draft?.tickets ?? "3");
  const [comments, setComments] = useState<TableCfg["comments"]>(draft?.comments ?? "all");
  const [questions, setQuestions] = useState(draft?.questions ?? true);
  const [rules, setRules] = useState(draft?.rules ?? DEFAULT_CFG().rules);

  const cfg = (): TableCfg => ({ title: title.trim() || "Zembo Table", desc, cover, wood, places, priv, premium, tickets, comments, questions, rules });

  const goReview = () => {
    try {
      localStorage.setItem("sway-wood", wood);
    } catch {
      /* ignore */
    }
    setStep("review");
  };

  if (step === "review") {
    const c = cfg();
    const woodLabel = WOODS.find((w) => w.id === c.wood)?.label ?? "Noyer";
    const who = COMMENT_OPTS.find((o) => o.id === c.comments)?.label ?? "Tout le monde";
    return (
      <div className="flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
        <header className="flex items-center gap-2 px-3">
          <button type="button" className="flex size-11 items-center justify-center" onClick={() => setStep("edit")} aria-label="Retour">
            <X className="size-5" />
          </button>
          <p className="flex-1 text-center text-sm font-medium">Tout est prêt</p>
          <span className="px-2 text-xs font-medium text-accent">2/2</span>
        </header>
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <p className="mt-2 text-center text-sm text-muted">Vérifie avant de lancer ta table.</p>
          <SetupProgress step={2} />
          <div className="mt-4 overflow-hidden rounded-lg bg-surface">
            <div className="relative">
              <img src={c.cover} alt="" className="h-36 w-full object-cover" />
              <span className="absolute bottom-2 right-2 rounded-full bg-bg/70 px-2.5 py-1 text-[10px] uppercase tracking-wider">{woodLabel}</span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium">{c.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{c.desc || "Aucune description."}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <SetupRecap icon={<Users className="size-4" />} label="Places" value={`${c.places} personnes`} onClick={() => setStep("edit")} />
            <SetupRecap icon={c.priv ? <Lock className="size-4" /> : <Globe className="size-4" />} label="Visibilité" value={c.priv ? "Privé" : "Public"} onClick={() => setStep("edit")} />
            <SetupRecap
              icon={c.premium ? <Ticket className="size-4" /> : <Users className="size-4" />}
              label="Accès"
              value={c.premium ? `Payant · ${c.tickets} ticket${c.tickets === "1" ? "" : "s"}` : "Gratuit"}
              onClick={() => setStep("edit")}
            />
            <SetupRecap icon={<MessageCircle className="size-4" />} label="Commentaires" value={who} onClick={() => setStep("edit")} />
            <SetupRecap icon={<BookOpen className="size-4" />} label="Règles" value={c.rules} onClick={() => setStep("edit")} />
            <SetupRecap icon={<CircleHelp className="size-4" />} label="Questions" value={c.questions ? "Acceptées" : "Fermées"} onClick={() => setStep("edit")} />
          </div>
          <div className="mt-4 flex gap-2.5 rounded-lg bg-surface p-3">
            <Dices className="mt-0.5 size-4 shrink-0 text-accent" />
            <p className="text-xs leading-snug text-muted">Une carte, une question. On écoute. Un écart peut fermer la table.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <Button size="lg" onClick={() => onLaunch(c)}>
            Lancer ma Zembo Table
          </Button>
          <Button variant="line" size="lg" onClick={() => setStep("edit")}>
            <Pencil className="size-4" />
            Modifier
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center gap-2 px-3">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onBack} aria-label="Retour">
          <X className="size-5" />
        </button>
        <p className="flex-1 text-center text-sm font-medium">Configurer Zembo Table</p>
        <span className="px-2 text-xs font-medium text-muted">1/2</span>
      </header>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-accent/30">
            <Dices className="size-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none tracking-tight">Zembo Table</p>
            <p className="mt-1 text-xs text-accent">Une table. Un dé. Une question.</p>
          </div>
        </div>
        <SetupProgress step={1} />

        <SetupSec n={1} title="Titre">
          <input
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Le titre de ta table"
            className="h-11 w-full rounded-md bg-bg px-3 text-sm outline-none placeholder:text-subtle"
          />
          <p className="mt-1 text-right text-[10px] text-muted">{title.length}/100</p>
        </SetupSec>
        <SetupSec n={2} title="Description">
          <textarea
            value={desc}
            maxLength={500}
            rows={2}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="De quoi parle-t-on, ce soir ?"
            className="w-full resize-none rounded-md bg-bg p-3 text-sm outline-none placeholder:text-subtle"
          />
        </SetupSec>
        <SetupSec n={3} title="Couverture">
          <CoverPick covers={COVERS} value={cover} onPick={setCover} />
        </SetupSec>
        <SetupSec n={4} title="Bois du rail">
          <div className="grid grid-cols-2 gap-2">
            {WOODS.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setWood(w.id)}
                aria-label={w.label}
                aria-pressed={wood === w.id}
                className={cn(
                  "overflow-hidden rounded-md bg-bg text-left",
                  wood === w.id ? "shadow-[0_0_0_2px_var(--kind,var(--color-accent))]" : "shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)]",
                )}
              >
                <img src={`/wood/${w.id}.jpg`} alt="" className="h-14 w-full object-cover" />
                <span className="block px-2 pb-2 pt-1.5">
                  <span className="block text-sm font-medium">{w.label}</span>
                  <span className="text-[11px] text-muted">{w.line}</span>
                </span>
              </button>
            ))}
          </div>
        </SetupSec>
        <SetupSec n={5} title="Places">
          <div className="flex gap-1.5">
            {([4, 6, 8] as const).map((n) => (
              <SetupChip key={n} on={places === n} onClick={() => setPlaces(n)}>
                {n}
              </SetupChip>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-muted">L’hôte compris. Personne de plus ne monte.</p>
        </SetupSec>
        <SetupSec n={6} title="Visibilité">
          <div className="flex gap-2">
            <SetupChoice on={!priv} icon={<Globe className="size-4" />} title="Public" line="Tout le monde peut entrer" onClick={() => setPriv(false)} />
            <SetupChoice on={priv} icon={<Lock className="size-4" />} title="Privé" line="Sur invitation" onClick={() => setPriv(true)} />
          </div>
        </SetupSec>
        <SetupSec n={7} title="Accès">
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
        <SetupSec n={8} title="Commentaires">
          <div className="flex flex-wrap gap-1.5">
            <SetupChip on={comments === "all"} onClick={() => setComments("all")}>
              Tout le monde
            </SetupChip>
            <SetupChip on={comments === "subs"} onClick={() => setComments("subs")}>
              Abonnés
            </SetupChip>
            <SetupChip on={comments === "off"} onClick={() => setComments("off")}>
              <span className="inline-flex items-center gap-1">
                <Ban className="size-3" /> Personne
              </span>
            </SetupChip>
          </div>
        </SetupSec>
        <SetupSec n={9} title="Règles">
          <input
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            className="h-11 w-full rounded-md bg-bg px-3 text-sm outline-none"
          />
        </SetupSec>
        <SetupSec n={10} title="Questions">
          <SetupToggle label="Accepter les questions écrites" on={questions} onClick={() => setQuestions(!questions)} />
        </SetupSec>
      </div>
      <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <Button size="lg" onClick={goReview}>
          Suivant
        </Button>
      </div>
    </div>
  );
}

export function TableRoom({ onBack, cfg }: { onBack: () => void; cfg: TableCfg }) {
  const me = useSway((s) => s.me);
  const { toast, setTab } = useNav();
  const places: 4 | 6 | 8 = cfg.places === 4 || cfg.places === 6 ? cfg.places : 8;
  const POS = seatLayout(places);
  const [seats, setSeats] = useState<Seat[]>(() => openSeats(places, me));
  const wood = cfg.wood;
  const [asks, setAsks] = useState<Ask[]>([]);
  const [askOpen, setAskOpen] = useState(false);
  const [speaker, setSpeaker] = useState("Toi");
  const [viewers, setViewers] = useState(86);
  const [recap, setRecap] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [snap, setSnap] = useState<RecapStats | null>(null);
  const ended = useRef(false);
  const [talk, setTalk] = useState<Line[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [mid, setMid] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [freshId, setFreshId] = useState<string | null>(null);
  const [tray, setTray] = useState<"gifts" | "ask" | null>(null);
  const [giftTo, setGiftTo] = useState<User | null>(null);
  const [qtext, setQtext] = useState("");
  const [qPending, setQPending] = useState<SpectatorQ[]>([]);
  const [qQueue, setQQueue] = useState<SpectatorQ[]>([]);
  const [askTo, setAskTo] = useState<User | null>(null);
  const [asker, setAsker] = useState<string | null>(null);
  const [askedTo, setAskedTo] = useState<string | null>(null);
  const [dieSeat, setDieSeat] = useState<number>(hostIndex(places));
  const [picking, setPicking] = useState(false);
  const [pick, setPick] = useState<User | null>(null);
  const [floaties, setFloaties] = useState<{ id: number; x: number; kind: (typeof GIFTS)[number]["id"] }[]>([]);
  const layer = useRef<HTMLDivElement>(null);
  const likesEl = useRef<HTMLSpanElement>(null);
  const comboEl = useRef<HTMLParagraphElement>(null);
  const likes = useRef(36);
  const giftsN = useRef(0);
  const lastTap = useRef(0);
  const combo = useRef(0);
  const comboClear = useRef<number | null>(null);
  const [frame, setFrame] = useState<{ top: number; height: number } | null>(null);
  const [face, setFace] = useState(1);
  const [question, setQuestion] = useState(QUESTIONS[0]!);
  const spins = useRef(0);
  const waitI = useRef(0);
  const timers = useRef<number[]>([]);
  const seatsRef = useRef(seats);
  seatsRef.current = seats;
  const qRef = useRef(qQueue);
  qRef.current = qQueue;
  const sheetRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, start: 0, x: 0 });

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  const paintLikes = (n: number) => {
    likes.current = n;
    if (likesEl.current) likesEl.current.textContent = compact(n);
  };

  const paintCombo = (n: number) => {
    combo.current = n;
    const el = comboEl.current;
    if (!el) return;
    if (n > 1) {
      el.textContent = `x${n}`;
      el.style.opacity = "1";
    } else {
      el.style.opacity = "0";
    }
  };

  const tap = () => {
    if (ended.current) return;
    const el = layer.current;
    if (el) {
      const r = el.getBoundingClientRect();
      burst(el, 1, true, { x: r.width - 26 - Math.random() * 14, y: r.height * 0.62 });
    }
    const now = performance.now();
    const next = now - lastTap.current < 900 ? combo.current + 1 : 1;
    lastTap.current = now;
    paintCombo(next);
    paintLikes(likes.current + 1);
    if (comboClear.current) window.clearTimeout(comboClear.current);
    comboClear.current = window.setTimeout(() => paintCombo(0), 900);
  };

  const sendGift = (g: (typeof GIFTS)[number]) => {
    const batch = Array.from({ length: g.zems >= 99 ? 5 : 3 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: 10 + Math.random() * 42,
      kind: g.id,
    }));
    setFloaties((h) => [...h, ...batch]);
    later(() => setFloaties((h) => h.filter((x) => !batch.some((b) => b.id === x.id))), 1750);
    const el = layer.current;
    if (el) {
      const r = el.getBoundingClientRect();
      burst(el, 2, true, { x: r.width - 28, y: r.height * 0.62 });
    }
    const to = giftTo?.name.split(" ")[0];
    pushLine("Toi", to ? `envoie ${g.emoji} ${g.label.toLowerCase()} à ${to}` : `envoie ${g.emoji} ${g.label.toLowerCase()}`);
    paintLikes(likes.current + 8);
    toast(to ? `${g.emoji} ${g.label} pour ${to}` : `${g.emoji} ${g.label}`);
    giftsN.current += 1;
    setTray(null);
    setGiftTo(null);
  };

  const openGifts = (user?: User | null) => {
    setGiftTo(user ?? null);
    setTray("gifts");
    setAskOpen(false);
  };

  const sendAsk = () => {
    if (!cfg.questions) return;
    if (!askTo) {
      setPicking(true);
      setTray(null);
      toast("Tape quelqu’un à la table");
      return;
    }
    const v = qtext.trim();
    if (!v) return;
    const to = askTo;
    setQPending((all) => [...all, { id: uid("q"), from: "Toi", to, text: v }]);
    setQtext("");
    setTray(null);
    setAskTo(null);
    setPicking(false);
    toast("L’hôte doit l’accepter");
  };

  const acceptQ = (q: SpectatorQ) => {
    setQPending((all) => all.filter((x) => x.id !== q.id));
    setQQueue((all) => [...all, q]);
    const i = seatsRef.current.findIndex((s) => s.user?.id === q.to.id);
    if (i >= 0) setDieSeat(i);
    toast(`Le dé passe à ${q.to.name.split(" ")[0]}`);
    setAskOpen(false);
  };

  const refuseQ = (q: SpectatorQ) => {
    setQPending((all) => all.filter((x) => x.id !== q.id));
  };

  const closeSheet = () => {
    const el = sheetRef.current;
    if (el) el.style.transform = "";
    setAskOpen(false);
  };

  const onSheetDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, input")) return;
    drag.current = { on: true, start: e.clientX, x: 0 };
    sheetRef.current?.classList.add("is-drag");
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSheetMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    const dx = Math.max(0, e.clientX - drag.current.start);
    drag.current.x = dx;
    if (sheetRef.current) sheetRef.current.style.transform = `translate3d(${dx}px,0,0)`;
  };

  const onSheetUp = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    sheetRef.current?.classList.remove("is-drag");
    if (drag.current.x > 80) {
      closeSheet();
      return;
    }
    if (sheetRef.current) sheetRef.current.style.transform = "";
  };

  const pushLine = (name: string, body: string, kind: Line["kind"] = "chat") => {
    const id = uid("c");
    setTalk((c) => [...c.filter((x) => !x.out).slice(-8), { id, name, text: body, kind, at: Date.now() }]);
  };

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const sync = () => {
      const top = Math.max(0, Math.round(vv.offsetTop));
      const height = Math.round(vv.height);
      if (top < 2 && Math.abs(height - window.innerHeight) < 10) {
        setFrame(null);
        return;
      }
      setFrame({ top, height });
    };
    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, []);

  useEffect(() => {
    if (recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      setViewers((v) => Math.max(24, v + Math.floor(Math.random() * 7) - 2));
    }, 1600);
    return () => window.clearInterval(t);
  }, [recap]);
  const peak = useRef(86);
  useEffect(() => {
    if (ended.current) return;
    peak.current = Math.max(peak.current, viewers);
  }, [viewers]);
  useEffect(() => {
    if (recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [recap]);

  useEffect(() => {
    const next = qQueue[0];
    if (!next) return;
    const i = seats.findIndex((s) => s.user?.id === next.to.id);
    if (i >= 0) setDieSeat(i);
  }, [qQueue, seats]);

  useEffect(() => {
    if (recap) return;
    const t = window.setInterval(() => {
      if (ended.current) return;
      const el = layer.current;
      if (el) {
        const r = el.getBoundingClientRect();
        burst(el, 1, false, { x: r.width - 24 - Math.random() * 18, y: r.height * 0.6 });
      }
      if (Math.random() > 0.4) paintLikes(likes.current + 1);
    }, 1100);
    return () => window.clearInterval(t);
  }, [recap]);

  useEffect(() => {
    if (recap) return;
    const tick = window.setInterval(() => {
      if (ended.current) return;
      setTalk((c) => {
        if (!c.length) return c;
        const now = Date.now();
        const head = c[0]!;
        if (head.out) return c.slice(1);
        const life = head.kind === "join" ? 3400 : 8200;
        if (now - head.at >= life) return [{ ...head, out: true }, ...c.slice(1)];
        return c;
      });
    }, 600);
    return () => window.clearInterval(tick);
  }, [recap]);

  useEffect(() => {
    later(() => pushLine(JOINERS[0]!, "rejoint", "join"), 1600);
    later(() => {
      const u = WAITING[0];
      if (u) setAsks((a) => (a.some((x) => x.user.id === u.id) ? a : [...a, { id: uid("a"), user: u }]));
    }, 2600);
    later(() => pushLine(JOINERS[1]!, "rejoint", "join"), 4800);
    later(() => {
      const u = WAITING[1];
      if (u) setAsks((a) => (a.some((x) => x.user.id === u.id) ? a : [...a, { id: uid("a"), user: u }]));
    }, 6200);
    later(() => pushLine(JOINERS[2]!, "rejoint", "join"), 9000);
    if (cfg.questions) {
      later(() => {
        const q = SPECTATE_QS[0]!;
        const to = USERS[q.to];
        if (to) setQPending((all) => [...all, { id: uid("q"), from: q.from, to, text: q.text }]);
      }, 3200);
      later(() => {
        const q = SPECTATE_QS[1]!;
        const to = USERS[q.to];
        if (to) setQPending((all) => [...all, { id: uid("q"), from: q.from, to, text: q.text }]);
      }, 7800);
    }
    if (cfg.comments === "off") {
      return () => timers.current.forEach((id) => window.clearTimeout(id));
    }
    later(() => pushLine("Maya", "On écoute."), 2200);
    const chatter = window.setInterval(() => {
      const seated = seatsRef.current.filter((s) => s.user).map((s) => s.user!.name.split(" ")[0]!);
      const who = seated[Math.floor(Math.random() * seated.length)];
      if (!who || who === "Toi") return;
      pushLine(who, SPECTATE[Math.floor(Math.random() * SPECTATE.length)]!);
    }, 4800);
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      window.clearInterval(chatter);
      if (comboClear.current) window.clearTimeout(comboClear.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sitUser = (u: User) => {
    if (seatsRef.current.filter((s) => s.user).length >= places) return false;
    const i = seatsRef.current.findIndex((s) => !s.user);
    if (i < 0) return false;
    setSeats((all) => {
      if (all[i]?.user) return all;
      const copy = [...all];
      copy[i] = { user: u, muted: false, cam: false };
      return copy;
    });
    setFreshId(u.id);
    later(() => setFreshId(null), 420);
    return true;
  };

  const sit = (i: number) => {
    if (seats[i]?.user) return;
    if (seats.filter((s) => s.user).length >= places) {
      toast("La table est pleine");
      return;
    }
    const u = WAITING[waitI.current % WAITING.length];
    if (!u) return;
    waitI.current += 1;
    setSeats((all) => {
      if (all[i]?.user) return all;
      const copy = [...all];
      copy[i] = { user: u, muted: false, cam: false };
      return copy;
    });
    setFreshId(u.id);
    later(() => setFreshId(null), 420);
    pushLine(u.name.split(" ")[0]!, "rejoint la table", "join");
    toast(`${u.name.split(" ")[0]} monte`);
  };

  const acceptAsk = (ask: Ask) => {
    const ok = sitUser(ask.user);
    setAsks((a) => a.filter((x) => x.id !== ask.id));
    if (!ok) {
      toast("La table est pleine");
      return;
    }
    pushLine(ask.user.name.split(" ")[0]!, "rejoint la table", "join");
    setViewers((v) => v + 4);
    toast(`${ask.user.name.split(" ")[0]} monte`);
  };

  const refuseAsk = (ask: Ask) => {
    setAsks((a) => a.filter((x) => x.id !== ask.id));
  };

  const toggleMic = (i: number) => {
    setSeats((all) => {
      const s = all[i];
      if (!s?.user) return all;
      const copy = [...all];
      copy[i] = { ...s, muted: !s.muted };
      return copy;
    });
  };

  const toggleCam = (i: number) => {
    setSeats((all) => {
      const s = all[i];
      if (!s?.user) return all;
      const copy = [...all];
      copy[i] = { ...s, cam: !s.cam };
      return copy;
    });
  };

  const kickSeat = (i: number) => {
    const s = seats[i];
    if (!s?.user) return;
    const name = s.user.id === me.id || s.user.handle === "toi" ? "Toi" : s.user.name.split(" ")[0]!;
    if (s.user.id === me.id || s.user.handle === "toi") return;
    setSeats((all) => {
      const copy = [...all];
      copy[i] = { user: null, muted: true, cam: false };
      return copy;
    });
    pushLine(name, "descend de la table", "join");
    toast(`${name} descend`);
    setPick(null);
  };

  const roll = () => {
    if (busy) return;
    setBusy(true);
    const n = 1 + Math.floor(Math.random() * 6);
    const queued = qRef.current[0];
    const nextText = queued?.text ?? QUESTIONS[(n - 1 + spins.current) % QUESTIONS.length]!;
    const nextAsker = queued?.from ?? null;
    const nextTo = queued?.to ?? null;
    if (queued) setQQueue((all) => all.filter((x) => x.id !== queued.id));
    const rewind = flipped ? 200 : 0;
    if (flipped) {
      setMid(true);
      later(() => {
        setFlipped(false);
        setMid(false);
      }, 200);
    }
    later(() => {
      spins.current += 1;
      setRolling(true);
      later(() => setFace(n), 450);
    }, rewind);
    later(() => {
      setRolling(false);
      setMid(true);
      later(() => {
        setQuestion(nextText);
        setAsker(nextAsker);
        const toName = nextTo
          ? nextTo.id === me.id || nextTo.handle === "toi"
            ? "Toi"
            : nextTo.name.split(" ")[0]!
          : null;
        setAskedTo(toName);
        const answererId = nextTo?.id;
        let seatI = answererId ? seatsRef.current.findIndex((s) => s.user?.id === answererId) : -1;
        if (seatI < 0) {
          const answer = toName ?? "Toi";
          seatI = seatsRef.current.findIndex((s) => {
            if (!s.user) return false;
            const mine = s.user.id === me.id || s.user.handle === "toi";
            const label = mine ? "Toi" : s.user.name.split(" ")[0];
            return label === answer;
          });
        }
        setDieSeat(seatI >= 0 ? seatI : 0);
        setFlipped(true);
        setMid(false);
        const answer = toName ?? (() => {
          const seated = seatsRef.current.filter((s) => s.user);
          const pick = seated[spins.current % Math.max(1, seated.length)];
          const mine = pick?.user && (pick.user.id === me.id || pick.user.handle === "toi");
          return mine || !pick?.user ? "Toi" : pick.user.name.split(" ")[0]!;
        })();
        setSpeaker(answer);
        setBusy(false);
        later(() => pushLine(answer, "Je prends celle-là."), 500);
        if (nextAsker) later(() => pushLine(nextAsker, "j’écoute la réponse"), 1100);
      }, 200);
    }, rewind + 920);
  };

  const send = () => {
    const v = text.trim();
    if (!v) return;
    pushLine("Toi", v);
    setText("");
    setSpeaker("Toi");
  };

  if (recap && snap) {
    return (
      <LiveRecap
        stats={snap}
        onClose={() => {
          setTab("home");
          onBack();
        }}
      />
    );
  }

  return (
    <div
      className="relative overflow-hidden bg-bg"
      style={frame ? { position: "absolute", top: frame.top, height: frame.height, left: 0, right: 0 } : { height: "100%" }}
    >
      <div className="table-room-bg absolute inset-0" />
      <div
        className="absolute inset-0 z-[1] touch-manipulation"
        role="presentation"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          if (askOpen) {
            closeSheet();
            return;
          }
          if (pick) {
            setPick(null);
            return;
          }
          if (picking) {
            setPicking(false);
            return;
          }
          if (tray) {
            setTray(null);
            setGiftTo(null);
            setAskTo(null);
            return;
          }
          tap();
        }}
      />
      <div ref={layer} className="pointer-events-none absolute inset-0 z-[18] overflow-hidden" />

      <header className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))]">
        <button
          type="button"
          className="flex size-11 items-center justify-center"
          onClick={() => {
            ended.current = true;
            setSnap({
              kindLabel: "Zembo Table",
              title: cfg.title,
              cover: cfg.cover,
              viewers: peak.current,
              comments: talk.length,
              likes: likes.current,
              gifts: giftsN.current,
              premium: cfg.premium,
              ticketsSold: cfg.premium ? Math.max(1, Math.round(peak.current * 0.14)) : 0,
              ticketPrice: cfg.tickets,
              seconds,
            });
            setRecap(true);
          }}
          aria-label="Terminer"
        >
          <X className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-xs text-fg/80">
            <Heart className="size-3 fill-heart text-heart" />
            <span ref={likesEl} className="tabular-nums">
              {compact(likes.current)}
            </span>
            <span className="text-fg/50">tapotages</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-fg anim-live" />
          Live
        </span>
        <span className="flex items-center gap-1 rounded-full bg-bg/40 px-2 py-1 text-xs tabular-nums">
          <Users className="size-3.5" />
          {compact(viewers)}
        </span>
        <button
          type="button"
          onClick={() => setAskOpen((v) => !v)}
          aria-label="Demandes pour monter"
          className="relative flex size-11 items-center justify-center"
        >
          <Hand className="size-5" />
          {asks.length + qPending.length > 0 ? (
            <span className="anim-count absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-fg">
              {asks.length + qPending.length}
            </span>
          ) : null}
        </button>
      </header>

      <button
        type="button"
        className={cn("ask-veil absolute inset-0 z-40", askOpen && "is-open")}
        aria-label="Fermer les demandes"
        onClick={closeSheet}
      />
      <div
        ref={sheetRef}
        className={cn("ask-sheet absolute inset-y-0 right-0 z-40 flex flex-col bg-bg px-4", askOpen && "is-open")}
        onPointerDown={onSheetDown}
        onPointerMove={onSheetMove}
        onPointerUp={onSheetUp}
        onPointerCancel={onSheetUp}
      >
        <div className="mx-auto mt-[calc(0.4rem+env(safe-area-inset-top))] h-1 w-10 rounded-full bg-fg/20" />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium">Demandes</p>
          <button type="button" className="flex size-11 items-center justify-center" onClick={closeSheet} aria-label="Fermer">
            <X className="size-5" />
          </button>
        </div>
        <p className="text-xs text-muted">Glisse pour fermer. L’hôte accepte, sans lire la carte.</p>
        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <p className="text-[10px] uppercase tracking-wider text-muted">Monter</p>
          {asks.length === 0 ? <p className="mt-2 text-xs text-muted">Personne pour l’instant.</p> : null}
          {asks.map((a) => (
            <div key={a.id} className="ask-row flex items-center gap-2 py-2">
              {a.user.avatar ? (
                <img src={a.user.avatar} alt="" className="size-10 rounded-full object-cover" />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full bg-surface-2 text-xs">
                  {a.user.name.charAt(0)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{a.user.name.split(" ")[0]}</p>
                <p className="text-[11px] text-muted">Veut monter</p>
              </div>
              <button type="button" className="h-8 rounded-full bg-surface-2 px-3 text-xs transition-transform duration-150 ease-out active:scale-[0.96]" onClick={() => refuseAsk(a)}>
                Non
              </button>
              <button type="button" className="h-8 rounded-full bg-accent px-3 text-xs text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]" onClick={() => acceptAsk(a)}>
                Monter
              </button>
            </div>
          ))}
          {cfg.questions ? (
            <>
              <p className="mt-4 text-[10px] uppercase tracking-wider text-muted">Questions</p>
              {qPending.length === 0 ? <p className="mt-2 text-xs text-muted">Aucune question en attente.</p> : null}
              {qPending.map((q) => (
                <div key={q.id} className="ask-row flex items-center gap-2 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      {q.from} → {q.to.id === me.id || q.to.handle === "toi" ? "Toi" : q.to.name.split(" ")[0]}
                    </p>
                    <p className="text-[11px] text-muted">Pour {q.to.name.split(" ")[0]} · texte caché</p>
                  </div>
                  <button type="button" className="h-8 rounded-full bg-surface-2 px-3 text-xs transition-transform duration-150 ease-out active:scale-[0.96]" onClick={() => refuseQ(q)}>
                    Non
                  </button>
                  <button type="button" className="h-8 rounded-full bg-accent px-3 text-xs text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]" onClick={() => acceptQ(q)}>
                    Carte
                  </button>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(3.05rem+env(safe-area-inset-top))] bottom-[9rem] z-10">
        <div className="table-scene relative h-full w-full">
          <div className="table-world">
          <div className="poker-rail" data-wood={wood}>
            {CUPS.map((c, i) => (
              <span key={i} className="poker-cup" style={{ left: `${c.x}%`, top: `${c.y}%` }} />
            ))}
            <div className="poker-pad">
              <div className="poker-felt relative overflow-hidden">
                <FeltShader />
                <div className="pointer-events-none absolute inset-0 z-[3]">
                {cfg.title.trim() ? (
                  <p className="felt-title absolute left-1/2 top-[10%] w-[11.5rem] -translate-x-1/2 line-clamp-2 text-center font-display text-[15px] leading-snug tracking-tight">
                    {cfg.title.trim()}
                  </p>
                ) : null}
                <div className="absolute left-1/2 top-[32%] flex -translate-x-1/2 flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={roll}
                  disabled={busy}
                  aria-label="Lancer le dé"
                  className="die-spot is-park z-[12] pointer-events-auto active:scale-[0.96]"
                >
                  <Die face={face} rolling={rolling} />
                </button>
                <button type="button" onClick={roll} disabled={busy} aria-label="Retourner la carte" className="pointer-events-auto">
                  <div
                    className={cn(
                      "playing-card flex flex-col items-center justify-center px-2.5 text-center",
                      mid && "is-mid",
                      flipped ? "card-front" : "card-back",
                    )}
                  >
                    {flipped ? (
                      <div className="flex flex-col items-center gap-1 px-0.5">
                        {asker && askedTo ? (
                          <>
                            <span className="text-[9px] font-medium leading-tight uppercase tracking-wider text-accent-fg/55">
                              {asker} a posé une question pour
                            </span>
                            <span className="font-display text-[13px] tracking-tight">{askedTo}</span>
                          </>
                        ) : (
                          <span className="text-[9px] uppercase tracking-wider text-accent-fg/40">Table</span>
                        )}
                        <p className="line-clamp-4 font-display text-[11px] leading-snug tracking-tight">{question}</p>
                      </div>
                    ) : (
                      <>
                        <span className="font-display text-xl italic leading-none">Z</span>
                        <span className="mt-0.5 text-[8px] uppercase tracking-[0.22em] text-accent-fg/70">Table de</span>
                        <span className="mt-0.5 max-w-full truncate font-display text-[13px] leading-none tracking-tight">
                          {(me.name.trim() || "Toi").split(" ")[0]}
                        </span>
                        {cfg.questions && qQueue.length > 0 ? (
                          <span className="mt-1 text-[9px] text-accent-fg/50">{qQueue.length} sur la carte</span>
                        ) : null}
                      </>
                    )}
                  </div>
                </button>
                {flipped && !busy ? (
                  <span className="text-[10px] text-accent">
                    {speaker === "Toi" ? "À toi de répondre" : `${speaker} répond`}
                  </span>
                ) : null}
                </div>
              </div>
            </div>
            </div>

          {seats.map((seat, i) => {
            const pos = POS[i]!;
            const mine = !!seat.user && (seat.user.id === me.id || seat.user.handle === "toi");
            const speaking = !!seat.user && (seat.user.name.split(" ")[0] === speaker || (mine && speaker === "Toi"));
            return (
              <SeatNode
                key={i}
                seat={seat}
                x={pos.x}
                y={pos.y}
                speaking={speaking}
                picking={picking && !!seat.user}
                entering={!!seat.user && seat.user.id === freshId}
                onMic={() => toggleMic(i)}
                onSit={() => sit(i)}
                onAvatar={() => {
                  if (!seat.user) {
                    sit(i);
                    return;
                  }
                  if (picking && cfg.questions) {
                    setAskTo(seat.user);
                    setTray("ask");
                    setPicking(false);
                    setPick(null);
                    return;
                  }
                  setPick(seat.user);
                  setTray(null);
                }}
              />
            );
          })}
          </div>
          </div>
        </div>
      </div>

      {talk.length > 0 ? (
        <div className="table-chat pointer-events-none absolute bottom-[6.15rem] left-3 z-[15] flex max-h-[11.5rem] w-[52%] flex-col justify-end gap-1.5">
          {talk.slice(-8).map((m) =>
            m.kind === "join" ? (
              <p key={m.id} className={cn("live-join table-join", m.out && "is-out")}>
                <span className="font-medium">{m.name}</span> rejoint
              </p>
            ) : cfg.comments === "off" ? null : (
              <p key={m.id} className={cn("live-line table-line", m.out && "is-out")}>
                <span className="table-line-name">{m.name}</span>
                {m.text}
              </p>
            ),
          )}
        </div>
      ) : null}

      <p
        ref={comboEl}
        className="pointer-events-none absolute bottom-40 right-5 z-20 font-display text-3xl italic tabular-nums opacity-0"
      >
        x2
      </p>

      {floaties.map((h) => {
        const G = GIFTS.find((g) => g.id === h.kind);
        if (!G) return null;
        return (
          <span key={h.id} className="gift-float" style={{ right: h.x }}>
            {G.emoji}
          </span>
        );
      })}

      {pick ? (
        (() => {
          const i = seats.findIndex((s) => s.user && (s.user.id === pick.id || s.user.handle === pick.handle));
          const seated = i >= 0 ? seats[i] : null;
          const mine = pick.id === me.id || pick.handle === "toi";
          const name = mine ? "Toi" : pick.name.split(" ")[0]!;
          return (
            <div className="absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{name}</p>
                <button type="button" className="flex size-9 items-center justify-center" onClick={() => setPick(null)} aria-label="Fermer">
                  <X className="size-4" />
                </button>
              </div>
              {seated ? (
                <div className="mt-1 flex flex-col">
                  <button
                    type="button"
                    className="flex h-11 items-center gap-3 text-left text-sm transition-transform duration-150 ease-out active:scale-[0.98]"
                    onClick={() => {
                      toggleMic(i);
                    }}
                  >
                    {seated.muted ? <Mic className="size-4 text-accent" /> : <MicOff className="size-4 text-accent" />}
                    {seated.muted ? "Activer le micro" : "Couper le micro"}
                  </button>
                  <button
                    type="button"
                    className="flex h-11 items-center gap-3 text-left text-sm transition-transform duration-150 ease-out active:scale-[0.98]"
                    onClick={() => {
                      toggleCam(i);
                      if (!seated.cam) toast(`Caméra demandée à ${name}`);
                    }}
                  >
                    {seated.cam ? <VideoOff className="size-4 text-accent" /> : <Video className="size-4 text-accent" />}
                    {seated.cam ? "Couper la caméra" : "Demander la caméra"}
                  </button>
                  {!mine ? (
                    <button
                      type="button"
                      className="flex h-11 items-center gap-3 text-left text-sm text-heart transition-transform duration-150 ease-out active:scale-[0.98]"
                      onClick={() => kickSeat(i)}
                    >
                      <Ban className="size-4" />
                      Faire descendre
                    </button>
                  ) : null}
                </div>
              ) : null}
              <div className="mt-1 flex gap-2">
                {cfg.questions ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAskTo(pick);
                      setPick(null);
                      setTray("ask");
                      setPicking(false);
                    }}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface-2 text-sm transition-transform duration-150 ease-out active:scale-[0.96]"
                  >
                    <CircleHelp className="size-4 text-accent" />
                    Question
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    const u = pick;
                    setPick(null);
                    openGifts(u);
                  }}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface-2 text-sm transition-transform duration-150 ease-out active:scale-[0.96]"
                >
                  <Gift className="size-4 text-accent" />
                  Cadeau
                </button>
              </div>
            </div>
          );
        })()
      ) : null}

      {tray === "gifts" ? (
        <div className="absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-2 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]">
          <p className="mb-2 px-1 text-[11px] text-muted">
            {giftTo ? `Cadeau pour ${giftTo.name.split(" ")[0]}` : "Cadeau pour la table"}
          </p>
          <GiftGrid onPick={sendGift} />
        </div>
      ) : null}

      {tray === "ask" ? (
        cfg.questions ? (
          <form
            className="absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]"
            onSubmit={(e) => {
              e.preventDefault();
              sendAsk();
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-muted">
                {askTo
                  ? `Question pour ${askTo.id === me.id || askTo.handle === "toi" ? "toi" : askTo.name.split(" ")[0]}. L’hôte accepte, sans lire.`
                  : "Tape d’abord quelqu’un à la table."}
              </p>
              <button
                type="button"
                onClick={() => setAskOpen(true)}
                aria-label="Demandes pour monter"
                className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2"
              >
                <Hand className="size-4" />
                {asks.length > 0 ? (
                  <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-fg">
                    {asks.length}
                  </span>
                ) : null}
              </button>
            </div>
            <input
              value={qtext}
              onChange={(e) => setQtext(e.target.value)}
              onFocus={() => window.scrollTo(0, 0)}
              placeholder="Pose ta question"
              className="mt-2 h-11 w-full rounded-full bg-surface px-4 text-sm outline-none placeholder:text-fg/50"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-muted">{qPending.length} chez l’hôte</span>
              <button type="submit" className="h-8 rounded-full bg-accent px-3 text-xs text-accent-fg">
                Envoyer
              </button>
            </div>
          </form>
        ) : (
          <div className="absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]">
            <p className="text-sm font-medium">Questions fermées</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">Ce live n’accepte pas les questions.</p>
          </div>
        )
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {cfg.comments !== "off" ? (
          <form
            className="min-w-0 flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => window.scrollTo(0, 0)}
              placeholder="Dire quelque chose"
              className="h-11 w-full rounded-full bg-bg/55 px-4 text-sm outline-none placeholder:text-fg/50"
            />
          </form>
        ) : (
          <div className="min-w-0 flex-1" />
        )}
        <button
          type="button"
          onClick={() => {
            if (!cfg.questions) {
              setAskTo(null);
              setTray((t) => (t === "ask" ? null : "ask"));
              return;
            }
            if (tray === "ask") {
              setTray(null);
              setAskTo(null);
              setPicking(false);
              return;
            }
            setTray(null);
            setPicking(true);
            toast("Tape un avatar");
          }}
          aria-label="Poser une question"
          aria-pressed={tray === "ask"}
          className={cn(
            "relative flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-150 ease-out active:scale-[0.96]",
            tray === "ask" || picking ? "bg-accent text-accent-fg" : "bg-bg/55",
          )}
        >
          <CircleHelp className="size-5" />
          {cfg.questions && qPending.length + qQueue.length > 0 ? (
            <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-fg">
              {qPending.length + qQueue.length}
            </span>
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => (tray === "gifts" ? (setTray(null), setGiftTo(null)) : openGifts(giftTo))}
          aria-label="Cadeaux"
          aria-pressed={tray === "gifts"}
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-150 ease-out active:scale-[0.96]",
            tray === "gifts" ? "bg-accent text-accent-fg" : "bg-bg/55",
          )}
        >
          <Gift className="size-5" />
        </button>
      </div>
    </div>
  );
}

function SeatNode({
  seat,
  x,
  y,
  speaking,
  entering,
  picking,
  onMic,
  onSit,
  onAvatar,
}: {
  seat: Seat;
  x: number;
  y: number;
  speaking: boolean;
  entering: boolean;
  picking: boolean;
  onMic: () => void;
  onSit: () => void;
  onAvatar: () => void;
}) {
  const label = !seat.user
    ? ""
    : seat.user.id === "me" || seat.user.handle === "toi"
      ? "Toi"
      : seat.user.name.split(" ")[0]!;
  return (
    <div
      className={cn(
        "poker-seat relative absolute z-10 flex w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center",
        entering && "is-in",
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {seat.user ? (
        <>
          <span
            className={cn(
              "poker-avatar relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-surface-2 font-display text-accent",
              speaking && "is-speak",
              picking && "shadow-[0_0_0_3px_var(--color-accent)]",
              seat.muted && "opacity-55",
            )}
            role="button"
            tabIndex={0}
            onClick={onAvatar}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAvatar();
              }
            }}
            aria-label={seat.user ? `Cadeau pour ${label}` : "S’asseoir"}
          >
            {seat.user.avatar ? (
              <img src={seat.user.avatar} alt="" className="size-full object-cover" />
            ) : (
              <span className="text-lg">{label.charAt(0)}</span>
            )}
            {seat.cam ? <span className="absolute left-0.5 top-0.5 size-1.5 rounded-full bg-open" /> : null}
          </span>
          <button
            type="button"
            onClick={onMic}
            aria-label={seat.muted ? "Activer le micro" : "Couper le micro"}
            className={cn(
              "absolute right-0 top-8 flex size-5 items-center justify-center rounded-full",
              seat.muted ? "bg-surface-2 text-muted" : "bg-accent text-accent-fg",
            )}
          >
            {seat.muted ? <MicOff className="size-2.5" /> : <Mic className="size-2.5" />}
          </button>
          <p className={cn("mt-0.5 max-w-full truncate text-[10px]", speaking ? "text-accent" : "text-fg/80")}>{label}</p>
        </>
      ) : (
        <button type="button" onClick={onSit} className="flex flex-col items-center" aria-label="S’asseoir">
          <span className="flex size-12 items-center justify-center rounded-full bg-bg/50 shadow-[0_0_0_1px_rgb(242_238_230_/_0.16)]">
            <Plus className="size-5 text-accent" />
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-wider text-muted">Libre</span>
        </button>
      )}
    </div>
  );
}

function Die({ face, rolling }: { face: number; rolling: boolean }) {
  return (
    <span className={cn("die-iso", rolling && "is-roll")}>
      <span className="die-iso-top" aria-hidden />
      <span className="die-iso-side" aria-hidden />
      <span className="die-iso-front">
        {Array.from({ length: 9 }, (_, p) => (
          <span key={p} className={PIPS[face]?.includes(p) ? "die-pip" : undefined} />
        ))}
      </span>
    </span>
  );
}
