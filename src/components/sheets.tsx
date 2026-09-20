import { useMemo, useState, type ReactNode } from "react";
import {
  Bookmark,
  Check,
  Download,
  EyeOff,
  Flag,
  Heart,
  Link2,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { commentsFor, getClip, useSway } from "@/lib/store";
import { SOUNDS, userById } from "@/lib/catalog";
import { compact, timeAgo } from "@/lib/utils";
import { Avatar, Button } from "@/components/ui";
import { useNav } from "@/components/nav";

export function CommentsSheet({ clipId }: { clipId: string }) {
  const { pop } = useNav();
  const me = useSway((s) => s.me);
  const extra = useSway((s) => s.extraComments);
  const add = useSway((s) => s.addComment);
  const likeComment = useSway((s) => s.likeComment);
  const liked = useSway((s) => s.commentLikes);
  const accounts = useSway((s) => s.accounts);
  const [text, setText] = useState("");
  void extra;
  const comments = commentsFor(clipId);
  const clip = getClip(clipId);

  return (
    <div className="flex h-[min(32rem,82dvh)] flex-col">
      <p className="px-4 pb-2 text-center text-sm font-medium">
        {compact(comments.length)} commentaires
      </p>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4">
        {comments.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted">Sois le premier à commenter.</p>
        ) : (
          comments.map((c) => {
            const u = userById(c.userId, me, accounts);
            if (!u) return null;
            const on = liked.includes(c.id);
            return (
              <div key={c.id} className="flex gap-3 py-3">
                <button type="button" onClick={pop}>
                  <Avatar user={u} size="sm" className="rounded-full" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug">
                    <span className="font-medium">{u.handle}</span>{" "}
                    <span className="text-fg/90">{c.text}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-subtle">{timeAgo(c.createdAt)}</p>
                </div>
                <button
                  type="button"
                  className="flex flex-col items-center gap-0.5 text-muted"
                  onClick={() => likeComment(c.id)}
                  aria-label="Aimer"
                >
                  <Heart className={`size-4 ${on ? "fill-heart text-heart" : ""}`} />
                  <span className="text-[10px] tabular-nums">{compact(c.likes + (on ? 1 : 0))}</span>
                </button>
              </div>
            );
          })
        )}
      </div>
      <form
        className="flex items-center gap-2 border-t border-line px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (!v || !clip) return;
          add(clipId, v);
          setText("");
        }}
      >
        <Avatar user={me} size="sm" className="rounded-full" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ajouter un commentaire"
          className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
        />
        <Button type="submit" size="sm" disabled={!text.trim()}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export function ShareSheet({ clipId }: { clipId: string }) {
  const { pop, push, toast } = useNav();
  const save = useSway((s) => s.save);
  const hide = useSway((s) => s.hide);
  const sendMessage = useSway((s) => s.sendMessage);
  const bumpShare = useSway((s) => s.bumpShare);
  const saved = useSway((s) => s.saved.includes(clipId));
  const clip = getClip(clipId);
  const threads = useSway((s) => s.threads);
  const me = useSway((s) => s.me);
  const accounts = useSway((s) => s.accounts);
  const author = clip ? userById(clip.userId, me, accounts) : undefined;
  const sound = clip ? SOUNDS[clip.soundId] : undefined;
  const link = typeof window !== "undefined" ? `${window.location.origin}/?clip=${clipId}` : "";
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const people = useMemo(() => {
    const list = threads
      .map((th) => {
        const u = userById(th.userId, me, accounts);
        return u ? { th, u } : null;
      })
      .filter((x): x is { th: (typeof threads)[number]; u: NonNullable<ReturnType<typeof userById>> } => !!x);
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter(
      ({ u }) =>
        u.name.toLowerCase().includes(s) || u.handle.toLowerCase().includes(s),
    );
  }, [threads, me, accounts, q]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      bumpShare(clipId);
      toast("Lien copié");
    } catch {
      toast("Impossible de copier");
    }
  };

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Sway",
          text: clip?.caption ?? "Un clip Sway",
          url: link,
        });
        bumpShare(clipId);
        return;
      }
      await copy();
    } catch {
      /* dismissed */
    }
  };

  const download = () => {
    if (!clip?.src) {
      toast("Rien à télécharger");
      return;
    }
    const a = document.createElement("a");
    a.href = clip.src;
    a.download = `sway-${clip.id}.mp4`;
    a.click();
    toast("Téléchargement lancé");
  };

  const sendPicked = () => {
    if (!picked.length) return;
    const text = note.trim() || (clip ? clip.caption : "Clip Sway");
    for (const id of picked) sendMessage(id, text, clipId);
    bumpShare(clipId);
    const last = picked[picked.length - 1]!;
    const u = people.find((p) => p.th.id === last)?.u;
    pop();
    push({ t: "chat", threadId: last });
    toast(picked.length > 1 ? `Envoyé à ${picked.length} personnes` : `Envoyé à @${u?.handle ?? ""}`);
  };

  const toggle = (id: string) => {
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  return (
    <div className="pb-[calc(0.25rem+env(safe-area-inset-bottom))]">
      <p className="px-4 pb-3 text-center text-sm font-medium">Partager</p>

      {clip ? (
        <div className="mx-4 mb-4 flex gap-3 overflow-hidden rounded-lg bg-surface">
          <img src={clip.poster} alt="" className="h-[5.5rem] w-[4.1rem] shrink-0 object-cover" />
          <div className="min-w-0 flex-1 py-2.5 pr-3">
            <p className="line-clamp-2 text-sm leading-snug">{clip.caption}</p>
            <p className="mt-1 truncate text-[12px] text-muted">
              @{author?.handle ?? "sway"}
              {sound ? ` · ${sound.title}` : ""}
            </p>
            <p className="mt-0.5 text-[11px] text-subtle">
              {compact(clip.likes)} j’aime · {compact(clip.comments)} comm.
            </p>
          </div>
        </div>
      ) : null}

      <div className="px-4">
        <label className="flex h-11 items-center gap-2 rounded-md bg-surface-2 px-3">
          <Search className="size-4 text-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chercher un ami"
            className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
          />
        </label>
      </div>

      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-4">
        {people.length === 0 ? (
          <p className="py-3 text-sm text-muted">Aucun ami pour ce nom.</p>
        ) : (
          people.map(({ th, u }) => {
            const on = picked.includes(th.id);
            return (
              <button
                key={th.id}
                type="button"
                className="flex w-[4.25rem] shrink-0 flex-col items-center gap-1.5"
                onClick={() => toggle(th.id)}
              >
                <span className="relative">
                  <Avatar user={u} className="rounded-full" />
                  {on ? (
                    <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-accent-fg">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  ) : null}
                </span>
                <span className="w-full truncate text-center text-[11px] text-muted">
                  {u.name.split(" ")[0]}
                </span>
              </button>
            );
          })
        )}
      </div>

      {picked.length > 0 ? (
        <div className="mt-3 flex items-center gap-2 px-4">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ajouter un mot…"
            className="h-11 flex-1 rounded-md bg-surface px-3 text-sm outline-none placeholder:text-subtle"
          />
          <Button size="md" onClick={sendPicked}>
            Envoyer{picked.length > 1 ? ` (${picked.length})` : ""}
          </Button>
        </div>
      ) : null}

      {clip && !clip.live && !clip.photo ? (
        <button
          type="button"
          className="mx-4 mt-4 flex items-center gap-3 overflow-hidden rounded-lg bg-accent px-3 py-2.5 text-left text-accent-fg"
          onClick={() => {
            pop();
            push({ t: "create", duoOf: clipId });
          }}
        >
          <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-sm bg-accent-fg/15">
            <img src={clip.poster} alt="" className="absolute inset-0 size-full object-cover opacity-80" />
            <span className="absolute inset-y-0 right-0 w-1/2 bg-accent-fg/25" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="size-4" />
              Filmer un duo
            </span>
            <span className="mt-0.5 block text-[12px] text-accent-fg/70">
              Côte à côte, incrustation ou réaction avec @{author?.handle ?? "eux"}
            </span>
          </span>
        </button>
      ) : null}

      <p className="px-4 pb-2 pt-5 text-[11px] font-medium uppercase tracking-wider text-muted">
        Autres
      </p>
      <div className="grid grid-cols-3 gap-1 px-2">
        <ShareAction icon={<Share2 className="size-5" />} label="Système" onClick={() => void nativeShare()} />
        <ShareAction icon={<Link2 className="size-5" />} label="Copier" onClick={() => void copy()} />
        <ShareAction icon={<Download className="size-5" />} label="Fichier" onClick={download} />
      </div>

      <div className="mt-2 px-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <ShareRow
          icon={<Bookmark className="size-5" />}
          label={saved ? "Enregistré" : "Enregistrer"}
          onClick={() => save(clipId)}
        />
        <ShareRow
          icon={<EyeOff className="size-5" />}
          label="Pas intéressé"
          onClick={() => {
            hide(clipId);
            toast("Clip masqué");
            pop();
          }}
        />
        <ShareRow
          icon={<Flag className="size-5" />}
          label="Signaler"
          onClick={() => toast("Signalement enregistré")}
        />
      </div>
    </div>
  );
}

function ShareRow({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center gap-3 px-2 text-sm"
    >
      {icon}
      {label}
    </button>
  );
}

function ShareAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1.5 py-2">
      <span className="flex size-12 items-center justify-center rounded-md bg-surface-2">{icon}</span>
      <span className="text-[11px] text-muted">{label}</span>
    </button>
  );
}

export function SettingsSheet() {
  const { pop, toast } = useNav();
  const muted = useSway((s) => s.muted);
  const setMuted = useSway((s) => s.setMuted);
  const me = useSway((s) => s.me);
  const accounts = useSway((s) => s.accounts);
  const switchAccount = useSway((s) => s.switchAccount);
  const createAccount = useSway((s) => s.createAccount);
  const [form, setForm] = useState(false);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  return (
    <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <p className="pb-3 text-center text-sm font-medium">Réglages</p>
      <p className="pb-2 pt-1 text-xs text-muted">Comptes</p>
      <div className="mb-2 flex flex-col gap-1">
        {accounts.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => {
              switchAccount(a.id);
              toast(`Connecté en @${a.handle}`);
            }}
            className="flex h-12 items-center gap-3 border-b border-line text-left text-sm"
          >
            <Avatar user={a} size="sm" className="rounded-full" />
            <span className="min-w-0 flex-1 truncate">@{a.handle}</span>
            {a.id === me.id ? <span className="text-xs text-accent">Actif</span> : null}
          </button>
        ))}
      </div>
      {form ? (
        <div className="mb-3">
          <Field label="Nom" value={name} onChange={setName} />
          <Field label="Identifiant" value={handle} onChange={setHandle} />
          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={() => {
              if (!name.trim() && !handle.trim()) return;
              const u = createAccount({ name, handle });
              setForm(false);
              setName("");
              setHandle("");
              toast(`Compte @${u.handle} créé`);
            }}
          >
            Créer
          </Button>
        </div>
      ) : (
        <button
          type="button"
          className="mb-3 h-11 w-full rounded-md bg-surface-2 text-sm"
          onClick={() => setForm(true)}
        >
          Nouveau compte
        </button>
      )}
      <Row
        label="Son par défaut"
        value={muted ? "Coupe" : "Activé"}
        onClick={() => setMuted(!muted)}
      />
      <Row label="Lecture auto" value="Wi-Fi et données" />
      <Row label="Confidentialité" value="Public" />
      <Row label="Notifications" value="Activées" />
      <Row label="À propos" value="Sway 0.1" />
      <button
        type="button"
        className="mt-4 h-11 w-full rounded-md text-sm text-heart"
        onClick={() => {
          try {
            localStorage.removeItem("sway-v1");
          } catch {
            /* ignore */
          }
          toast("Prototype réinitialisé");
          pop();
          window.location.reload();
        }}
      >
        Réinitialiser le prototype
      </button>
    </div>
  );
}

function Row({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-between border-b border-line text-sm"
    >
      <span>{label}</span>
      <span className="text-muted">{value}</span>
    </button>
  );
}

export function EditSheet() {
  const { pop, toast } = useNav();
  const me = useSway((s) => s.me);
  const setMe = useSway((s) => s.setMe);
  const [name, setName] = useState(me.name);
  const [handle, setHandle] = useState(me.handle);
  const [bio, setBio] = useState(me.bio);

  return (
    <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <p className="pb-3 text-center text-sm font-medium">Modifier le profil</p>
      <Field label="Nom" value={name} onChange={setName} />
      <Field label="Identifiant" value={handle} onChange={setHandle} />
      <label className="mt-3 block text-xs text-muted">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
        className="mt-1 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
      />
      <Button
        size="lg"
        className="mt-4"
        onClick={() => {
          setMe({
            name: name.trim() || me.name,
            handle: handle.replace(/^@/, "").trim() || me.handle,
            bio: bio.trim(),
          });
          toast("Profil mis à jour");
          pop();
        }}
      >
        Enregistrer
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-3 block">
      <span className="text-xs text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
      />
    </label>
  );
}
