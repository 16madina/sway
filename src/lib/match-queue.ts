import {
  WORLD_CARDS,
  type WorldCard,
  type WorldIntent,
  type WorldProfile,
} from "@/lib/world";

export type FaceSeek = "tous" | "hommes" | "femmes" | "lgbt";

export type FaceHellos = {
  mutual: string[];
  sent: string[];
  pending: string[];
};

export type FaceQueueInput = {
  me: WorldProfile;
  seek: FaceSeek;
  blocked: string[];
  preferred?: WorldCard | null;
  hellos?: FaceHellos;
};

const SEEK_GENDER: Record<Exclude<FaceSeek, "tous" | "lgbt">, WorldCard["gender"]> = {
  hommes: "homme",
  femmes: "femme",
};

function passesSeek(card: WorldCard, seek: FaceSeek) {
  if (seek === "tous") return true;
  if (seek === "lgbt") return card.gender === "autre";
  return card.gender === SEEK_GENDER[seek];
}

function myAge(me: WorldProfile) {
  const n = Number.parseInt(me.age, 10);
  return Number.isFinite(n) ? n : null;
}

function intentOverlap(me: WorldProfile, card: WorldCard) {
  if (!me.intentions.length) return card.intent === "peu-importe";
  if (me.intentions.includes("peu-importe") || card.intent === "peu-importe") return true;
  return me.intentions.includes(card.intent as WorldIntent);
}

function langOverlap(me: WorldProfile, card: WorldCard) {
  if (!me.languages.length) return card.languages.some((l) => l === "Français" || l === "English");
  return me.languages.some((l) => card.languages.includes(l));
}

/** Score 0–100, jamais montré. Sert uniquement à l’ordre de la file. */
export function scoreFaceCard(card: WorldCard, input: FaceQueueInput): number {
  const { me, hellos } = input;
  let n = 0;

  if (hellos?.mutual.includes(card.id)) n += 25;
  else if (hellos?.pending.includes(card.id) || hellos?.sent.includes(card.id)) n += 18;

  if (intentOverlap(me, card)) n += 20;
  if (langOverlap(me, card)) n += 15;

  if (me.country && card.country === me.country) n += 15;
  else if (me.country) {
    const africa = ["Sénégal", "Côte d'Ivoire", "Cameroun", "Maroc"];
    if (africa.includes(me.country) && card.zone === "afrique") n += 10;
  }

  if (card.online) n += 15;

  const age = myAge(me);
  if (age != null) {
    const d = Math.abs(card.age - age);
    if (d <= 5) n += 10;
    else if (d <= 12) n += 5;
  }

  return Math.min(100, n);
}

export function rankFaceQueue(input: FaceQueueInput): WorldCard[] {
  const blocked = new Set(input.blocked);
  return WORLD_CARDS.filter((c) => !blocked.has(c.id) && passesSeek(c, input.seek))
    .map((card) => ({ card, score: scoreFaceCard(card, input) }))
    .sort((a, b) => b.score - a.score || a.card.distanceKm - b.card.distanceKm)
    .map((x) => x.card);
}

/** Premier de la file. Si un profil est déjà choisi (Hello / Commencer), il gagne. */
export function pickFaceOpponent(input: FaceQueueInput): WorldCard | null {
  if (input.preferred && !input.blocked.includes(input.preferred.id) && passesSeek(input.preferred, input.seek)) {
    return input.preferred;
  }
  return rankFaceQueue(input)[0] ?? null;
}
