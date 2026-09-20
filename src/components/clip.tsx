import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Bookmark, Check, Heart, MessageCircle, Plus, Share2, Volume2, VolumeX } from "lucide-react";
import { SOUNDS, getFilter, userById, LIVE_LABEL, type Clip } from "@/lib/catalog";
import { getClip, useSway } from "@/lib/store";
import { compact, cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { useNav } from "@/components/nav";
import { FilterStage } from "@/components/fx";
import { DuoFrame } from "@/components/duo";

type Burst = { id: number; x: number; y: number };

export function ClipCard({
  clip,
  active,
  load,
}: {
  clip: Clip;
  active: boolean;
  load: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const { push } = useNav();
  const muted = useSway((s) => s.muted);
  const liked = useSway((s) => s.liked.includes(clip.id));
  const saved = useSway((s) => s.saved.includes(clip.id));
  const me = useSway((s) => s.me);
  const followed = useSway((s) => s.followed.includes(clip.userId) || clip.userId === s.me.id);
  const like = useSway((s) => s.like);
  const save = useSway((s) => s.save);
  const follow = useSway((s) => s.follow);
  const setMuted = useSway((s) => s.setMuted);
  const extra = useSway((s) => s.extraComments[clip.id]?.length ?? 0);
  const accounts = useSway((s) => s.accounts);
  const user = userById(clip.userId, me, accounts);
  const sound = SOUNDS[clip.soundId];
  const duo = clip.duoOf ? getClip(clip.duoOf) : undefined;
  const slides = clip.photos?.length ? clip.photos : clip.photo ? [clip.poster] : null;
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const lastTap = useRef(0);
  const [viewers, setViewers] = useState(clip.viewers ?? 0);
  const [slide, setSlide] = useState(0);
  const duoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.playbackRate = clip.speed ?? 1;
    if (active && !paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
    const other = duoRef.current;
    if (other) {
      if (active && !paused) other.play().catch(() => {});
      else other.pause();
    }
  }, [active, paused, load, clip.speed]);

  useEffect(() => {
    if (!active) setPaused(false);
  }, [active]);

  useEffect(() => {
    if (!clip.live || !active) return;
    const t = window.setInterval(() => {
      setViewers((v) => Math.max(12, v + Math.floor(Math.random() * 13) - 5));
    }, 1100);
    return () => window.clearInterval(t);
  }, [clip.live, active]);

  const heartAt = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x, y }]);
    window.setTimeout(() => setBursts((b) => b.filter((item) => item.id !== id)), 700);
    if (!liked) like(clip.id);
  };

  const onTap = (e: MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const rect = e.currentTarget.getBoundingClientRect();
    if (now - lastTap.current < 280) {
      if (!clip.live) heartAt(e.clientX - rect.left, e.clientY - rect.top);
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;
    window.setTimeout(() => {
      if (lastTap.current !== now) return;
      if (clip.live) {
        push({ t: "live", clipId: clip.id });
        return;
      }
      if (clip.photo) return;
      setPaused((p) => !p);
    }, 280);
  };

  if (!user) return null;

  return (
    <article className="relative h-full w-full bg-bg text-fg">
      {slides ? (
        <FilterStage id={clip.filter} amount={clip.filterAmt} className="absolute inset-0">
        <div
          className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
          onClick={onTap}
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
            setSlide(i);
          }}
        >
          {slides.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-full w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>
        </FilterStage>
      ) : duo && load && clip.src && !failed ? (
        <DuoFrame
          layout={clip.duoLayout ?? "split"}
          swap={clip.duoSwap}
          className="absolute inset-0"
          originalName=""
          selfName=""
          original={
            <video
              ref={duoRef}
              src={duo.src}
              poster={duo.poster}
              loop
              muted={muted}
              playsInline
              className="absolute inset-0 size-full object-cover"
            />
          }
          self={
            <FilterStage id={clip.filter} amount={clip.filterAmt} className="absolute inset-0">
              <video
                ref={video}
                src={clip.src}
                poster={clip.poster}
                loop
                muted={muted}
                playsInline
                className="absolute inset-0 size-full object-cover"
                onError={() => setFailed(true)}
                onTimeUpdate={(e) => {
                  const el = e.currentTarget;
                  if (el.duration) setProgress(el.currentTime / el.duration);
                }}
              />
            </FilterStage>
          }
        />
      ) : load && clip.src && !failed ? (
        <FilterStage id={clip.filter} amount={clip.filterAmt} className="absolute inset-0">
        <video
          ref={video}
          src={clip.src}
          poster={clip.poster}
          loop
          muted={clip.live ? true : muted}
          playsInline
          preload={active ? "auto" : "metadata"}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (el.duration) setProgress(el.currentTime / el.duration);
          }}
        />
        </FilterStage>
      ) : (
        <FilterStage id={clip.filter} amount={clip.filterAmt} className="absolute inset-0">
        <img
          src={clip.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        </FilterStage>
      )}

      {slides && slides.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 top-[calc(3.4rem+env(safe-area-inset-top))] z-[1] flex justify-center gap-1">
          {slides.map((src, i) => (
            <span
              key={src}
              className={cn("h-0.5 rounded-full", i === slide ? "w-5 bg-fg" : "w-3 bg-fg/35")}
            />
          ))}
        </div>
      ) : null}

      {duo ? (
        <span className="pointer-events-none absolute left-3 top-[calc(3.4rem+env(safe-area-inset-top))] z-[1] rounded-xs bg-bg/50 px-2 py-0.5 text-[11px] font-medium">
          Duo
        </span>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent" />

      {slides ? null : <div className="absolute inset-0" onClick={onTap} />}

      {paused && active && !clip.live && !clip.photo ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-bg/40 text-fg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      ) : null}

      {bursts.map((b) => (
        <Heart
          key={b.id}
          className="pointer-events-none absolute size-16 fill-fg text-fg anim-pop"
          style={{ left: b.x - 32, top: b.y - 32 }}
        />
      ))}

      {clip.live ? (
        <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 pb-20">
          <span className="inline-flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-fg">
            <span className="size-1.5 rounded-full bg-fg anim-live" />
            Live
          </span>
          {clip.liveKind ? (
            <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-fg/80">{LIVE_LABEL[clip.liveKind]}</p>
          ) : null}
          <p className="mt-3 text-center text-sm font-medium tracking-tight">
            {clip.caption}
          </p>
          <p className="mt-1 text-xs tabular-nums text-fg/70">
            {viewers.toLocaleString("fr-FR")} spectateurs
          </p>
          <button
            type="button"
            className="pointer-events-auto mt-4 h-11 rounded-full bg-live px-5 text-sm font-medium text-fg"
            onClick={() => push({ t: "live", clipId: clip.id })}
          >
            Rejoindre le live
          </button>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-3 pb-[calc(4.75rem+env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto min-w-0 flex-1 pb-1">
          {clip.live ? (
            <div className="mb-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => push({ t: "user", userId: clip.userId })}
                className="flex min-w-0 items-center gap-2"
              >
                <Avatar user={user} size="sm" className="size-8 rounded-full" />
                <span className="truncate text-base font-medium tracking-tight">@{user.handle}</span>
              </button>
              {clip.userId !== "me" && !followed ? (
                <button
                  type="button"
                  onClick={() => follow(clip.userId)}
                  className="h-7 shrink-0 rounded-full bg-fg px-2.5 text-xs font-medium text-bg"
                >
                  Suivre
                </button>
              ) : null}
            </div>
          ) : clip.photo ? (
            <span className="mb-2 inline-flex rounded-xs bg-fg/15 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-fg">
              Photo
            </span>
          ) : null}
          {clip.live ? null : (
          <button
            type="button"
            onClick={() => push({ t: "user", userId: clip.userId })}
            className="block text-left text-base font-medium tracking-tight"
          >
            @{user.handle}
          </button>
          )}
          <p className="mt-1 max-w-[16rem] text-sm leading-snug text-fg/90">
            {clip.caption}{" "}
            {clip.live
              ? null
              : clip.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="font-medium text-accent"
                onClick={() => push({ t: "tag", tag })}
              >
                #{tag}{" "}
              </button>
            ))}
          </p>
          {clip.filter && clip.filter !== "none" && !clip.live ? (
            <p className="mt-1 text-[11px] text-fg/65">
              {getFilter(clip.filter).label}
              {clip.filterAmt != null && clip.filterAmt < 100 ? ` · ${clip.filterAmt}%` : ""}
            </p>
          ) : null}
          {sound && !clip.live ? (
            <button
              type="button"
              onClick={() => push({ t: "sound", soundId: sound.id })}
              className="mt-2 flex max-w-[16rem] items-center gap-2 text-xs text-fg/80"
            >
              <span className="truncate">
                {sound.title} · {sound.artist}
              </span>
            </button>
          ) : null}
        </div>

        {clip.live ? null : (
        <div className="pointer-events-auto flex flex-col items-center gap-4 pb-1">
          <button
            type="button"
            className="relative"
            onClick={() => push({ t: "user", userId: clip.userId })}
            aria-label={user.name}
          >
            <Avatar
              user={user}
              size="md"
              className="size-12 rounded-full shadow-[0_0_0_1px_rgb(242_238_230_/_0.2)]"
            />
            {clip.userId !== "me" ? (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  follow(clip.userId);
                }}
                className={cn(
                  "absolute -bottom-1.5 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full",
                  followed ? "bg-surface-2 text-fg" : "bg-accent text-accent-fg",
                )}
                aria-label={followed ? "Abonné" : "Suivre"}
              >
                {followed ? (
                  <Check className="size-3" strokeWidth={2.6} />
                ) : (
                  <Plus className="size-3" strokeWidth={2.5} />
                )}
              </span>
            ) : null}
          </button>

          <Action
            label={compact(clip.likes + (liked ? 1 : 0))}
            onClick={() => like(clip.id)}
            ariaLabel="Aimer"
          >
            <Heart className={cn("size-7", liked && "fill-heart text-heart")} />
          </Action>
          <Action
            label={compact(clip.comments + extra)}
            onClick={() => push({ t: "comments", clipId: clip.id })}
            ariaLabel="Commentaires"
          >
            <MessageCircle className="size-7" />
          </Action>
          <Action
            label={compact(clip.saves + (saved ? 1 : 0))}
            onClick={() => save(clip.id)}
            ariaLabel="Enregistrer"
          >
            <Bookmark className={cn("size-7", saved && "fill-accent text-accent")} />
          </Action>
          <Action
            label="Partager"
            onClick={() => push({ t: "share", clipId: clip.id })}
            ariaLabel="Partager"
          >
            <Share2 className="size-7" />
          </Action>

          <button
            type="button"
            onClick={() => sound && push({ t: "sound", soundId: sound.id })}
            className="mt-1"
            aria-label="Son original"
          >
            <span
              className={cn(
                "block size-10 overflow-hidden rounded-full shadow-[0_0_0_1px_rgb(242_238_230_/_0.2)]",
                active && !paused ? "animate-spin" : "",
              )}
              style={{ animationDuration: "4s" }}
            >
              <img src={clip.poster} alt="" className="size-full object-cover" />
            </span>
          </button>
        </div>
        )}
      </div>

      {clip.live || clip.photo ? null : (
      <button
        type="button"
        onClick={() => setMuted(!muted)}
        className="absolute right-3 top-[calc(3.5rem+env(safe-area-inset-top))] flex size-11 items-center justify-center rounded-full bg-bg/40 text-fg"
        aria-label={muted ? "Activer le son" : "Couper le son"}
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>
      )}

      {clip.live || clip.photo ? null : (
      <div className="absolute inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] h-0.5 bg-fg/15">
        <div className="h-full bg-fg/80" style={{ width: `${progress * 100}%` }} />
      </div>
      )}
    </article>
  );
}

function Action({
  label,
  onClick,
  children,
  ariaLabel,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-0.5"
      aria-label={ariaLabel}
    >
      {children}
      <span className="text-xs font-medium tabular-nums">{label}</span>
    </button>
  );
}
