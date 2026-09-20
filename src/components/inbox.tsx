import { useState } from "react";
import { ACTIVITY, userById } from "@/lib/catalog";
import { getClip, useSway } from "@/lib/store";
import { cn, timeAgo } from "@/lib/utils";
import { Avatar, Button, ScreenHeader } from "@/components/ui";
import { useNav } from "@/components/nav";

export function Inbox() {
  const [seg, setSeg] = useState<"activity" | "messages" | "matchs">("activity");
  const threads = useSway((s) => s.threads);
  const me = useSway((s) => s.me);
  const { push } = useNav();
  const listed = seg === "matchs" ? threads.filter((t) => t.match) : threads;

  return (
    <div className="absolute inset-0 flex flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <div className="px-4 pt-3">
        <p className="font-display text-2xl tracking-tight">Boîte</p>
        <div className="mt-3 flex rounded-md bg-surface p-1">
          {(
            [
              ["activity", "Activité"],
              ["messages", "Messages"],
              ["matchs", "Matchs"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => setSeg(k)}
              className={cn(
                "h-9 flex-1 rounded-sm text-sm font-medium",
                seg === k ? "bg-surface-2 text-fg" : "text-muted",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar mt-2 min-h-0 flex-1 overflow-y-auto pb-24">
        {seg === "activity" ? (
          ACTIVITY.map((a) => {
            const u = a.userId ? userById(a.userId, me) : undefined;
            return (
              <button
                key={a.id}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
                onClick={() => {
                  if (a.clipId) push({ t: "viewer", clipId: a.clipId, ids: [a.clipId] });
                  else if (a.userId) push({ t: "user", userId: a.userId });
                }}
              >
                {u ? (
                  <Avatar user={u} />
                ) : (
                  <span className="flex size-11 items-center justify-center rounded-md bg-surface-2 font-display text-accent">
                    S
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">
                    {u ? <span className="font-medium">{u.name} </span> : null}
                    <span className="text-muted">{a.text}</span>
                  </span>
                  <span className="text-xs text-subtle">{timeAgo(a.time)}</span>
                </span>
              </button>
            );
          })
        ) : listed.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">
            {seg === "matchs" ? "Aucun match. Dis Hello dans World Room." : "Pas encore de messages."}
          </p>
        ) : (
          listed.map((th) => {
            const u = userById(th.userId, me);
            if (!u) return null;
            return (
              <button
                key={th.id}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
                onClick={() => push({ t: "chat", threadId: th.id })}
              >
                <Avatar user={u} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{u.name}</span>
                    <span className="text-xs text-subtle">{timeAgo(th.time)}</span>
                  </span>
                  <span className="block truncate text-sm text-muted">{th.preview}</span>
                </span>
                {th.match ? (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-fg">
                    Match
                  </span>
                ) : th.unread ? (
                  <span className="size-2 rounded-full bg-accent" />
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export function Chat({ threadId }: { threadId: string }) {
  const { pop, push } = useNav();
  const thread = useSway((s) => s.threads.find((t) => t.id === threadId));
  const send = useSway((s) => s.sendMessage);
  const me = useSway((s) => s.me);
  const [text, setText] = useState("");
  const u = thread ? userById(thread.userId, me) : undefined;

  if (!thread || !u) {
    return (
      <div className="flex h-full flex-col bg-bg">
        <ScreenHeader title="Message" onBack={pop} />
        <p className="p-6 text-sm text-muted">Conversation introuvable.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-bg">
      <ScreenHeader title={u.name} onBack={pop} />
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-3">
        {thread.messages.map((m) => {
          const shared = m.clipId ? getClip(m.clipId) : undefined;
          return (
            <div
              key={m.id}
              className={cn(
                "max-w-[80%] overflow-hidden rounded-lg text-sm leading-snug",
                m.fromMe ? "ml-auto bg-accent text-accent-fg" : "bg-surface-2 text-fg",
              )}
            >
              {shared ? (
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => push({ t: "viewer", clipId: shared.id, ids: [shared.id] })}
                >
                  <img src={shared.poster} alt="" className="h-36 w-full object-cover" />
                  <span className="block px-3 py-2">
                    <span className="line-clamp-2">{shared.caption}</span>
                    {m.text && m.text !== shared.caption ? (
                      <span className="mt-1 block text-[12px] opacity-80">{m.text}</span>
                    ) : null}
                  </span>
                </button>
              ) : (
                <p className="px-3 py-2">{m.text}</p>
              )}
            </div>
          );
        })}
      </div>
      <form
        className="flex gap-2 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (!v) return;
          send(thread.id, v);
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
          className="h-11 flex-1 rounded-md bg-surface px-3 text-sm outline-none placeholder:text-subtle"
        />
        <Button type="submit" size="md">
          Envoyer
        </Button>
      </form>
    </div>
  );
}
