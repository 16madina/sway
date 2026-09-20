import { ChevronRight, ImagePlus } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const TICKETS = ["1", "3", "5", "10"] as const;

export function SetupProgress({ step }: { step: 1 | 2 }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="kind-bar h-1 flex-1 rounded-full" />
      <span className={cn("h-1 flex-1 rounded-full", step === 2 ? "kind-bar" : "bg-surface-2")} />
      <span className="text-[10px] font-medium tracking-wide text-muted">{step}/2</span>
    </div>
  );
}

export function SetupSec({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="mt-3 rounded-lg bg-surface p-3">
      <h2 className="text-sm font-medium">
        <span className="kind-ink">{n}.</span> {title}
      </h2>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

export function SetupChoice({
  on,
  icon,
  title,
  line,
  onClick,
}: {
  on: boolean;
  icon: ReactNode;
  title: string;
  line: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-md p-3 text-left ring-1",
        on ? "ring-[color:var(--kind,var(--color-accent))]/60 bg-[color:color-mix(in_srgb,var(--kind,var(--color-accent))_12%,transparent)]" : "bg-bg ring-line",
      )}
    >
      <span className={cn("flex items-center gap-1.5 text-sm font-medium", on ? "kind-ink" : "")}>
        {icon}
        {title}
      </span>
      <p className="mt-1 text-[11px] leading-snug text-muted">{line}</p>
    </button>
  );
}

export function SetupChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("h-8 rounded-full px-3 text-xs font-medium", on ? "bg-fg text-bg" : "bg-surface-2 text-fg")}>
      {children}
    </button>
  );
}

export function SetupRecap({ icon, label, value, onClick }: { icon: ReactNode; label: string; value: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-lg bg-surface px-3 py-3 text-left">
      <span className="kind-ink flex size-8 items-center justify-center rounded-md bg-bg">{icon}</span>
      <span className="text-xs text-muted">{label}</span>
      <span className="min-w-0 flex-1 truncate text-right text-sm">{value}</span>
      <ChevronRight className="size-4 shrink-0 text-muted" />
    </button>
  );
}

export function SetupToggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-11 w-full items-center justify-between text-sm">
      <span>{label}</span>
      <span className={cn("rounded-full px-2 py-0.5 text-xs", on ? "bg-fg text-bg" : "bg-surface-2 text-muted")}>{on ? "Oui" : "Non"}</span>
    </button>
  );
}

export function CoverPick({ covers, value, onPick }: { covers: string[]; value: string; onPick: (src: string) => void }) {
  const file = useRef<HTMLInputElement>(null);
  const custom = value.startsWith("blob:") || !covers.includes(value);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {covers.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => onPick(src)}
            className={cn(
              "h-16 w-12 overflow-hidden rounded-sm outline outline-1 -outline-offset-1 outline-fg/10",
              value === src ? "shadow-[0_0_0_2px_var(--kind,var(--color-accent))]" : "opacity-70",
            )}
          >
            <img src={src} alt="" className="size-full object-cover" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => file.current?.click()}
          className={cn(
            "relative flex h-16 w-12 flex-col items-center justify-center overflow-hidden rounded-sm bg-bg outline outline-1 -outline-offset-1 outline-fg/15",
            custom ? "shadow-[0_0_0_2px_var(--kind,var(--color-accent))]" : "text-muted",
          )}
          aria-label="Ajouter ta photo"
        >
          {custom ? <img src={value} alt="" className="size-full object-cover" /> : <ImagePlus className="size-5" />}
        </button>
      </div>
      <input
        ref={file}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          onPick(URL.createObjectURL(f));
          e.currentTarget.value = "";
        }}
      />
      <p className="mt-2 text-[11px] text-muted">Ou ajoute ta photo en couverture.</p>
    </div>
  );
}
