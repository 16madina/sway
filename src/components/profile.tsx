import { useState, type ReactNode } from "react";
import { Bookmark, Grid3x3, Heart, Settings } from "lucide-react";
import { CLIPS, clipsByUser, userById } from "@/lib/catalog";
import { useSway } from "@/lib/store";
import { compact, cn } from "@/lib/utils";
import { Avatar, Button, ScreenHeader } from "@/components/ui";
import { useNav } from "@/components/nav";

export function ProfileHome() {
  const { push } = useNav();
  const me = useSway((s) => s.me);
  return (
    <ProfileBody
      userId={me.id}
      headerRight={
        <button
          type="button"
          className="flex size-11 items-center justify-center"
          aria-label="Réglages"
          onClick={() => push({ t: "settings" })}
        >
          <Settings className="size-5" />
        </button>
      }
      self
    />
  );
}

export function UserScreen({ userId }: { userId: string }) {
  const { pop } = useNav();
  const u = userById(userId, useSway.getState().me, useSway.getState().accounts);
  return (
    <div className="flex h-full flex-col bg-bg">
      <ScreenHeader title={u?.handle ? `@${u.handle}` : "Profil"} onBack={pop} />
      <ProfileBody userId={userId} />
    </div>
  );
}

function ProfileBody({
  userId,
  headerRight,
  self,
}: {
  userId: string;
  headerRight?: ReactNode;
  self?: boolean;
}) {
  const { push } = useNav();
  const me = useSway((s) => s.me);
  const followed = useSway((s) => s.followed);
  const follow = useSway((s) => s.follow);
  const liked = useSway((s) => s.liked);
  const saved = useSway((s) => s.saved);
  const myClips = useSway((s) => s.myClips);
  const user = userById(userId, me, useSway.getState().accounts);
  const [pane, setPane] = useState<"clips" | "liked" | "saved">("clips");

  if (!user) return <p className="p-6 text-sm text-muted">Profil introuvable.</p>;

  const theirs = clipsByUser(userId, myClips);
  const likedClips = CLIPS.filter((c) => liked.includes(c.id));
  const savedClips = [...myClips, ...CLIPS].filter((c) => saved.includes(c.id));
  const grid = pane === "clips" ? theirs : pane === "liked" ? likedClips : savedClips;
  const isMe = userId === me.id || userId === "me" || self;
  const isFollowed = followed.includes(user.id);

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", isMe && "absolute inset-0 bg-bg pt-[env(safe-area-inset-top)]")}>
      {isMe ? (
        <div className="flex h-12 items-center justify-between px-4">
          <p className="font-medium">@{user.handle}</p>
          {headerRight}
        </div>
      ) : null}

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col items-center px-6 pt-2">
          <Avatar user={user} size="xl" className="rounded-full" />
          <h2 className="mt-3 font-display text-xl tracking-tight">{user.name}</h2>
          <p className="text-sm text-muted">@{user.handle}</p>
          {user.location ? <p className="mt-1 text-xs text-subtle">{user.location}</p> : null}
          <p className="mt-2 max-w-xs text-center text-sm leading-snug text-fg/90">{user.bio}</p>

          <div className="mt-4 flex w-full max-w-xs justify-between">
            <Stat n={isMe ? followed.length : user.following} l="Suivis" />
            <Stat n={user.followers + (isFollowed && !isMe ? 1 : 0)} l="Abonnés" />
            <Stat n={user.likes} l="J’aime" />
          </div>

          <div className="mt-4 flex w-full gap-2">
            {isMe ? (
              <>
                <Button variant="ghost" className="flex-1" onClick={() => push({ t: "edit" })}>
                  Modifier
                </Button>
                <Button
                  variant="line"
                  className="flex-1"
                  onClick={async () => {
                    const url = window.location.href;
                    try {
                      await navigator.clipboard.writeText(url);
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  Partager
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={isFollowed ? "ghost" : "primary"}
                  className="flex-1"
                  onClick={() => follow(user.id)}
                >
                  {isFollowed ? "Abonné" : "Suivre"}
                </Button>
                <Button
                  variant="line"
                  className="flex-1"
                  onClick={() => {
                    const th = useSway.getState().threads.find((t) => t.userId === user.id);
                    if (th) push({ t: "chat", threadId: th.id });
                    else push({ t: "chat", threadId: "th-maya" });
                  }}
                >
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 flex border-t border-line">
          {(
            [
              ["clips", Grid3x3, "Clips"],
              ["liked", Heart, "J’aime"],
              ["saved", Bookmark, "Sauvés"],
            ] as const
          ).map(([k, Icon, label]) => (
            <button
              key={k}
              type="button"
              aria-label={label}
              onClick={() => setPane(k)}
              className={cn(
                "flex h-12 flex-1 items-center justify-center",
                pane === k ? "text-fg" : "text-subtle",
              )}
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>

        {grid.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted">
            {pane === "clips"
              ? isMe
                ? "Publie ton premier clip avec le bouton +"
                : "Aucun clip pour l’instant."
              : "Rien ici pour le moment."}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-px bg-line">
            {grid.map((c) => (
              <button
                key={c.id}
                type="button"
                className="relative aspect-[3/4] bg-surface"
                onClick={() =>
                  push({ t: "viewer", clipId: c.id, ids: grid.map((x) => x.id) })
                }
              >
                <img src={c.poster} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base font-medium tabular-nums">{compact(n)}</span>
      <span className="text-[11px] text-muted">{l}</span>
    </div>
  );
}
