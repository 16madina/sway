import { useEffect, useRef, useState } from "react";
import { Crown, Flame, Flower2, Gem, Gift, Heart, Send, Smile, Star, Users } from "lucide-react";
import { CLIPS, USERS, userById } from "@/lib/catalog";
import { useSway } from "@/lib/store";
import { ScreenHeader } from "@/components/ui";
import { useNav } from "@/components/nav";
import { cn, compact } from "@/lib/utils";

export const GIFTS = [
  { id: "rose", label: "Rose", zems: 5, emoji: "🌹", Icon: Flower2, className: "text-heart" },
  { id: "tulipe", label: "Tulipe", zems: 8, emoji: "🌷", Icon: Flower2, className: "text-heart" },
  { id: "coeur", label: "Cœur", zems: 10, emoji: "❤️", Icon: Heart, className: "text-heart" },
  { id: "feu", label: "Feu", zems: 15, emoji: "🔥", Icon: Flame, className: "text-live" },
  { id: "clap", label: "Clap", zems: 20, emoji: "👏", Icon: Star, className: "text-accent" },
  { id: "etoile", label: "Étoile", zems: 25, emoji: "⭐", Icon: Star, className: "text-accent" },
  { id: "lion", label: "Lion", zems: 49, emoji: "🦁", Icon: Crown, className: "text-accent" },
  { id: "fusee", label: "Fusée", zems: 79, emoji: "🚀", Icon: Flame, className: "text-live" },
  { id: "couronne", label: "Couronne", zems: 99, emoji: "👑", Icon: Crown, className: "text-accent" },
  { id: "diamant", label: "Diamant", zems: 199, emoji: "💎", Icon: Gem, className: "text-accent" },
  { id: "chateau", label: "Château", zems: 299, emoji: "🏰", Icon: Crown, className: "text-accent" },
  { id: "planete", label: "Planète", zems: 499, emoji: "🪐", Icon: Gem, className: "text-accent" },
] as const;

export function GiftGrid({ onPick }: { onPick: (g: (typeof GIFTS)[number]) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {GIFTS.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => onPick(g)}
          className="flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-lg bg-surface-2 px-1 py-2 transition-transform duration-150 active:scale-[0.96]"
        >
          <span className="text-2xl">{g.emoji}</span>
          <span className="text-xs font-medium">{g.label}</span>
          <span className="text-[10px] tabular-nums text-muted">{g.zems} Zems</span>
        </button>
      ))}
    </div>
  );
}

export function GiftTray({ open, onPick, onClose }: { open: boolean; onPick: (g: (typeof GIFTS)[number]) => void; onClose: () => void }) {
  return (
    <>
      <button type="button" className={cn("ask-veil absolute inset-0 z-40", open && "is-open")} aria-label="Fermer" aria-hidden={!open} onClick={onClose} />
      <div
        className={cn("live-sheet is-gifts absolute inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-bg px-3", open && "is-open")}
        aria-hidden={!open}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-fg/20" />
        <p className="mt-2 text-sm font-medium">Cadeaux</p>
        <p className="text-[11px] text-muted">Les 4 premiers · glisse pour voir la suite</p>
        <div className="mt-2 grid max-h-[6.75rem] grid-cols-4 gap-1.5 overflow-y-auto pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {GIFTS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => onPick(g)}
              className="flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-xl bg-surface px-1 py-2 transition-transform duration-150 active:scale-[0.96]"
            >
              <span className="text-2xl leading-none">{g.emoji}</span>
              <span className="text-[10px] font-medium">{g.label}</span>
              <span className="text-[9px] tabular-nums text-muted">{g.zems}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

const HEART_NS = "http://www.w3.org/2000/svg";
const HEART_D =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";
const HEART_COLORS = ["#e25b4a", "#c45c4a", "#d4c4a8", "#f2eee6"];

export function burst(layer: HTMLElement | null, n: number, snappy: boolean, at?: { x: number; y: number }) {
  if (!layer) return;
  while (layer.childElementCount > 18) layer.firstElementChild?.remove();
  for (let i = 0; i < n; i++) {
    const svg = document.createElementNS(HEART_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", "anim-liveheart");
    const path = document.createElementNS(HEART_NS, "path");
    path.setAttribute("d", HEART_D);
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);
    const size = 18 + Math.random() * 14;
    const color = HEART_COLORS[(Math.random() * HEART_COLORS.length) | 0]!;
    const dur = snappy ? 820 + Math.random() * 220 : 1100 + Math.random() * 280;
    const delay = i * 40;
    const pos = at
      ? `left:${(at.x - size / 2 + (Math.random() * 18 - 9)).toFixed(0)}px;top:${(at.y - size / 2).toFixed(0)}px;`
      : `left:${((layer.clientWidth - size) / 2).toFixed(0)}px;top:${(layer.clientHeight * 0.4).toFixed(0)}px;`;
    svg.style.cssText = `position:absolute;${pos}width:${size}px;height:${size}px;pointer-events:none;color:${color};--heart-x:${(-36 + Math.random() * 72).toFixed(0)}px;--heart-r:${(-28 + Math.random() * 56).toFixed(0)}deg;--heart-dur:${dur.toFixed(0)}ms;animation-delay:${delay}ms`;
    layer.appendChild(svg);
    svg.addEventListener("animationend", () => svg.remove(), { once: true });
  }
}

type Floaty = { id: number; x: number; kind: (typeof GIFTS)[number]["id"] };

export function LiveRoom({ clipId }: { clipId: string }) {
  const { pop } = useNav();
  const clip = [...useSway.getState().myClips, ...CLIPS].find((c) => c.id === clipId);
  const me = useSway((s) => s.me);
  const accounts = useSway((s) => s.accounts);
  const user = clip ? userById(clip.userId, me, accounts) : undefined;
  const videoEl = useRef<HTMLVideoElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const likesEl = useRef<HTMLSpanElement>(null);
  const comboEl = useRef<HTMLParagraphElement>(null);
  const [viewers, setViewers] = useState((clip?.viewers ?? 1280) + 1);
  const likesRef = useRef(clip?.likes ?? 2400);
  const [floaties, setFloaties] = useState<Floaty[]>([]);
  const [text, setText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [tray, setTray] = useState<"gifts" | "qa" | "invite" | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [chat, setChat] = useState(
    clip
      ? [
          { id: "l1", name: "maya.clay", text: "la lumière est folle" },
          { id: "l2", name: "rina.ok", text: "j’y suis" },
        ]
      : [],
  );
  const [questions, setQuestions] = useState([
    { id: "q1", name: "jules.m", text: "C’est où, exactement ?" },
    { id: "q2", name: "solnavarro", text: "Tu restes encore longtemps ?" },
  ]);
  const [qtext, setQtext] = useState("");
  const timers = useRef<number[]>([]);
  const lastTap = useRef(0);
  const comboRef = useRef(0);
  const comboClear = useRef<number | null>(null);
  const trayRef = useRef<"gifts" | "qa" | "invite" | null>(null);
  trayRef.current = tray;

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const paintLikes = (n: number) => {
    likesRef.current = n;
    if (likesEl.current) likesEl.current.textContent = compact(n);
  };

  const paintCombo = (n: number) => {
    comboRef.current = n;
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
    burst(layer.current, 1, true);
    const now = performance.now();
    const next = now - lastTap.current < 900 ? comboRef.current + 1 : 1;
    lastTap.current = now;
    paintCombo(next);
    paintLikes(likesRef.current + 1);
    if (comboClear.current) window.clearTimeout(comboClear.current);
    comboClear.current = later(() => paintCombo(0), 900);
  };

  useEffect(() => {
    const t = window.setInterval(() => {
      setViewers((v) => Math.max(12, v + Math.floor(Math.random() * 13) - 5));
    }, 1100);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      burst(layer.current, 1, false);
      if (Math.random() > 0.35) paintLikes(likesRef.current + 1 + Math.floor(Math.random() * 2));
    }, 900);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const el = videoEl.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => {
      el.muted = true;
      void el.play().catch(() => {});
    });
  }, [clipId]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      if (comboClear.current) window.clearTimeout(comboClear.current);
    },
    [],
  );

  if (!clip || !user) {
    return (
      <div className="flex h-full flex-col bg-bg">
        <ScreenHeader title="Live" onBack={pop} />
      </div>
    );
  }

  const spawnGift = (kind: Floaty["kind"]) => {
    const id = Date.now() + Math.random();
    setFloaties((h) => [...h, { id, x: 8 + Math.random() * 36, kind }]);
    later(() => setFloaties((h) => h.filter((x) => x.id !== id)), 1200);
  };

  const sendGift = (g: (typeof GIFTS)[number]) => {
    spawnGift(g.id);
    burst(layer.current, 2, true);
    setChat((c) => [...c, { id: `g-${Date.now()}`, name: me.handle, text: `envoie ${g.label.toLowerCase()}` }]);
    setViewers((v) => v + 3);
    paintLikes(likesRef.current + 8);
    setTray(null);
  };

  const guest = guestId ? userById(guestId, me, accounts) : undefined;
  const guestClip = guestId ? CLIPS.find((c) => c.userId === guestId && c.src) : undefined;
  const pin = questions.find((q) => q.id === pinned);

  return (
    <div className="relative h-full bg-bg">
      <div className={cn("absolute inset-0", guest ? "flex" : "")}>
        <video
          ref={videoEl}
          src={clip.src}
          poster={clip.poster}
          className={guest ? "h-full w-1/2 object-cover" : "absolute inset-0 size-full object-cover"}
          autoPlay
          loop
          muted
          playsInline
        />
        {guest && guestClip ? (
          <video
            src={guestClip.src}
            poster={guestClip.poster}
            className="h-full w-1/2 object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : guest ? (
          <div className="flex h-full w-1/2 items-center justify-center bg-surface-2">
            <p className="text-sm text-muted">@{guest.handle}</p>
          </div>
        ) : null}
      </div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg/80 to-transparent" />

      <div
        className="absolute inset-0 z-[1] touch-manipulation"
        role="presentation"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          if (trayRef.current) {
            setTray(null);
            return;
          }
          tap();
        }}
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))]">
        <button type="button" className="flex size-11 items-center justify-center" onClick={pop} aria-label="Quitter">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 5 L8 12 L15 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img src={user.avatar} alt="" className="size-8 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="flex items-center gap-1 text-[11px] text-fg/80">
              <Heart className="size-3 fill-heart text-heart" />
              <span ref={likesEl} className="tabular-nums">
                {compact(likesRef.current)}
              </span>
              <span className="text-fg/50">tapotages</span>
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-fg anim-live" />
          Live
        </span>
        <span className="flex items-center gap-1 rounded-full bg-bg/40 px-2 py-1 text-xs tabular-nums">
          <Users className="size-3.5" />
          {viewers.toLocaleString("fr-FR")}
        </span>
      </div>

      {pin ? (
        <div className="absolute inset-x-3 top-[calc(4.5rem+env(safe-area-inset-top))] z-10 rounded-md bg-bg/55 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-accent">Question</p>
          <p className="text-sm leading-snug">
            <span className="font-medium">{pin.name}</span> {pin.text}
          </p>
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-24 left-3 right-4 z-10 flex flex-col gap-1.5">
        {chat.slice(-4).map((c) => (
          <p key={c.id} className="max-w-[80%] text-xs leading-snug text-fg">
            <span className="font-medium">{c.name}</span>{" "}
            <span className="text-fg/85">{c.text}</span>
          </p>
        ))}
      </div>

      <div ref={layer} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />

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

      <GiftTray open={tray === "gifts"} onPick={sendGift} onClose={() => setTray(null)} />

      {tray === "invite" ? (
        <div className="absolute inset-x-3 bottom-[7.5rem] z-10 max-h-40 overflow-y-auto rounded-lg bg-bg/80 p-2">
          {Object.values(USERS)
            .filter((u) => u.id !== clip.userId)
            .map((u) => (
              <button
                key={u.id}
                type="button"
                className="flex h-11 w-full items-center gap-2 rounded-md px-2 text-left text-sm"
                onClick={() => {
                  setGuestId(u.id);
                  setTray(null);
                  setChat((c) => [...c, { id: `j-${Date.now()}`, name: u.handle, text: "a rejoint le live" }]);
                  setViewers((v) => v + 40);
                }}
              >
                <img src={u.avatar} alt="" className="size-7 rounded-full object-cover" />
                @{u.handle}
              </button>
            ))}
        </div>
      ) : null}

      {tray === "qa" ? (
        <div className="absolute inset-x-3 bottom-[7.5rem] z-10 rounded-lg bg-bg/80 p-3">
          <p className="mb-2 text-xs font-medium">Q&A</p>
          <div className="flex max-h-28 flex-col gap-1.5 overflow-y-auto">
            {questions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setPinned(pinned === q.id ? null : q.id)}
                className={cn(
                  "rounded-md px-2 py-1.5 text-left text-xs",
                  pinned === q.id ? "bg-accent/20" : "bg-surface-2",
                )}
              >
                <span className="font-medium">{q.name}</span> {q.text}
              </button>
            ))}
          </div>
          <form
            className="mt-2 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const v = qtext.trim();
              if (!v) return;
              setQuestions((q) => [...q, { id: `q-${Date.now()}`, name: me.handle, text: v }]);
              setQtext("");
            }}
          >
            <input
              value={qtext}
              onChange={(e) => setQtext(e.target.value)}
              placeholder="Poser une question"
              className="h-9 flex-1 rounded-full bg-surface px-3 text-xs outline-none"
            />
            <button type="submit" className="text-xs font-medium text-accent">
              Envoyer
            </button>
          </form>
        </div>
      ) : null}

      <form
        className="absolute inset-x-0 bottom-0 z-10 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (!v) return;
          setChat((c) => [...c, { id: `l-${Date.now()}`, name: me.handle, text: v }]);
          setText("");
        }}
      >
        {emojiOpen ? (
          <div className="mb-2 flex flex-wrap gap-1.5 rounded-lg bg-bg/70 p-2">
            {["❤️", "🔥", "👏", "😂", "🙏", "✨"].map((e) => (
              <button key={e} type="button" onClick={() => setText((d) => d + e)} className="size-8 rounded-md bg-surface-2 text-sm">
                {e}
              </button>
            ))}
          </div>
        ) : null}
        <div className="flex items-center gap-1.5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Dire quelque chose"
            className="h-11 min-w-0 flex-1 rounded-full bg-bg/50 px-4 text-sm outline-none placeholder:text-fg/50"
          />
          <button
            type="button"
            onClick={() => setEmojiOpen((o) => !o)}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bg/50"
            aria-label="Réactions"
          >
            <Smile className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setTray(tray === "gifts" ? null : "gifts")}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bg/50"
            aria-label="Cadeau"
          >
            <Gift className="size-4 text-accent" />
          </button>
          <button type="submit" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg" aria-label="Envoyer">
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
