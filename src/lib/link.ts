import { useEffect, useState } from "react";

export type LinkLevel = "good" | "weak" | "off";

type NavConn = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (type: string, fn: () => void) => void;
  removeEventListener?: (type: string, fn: () => void) => void;
};

function conn(): NavConn | undefined {
  if (typeof navigator === "undefined") return undefined;
  const n = navigator as Navigator & {
    connection?: NavConn;
    mozConnection?: NavConn;
    webkitConnection?: NavConn;
  };
  return n.connection ?? n.mozConnection ?? n.webkitConnection;
}

function netQuality(): Exclude<LinkLevel, "off"> {
  const c = conn();
  if (!c) return "good";
  const kind = c.effectiveType;
  if (kind === "slow-2g" || kind === "2g" || c.saveData) return "weak";
  if (kind === "3g") return "weak";
  if (c.downlink != null && c.downlink > 0 && c.downlink < 0.7) return "weak";
  if (c.rtt != null && c.rtt > 650) return "weak";
  return "good";
}

export function readLink(): LinkLevel {
  if (typeof navigator === "undefined") return "good";
  if (navigator.onLine === false) return "off";
  return netQuality();
}

export function useLink(): LinkLevel {
  const [online, setOnline] = useState(() => (typeof navigator === "undefined" ? true : navigator.onLine !== false));
  const [quality, setQuality] = useState<Exclude<LinkLevel, "off">>(netQuality);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    const bump = () => setQuality(netQuality());
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    const c = conn();
    c?.addEventListener?.("change", bump);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
      c?.removeEventListener?.("change", bump);
    };
  }, []);
  return online ? quality : "off";
}

export function linkLabel(level: LinkLevel, who?: string) {
  if (level === "off") return who ? `Connexion de ${who} perdue` : "Pas de réseau · reconnexion…";
  if (level === "weak") return who ? `Connexion de ${who} instable` : "Connexion instable · qualité réduite";
  return who ? `${who} est en ligne` : "Connexion stable";
}
