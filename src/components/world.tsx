import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Clock,
  Eye,
  Globe,
  ImagePlus,
  Images,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  Mic,
  Pencil,
  Plane,
  Send,
  Settings2,
  Sparkles,
  Users,
  Video,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useNav } from "@/components/nav";
import { FaceDuel, type FaceMode } from "@/components/world-face";
import { useWorld, type WorldMeet } from "@/lib/world-store";
import {
  COUNTRIES,
  EMPTY_PROFILE,
  INTENTS,
  LANGS,
  ORIENTATIONS,
  PHOTO_POOL,
  TAKEN,
  WORLD_CARDS,
  cardById,
  flagOf,
  intentLabel,
  intentMark,
  validHandle,
  type WorldCard,
  type WorldProfile,
} from "@/lib/world";
import { cn } from "@/lib/utils";

const buzz = () => {
  try {
    navigator.vibrate(8);
  } catch {
    /* ignore */
  }
};

type Tab = "discover" | "hellos" | "face" | "inbox" | "me";
type Overlay =
  | { t: "none" }
  | { t: "celebrate"; card: WorldCard }
  | { t: "meet"; card?: WorldCard; mode?: FaceMode }
  | { t: "decide"; card: WorldCard }
  | { t: "wait"; card: WorldCard }
  | { t: "linked"; card: WorldCard }
  | { t: "done"; card: WorldCard }
  | { t: "thread"; id: string };

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "text-lg" : "text-3xl";
  return (
    <p className={cn("font-display tracking-tight text-accent", cls)}>
      W
      <span className="relative inline-block px-0.5">
        O
        <Globe className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-accent" />
      </span>
      RLD ROOM
    </p>
  );
}

export function WorldRoom({ onBack }: { onBack: () => void }) {
  const profile = useWorld((s) => s.profile);
  const saveProfile = useWorld((s) => s.saveProfile);
  const seedPending = useWorld((s) => s.seedPending);
  const seedMutual = useWorld((s) => s.seedMutual);
  const [hydrated, setHydrated] = useState(() => useWorld.persist.hasHydrated());
  const [intro, setIntro] = useState(!profile?.completed);
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState<WorldProfile>(profile ?? EMPTY_PROFILE());
  const [step, setStep] = useState(1);

  useEffect(() => {
    const done = () => {
      setHydrated(true);
      const p = useWorld.getState().profile;
      setDraft(p ?? EMPTY_PROFILE());
      setIntro(!p?.completed);
    };
    if (useWorld.persist.hasHydrated()) done();
    return useWorld.persist.onFinishHydration(done);
  }, []);

  const startEdit = (at = 1) => {
    setDraft(useWorld.getState().profile ?? EMPTY_PROFILE());
    setStep(at);
    setIntro(false);
    setEdit(true);
  };

  if (!hydrated) return <div className="h-full bg-bg" />;

  if (!profile?.completed || edit) {
    if (intro && !edit) return <Intro onBack={onBack} onStart={() => setIntro(false)} />;
    return (
      <Onboard
        draft={draft}
        step={step}
        setStep={setStep}
        setDraft={setDraft}
        onBack={() => {
          if (edit) setEdit(false);
          else setIntro(true);
        }}
        onDone={() => {
          saveProfile(draft);
          if (!profile?.completed) {
            seedPending(["w-moussa", "w-lea"]);
            seedMutual(["w-sofia"]);
          }
          setEdit(false);
          setIntro(false);
          buzz();
        }}
      />
    );
  }
  return <WorldApp onBack={onBack} onEdit={startEdit} />;
}

function Intro({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-bg pt-[env(safe-area-inset-top)]">
      <img src="/posters/sunrise.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
      <header className="relative z-10 flex items-center px-2">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onBack} aria-label="Fermer">
          <X className="size-5" />
        </button>
      </header>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <Logo />
        <p className="mt-2 font-display text-xl italic tracking-tight text-accent">Le monde est à un Hello.</p>
        <div className="relative mx-auto mt-6 size-40">
          <img src="/posters/city.jpg" alt="" className="size-full rounded-full object-cover ring-1 ring-accent/40" />
          <img src="/avatars/rina.jpg" alt="" className="absolute -left-2 top-6 size-10 rounded-full object-cover ring-2 ring-bg" />
          <img src="/avatars/luca.jpg" alt="" className="absolute -right-1 bottom-8 size-11 rounded-full object-cover ring-2 ring-bg" />
          <img src="/avatars/maya.jpg" alt="" className="absolute bottom-0 left-10 size-9 rounded-full object-cover ring-2 ring-bg" />
        </div>
        <ul className="mt-8 space-y-3 text-sm">
          <li className="flex gap-3">
            <Globe className="mt-0.5 size-4 shrink-0 text-accent" />
            Fais de nouvelles rencontres aux quatre coins du monde
          </li>
          <li className="flex gap-3">
            <Heart className="mt-0.5 size-4 shrink-0 text-accent" />
            Des échanges authentiques et bienveillants
          </li>
          <li className="flex gap-3">
            <Users className="mt-0.5 size-4 shrink-0 text-accent" />
            Amitié, discussion ou plus… C’est toi qui choisis
          </li>
        </ul>
        <Button size="lg" className="world-gold mt-auto" onClick={onStart}>
          Créer mon profil <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function Onboard({
  draft,
  step,
  setStep,
  setDraft,
  onBack,
  onDone,
}: {
  draft: WorldProfile;
  step: number;
  setStep: (n: number) => void;
  setDraft: (p: WorldProfile) => void;
  onBack: () => void;
  onDone: () => void;
}) {
  const patch = (p: Partial<WorldProfile>) => setDraft({ ...draft, ...p });
  const handle = draft.username.toLowerCase();
  const taken = TAKEN.has(handle);
  const okUser = validHandle(handle) && !taken;
  const okPhotos = draft.photos.length >= 2;
  const ageN = Number(draft.age);
  const okAge = ageN >= 18 && ageN <= 99 && draft.answerSunday.trim() && draft.answerRedFlag.trim() && draft.answerEscape.trim();
  const okGenre = !!draft.gender && !!draft.orientation;
  const okLoc = !!draft.country && draft.city.trim().length >= 2 && draft.languages.length > 0;
  const okIntent = draft.intentions.length > 0;
  const ready = [okUser, okPhotos, okAge, okGenre, okLoc, okIntent, true][step - 1];
  const [picking, setPicking] = useState(false);

  return (
    <div className="relative flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center gap-2 px-2">
        <button
          type="button"
          className="flex size-11 items-center justify-center"
          onClick={() => (step === 1 ? onBack() : setStep(step - 1))}
          aria-label="Retour"
        >
          {step === 1 ? <X className="size-5" /> : <ArrowLeft className="size-5" />}
        </button>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className={cn("h-1 flex-1 rounded-full", i < step ? "world-gold" : "bg-surface-2")} />
          ))}
        </div>
        <span className="w-11 text-center text-xs text-muted">{step}/7</span>
      </header>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-4">
        {step === 1 ? (
          <Step title="Ton pseudo" sub="C’est comme ça que le monde te verra.">
            <label className="mt-4 flex h-12 items-center gap-2 rounded-md bg-surface px-3">
              <span className="text-accent">@</span>
              <input
                value={draft.username}
                maxLength={20}
                onChange={(e) => patch({ username: e.target.value.replace(/\s/g, "") })}
                placeholder="dina.world"
                className="h-full w-full bg-transparent text-sm outline-none"
              />
            </label>
            {handle.length >= 3 ? (
              <p className={cn("mt-2 text-xs", taken ? "text-heart" : okUser ? "text-open" : "text-muted")}>
                {taken ? "✗ Ce pseudo est déjà pris" : okUser ? "✓ Pseudo disponible" : "Lettres, chiffres, point, underscore."}
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted">Au moins 3 caractères.</p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-muted">Ton nom, ta date de naissance et ton email restent dans ton compte Zembo.</p>
          </Step>
        ) : null}
        {step === 2 ? (
          <Step title="Tes photos" sub="2 à 6 images. La première est la principale.">
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <PhotoSlot
                  key={i}
                  big
                  src={draft.photos[i]}
                  main={i === 0}
                  onPick={() => setPicking(true)}
                  onDrop={() => patch({ photos: draft.photos.filter((_, x) => x !== i) })}
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {[2, 3, 4, 5].map((i) => (
                <PhotoSlot
                  key={i}
                  src={draft.photos[i]}
                  onPick={() => setPicking(true)}
                  onDrop={() => patch({ photos: draft.photos.filter((_, x) => x !== i) })}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted">{draft.photos.length}/6 — appuie sur + pour ouvrir ta pellicule.</p>
          </Step>
        ) : null}
        {step === 3 ? (
          <Step title="Âge & World Card" sub="Trois réponses. C’est ta carte.">
            <input
              inputMode="numeric"
              value={draft.age}
              onChange={(e) => patch({ age: e.target.value.replace(/\D/g, "").slice(0, 2) })}
              placeholder="Âge"
              className="mt-4 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
            />
            <textarea
              value={draft.bio}
              maxLength={120}
              rows={2}
              onChange={(e) => patch({ bio: e.target.value })}
              placeholder="Bio (facultatif)"
              className="mt-2 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
            />
            <p className="mt-1 text-right text-[10px] text-muted">{draft.bio.length}/120</p>
            {[
              ["answerSunday", "Mon dimanche parfait", "brunch et longue marche"],
              ["answerRedFlag", "Mon plus gros red flag", "ne jamais répondre"],
              ["answerEscape", "Si je pouvais partir demain", "direction Lisbonne"],
            ].map(([k, label, ph]) => (
              <label key={k} className="mt-3 block">
                <span className="text-xs text-muted">{label}</span>
                <input
                  value={draft[k as keyof WorldProfile] as string}
                  onChange={(e) => patch({ [k]: e.target.value } as Partial<WorldProfile>)}
                  placeholder={ph}
                  className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
                />
              </label>
            ))}
          </Step>
        ) : null}
        {step === 4 ? (
          <Step title="Genre & orientation" sub="Tu choisis ce que le monde voit.">
            <div className="mt-4 flex gap-2">
              {(
                [
                  ["femme", "Femme", "♀"],
                  ["homme", "Homme", "♂"],
                  ["autre", "Autre", "⚧"],
                ] as const
              ).map(([id, label, mark]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => patch({ gender: id })}
                  className={cn("h-11 flex-1 rounded-md text-sm", draft.gender === id ? "world-gold" : "bg-surface")}
                >
                  {mark} {label}
                </button>
              ))}
            </div>
            <select
              value={draft.orientation}
              onChange={(e) => patch({ orientation: e.target.value })}
              className="mt-3 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
            >
              <option value="">Orientation</option>
              {ORIENTATIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <button type="button" onClick={() => patch({ showAge: !draft.showAge })} className="mt-4 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm">
              Âge visible
              <span className={cn("h-6 w-10 rounded-full p-0.5", draft.showAge ? "world-gold" : "bg-surface-2")}>
                <span className={cn("block size-5 rounded-full bg-bg transition-transform", draft.showAge && "translate-x-4")} />
              </span>
            </button>
          </Step>
        ) : null}
        {step === 5 ? (
          <Step title="Où tu es" sub="Pays, ville, langues.">
            <select value={draft.country} onChange={(e) => patch({ country: e.target.value })} className="mt-4 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none">
              <option value="">Pays</option>
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.id}
                </option>
              ))}
            </select>
            <input value={draft.city} onChange={(e) => patch({ city: e.target.value })} placeholder="Ville" className="mt-2 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {LANGS.map((l) => {
                const on = draft.languages.includes(l);
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => patch({ languages: on ? draft.languages.filter((x) => x !== l) : [...draft.languages, l] })}
                    className={cn("h-8 rounded-full px-3 text-xs", on ? "world-gold" : "bg-surface-2")}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </Step>
        ) : null}
        {step === 6 ? (
          <Step title="Tes intentions" sub="Au moins une.">
            <div className="mt-4 space-y-2">
              {INTENTS.map((it) => {
                const on = draft.intentions.includes(it.id);
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() =>
                      patch({
                        intentions: on ? draft.intentions.filter((x) => x !== it.id) : [...draft.intentions, it.id],
                      })
                    }
                    className={cn("flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm", on ? "world-gold" : "bg-surface")}
                  >
                    <span>{it.mark}</span>
                    {it.label}
                  </button>
                );
              })}
            </div>
          </Step>
        ) : null}
        {step === 7 ? (
          <Step title="C’est toi" sub="Vérifie ta World Card.">
            <div className="mt-4 overflow-hidden rounded-2xl bg-surface">
              {draft.photos[0] ? <img src={draft.photos[0]} alt="" className="h-44 w-full object-cover" /> : null}
              <div className="p-3">
                <p className="font-display text-xl tracking-tight">
                  @{draft.username}
                  {draft.showAge ? <span className="text-muted"> · {draft.age}</span> : null}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {flagOf(draft.country)} {draft.city}, {draft.country}
                </p>
                <p className="mt-2 text-xs text-accent">{draft.intentions.map(intentLabel).join(" · ")}</p>
              </div>
            </div>
            <button type="button" className="mt-3 text-sm text-accent" onClick={() => setStep(1)}>
              Modifier
            </button>
          </Step>
        ) : null}
      </div>
      <div className="px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        {step < 7 ? (
          <Button size="lg" className="world-gold" disabled={!ready} onClick={() => setStep(step + 1)}>
            Continuer
          </Button>
        ) : (
          <Button size="lg" className="world-gold" onClick={onDone}>
            Entrer dans World Room
          </Button>
        )}
      </div>
      {picking ? (
        <PhotoPicker
          chosen={draft.photos}
          onClose={() => setPicking(false)}
          onAddMany={(srcs) => patch({ photos: addPhotos(draft.photos, srcs) })}
        />
      ) : null}
    </div>
  );
}

function Step({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <>
      <p className="mt-4 font-display text-2xl tracking-tight">{title}</p>
      <p className="mt-1 text-sm text-muted">{sub}</p>
      {children}
    </>
  );
}

function addPhotos(all: string[], srcs: string[]) {
  const next = [...all];
  for (const src of srcs) {
    if (next.length >= 6) break;
    if (!next.includes(src)) next.push(src);
  }
  return next;
}

async function fileToPhoto(file: File): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file);
    const max = 960;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.72);
  } catch {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}

function PhotoSlot({
  src,
  big,
  main,
  onPick,
  onDrop,
}: {
  src?: string;
  big?: boolean;
  main?: boolean;
  onPick: () => void;
  onDrop: () => void;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-surface", big ? "aspect-[3/4]" : "aspect-square")}>
      {src ? (
        <>
          <img src={src} alt="" className="size-full object-cover" />
          {main ? <span className="absolute left-2 top-2 rounded-full bg-bg/80 px-2 py-0.5 text-[10px]">Photo principale</span> : null}
          <button type="button" onClick={onDrop} className="absolute right-1 top-1 grid size-8 place-items-center rounded-full bg-bg/80" aria-label="Retirer">
            <X className="size-3.5" />
          </button>
        </>
      ) : (
        <button type="button" onClick={onPick} className="flex size-full flex-col items-center justify-center gap-1 text-accent" aria-label="Ajouter une photo">
          <ImagePlus className="size-5" />
          {big ? <span className="text-[10px]">Ajouter</span> : null}
        </button>
      )}
    </div>
  );
}

function PhotoPicker({
  chosen,
  onAddMany,
  onClose,
}: {
  chosen: string[];
  onAddMany: (srcs: string[]) => void;
  onClose: () => void;
}) {
  const { toast } = useNav();
  const [busy, setBusy] = useState(false);
  const remain = 6 - chosen.length;

  const ingest = async (files: FileList | null) => {
    if (!files?.length || remain <= 0) return;
    setBusy(true);
    try {
      const picked = [...files].filter((f) => f.type.startsWith("image/")).slice(0, remain);
      const srcs: string[] = [];
      for (const file of picked) {
        srcs.push(await fileToPhoto(file));
      }
      if (srcs.length) onAddMany(srcs);
      onClose();
    } catch {
      toast("Impossible de lire cette photo.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-bg">
      <header className="flex items-center gap-2 px-2 pt-[env(safe-area-inset-top)]">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onClose} aria-label="Fermer">
          <X className="size-5" />
        </button>
        <p className="flex-1 font-display text-lg tracking-tight">Ajouter des photos</p>
        <span className="pr-3 text-xs text-muted">{chosen.length}/6</span>
      </header>
      <p className="px-5 text-sm text-muted">Depuis ton téléphone, ou dans la galerie.</p>
      <div className="mt-4 grid grid-cols-2 gap-2 px-5">
        <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl bg-surface text-sm ring-1 ring-fg/10">
          <Images className="size-5 text-accent" />
          Pellicule
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            disabled={busy || remain <= 0}
            onChange={(e) => {
              void ingest(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl bg-surface text-sm ring-1 ring-fg/10">
          <Camera className="size-5 text-accent" />
          Appareil photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            disabled={busy || remain <= 0}
            onChange={(e) => {
              void ingest(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <p className="mt-5 px-5 text-xs uppercase tracking-wider text-muted">Galerie World Room</p>
      <div className="no-scrollbar mt-2 min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        {busy ? <p className="py-6 text-center text-sm text-muted">Import en cours…</p> : null}
        <div className="grid grid-cols-3 gap-1.5">
          {PHOTO_POOL.map((p) => {
            const on = chosen.includes(p);
            return (
              <button
                key={p}
                type="button"
                disabled={busy || (!on && remain <= 0)}
                onClick={() => {
                  if (on) return;
                  onAddMany([p]);
                  if (remain <= 1) onClose();
                }}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <img src={p} alt="" className="size-full object-cover" />
                {on ? <span className="absolute inset-0 grid place-items-center bg-bg/55 text-xs">Déjà choisie</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WorldApp({ onBack, onEdit }: { onBack: () => void; onEdit: (at?: number) => void }) {
  const { toast } = useNav();
  const profile = useWorld((s) => s.profile)!;
  const hellos = useWorld((s) => s.hellos);
  const filters = useWorld((s) => s.filters);
  const setFilters = useWorld((s) => s.setFilters);
  const sendHello = useWorld((s) => s.sendHello);
  const answerHello = useWorld((s) => s.answerHello);
  const ignoreHello = useWorld((s) => s.ignoreHello);
  const cancelHello = useWorld((s) => s.cancelHello);
  const connect = useWorld((s) => s.connect);
  const skipMeet = useWorld((s) => s.skipMeet);
  const seedMutual = useWorld((s) => s.seedMutual);
  const resetDemo = useWorld((s) => s.resetDemo);
  const threads = useWorld((s) => s.threads);
  const unread = useWorld((s) => s.unread);
  const meets = useWorld((s) => s.meets);
  const sendWorldMsg = useWorld((s) => s.sendWorldMsg);
  const markRead = useWorld((s) => s.markRead);
  const leaveWorld = useWorld((s) => s.leaveWorld);
  const patchProfile = useWorld((s) => s.patchProfile);

  const [tab, setTab] = useState<Tab>("discover");
  const [i, setI] = useState(0);
  const [details, setDetails] = useState(false);
  const [full, setFull] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [helloSide, setHelloSide] = useState<"in" | "out">("in");
  const [over, setOver] = useState<Overlay>({ t: "none" });
  const [draftF, setDraftF] = useState(filters);

  useEffect(() => {
    const s = useWorld.getState();
    if (s.hellos.mutual.length === 0 && s.meets.length === 0) s.seedMutual(["w-sofia"]);
  }, [seedMutual]);

  const cards = useMemo(() => {
    return WORLD_CARDS.filter((c) => {
      if (hellos.ignored.includes(c.id) || hellos.connections.includes(c.id)) return false;
      if (filters.see === "hommes" && c.gender !== "homme") return false;
      if (filters.see === "femmes" && c.gender !== "femme") return false;
      if (filters.see === "lgbt" && c.gender !== "autre") return false;
      if (filters.age === "18-24" && (c.age < 18 || c.age > 24)) return false;
      if (filters.age === "25-35" && (c.age < 25 || c.age > 35)) return false;
      if (filters.age === "36-45" && (c.age < 36 || c.age > 45)) return false;
      if (filters.age === "46+" && c.age < 46) return false;
      if (filters.zone === "afrique" && c.zone !== "afrique") return false;
      if (filters.zone === "europe" && c.zone !== "europe") return false;
      if (filters.zone === "asie" && c.zone !== "asie") return false;
      if (filters.zone === "pays" && c.country !== profile.country) return false;
      if (filters.lang === "FR" && !c.languages.some((l) => l.startsWith("Français"))) return false;
      if (filters.lang === "EN" && !c.languages.includes("English")) return false;
      if (filters.intent !== "all" && c.intent !== filters.intent) return false;
      return true;
    });
  }, [filters, hellos.ignored, hellos.connections, profile.country]);

  const card = cards.length ? cards[i % cards.length] : undefined;
  const next = () => {
    buzz();
    setDetails(false);
    setFull(false);
    setI((n) => n + 1);
  };

  const helloTo = (c: WorldCard) => {
    buzz();
    if (hellos.mutual.includes(c.id)) {
      setOver({ t: "celebrate", card: c });
      return;
    }
    if (hellos.pending.includes(c.id)) {
      answerHello(c.id);
      setOver({ t: "celebrate", card: c });
      return;
    }
    if (hellos.sent.includes(c.id)) {
      toast(`Hello déjà envoyé à ${c.name}`);
      return;
    }
    sendHello(c.id);
    toast(`👋 Hello envoyé à ${c.name}`);
  };

  const askConnect = (c: WorldCard) => {
    buzz();
    toast(`✨ Demande de connexion envoyée à ${c.name}`);
  };

  return (
    <div className="relative h-full overflow-hidden bg-bg">
      {over.t === "none" && tab === "discover" && card ? (
        <Discover
          key={card.id}
          card={card}
          details={details}
          setDetails={setDetails}
          onFilter={() => {
            setDraftF(filters);
            setFilterOpen(true);
          }}
          onFull={() => setFull(true)}
          onPass={next}
          onHello={() => helloTo(card)}
          onConnect={() => askConnect(card)}
          onBack={onBack}
        />
      ) : null}
      {over.t === "none" && tab === "discover" && !card ? (
        <div className="flex h-full flex-col items-center justify-center px-8 pb-24 text-center">
          <Globe className="size-8 text-accent" />
          <p className="mt-4 font-display text-2xl tracking-tight">Plus personne ici</p>
          <p className="mt-2 text-sm text-muted">Élargis tes filtres — le monde est grand.</p>
          <Button
            size="lg"
            className="world-gold mt-6"
            onClick={() => {
              setDraftF(filters);
              setFilterOpen(true);
            }}
          >
            Filtres
          </Button>
        </div>
      ) : null}
      {over.t === "none" && tab === "hellos" ? (
        <Hellos
          side={helloSide}
          setSide={setHelloSide}
          hellos={hellos}
          onView={(id) => {
            const c = cardById(id);
            if (c) {
              const idx = cards.findIndex((x) => x.id === id);
              if (idx >= 0) setI(idx);
              setTab("discover");
              setFull(true);
            }
          }}
          onAnswer={(id) => {
            const c = cardById(id);
            if (!c) return;
            answerHello(id);
            setOver({ t: "celebrate", card: c });
          }}
          onIgnore={ignoreHello}
          onCancel={cancelHello}
          onReset={resetDemo}
        />
      ) : null}
      {over.t === "none" && tab === "face" ? (
        <FacePage
          pending={hellos.mutual}
          history={meets}
          onStart={(c) => {
            buzz();
            setOver({ t: "meet", card: c });
          }}
          onLaunch={(mode) => {
            buzz();
            setOver({ t: "meet", mode });
          }}
          onDiscover={() => setTab("discover")}
        />
      ) : null}
      {over.t === "none" && tab === "inbox" ? (
        <Inbox
          ids={hellos.connections}
          threads={threads}
          unread={unread}
          pending={hellos.pending.length}
          onOpen={(id) => {
            markRead(id);
            setOver({ t: "thread", id });
          }}
          onHellos={() => setTab("hellos")}
        />
      ) : null}
      {over.t === "none" && tab === "me" ? (
        <MePage
          profile={profile}
          n={hellos.connections.length}
          ids={hellos.connections}
          onPatch={patchProfile}
          onEdit={onEdit}
          onLeave={() => {
            leaveWorld();
            onBack();
          }}
        />
      ) : null}

      {over.t === "none" ? (
        <nav className="world-dock absolute inset-x-4 z-30 flex h-14 items-center justify-around px-2" style={{ bottom: "calc(0.6rem + env(safe-area-inset-bottom))" }}>
          {(
            [
              ["discover", "Découvrir", Globe],
              ["hellos", "Hellos", Heart],
              ["face", "Face à Face", Video],
              ["inbox", "Messages", MessageCircle],
              ["me", "Profil", Users],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                buzz();
                setTab(id);
                setFull(false);
                setDetails(false);
              }}
              className={cn("flex min-w-0 flex-1 flex-col items-center gap-0.5 text-[9px] leading-tight", tab === id ? "text-accent" : "text-muted")}
            >
              <span className="relative">
                <Icon className="size-4" />
                {id === "hellos" && hellos.pending.length ? (
                  <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full world-gold text-[8px]">{hellos.pending.length}</span>
                ) : null}
                {id === "face" && hellos.mutual.length ? (
                  <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full world-gold text-[8px]">{hellos.mutual.length}</span>
                ) : null}
              </span>
              {label}
            </button>
          ))}
        </nav>
      ) : null}

      {filterOpen ? (
        <Sheet onClose={() => setFilterOpen(false)}>
          <p className="font-display text-xl">Filtres</p>
          <p className="mt-3 text-xs text-muted">Je veux voir</p>
          <Row chips={[["tous", "Tous"], ["hommes", "Hommes"], ["femmes", "Femmes"], ["lgbt", "LGBT+"]]} value={draftF.see} on={(v) => setDraftF({ ...draftF, see: v as typeof draftF.see })} />
          <p className="mt-3 text-xs text-muted">Âge</p>
          <Row chips={[["all", "Tous"], ["18-24", "18-24"], ["25-35", "25-35"], ["36-45", "36-45"], ["46+", "46+"]]} value={draftF.age} on={(v) => setDraftF({ ...draftF, age: v as typeof draftF.age })} />
          <p className="mt-3 text-xs text-muted">Zone</p>
          <Row chips={[["monde", "Monde"], ["pays", "Mon pays"], ["afrique", "Afrique"], ["europe", "Europe"], ["asie", "Asie"]]} value={draftF.zone} on={(v) => setDraftF({ ...draftF, zone: v as typeof draftF.zone })} />
          <p className="mt-3 text-xs text-muted">Langue</p>
          <Row chips={[["all", "Toutes"], ["FR", "FR"], ["EN", "EN"]]} value={draftF.lang} on={(v) => setDraftF({ ...draftF, lang: v as typeof draftF.lang })} />
          <p className="mt-3 text-xs text-muted">Intention</p>
          <Row
            chips={[["all", "Peu importe"], ...INTENTS.filter((x) => x.id !== "peu-importe" && x.id !== "legere").map((x) => [x.id, x.label] as [string, string])]}
            value={draftF.intent}
            on={(v) => setDraftF({ ...draftF, intent: v as typeof draftF.intent })}
          />
          <Button
            size="lg"
            className="world-gold mt-5"
            onClick={() => {
              setFilters(draftF);
              setFilterOpen(false);
              setI(0);
            }}
          >
            Voir les profils
          </Button>
          <button
            type="button"
            className="mt-3 w-full py-2 text-center text-xs text-muted"
            onClick={() => {
              setFilterOpen(false);
              onEdit(1);
            }}
          >
            Recommencer l’onboarding
          </button>
        </Sheet>
      ) : null}

      {full && card ? (
        <FullCard
          card={card}
          onClose={() => setFull(false)}
          onPass={next}
          onHello={() => helloTo(card)}
          onConnect={() => askConnect(card)}
        />
      ) : null}

      {over.t === "celebrate" ? (
        <Celebrate
          card={over.card}
          mePhoto={profile.photos[0]}
          onLater={() => {
            setOver({ t: "none" });
            setTab("face");
            toast("Face à Face en attente");
          }}
          onMeet={() => setOver({ t: "meet", card: over.card })}
        />
      ) : null}
      {over.t === "meet" ? (
        <FaceDuel
          preferred={over.card}
          me={profile}
          blocked={[...hellos.connections, ...hellos.ignored]}
          initialMode={over.mode}
          onQuit={() => setOver({ t: "none" })}
          onWin={(c) => {
            connect(c.id);
            setOver({ t: "linked", card: c });
          }}
          onLose={(c) => {
            skipMeet(c.id);
            setOver({ t: "done", card: c });
          }}
        />
      ) : null}
      {over.t === "decide" ? (
        <Decide
          card={over.card}
          onNext={() => {
            skipMeet(over.card.id);
            setOver({ t: "done", card: over.card });
          }}
          onYes={() => setOver({ t: "wait", card: over.card })}
        />
      ) : null}
      {over.t === "wait" ? (
        <Wait
          card={over.card}
          onOk={() => {
            connect(over.card.id);
            setOver({ t: "linked", card: over.card });
          }}
          onNo={() => {
            skipMeet(over.card.id);
            setOver({ t: "done", card: over.card });
          }}
        />
      ) : null}
      {over.t === "linked" ? (
        <Linked
          card={over.card}
          mePhoto={profile.photos[0]}
          onChat={() => {
            markRead(over.card.id);
            setOver({ t: "thread", id: over.card.id });
            setTab("inbox");
          }}
          onMore={() => {
            setOver({ t: "none" });
            setTab("face");
          }}
        />
      ) : null}
      {over.t === "done" ? (
        <Ended
          onMore={() => {
            setOver({ t: "none" });
            setTab("face");
          }}
        />
      ) : null}
      {over.t === "thread" ? (
        <Thread
          id={over.id}
          lines={threads[over.id] ?? []}
          onBack={() => setOver({ t: "none" })}
          onSend={(t) => sendWorldMsg(over.id, t)}
        />
      ) : null}
    </div>
  );
}

function Discover({
  card,
  details,
  setDetails,
  onFilter,
  onFull,
  onPass,
  onHello,
  onConnect,
  onBack,
}: {
  card: WorldCard;
  details: boolean;
  setDetails: (v: boolean) => void;
  onFilter: () => void;
  onFull: () => void;
  onPass: () => void;
  onHello: () => void;
  onConnect: () => void;
  onBack: () => void;
}) {
  const start = useRef(0);
  const [photo, setPhoto] = useState(0);
  const src = card.photos[photo % card.photos.length] ?? card.photos[0]!;
  return (
    <div
      className="world-in absolute inset-0"
      onPointerDown={(e) => {
        start.current = e.clientY;
      }}
      onPointerUp={(e) => {
        const d = start.current - e.clientY;
        if (d > 80) onPass();
        else if (d > 28) setDetails(true);
      }}
      onWheel={(e) => {
        if (e.deltaY > 40) onPass();
      }}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 size-full object-cover"
        onClick={() => setPhoto((n) => (n + 1) % card.photos.length)}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      <header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-3 pt-[calc(0.4rem+env(safe-area-inset-top))]">
        <div className="flex items-center gap-1">
          <button type="button" onClick={onFilter} className="flex size-11 items-center justify-center rounded-full bg-bg/40" aria-label="Filtres">
            <Settings2 className="size-4" />
          </button>
          <button type="button" onClick={onBack} className="flex size-11 items-center justify-center rounded-full bg-bg/40" aria-label="Quitter">
            <X className="size-5" />
          </button>
        </div>
        <button type="button" onClick={onFull} className="relative mt-0.5" aria-label="Voir le profil">
          <img src={card.photos[0]} alt="" className="size-11 rounded-full object-cover ring-2 ring-accent" />
          <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 whitespace-nowrap items-center gap-0.5 rounded-full bg-bg/80 px-1.5 py-px text-[8px] leading-none">
            <Eye className="size-2" /> Voir
          </span>
        </button>
      </header>
      <div className="absolute right-3 top-1/3 z-10 flex flex-col gap-2">
        {card.photos.map((_, p) => (
          <button
            key={p}
            type="button"
            aria-label={`Photo ${p + 1}`}
            onClick={() => setPhoto(p)}
            className={cn("w-1 rounded-full", p === photo % card.photos.length ? "h-6 world-gold" : "h-1.5 bg-fg/30")}
          />
        ))}
      </div>
      <div className="absolute inset-x-4 z-10" style={{ bottom: "calc(7.35rem + env(safe-area-inset-bottom))" }}>
        <p className="font-display text-3xl tracking-tight">
          {card.name}
          {card.age ? <span className="text-fg/80">, {card.age}</span> : null}
          {card.verified ? <BadgeCheck className="ml-1 inline size-4 text-open" /> : null}
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm">
          <span>
            <MapPin className="mr-1 inline size-3.5" />
            {card.flag} {card.city}, {card.country}
          </span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-accent">
            <Plane className="size-3" />
            {card.distanceKm} km
          </span>
        </p>
        <p className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded-full bg-bg/50 px-2 py-0.5">
            {intentMark(card.intent)} {intentLabel(card.intent)}
          </span>
          {card.online ? <span className="rounded-full bg-bg/50 px-2 py-0.5 text-open">En ligne</span> : null}
        </p>
        <button type="button" onClick={() => setDetails(true)} className="mt-1.5 text-xs text-accent">
          Voir plus ▾
        </button>
      </div>
      <div className="absolute inset-x-0 z-20 flex items-center justify-center gap-2 px-5" style={{ bottom: "calc(4.45rem + env(safe-area-inset-bottom))" }}>
        <button type="button" onClick={onPass} className="flex h-10 items-center justify-center gap-1 rounded-full bg-bg/60 px-3.5 text-[11px] text-accent ring-1 ring-fg/15">
          <ArrowRight className="size-3.5" /> Passer
        </button>
        <button type="button" onClick={onHello} className="world-gold flex size-12 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgb(212_196_168_/_0.3)]" aria-label="Dire Hello">
          <MessageCircle className="size-5" />
        </button>
        <button type="button" onClick={onConnect} className="world-connect flex h-10 items-center justify-center gap-1 rounded-full px-3.5 text-[11px]">
          <span className="font-display text-xs">Z</span>
          <Heart className="size-3.5" /> Connecter
        </button>
      </div>
      {details ? (
        <button type="button" className="absolute inset-0 z-30 bg-bg/40" onClick={() => setDetails(false)} aria-label="Fermer">
          <div className="absolute inset-x-0 bottom-0 max-h-[64%] overflow-y-auto rounded-t-3xl bg-bg/80 p-4 text-left backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
            <CardBody card={card} />
          </div>
        </button>
      ) : null}
    </div>
  );
}

function CardBody({ card }: { card: WorldCard }) {
  return (
    <div>
      <p className="font-display text-lg italic text-accent">“{card.quote}”</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {card.interests.map((t) => (
          <span key={t} className="rounded-full bg-fg/10 px-2 py-0.5 text-[11px]">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {[
          ["Mon dimanche parfait ?", card.sunday],
          ["Mon plus gros red flag ?", card.redFlag],
          ["Si je pouvais partir demain ?", card.travel],
        ].map(([q, a]) => (
          <div key={q} className="rounded-2xl bg-bg/55 p-3 ring-1 ring-fg/12 backdrop-blur-md">
            <p className="text-[11px] text-muted">{q}</p>
            <p className="mt-1 text-sm">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullCard({
  card,
  onClose,
  onPass,
  onHello,
  onConnect,
}: {
  card: WorldCard;
  onClose: () => void;
  onPass: () => void;
  onHello: () => void;
  onConnect: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center px-2">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onClose} aria-label="Fermer">
          <X className="size-5" />
        </button>
        <p className="flex-1 text-sm">{card.name}</p>
      </header>
      <div className="flex snap-x gap-2 overflow-x-auto px-4">
        {card.photos.map((p) => (
          <img key={p} src={p} alt="" className="h-[300px] w-[68%] shrink-0 snap-center rounded-2xl object-cover" />
        ))}
      </div>
      <div className="px-5 py-4 pb-36">
        <p className="font-display text-2xl">
          {card.name}, {card.age} {card.verified ? <BadgeCheck className="inline size-4 text-open" /> : null}
        </p>
        <p className="mt-1 text-sm text-muted">
          {card.flag} {card.city}, {card.country}
        </p>
        <p className="mt-2 text-xs text-accent">
          {intentMark(card.intent)} {intentLabel(card.intent)}
        </p>
        <div className="mt-4">
          <CardBody card={card} />
        </div>
      </div>
      <div className="absolute inset-x-4 flex gap-2" style={{ bottom: "calc(5.2rem + env(safe-area-inset-bottom))" }}>
        <Button variant="line" className="flex-1" onClick={onPass}>
          Passer
        </Button>
        <Button className="world-gold flex-1" onClick={onHello}>
          Hello
        </Button>
        <Button variant="ghost" className="flex-1" onClick={onConnect}>
          Connecter
        </Button>
      </div>
    </div>
  );
}

function Hellos({
  side,
  setSide,
  hellos,
  onView,
  onAnswer,
  onIgnore,
  onCancel,
  onReset,
}: {
  side: "in" | "out";
  setSide: (s: "in" | "out") => void;
  hellos: { pending: string[]; sent: string[] };
  onView: (id: string) => void;
  onAnswer: (id: string) => void;
  onIgnore: (id: string) => void;
  onCancel: (id: string) => void;
  onReset: () => void;
}) {
  const list = side === "in" ? hellos.pending : hellos.sent;
  return (
    <div className="flex h-full flex-col pt-[env(safe-area-inset-top)]">
      <p className="px-5 pt-3 font-display text-2xl">Hellos</p>
      <div className="mx-5 mt-3 flex rounded-full bg-surface p-1">
        <button type="button" onClick={() => setSide("in")} className={cn("h-9 flex-1 rounded-full text-xs", side === "in" && "world-gold")}>
          Reçus {hellos.pending.length ? `(${hellos.pending.length})` : ""}
        </button>
        <button type="button" onClick={() => setSide("out")} className={cn("h-9 flex-1 rounded-full text-xs", side === "out" && "world-gold")}>
          Envoyés {hellos.sent.length ? `(${hellos.sent.length})` : ""}
        </button>
      </div>
      <div className="no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-28">
        {list.length === 0 ? <p className="mt-8 text-center text-sm text-muted">Rien pour l’instant.</p> : null}
        {side === "in"
          ? list.map((id) => {
              const c = cardById(id);
              if (!c) return null;
              return (
                <div key={id} className="mb-3 rounded-3xl bg-fg/5 p-3 ring-1 ring-accent/25">
                  <div className="flex gap-3">
                    <img src={c.photos[0]} alt="" className="size-14 rounded-full object-cover ring-2 ring-accent/80" />
                    <div className="min-w-0">
                      <p className="text-sm">👋 {c.name} t’a envoyé un Hello depuis {c.country}</p>
                      <p className="mt-0.5 text-[11px] text-muted">
                        {c.flag} {c.city} · {c.age} · il y a 12 min
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => onView(id)} className="h-9 flex-1 rounded-full text-xs ring-1 ring-accent/35">
                      Voir
                    </button>
                    <button type="button" onClick={() => onAnswer(id)} className="world-gold h-9 flex-1 rounded-full text-xs">
                      Répondre
                    </button>
                    <button type="button" onClick={() => onIgnore(id)} className="h-9 flex-1 rounded-full text-xs ring-1 ring-fg/15">
                      Ignorer
                    </button>
                  </div>
                </div>
              );
            })
          : list.map((id) => {
              const c = cardById(id);
              if (!c) return null;
              return (
                <div key={id} className="mb-2 flex items-center gap-3 rounded-2xl bg-surface p-2">
                  <img src={c.photos[0]} alt="" className="size-12 rounded-full object-cover ring-1 ring-accent/45" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      {c.name} {c.flag}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-muted">
                      <Clock className="size-3" /> En attente de sa réponse…
                    </p>
                  </div>
                  <button type="button" onClick={() => onCancel(id)} className="h-8 rounded-full px-3 text-xs ring-1 ring-fg/12">
                    Annuler
                  </button>
                </div>
              );
            })}
        <p className="mt-6 text-center text-[11px] text-muted">Hello mutuel → Face à Face → connexion.</p>
        <button type="button" onClick={onReset} className="mx-auto mt-2 block text-[11px] text-accent">
          Recommencer la démo
        </button>
      </div>
    </div>
  );
}

function whenMeet(at: number) {
  return new Date(at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function FacePage({
  pending,
  history,
  onStart,
  onLaunch,
  onDiscover,
}: {
  pending: string[];
  history: WorldMeet[];
  onStart: (c: WorldCard) => void;
  onLaunch: (mode: FaceMode) => void;
  onDiscover: () => void;
}) {
  const hist = [...history].sort((a, b) => b.at - a.at);
  return (
    <div className="flex h-full flex-col pt-[env(safe-area-inset-top)]">
      <div className="px-5 pt-3">
        <p className="font-display text-2xl">Face à Face</p>
        <p className="mt-1 text-sm text-muted">Choisis audio ou vidéo, puis on cherche quelqu’un de connecté.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onLaunch("video")} className="flex h-[5rem] flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface px-2 text-sm ring-1 ring-fg/12">
            <Video className="size-4 text-accent" />
            <span>Face à Face</span>
            <span className="text-[11px] text-muted">vidéo</span>
          </button>
          <button type="button" onClick={() => onLaunch("audio")} className="flex h-[5rem] flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface px-2 text-sm ring-1 ring-fg/12">
            <Mic className="size-4 text-accent" />
            <span>Face à Face</span>
            <span className="text-[11px] text-muted">audio</span>
          </button>
        </div>
      </div>
      <div className="no-scrollbar mt-4 min-h-0 flex-1 overflow-y-auto px-4 pb-28">
        <p className="text-[11px] uppercase tracking-wider text-muted">
          En attente{pending.length ? ` (${pending.length})` : ""}
        </p>
        {pending.length === 0 ? (
          <div className="mt-3 rounded-3xl bg-fg/5 p-5 text-center ring-1 ring-accent/20">
            <Video className="mx-auto size-6 text-accent" />
            <p className="mt-2 text-sm">Aucun Face à Face en attente</p>
            <p className="mt-1 text-xs text-muted">Un Hello mutuel, ou lance une recherche selon tes critères.</p>
            <button type="button" onClick={onDiscover} className="mt-4 h-9 rounded-full px-4 text-xs ring-1 ring-accent/35">
              Découvrir
            </button>
          </div>
        ) : (
          pending.map((id) => {
            const c = cardById(id);
            if (!c) return null;
            return (
              <div key={id} className="mb-3 mt-3 rounded-3xl bg-fg/5 p-3 ring-1 ring-accent/25">
                <div className="flex items-center gap-3">
                  <img src={c.photos[0]} alt="" className="size-14 rounded-full object-cover ring-2 ring-accent/80" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      {c.name}
                      {c.age ? <span className="text-muted">, {c.age}</span> : null}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">
                      {c.flag} {c.city}
                    </p>
                  </div>
                  <button type="button" onClick={() => onStart(c)} className="world-gold h-9 shrink-0 rounded-full px-3.5 text-xs">
                    Commencer
                  </button>
                </div>
              </div>
            );
          })
        )}
        <p className="mt-6 text-[11px] uppercase tracking-wider text-muted">Historique</p>
        {hist.length === 0 ? <p className="mt-3 text-center text-sm text-muted">Tes rencontres apparaîtront ici.</p> : null}
        {hist.map((m) => {
          const c = cardById(m.id);
          if (!c) return null;
          const ok = m.result === "connected";
          return (
            <div key={`${m.id}-${m.at}`} className="mb-2 mt-2 flex items-center gap-3 rounded-2xl bg-surface p-2">
              <img src={c.photos[0]} alt="" className="size-12 rounded-full object-cover ring-1 ring-accent/45" />
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  {c.name} {c.flag}
                </p>
                <p className={cn("mt-0.5 flex items-center gap-1 text-[11px]", ok ? "text-open" : "text-muted")}>
                  {ok ? <Check className="size-3" /> : <Clock className="size-3" />}
                  {ok ? "Connecté" : "Terminé"}
                  <span className="text-muted"> · {whenMeet(m.at)}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Inbox({
  ids,
  threads,
  unread,
  pending,
  onOpen,
  onHellos,
}: {
  ids: string[];
  threads: Record<string, { text: string }[]>;
  unread: Record<string, number>;
  pending: number;
  onOpen: (id: string) => void;
  onHellos: () => void;
}) {
  return (
    <div className="flex h-full flex-col pt-[env(safe-area-inset-top)]">
      <p className="px-5 pt-3 font-display text-2xl">Messages</p>
      <div className="no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-28">
        {ids.length === 0 ? <p className="mt-8 text-center text-sm text-muted">Tes connexions mutuelles apparaîtront ici.</p> : null}
        {pending > 0 ? (
          <button type="button" onClick={onHellos} className="mb-3 w-full rounded-full py-2 text-xs ring-1 ring-accent/35">
            {pending} Hello(s) en attente
          </button>
        ) : null}
        {ids.map((id) => {
          const c = cardById(id);
          if (!c) return null;
          const last = threads[id]?.at(-1);
          return (
            <button key={id} type="button" onClick={() => onOpen(id)} className="mb-1 flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left">
              <img src={c.photos[0]} alt="" className="size-12 rounded-full object-cover ring-2 ring-accent/70" />
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  {c.name} {c.flag}
                </p>
                <p className="truncate text-xs text-muted">{last?.text ?? "Nouvelle connexion"}</p>
              </div>
              {unread[id] ? <span className="world-gold grid size-5 place-items-center rounded-full text-[10px]">{unread[id]}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MePage({
  profile,
  n,
  ids,
  onPatch,
  onEdit,
  onLeave,
}: {
  profile: WorldProfile;
  n: number;
  ids: string[];
  onPatch: (p: Partial<WorldProfile>) => void;
  onEdit: (at?: number) => void;
  onLeave: () => void;
}) {
  const intent = profile.intentions[0];
  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[env(safe-area-inset-top)] pb-28">
      <div className="px-5 pt-3">
        <Logo size="sm" />
        {profile.photos[0] ? <img src={profile.photos[0]} alt="" className="mt-4 h-52 w-full rounded-2xl object-cover" /> : null}
        <p className="mt-3 font-display text-2xl">
          @{profile.username}
          {profile.showAge ? <span className="text-muted"> · {profile.age}</span> : null}
        </p>
        <p className="mt-1 text-sm text-muted">
          {flagOf(profile.country)} {profile.city}, {profile.country}
        </p>
        {intent ? (
          <p className="mt-2 text-xs text-accent">
            {intentMark(intent)} {intentLabel(intent)}
          </p>
        ) : null}
        {profile.bio ? <p className="mt-2 text-sm">{profile.bio}</p> : null}
        <p className="mt-2 text-xs text-muted">{profile.languages.join(" · ")}</p>
        <div className="mt-3 space-y-2">
          {[profile.answerSunday, profile.answerRedFlag, profile.answerEscape].map((a, i) => (
            <p key={i} className="rounded-2xl bg-surface p-3 text-sm">
              {a}
            </p>
          ))}
        </div>
        <Button size="lg" className="world-gold mt-5" onClick={() => onEdit(1)}>
          <Pencil className="size-4" /> Éditer mon profil World
        </Button>
        <p className="mt-5 text-xs uppercase tracking-wider text-muted">Mes photos</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {profile.photos.map((p, i) => (
            <div key={p} className="relative">
              <img src={p} alt="" className="aspect-square w-full rounded-md object-cover" />
              {i === 0 ? <span className="absolute left-1 top-1 rounded-full bg-bg/80 px-1.5 text-[9px]">Principale</span> : null}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs uppercase tracking-wider text-muted">Mes connexions</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex -space-x-2">
            {ids.slice(0, 5).map((id) => {
              const c = cardById(id);
              return c ? <img key={id} src={c.photos[0]} alt="" className="size-8 rounded-full object-cover ring-2 ring-bg" /> : null;
            })}
          </div>
          <p className="text-sm">{n} connexion(s) World</p>
        </div>
        <p className="mt-6 text-xs uppercase tracking-wider text-muted">Réglages</p>
        <button type="button" onClick={() => onPatch({ helloFrom: profile.helloFrom === "all" ? "criteria" : "all" })} className="mt-2 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm">
          Qui peut m’envoyer un Hello
          <span className="text-xs text-muted">{profile.helloFrom === "all" ? "Tout le monde" : "Selon mes critères"}</span>
        </button>
        <button type="button" onClick={() => onPatch({ visible: !profile.visible })} className="mt-2 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm">
          Visibilité
          <span className="text-xs text-muted">{profile.visible ? "Visible" : "En pause"}</span>
        </button>
        <button type="button" onClick={() => onEdit(5)} className="mt-2 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm">
          Langues
          <span className="text-xs text-accent">{profile.languages.slice(0, 2).join(", ") || "Ajouter"}</span>
        </button>
        <button type="button" onClick={onLeave} className="mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm text-heart">
          <LogOut className="size-4" /> Quitter World Room
        </button>
        <p className="mt-3 pb-4 text-center text-[11px] text-muted">Ton profil World Room est lié à ton compte Zembo.</p>
      </div>
    </div>
  );
}

function Celebrate({ card, mePhoto, onLater, onMeet }: { card: WorldCard; mePhoto?: string; onLater: () => void; onMeet: () => void }) {
  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-bg">
      <img src="/posters/sunrise.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-bg/70" />
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="world-confetti absolute top-8 size-2 rounded-full bg-accent"
          style={{ left: `${8 + i * 6}%`, animationDelay: `${i * 40}ms`, ["--dx" as string]: `${-40 + i * 8}px`, ["--dy" as string]: `${120 + (i % 5) * 20}px` }}
        />
      ))}
      <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[calc(2rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <Logo size="sm" />
        <p className="mt-6 font-display italic text-accent">Vous vous êtes dit</p>
        <p className="world-gold-text mt-2 font-display text-5xl tracking-tight">HELLO !</p>
        <p className="mt-3 text-center text-sm text-muted">Une belle connexion commence peut-être ici…</p>
        <div className="mt-8 flex items-center gap-3">
          {mePhoto ? <img src={mePhoto} alt="" className="size-20 rounded-full object-cover ring-2 ring-accent" /> : <span className="grid size-20 place-items-center rounded-full bg-surface">Toi</span>}
          <Heart className="size-7 fill-heart text-heart" />
          <img src={card.photos[0]} alt="" className="size-20 rounded-full object-cover ring-2 ring-accent" />
        </div>
        <ul className="mt-8 space-y-2 text-sm text-muted">
          <li className="flex gap-2">
            <MessageCircle className="size-4 text-accent" /> Découvrez une nouvelle personne
          </li>
          <li className="flex gap-2">
            <Video className="size-4 text-accent" /> Un Face à Face, 20 questions
          </li>
          <li className="flex gap-2">
            <Sparkles className="size-4 text-accent" /> Et laissez la conversation suivre son cours…
          </li>
        </ul>
        <Button size="lg" className="world-gold mt-auto" onClick={onMeet}>
          <Camera className="size-4" /> Lancer le Face à Face
        </Button>
        <button type="button" onClick={onLater} className="mt-2 h-11 text-sm text-muted">
          Plus tard
        </button>
      </div>
    </div>
  );
}

function Decide({ card, onYes, onNext }: { card: WorldCard; onYes: () => void; onNext: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center bg-bg px-6 pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <img src={card.photos[0]} alt="" className="size-24 rounded-full object-cover ring-2 ring-accent" />
      <p className="mt-5 font-display text-2xl">Envie de continuer ?</p>
      <p className="mt-2 text-center text-sm text-muted">Vous répondez chacun de votre côté. La conversation ne s’ouvre que si vous choisissez tous les deux Connecter.</p>
      <Button size="lg" className="world-gold mt-auto" onClick={onYes}>
        <Heart className="size-4" /> Connecter
      </Button>
      <button type="button" onClick={onNext} className="mt-3 h-12 w-full rounded-full text-sm ring-1 ring-fg/18">
        Merci, au suivant
      </button>
    </div>
  );
}

function Wait({ card, onOk, onNo }: { card: WorldCard; onOk: () => void; onNo: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (Math.random() < 0.75) onOk();
      else onNo();
    }, 1600);
    return () => window.clearTimeout(t);
  }, [onOk, onNo]);
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-bg px-6 text-center">
      <div>
        <p className="anim-live text-4xl">⏳</p>
        <p className="mt-4 text-sm text-muted">En attente de la réponse de {card.name}…</p>
      </div>
    </div>
  );
}

function Linked({ card, mePhoto, onChat, onMore }: { card: WorldCard; mePhoto?: string; onChat: () => void; onMore: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center bg-bg px-6 pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-3">
        {mePhoto ? <img src={mePhoto} alt="" className="size-16 rounded-full object-cover ring-2 ring-accent" /> : null}
        <Heart className="size-6 fill-heart text-heart" />
        <img src={card.photos[0]} alt="" className="size-16 rounded-full object-cover ring-2 ring-accent" />
      </div>
      <p className="world-gold-text mt-6 text-center font-display text-2xl tracking-tight">Connexion mutuelle</p>
      <p className="mt-2 text-center text-sm text-muted">{card.name} est maintenant dans tes connexions World Room.</p>
      <Button size="lg" className="world-gold mt-auto" onClick={onChat}>
        Ouvrir la conversation
      </Button>
      <button type="button" onClick={onMore} className="mt-3 h-11 text-sm text-muted">
        Retour aux Face à Face
      </button>
    </div>
  );
}

function Ended({ onMore }: { onMore: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center bg-bg px-6 pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <span className="grid size-20 place-items-center rounded-full bg-surface text-3xl">🌍</span>
      <p className="mt-5 font-display text-xl">La rencontre est terminée.</p>
      <p className="mt-2 text-center text-sm text-muted">Le monde est grand : une autre belle connexion t’attend peut-être.</p>
      <Button size="lg" className="world-gold mt-auto" onClick={onMore}>
        Retour aux Face à Face
      </Button>
    </div>
  );
}

function Thread({
  id,
  lines,
  onBack,
  onSend,
}: {
  id: string;
  lines: { id: string; from: "me" | "them"; text: string }[];
  onBack: () => void;
  onSend: (t: string) => void;
}) {
  const c = cardById(id);
  const [text, setText] = useState("");
  if (!c) return null;
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <header className="flex items-center gap-2 px-2">
        <button type="button" className="flex size-11 items-center justify-center" onClick={onBack} aria-label="Retour">
          <ArrowLeft className="size-5" />
        </button>
        <img src={c.photos[0]} alt="" className="size-9 rounded-full object-cover" />
        <div>
          <p className="text-sm">{c.name}</p>
          <p className="text-[11px] text-muted">
            {c.flag} {c.city} · Connexion mutuelle
          </p>
        </div>
      </header>
      <p className="mx-4 rounded-lg bg-surface p-2 text-[11px] leading-relaxed text-muted">Vous vous êtes dit Hello, vous vous êtes rencontrés 60 secondes et vous avez choisi de vous connecter. À vous de jouer.</p>
      <div className="no-scrollbar mt-2 min-h-0 flex-1 overflow-y-auto px-4">
        {lines.map((m) => (
          <p key={m.id} className={cn("mb-2 max-w-[80%] rounded-2xl px-3 py-2 text-sm", m.from === "me" ? "ml-auto world-gold" : "bg-surface")}>
            {m.text}
          </p>
        ))}
      </div>
      <form
        className="flex items-center gap-2 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (!v) return;
          onSend(v);
          setText("");
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Écrire…" className="h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-sm outline-none" />
        <button type="submit" className="world-gold grid size-11 place-items-center rounded-full" aria-label="Envoyer">
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}

function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40">
      <button type="button" className="absolute inset-0 bg-bg/50" onClick={onClose} aria-label="Fermer" />
      <div className="absolute inset-x-0 bottom-0 max-h-[80%] overflow-y-auto rounded-t-3xl bg-bg p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}

function Row({ chips, value, on }: { chips: [string, string][]; value: string; on: (v: string) => void }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {chips.map(([id, label]) => (
        <button key={id} type="button" onClick={() => on(id)} className={cn("h-8 rounded-full px-3 text-xs", value === id ? "world-gold" : "bg-surface-2")}>
          {label}
        </button>
      ))}
    </div>
  );
}
