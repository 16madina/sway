import { Wifi, WifiOff } from "lucide-react";
import { m } from "motion/react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type LinkLevel, linkLabel } from "@/lib/link";

export function SignalBars({ level, className }: { level: LinkLevel; className?: string }) {
  const n = level === "good" ? 4 : level === "weak" ? 2 : 0;
  return (
    <span className={cn("link-bars", level === "off" && "is-off", className)} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <i key={i} className={i < n ? "is-on" : undefined} />
      ))}
    </span>
  );
}

export function LinkChip({ level, who }: { level: LinkLevel; who?: string }) {
  if (level === "good") return null;
  const off = level === "off";
  return (
    <p className={cn("link-chip", off ? "is-off" : "is-weak")} role="status">
      {off ? <WifiOff className="size-3.5" /> : <Wifi className="size-3.5" />}
      <span className="min-w-0 truncate">{linkLabel(level, who)}</span>
      <SignalBars level={level} />
    </p>
  );
}

export function LinkBanner({ level, who, className }: { level: LinkLevel; who?: string; className?: string }) {
  if (level === "good") return null;
  return (
    <div className={cn("pointer-events-none absolute inset-x-3 z-[60]", className)}>
      <LinkChip level={level} who={who} />
    </div>
  );
}

export function SeatHold({ name, hold, weak }: { name: string; hold?: boolean; weak?: boolean }) {
  if (!hold && !weak) return null;
  return (
    <div className={cn("face-seat-veil", hold ? "is-hold" : "is-weak")}>
      {hold ? <WifiOff className="size-5 text-fg" /> : <Wifi className="size-4 text-accent" />}
      <p className="mt-1 text-center text-[10px] font-medium leading-tight">
        {hold ? `Reconnexion…` : "Qualité réduite"}
      </p>
      {hold ? <p className="mt-0.5 text-center text-[9px] text-muted">{name} revient</p> : null}
    </div>
  );
}

export function LinkLost({
  name,
  onRetry,
  onQuit,
}: {
  name: string;
  onRetry: () => void;
  onQuit: () => void;
}) {
  return (
    <m.div
      key="lost"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-[55] flex flex-col items-center bg-bg/92 px-6 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <span className="grid size-14 place-items-center rounded-full bg-surface ring-1 ring-fg/12">
        <WifiOff className="size-6 text-accent" />
      </span>
      <p className="mt-4 font-display text-2xl">Connexion perdue</p>
      <p className="mt-2 text-center text-sm text-muted">
        {name} n’est plus en ligne. Tes réponses sont conservées. On peut réessayer.
      </p>
      <Button size="lg" className="world-gold mt-auto" onClick={onRetry}>
        Réessayer
      </Button>
      <button type="button" className="mt-3 h-11 text-sm text-muted" onClick={onQuit}>
        Quitter
      </button>
    </m.div>
  );
}
