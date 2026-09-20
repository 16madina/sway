import { type ReactNode } from "react";
import { FILTERS, filterCssAt, getFilter, type FilterId } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function FilterStage({
  id,
  amount = 100,
  className,
  children,
}: {
  id?: FilterId;
  amount?: number;
  className?: string;
  children: ReactNode;
}) {
  const fx = getFilter(id);
  const amt = Math.max(0, Math.min(100, amount));
  const css = filterCssAt(fx.id, amt);
  const o = amt / 100;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ filter: css }}>
        {children}
      </div>
      {fx.wash && o > 0 ? (
        <div className={cn("pointer-events-none absolute inset-0", fx.wash)} style={{ opacity: o }} />
      ) : null}
      {fx.vignette && o > 0 ? (
        <div className="pointer-events-none absolute inset-0 fx-vignette" style={{ opacity: o }} />
      ) : null}
      {fx.grain && o > 0 ? (
        <div className="pointer-events-none absolute inset-0" style={{ opacity: o }}>
          <div
            className={cn("absolute inset-0 fx-grain", fx.grain === "heavy" && "fx-grain-heavy")}
          />
        </div>
      ) : null}
      {fx.lines && o > 0 ? (
        <div className="pointer-events-none absolute inset-0 fx-lines" style={{ opacity: o }} />
      ) : null}
    </div>
  );
}

export function FilterRail({
  value,
  onChange,
  sample,
}: {
  value: FilterId;
  onChange: (id: FilterId) => void;
  sample: string;
}) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
      {FILTERS.map((f) => {
        const on = f.id === getFilter(value).id;
        return (
          <button key={f.id} type="button" onClick={() => onChange(f.id)} className="w-[4.25rem] shrink-0">
            <span
              className={cn(
                "block size-[4.25rem] overflow-hidden rounded-full transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                on
                  ? "scale-100 shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]"
                  : "scale-[0.86] shadow-[0_0_0_1px_rgb(242_238_230_/_0.14)]",
              )}
            >
              <FilterStage id={f.id} className="size-full">
                <img src={sample} alt="" className="absolute inset-0 size-full object-cover" />
              </FilterStage>
            </span>
            <span className={cn("mt-1.5 block truncate text-center text-[11px]", on ? "text-fg" : "text-muted")}>
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function FilterAmount({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-5">
      <span className="w-8 text-[11px] text-muted">FX</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label="Intensité du filtre"
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-fg/20 accent-accent"
      />
      <span className="w-8 text-right text-[11px] tabular-nums text-muted">{value}</span>
    </div>
  );
}

export function cycleFilter(current: FilterId, dir: 1 | -1): FilterId {
  const i = FILTERS.findIndex((f) => f.id === getFilter(current).id);
  const next = (i + dir + FILTERS.length) % FILTERS.length;
  return FILTERS[next]!.id;
}
