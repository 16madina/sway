import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type Tab = "home" | "discover" | "inbox" | "profile";
export type FeedKind = "fyp" | "following" | "live";

export type Overlay =
  | { t: "comments"; clipId: string }
  | { t: "share"; clipId: string }
  | { t: "user"; userId: string }
  | { t: "sound"; soundId: string }
  | { t: "tag"; tag: string }
  | { t: "live"; clipId: string }
  | { t: "create"; duoOf?: string }
  | { t: "hub" }
  | { t: "settings" }
  | { t: "edit" }
  | { t: "chat"; threadId: string }
  | { t: "viewer"; clipId: string; ids: string[] };

type NavValue = {
  tab: Tab;
  setTab: (t: Tab) => void;
  feed: FeedKind;
  setFeed: (f: FeedKind) => void;
  stack: Overlay[];
  push: (o: Overlay) => void;
  pop: () => void;
  replace: (o: Overlay) => void;
  toast: (s: string) => void;
  notice: string | null;
};

const NavCtx = createContext<NavValue | null>(null);

export function useNav() {
  const v = useContext(NavCtx);
  if (!v) throw new Error("useNav");
  return v;
}

export function NavProvider({ children }: { children: ReactNode }) {
  const [tab, setTabState] = useState<Tab>("home");
  const [feed, setFeed] = useState<FeedKind>("fyp");
  const [stack, setStack] = useState<Overlay[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const hide = useRef<number | null>(null);

  const setTab = useCallback((t: Tab) => {
    setTabState(t);
    setStack([]);
  }, []);

  const push = useCallback((o: Overlay) => setStack((s) => [...s, o]), []);
  const pop = useCallback(() => setStack((s) => s.slice(0, -1)), []);
  const replace = useCallback((o: Overlay) => setStack((s) => [...s.slice(0, -1), o]), []);

  const toast = useCallback((s: string) => {
    setNotice(s);
    if (hide.current) window.clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setNotice(null), 1800);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") pop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pop]);

  const value: NavValue = {
    tab,
    setTab,
    feed,
    setFeed,
    stack,
    push,
    pop,
    replace,
    toast,
    notice,
  };

  return <NavCtx.Provider value={value}>{children}</NavCtx.Provider>;
}

export function isSheet(o: Overlay) {
  return o.t === "comments" || o.t === "share" || o.t === "settings" || o.t === "edit";
}

export function Layer({
  open,
  variant,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  variant: "push" | "sheet" | "glass";
  onClose?: () => void;
  children: ReactNode;
  labelledBy?: string;
}) {
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setPresent(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setShown(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = window.setTimeout(() => setPresent(false), 280);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!present) return null;

  const sheet = variant === "sheet";
  const glass = variant === "glass";

  return (
    <div className="absolute inset-0 z-50" role="presentation">
      {sheet || glass ? (
      <button
        type="button"
        aria-label="Fermer"
        className={cn(
          "absolute inset-0 bg-bg/40 backdrop-blur-md transition-opacity duration-200 ease-out",
          shown ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      ) : null}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onTouchStart={(e) => {
          if (!sheet && !glass && e.touches[0] && e.touches[0].clientX < 28) {
            startX.current = e.touches[0].clientX;
          }
        }}
        onTouchEnd={(e) => {
          if (startX.current != null) {
            const x = e.changedTouches[0]?.clientX ?? 0;
            if (x - startX.current > 72) onClose?.();
          }
          startX.current = null;
        }}
        className={cn(
          "absolute text-fg will-change-transform",
          sheet
            ? "inset-x-0 bottom-0 max-h-[88%] overflow-y-auto rounded-t-xl bg-bg no-scrollbar"
            : glass
              ? "inset-0 bg-transparent"
              : "inset-0 bg-bg",
          "transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          sheet
            ? shown
              ? "translate-y-0"
              : "translate-y-full"
            : glass
              ? shown
                ? "translate-y-0"
                : "-translate-y-8"
              : shown
                ? "translate-x-0"
                : "translate-x-full",
        )}
      >
        {sheet ? (
          <div className="flex justify-center pt-2 pb-1" aria-hidden>
            <span className="h-1 w-10 rounded-full bg-fg/20" />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
