import { ArrowRight, CalendarDays, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useNav } from "@/components/nav";
import { HostSetup, LiveKinds, HostRoom, type LiveKind, type HostCfg } from "@/components/live-host";
import { PlayHub, QuizGame, HotSeatGame, PreferGame, type GameKind } from "@/components/play";
import { WorldRoom } from "@/components/rooms";
import { TableRoom, TableSetup, type TableCfg } from "@/components/table";
import { cn } from "@/lib/utils";
import { useSway } from "@/lib/store";
import type { Clip } from "@/lib/catalog";

type View =
  | { t: "root" }
  | { t: "lives" }
  | { t: "setup"; kind: LiveKind }
  | ({ t: "host"; kind: LiveKind } & HostCfg)
  | { t: "play" }
  | { t: "game"; game: GameKind }
  | { t: "table-setup"; draft?: TableCfg }
  | { t: "table"; cfg: TableCfg }
  | { t: "world" };

const TILES = [
  {
    id: "live",
    title: "Créer un live",
    line: "Lance un débat, une discussion ou ton émission en direct.",
    tags: ["Storytime", "Micro Ouvert", "Stand-Up"],
    img: "/create/live.jpg",
    ink: "bg-accent text-accent-fg",
    frame: "ring-accent/45",
    lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(212_196_168_/_0.16)]",
  },
  {
    id: "table",
    title: "Zembo Table",
    line: "Réunis 4 à 8 personnes autour d’une table interactive.",
    tags: ["Discussions", "Jeux", "Cartes"],
    img: "/create/table.jpg",
    ink: "bg-rail-hi text-fg",
    frame: "ring-rail-hi/70",
    lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(92_59_38_/_0.4)]",
  },
  {
    id: "play",
    title: "Play & Fun",
    line: "Lance un jeu et défie ta communauté.",
    tags: ["Quiz", "Hot Seat", "Tu préfères"],
    img: "/create/play.jpg",
    ink: "bg-live text-fg",
    frame: "ring-live/55",
    lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(196_92_74_/_0.28)]",
  },
  {
    id: "world",
    title: "World Room",
    line: "Le monde est à un Hello.",
    tags: ["Hello", "Face à Face", "60 s"],
    img: "/create/world.jpg",
    ink: "bg-fg text-accent-fg",
    frame: "ring-fg/25",
    lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(242_238_230_/_0.1)]",
  },
] as const;

export function Hub() {
  const { pop, toast } = useNav();
  const publish = useSway((s) => s.publish);
  const [view, setView] = useState<View>({ t: "root" });

  const postLive = (kind: NonNullable<Clip["liveKind"]>, title: string, cover: string, desc: string, tablePlaces?: 4 | 6 | 8) => {
    publish({
      src: "",
      poster: cover,
      caption: title,
      tags: [kind],
      soundId: "s-puddle",
      live: true,
      photo: true,
      viewers: 12,
      liveKind: kind,
      ...(kind === "table" ? { tablePlaces: tablePlaces ?? 8 } : {}),
    });
    toast(kind === "table" ? "Ta table est dans le flux" : "Ton live est dans le flux");
  };

  const back = () => {
    if (view.t === "root") pop();
    else if (view.t === "setup") setView({ t: "lives" });
    else if (view.t === "host") setView({ t: "setup", kind: view.kind });
    else if (view.t === "game") setView({ t: "play" });
    else if (view.t === "table") setView({ t: "table-setup", draft: view.cfg });
    else setView({ t: "root" });
  };

  const go = (id: (typeof TILES)[number]["id"]) => {
    if (id === "live") setView({ t: "lives" });
    else if (id === "play") setView({ t: "play" });
    else if (id === "table") setView({ t: "table-setup" });
    else setView({ t: "world" });
  };

  if (view.t === "root") {
    return (
      <div className="relative h-full">
        <button type="button" className="absolute inset-0 bg-bg/30" onClick={pop} aria-label="Fermer" />
        <div className="hub-drop hub-glass hub-panel absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-3xl pt-2">
          <span className="mx-auto h-1 w-10 shrink-0 rounded-full bg-fg/25" />
          <header className="flex shrink-0 items-center justify-between px-2">
            <button type="button" className="flex size-12 items-center justify-center" onClick={pop} aria-label="Fermer">
              <X className="size-5" />
            </button>
            <p className="font-display text-xl italic tracking-tight">Sway</p>
            <span className="size-12" />
          </header>
          <div className="hub-hero-wrap shrink-0 px-5 pb-3 pt-1">
            <p className="hub-hero font-display leading-[1.12] tracking-tight">
              Que veux-tu
              <br />
              <span className="text-accent">créer aujourd’hui ?</span>
            </p>
            <p className="hub-lede mt-2 text-sm text-muted">Partage, joue, débat, connecte-toi.</p>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2.5 overflow-hidden px-3">
            {TILES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                className={cn(
                  "hub-tile flex min-h-0 flex-col overflow-hidden rounded-2xl p-2 text-left ring-1",
                  "transition-[transform,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985]",
                  t.frame,
                  t.lift,
                )}
              >
                <span className="relative block min-h-0 flex-1 overflow-hidden rounded-xl">
                  <img src={t.img} alt="" className="size-full object-cover" />
                </span>
                <span className="flex shrink-0 flex-col px-1 pb-0.5 pt-2">
                  <span className="hub-card-title font-display leading-tight tracking-tight">{t.title}</span>
                  <span className="hub-line mt-1 line-clamp-2 text-xs leading-snug text-muted">{t.line}</span>
                  <span className="hub-tags mt-1.5 flex flex-wrap gap-1 overflow-hidden">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-bg/30 px-2 py-0.5 text-[10px] leading-none text-fg/85 ring-1 ring-fg/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className={cn("mt-2 ml-auto flex size-8 items-center justify-center rounded-full", t.ink)}>
                    <ArrowRight className="size-4" />
                  </span>
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => toast("Planifier un live — bientôt.")}
            className="mx-3 mt-2 mb-[max(0.75rem,env(safe-area-inset-bottom))] flex shrink-0 items-center gap-3 rounded-2xl bg-bg/30 px-3 py-2.5 text-left ring-1 ring-fg/12"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <CalendarDays className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-sm font-medium">
                Planifier un événement
                <span className="rounded-full px-1.5 py-0.5 text-[9px] text-muted ring-1 ring-fg/15">Bientôt</span>
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-muted">Programme un live pour plus tard</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted" />
          </button>
        </div>
      </div>
    );
  }

  if (view.t === "lives") {
    return (
      <div className="relative h-full">
        <button type="button" className="absolute inset-0 bg-bg/30" onClick={back} aria-label="Retour" />
        <div className="hub-drop hub-glass hub-panel absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-3xl pt-2">
          <span className="mx-auto h-1 w-10 shrink-0 rounded-full bg-fg/25" />
          <LiveKinds onBack={back} onPick={(kind) => setView({ t: "setup", kind })} />
        </div>
      </div>
    );
  }

  if (view.t === "setup") {
    return (
      <div className="h-full bg-bg">
        <HostSetup
          kind={view.kind}
          onBack={back}
          onLaunch={(cfg) => {
            postLive(view.kind, cfg.title, cfg.cover, cfg.desc);
            setView({ t: "host", kind: view.kind, ...cfg });
          }}
        />
      </div>
    );
  }

  if (view.t === "host") {
    return (
      <div className="h-full bg-bg">
        <HostRoom {...view} onLeave={pop} />
      </div>
    );
  }

  if (view.t === "play") {
    return (
      <div className="h-full bg-bg">
        <PlayHub onBack={back} onPick={(game) => setView({ t: "game", game })} />
      </div>
    );
  }

  if (view.t === "game") {
    const game =
      view.game === "quiz" ? (
        <QuizGame onBack={back} />
      ) : view.game === "hotseat" ? (
        <HotSeatGame onBack={back} />
      ) : (
        <PreferGame onBack={back} />
      );
    return <div className="h-full bg-bg">{game}</div>;
  }

  if (view.t === "table-setup") {
    return (
      <div className="h-full bg-bg">
        <TableSetup
          draft={view.draft}
          onBack={back}
          onLaunch={(cfg) => {
            postLive("table", cfg.title, cfg.cover, cfg.desc, cfg.places);
            setView({ t: "table", cfg });
          }}
        />
      </div>
    );
  }

  if (view.t === "table") {
    return (
      <div className="h-full bg-bg">
        <TableRoom cfg={view.cfg} onBack={back} />
      </div>
    );
  }
  return (
    <div className="h-full bg-bg">
      <WorldRoom onBack={back} />
    </div>
  );
}
