import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compact(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v.toFixed(v >= 10 || v <= -10 ? 0 : 1).replace(".", ",")} M`;
  }
  if (abs >= 1_000) {
    const v = n / 1_000;
    return `${v.toFixed(v >= 10 || v <= -10 ? 0 : 1).replace(".", ",")} k`;
  }
  return n.toLocaleString("fr-FR");
}

export function timeAgo(value: number) {
  const elapsed = value > 1e11 ? Date.now() - value : value;
  const s = Math.max(0, Math.floor(elapsed / 1000));
  if (s < 45) return "à l’instant";
  if (s < 3600) return `${Math.floor(s / 60)} min`;
  if (s < 86400) return `${Math.floor(s / 3600)} h`;
  const d = Math.floor(s / 86400);
  return `${d} j`;
}

export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
