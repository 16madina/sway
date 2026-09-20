import { CLIPS, HASHTAGS, SOUNDS, clipsBySound, clipsByTag } from "@/lib/catalog";
import { useSway } from "@/lib/store";
import { ScreenHeader } from "@/components/ui";
import { ClipPager } from "@/components/feed";
import { useNav } from "@/components/nav";

export function SoundScreen({ soundId }: { soundId: string }) {
  const { pop, push } = useNav();
  const sound = SOUNDS[soundId];
  const myClips = useSway((s) => s.myClips);
  const clips = clipsBySound(soundId, myClips);

  return (
    <div className="flex h-full flex-col bg-bg">
      <ScreenHeader title="Son original" onBack={pop} />
      <div className="px-4 pb-4">
        <p className="font-display text-xl tracking-tight">{sound?.title ?? "Son"}</p>
        <p className="text-sm text-muted">{sound?.artist}</p>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-px overflow-y-auto bg-line pb-8">
        {clips.map((c) => (
          <button
            key={c.id}
            type="button"
            className="relative aspect-[3/4] bg-surface"
            onClick={() => push({ t: "viewer", clipId: c.id, ids: clips.map((x) => x.id) })}
          >
            <img src={c.poster} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function TagScreen({ tag }: { tag: string }) {
  const { pop, push } = useNav();
  const t = tag.replace(/^#/, "").toLowerCase();
  const myClips = useSway((s) => s.myClips);
  const clips =
    t === "tendance"
      ? [...myClips, ...CLIPS]
      : clipsByTag(t, myClips);
  const meta = HASHTAGS.find((h) => h.tag === t);

  return (
    <div className="flex h-full flex-col bg-bg">
      <ScreenHeader title={`#${t}`} onBack={pop} />
      <p className="px-4 pb-3 text-sm text-muted">{meta?.views ?? `${clips.length}`} vues</p>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-px overflow-y-auto bg-line pb-8">
        {clips.map((c) => (
          <button
            key={c.id}
            type="button"
            className="relative aspect-[3/4] bg-surface"
            onClick={() => push({ t: "viewer", clipId: c.id, ids: clips.map((x) => x.id) })}
          >
            <img src={c.poster} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ViewerScreen({ clipId, ids }: { clipId: string; ids: string[] }) {
  const { pop } = useNav();
  return (
    <div className="relative h-full bg-bg">
      <ClipPager ids={ids} startId={clipId} />
      <button
        type="button"
        onClick={pop}
        className="absolute left-2 top-[calc(0.5rem+env(safe-area-inset-top))] z-20 flex size-11 items-center justify-center text-fg"
        aria-label="Retour"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 5 L8 12 L15 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
