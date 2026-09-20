import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CLIPS, HASHTAGS, TRENDING, USERS, userById } from "@/lib/catalog";
import { useSway } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { useNav } from "@/components/nav";

export function Discover() {
  const { push } = useNav();
  const [q, setQ] = useState("");
  const [chip, setChip] = useState("Tendance");
  const me = useSway((s) => s.me);
  const myClips = useSway((s) => s.myClips);
  const query = q.trim().toLowerCase();

  const people = useMemo(() => {
    const list = Object.values(USERS);
    if (!query) return list.slice(0, 6);
    return list.filter(
      (u) =>
        u.name.toLowerCase().includes(query) || u.handle.toLowerCase().includes(query),
    );
  }, [query]);

  const clips = useMemo(() => {
    const all = [...myClips, ...CLIPS];
    let next = all;
    if (query) {
      next = all.filter(
        (c) =>
          c.caption.toLowerCase().includes(query) ||
          c.tags.some((t) => t.includes(query)) ||
          userById(c.userId, me)?.handle.toLowerCase().includes(query),
      );
    } else if (chip === "Montréal") {
      next = all.filter((c) => c.tags.some((t) => ["montreal", "mtl", "longueuil"].includes(t)));
    } else if (chip === "Cuisine") {
      next = all.filter((c) => c.tags.some((t) => ["cafe", "latteart", "pain", "levain"].includes(t)));
    } else if (chip === "Plein air") {
      next = all.filter((c) => c.tags.some((t) => ["trail", "aube", "laurentides"].includes(t)));
    } else if (chip === "Art") {
      next = all.filter((c) => c.tags.some((t) => ["ceramique", "studio", "mains"].includes(t)));
    } else if (chip === "Sport") {
      next = all.filter((c) => c.tags.some((t) => ["hoops", "skate", "beton"].includes(t)));
    }
    return next;
  }, [query, chip, myClips, me]);

  const tags = useMemo(() => {
    if (!query) return HASHTAGS;
    return HASHTAGS.filter((h) => h.tag.includes(query));
  }, [query]);

  return (
    <div className="absolute inset-0 flex flex-col bg-bg pt-[env(safe-area-inset-top)]">
      <div className="px-4 pb-3 pt-3">
        <p className="font-display text-2xl tracking-tight">Découvrir</p>
        <label className="mt-3 flex h-11 items-center gap-2 rounded-md bg-surface px-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)]">
          <Search className="size-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Comptes, sons, hashtags"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-subtle"
          />
        </label>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
        {TRENDING.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChip(c)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3.5 text-sm font-medium",
              chip === c ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-24">
        {people.length > 0 && (query || chip === "Tendance") ? (
          <section className="mb-5">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              Comptes
            </h2>
            <div className="no-scrollbar flex gap-3 overflow-x-auto">
              {people.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => push({ t: "user", userId: u.id })}
                  className="flex w-20 shrink-0 flex-col items-center gap-1.5"
                >
                  <Avatar user={u} size="lg" className="rounded-full" />
                  <span className="w-full truncate text-center text-[11px] text-muted">
                    {u.handle}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {!query ? (
          <section className="mb-5">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              Tendances
            </h2>
            <div className="flex flex-col gap-1">
              {HASHTAGS.slice(0, 4).map((h) => (
                <button
                  key={h.tag}
                  type="button"
                  onClick={() => push({ t: "tag", tag: h.tag })}
                  className="flex h-12 items-center justify-between rounded-md px-1 text-left"
                >
                  <span className="text-sm font-medium">#{h.tag}</span>
                  <span className="text-xs text-muted">{h.views} vues</span>
                </button>
              ))}
            </div>
          </section>
        ) : tags.length > 0 ? (
          <section className="mb-5">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              Hashtags
            </h2>
            {tags.map((h) => (
              <button
                key={h.tag}
                type="button"
                onClick={() => push({ t: "tag", tag: h.tag })}
                className="flex h-11 w-full items-center justify-between text-sm"
              >
                <span>#{h.tag}</span>
                <span className="text-muted">{h.views}</span>
              </button>
            ))}
          </section>
        ) : null}

        <section className="pb-6">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
            Clips
          </h2>
          {clips.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">Aucun clip pour cette recherche.</p>
          ) : (
            <div className="grid grid-cols-3 gap-0.5">
              {clips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="relative aspect-[3/4] overflow-hidden bg-surface"
                  onClick={() =>
                    push({ t: "viewer", clipId: c.id, ids: clips.map((x) => x.id) })
                  }
                >
                  <img
                    src={c.poster}
                    alt=""
                    className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
                  />
                  {c.live ? (
                    <span className="absolute left-1 top-1 rounded-xs bg-live px-1 py-px text-[9px] font-medium uppercase text-fg">
                      Live
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
