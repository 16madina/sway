import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Brain, CircleHelp, Flame, Sparkles, Users, X } from "lucide-react";
import { Button } from "@/components/ui";
import { useNav } from "@/components/nav";
import { cn } from "@/lib/utils";

export type GameKind = "quiz" | "hotseat" | "prefer";

const GAMES = [
  { id: "quiz" as const, title: "Zembo Quiz", line: "Culture, chrono, dernier survivant.", players: "4 – 10", badge: "Compétition", icon: Brain },
  { id: "hotseat" as const, title: "Hot Seat", line: "Un micro ouvert. La salle vote.", players: "4 – 10", badge: "Interactif", icon: Flame },
  { id: "prefer" as const, title: "Tu préfères ?", line: "Deux choix. La salle vote avec toi.", players: "4 – 10", badge: "Discussion", icon: Sparkles },
];

const QUIZ = [
  { q: "Quelle ville est la métropole ?", a: ["Québec", "Montréal", "Ottawa"], g: 1 },
  { q: "Le latte art se fait surtout avec ?", a: ["L’eau", "Le lait", "Le sucre"], g: 1 },
  { q: "Un slam, c’est d’abord ?", a: ["Une performance parlée", "Un plat", "Un sport"], g: 0 },
  { q: "Le Plateau, c’est à ?", a: ["Longueuil", "Montréal", "Laval"], g: 1 },
  { q: "Le levain, on le trouve dans ?", a: ["Le pain", "Le café", "Le slam"], g: 0 },
];

const HOTQ = [
  "Quel est ton plus grand luxe, vraiment ?",
  "Tu trahirais un secret pour 10 000 $ ?",
  "Tu quitterais tout demain ?",
  "Qui ici te fait le plus peur ?",
  "Tu pardonnes trop vite ?",
  "Tu dirais non à qui, ce soir ?",
  "Qu’est-ce que tu caches encore ?",
];

const PREFER = [
  ["Un message de trop", "Un silence de trop"],
  ["Tout dire", "Tout taire"],
  ["Perdre la mémoire", "Perdre le goût"],
  ["Être en avance", "Arriver pile"],
  ["Un secret", "Un mensonge"],
  ["Le premier café", "Le dernier verre"],
  ["Une scène vide", "Une salle pleine"],
  ["Savoir", "Deviner"],
];

export function PlayHub({ onBack, onPick }: { onBack: () => void; onPick: (id: GameKind) => void }) {
  const { toast } = useNav();
  return (
    <div className="flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center gap-2 px-3">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onBack} aria-label="Retour">
          <X className="size-5" />
        </button>
        <p className="flex-1 text-center text-sm font-medium">Play & Fun</p>
        <button type="button" className="flex size-11 items-center justify-center" aria-label="Aide" onClick={() => toast("Choisis un jeu. Ta communauté joue avec toi.")}>
          <CircleHelp className="size-5 text-muted" />
        </button>
      </header>
      <div className="px-5 pb-3 pt-1">
        <p className="font-display text-2xl tracking-tight">
          Play <span className="text-accent">& Fun</span>
        </p>
        <p className="mt-1 text-xs text-muted">Choisis ton jeu et lance la partie.</p>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2.5 overflow-y-auto px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        {GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onPick(g.id)}
            className="flex min-h-[11.5rem] flex-col rounded-2xl bg-surface p-3 text-left shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)] transition-transform duration-150 active:scale-[0.985]"
          >
            <span className="flex items-start justify-between gap-2">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <g.icon className="size-5" />
              </span>
              <span className="rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-accent ring-1 ring-accent/40">{g.badge}</span>
            </span>
            <span className="mt-auto pt-3">
              <span className="block font-display text-lg leading-tight tracking-tight">{g.title}</span>
              <span className="mt-1 block text-xs leading-snug text-muted">{g.line}</span>
              <span className="mt-2 flex items-center gap-1.5 text-[11px] text-accent">
                <Users className="size-3.5" />
                {g.players} joueurs
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuizGame({ onBack }: { onBack: () => void }) {
  const names = ["toi", "Maya", "Noah", "Luca"];
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [left, setLeft] = useState(10);
  const [score, setScore] = useState<Record<string, number>>({ toi: 0, Maya: 0, Noah: 0, Luca: 0 });
  const [out, setOut] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const q = QUIZ[i]!;
  const locked = useRef(false);
  useEffect(() => {
    locked.current = false;
    if (done) return;
    const t = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          settle(null);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [i, done]);
  const settle = (n: number | null) => {
    if (locked.current) return;
    locked.current = true;
    const you = n;
    setPick(you ?? -1);
    setScore((s) => ({
      toi: s.toi + (you === q.g ? 1 : 0),
      Maya: s.Maya + (out.includes("Maya") ? 0 : Math.random() > 0.45 ? 1 : 0),
      Noah: s.Noah + (out.includes("Noah") ? 0 : Math.random() > 0.5 ? 1 : 0),
      Luca: s.Luca + (out.includes("Luca") ? 0 : Math.random() > 0.55 ? 1 : 0),
    }));
    window.setTimeout(() => {
      if (i === 2)
        setScore((s) => {
          const alive = names.filter((n) => !out.includes(n));
          const drop = [...alive].sort((a, b) => (s[a] ?? 0) - (s[b] ?? 0))[0];
          if (drop && alive.length > 2) {
            setOut((o) => [...o, drop]);
            setNote(`${drop === "toi" ? "Tu es" : drop + " est"} éliminé·e.`);
          }
          return s;
        });
      if (i >= QUIZ.length - 1) setDone(true);
      else {
        setI((x) => x + 1);
        setPick(null);
        setLeft(10);
        setNote(null);
      }
    }, 1100);
  };
  const ranking = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const youOut = out.includes("toi");
  return (
    <GameShell title="Zembo Quiz" onBack={onBack}>
      {done ? (
        <Finish
          title={`${ranking[0]![0] === "toi" ? "Toi" : ranking[0]![0]} gagne`}
          line={ranking.map(([n, v]) => `${n} ${v} pts`).join(" · ")}
          onBack={onBack}
          onAgain={() => {
            setI(0);
            setPick(null);
            setLeft(10);
            setScore({ toi: 0, Maya: 0, Noah: 0, Luca: 0 });
            setOut([]);
            setDone(false);
            setNote(null);
          }}
        />
      ) : (
        <>
          <div className="flex gap-1.5">
            {names.map((n) => (
              <span key={n} className={cn("flex-1 rounded-md py-1.5 text-center text-[10px] tabular-nums", out.includes(n) ? "bg-surface-2 text-subtle line-through" : "bg-surface-2 text-fg")}>
                {n} {score[n]}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs tabular-nums text-muted">
            {i + 1} / {QUIZ.length} · {left} s
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight">{q.q}</p>
          {note ? <p className="mt-2 text-sm text-accent">{note}</p> : null}
          <div className="mt-6 flex flex-col gap-2">
            {q.a.map((opt, n) => (
              <button
                key={opt}
                type="button"
                disabled={pick !== null || youOut}
                onClick={() => settle(n)}
                className={cn("h-12 rounded-md px-4 text-left text-sm", pick === null ? "bg-surface-2" : n === q.g ? "bg-accent text-accent-fg" : n === pick ? "bg-live/40" : "bg-surface-2 opacity-50")}
              >
                {["A", "B", "C"][n]} · {opt}
              </button>
            ))}
          </div>
          {youOut ? <p className="mt-auto pt-6 text-center text-sm text-muted">Éliminé. Tu regardes la suite.</p> : null}
        </>
      )}
    </GameShell>
  );
}

export function HotSeatGame({ onBack }: { onBack: () => void }) {
  const seats = useMemo(() => ["Maya", "Noah", "Luca", "Toi", "Inès", "Sol", "Jules"], []);
  const [turn, setTurn] = useState(0);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [joker, setJoker] = useState(true);
  const [log, setLog] = useState("La partie commence. Micros coupés, sauf le hot seat.");
  const [done, setDone] = useState(false);
  const who = seats[turn % seats.length]!;
  const q = HOTQ[turn % HOTQ.length]!;
  const you = who === "Toi";
  const others = seats.filter((s) => s !== who);
  const left = others.slice(0, 3);
  const right = others.slice(3);
  const winner = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  const next = (msg: string) => {
    setLog(msg);
    window.setTimeout(() => {
      if (turn >= seats.length - 1) setDone(true);
      else setTurn((t) => t + 1);
    }, 700);
  };
  return (
    <GameShell title="Hot Seat" onBack={onBack}>
      {done ? (
        <Finish
          title={`${winner?.[0] ?? "Toi"} l’emporte`}
          line={`${winner?.[1] ?? 0} réactions. La salle a voté.`}
          onBack={onBack}
          onAgain={() => {
            setTurn(0);
            setVotes({});
            setJoker(true);
            setLog("La partie commence.");
            setDone(false);
          }}
        />
      ) : (
        <>
          <div className="flex min-h-0 flex-1 items-center gap-2">
            <div className="flex flex-1 flex-col gap-2">
              {left.map((s) => (
                <Seat key={s} name={s} />
              ))}
            </div>
            <div className="flex w-[38%] flex-col items-center">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-accent">Hot seat</p>
              <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-accent text-accent-fg">
                <span className="font-display text-2xl">{who}</span>
              </div>
              <p className="mt-2 text-xs text-muted">Micro ouvert</p>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {right.map((s) => (
                <Seat key={s} name={s} />
              ))}
            </div>
          </div>
          <p className="mt-4 text-center font-display text-xl tracking-tight">{q}</p>
          <p className="mt-2 text-center text-xs text-muted">{log}</p>
          <div className="mt-4 flex flex-col gap-2">
            {you ? (
              <Button
                onClick={() => {
                  setVotes((v) => ({ ...v, Toi: (v.Toi ?? 0) + 2 }));
                  next("Tu as répondu. La salle vote.");
                }}
              >
                Répondre
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setVotes((v) => ({ ...v, [who]: (v[who] ?? 0) + 1 }));
                  next(`Tu votes pour ${who}.`);
                }}
              >
                Réaction · voter
              </Button>
            )}
            {joker ? (
              <Button
                variant="line"
                onClick={() => {
                  setJoker(false);
                  next("Joker. La question saute.");
                }}
              >
                Utiliser mon joker
              </Button>
            ) : null}
          </div>
        </>
      )}
    </GameShell>
  );
}

function Seat({ name }: { name: string }) {
  return (
    <div className="flex h-14 items-center justify-center rounded-md bg-surface-2 text-xs text-muted">
      {name}
      <span className="sr-only"> micro coupé</span>
    </div>
  );
}

export function PreferGame({ onBack }: { onBack: () => void }) {
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const q = PREFER[i]!;
  const pick = (n: number) => {
    if (seen !== null) return;
    setSeen(n);
    window.setTimeout(() => {
      if (i >= PREFER.length - 1) setDone(true);
      else {
        setI((x) => x + 1);
        setSeen(null);
      }
    }, 900);
  };
  const leftPct = 42 + ((i * 7) % 31);
  return (
    <GameShell title="Tu préfères ?" onBack={onBack}>
      {done ? (
        <Finish
          title="C’est tout"
          line="La salle a voté avec toi."
          onBack={onBack}
          onAgain={() => {
            setI(0);
            setSeen(null);
            setDone(false);
          }}
        />
      ) : (
        <>
          <p className="text-xs text-muted">
            {i + 1} / {PREFER.length}
          </p>
          <div className="mt-6 flex flex-1 flex-col gap-3">
            {q.map((opt, n) => (
              <button
                key={opt}
                type="button"
                onClick={() => pick(n)}
                className={cn("flex flex-1 flex-col items-center justify-center rounded-xl px-4 text-center font-display text-2xl", seen === n ? "bg-accent text-accent-fg" : "bg-surface")}
              >
                {opt}
                {seen !== null ? <span className="mt-2 font-sans text-sm tabular-nums opacity-80">{n === 0 ? leftPct : 100 - leftPct} %</span> : null}
              </button>
            ))}
          </div>
        </>
      )}
    </GameShell>
  );
}

function GameShell({ title, onBack, children }: { title: string; onBack: () => void; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center gap-2 px-3">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onBack} aria-label="Retour">
          <X className="size-5" />
        </button>
        <p className="flex-1 text-center text-sm font-medium">{title}</p>
        <span className="size-11" />
      </header>
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">{children}</div>
    </div>
  );
}

function Finish({ title, line, onBack, onAgain }: { title: string; line: string; onBack: () => void; onAgain: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="font-display text-3xl tracking-tight">{title}</p>
      <p className="mt-2 text-sm text-muted">{line}</p>
      <Button className="mt-8" onClick={onAgain}>
        Rejouer
      </Button>
      <button type="button" className="mt-3 text-sm text-muted" onClick={onBack}>
        Autres jeux
      </button>
    </div>
  );
}