export type WorldGender = "femme" | "homme" | "autre" | "";
export type WorldIntent = "amitie" | "discussion" | "serieuse" | "legere" | "peu-importe";

export type WorldProfile = {
  username: string;
  completed: boolean;
  photos: string[];
  age: string;
  bio: string;
  answerSunday: string;
  answerRedFlag: string;
  answerEscape: string;
  gender: WorldGender;
  orientation: string;
  showAge: boolean;
  country: string;
  city: string;
  languages: string[];
  intentions: WorldIntent[];
  helloFrom: "all" | "criteria";
  visible: boolean;
};

export type WorldCard = {
  id: string;
  name: string;
  age: number;
  gender: Exclude<WorldGender, "">;
  flag: string;
  city: string;
  country: string;
  zone: "afrique" | "europe" | "amerique" | "asie";
  distanceKm: number;
  intent: WorldIntent;
  quote: string;
  interests: string[];
  sunday: string;
  redFlag: string;
  travel: string;
  photos: string[];
  languages: string[];
  online: boolean;
  verified: boolean;
};

export type WorldHelloState = {
  pending: string[];
  ignored: string[];
  sent: string[];
  mutual: string[];
  connections: string[];
};

export type WorldMsg = { id: string; from: "me" | "them"; text: string; at: number };

export const EMPTY_PROFILE = (): WorldProfile => ({
  username: "",
  completed: false,
  photos: [],
  age: "",
  bio: "",
  answerSunday: "",
  answerRedFlag: "",
  answerEscape: "",
  gender: "",
  orientation: "",
  showAge: true,
  country: "",
  city: "",
  languages: [],
  intentions: [],
  helloFrom: "all",
  visible: true,
});

export const EMPTY_HELLOS = (): WorldHelloState => ({
  pending: [],
  ignored: [],
  sent: [],
  mutual: [],
  connections: [],
});

export const TAKEN = new Set(["ines.moreau", "maya.clay", "theolang", "noahb", "solnavarro", "jules.m", "lucaferri", "rina.ok", "toi"]);

export const PHOTO_POOL = [
  "/avatars/ines.jpg",
  "/avatars/maya.jpg",
  "/avatars/sol.jpg",
  "/avatars/rina.jpg",
  "/posters/sunrise.jpg",
  "/posters/city.jpg",
  "/posters/latte.jpg",
  "/posters/plants.jpg",
  "/posters/pottery.jpg",
  "/posters/skate.jpg",
];

export const COUNTRIES = [
  { id: "Canada", flag: "🇨🇦" },
  { id: "France", flag: "🇫🇷" },
  { id: "Belgique", flag: "🇧🇪" },
  { id: "Suisse", flag: "🇨🇭" },
  { id: "Sénégal", flag: "🇸🇳" },
  { id: "Côte d'Ivoire", flag: "🇨🇮" },
  { id: "Cameroun", flag: "🇨🇲" },
  { id: "Maroc", flag: "🇲🇦" },
  { id: "États-Unis", flag: "🇺🇸" },
  { id: "Royaume-Uni", flag: "🇬🇧" },
  { id: "Espagne", flag: "🇪🇸" },
  { id: "Brésil", flag: "🇧🇷" },
];

export const LANGS = ["Français", "English", "Español", "Português", "Wolof", "Arabe", "Deutsch"];

export const ORIENTATIONS = [
  "Hétérosexuel·le",
  "Homosexuel·le",
  "Bisexuel·le",
  "Pansexuel·le",
  "Autre",
  "Préfère ne pas dire",
];

export const INTENTS: { id: WorldIntent; label: string; mark: string }[] = [
  { id: "amitie", label: "Amitié", mark: "👥" },
  { id: "discussion", label: "Discussion", mark: "💬" },
  { id: "serieuse", label: "Rencontre sérieuse", mark: "❤️" },
  { id: "legere", label: "Rencontre sans prise de tête", mark: "⚡" },
  { id: "peu-importe", label: "Peu importe", mark: "♾" },
];

export const ICE = [
  "Quel endroit dans le monde rêves-tu de visiter ?",
  "C’est quoi ton plus beau souvenir de voyage ?",
  "Un plat que tu cuisinerais pour quelqu’un ?",
  "Dimanche matin : café ou marche ?",
  "Une chanson pour un premier Hello ?",
];

export const WORLD_CARDS: WorldCard[] = [
  {
    id: "w-amina",
    name: "Amina",
    age: 27,
    gender: "femme",
    flag: "🇸🇳",
    city: "Dakar",
    country: "Sénégal",
    zone: "afrique",
    distanceKm: 6120,
    intent: "serieuse",
    quote: "Le monde est trop grand pour rester dans un seul quartier.",
    interests: ["Marché", "Jazz", "Mer"],
    sunday: "Thiéré, plage, rien d’autre.",
    redFlag: "Ceux qui n’écoutent pas.",
    travel: "Lisbonne, puis on verra.",
    photos: ["/avatars/rina.jpg", "/posters/sunrise.jpg", "/posters/plants.jpg"],
    languages: ["Français", "Wolof", "English"],
    online: true,
    verified: true,
  },
  {
    id: "w-moussa",
    name: "Moussa",
    age: 31,
    gender: "homme",
    flag: "🇨🇮",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    zone: "afrique",
    distanceKm: 7840,
    intent: "discussion",
    quote: "Un Hello sincère vaut mieux qu’un roman.",
    interests: ["Afrobeat", "Foot", "Café"],
    sunday: "Match, puis attieke.",
    redFlag: "Ne jamais répondre.",
    travel: "Montréal en hiver, pour voir.",
    photos: ["/avatars/noah.jpg", "/posters/city.jpg", "/posters/hoops.jpg"],
    languages: ["Français", "English"],
    online: true,
    verified: true,
  },
  {
    id: "w-lea",
    name: "Léa",
    age: 24,
    gender: "femme",
    flag: "🇫🇷",
    city: "Lyon",
    country: "France",
    zone: "europe",
    distanceKm: 5840,
    intent: "amitie",
    quote: "Je collectionne les premières fois.",
    interests: ["Photo", "Vin", "Train"],
    sunday: "Brunch et longue marche.",
    redFlag: "Toujours en retard, jamais d’excuse.",
    travel: "Direction Lisbonne.",
    photos: ["/avatars/ines.jpg", "/posters/latte.jpg", "/posters/pottery.jpg"],
    languages: ["Français", "Español"],
    online: false,
    verified: true,
  },
  {
    id: "w-diego",
    name: "Diego",
    age: 29,
    gender: "homme",
    flag: "🇧🇷",
    city: "São Paulo",
    country: "Brésil",
    zone: "amerique",
    distanceKm: 8180,
    intent: "legere",
    quote: "Si ça danse, je reste.",
    interests: ["Samba", "Cuisine", "Nuit"],
    sunday: "Feijoada et sieste.",
    redFlag: "Parler de soi sans pause.",
    travel: "Dakar, j’ai un cousin.",
    photos: ["/avatars/luca.jpg", "/posters/skate.jpg", "/posters/city.jpg"],
    languages: ["Português", "Français", "English"],
    online: true,
    verified: false,
  },
  {
    id: "w-sofia",
    name: "Sofia",
    age: 33,
    gender: "femme",
    flag: "🇪🇸",
    city: "Barcelona",
    country: "Espagne",
    zone: "europe",
    distanceKm: 6120,
    intent: "serieuse",
    quote: "Les soirs lents, c’est déjà beaucoup.",
    interests: ["Mer", "Livres", "Céramique"],
    sunday: "Marché, puis rien.",
    redFlag: "Toujours occupé.",
    travel: "Un train vers le Maroc.",
    photos: ["/avatars/maya.jpg", "/posters/pottery.jpg", "/posters/plants.jpg"],
    languages: ["Español", "Français", "English"],
    online: true,
    verified: true,
  },
  {
    id: "w-karim",
    name: "Karim",
    age: 36,
    gender: "homme",
    flag: "🇲🇦",
    city: "Casablanca",
    country: "Maroc",
    zone: "afrique",
    distanceKm: 5680,
    intent: "discussion",
    quote: "Je parle mieux après le thé.",
    interests: ["Thé", "Architecture", "Nuit"],
    sunday: "Médina, puis la corniche.",
    redFlag: "Mépris du silence.",
    travel: "Montréal, j’ai entendu la neige.",
    photos: ["/avatars/theo.jpg", "/posters/city.jpg", "/posters/sunrise.jpg"],
    languages: ["Arabe", "Français"],
    online: false,
    verified: true,
  },
  {
    id: "w-nyla",
    name: "Nyla",
    age: 22,
    gender: "femme",
    flag: "🇨🇲",
    city: "Douala",
    country: "Cameroun",
    zone: "afrique",
    distanceKm: 9720,
    intent: "peu-importe",
    quote: "On verra bien où ça va.",
    interests: ["Danse", "Cinéma", "Plage"],
    sunday: "Playlist et balcon.",
    redFlag: "Les grandes phrases, zéro acte.",
    travel: "Paris d’abord, ensuite le reste.",
    photos: ["/avatars/sol.jpg", "/posters/sunrise.jpg", "/posters/plants.jpg"],
    languages: ["Français", "English"],
    online: true,
    verified: false,
  },
  {
    id: "w-owen",
    name: "Owen",
    age: 41,
    gender: "homme",
    flag: "🇨🇦",
    city: "Montréal",
    country: "Canada",
    zone: "amerique",
    distanceKm: 12,
    intent: "amitie",
    quote: "Un Hello dans sa ville, c’est déjà loin.",
    interests: ["Jazz", "Neige", "Café"],
    sunday: "Bagel, canal, manteau trop grand.",
    redFlag: "Toujours en déplacement.",
    travel: "Dakar, j’ai trop attendu.",
    photos: ["/avatars/jules.jpg", "/posters/bread.jpg", "/posters/latte.jpg"],
    languages: ["Français", "English"],
    online: true,
    verified: true,
  },
  {
    id: "w-sam",
    name: "Sam",
    age: 26,
    gender: "autre",
    flag: "🇨🇦",
    city: "Montréal",
    country: "Canada",
    zone: "amerique",
    distanceKm: 8,
    intent: "discussion",
    quote: "Le genre, c’est une conversation. Un Hello, c’est un début.",
    interests: ["Poésie", "Vélo", "Théâtre"],
    sunday: "Marché Jean-Talon, puis le canal.",
    redFlag: "Ceux qui corrigent mon prénom.",
    travel: "Lisbonne, sans plan.",
    photos: ["/avatars/sol.jpg", "/posters/plants.jpg", "/posters/pottery.jpg"],
    languages: ["Français", "English"],
    online: true,
    verified: true,
  },
];

export const cardById = (id: string) => WORLD_CARDS.find((c) => c.id === id);

export const intentLabel = (id: WorldIntent) => INTENTS.find((i) => i.id === id)?.label ?? id;
export const intentMark = (id: WorldIntent) => INTENTS.find((i) => i.id === id)?.mark ?? "";
export const flagOf = (country: string) => COUNTRIES.find((c) => c.id === country)?.flag ?? "🌍";

export const validHandle = (v: string) => /^[a-zA-Z0-9._]{3,20}$/.test(v);
