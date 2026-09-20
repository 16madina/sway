import { type ReactNode } from "react";
import type { DuoLayout } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const DUO_LAYOUTS: { id: DuoLayout; label: string; hint: string }[] = [
  { id: "split", label: "Côte à côte", hint: "Deux cadres égaux" },
  { id: "stack", label: "Haut / bas", hint: "L’un au-dessus de l’autre" },
  { id: "pip", label: "Incrustation", hint: "L’original en pastille" },
  { id: "react", label: "Réaction", hint: "Tu regardes, tu réponds" },
];

export function duoLabel(id: DuoLayout) {
  return DUO_LAYOUTS.find((l) => l.id === id)?.label ?? "Duo";
}

function Pane({
  children,
  name,
  className,
  align = "start",
}: {
  children: ReactNode;
  name?: string;
  className?: string;
  align?: "start" | "end";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bg", className)}>
      {children}
      {name ? (
        <span
          className={cn(
            "pointer-events-none absolute top-2 z-[1] rounded-xs bg-bg/65 px-1.5 py-0.5 text-[10px] font-medium",
            align === "end" ? "right-2" : "left-2",
          )}
        >
          {name}
        </span>
      ) : null}
    </div>
  );
}

export function DuoFrame({
  layout,
  swap = false,
  original,
  self,
  originalName = "Original",
  selfName = "Toi",
  className,
}: {
  layout: DuoLayout;
  swap?: boolean;
  original: ReactNode;
  self: ReactNode;
  originalName?: string;
  selfName?: string;
  className?: string;
}) {
  if (layout === "pip") {
    const bg = swap ? original : self;
    const card = swap ? self : original;
    const bgName = swap ? originalName : selfName;
    const cardName = swap ? selfName : originalName;
    return (
      <div className={cn("relative", className)}>
        <Pane name={bgName} className="absolute inset-0">
          {bg}
        </Pane>
        <Pane
          name={cardName}
          className="absolute left-3 top-3 z-[1] h-[30%] w-[34%] overflow-hidden rounded-md shadow-[0_8px_24px_rgb(0_0_0_/_0.45),0_0_0_1px_rgb(242_238_230_/_0.22)]"
        >
          {card}
        </Pane>
      </div>
    );
  }

  if (layout === "react") {
    const top = swap ? self : original;
    const bot = swap ? original : self;
    const topName = swap ? selfName : originalName;
    const botName = swap ? originalName : selfName;
    return (
      <div className={cn("relative flex flex-col", className)}>
        <Pane name={topName} className="h-[38%] w-full">
          {top}
        </Pane>
        <span className="h-px w-full bg-fg/20" />
        <Pane name={botName} className="min-h-0 flex-1" align="end">
          {bot}
        </Pane>
      </div>
    );
  }

  const stack = layout === "stack";
  const a = swap ? self : original;
  const b = swap ? original : self;
  const aName = swap ? selfName : originalName;
  const bName = swap ? originalName : selfName;
  return (
    <div className={cn("relative flex", stack ? "flex-col" : "flex-row", className)}>
      <Pane name={aName} className={stack ? "h-1/2 w-full" : "h-full w-1/2"}>
        {a}
      </Pane>
      <span className={cn("bg-fg/20", stack ? "h-px w-full" : "h-full w-px")} />
      <Pane name={bName} className={stack ? "h-1/2 w-full" : "h-full w-1/2"} align="end">
        {b}
      </Pane>
    </div>
  );
}

export function LayoutPicker({
  value,
  onChange,
  poster,
}: {
  value: DuoLayout;
  onChange: (id: DuoLayout) => void;
  poster: string;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {DUO_LAYOUTS.map((l) => {
        const on = l.id === value;
        return (
          <button key={l.id} type="button" onClick={() => onChange(l.id)} className="min-w-0">
            <LayoutThumb layout={l.id} poster={poster} active={on} />
            <span
              className={cn(
                "mt-1.5 block truncate text-center text-[10px] font-medium",
                on ? "text-fg" : "text-muted",
              )}
            >
              {l.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function LayoutThumb({
  layout,
  poster,
  active,
}: {
  layout: DuoLayout;
  poster: string;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        "relative block aspect-[9/16] w-full overflow-hidden rounded-md bg-surface-2 transition-[box-shadow] duration-200",
        active
          ? "shadow-[0_0_0_2px_var(--color-accent)]"
          : "shadow-[0_0_0_1px_rgb(242_238_230_/_0.12)]",
      )}
    >
      {layout === "split" ? (
        <span className="flex h-full">
          <img src={poster} alt="" className="h-full w-1/2 object-cover" />
          <span className="w-px bg-fg/20" />
          <span className="flex w-1/2 items-center justify-center bg-accent/20 text-[8px] font-medium text-accent">
            Toi
          </span>
        </span>
      ) : layout === "stack" ? (
        <span className="flex h-full flex-col">
          <img src={poster} alt="" className="h-1/2 w-full object-cover" />
          <span className="h-px bg-fg/20" />
          <span className="flex flex-1 items-center justify-center bg-accent/20 text-[8px] font-medium text-accent">
            Toi
          </span>
        </span>
      ) : layout === "pip" ? (
        <span className="absolute inset-0 flex items-end justify-center bg-accent/20 pb-1 text-[8px] font-medium text-accent">
          Toi
          <img
            src={poster}
            alt=""
            className="absolute left-0.5 top-0.5 h-[30%] w-[34%] rounded-sm object-cover shadow-[0_0_0_1px_rgb(242_238_230_/_0.3)]"
          />
        </span>
      ) : (
        <span className="flex h-full flex-col">
          <img src={poster} alt="" className="h-[38%] w-full object-cover" />
          <span className="flex flex-1 items-center justify-center bg-accent/20 text-[8px] font-medium text-accent">
            Toi
          </span>
        </span>
      )}
    </span>
  );
}
