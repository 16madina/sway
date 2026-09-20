import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Blend,
  FlipHorizontal,
  Grid3x3,
  ImageIcon,
  Repeat2,
  Timer,
  Volume2,
  X,
} from "lucide-react";
import {
  SPEEDS,
  getFilter,
  userById,
  type DuoLayout,
  type FilterId,
  type Clip,
} from "@/lib/catalog";
import { getClip, useSway } from "@/lib/store";
import { Button } from "@/components/ui";
import { useNav } from "@/components/nav";
import { cn } from "@/lib/utils";
import { LIVE_AUDIO } from "@/lib/media";
import { FilterAmount, FilterRail, FilterStage, cycleFilter } from "@/components/fx";
import { DuoFrame, LayoutPicker, duoLabel } from "@/components/duo";

type Media = {
  url: string;
  poster: string;
  kind: "video" | "image";
  photos?: string[];
};

function mime() {
  const types = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
  return types.find((t) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) ?? "";
}

export function CreateStudio({ duoOf }: { duoOf?: string }) {
  const { pop, setTab, toast } = useNav();
  const publish = useSway((s) => s.publish);
  const me = useSway((s) => s.me);
  const fileRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [cam, setCam] = useState<"idle" | "on" | "off">("idle");
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [caption, setCaption] = useState("");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [timer, setTimer] = useState(0);
  const [fx, setFx] = useState<FilterId>("none");
  const [amt, setAmt] = useState(80);
  const [panel, setPanel] = useState<"speed" | "timer" | "fx" | "mix" | "layout" | null>(
    duoOf ? null : "fx",
  );
  const [layout, setLayout] = useState<DuoLayout>("split");
  const [swap, setSwap] = useState(false);
  const [duoStep, setDuoStep] = useState<"layout" | "studio">(duoOf ? "layout" : "studio");
  const [zoom, setZoom] = useState<1 | 2>(1);
  const [grid, setGrid] = useState(false);
  const [mix, setMix] = useState(70);
  const [sample, setSample] = useState("/posters/latte.jpg");
  const [focus, setFocus] = useState<{ x: number; y: number } | null>(null);
  const original = duoOf ? getClip(duoOf) : undefined;
  const origUser = original ? userById(original.userId, me) : undefined;
  const swipeX = useRef<number | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const origVideo = useRef<HTMLVideoElement>(null);

  const pickFx = (id: FilterId) => {
    setFx(id);
    if (id !== "none") setAmt((a) => (a < 20 ? 80 : a));
    const label = getFilter(id).label;
    setBanner(label);
    window.setTimeout(() => setBanner((b) => (b === label ? null : b)), 900);
  };

  useEffect(() => {
    void openCam("user");
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!stream) return;
    const video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    void video.play().catch(() => {});
    const canvas = document.createElement("canvas");
    const snap = () => {
      if (!video.videoWidth) return;
      canvas.width = 160;
      canvas.height = 160;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const side = Math.min(video.videoWidth, video.videoHeight);
      const sx = (video.videoWidth - side) / 2;
      const sy = (video.videoHeight - side) / 2;
      if (facing === "user") {
        ctx.translate(160, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, sx, sy, side, side, 0, 0, 160, 160);
      setSample(canvas.toDataURL("image/jpeg", 0.72));
    };
    const id = window.setInterval(snap, 1200);
    video.addEventListener("loadeddata", snap);
    return () => {
      window.clearInterval(id);
      video.srcObject = null;
    };
  }, [stream, facing]);

  useEffect(() => {
    if (!recording) return;
    const t = window.setInterval(() => {
      setElapsed((s) => {
        if (s >= 14) {
          stopRec();
          return 15;
        }
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [recording]);

  useEffect(() => {
    const el = origVideo.current;
    if (!el) return;
    el.volume = mix / 100;
    el.muted = mix === 0;
  }, [mix, duoStep]);

  const stopStream = () => {
    recRef.current?.stop();
    stream?.getTracks().forEach((t) => t.stop());
  };

  const openCam = async (side: "user" | "environment") => {
    try {
      stream?.getTracks().forEach((t) => t.stop());
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: side },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 24 },
        },
        audio: LIVE_AUDIO,
      });
      setStream(s);
      setFacing(side);
      setZoom(1);
      setCam("on");
    } catch {
      setCam("off");
      setStream(null);
    }
  };

  const startRec = () => {
    if (!stream || recording) return;
    const type = mime();
    let rec: MediaRecorder;
    try {
      rec = type ? new MediaRecorder(stream, { mimeType: type }) : new MediaRecorder(stream);
    } catch {
      toast("Enregistrement indisponible. Importe un clip.");
      return;
    }
    chunks.current = [];
    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.current.push(e.data);
    };
    rec.onstop = () => {
      const blob = new Blob(chunks.current, { type: rec.mimeType || "video/webm" });
      const url = URL.createObjectURL(blob);
      setMedia({ url, poster: url, kind: "video" });
      setRecording(false);
    };
    recRef.current = rec;
    rec.start(200);
    setElapsed(0);
    setRecording(true);
    const ov = origVideo.current;
    if (ov && mix > 0) {
      ov.muted = false;
      ov.volume = mix / 100;
      void ov.play().catch(() => {});
    }
  };

  const stopRec = () => {
    if (recRef.current && recRef.current.state !== "inactive") recRef.current.stop();
    setRecording(false);
  };

  const armed = () => {
    if (timer <= 0) {
      startRec();
      return;
    }
    setCount(timer);
    let n = timer;
    const tick = window.setInterval(() => {
      n -= 1;
      if (n <= 0) {
        window.clearInterval(tick);
        setCount(null);
        startRec();
      } else {
        setCount(n);
      }
    }, 1000);
  };

  const onFiles = (files: File[]) => {
    if (!files.length) return;
    const images = files.filter((f) => f.type.startsWith("image"));
    const videos = files.filter((f) => f.type.startsWith("video"));
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    if (videos[0]) {
      const url = URL.createObjectURL(videos[0]);
      setMedia({ url, poster: url, kind: "video" });
      return;
    }
    if (images.length > 1) {
      const urls = images.map((f) => URL.createObjectURL(f));
      setMedia({ url: urls[0]!, poster: urls[0]!, kind: "image", photos: urls });
      return;
    }
    if (images[0]) {
      const url = URL.createObjectURL(images[0]);
      setMedia({ url, poster: url, kind: "image" });
    }
  };

  const post = () => {
    if (!media) return;
    const tags = Array.from(caption.matchAll(/#(\p{L}+)/gu)).map((m) => m[1]!.toLowerCase());
    const payload: Omit<Clip, "id" | "userId" | "createdAt" | "likes" | "comments" | "saves" | "shares"> = {
      src: media.kind === "video" ? media.url : "",
      poster: media.poster,
      caption: caption.trim() || (duoOf ? "Duo" : "Nouveau clip"),
      tags: tags.length ? tags : duoOf ? ["duo"] : ["sway"],
      soundId: original?.soundId ?? "s-steam",
      photo: media.kind === "image",
      photos: media.photos,
      duoOf,
      duoLayout: duoOf ? layout : undefined,
      duoSwap: duoOf ? swap : undefined,
      filter: fx === "none" ? undefined : fx,
      filterAmt: fx === "none" ? undefined : amt,
      speed: speed === 1 ? undefined : speed,
    };
    publish(payload);
    toast("Publié dans ton profil");
    pop();
    setTab("profile");
  };

  if (media) {
    return (
      <div className="flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
        <header className="flex items-center justify-between px-3">
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            onClick={() => setMedia(null)}
            aria-label="Retour"
          >
            <X className="size-5" />
          </button>
          <p className="font-medium">{duoOf ? "Duo" : media.photos ? "Carrousel" : "Nouveau clip"}</p>
          <span className="size-11" />
        </header>
        <div className="relative mx-4 mt-2 aspect-[9/16] max-h-[38vh] overflow-hidden rounded-lg bg-surface">
          <Preview
            media={media}
            original={original}
            fx={fx}
            amt={amt}
            speed={speed}
            layout={layout}
            swap={swap}
            origName={origUser ? `@${origUser.handle}` : "Original"}
          />
        </div>
        <div className="pt-3">
          <FilterRail value={fx} onChange={pickFx} sample={media.poster} />
        </div>
        {fx !== "none" ? (
          <div className="pt-2">
            <FilterAmount value={amt} onChange={setAmt} />
          </div>
        ) : null}
        <div className="flex-1 px-4 pt-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Une légende, des #hashtags…"
            rows={3}
            className="w-full resize-none rounded-md bg-surface p-3 text-sm outline-none placeholder:text-subtle shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)]"
          />
          <p className="mt-3 text-xs text-muted">
            {duoOf ? `${duoLabel(layout)} · ` : null}
            {fx !== "none" ? `${getFilter(fx).label} ${amt}% · ` : null}
            {speed !== 1 ? `${speed.toString().replace(".", ",")}× · ` : null}
            Visible par tout le monde
          </p>
        </div>
        <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <Button size="lg" onClick={post}>
            Publier
          </Button>
        </div>
      </div>
    );
  }

  if (original && duoStep === "layout") {
    return (
      <div className="relative flex h-full flex-col bg-bg">
        <video
          src={original.src}
          poster={original.poster}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-bg/55" />
        <header className="relative z-10 flex items-center justify-between px-3 pt-[env(safe-area-inset-top)]">
          <button type="button" className="flex size-11 items-center justify-center" onClick={pop} aria-label="Fermer">
            <X className="size-5" />
          </button>
          <p className="font-display text-lg italic tracking-tight">Duo</p>
          <span className="size-11" />
        </header>
        <div className="relative z-10 mt-auto px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <p className="font-display text-2xl tracking-tight">
            Avec {origUser ? `@${origUser.handle}` : "ce clip"}
          </p>
          <p className="mt-1 text-sm text-muted">Choisis comment vous apparaissez ensemble.</p>
          <div className="mt-5">
            <LayoutPicker value={layout} onChange={setLayout} poster={original.poster} />
          </div>
          <p className="mt-3 text-center text-xs text-muted">{duoLabel(layout)}</p>
          <Button size="lg" className="mt-4" onClick={() => setDuoStep("studio")}>
            Continuer
          </Button>
        </div>
      </div>
    );
  }

  const camera = (
    <CameraFeed
      stream={stream}
      facing={facing}
      ready={cam === "on"}
      zoom={zoom}
      fit={original ? "cover" : "contain"}
    />
  );

  return (
    <div className="relative flex h-full flex-col bg-bg">
      {original ? (
        <DuoFrame
          layout={layout}
          swap={swap}
          className="absolute inset-0"
          originalName={origUser ? `@${origUser.handle}` : "Original"}
          selfName="Toi"
          original={
            <video
              ref={origVideo}
              src={original.src}
              poster={original.poster}
              className="absolute inset-0 size-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          }
          self={
            <FilterStage id={fx} amount={amt} className="absolute inset-0">
              {camera}
              {cam !== "on" ? <div className="absolute inset-0 bg-surface-2" /> : null}
            </FilterStage>
          }
        />
      ) : (
        <FilterStage id={fx} amount={amt} className="absolute inset-0">
          {camera}
          {cam !== "on" ? <div className="absolute inset-0 bg-surface-2" /> : null}
        </FilterStage>
      )}

      {grid ? <GridOverlay /> : null}

      <div
        className="absolute inset-0 z-[1]"
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current == null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) >= 48) {
            pickFx(cycleFilter(fx, dx < 0 ? 1 : -1));
            setPanel("fx");
            return;
          }
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setFocus({ x, y });
          window.setTimeout(() => setFocus(null), 700);
        }}
      />

      {focus ? (
        <span
          className="pointer-events-none absolute z-20 size-14 rounded-sm shadow-[0_0_0_1px_rgb(242_238_230_/_0.85)] cam-focus"
          style={{ left: focus.x - 28, top: focus.y - 28 }}
        />
      ) : null}

      {banner ? (
        <p className="pointer-events-none absolute inset-x-0 top-[42%] z-20 text-center font-display text-3xl tracking-tight anim-fxname">
          {banner}
        </p>
      ) : null}

      <header className="relative z-10 flex items-center justify-between px-3 pt-[env(safe-area-inset-top)]">
        <button type="button" className="flex size-11 items-center justify-center" onClick={pop} aria-label="Fermer">
          <X className="size-5" />
        </button>
        <p className="font-display text-lg italic tracking-tight">{duoOf ? "Duo" : "Sway"}</p>
        <div className="flex">
          {duoOf ? (
            <button
              type="button"
              className="flex size-11 items-center justify-center"
              aria-label="Inverser"
              onClick={() => setSwap((s) => !s)}
            >
              <Repeat2 className="size-5" />
            </button>
          ) : null}
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label="Retourner la caméra"
            onClick={() => void openCam(facing === "user" ? "environment" : "user")}
          >
            <FlipHorizontal className="size-5" />
          </button>
        </div>
      </header>

      {count !== null ? (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span className="font-display text-7xl tabular-nums text-fg">{count}</span>
        </div>
      ) : null}

      {recording ? (
        <div className="absolute left-3 top-[calc(3.2rem+env(safe-area-inset-top))] z-10 flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-xs font-medium tabular-nums">
          <span className="size-1.5 rounded-full bg-fg anim-rec" />
          0:{String(elapsed).padStart(2, "0")}
        </div>
      ) : null}

      <div className="relative z-10 mt-4 flex flex-col items-end gap-3 pr-3">
        <Tool label="Vitesse" onClick={() => setPanel(panel === "speed" ? null : "speed")}>
          <span className="text-[11px] font-medium">{speed.toString().replace(".", ",")}×</span>
        </Tool>
        <Tool label={timer ? `${timer} s` : "Timer"} onClick={() => setPanel(panel === "timer" ? null : "timer")}>
          <Timer className="size-5" />
        </Tool>
        <Tool label={fx === "none" ? "FX" : getFilter(fx).label} onClick={() => setPanel(panel === "fx" ? null : "fx")}>
          <Blend className="size-5" />
        </Tool>
        {duoOf ? (
          <Tool label="Son" onClick={() => setPanel(panel === "mix" ? null : "mix")}>
            <Volume2 className="size-5" />
          </Tool>
        ) : null}
        {duoOf ? (
          <Tool label="Cadre" onClick={() => setPanel(panel === "layout" ? null : "layout")}>
            <span className="text-[9px] font-medium">Duo</span>
          </Tool>
        ) : null}
        <Tool label="Grille" onClick={() => setGrid((g) => !g)}>
          <Grid3x3 className={cn("size-5", grid && "text-accent")} />
        </Tool>
      </div>

      {panel === "speed" || panel === "timer" ? (
        <div className="relative z-10 mt-3 flex justify-end pr-3">
          <div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">
            {panel === "speed"
              ? SPEEDS.map((s) => (
                  <Chip key={s} active={speed === s} onClick={() => setSpeed(s)}>
                    {s.toString().replace(".", ",")}×
                  </Chip>
                ))
              : null}
            {panel === "timer"
              ? [0, 3, 10].map((n) => (
                  <Chip key={n} active={timer === n} onClick={() => setTimer(n)}>
                    {n === 0 ? "Off" : `${n} s`}
                  </Chip>
                ))
              : null}
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mt-auto flex flex-col items-center gap-4 pb-[calc(1.75rem+env(safe-area-inset-bottom))]">
        {cam === "off" ? (
          <p className="px-8 text-center text-sm text-muted">
            Caméra bloquée. Autorise-la, ou importe depuis la galerie.
          </p>
        ) : null}

        {panel === "layout" && original ? (
          <div className="w-full px-4">
            <LayoutPicker value={layout} onChange={setLayout} poster={original.poster} />
          </div>
        ) : null}

        {panel === "mix" ? (
          <div className="flex w-full items-center gap-3 px-5">
            <span className="text-[11px] text-muted">Original</span>
            <input
              type="range"
              min={0}
              max={100}
              value={mix}
              aria-label="Volume de l’original"
              onChange={(e) => setMix(Number(e.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-fg/20 accent-accent"
            />
            <span className="w-8 text-right text-[11px] tabular-nums text-muted">{mix}</span>
          </div>
        ) : null}

        {panel === "fx" ? (
          <div className="w-full">
            <FilterRail value={fx} onChange={pickFx} sample={sample} />
            {fx !== "none" ? (
              <div className="mt-3">
                <FilterAmount value={amt} onChange={setAmt} />
              </div>
            ) : (
              <p className="mt-2 px-4 text-center text-[11px] text-muted">Glisse pour changer de look</p>
            )}
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          {([1, 2] as const).map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => setZoom(z)}
              className={cn(
                "h-8 min-w-8 rounded-full px-2.5 text-[11px] font-medium tabular-nums",
                zoom === z ? "bg-fg text-bg" : "bg-bg/50 text-fg",
              )}
            >
              {z}×
            </button>
          ))}
        </div>

        <div className="flex items-center gap-10">
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[11px] text-muted"
            onClick={() => fileRef.current?.click()}
          >
            <span className="flex size-11 items-center justify-center rounded-md bg-surface-2">
              <ImageIcon className="size-5 text-fg" />
            </span>
            Galerie
          </button>
          <button
            type="button"
            aria-label={recording ? "Arrêter" : "Enregistrer"}
            onClick={() => (recording ? stopRec() : armed())}
            disabled={cam !== "on" && !recording}
            className="flex size-20 items-center justify-center rounded-full bg-fg/15 disabled:opacity-40"
          >
            <span
              className={cn(
                "rounded-full shadow-[0_0_0_3px_rgb(8_8_10)] transition-[border-radius,width,height] duration-150",
                recording ? "size-8 rounded-xs bg-live" : "size-16 bg-accent",
              )}
            />
          </button>
          <span className="w-11" />
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="video/*,image/*"
        multiple
        className="hidden"
        onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
      />
    </div>
  );
}

function CameraFeed({
  stream,
  facing,
  ready,
  zoom,
  fit,
}: {
  stream: MediaStream | null;
  facing: "user" | "environment";
  ready: boolean;
  zoom: 1 | 2;
  fit: "contain" | "cover";
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [frame, setFrame] = useState(false);

  useEffect(() => {
    setFrame(false);
    const el = video.current;
    if (!el) return;
    el.srcObject = stream;
    if (!stream) return;
    const show = () => setFrame(true);
    el.addEventListener("loadeddata", show);
    void el.play().catch(() => {});
    return () => {
      el.removeEventListener("loadeddata", show);
      el.srcObject = null;
    };
  }, [stream]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      <video
        ref={video}
        muted
        playsInline
        autoPlay
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-300 ease-out",
          fit === "cover" ? "object-cover" : "object-contain",
          frame && ready ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `${facing === "user" ? "scaleX(-1) " : ""}scale(${zoom})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}

function GridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <span className="absolute inset-y-0 left-1/3 w-px bg-fg/25" />
      <span className="absolute inset-y-0 left-2/3 w-px bg-fg/25" />
      <span className="absolute inset-x-0 top-1/3 h-px bg-fg/25" />
      <span className="absolute inset-x-0 top-2/3 h-px bg-fg/25" />
    </div>
  );
}

function Preview({
  media,
  original,
  fx,
  amt,
  speed,
  layout,
  swap,
  origName,
}: {
  media: Media;
  original?: Clip;
  fx: FilterId;
  amt: number;
  speed: number;
  layout: DuoLayout;
  swap: boolean;
  origName: string;
}) {
  const self =
    media.kind === "video" ? (
      <video
        src={media.url}
        className="absolute inset-0 size-full object-contain"
        loop
        muted
        autoPlay
        playsInline
        ref={(el) => {
          if (el) el.playbackRate = speed;
        }}
      />
    ) : (
      <img src={media.poster} alt="" className="absolute inset-0 size-full object-cover" />
    );

  if (original && media.kind === "video") {
    return (
      <DuoFrame
        layout={layout}
        swap={swap}
        className="size-full"
        originalName={origName}
        selfName="Toi"
        original={
          <video
            src={original.src}
            poster={original.poster}
            className="absolute inset-0 size-full object-cover"
            loop
            muted
            autoPlay
            playsInline
          />
        }
        self={
          <FilterStage id={fx} amount={amt} className="absolute inset-0">
            {self}
          </FilterStage>
        }
      />
    );
  }
  if (media.photos?.length) {
    return (
      <FilterStage id={fx} amount={amt} className="size-full">
        <div className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory">
          {media.photos.map((src) => (
            <img key={src} src={src} alt="" className="h-full w-full shrink-0 snap-center object-cover" />
          ))}
        </div>
      </FilterStage>
    );
  }
  return (
    <FilterStage id={fx} amount={amt} className="size-full">
      {self}
    </FilterStage>
  );
}

function Tool({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1 text-[10px] text-fg">
      <span className="flex size-11 items-center justify-center rounded-full bg-bg/40">{children}</span>
      {label}
    </button>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-full px-3 text-xs font-medium",
        active ? "bg-fg text-bg" : "bg-bg/50 text-fg",
      )}
    >
      {children}
    </button>
  );
}
