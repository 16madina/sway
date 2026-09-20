import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "@/lib/utils";
import {
  EMPTY_HELLOS,
  type WorldCard,
  type WorldHelloState,
  type WorldMsg,
  type WorldProfile,
} from "@/lib/world";

type Filters = {
  see: "tous" | "hommes" | "femmes" | "lgbt";
  age: "all" | "18-24" | "25-35" | "36-45" | "46+";
  zone: "monde" | "pays" | "afrique" | "europe" | "asie";
  lang: "all" | "FR" | "EN";
  intent: "all" | WorldCard["intent"];
};

const EMPTY_FILTERS = (): Filters => ({
  see: "tous",
  age: "all",
  zone: "monde",
  lang: "all",
  intent: "all",
});

export type WorldMeet = { id: string; result: "connected" | "ended"; at: number };

type WorldState = {
  profile: WorldProfile | null;
  hellos: WorldHelloState;
  threads: Record<string, WorldMsg[]>;
  unread: Record<string, number>;
  filters: Filters;
  meets: WorldMeet[];
  saveProfile: (p: WorldProfile) => void;
  patchProfile: (p: Partial<WorldProfile>) => void;
  leaveWorld: () => void;
  setFilters: (f: Filters) => void;
  sendHello: (id: string) => void;
  cancelHello: (id: string) => void;
  ignoreHello: (id: string) => void;
  answerHello: (id: string) => void;
  connect: (id: string) => void;
  skipMeet: (id: string) => void;
  seedPending: (ids: string[]) => void;
  seedMutual: (ids: string[]) => void;
  sendWorldMsg: (id: string, text: string) => void;
  markRead: (id: string) => void;
  resetDemo: () => void;
};

export const useWorld = create<WorldState>()(
  persist(
    (set, get) => ({
      profile: null,
      hellos: EMPTY_HELLOS(),
      threads: {},
      unread: {},
      filters: EMPTY_FILTERS(),
      meets: [],
      saveProfile: (p) => set({ profile: { ...p, completed: true } }),
      patchProfile: (p) =>
        set((s) => ({ profile: s.profile ? { ...s.profile, ...p } : s.profile })),
      leaveWorld: () =>
        set({
          profile: null,
          hellos: EMPTY_HELLOS(),
          threads: {},
          unread: {},
          filters: EMPTY_FILTERS(),
          meets: [],
        }),
      setFilters: (f) => set({ filters: f }),
      sendHello: (id) =>
        set((s) => ({
          hellos: {
            ...s.hellos,
            sent: s.hellos.sent.includes(id) ? s.hellos.sent : [...s.hellos.sent, id],
          },
        })),
      cancelHello: (id) =>
        set((s) => ({ hellos: { ...s.hellos, sent: s.hellos.sent.filter((x) => x !== id) } })),
      ignoreHello: (id) =>
        set((s) => ({
          hellos: {
            ...s.hellos,
            pending: s.hellos.pending.filter((x) => x !== id),
            ignored: s.hellos.ignored.includes(id) ? s.hellos.ignored : [...s.hellos.ignored, id],
          },
        })),
      answerHello: (id) =>
        set((s) => ({
          hellos: {
            ...s.hellos,
            pending: s.hellos.pending.filter((x) => x !== id),
            sent: s.hellos.sent.filter((x) => x !== id),
            mutual: s.hellos.mutual.includes(id) ? s.hellos.mutual : [...s.hellos.mutual, id],
          },
        })),
      connect: (id) =>
        set((s) => ({
          hellos: {
            ...s.hellos,
            connections: s.hellos.connections.includes(id) ? s.hellos.connections : [...s.hellos.connections, id],
            mutual: s.hellos.mutual.filter((x) => x !== id),
          },
          meets: s.meets.some((m) => m.id === id)
            ? s.meets.map((m) => (m.id === id ? { ...m, result: "connected" as const, at: Date.now() } : m))
            : [...s.meets, { id, result: "connected" as const, at: Date.now() }],
          threads: {
            ...s.threads,
            [id]: s.threads[id] ?? [
              { id: uid("m"), from: "them", text: "Hello. Content que ça ait matché.", at: Date.now() },
            ],
          },
          unread: { ...s.unread, [id]: (s.unread[id] ?? 0) + 1 },
        })),
      skipMeet: (id) =>
        set((s) => ({
          hellos: { ...s.hellos, mutual: s.hellos.mutual.filter((x) => x !== id) },
          meets: s.meets.some((m) => m.id === id)
            ? s.meets.map((m) => (m.id === id ? { ...m, result: "ended" as const, at: Date.now() } : m))
            : [...s.meets, { id, result: "ended" as const, at: Date.now() }],
        })),
      seedPending: (ids) =>
        set((s) => ({
          hellos: {
            ...s.hellos,
            pending: [...new Set([...ids, ...s.hellos.pending])],
          },
        })),
      seedMutual: (ids) =>
        set((s) => ({
          hellos: {
            ...s.hellos,
            mutual: [...new Set([...ids, ...s.hellos.mutual])],
          },
        })),
      sendWorldMsg: (id, text) => {
        const line: WorldMsg = { id: uid("m"), from: "me", text, at: Date.now() };
        set((s) => ({ threads: { ...s.threads, [id]: [...(s.threads[id] ?? []), line] } }));
      },
      markRead: (id) => set((s) => ({ unread: { ...s.unread, [id]: 0 } })),
      resetDemo: () => {
        const p = get().profile;
        set({
          hellos: {
            ...EMPTY_HELLOS(),
            pending: p ? ["w-moussa", "w-lea"] : [],
            mutual: p ? ["w-sofia"] : [],
          },
          threads: {},
          unread: {},
          meets: [],
        });
      },
    }),
    { name: "sway-world-v1" },
  ),
);
