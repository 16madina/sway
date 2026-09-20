import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CLIPS, type Clip } from "@/lib/catalog";
import { useSway } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ClipCard } from "@/components/clip";
import { useNav } from "@/components/nav";

export function ClipPager({
  ids,
  startId,
  header,
}: {
  ids: string[];
  startId?: string;
  header?: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(startId ?? ids[0] ?? "");
  const myClips = useSway((s) => s.myClips);
  const hidden = useSway((s) => s.hidden);
  const clips = useMemo(() => {
    const all = [...myClips, ...CLIPS];
    const map = new Map(all.map((c) => [c.id, c]));
    return ids
      .map((id) => map.get(id))
      .filter((c): c is Clip => c !== undefined && !hidden.includes(c.id));
  }, [ids, myClips, hidden]);

  useEffect(() => {
    const scroller = root.current;
    if (!scroller) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (top?.target as HTMLElement | undefined)?.dataset.clip;
        if (id) setActive(id);
      },
      { root: scroller, threshold: [0.55, 0.75] },
    );
    const nodes = scroller.querySelectorAll("[data-clip]");
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [clips]);

  useEffect(() => {
    if (!startId || !root.current) return;
    const el = root.current.querySelector(`[data-clip="${startId}"]`);
    el?.scrollIntoView({ block: "start" });
    setActive(startId);
  }, [startId]);

  const activeIndex = clips.findIndex((c) => c && c.id === active);

  return (
    <div className="absolute inset-0 bg-bg">
      <div
        ref={root}
        className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-none"
      >
        {clips.map((clip, i) => (
            <section
              key={clip.id}
              data-clip={clip.id}
              className="relative h-full w-full snap-start snap-always"
            >
              <ClipCard
                clip={clip}
                active={clip.id === active}
                load={Math.abs(i - Math.max(0, activeIndex)) <= 1}
              />
            </section>
        ))}
        <section className="flex h-full snap-start flex-col items-center justify-center gap-3 bg-bg px-8 text-center">
          <p className="font-display text-2xl tracking-tight">Tu es à jour</p>
          <p className="text-sm text-muted">Reviens en haut pour relancer le flux.</p>
          <button
            type="button"
            className="mt-2 h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
            onClick={() => root.current?.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Reprendre
          </button>
        </section>
      </div>
      {header}
    </div>
  );
}

export function HomeFeed() {
  const { feed, setFeed, setTab } = useNav();
  const followed = useSway((s) => s.followed);
  const myClips = useSway((s) => s.myClips);
  const ids =
    feed === "following"
      ? [...myClips, ...CLIPS].filter((c) => followed.includes(c.userId)).map((c) => c.id)
      : feed === "live"
        ? [...myClips, ...CLIPS].filter((c) => c.live).map((c) => c.id)
        : [...myClips, ...CLIPS].map((c) => c.id);

  const header = (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-end justify-center pt-[calc(0.75rem+env(safe-area-inset-top))]">
          <div className="pointer-events-auto flex items-center gap-5">
            <TabLabel active={feed === "following"} onClick={() => setFeed("following")}>
              Suivis
            </TabLabel>
            <TabLabel active={feed === "fyp"} onClick={() => setFeed("fyp")}>
              Flux
            </TabLabel>
            <TabLabel active={feed === "live"} onClick={() => setFeed("live")}>
              Live
            </TabLabel>
          </div>
          <button
            type="button"
            className="pointer-events-auto absolute right-3 top-[calc(0.6rem+env(safe-area-inset-top))] flex size-11 items-center justify-center text-fg"
            aria-label="Rechercher"
            onClick={() => setTab("discover")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16 L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
  );

  if (feed === "following" && ids.length === 0) {
    return (
      <div className="absolute inset-0 bg-bg">
        {header}
        <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
          <p className="font-display text-2xl tracking-tight">Personne ici</p>
          <p className="text-sm text-muted">Suis des comptes depuis le flux pour les retrouver ici.</p>
        </div>
      </div>
    );
  }

  if (feed === "live" && ids.length === 0) {
    return (
      <div className="absolute inset-0 bg-bg">
        {header}
        <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
          <p className="font-display text-2xl tracking-tight">Aucun live</p>
          <p className="text-sm text-muted">Reviens plus tard, ou ouvre le flux.</p>
        </div>
      </div>
    );
  }

  return <ClipPager ids={ids} header={header} />;
}

function TabLabel({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative pb-1 text-[15px] font-medium tracking-tight",
        active ? "text-fg" : "text-fg/55",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-fg transition-opacity duration-150",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
}
