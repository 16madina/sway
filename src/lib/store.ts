import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ACTIVITY,
  CLIPS,
  COMMENTS,
  DEFAULT_FOLLOWED,
  ME,
  THREADS,
  USERS,
  type Activity,
  type Clip,
  type Comment,
  type Thread,
  type User,
} from "@/lib/catalog";
import { uid } from "@/lib/utils";

export type SwayState = {
  liked: string[];
  saved: string[];
  followed: string[];
  hidden: string[];
  extraComments: Record<string, Comment[]>;
  commentLikes: string[];
  me: User;
  accounts: User[];
  myClips: Clip[];
  muted: boolean;
  threads: Thread[];
  activity: Activity[];
  inboxSeen: boolean;
  like: (clipId: string) => void;
  save: (clipId: string) => void;
  follow: (userId: string) => void;
  hide: (clipId: string) => void;
  addComment: (clipId: string, text: string) => void;
  likeComment: (id: string) => void;
  setMuted: (v: boolean) => void;
  setMe: (patch: Partial<User>) => void;
  createAccount: (input: { name: string; handle: string }) => User;
  switchAccount: (id: string) => void;
  publish: (
    clip: Omit<Clip, "id" | "userId" | "createdAt" | "likes" | "comments" | "saves" | "shares">,
  ) => string;
  sendMessage: (threadId: string, text: string, clipId?: string) => void;
  addMatch: (userId: string) => string;
  markInboxSeen: () => void;
  bumpShare: (clipId: string) => void;
};

export const useSway = create<SwayState>()(
  persist(
    (set, get) => ({
      liked: [],
      saved: [],
      followed: DEFAULT_FOLLOWED,
      hidden: [],
      extraComments: {},
      commentLikes: [],
      me: ME,
      accounts: [ME],
      myClips: [],
      muted: true,
      threads: THREADS,
      activity: ACTIVITY,
      inboxSeen: false,
      like: (clipId) =>
        set((s) => ({
          liked: s.liked.includes(clipId)
            ? s.liked.filter((id) => id !== clipId)
            : [clipId, ...s.liked],
        })),
      save: (clipId) =>
        set((s) => ({
          saved: s.saved.includes(clipId)
            ? s.saved.filter((id) => id !== clipId)
            : [clipId, ...s.saved],
        })),
      follow: (userId) =>
        set((s) => ({
          followed: s.followed.includes(userId)
            ? s.followed.filter((id) => id !== userId)
            : [userId, ...s.followed],
        })),
      hide: (clipId) =>
        set((s) => ({ hidden: s.hidden.includes(clipId) ? s.hidden : [...s.hidden, clipId] })),
      addComment: (clipId, text) => {
        const c: Comment = {
          id: uid("cm"),
          userId: get().me.id,
          text,
          likes: 0,
          createdAt: Date.now(),
        };
        set((s) => ({
          extraComments: {
            ...s.extraComments,
            [clipId]: [c, ...(s.extraComments[clipId] ?? [])],
          },
        }));
      },
      likeComment: (id) =>
        set((s) => ({
          commentLikes: s.commentLikes.includes(id)
            ? s.commentLikes.filter((x) => x !== id)
            : [...s.commentLikes, id],
        })),
      setMuted: (v) => set({ muted: v }),
      setMe: (patch) =>
        set((s) => {
          const me = { ...s.me, ...patch };
          return {
            me,
            accounts: s.accounts.map((a) => (a.id === me.id ? me : a)),
          };
        }),
      createAccount: ({ name, handle }) => {
        const user: User = {
          id: uid("u"),
          name: name.trim() || "Nouveau",
          handle: handle.replace(/^@/, "").trim() || "nouveau",
          bio: "Nouveau sur Sway.",
          avatar: "",
          followers: 0,
          following: 0,
          likes: 0,
        };
        set((s) => ({
          accounts: [...s.accounts, user],
          me: user,
        }));
        return user;
      },
      switchAccount: (id) => {
        const s = get();
        const next = s.accounts.find((a) => a.id === id);
        if (next) set({ me: next });
      },
      publish: (clip) => {
        const id = uid("c");
        const me = get().me;
        const next: Clip = {
          ...clip,
          id,
          userId: me.id,
          createdAt: Date.now(),
          likes: 0,
          comments: 0,
          saves: 0,
          shares: 0,
          local: true,
        };
        set((s) => ({ myClips: [next, ...s.myClips] }));
        return id;
      },
      sendMessage: (threadId, text, clipId) =>
        set((s) => ({
          threads: s.threads.map((th) =>
            th.id !== threadId
              ? th
              : {
                  ...th,
                  preview: text,
                  time: Date.now(),
                  unread: false,
                  messages: [
                    ...th.messages,
                    { id: uid("m"), fromMe: true, text, time: Date.now(), clipId },
                  ],
                },
          ),
        })),
      addMatch: (userId) => {
        const existing = get().threads.find((t) => t.userId === userId && t.match);
        if (existing) return existing.id;
        const id = uid("th");
        set((s) => ({
          threads: [
            {
              id,
              userId,
              preview: "Match.",
              time: Date.now(),
              unread: true,
              match: true,
              messages: [
                {
                  id: uid("m"),
                  fromMe: false,
                  text: "On s’est trouvés sur Face à face.",
                  time: Date.now(),
                },
              ],
            },
            ...s.threads,
          ],
        }));
        return id;
      },
      markInboxSeen: () => set({ inboxSeen: true }),
      bumpShare: (clipId) => {
        void clipId;
        get();
      },
    }),
    {
      name: "sway-v1",
      skipHydration: true,
      partialize: (s) => ({
        liked: s.liked,
        saved: s.saved,
        followed: s.followed,
        hidden: s.hidden,
        extraComments: s.extraComments,
        commentLikes: s.commentLikes,
        me: s.me,
        accounts: s.accounts,
        myClips: s.myClips,
        muted: s.muted,
        threads: s.threads,
        inboxSeen: s.inboxSeen,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<SwayState>;
        const accounts = p.accounts?.length ? p.accounts : [p.me ?? current.me];
        return { ...current, ...p, accounts };
      },
    },
  ),
);

export function findUser(id: string): User | undefined {
  const { me, accounts } = useSway.getState();
  if (id === "me" || id === me.id) return me;
  return accounts.find((a) => a.id === id) ?? USERS[id];
}

export function allClips(): Clip[] {
  return [...useSway.getState().myClips, ...CLIPS];
}

export function getClip(id: string): Clip | undefined {
  return allClips().find((c) => c.id === id);
}

export function commentsFor(clipId: string): Comment[] {
  const extra = useSway.getState().extraComments[clipId] ?? [];
  return [...extra, ...(COMMENTS[clipId] ?? [])];
}

export function countLikes(clip: Clip) {
  const liked = useSway.getState().liked.includes(clip.id);
  return clip.likes + (liked ? 1 : 0);
}

export function countComments(clip: Clip) {
  const extra = useSway.getState().extraComments[clip.id]?.length ?? 0;
  return clip.comments + extra;
}

export function countSaves(clip: Clip) {
  const saved = useSway.getState().saved.includes(clip.id);
  return clip.saves + (saved ? 1 : 0);
}