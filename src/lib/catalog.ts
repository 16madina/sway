export type User = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  location?: string;
};

export type DuoLayout = "split" | "stack" | "pip" | "react";

export type FilterId =
  | "none"
  | "noir"
  | "chaud"
  | "ambre"
  | "film"
  | "glace"
  | "givre"
  | "fade"
  | "vif"
  | "nuit"
  | "poussiere"
  | "chrome";

export type FilterDef = {
  id: FilterId;
  label: string;
  css: string;
  wash?: string;
  vignette?: boolean;
  grain?: "soft" | "heavy";
  lines?: boolean;
};

export const FILTERS: FilterDef[] = [
  { id: "none", label: "Origine", css: "none" },
  { id: "noir", label: "Noir", css: "grayscale(1) contrast(1.18)", grain: "soft" },
  {
    id: "ambre",
    label: "Ambre",
    css: "sepia(0.48) saturate(1.28) contrast(1.08) brightness(1.04)",
    wash: "bg-accent/35 mix-blend-overlay",
    vignette: true,
  },
  {
    id: "film",
    label: "16 mm",
    css: "contrast(1.32) saturate(0.68) brightness(0.94) sepia(0.12)",
    grain: "heavy",
    lines: true,
    vignette: true,
  },
  {
    id: "givre",
    label: "Givre",
    css: "saturate(0.48) brightness(1.1) contrast(1.06)",
    wash: "bg-fg/25 mix-blend-soft-light",
  },
  {
    id: "fade",
    label: "Fade",
    css: "contrast(0.82) brightness(1.14) saturate(0.62)",
    wash: "bg-fg/30 mix-blend-soft-light",
  },
  { id: "vif", label: "Vif", css: "saturate(1.62) contrast(1.16) brightness(1.05)" },
  {
    id: "nuit",
    label: "Nuit",
    css: "brightness(0.76) saturate(0.78) contrast(1.22)",
    wash: "bg-bg/50 mix-blend-multiply",
    vignette: true,
  },
  {
    id: "poussiere",
    label: "Poussière",
    css: "contrast(1.16) sepia(0.22) brightness(0.96) saturate(0.9)",
    grain: "heavy",
    vignette: true,
  },
  {
    id: "chrome",
    label: "Chrome",
    css: "grayscale(0.45) contrast(1.42) brightness(1.08) saturate(0.62)",
    wash: "bg-fg/15 mix-blend-overlay",
  },
];

const FILTER_ALIAS: Record<string, FilterId> = { chaud: "ambre", glace: "givre" };

export function getFilter(id?: FilterId | string): FilterDef {
  const resolved = (id && FILTER_ALIAS[id]) || id;
  return FILTERS.find((f) => f.id === resolved) ?? FILTERS[0]!;
}

const FILTER_IDENTITY: Record<string, number> = {
  grayscale: 0,
  sepia: 0,
  saturate: 1,
  contrast: 1,
  brightness: 1,
  invert: 0,
};

export function filterCssAt(id?: FilterId | string, amount = 100): string {
  const css = getFilter(id).css;
  if (css === "none" || amount >= 100) return css;
  if (amount <= 0) return "none";
  const t = amount / 100;
  return css.replace(/([a-z-]+)\((-?[\d.]+)(%|deg|px)?\)/g, (_, name: string, num: string, unit?: string) => {
    const identity = FILTER_IDENTITY[name] ?? 0;
    const mixed = identity + (parseFloat(num) - identity) * t;
    return `${name}(${mixed}${unit ?? ""})`;
  });
}

export function filterCss(id?: FilterId) {
  return getFilter(id).css;
}

export const SPEEDS = [0.5, 1, 2, 3] as const;

export type Sound = {
  id: string;
  title: string;
  artist: string;
};

export type Clip = {
  id: string;
  userId: string;
  src: string;
  poster: string;
  caption: string;
  tags: string[];
  soundId: string;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  live?: boolean;
  photo?: boolean;
  photos?: string[];
  viewers?: number;
  duoOf?: string;
  duoLayout?: DuoLayout;
  duoSwap?: boolean;
  filter?: FilterId;
  filterAmt?: number;
  speed?: number;
  createdAt: number;
  local?: boolean;
  liveKind?: "story" | "openmic" | "slam" | "stand" | "table";
  tablePlaces?: 4 | 6 | 8;
};

export const LIVE_LABEL: Record<NonNullable<Clip["liveKind"]>, string> = {
  story: "Storytime",
  openmic: "Micro Ouvert",
  slam: "Slam Thérapie",
  stand: "Stand-Up",
  table: "Zembo Table",
};

export type Comment = {
  id: string;
  userId: string;
  text: string;
  likes: number;
  createdAt: number;
};

export type Thread = {
  id: string;
  userId: string;
  preview: string;
  time: number;
  unread: boolean;
  match?: boolean;
  messages: { id: string; fromMe: boolean; text: string; time: number; clipId?: string }[];
};

export type Activity = {
  id: string;
  kind: "like" | "follow" | "comment" | "mention" | "system";
  userId?: string;
  text: string;
  time: number;
  clipId?: string;
};

const ago = (h: number) => Math.round(h * 3600 * 1000);

export const ME: User = {
  id: "me",
  handle: "toi",
  name: "Toi",
  bio: "Nouveau sur Sway.",
  avatar: "",
  followers: 12,
  following: 3,
  likes: 48,
};

export const USERS: Record<string, User> = {
  "u-ines": {
    id: "u-ines",
    handle: "ines.moreau",
    name: "Inès Moreau",
    bio: "Café, lait, patience. Montréal.",
    avatar: "/avatars/ines.jpg",
    followers: 128400,
    following: 212,
    likes: 2100000,
    location: "Montréal",
  },
  "u-theo": {
    id: "u-theo",
    handle: "theolang",
    name: "Theo Lang",
    bio: "La ville quand elle se tait.",
    avatar: "/avatars/theo.jpg",
    followers: 89200,
    following: 88,
    likes: 940000,
    location: "Montréal",
  },
  "u-maya": {
    id: "u-maya",
    handle: "maya.clay",
    name: "Maya Chen",
    bio: "Porcelaine. Le reste est bruit.",
    avatar: "/avatars/maya.jpg",
    followers: 210300,
    following: 140,
    likes: 4300000,
    location: "Plateau",
  },
  "u-noah": {
    id: "u-noah",
    handle: "noahb",
    name: "Noah Bergeron",
    bio: "Un terrain, une lumière.",
    avatar: "/avatars/noah.jpg",
    followers: 54100,
    following: 76,
    likes: 620000,
    location: "Longueuil",
  },
  "u-sol": {
    id: "u-sol",
    handle: "solnavarro",
    name: "Sol Navarro",
    bio: "Marcher jusqu’au silence.",
    avatar: "/avatars/sol.jpg",
    followers: 176800,
    following: 201,
    likes: 2800000,
    location: "Laurentides",
  },
  "u-jules": {
    id: "u-jules",
    handle: "jules.m",
    name: "Jules Marchand",
    bio: "Pain au levain, four à bois.",
    avatar: "/avatars/jules.jpg",
    followers: 93300,
    following: 54,
    likes: 1100000,
    location: "Québec",
  },
  "u-luca": {
    id: "u-luca",
    handle: "lucaferri",
    name: "Luca Ferri",
    bio: "Béton, soleil, un flip.",
    avatar: "/avatars/luca.jpg",
    followers: 67400,
    following: 310,
    likes: 880000,
    location: "Milano / MTL",
  },
  "u-rina": {
    id: "u-rina",
    handle: "rina.ok",
    name: "Rina Okonkwo",
    bio: "Je parle aux fougères.",
    avatar: "/avatars/rina.jpg",
    followers: 141200,
    following: 190,
    likes: 1600000,
    location: "Verdun",
  },
};

export const SOUNDS: Record<string, Sound> = {
  "s-steam": { id: "s-steam", title: "Steam & Porcelain", artist: "Inès Moreau" },
  "s-puddle": { id: "s-puddle", title: "Puddle Neon", artist: "Theo Lang" },
  "s-wheel": { id: "s-wheel", title: "Wheel Hum", artist: "Maya Chen" },
  "s-chain": { id: "s-chain", title: "Chain Net", artist: "Noah Bergeron" },
  "s-alpine": { id: "s-alpine", title: "Alpine Air", artist: "Sol Navarro" },
  "s-lame": { id: "s-lame", title: "Lame Click", artist: "Jules Marchand" },
  "s-concrete": { id: "s-concrete", title: "Concrete Roll", artist: "Luca Ferri" },
  "s-leaf": { id: "s-leaf", title: "Leaf Mist", artist: "Rina Okonkwo" },
};

export const CLIPS: Clip[] = [
  {
    id: "c-latte",
    userId: "u-ines",
    src: "/clips/latte.mp4",
    poster: "/posters/latte.jpg",
    caption: "Le cœur se forme tout seul quand le lait est à la bonne temp.",
    tags: ["latteart", "cafe", "montreal"],
    soundId: "s-steam",
    likes: 84210,
    comments: 612,
    saves: 9400,
    shares: 2100,
    createdAt: ago(2),
  },
  {
    id: "c-morning",
    userId: "u-ines",
    src: "",
    poster: "/posters/latte.jpg",
    photos: ["/posters/latte.jpg", "/posters/pottery.jpg", "/posters/bread.jpg"],
    caption: "Matin atelier. Trois images, même lumière.",
    tags: ["photo", "atelier", "montreal"],
    soundId: "s-steam",
    likes: 12840,
    comments: 96,
    saves: 2100,
    shares: 340,
    photo: true,
    createdAt: ago(4),
  },
  {
    id: "c-pottery",
    userId: "u-maya",
    src: "/clips/pottery.mp4",
    poster: "/posters/pottery.jpg",
    caption: "Cent trente grammes de porcelaine. Rien d’autre.",
    tags: ["ceramique", "studio", "mains"],
    soundId: "s-wheel",
    likes: 210440,
    comments: 1840,
    saves: 22100,
    shares: 5600,
    filter: "film",
    createdAt: ago(5),
  },
  {
    id: "c-bowl",
    userId: "u-maya",
    src: "",
    poster: "/posters/pottery.jpg",
    caption: "Le bol, avant le feu.",
    tags: ["ceramique", "photo"],
    soundId: "s-wheel",
    likes: 44120,
    comments: 218,
    saves: 6100,
    shares: 740,
    photo: true,
    createdAt: ago(6),
  },
  {
    id: "c-city",
    userId: "u-theo",
    src: "/clips/city.mp4",
    poster: "/posters/city.jpg",
    caption: "La ville après la pluie. En direct ce soir.",
    tags: ["nightwalk", "mtl", "pluie"],
    soundId: "s-puddle",
    likes: 56210,
    comments: 890,
    saves: 4100,
    shares: 1800,
    live: true,
    viewers: 1842,
    createdAt: ago(1),
  },
  {
    id: "c-sunrise",
    userId: "u-sol",
    src: "/clips/sunrise.mp4",
    poster: "/posters/sunrise.jpg",
    caption: "On est arrivés trop tôt et c’était parfait.",
    tags: ["trail", "aube", "laurentides"],
    soundId: "s-alpine",
    likes: 190320,
    comments: 1422,
    saves: 31000,
    shares: 8800,
    filter: "ambre",
    createdAt: ago(9),
  },
  {
    id: "c-ridge",
    userId: "u-sol",
    src: "",
    poster: "/posters/sunrise.jpg",
    caption: "Une seule image. C’était assez.",
    tags: ["trail", "photo", "aube"],
    soundId: "s-alpine",
    likes: 22010,
    comments: 164,
    saves: 4800,
    shares: 390,
    photo: true,
    createdAt: ago(11),
  },
  {
    id: "c-hoops",
    userId: "u-noah",
    src: "/clips/hoops.mp4",
    poster: "/posters/hoops.jpg",
    caption: "Dernier panier du jour. Longueuil.",
    tags: ["hoops", "longueuil", "golden"],
    soundId: "s-chain",
    likes: 42110,
    comments: 388,
    saves: 2900,
    shares: 960,
    live: true,
    viewers: 926,
    createdAt: ago(3),
  },
  {
    id: "c-plants",
    userId: "u-rina",
    src: "/clips/plants.mp4",
    poster: "/posters/plants.jpg",
    caption: "Ils boivent plus que moi.",
    tags: ["plantes", "serre", "calme"],
    soundId: "s-leaf",
    likes: 98040,
    comments: 704,
    saves: 16200,
    shares: 2400,
    filter: "givre",
    createdAt: ago(14),
  },
  {
    id: "c-bread",
    userId: "u-jules",
    src: "/clips/bread.mp4",
    poster: "/posters/bread.jpg",
    caption: "La lame, la farine, le silence.",
    tags: ["pain", "levain", "four"],
    soundId: "s-lame",
    likes: 73400,
    comments: 511,
    saves: 11800,
    shares: 1900,
    filter: "fade",
    createdAt: ago(20),
  },
  {
    id: "c-skate",
    userId: "u-luca",
    src: "/clips/skate.mp4",
    poster: "/posters/skate.jpg",
    caption: "Un flip, une ombre.",
    tags: ["skate", "plaza", "beton"],
    soundId: "s-concrete",
    likes: 61500,
    comments: 430,
    saves: 5400,
    shares: 1500,
    filter: "chrome",
    createdAt: ago(7),
  },
];

export const COMMENTS: Record<string, Comment[]> = {
  "c-latte": [
    { id: "cm1", userId: "u-maya", text: "La crème est parfaite. Respect.", likes: 842, createdAt: ago(1.2) },
    { id: "cm2", userId: "u-jules", text: "On dirait une pièce de porcelaine.", likes: 210, createdAt: ago(1.4) },
    { id: "cm3", userId: "u-rina", text: "Je veux ce compteur, ce lait, ce silence.", likes: 96, createdAt: ago(1.8) },
  ],
  "c-pottery": [
    { id: "cm4", userId: "u-ines", text: "Les mains savent avant la tête.", likes: 1204, createdAt: ago(4) },
    { id: "cm5", userId: "u-sol", text: "C’est hypnotique.", likes: 330, createdAt: ago(4.2) },
    { id: "cm6", userId: "u-luca", text: "Le son du tour, s’il te plaît, plus fort.", likes: 88, createdAt: ago(4.5) },
  ],
  "c-city": [
    { id: "cm7", userId: "u-noah", text: "Sainte-Catherine après minuit.", likes: 540, createdAt: ago(0.4) },
    { id: "cm8", userId: "u-maya", text: "Les néons dans l’eau, c’est trop beau.", likes: 201, createdAt: ago(0.6) },
  ],
  "c-sunrise": [
    { id: "cm9", userId: "u-theo", text: "J’étais en bas des nuages, toi tu étais dessus.", likes: 990, createdAt: ago(8) },
    { id: "cm10", userId: "u-rina", text: "Garde cette lumière.", likes: 412, createdAt: ago(8.3) },
  ],
  "c-hoops": [
    { id: "cm11", userId: "u-luca", text: "Le filet a parlé.", likes: 188, createdAt: ago(2.2) },
    { id: "cm12", userId: "u-theo", text: "Golden hour sur le bitume, chef.", likes: 76, createdAt: ago(2.5) },
  ],
  "c-plants": [
    { id: "cm13", userId: "u-sol", text: "Cette serre, c’est un temple.", likes: 640, createdAt: ago(12) },
    { id: "cm14", userId: "u-ines", text: "Le vert est un son.", likes: 155, createdAt: ago(13) },
  ],
  "c-bread": [
    { id: "cm15", userId: "u-maya", text: "La lame est une danse.", likes: 402, createdAt: ago(18) },
    { id: "cm16", userId: "u-noah", text: "J’ai faim maintenant. Merci.", likes: 90, createdAt: ago(19) },
  ],
  "c-morning": [
    { id: "cm21", userId: "u-jules", text: "Le grain, le lait, le feu. Bravo.", likes: 62, createdAt: ago(3.2) },
  ],
  "c-bowl": [
    { id: "cm19", userId: "u-jules", text: "On dirait une photo de catalogue.", likes: 44, createdAt: ago(5.5) },
  ],
  "c-ridge": [
    { id: "cm20", userId: "u-theo", text: "Le grain est parfait.", likes: 71, createdAt: ago(10) },
  ],
  "c-skate": [
    { id: "cm17", userId: "u-noah", text: "Propre.", likes: 310, createdAt: ago(6) },
    { id: "cm18", userId: "u-theo", text: "L’ombre fait le trick avec toi.", likes: 144, createdAt: ago(6.4) },
  ],
};

export const HASHTAGS: { tag: string; views: string; clipIds: string[] }[] = [
  { tag: "montreal", views: "48,2 M", clipIds: ["c-latte", "c-city"] },
  { tag: "ceramique", views: "12,1 M", clipIds: ["c-pottery"] },
  { tag: "latteart", views: "9,4 M", clipIds: ["c-latte"] },
  { tag: "trail", views: "21,8 M", clipIds: ["c-sunrise"] },
  { tag: "hoops", views: "33,0 M", clipIds: ["c-hoops"] },
  { tag: "plantes", views: "7,6 M", clipIds: ["c-plants"] },
  { tag: "pain", views: "15,2 M", clipIds: ["c-bread"] },
  { tag: "skate", views: "40,5 M", clipIds: ["c-skate"] },
  { tag: "nightwalk", views: "6,1 M", clipIds: ["c-city"] },
];

export const THREADS: Thread[] = [
  {
    id: "th-maya",
    userId: "u-maya",
    preview: "Ton setup porcelaine est ouf.",
    time: ago(0.6),
    unread: true,
    messages: [
      { id: "m1", fromMe: false, text: "Ton setup porcelaine est ouf.", time: ago(0.7) },
      { id: "m2", fromMe: false, text: "Tu tournes à quelle vitesse ?", time: ago(0.6) },
    ],
  },
  {
    id: "th-ines",
    userId: "u-ines",
    preview: "Passe au comptoir, espresso sur moi.",
    time: ago(5),
    unread: false,
    messages: [
      { id: "m3", fromMe: false, text: "Passe au comptoir, espresso sur moi.", time: ago(5) },
      { id: "m4", fromMe: true, text: "J’arrive dans l’après-midi.", time: ago(4.8) },
    ],
  },
  {
    id: "th-noah",
    userId: "u-noah",
    preview: "Terrain 3 demain 18h ?",
    time: ago(26),
    unread: false,
    messages: [
      { id: "m5", fromMe: false, text: "Terrain 3 demain 18h ?", time: ago(26) },
    ],
  },
];

export const ACTIVITY: Activity[] = [
  {
    id: "a1",
    kind: "follow",
    userId: "u-maya",
    text: "a commencé à te suivre",
    time: ago(0.3),
  },
  {
    id: "a2",
    kind: "like",
    userId: "u-ines",
    text: "a aimé ton commentaire",
    time: ago(2),
    clipId: "c-latte",
  },
  {
    id: "a3",
    kind: "comment",
    userId: "u-theo",
    text: "t’a mentionné dans un commentaire",
    time: ago(8),
    clipId: "c-city",
  },
  {
    id: "a4",
    kind: "system",
    text: "Bienvenue sur Sway. Glisse, double-tape, respire.",
    time: ago(30),
  },
];

export const TRENDING = ["Tendance", "Montréal", "Cuisine", "Plein air", "Art", "Sport"];

export const DEFAULT_FOLLOWED = ["u-ines", "u-maya", "u-noah"];

export function userById(id: string, me?: User, extras: User[] = []): User | undefined {
  if (id === "me" || (me && id === me.id)) return me ?? ME;
  return extras.find((u) => u.id === id) ?? USERS[id];
}

export function clipsByUser(userId: string, extras: Clip[] = []) {
  return [...extras, ...CLIPS].filter((c) => c.userId === userId);
}

export function clipsBySound(soundId: string, extras: Clip[] = []) {
  return [...extras, ...CLIPS].filter((c) => c.soundId === soundId);
}

export function clipsByTag(tag: string, extras: Clip[] = []) {
  const t = tag.replace(/^#/, "").toLowerCase();
  return [...extras, ...CLIPS].filter((c) => c.tags.includes(t) || c.caption.toLowerCase().includes(t));
}
