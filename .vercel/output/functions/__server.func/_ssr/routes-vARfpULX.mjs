import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Flower2, A as Music2, B as Inbox, C as Search, Ct as Bookmark, D as Plane, Dt as BadgeCheck, E as Play, Et as Ban, F as MapPin, G as Heart, H as Image, I as LogOut, J as GraduationCap, K as Hand, L as Lock, M as MicVocal, N as MicOff, O as Pencil, Ot as ArrowRight, P as MessageCircle, Q as Gauge, R as ListOrdered, S as Send, St as Brain, T as Plus, Tt as Blend, U as ImagePlus, V as Images, W as House, X as Gift, Y as Globe, Z as Gem, _ as SkipForward, _t as Check, a as Volume2, at as Ellipsis, b as Settings, bt as CameraOff, c as Users, ct as Dices, d as Trash2, dt as Clock, et as FlipHorizontal, f as Timer, ft as CircleHelp, g as Smile, gt as ChevronDown, h as Sparkles, ht as ChevronLeft, i as VolumeX, it as EyeOff, j as Mic, k as Pause, kt as ArrowLeft, l as User, lt as Crown, m as Star, mt as ChevronRight, n as Wifi, nt as Flag, o as Video, ot as EllipsisVertical, p as Ticket, pt as ChevronUp, q as Grid3x3, r as WifiOff, rt as Eye, s as VideoOff, st as Download, t as X, tt as Flame, ut as Compass, v as Shield, vt as ChartColumn, w as Repeat2, wt as BookOpen, x as Settings2, xt as CalendarDays, y as Share2, yt as Camera, z as Link2 } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as AnimatePresence, i as LazyMotion, n as domAnimation, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as m } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-vARfpULX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function compact(n) {
	const abs = Math.abs(n);
	if (abs >= 1e6) {
		const v = n / 1e6;
		return `${v.toFixed(v >= 10 || v <= -10 ? 0 : 1).replace(".", ",")} M`;
	}
	if (abs >= 1e3) {
		const v = n / 1e3;
		return `${v.toFixed(v >= 10 || v <= -10 ? 0 : 1).replace(".", ",")} k`;
	}
	return n.toLocaleString("fr-FR");
}
function timeAgo(value) {
	const elapsed = value > 1e11 ? Date.now() - value : value;
	const s = Math.max(0, Math.floor(elapsed / 1e3));
	if (s < 45) return "à l’instant";
	if (s < 3600) return `${Math.floor(s / 60)} min`;
	if (s < 86400) return `${Math.floor(s / 3600)} h`;
	return `${Math.floor(s / 86400)} j`;
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
var NavCtx = (0, import_react.createContext)(null);
function useNav() {
	const v = (0, import_react.useContext)(NavCtx);
	if (!v) throw new Error("useNav");
	return v;
}
function NavProvider({ children }) {
	const [tab, setTabState] = (0, import_react.useState)("home");
	const [feed, setFeed] = (0, import_react.useState)("fyp");
	const [stack, setStack] = (0, import_react.useState)([]);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const hide = (0, import_react.useRef)(null);
	const setTab = (0, import_react.useCallback)((t) => {
		setTabState(t);
		setStack([]);
	}, []);
	const push = (0, import_react.useCallback)((o) => setStack((s) => [...s, o]), []);
	const pop = (0, import_react.useCallback)(() => setStack((s) => s.slice(0, -1)), []);
	const replace = (0, import_react.useCallback)((o) => setStack((s) => [...s.slice(0, -1), o]), []);
	const toast = (0, import_react.useCallback)((s) => {
		setNotice(s);
		if (hide.current) window.clearTimeout(hide.current);
		hide.current = window.setTimeout(() => setNotice(null), 1800);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") pop();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [pop]);
	const value = {
		tab,
		setTab,
		feed,
		setFeed,
		stack,
		push,
		pop,
		replace,
		toast,
		notice
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavCtx.Provider, {
		value,
		children
	});
}
function isSheet(o) {
	return o.t === "comments" || o.t === "share" || o.t === "settings" || o.t === "edit";
}
function Layer({ open, variant, onClose, children, labelledBy }) {
	const [present, setPresent] = (0, import_react.useState)(false);
	const [shown, setShown] = (0, import_react.useState)(false);
	const startX = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50",
		role: "presentation",
		children: [sheet || glass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Fermer",
			className: cn("absolute inset-0 bg-bg/40 backdrop-blur-md transition-opacity duration-200 ease-out", shown ? "opacity-100" : "opacity-0"),
			onClick: onClose
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": labelledBy,
			onTouchStart: (e) => {
				if (!sheet && !glass && e.touches[0] && e.touches[0].clientX < 28) startX.current = e.touches[0].clientX;
			},
			onTouchEnd: (e) => {
				if (startX.current != null) {
					if ((e.changedTouches[0]?.clientX ?? 0) - startX.current > 72) onClose?.();
				}
				startX.current = null;
			},
			className: cn("absolute text-fg will-change-transform", sheet ? "inset-x-0 bottom-0 max-h-[88%] overflow-y-auto rounded-t-xl bg-bg no-scrollbar" : glass ? "inset-0 bg-transparent" : "inset-0 bg-bg", "transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]", sheet ? shown ? "translate-y-0" : "translate-y-full" : glass ? shown ? "translate-y-0" : "-translate-y-8" : shown ? "translate-x-0" : "translate-x-full"),
			children: [sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center pt-2 pb-1",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-10 rounded-full bg-fg/20" })
			}) : null, children]
		})]
	});
}
var FILTERS = [
	{
		id: "none",
		label: "Origine",
		css: "none"
	},
	{
		id: "noir",
		label: "Noir",
		css: "grayscale(1) contrast(1.18)",
		grain: "soft"
	},
	{
		id: "ambre",
		label: "Ambre",
		css: "sepia(0.48) saturate(1.28) contrast(1.08) brightness(1.04)",
		wash: "bg-accent/35 mix-blend-overlay",
		vignette: true
	},
	{
		id: "film",
		label: "16 mm",
		css: "contrast(1.32) saturate(0.68) brightness(0.94) sepia(0.12)",
		grain: "heavy",
		lines: true,
		vignette: true
	},
	{
		id: "givre",
		label: "Givre",
		css: "saturate(0.48) brightness(1.1) contrast(1.06)",
		wash: "bg-fg/25 mix-blend-soft-light"
	},
	{
		id: "fade",
		label: "Fade",
		css: "contrast(0.82) brightness(1.14) saturate(0.62)",
		wash: "bg-fg/30 mix-blend-soft-light"
	},
	{
		id: "vif",
		label: "Vif",
		css: "saturate(1.62) contrast(1.16) brightness(1.05)"
	},
	{
		id: "nuit",
		label: "Nuit",
		css: "brightness(0.76) saturate(0.78) contrast(1.22)",
		wash: "bg-bg/50 mix-blend-multiply",
		vignette: true
	},
	{
		id: "poussiere",
		label: "Poussière",
		css: "contrast(1.16) sepia(0.22) brightness(0.96) saturate(0.9)",
		grain: "heavy",
		vignette: true
	},
	{
		id: "chrome",
		label: "Chrome",
		css: "grayscale(0.45) contrast(1.42) brightness(1.08) saturate(0.62)",
		wash: "bg-fg/15 mix-blend-overlay"
	}
];
var FILTER_ALIAS = {
	chaud: "ambre",
	glace: "givre"
};
function getFilter(id) {
	const resolved = id && FILTER_ALIAS[id] || id;
	return FILTERS.find((f) => f.id === resolved) ?? FILTERS[0];
}
var FILTER_IDENTITY = {
	grayscale: 0,
	sepia: 0,
	saturate: 1,
	contrast: 1,
	brightness: 1,
	invert: 0
};
function filterCssAt(id, amount = 100) {
	const css = getFilter(id).css;
	if (css === "none" || amount >= 100) return css;
	if (amount <= 0) return "none";
	const t = amount / 100;
	return css.replace(/([a-z-]+)\((-?[\d.]+)(%|deg|px)?\)/g, (_, name, num, unit) => {
		const identity = FILTER_IDENTITY[name] ?? 0;
		return `${name}(${identity + (parseFloat(num) - identity) * t}${unit ?? ""})`;
	});
}
var SPEEDS = [
	.5,
	1,
	2,
	3
];
var LIVE_LABEL = {
	story: "Storytime",
	openmic: "Micro Ouvert",
	slam: "Slam Thérapie",
	stand: "Stand-Up",
	table: "Zembo Table"
};
var ago = (h) => Math.round(h * 3600 * 1e3);
var ME = {
	id: "me",
	handle: "toi",
	name: "Toi",
	bio: "Nouveau sur Sway.",
	avatar: "",
	followers: 12,
	following: 3,
	likes: 48
};
var USERS = {
	"u-ines": {
		id: "u-ines",
		handle: "ines.moreau",
		name: "Inès Moreau",
		bio: "Café, lait, patience. Montréal.",
		avatar: "/avatars/ines.jpg",
		followers: 128400,
		following: 212,
		likes: 21e5,
		location: "Montréal"
	},
	"u-theo": {
		id: "u-theo",
		handle: "theolang",
		name: "Theo Lang",
		bio: "La ville quand elle se tait.",
		avatar: "/avatars/theo.jpg",
		followers: 89200,
		following: 88,
		likes: 94e4,
		location: "Montréal"
	},
	"u-maya": {
		id: "u-maya",
		handle: "maya.clay",
		name: "Maya Chen",
		bio: "Porcelaine. Le reste est bruit.",
		avatar: "/avatars/maya.jpg",
		followers: 210300,
		following: 140,
		likes: 43e5,
		location: "Plateau"
	},
	"u-noah": {
		id: "u-noah",
		handle: "noahb",
		name: "Noah Bergeron",
		bio: "Un terrain, une lumière.",
		avatar: "/avatars/noah.jpg",
		followers: 54100,
		following: 76,
		likes: 62e4,
		location: "Longueuil"
	},
	"u-sol": {
		id: "u-sol",
		handle: "solnavarro",
		name: "Sol Navarro",
		bio: "Marcher jusqu’au silence.",
		avatar: "/avatars/sol.jpg",
		followers: 176800,
		following: 201,
		likes: 28e5,
		location: "Laurentides"
	},
	"u-jules": {
		id: "u-jules",
		handle: "jules.m",
		name: "Jules Marchand",
		bio: "Pain au levain, four à bois.",
		avatar: "/avatars/jules.jpg",
		followers: 93300,
		following: 54,
		likes: 11e5,
		location: "Québec"
	},
	"u-luca": {
		id: "u-luca",
		handle: "lucaferri",
		name: "Luca Ferri",
		bio: "Béton, soleil, un flip.",
		avatar: "/avatars/luca.jpg",
		followers: 67400,
		following: 310,
		likes: 88e4,
		location: "Milano / MTL"
	},
	"u-rina": {
		id: "u-rina",
		handle: "rina.ok",
		name: "Rina Okonkwo",
		bio: "Je parle aux fougères.",
		avatar: "/avatars/rina.jpg",
		followers: 141200,
		following: 190,
		likes: 16e5,
		location: "Verdun"
	}
};
var SOUNDS = {
	"s-steam": {
		id: "s-steam",
		title: "Steam & Porcelain",
		artist: "Inès Moreau"
	},
	"s-puddle": {
		id: "s-puddle",
		title: "Puddle Neon",
		artist: "Theo Lang"
	},
	"s-wheel": {
		id: "s-wheel",
		title: "Wheel Hum",
		artist: "Maya Chen"
	},
	"s-chain": {
		id: "s-chain",
		title: "Chain Net",
		artist: "Noah Bergeron"
	},
	"s-alpine": {
		id: "s-alpine",
		title: "Alpine Air",
		artist: "Sol Navarro"
	},
	"s-lame": {
		id: "s-lame",
		title: "Lame Click",
		artist: "Jules Marchand"
	},
	"s-concrete": {
		id: "s-concrete",
		title: "Concrete Roll",
		artist: "Luca Ferri"
	},
	"s-leaf": {
		id: "s-leaf",
		title: "Leaf Mist",
		artist: "Rina Okonkwo"
	}
};
var CLIPS = [
	{
		id: "c-latte",
		userId: "u-ines",
		src: "/clips/latte.mp4",
		poster: "/posters/latte.jpg",
		caption: "Le cœur se forme tout seul quand le lait est à la bonne temp.",
		tags: [
			"latteart",
			"cafe",
			"montreal"
		],
		soundId: "s-steam",
		likes: 84210,
		comments: 612,
		saves: 9400,
		shares: 2100,
		createdAt: ago(2)
	},
	{
		id: "c-morning",
		userId: "u-ines",
		src: "",
		poster: "/posters/latte.jpg",
		photos: [
			"/posters/latte.jpg",
			"/posters/pottery.jpg",
			"/posters/bread.jpg"
		],
		caption: "Matin atelier. Trois images, même lumière.",
		tags: [
			"photo",
			"atelier",
			"montreal"
		],
		soundId: "s-steam",
		likes: 12840,
		comments: 96,
		saves: 2100,
		shares: 340,
		photo: true,
		createdAt: ago(4)
	},
	{
		id: "c-pottery",
		userId: "u-maya",
		src: "/clips/pottery.mp4",
		poster: "/posters/pottery.jpg",
		caption: "Cent trente grammes de porcelaine. Rien d’autre.",
		tags: [
			"ceramique",
			"studio",
			"mains"
		],
		soundId: "s-wheel",
		likes: 210440,
		comments: 1840,
		saves: 22100,
		shares: 5600,
		filter: "film",
		createdAt: ago(5)
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
		createdAt: ago(6)
	},
	{
		id: "c-city",
		userId: "u-theo",
		src: "/clips/city.mp4",
		poster: "/posters/city.jpg",
		caption: "La ville après la pluie. En direct ce soir.",
		tags: [
			"nightwalk",
			"mtl",
			"pluie"
		],
		soundId: "s-puddle",
		likes: 56210,
		comments: 890,
		saves: 4100,
		shares: 1800,
		live: true,
		viewers: 1842,
		createdAt: ago(1)
	},
	{
		id: "c-sunrise",
		userId: "u-sol",
		src: "/clips/sunrise.mp4",
		poster: "/posters/sunrise.jpg",
		caption: "On est arrivés trop tôt et c’était parfait.",
		tags: [
			"trail",
			"aube",
			"laurentides"
		],
		soundId: "s-alpine",
		likes: 190320,
		comments: 1422,
		saves: 31e3,
		shares: 8800,
		filter: "ambre",
		createdAt: ago(9)
	},
	{
		id: "c-ridge",
		userId: "u-sol",
		src: "",
		poster: "/posters/sunrise.jpg",
		caption: "Une seule image. C’était assez.",
		tags: [
			"trail",
			"photo",
			"aube"
		],
		soundId: "s-alpine",
		likes: 22010,
		comments: 164,
		saves: 4800,
		shares: 390,
		photo: true,
		createdAt: ago(11)
	},
	{
		id: "c-hoops",
		userId: "u-noah",
		src: "/clips/hoops.mp4",
		poster: "/posters/hoops.jpg",
		caption: "Dernier panier du jour. Longueuil.",
		tags: [
			"hoops",
			"longueuil",
			"golden"
		],
		soundId: "s-chain",
		likes: 42110,
		comments: 388,
		saves: 2900,
		shares: 960,
		live: true,
		viewers: 926,
		createdAt: ago(3)
	},
	{
		id: "c-plants",
		userId: "u-rina",
		src: "/clips/plants.mp4",
		poster: "/posters/plants.jpg",
		caption: "Ils boivent plus que moi.",
		tags: [
			"plantes",
			"serre",
			"calme"
		],
		soundId: "s-leaf",
		likes: 98040,
		comments: 704,
		saves: 16200,
		shares: 2400,
		filter: "givre",
		createdAt: ago(14)
	},
	{
		id: "c-bread",
		userId: "u-jules",
		src: "/clips/bread.mp4",
		poster: "/posters/bread.jpg",
		caption: "La lame, la farine, le silence.",
		tags: [
			"pain",
			"levain",
			"four"
		],
		soundId: "s-lame",
		likes: 73400,
		comments: 511,
		saves: 11800,
		shares: 1900,
		filter: "fade",
		createdAt: ago(20)
	},
	{
		id: "c-skate",
		userId: "u-luca",
		src: "/clips/skate.mp4",
		poster: "/posters/skate.jpg",
		caption: "Un flip, une ombre.",
		tags: [
			"skate",
			"plaza",
			"beton"
		],
		soundId: "s-concrete",
		likes: 61500,
		comments: 430,
		saves: 5400,
		shares: 1500,
		filter: "chrome",
		createdAt: ago(7)
	}
];
var COMMENTS = {
	"c-latte": [
		{
			id: "cm1",
			userId: "u-maya",
			text: "La crème est parfaite. Respect.",
			likes: 842,
			createdAt: ago(1.2)
		},
		{
			id: "cm2",
			userId: "u-jules",
			text: "On dirait une pièce de porcelaine.",
			likes: 210,
			createdAt: ago(1.4)
		},
		{
			id: "cm3",
			userId: "u-rina",
			text: "Je veux ce compteur, ce lait, ce silence.",
			likes: 96,
			createdAt: ago(1.8)
		}
	],
	"c-pottery": [
		{
			id: "cm4",
			userId: "u-ines",
			text: "Les mains savent avant la tête.",
			likes: 1204,
			createdAt: ago(4)
		},
		{
			id: "cm5",
			userId: "u-sol",
			text: "C’est hypnotique.",
			likes: 330,
			createdAt: ago(4.2)
		},
		{
			id: "cm6",
			userId: "u-luca",
			text: "Le son du tour, s’il te plaît, plus fort.",
			likes: 88,
			createdAt: ago(4.5)
		}
	],
	"c-city": [{
		id: "cm7",
		userId: "u-noah",
		text: "Sainte-Catherine après minuit.",
		likes: 540,
		createdAt: ago(.4)
	}, {
		id: "cm8",
		userId: "u-maya",
		text: "Les néons dans l’eau, c’est trop beau.",
		likes: 201,
		createdAt: ago(.6)
	}],
	"c-sunrise": [{
		id: "cm9",
		userId: "u-theo",
		text: "J’étais en bas des nuages, toi tu étais dessus.",
		likes: 990,
		createdAt: ago(8)
	}, {
		id: "cm10",
		userId: "u-rina",
		text: "Garde cette lumière.",
		likes: 412,
		createdAt: ago(8.3)
	}],
	"c-hoops": [{
		id: "cm11",
		userId: "u-luca",
		text: "Le filet a parlé.",
		likes: 188,
		createdAt: ago(2.2)
	}, {
		id: "cm12",
		userId: "u-theo",
		text: "Golden hour sur le bitume, chef.",
		likes: 76,
		createdAt: ago(2.5)
	}],
	"c-plants": [{
		id: "cm13",
		userId: "u-sol",
		text: "Cette serre, c’est un temple.",
		likes: 640,
		createdAt: ago(12)
	}, {
		id: "cm14",
		userId: "u-ines",
		text: "Le vert est un son.",
		likes: 155,
		createdAt: ago(13)
	}],
	"c-bread": [{
		id: "cm15",
		userId: "u-maya",
		text: "La lame est une danse.",
		likes: 402,
		createdAt: ago(18)
	}, {
		id: "cm16",
		userId: "u-noah",
		text: "J’ai faim maintenant. Merci.",
		likes: 90,
		createdAt: ago(19)
	}],
	"c-morning": [{
		id: "cm21",
		userId: "u-jules",
		text: "Le grain, le lait, le feu. Bravo.",
		likes: 62,
		createdAt: ago(3.2)
	}],
	"c-bowl": [{
		id: "cm19",
		userId: "u-jules",
		text: "On dirait une photo de catalogue.",
		likes: 44,
		createdAt: ago(5.5)
	}],
	"c-ridge": [{
		id: "cm20",
		userId: "u-theo",
		text: "Le grain est parfait.",
		likes: 71,
		createdAt: ago(10)
	}],
	"c-skate": [{
		id: "cm17",
		userId: "u-noah",
		text: "Propre.",
		likes: 310,
		createdAt: ago(6)
	}, {
		id: "cm18",
		userId: "u-theo",
		text: "L’ombre fait le trick avec toi.",
		likes: 144,
		createdAt: ago(6.4)
	}]
};
var HASHTAGS = [
	{
		tag: "montreal",
		views: "48,2 M",
		clipIds: ["c-latte", "c-city"]
	},
	{
		tag: "ceramique",
		views: "12,1 M",
		clipIds: ["c-pottery"]
	},
	{
		tag: "latteart",
		views: "9,4 M",
		clipIds: ["c-latte"]
	},
	{
		tag: "trail",
		views: "21,8 M",
		clipIds: ["c-sunrise"]
	},
	{
		tag: "hoops",
		views: "33,0 M",
		clipIds: ["c-hoops"]
	},
	{
		tag: "plantes",
		views: "7,6 M",
		clipIds: ["c-plants"]
	},
	{
		tag: "pain",
		views: "15,2 M",
		clipIds: ["c-bread"]
	},
	{
		tag: "skate",
		views: "40,5 M",
		clipIds: ["c-skate"]
	},
	{
		tag: "nightwalk",
		views: "6,1 M",
		clipIds: ["c-city"]
	}
];
var THREADS = [
	{
		id: "th-maya",
		userId: "u-maya",
		preview: "Ton setup porcelaine est ouf.",
		time: ago(.6),
		unread: true,
		messages: [{
			id: "m1",
			fromMe: false,
			text: "Ton setup porcelaine est ouf.",
			time: ago(.7)
		}, {
			id: "m2",
			fromMe: false,
			text: "Tu tournes à quelle vitesse ?",
			time: ago(.6)
		}]
	},
	{
		id: "th-ines",
		userId: "u-ines",
		preview: "Passe au comptoir, espresso sur moi.",
		time: ago(5),
		unread: false,
		messages: [{
			id: "m3",
			fromMe: false,
			text: "Passe au comptoir, espresso sur moi.",
			time: ago(5)
		}, {
			id: "m4",
			fromMe: true,
			text: "J’arrive dans l’après-midi.",
			time: ago(4.8)
		}]
	},
	{
		id: "th-noah",
		userId: "u-noah",
		preview: "Terrain 3 demain 18h ?",
		time: ago(26),
		unread: false,
		messages: [{
			id: "m5",
			fromMe: false,
			text: "Terrain 3 demain 18h ?",
			time: ago(26)
		}]
	}
];
var ACTIVITY = [
	{
		id: "a1",
		kind: "follow",
		userId: "u-maya",
		text: "a commencé à te suivre",
		time: ago(.3)
	},
	{
		id: "a2",
		kind: "like",
		userId: "u-ines",
		text: "a aimé ton commentaire",
		time: ago(2),
		clipId: "c-latte"
	},
	{
		id: "a3",
		kind: "comment",
		userId: "u-theo",
		text: "t’a mentionné dans un commentaire",
		time: ago(8),
		clipId: "c-city"
	},
	{
		id: "a4",
		kind: "system",
		text: "Bienvenue sur Sway. Glisse, double-tape, respire.",
		time: ago(30)
	}
];
var TRENDING = [
	"Tendance",
	"Montréal",
	"Cuisine",
	"Plein air",
	"Art",
	"Sport"
];
var DEFAULT_FOLLOWED = [
	"u-ines",
	"u-maya",
	"u-noah"
];
function userById(id, me, extras = []) {
	if (id === "me" || me && id === me.id) return me ?? ME;
	return extras.find((u) => u.id === id) ?? USERS[id];
}
function clipsByUser(userId, extras = []) {
	return [...extras, ...CLIPS].filter((c) => c.userId === userId);
}
function clipsBySound(soundId, extras = []) {
	return [...extras, ...CLIPS].filter((c) => c.soundId === soundId);
}
function clipsByTag(tag, extras = []) {
	const t = tag.replace(/^#/, "").toLowerCase();
	return [...extras, ...CLIPS].filter((c) => c.tags.includes(t) || c.caption.toLowerCase().includes(t));
}
var useSway = create()(persist((set, get) => ({
	liked: [],
	saved: [],
	followed: DEFAULT_FOLLOWED,
	hidden: [],
	extraComments: {},
	commentLikes: [],
	me: ME,
	accounts: [ME],
	myClips: [],
	muted: true,
	threads: THREADS,
	activity: ACTIVITY,
	inboxSeen: false,
	like: (clipId) => set((s) => ({ liked: s.liked.includes(clipId) ? s.liked.filter((id) => id !== clipId) : [clipId, ...s.liked] })),
	save: (clipId) => set((s) => ({ saved: s.saved.includes(clipId) ? s.saved.filter((id) => id !== clipId) : [clipId, ...s.saved] })),
	follow: (userId) => set((s) => ({ followed: s.followed.includes(userId) ? s.followed.filter((id) => id !== userId) : [userId, ...s.followed] })),
	hide: (clipId) => set((s) => ({ hidden: s.hidden.includes(clipId) ? s.hidden : [...s.hidden, clipId] })),
	addComment: (clipId, text) => {
		const c = {
			id: uid("cm"),
			userId: get().me.id,
			text,
			likes: 0,
			createdAt: Date.now()
		};
		set((s) => ({ extraComments: {
			...s.extraComments,
			[clipId]: [c, ...s.extraComments[clipId] ?? []]
		} }));
	},
	likeComment: (id) => set((s) => ({ commentLikes: s.commentLikes.includes(id) ? s.commentLikes.filter((x) => x !== id) : [...s.commentLikes, id] })),
	setMuted: (v) => set({ muted: v }),
	setMe: (patch) => set((s) => {
		const me = {
			...s.me,
			...patch
		};
		return {
			me,
			accounts: s.accounts.map((a) => a.id === me.id ? me : a)
		};
	}),
	createAccount: ({ name, handle }) => {
		const user = {
			id: uid("u"),
			name: name.trim() || "Nouveau",
			handle: handle.replace(/^@/, "").trim() || "nouveau",
			bio: "Nouveau sur Sway.",
			avatar: "",
			followers: 0,
			following: 0,
			likes: 0
		};
		set((s) => ({
			accounts: [...s.accounts, user],
			me: user
		}));
		return user;
	},
	switchAccount: (id) => {
		const next = get().accounts.find((a) => a.id === id);
		if (next) set({ me: next });
	},
	publish: (clip) => {
		const id = uid("c");
		const me = get().me;
		const next = {
			...clip,
			id,
			userId: me.id,
			createdAt: Date.now(),
			likes: 0,
			comments: 0,
			saves: 0,
			shares: 0,
			local: true
		};
		set((s) => ({ myClips: [next, ...s.myClips] }));
		return id;
	},
	sendMessage: (threadId, text, clipId) => set((s) => ({ threads: s.threads.map((th) => th.id !== threadId ? th : {
		...th,
		preview: text,
		time: Date.now(),
		unread: false,
		messages: [...th.messages, {
			id: uid("m"),
			fromMe: true,
			text,
			time: Date.now(),
			clipId
		}]
	}) })),
	addMatch: (userId) => {
		const existing = get().threads.find((t) => t.userId === userId && t.match);
		if (existing) return existing.id;
		const id = uid("th");
		set((s) => ({ threads: [{
			id,
			userId,
			preview: "Match.",
			time: Date.now(),
			unread: true,
			match: true,
			messages: [{
				id: uid("m"),
				fromMe: false,
				text: "On s’est trouvés sur Face à face.",
				time: Date.now()
			}]
		}, ...s.threads] }));
		return id;
	},
	markInboxSeen: () => set({ inboxSeen: true }),
	bumpShare: (clipId) => {
		get();
	}
}), {
	name: "sway-v1",
	skipHydration: true,
	partialize: (s) => ({
		liked: s.liked,
		saved: s.saved,
		followed: s.followed,
		hidden: s.hidden,
		extraComments: s.extraComments,
		commentLikes: s.commentLikes,
		me: s.me,
		accounts: s.accounts,
		myClips: s.myClips,
		muted: s.muted,
		threads: s.threads,
		inboxSeen: s.inboxSeen
	}),
	merge: (persisted, current) => {
		const p = persisted ?? {};
		const accounts = p.accounts?.length ? p.accounts : [p.me ?? current.me];
		return {
			...current,
			...p,
			accounts
		};
	}
}));
function allClips() {
	return [...useSway.getState().myClips, ...CLIPS];
}
function getClip(id) {
	return allClips().find((c) => c.id === id);
}
function commentsFor(clipId) {
	return [...useSway.getState().extraComments[clipId] ?? [], ...COMMENTS[clipId] ?? []];
}
var button = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg",
			ghost: "bg-surface-2 text-fg",
			line: "bg-transparent text-fg shadow-[0_0_0_1px_rgb(242_238_230_/_0.14)]",
			quiet: "bg-transparent text-fg"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-sm",
			md: "h-11 px-4 text-sm rounded-md",
			lg: "h-12 px-5 text-sm rounded-lg w-full",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(button({
			variant,
			size
		}), className),
		...props
	});
}
function Avatar({ user, size = "md", className }) {
	const dim = size === "sm" ? "size-8" : size === "lg" ? "size-14" : size === "xl" ? "size-20" : "size-11";
	const radius = size === "xl" || size === "lg" ? "rounded-lg" : "rounded-md";
	const letter = user.name.trim().charAt(0).toUpperCase() || "S";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-2 text-accent font-medium", dim, radius, className),
		children: user.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: user.avatar,
			alt: "",
			className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg",
			children: letter
		})
	});
}
function ScreenHeader({ title, onBack, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-12 shrink-0 items-center gap-2 px-3 pt-[env(safe-area-inset-top)]",
		children: [
			onBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "quiet",
				size: "icon",
				onClick: onBack,
				"aria-label": "Retour",
				className: "size-11",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackIcon, {})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-11" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				id: "screen-title",
				className: "flex-1 text-center text-base font-medium tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-11 items-center justify-center",
				children: right
			})
		]
	});
}
function BackIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M15 5 L8 12 L15 19",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function FilterStage({ id, amount = 100, className, children }) {
	const fx = getFilter(id);
	const amt = Math.max(0, Math.min(100, amount));
	const css = filterCssAt(fx.id, amt);
	const o = amt / 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { filter: css },
				children
			}),
			fx.wash && o > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("pointer-events-none absolute inset-0", fx.wash),
				style: { opacity: o }
			}) : null,
			fx.vignette && o > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 fx-vignette",
				style: { opacity: o }
			}) : null,
			fx.grain && o > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0",
				style: { opacity: o },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 fx-grain", fx.grain === "heavy" && "fx-grain-heavy") })
			}) : null,
			fx.lines && o > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 fx-lines",
				style: { opacity: o }
			}) : null
		]
	});
}
function FilterRail({ value, onChange, sample }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1",
		children: FILTERS.map((f) => {
			const on = f.id === getFilter(value).id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(f.id),
				className: "w-[4.25rem] shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("block size-[4.25rem] overflow-hidden rounded-full transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]", on ? "scale-100 shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]" : "scale-[0.86] shadow-[0_0_0_1px_rgb(242_238_230_/_0.14)]"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
						id: f.id,
						className: "size-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sample,
							alt: "",
							className: "absolute inset-0 size-full object-cover"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-1.5 block truncate text-center text-[11px]", on ? "text-fg" : "text-muted"),
					children: f.label
				})]
			}, f.id);
		})
	});
}
function FilterAmount({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-[11px] text-muted",
				children: "FX"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max: 100,
				value,
				"aria-label": "Intensité du filtre",
				onChange: (e) => onChange(Number(e.target.value)),
				className: "h-1 flex-1 cursor-pointer appearance-none rounded-full bg-fg/20 accent-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-right text-[11px] tabular-nums text-muted",
				children: value
			})
		]
	});
}
function cycleFilter(current, dir) {
	return FILTERS[(FILTERS.findIndex((f) => f.id === getFilter(current).id) + dir + FILTERS.length) % FILTERS.length].id;
}
var DUO_LAYOUTS = [
	{
		id: "split",
		label: "Côte à côte",
		hint: "Deux cadres égaux"
	},
	{
		id: "stack",
		label: "Haut / bas",
		hint: "L’un au-dessus de l’autre"
	},
	{
		id: "pip",
		label: "Incrustation",
		hint: "L’original en pastille"
	},
	{
		id: "react",
		label: "Réaction",
		hint: "Tu regardes, tu réponds"
	}
];
function duoLabel(id) {
	return DUO_LAYOUTS.find((l) => l.id === id)?.label ?? "Duo";
}
function Pane({ children, name, className, align = "start" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden bg-bg", className),
		children: [children, name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("pointer-events-none absolute top-2 z-[1] rounded-xs bg-bg/65 px-1.5 py-0.5 text-[10px] font-medium", align === "end" ? "right-2" : "left-2"),
			children: name
		}) : null]
	});
}
function DuoFrame({ layout, swap = false, original, self, originalName = "Original", selfName = "Toi", className }) {
	if (layout === "pip") {
		const bg = swap ? original : self;
		const card = swap ? self : original;
		const bgName = swap ? originalName : selfName;
		const cardName = swap ? selfName : originalName;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative", className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
				name: bgName,
				className: "absolute inset-0",
				children: bg
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
				name: cardName,
				className: "absolute left-3 top-3 z-[1] h-[30%] w-[34%] overflow-hidden rounded-md shadow-[0_8px_24px_rgb(0_0_0_/_0.45),0_0_0_1px_rgb(242_238_230_/_0.22)]",
				children: card
			})]
		});
	}
	if (layout === "react") {
		const top = swap ? self : original;
		const bot = swap ? original : self;
		const topName = swap ? selfName : originalName;
		const botName = swap ? originalName : selfName;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative flex flex-col", className),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
					name: topName,
					className: "h-[38%] w-full",
					children: top
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-full bg-fg/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
					name: botName,
					className: "min-h-0 flex-1",
					align: "end",
					children: bot
				})
			]
		});
	}
	const stack = layout === "stack";
	const a = swap ? self : original;
	const b = swap ? original : self;
	const aName = swap ? selfName : originalName;
	const bName = swap ? originalName : selfName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex", stack ? "flex-col" : "flex-row", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
				name: aName,
				className: stack ? "h-1/2 w-full" : "h-full w-1/2",
				children: a
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("bg-fg/20", stack ? "h-px w-full" : "h-full w-px") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
				name: bName,
				className: stack ? "h-1/2 w-full" : "h-full w-1/2",
				align: "end",
				children: b
			})
		]
	});
}
function LayoutPicker({ value, onChange, poster }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2",
		children: DUO_LAYOUTS.map((l) => {
			const on = l.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(l.id),
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutThumb, {
					layout: l.id,
					poster,
					active: on
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-1.5 block truncate text-center text-[10px] font-medium", on ? "text-fg" : "text-muted"),
					children: l.label
				})]
			}, l.id);
		})
	});
}
function LayoutThumb({ layout, poster, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("relative block aspect-[9/16] w-full overflow-hidden rounded-md bg-surface-2 transition-[box-shadow] duration-200", active ? "shadow-[0_0_0_2px_var(--color-accent)]" : "shadow-[0_0_0_1px_rgb(242_238_230_/_0.12)]"),
		children: layout === "split" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: "",
					className: "h-full w-1/2 object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px bg-fg/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex w-1/2 items-center justify-center bg-accent/20 text-[8px] font-medium text-accent",
					children: "Toi"
				})
			]
		}) : layout === "stack" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-full flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: "",
					className: "h-1/2 w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px bg-fg/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex flex-1 items-center justify-center bg-accent/20 text-[8px] font-medium text-accent",
					children: "Toi"
				})
			]
		}) : layout === "pip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "absolute inset-0 flex items-end justify-center bg-accent/20 pb-1 text-[8px] font-medium text-accent",
			children: ["Toi", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: poster,
				alt: "",
				className: "absolute left-0.5 top-0.5 h-[30%] w-[34%] rounded-sm object-cover shadow-[0_0_0_1px_rgb(242_238_230_/_0.3)]"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-full flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: poster,
				alt: "",
				className: "h-[38%] w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex flex-1 items-center justify-center bg-accent/20 text-[8px] font-medium text-accent",
				children: "Toi"
			})]
		})
	});
}
function ClipCard({ clip, active, load }) {
	const video = (0, import_react.useRef)(null);
	const { push } = useNav();
	const muted = useSway((s) => s.muted);
	const liked = useSway((s) => s.liked.includes(clip.id));
	const saved = useSway((s) => s.saved.includes(clip.id));
	const me = useSway((s) => s.me);
	const followed = useSway((s) => s.followed.includes(clip.userId) || clip.userId === s.me.id);
	const like = useSway((s) => s.like);
	const save = useSway((s) => s.save);
	const follow = useSway((s) => s.follow);
	const setMuted = useSway((s) => s.setMuted);
	const extra = useSway((s) => s.extraComments[clip.id]?.length ?? 0);
	const accounts = useSway((s) => s.accounts);
	const user = userById(clip.userId, me, accounts);
	const sound = SOUNDS[clip.soundId];
	const duo = clip.duoOf ? getClip(clip.duoOf) : void 0;
	const slides = clip.photos?.length ? clip.photos : clip.photo ? [clip.poster] : null;
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [bursts, setBursts] = (0, import_react.useState)([]);
	const lastTap = (0, import_react.useRef)(0);
	const [viewers, setViewers] = (0, import_react.useState)(clip.viewers ?? 0);
	const [slide, setSlide] = (0, import_react.useState)(0);
	const duoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = video.current;
		if (!el) return;
		el.playbackRate = clip.speed ?? 1;
		if (active && !paused) el.play().catch(() => {});
		else el.pause();
		const other = duoRef.current;
		if (other) {
			if (active && !paused) other.play().catch(() => {});
			else other.pause();
		}
	}, [
		active,
		paused,
		load,
		clip.speed
	]);
	(0, import_react.useEffect)(() => {
		if (!active) setPaused(false);
	}, [active]);
	(0, import_react.useEffect)(() => {
		if (!clip.live || !active) return;
		const t = window.setInterval(() => {
			setViewers((v) => Math.max(12, v + Math.floor(Math.random() * 13) - 5));
		}, 1100);
		return () => window.clearInterval(t);
	}, [clip.live, active]);
	const heartAt = (x, y) => {
		const id = Date.now() + Math.random();
		setBursts((b) => [...b, {
			id,
			x,
			y
		}]);
		window.setTimeout(() => setBursts((b) => b.filter((item) => item.id !== id)), 700);
		if (!liked) like(clip.id);
	};
	const onTap = (e) => {
		const now = Date.now();
		const rect = e.currentTarget.getBoundingClientRect();
		if (now - lastTap.current < 280) {
			if (!clip.live) heartAt(e.clientX - rect.left, e.clientY - rect.top);
			lastTap.current = 0;
			return;
		}
		lastTap.current = now;
		window.setTimeout(() => {
			if (lastTap.current !== now) return;
			if (clip.live) {
				push({
					t: "live",
					clipId: clip.id
				});
				return;
			}
			if (clip.photo) return;
			setPaused((p) => !p);
		}, 280);
	};
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "relative h-full w-full bg-bg text-fg",
		children: [
			slides ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
				id: clip.filter,
				amount: clip.filterAmt,
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex snap-x snap-mandatory overflow-x-auto no-scrollbar",
					onClick: onTap,
					onScroll: (e) => {
						const el = e.currentTarget;
						const i = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
						setSlide(i);
					},
					children: slides.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						className: "h-full w-full shrink-0 snap-center object-cover"
					}, src))
				})
			}) : duo && load && clip.src && !failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuoFrame, {
				layout: clip.duoLayout ?? "split",
				swap: clip.duoSwap,
				className: "absolute inset-0",
				originalName: "",
				selfName: "",
				original: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: duoRef,
					src: duo.src,
					poster: duo.poster,
					loop: true,
					muted,
					playsInline: true,
					className: "absolute inset-0 size-full object-cover"
				}),
				self: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
					id: clip.filter,
					amount: clip.filterAmt,
					className: "absolute inset-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: video,
						src: clip.src,
						poster: clip.poster,
						loop: true,
						muted,
						playsInline: true,
						className: "absolute inset-0 size-full object-cover",
						onError: () => setFailed(true),
						onTimeUpdate: (e) => {
							const el = e.currentTarget;
							if (el.duration) setProgress(el.currentTime / el.duration);
						}
					})
				})
			}) : load && clip.src && !failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
				id: clip.filter,
				amount: clip.filterAmt,
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: video,
					src: clip.src,
					poster: clip.poster,
					loop: true,
					muted: clip.live ? true : muted,
					playsInline: true,
					preload: active ? "auto" : "metadata",
					className: "absolute inset-0 h-full w-full object-cover",
					onError: () => setFailed(true),
					onTimeUpdate: (e) => {
						const el = e.currentTarget;
						if (el.duration) setProgress(el.currentTime / el.duration);
					}
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
				id: clip.filter,
				amount: clip.filterAmt,
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: clip.poster,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				})
			}),
			slides && slides.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-[calc(3.4rem+env(safe-area-inset-top))] z-[1] flex justify-center gap-1",
				children: slides.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-0.5 rounded-full", i === slide ? "w-5 bg-fg" : "w-3 bg-fg/35") }, src))
			}) : null,
			duo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-3 top-[calc(3.4rem+env(safe-area-inset-top))] z-[1] rounded-xs bg-bg/50 px-2 py-0.5 text-[11px] font-medium",
				children: "Duo"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent" }),
			slides ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				onClick: onTap
			}),
			paused && active && !clip.live && !clip.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-16 items-center justify-center rounded-full bg-bg/40 text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "currentColor",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5v14l11-7z" })
					})
				})
			}) : null,
			bursts.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
				className: "pointer-events-none absolute size-16 fill-fg text-fg anim-pop",
				style: {
					left: b.x - 32,
					top: b.y - 32
				}
			}, b.id)),
			clip.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-fg anim-live" }), "Live"]
					}),
					clip.liveKind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-fg/80",
						children: LIVE_LABEL[clip.liveKind]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-sm font-medium tracking-tight",
						children: clip.caption
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs tabular-nums text-fg/70",
						children: [viewers.toLocaleString("fr-FR"), " spectateurs"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pointer-events-auto mt-4 h-11 rounded-full bg-live px-5 text-sm font-medium text-fg",
						onClick: () => push({
							t: "live",
							clipId: clip.id
						}),
						children: "Rejoindre le live"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-3 pb-[calc(4.75rem+env(safe-area-inset-bottom))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto min-w-0 flex-1 pb-1",
					children: [
						clip.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => push({
									t: "user",
									userId: clip.userId
								}),
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									user,
									size: "sm",
									className: "size-8 rounded-full"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate text-base font-medium tracking-tight",
									children: ["@", user.handle]
								})]
							}), clip.userId !== "me" && !followed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => follow(clip.userId),
								className: "h-7 shrink-0 rounded-full bg-fg px-2.5 text-xs font-medium text-bg",
								children: "Suivre"
							}) : null]
						}) : clip.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 inline-flex rounded-xs bg-fg/15 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-fg",
							children: "Photo"
						}) : null,
						clip.live ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => push({
								t: "user",
								userId: clip.userId
							}),
							className: "block text-left text-base font-medium tracking-tight",
							children: ["@", user.handle]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 max-w-[16rem] text-sm leading-snug text-fg/90",
							children: [
								clip.caption,
								" ",
								clip.live ? null : clip.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "font-medium text-accent",
									onClick: () => push({
										t: "tag",
										tag
									}),
									children: [
										"#",
										tag,
										" "
									]
								}, tag))
							]
						}),
						clip.filter && clip.filter !== "none" && !clip.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-fg/65",
							children: [getFilter(clip.filter).label, clip.filterAmt != null && clip.filterAmt < 100 ? ` · ${clip.filterAmt}%` : ""]
						}) : null,
						sound && !clip.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => push({
								t: "sound",
								soundId: sound.id
							}),
							className: "mt-2 flex max-w-[16rem] items-center gap-2 text-xs text-fg/80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate",
								children: [
									sound.title,
									" · ",
									sound.artist
								]
							})
						}) : null
					]
				}), clip.live ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex flex-col items-center gap-4 pb-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "relative",
							onClick: () => push({
								t: "user",
								userId: clip.userId
							}),
							"aria-label": user.name,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								user,
								size: "md",
								className: "size-12 rounded-full shadow-[0_0_0_1px_rgb(242_238_230_/_0.2)]"
							}), clip.userId !== "me" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								role: "button",
								onClick: (e) => {
									e.stopPropagation();
									follow(clip.userId);
								},
								className: cn("absolute -bottom-1.5 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full", followed ? "bg-surface-2 text-fg" : "bg-accent text-accent-fg"),
								"aria-label": followed ? "Abonné" : "Suivre",
								children: followed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-3",
									strokeWidth: 2.6
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-3",
									strokeWidth: 2.5
								})
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							label: compact(clip.likes + (liked ? 1 : 0)),
							onClick: () => like(clip.id),
							ariaLabel: "Aimer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-7", liked && "fill-heart text-heart") })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							label: compact(clip.comments + extra),
							onClick: () => push({
								t: "comments",
								clipId: clip.id
							}),
							ariaLabel: "Commentaires",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							label: compact(clip.saves + (saved ? 1 : 0)),
							onClick: () => save(clip.id),
							ariaLabel: "Enregistrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-7", saved && "fill-accent text-accent") })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							label: "Partager",
							onClick: () => push({
								t: "share",
								clipId: clip.id
							}),
							ariaLabel: "Partager",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => sound && push({
								t: "sound",
								soundId: sound.id
							}),
							className: "mt-1",
							"aria-label": "Son original",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("block size-10 overflow-hidden rounded-full shadow-[0_0_0_1px_rgb(242_238_230_/_0.2)]", active && !paused ? "animate-spin" : ""),
								style: { animationDuration: "4s" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: clip.poster,
									alt: "",
									className: "size-full object-cover"
								})
							})
						})
					]
				})]
			}),
			clip.live || clip.photo ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMuted(!muted),
				className: "absolute right-3 top-[calc(3.5rem+env(safe-area-inset-top))] flex size-11 items-center justify-center rounded-full bg-bg/40 text-fg",
				"aria-label": muted ? "Activer le son" : "Couper le son",
				children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
			}),
			clip.live || clip.photo ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] h-0.5 bg-fg/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-fg/80",
					style: { width: `${progress * 100}%` }
				})
			})
		]
	});
}
function Action({ label, onClick, children, ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex flex-col items-center gap-0.5",
		"aria-label": ariaLabel,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium tabular-nums",
			children: label
		})]
	});
}
function ClipPager({ ids, startId, header }) {
	const root = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(startId ?? ids[0] ?? "");
	const myClips = useSway((s) => s.myClips);
	const hidden = useSway((s) => s.hidden);
	const clips = (0, import_react.useMemo)(() => {
		const all = [...myClips, ...CLIPS];
		const map = new Map(all.map((c) => [c.id, c]));
		return ids.map((id) => map.get(id)).filter((c) => c !== void 0 && !hidden.includes(c.id));
	}, [
		ids,
		myClips,
		hidden
	]);
	(0, import_react.useEffect)(() => {
		const scroller = root.current;
		if (!scroller) return;
		const io = new IntersectionObserver((entries) => {
			const id = (entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]?.target)?.dataset.clip;
			if (id) setActive(id);
		}, {
			root: scroller,
			threshold: [.55, .75]
		});
		scroller.querySelectorAll("[data-clip]").forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, [clips]);
	(0, import_react.useEffect)(() => {
		if (!startId || !root.current) return;
		root.current.querySelector(`[data-clip="${startId}"]`)?.scrollIntoView({ block: "start" });
		setActive(startId);
	}, [startId]);
	const activeIndex = clips.findIndex((c) => c && c.id === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: root,
			className: "no-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-none",
			children: [clips.map((clip, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"data-clip": clip.id,
				className: "relative h-full w-full snap-start snap-always",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipCard, {
					clip,
					active: clip.id === active,
					load: Math.abs(i - Math.max(0, activeIndex)) <= 1
				})
			}, clip.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex h-full snap-start flex-col items-center justify-center gap-3 bg-bg px-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-tight",
						children: "Tu es à jour"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Reviens en haut pour relancer le flux."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-fg",
						onClick: () => root.current?.scrollTo({
							top: 0,
							behavior: "smooth"
						}),
						children: "Reprendre"
					})
				]
			})]
		}), header]
	});
}
function HomeFeed() {
	const { feed, setFeed, setTab } = useNav();
	const followed = useSway((s) => s.followed);
	const myClips = useSway((s) => s.myClips);
	const ids = feed === "following" ? [...myClips, ...CLIPS].filter((c) => followed.includes(c.userId)).map((c) => c.id) : feed === "live" ? [...myClips, ...CLIPS].filter((c) => c.live).map((c) => c.id) : [...myClips, ...CLIPS].map((c) => c.id);
	const header = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-end justify-center pt-[calc(0.75rem+env(safe-area-inset-top))]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex items-center gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLabel, {
					active: feed === "following",
					onClick: () => setFeed("following"),
					children: "Suivis"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLabel, {
					active: feed === "fyp",
					onClick: () => setFeed("fyp"),
					children: "Flux"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLabel, {
					active: feed === "live",
					onClick: () => setFeed("live"),
					children: "Live"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pointer-events-auto absolute right-3 top-[calc(0.6rem+env(safe-area-inset-top))] flex size-11 items-center justify-center text-fg",
			"aria-label": "Rechercher",
			onClick: () => setTab("discover"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "22",
				height: "22",
				viewBox: "0 0 24 24",
				fill: "none",
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "11",
					cy: "11",
					r: "6.5",
					stroke: "currentColor",
					strokeWidth: "1.8"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 16 L20 20",
					stroke: "currentColor",
					strokeWidth: "1.8",
					strokeLinecap: "round"
				})]
			})
		})]
	});
	if (feed === "following" && ids.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-bg",
		children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col items-center justify-center gap-2 px-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tracking-tight",
				children: "Personne ici"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Suis des comptes depuis le flux pour les retrouver ici."
			})]
		})]
	});
	if (feed === "live" && ids.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-bg",
		children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col items-center justify-center gap-2 px-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tracking-tight",
				children: "Aucun live"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Reviens plus tard, ou ouvre le flux."
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipPager, {
		ids,
		header
	});
}
function TabLabel({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("relative pb-1 text-[15px] font-medium tracking-tight", active ? "text-fg" : "text-fg/55"),
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-fg transition-opacity duration-150", active ? "opacity-100" : "opacity-0") })]
	});
}
function Discover$1() {
	const { push } = useNav();
	const [q, setQ] = (0, import_react.useState)("");
	const [chip, setChip] = (0, import_react.useState)("Tendance");
	const me = useSway((s) => s.me);
	const myClips = useSway((s) => s.myClips);
	const query = q.trim().toLowerCase();
	const people = (0, import_react.useMemo)(() => {
		const list = Object.values(USERS);
		if (!query) return list.slice(0, 6);
		return list.filter((u) => u.name.toLowerCase().includes(query) || u.handle.toLowerCase().includes(query));
	}, [query]);
	const clips = (0, import_react.useMemo)(() => {
		const all = [...myClips, ...CLIPS];
		let next = all;
		if (query) next = all.filter((c) => c.caption.toLowerCase().includes(query) || c.tags.some((t) => t.includes(query)) || userById(c.userId, me)?.handle.toLowerCase().includes(query));
		else if (chip === "Montréal") next = all.filter((c) => c.tags.some((t) => [
			"montreal",
			"mtl",
			"longueuil"
		].includes(t)));
		else if (chip === "Cuisine") next = all.filter((c) => c.tags.some((t) => [
			"cafe",
			"latteart",
			"pain",
			"levain"
		].includes(t)));
		else if (chip === "Plein air") next = all.filter((c) => c.tags.some((t) => [
			"trail",
			"aube",
			"laurentides"
		].includes(t)));
		else if (chip === "Art") next = all.filter((c) => c.tags.some((t) => [
			"ceramique",
			"studio",
			"mains"
		].includes(t)));
		else if (chip === "Sport") next = all.filter((c) => c.tags.some((t) => [
			"hoops",
			"skate",
			"beton"
		].includes(t)));
		return next;
	}, [
		query,
		chip,
		myClips,
		me
	]);
	const tags = (0, import_react.useMemo)(() => {
		if (!query) return HASHTAGS;
		return HASHTAGS.filter((h) => h.tag.includes(query));
	}, [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pb-3 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-tight",
					children: "Découvrir"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 flex h-11 items-center gap-2 rounded-md bg-surface px-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Comptes, sons, hashtags",
						className: "h-full w-full bg-transparent text-sm outline-none placeholder:text-subtle"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3",
				children: TRENDING.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setChip(c),
					className: cn("h-9 shrink-0 rounded-full px-3.5 text-sm font-medium", chip === c ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg"),
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-24",
				children: [
					people.length > 0 && (query || chip === "Tendance") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
							children: "Comptes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "no-scrollbar flex gap-3 overflow-x-auto",
							children: people.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => push({
									t: "user",
									userId: u.id
								}),
								className: "flex w-20 shrink-0 flex-col items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									user: u,
									size: "lg",
									className: "rounded-full"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-full truncate text-center text-[11px] text-muted",
									children: u.handle
								})]
							}, u.id))
						})]
					}) : null,
					!query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
							children: "Tendances"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1",
							children: HASHTAGS.slice(0, 4).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => push({
									t: "tag",
									tag: h.tag
								}),
								className: "flex h-12 items-center justify-between rounded-md px-1 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-medium",
									children: ["#", h.tag]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [h.views, " vues"]
								})]
							}, h.tag))
						})]
					}) : tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
							children: "Hashtags"
						}), tags.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => push({
								t: "tag",
								tag: h.tag
							}),
							className: "flex h-11 w-full items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", h.tag] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: h.views
							})]
						}, h.tag))]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
							children: "Clips"
						}), clips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted",
							children: "Aucun clip pour cette recherche."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-0.5",
							children: clips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "relative aspect-[3/4] overflow-hidden bg-surface",
								onClick: () => push({
									t: "viewer",
									clipId: c.id,
									ids: clips.map((x) => x.id)
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.poster,
									alt: "",
									className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
								}), c.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-1 top-1 rounded-xs bg-live px-1 py-px text-[9px] font-medium uppercase text-fg",
									children: "Live"
								}) : null]
							}, c.id))
						})]
					})
				]
			})
		]
	});
}
function Inbox$2() {
	const [seg, setSeg] = (0, import_react.useState)("activity");
	const threads = useSway((s) => s.threads);
	const me = useSway((s) => s.me);
	const { push } = useNav();
	const listed = seg === "matchs" ? threads.filter((t) => t.match) : threads;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tracking-tight",
				children: "Boîte"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex rounded-md bg-surface p-1",
				children: [
					["activity", "Activité"],
					["messages", "Messages"],
					["matchs", "Matchs"]
				].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSeg(k),
					className: cn("h-9 flex-1 rounded-sm text-sm font-medium", seg === k ? "bg-surface-2 text-fg" : "text-muted"),
					children: l
				}, k))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-scrollbar mt-2 min-h-0 flex-1 overflow-y-auto pb-24",
			children: seg === "activity" ? ACTIVITY.map((a) => {
				const u = a.userId ? userById(a.userId, me) : void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-center gap-3 px-4 py-3 text-left",
					onClick: () => {
						if (a.clipId) push({
							t: "viewer",
							clipId: a.clipId,
							ids: [a.clipId]
						});
						else if (a.userId) push({
							t: "user",
							userId: a.userId
						});
					},
					children: [u ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { user: u }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-md bg-surface-2 font-display text-accent",
						children: "S"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block truncate text-sm",
							children: [u ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: [u.name, " "]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: a.text
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle",
							children: timeAgo(a.time)
						})]
					})]
				}, a.id);
			}) : listed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 py-10 text-center text-sm text-muted",
				children: seg === "matchs" ? "Aucun match. Dis Hello dans World Room." : "Pas encore de messages."
			}) : listed.map((th) => {
				const u = userById(th.userId, me);
				if (!u) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-center gap-3 px-4 py-3 text-left",
					onClick: () => push({
						t: "chat",
						threadId: th.id
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { user: u }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-medium",
									children: u.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle",
									children: timeAgo(th.time)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm text-muted",
								children: th.preview
							})]
						}),
						th.match ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-fg",
							children: "Match"
						}) : th.unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-accent" }) : null
					]
				}, th.id);
			})
		})]
	});
}
function Chat({ threadId }) {
	const { pop, push } = useNav();
	const thread = useSway((s) => s.threads.find((t) => t.id === threadId));
	const send = useSway((s) => s.sendMessage);
	const me = useSway((s) => s.me);
	const [text, setText] = (0, import_react.useState)("");
	const u = thread ? userById(thread.userId, me) : void 0;
	if (!thread || !u) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenHeader, {
			title: "Message",
			onBack: pop
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-6 text-sm text-muted",
			children: "Conversation introuvable."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenHeader, {
				title: u.name,
				onBack: pop
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-3",
				children: thread.messages.map((m) => {
					const shared = m.clipId ? getClip(m.clipId) : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("max-w-[80%] overflow-hidden rounded-lg text-sm leading-snug", m.fromMe ? "ml-auto bg-accent text-accent-fg" : "bg-surface-2 text-fg"),
						children: shared ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "block w-full text-left",
							onClick: () => push({
								t: "viewer",
								clipId: shared.id,
								ids: [shared.id]
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: shared.poster,
								alt: "",
								className: "h-36 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2",
									children: shared.caption
								}), m.text && m.text !== shared.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[12px] opacity-80",
									children: m.text
								}) : null]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-2",
							children: m.text
						})
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2",
				onSubmit: (e) => {
					e.preventDefault();
					const v = text.trim();
					if (!v) return;
					send(thread.id, v);
					setText("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Message",
					className: "h-11 flex-1 rounded-md bg-surface px-3 text-sm outline-none placeholder:text-subtle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "md",
					children: "Envoyer"
				})]
			})
		]
	});
}
function ProfileHome() {
	const { push } = useNav();
	const me = useSway((s) => s.me);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBody, {
		userId: me.id,
		headerRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "flex size-11 items-center justify-center",
			"aria-label": "Réglages",
			onClick: () => push({ t: "settings" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
		}),
		self: true
	});
}
function UserScreen({ userId }) {
	const { pop } = useNav();
	const u = userById(userId, useSway.getState().me, useSway.getState().accounts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenHeader, {
			title: u?.handle ? `@${u.handle}` : "Profil",
			onBack: pop
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBody, { userId })]
	});
}
function ProfileBody({ userId, headerRight, self }) {
	const { push } = useNav();
	const me = useSway((s) => s.me);
	const followed = useSway((s) => s.followed);
	const follow = useSway((s) => s.follow);
	const liked = useSway((s) => s.liked);
	const saved = useSway((s) => s.saved);
	const myClips = useSway((s) => s.myClips);
	const user = userById(userId, me, useSway.getState().accounts);
	const [pane, setPane] = (0, import_react.useState)("clips");
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-sm text-muted",
		children: "Profil introuvable."
	});
	const theirs = clipsByUser(userId, myClips);
	const likedClips = CLIPS.filter((c) => liked.includes(c.id));
	const savedClips = [...myClips, ...CLIPS].filter((c) => saved.includes(c.id));
	const grid = pane === "clips" ? theirs : pane === "liked" ? likedClips : savedClips;
	const isMe = userId === me.id || userId === "me" || self;
	const isFollowed = followed.includes(user.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-1 flex-col", isMe && "absolute inset-0 bg-bg pt-[env(safe-area-inset-top)]"),
		children: [isMe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-12 items-center justify-between px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: ["@", user.handle]
			}), headerRight]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-scrollbar min-h-0 flex-1 overflow-y-auto pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center px-6 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							user,
							size: "xl",
							className: "rounded-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-xl tracking-tight",
							children: user.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: ["@", user.handle]
						}),
						user.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: user.location
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xs text-center text-sm leading-snug text-fg/90",
							children: user.bio
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex w-full max-w-xs justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									n: isMe ? followed.length : user.following,
									l: "Suivis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									n: user.followers + (isFollowed && !isMe ? 1 : 0),
									l: "Abonnés"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									n: user.likes,
									l: "J’aime"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex w-full gap-2",
							children: isMe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "flex-1",
								onClick: () => push({ t: "edit" }),
								children: "Modifier"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "line",
								className: "flex-1",
								onClick: async () => {
									const url = window.location.href;
									try {
										await navigator.clipboard.writeText(url);
									} catch {}
								},
								children: "Partager"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: isFollowed ? "ghost" : "primary",
								className: "flex-1",
								onClick: () => follow(user.id),
								children: isFollowed ? "Abonné" : "Suivre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "line",
								className: "flex-1",
								onClick: () => {
									const th = useSway.getState().threads.find((t) => t.userId === user.id);
									if (th) push({
										t: "chat",
										threadId: th.id
									});
									else push({
										t: "chat",
										threadId: "th-maya"
									});
								},
								children: "Message"
							})] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex border-t border-line",
					children: [
						[
							"clips",
							Grid3x3,
							"Clips"
						],
						[
							"liked",
							Heart,
							"J’aime"
						],
						[
							"saved",
							Bookmark,
							"Sauvés"
						]
					].map(([k, Icon, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": label,
						onClick: () => setPane(k),
						className: cn("flex h-12 flex-1 items-center justify-center", pane === k ? "text-fg" : "text-subtle"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
					}, k))
				}),
				grid.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-6 py-12 text-center text-sm text-muted",
					children: pane === "clips" ? isMe ? "Publie ton premier clip avec le bouton +" : "Aucun clip pour l’instant." : "Rien ici pour le moment."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-px bg-line",
					children: grid.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "relative aspect-[3/4] bg-surface",
						onClick: () => push({
							t: "viewer",
							clipId: c.id,
							ids: grid.map((x) => x.id)
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.poster,
							alt: "",
							className: "size-full object-cover"
						})
					}, c.id))
				})
			]
		})]
	});
}
function Stat$1({ n, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-base font-medium tabular-nums",
			children: compact(n)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted",
			children: l
		})]
	});
}
var LIVE_AUDIO = {
	echoCancellation: true,
	noiseSuppression: true,
	autoGainControl: true,
	channelCount: 1
};
var LIVE_VIDEO = {
	facingMode: "user",
	width: { ideal: 1280 },
	height: { ideal: 720 },
	frameRate: { ideal: 24 }
};
var LIVE_VIDEO_WEAK = {
	facingMode: "user",
	width: { ideal: 640 },
	height: { ideal: 360 },
	frameRate: { ideal: 12 }
};
function liveConstraints(audio, video = true, weak = false) {
	return {
		audio: audio ? LIVE_AUDIO : false,
		video: video ? weak ? LIVE_VIDEO_WEAK : LIVE_VIDEO : false
	};
}
function setTrackOn(stream, kind, on) {
	stream?.getTracks().forEach((t) => {
		if (t.kind === kind) t.enabled = on;
	});
}
function applyLinkQuality(stream, weak) {
	const track = stream?.getVideoTracks()[0];
	if (!track) return;
	track.applyConstraints(weak ? LIVE_VIDEO_WEAK : LIVE_VIDEO).catch(() => {});
}
function watchVoice(stream, onSpeak) {
	if (!stream.getAudioTracks()[0]) return () => {};
	const Ctx = window.AudioContext || window.webkitAudioContext;
	if (!Ctx) return () => {};
	const ctx = new Ctx();
	const src = ctx.createMediaStreamSource(stream);
	const analyser = ctx.createAnalyser();
	analyser.fftSize = 512;
	analyser.smoothingTimeConstant = .4;
	src.connect(analyser);
	const data = new Uint8Array(analyser.fftSize);
	let raf = 0;
	let last = false;
	const tick = () => {
		analyser.getByteTimeDomainData(data);
		let sum = 0;
		for (let i = 0; i < data.length; i++) {
			const v = (data[i] - 128) / 128;
			sum += v * v;
		}
		const on = Math.sqrt(sum / data.length) > .045;
		if (on !== last) {
			last = on;
			onSpeak(on);
		}
		raf = requestAnimationFrame(tick);
	};
	ctx.resume().then(() => tick());
	return () => {
		cancelAnimationFrame(raf);
		src.disconnect();
		ctx.close();
	};
}
function mime() {
	return [
		"video/webm;codecs=vp9",
		"video/webm;codecs=vp8",
		"video/webm",
		"video/mp4"
	].find((t) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) ?? "";
}
function CreateStudio({ duoOf }) {
	const { pop, setTab, toast } = useNav();
	const publish = useSway((s) => s.publish);
	const me = useSway((s) => s.me);
	const fileRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const chunks = (0, import_react.useRef)([]);
	const [stream, setStream] = (0, import_react.useState)(null);
	const [facing, setFacing] = (0, import_react.useState)("user");
	const [cam, setCam] = (0, import_react.useState)("idle");
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [count, setCount] = (0, import_react.useState)(null);
	const [media, setMedia] = (0, import_react.useState)(null);
	const [caption, setCaption] = (0, import_react.useState)("");
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [timer, setTimer] = (0, import_react.useState)(0);
	const [fx, setFx] = (0, import_react.useState)("none");
	const [amt, setAmt] = (0, import_react.useState)(80);
	const [panel, setPanel] = (0, import_react.useState)(duoOf ? null : "fx");
	const [layout, setLayout] = (0, import_react.useState)("split");
	const [swap, setSwap] = (0, import_react.useState)(false);
	const [duoStep, setDuoStep] = (0, import_react.useState)(duoOf ? "layout" : "studio");
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [grid, setGrid] = (0, import_react.useState)(false);
	const [mix, setMix] = (0, import_react.useState)(70);
	const [sample, setSample] = (0, import_react.useState)("/posters/latte.jpg");
	const [focus, setFocus] = (0, import_react.useState)(null);
	const original = duoOf ? getClip(duoOf) : void 0;
	const origUser = original ? userById(original.userId, me) : void 0;
	const swipeX = (0, import_react.useRef)(null);
	const [banner, setBanner] = (0, import_react.useState)(null);
	const origVideo = (0, import_react.useRef)(null);
	const pickFx = (id) => {
		setFx(id);
		if (id !== "none") setAmt((a) => a < 20 ? 80 : a);
		const label = getFilter(id).label;
		setBanner(label);
		window.setTimeout(() => setBanner((b) => b === label ? null : b), 900);
	};
	(0, import_react.useEffect)(() => {
		openCam("user");
		return () => stopStream();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!stream) return;
		const video = document.createElement("video");
		video.srcObject = stream;
		video.muted = true;
		video.playsInline = true;
		video.play().catch(() => {});
		const canvas = document.createElement("canvas");
		const snap = () => {
			if (!video.videoWidth) return;
			canvas.width = 160;
			canvas.height = 160;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const side = Math.min(video.videoWidth, video.videoHeight);
			const sx = (video.videoWidth - side) / 2;
			const sy = (video.videoHeight - side) / 2;
			if (facing === "user") {
				ctx.translate(160, 0);
				ctx.scale(-1, 1);
			}
			ctx.drawImage(video, sx, sy, side, side, 0, 0, 160, 160);
			setSample(canvas.toDataURL("image/jpeg", .72));
		};
		const id = window.setInterval(snap, 1200);
		video.addEventListener("loadeddata", snap);
		return () => {
			window.clearInterval(id);
			video.srcObject = null;
		};
	}, [stream, facing]);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const t = window.setInterval(() => {
			setElapsed((s) => {
				if (s >= 14) {
					stopRec();
					return 15;
				}
				return s + 1;
			});
		}, 1e3);
		return () => window.clearInterval(t);
	}, [recording]);
	(0, import_react.useEffect)(() => {
		const el = origVideo.current;
		if (!el) return;
		el.volume = mix / 100;
		el.muted = mix === 0;
	}, [mix, duoStep]);
	const stopStream = () => {
		recRef.current?.stop();
		stream?.getTracks().forEach((t) => t.stop());
	};
	const openCam = async (side) => {
		try {
			stream?.getTracks().forEach((t) => t.stop());
			const s = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: { ideal: side },
					width: { ideal: 1280 },
					height: { ideal: 720 },
					frameRate: { ideal: 24 }
				},
				audio: LIVE_AUDIO
			});
			setStream(s);
			setFacing(side);
			setZoom(1);
			setCam("on");
		} catch {
			setCam("off");
			setStream(null);
		}
	};
	const startRec = () => {
		if (!stream || recording) return;
		const type = mime();
		let rec;
		try {
			rec = type ? new MediaRecorder(stream, { mimeType: type }) : new MediaRecorder(stream);
		} catch {
			toast("Enregistrement indisponible. Importe un clip.");
			return;
		}
		chunks.current = [];
		rec.ondataavailable = (e) => {
			if (e.data.size) chunks.current.push(e.data);
		};
		rec.onstop = () => {
			const blob = new Blob(chunks.current, { type: rec.mimeType || "video/webm" });
			const url = URL.createObjectURL(blob);
			setMedia({
				url,
				poster: url,
				kind: "video"
			});
			setRecording(false);
		};
		recRef.current = rec;
		rec.start(200);
		setElapsed(0);
		setRecording(true);
		const ov = origVideo.current;
		if (ov && mix > 0) {
			ov.muted = false;
			ov.volume = mix / 100;
			ov.play().catch(() => {});
		}
	};
	const stopRec = () => {
		if (recRef.current && recRef.current.state !== "inactive") recRef.current.stop();
		setRecording(false);
	};
	const armed = () => {
		if (timer <= 0) {
			startRec();
			return;
		}
		setCount(timer);
		let n = timer;
		const tick = window.setInterval(() => {
			n -= 1;
			if (n <= 0) {
				window.clearInterval(tick);
				setCount(null);
				startRec();
			} else setCount(n);
		}, 1e3);
	};
	const onFiles = (files) => {
		if (!files.length) return;
		const images = files.filter((f) => f.type.startsWith("image"));
		const videos = files.filter((f) => f.type.startsWith("video"));
		stream?.getTracks().forEach((t) => t.stop());
		setStream(null);
		if (videos[0]) {
			const url = URL.createObjectURL(videos[0]);
			setMedia({
				url,
				poster: url,
				kind: "video"
			});
			return;
		}
		if (images.length > 1) {
			const urls = images.map((f) => URL.createObjectURL(f));
			setMedia({
				url: urls[0],
				poster: urls[0],
				kind: "image",
				photos: urls
			});
			return;
		}
		if (images[0]) {
			const url = URL.createObjectURL(images[0]);
			setMedia({
				url,
				poster: url,
				kind: "image"
			});
		}
	};
	const post = () => {
		if (!media) return;
		const tags = Array.from(caption.matchAll(/#(\p{L}+)/gu)).map((m) => m[1].toLowerCase());
		const payload = {
			src: media.kind === "video" ? media.url : "",
			poster: media.poster,
			caption: caption.trim() || (duoOf ? "Duo" : "Nouveau clip"),
			tags: tags.length ? tags : duoOf ? ["duo"] : ["sway"],
			soundId: original?.soundId ?? "s-steam",
			photo: media.kind === "image",
			photos: media.photos,
			duoOf,
			duoLayout: duoOf ? layout : void 0,
			duoSwap: duoOf ? swap : void 0,
			filter: fx === "none" ? void 0 : fx,
			filterAmt: fx === "none" ? void 0 : amt,
			speed: speed === 1 ? void 0 : speed
		};
		publish(payload);
		toast("Publié dans ton profil");
		pop();
		setTab("profile");
	};
	if (media) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: () => setMedia(null),
						"aria-label": "Retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: duoOf ? "Duo" : media.photos ? "Carrousel" : "Nouveau clip"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-11" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-4 mt-2 aspect-[9/16] max-h-[38vh] overflow-hidden rounded-lg bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preview, {
					media,
					original,
					fx,
					amt,
					speed,
					layout,
					swap,
					origName: origUser ? `@${origUser.handle}` : "Original"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRail, {
					value: fx,
					onChange: pickFx,
					sample: media.poster
				})
			}),
			fx !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterAmount, {
					value: amt,
					onChange: setAmt
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 px-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: caption,
					onChange: (e) => setCaption(e.target.value),
					placeholder: "Une légende, des #hashtags…",
					rows: 3,
					className: "w-full resize-none rounded-md bg-surface p-3 text-sm outline-none placeholder:text-subtle shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						duoOf ? `${duoLabel(layout)} · ` : null,
						fx !== "none" ? `${getFilter(fx).label} ${amt}% · ` : null,
						speed !== 1 ? `${speed.toString().replace(".", ",")}× · ` : null,
						"Visible par tout le monde"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: post,
					children: "Publier"
				})
			})
		]
	});
	if (original && duoStep === "layout") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: original.src,
				poster: original.poster,
				className: "absolute inset-0 size-full object-cover",
				autoPlay: true,
				loop: true,
				muted: true,
				playsInline: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between px-3 pt-[env(safe-area-inset-top)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: pop,
						"aria-label": "Fermer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg italic tracking-tight",
						children: "Duo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-11" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mt-auto px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl tracking-tight",
						children: ["Avec ", origUser ? `@${origUser.handle}` : "ce clip"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Choisis comment vous apparaissez ensemble."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutPicker, {
							value: layout,
							onChange: setLayout,
							poster: original.poster
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-xs text-muted",
						children: duoLabel(layout)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "mt-4",
						onClick: () => setDuoStep("studio"),
						children: "Continuer"
					})
				]
			})
		]
	});
	const camera = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraFeed, {
		stream,
		facing,
		ready: cam === "on",
		zoom,
		fit: original ? "cover" : "contain"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col bg-bg",
		children: [
			original ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuoFrame, {
				layout,
				swap,
				className: "absolute inset-0",
				originalName: origUser ? `@${origUser.handle}` : "Original",
				selfName: "Toi",
				original: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: origVideo,
					src: original.src,
					poster: original.poster,
					className: "absolute inset-0 size-full object-cover",
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true
				}),
				self: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterStage, {
					id: fx,
					amount: amt,
					className: "absolute inset-0",
					children: [camera, cam !== "on" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-surface-2" }) : null]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterStage, {
				id: fx,
				amount: amt,
				className: "absolute inset-0",
				children: [camera, cam !== "on" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-surface-2" }) : null]
			}),
			grid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridOverlay, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[1]",
				onPointerDown: (e) => {
					swipeX.current = e.clientX;
				},
				onPointerUp: (e) => {
					if (swipeX.current == null) return;
					const dx = e.clientX - swipeX.current;
					swipeX.current = null;
					if (Math.abs(dx) >= 48) {
						pickFx(cycleFilter(fx, dx < 0 ? 1 : -1));
						setPanel("fx");
						return;
					}
					const rect = e.currentTarget.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					setFocus({
						x,
						y
					});
					window.setTimeout(() => setFocus(null), 700);
				}
			}),
			focus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute z-20 size-14 rounded-sm shadow-[0_0_0_1px_rgb(242_238_230_/_0.85)] cam-focus",
				style: {
					left: focus.x - 28,
					top: focus.y - 28
				}
			}) : null,
			banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute inset-x-0 top-[42%] z-20 text-center font-display text-3xl tracking-tight anim-fxname",
				children: banner
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between px-3 pt-[env(safe-area-inset-top)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: pop,
						"aria-label": "Fermer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg italic tracking-tight",
						children: duoOf ? "Duo" : "Sway"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex",
						children: [duoOf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							"aria-label": "Inverser",
							onClick: () => setSwap((s) => !s),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat2, { className: "size-5" })
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							"aria-label": "Retourner la caméra",
							onClick: () => void openCam(facing === "user" ? "environment" : "user"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal, { className: "size-5" })
						})]
					})
				]
			}),
			count !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-7xl tabular-nums text-fg",
					children: count
				})
			}) : null,
			recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 top-[calc(3.2rem+env(safe-area-inset-top))] z-10 flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-xs font-medium tabular-nums",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-fg anim-rec" }),
					"0:",
					String(elapsed).padStart(2, "0")
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mt-4 flex flex-col items-end gap-3 pr-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						label: "Vitesse",
						onClick: () => setPanel(panel === "speed" ? null : "speed"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] font-medium",
							children: [speed.toString().replace(".", ","), "×"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						label: timer ? `${timer} s` : "Timer",
						onClick: () => setPanel(panel === "timer" ? null : "timer"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						label: fx === "none" ? "FX" : getFilter(fx).label,
						onClick: () => setPanel(panel === "fx" ? null : "fx"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blend, { className: "size-5" })
					}),
					duoOf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						label: "Son",
						onClick: () => setPanel(panel === "mix" ? null : "mix"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
					}) : null,
					duoOf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						label: "Cadre",
						onClick: () => setPanel(panel === "layout" ? null : "layout"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-medium",
							children: "Duo"
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						label: "Grille",
						onClick: () => setGrid((g) => !g),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: cn("size-5", grid && "text-accent") })
					})
				]
			}),
			panel === "speed" || panel === "timer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mt-3 flex justify-end pr-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-w-[70%] flex-wrap justify-end gap-1.5",
					children: [panel === "speed" ? SPEEDS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: speed === s,
						onClick: () => setSpeed(s),
						children: [s.toString().replace(".", ","), "×"]
					}, s)) : null, panel === "timer" ? [
						0,
						3,
						10
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: timer === n,
						onClick: () => setTimer(n),
						children: n === 0 ? "Off" : `${n} s`
					}, n)) : null]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mt-auto flex flex-col items-center gap-4 pb-[calc(1.75rem+env(safe-area-inset-bottom))]",
				children: [
					cam === "off" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-8 text-center text-sm text-muted",
						children: "Caméra bloquée. Autorise-la, ou importe depuis la galerie."
					}) : null,
					panel === "layout" && original ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutPicker, {
							value: layout,
							onChange: setLayout,
							poster: original.poster
						})
					}) : null,
					panel === "mix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full items-center gap-3 px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted",
								children: "Original"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: 100,
								value: mix,
								"aria-label": "Volume de l’original",
								onChange: (e) => setMix(Number(e.target.value)),
								className: "h-1 flex-1 cursor-pointer appearance-none rounded-full bg-fg/20 accent-accent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-right text-[11px] tabular-nums text-muted",
								children: mix
							})
						]
					}) : null,
					panel === "fx" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRail, {
							value: fx,
							onChange: pickFx,
							sample
						}), fx !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterAmount, {
								value: amt,
								onChange: setAmt
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 px-4 text-center text-[11px] text-muted",
							children: "Glisse pour changer de look"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: [1, 2].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setZoom(z),
							className: cn("h-8 min-w-8 rounded-full px-2.5 text-[11px] font-medium tabular-nums", zoom === z ? "bg-fg text-bg" : "bg-bg/50 text-fg"),
							children: [z, "×"]
						}, z))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex flex-col items-center gap-1 text-[11px] text-muted",
								onClick: () => fileRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 items-center justify-center rounded-md bg-surface-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5 text-fg" })
								}), "Galerie"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": recording ? "Arrêter" : "Enregistrer",
								onClick: () => recording ? stopRec() : armed(),
								disabled: cam !== "on" && !recording,
								className: "flex size-20 items-center justify-center rounded-full bg-fg/15 disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("rounded-full shadow-[0_0_0_3px_rgb(8_8_10)] transition-[border-radius,width,height] duration-150", recording ? "size-8 rounded-xs bg-live" : "size-16 bg-accent") })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-11" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "video/*,image/*",
				multiple: true,
				className: "hidden",
				onChange: (e) => onFiles(Array.from(e.target.files ?? []))
			})
		]
	});
}
function CameraFeed({ stream, facing, ready, zoom, fit }) {
	const video = (0, import_react.useRef)(null);
	const [frame, setFrame] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setFrame(false);
		const el = video.current;
		if (!el) return;
		el.srcObject = stream;
		if (!stream) return;
		const show = () => setFrame(true);
		el.addEventListener("loadeddata", show);
		el.play().catch(() => {});
		return () => {
			el.removeEventListener("loadeddata", show);
			el.srcObject = null;
		};
	}, [stream]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 overflow-hidden bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: video,
			muted: true,
			playsInline: true,
			autoPlay: true,
			className: cn("absolute inset-0 size-full transition-opacity duration-300 ease-out", fit === "cover" ? "object-cover" : "object-contain", frame && ready ? "opacity-100" : "opacity-0"),
			style: {
				transform: `${facing === "user" ? "scaleX(-1) " : ""}scale(${zoom})`,
				transformOrigin: "center center"
			}
		})
	});
}
function GridOverlay() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-[1]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-1/3 w-px bg-fg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-2/3 w-px bg-fg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 top-1/3 h-px bg-fg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 top-2/3 h-px bg-fg/25" })
		]
	});
}
function Preview({ media, original, fx, amt, speed, layout, swap, origName }) {
	const self = media.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		src: media.url,
		className: "absolute inset-0 size-full object-contain",
		loop: true,
		muted: true,
		autoPlay: true,
		playsInline: true,
		ref: (el) => {
			if (el) el.playbackRate = speed;
		}
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: media.poster,
		alt: "",
		className: "absolute inset-0 size-full object-cover"
	});
	if (original && media.kind === "video") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuoFrame, {
		layout,
		swap,
		className: "size-full",
		originalName: origName,
		selfName: "Toi",
		original: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src: original.src,
			poster: original.poster,
			className: "absolute inset-0 size-full object-cover",
			loop: true,
			muted: true,
			autoPlay: true,
			playsInline: true
		}),
		self: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
			id: fx,
			amount: amt,
			className: "absolute inset-0",
			children: self
		})
	});
	if (media.photos?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
		id: fx,
		amount: amt,
		className: "size-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex overflow-x-auto snap-x snap-mandatory",
			children: media.photos.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "h-full w-full shrink-0 snap-center object-cover"
			}, src))
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStage, {
		id: fx,
		amount: amt,
		className: "size-full",
		children: self
	});
}
function Tool({ label, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex flex-col items-center gap-1 text-[10px] text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-11 items-center justify-center rounded-full bg-bg/40",
			children
		}), label]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 rounded-full px-3 text-xs font-medium", active ? "bg-fg text-bg" : "bg-bg/50 text-fg"),
		children
	});
}
function CommentsSheet({ clipId }) {
	const { pop } = useNav();
	const me = useSway((s) => s.me);
	useSway((s) => s.extraComments);
	const add = useSway((s) => s.addComment);
	const likeComment = useSway((s) => s.likeComment);
	const liked = useSway((s) => s.commentLikes);
	const accounts = useSway((s) => s.accounts);
	const [text, setText] = (0, import_react.useState)("");
	const comments = commentsFor(clipId);
	const clip = getClip(clipId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[min(32rem,82dvh)] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-4 pb-2 text-center text-sm font-medium",
				children: [compact(comments.length), " commentaires"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4",
				children: comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted",
					children: "Sois le premier à commenter."
				}) : comments.map((c) => {
					const u = userById(c.userId, me, accounts);
					if (!u) return null;
					const on = liked.includes(c.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: pop,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									user: u,
									size: "sm",
									className: "rounded-full"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[13px] leading-snug",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: u.handle
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-fg/90",
											children: c.text
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-subtle",
									children: timeAgo(c.createdAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex flex-col items-center gap-0.5 text-muted",
								onClick: () => likeComment(c.id),
								"aria-label": "Aimer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 ${on ? "fill-heart text-heart" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] tabular-nums",
									children: compact(c.likes + (on ? 1 : 0))
								})]
							})
						]
					}, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-center gap-2 border-t border-line px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]",
				onSubmit: (e) => {
					e.preventDefault();
					const v = text.trim();
					if (!v || !clip) return;
					add(clipId, v);
					setText("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						user: me,
						size: "sm",
						className: "rounded-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: text,
						onChange: (e) => setText(e.target.value),
						placeholder: "Ajouter un commentaire",
						className: "h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						disabled: !text.trim(),
						children: "Envoyer"
					})
				]
			})
		]
	});
}
function ShareSheet({ clipId }) {
	const { pop, push, toast } = useNav();
	const save = useSway((s) => s.save);
	const hide = useSway((s) => s.hide);
	const sendMessage = useSway((s) => s.sendMessage);
	const bumpShare = useSway((s) => s.bumpShare);
	const saved = useSway((s) => s.saved.includes(clipId));
	const clip = getClip(clipId);
	const threads = useSway((s) => s.threads);
	const me = useSway((s) => s.me);
	const accounts = useSway((s) => s.accounts);
	const author = clip ? userById(clip.userId, me, accounts) : void 0;
	const sound = clip ? SOUNDS[clip.soundId] : void 0;
	const link = typeof window !== "undefined" ? `${window.location.origin}/?clip=${clipId}` : "";
	const [q, setQ] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const people = (0, import_react.useMemo)(() => {
		const list = threads.map((th) => {
			const u = userById(th.userId, me, accounts);
			return u ? {
				th,
				u
			} : null;
		}).filter((x) => !!x);
		const s = q.trim().toLowerCase();
		if (!s) return list;
		return list.filter(({ u }) => u.name.toLowerCase().includes(s) || u.handle.toLowerCase().includes(s));
	}, [
		threads,
		me,
		accounts,
		q
	]);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(link);
			bumpShare(clipId);
			toast("Lien copié");
		} catch {
			toast("Impossible de copier");
		}
	};
	const nativeShare = async () => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Sway",
					text: clip?.caption ?? "Un clip Sway",
					url: link
				});
				bumpShare(clipId);
				return;
			}
			await copy();
		} catch {}
	};
	const download = () => {
		if (!clip?.src) {
			toast("Rien à télécharger");
			return;
		}
		const a = document.createElement("a");
		a.href = clip.src;
		a.download = `sway-${clip.id}.mp4`;
		a.click();
		toast("Téléchargement lancé");
	};
	const sendPicked = () => {
		if (!picked.length) return;
		const text = note.trim() || (clip ? clip.caption : "Clip Sway");
		for (const id of picked) sendMessage(id, text, clipId);
		bumpShare(clipId);
		const last = picked[picked.length - 1];
		const u = people.find((p) => p.th.id === last)?.u;
		pop();
		push({
			t: "chat",
			threadId: last
		});
		toast(picked.length > 1 ? `Envoyé à ${picked.length} personnes` : `Envoyé à @${u?.handle ?? ""}`);
	};
	const toggle = (id) => {
		setPicked((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-[calc(0.25rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-3 text-center text-sm font-medium",
				children: "Partager"
			}),
			clip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-4 flex gap-3 overflow-hidden rounded-lg bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: clip.poster,
					alt: "",
					className: "h-[5.5rem] w-[4.1rem] shrink-0 object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 py-2.5 pr-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-sm leading-snug",
							children: clip.caption
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 truncate text-[12px] text-muted",
							children: [
								"@",
								author?.handle ?? "sway",
								sound ? ` · ${sound.title}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-[11px] text-subtle",
							children: [
								compact(clip.likes),
								" j’aime · ",
								compact(clip.comments),
								" comm."
							]
						})
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 rounded-md bg-surface-2 px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Chercher un ami",
						className: "h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar mt-4 flex gap-3 overflow-x-auto px-4",
				children: people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-3 text-sm text-muted",
					children: "Aucun ami pour ce nom."
				}) : people.map(({ th, u }) => {
					const on = picked.includes(th.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-[4.25rem] shrink-0 flex-col items-center gap-1.5",
						onClick: () => toggle(th.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								user: u,
								className: "rounded-full"
							}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-accent-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-2.5",
									strokeWidth: 3
								})
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-full truncate text-center text-[11px] text-muted",
							children: u.name.split(" ")[0]
						})]
					}, th.id);
				})
			}),
			picked.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "Ajouter un mot…",
					className: "h-11 flex-1 rounded-md bg-surface px-3 text-sm outline-none placeholder:text-subtle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "md",
					onClick: sendPicked,
					children: ["Envoyer", picked.length > 1 ? ` (${picked.length})` : ""]
				})]
			}) : null,
			clip && !clip.live && !clip.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "mx-4 mt-4 flex items-center gap-3 overflow-hidden rounded-lg bg-accent px-3 py-2.5 text-left text-accent-fg",
				onClick: () => {
					pop();
					push({
						t: "create",
						duoOf: clipId
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative h-14 w-10 shrink-0 overflow-hidden rounded-sm bg-accent-fg/15",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: clip.poster,
						alt: "",
						className: "absolute inset-0 size-full object-cover opacity-80"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 right-0 w-1/2 bg-accent-fg/25" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), "Filmer un duo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 block text-[12px] text-accent-fg/70",
						children: ["Côte à côte, incrustation ou réaction avec @", author?.handle ?? "eux"]
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-2 pt-5 text-[11px] font-medium uppercase tracking-wider text-muted",
				children: "Autres"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-1 px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareAction, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-5" }),
						label: "Système",
						onClick: () => void nativeShare()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareAction, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-5" }),
						label: "Copier",
						onClick: () => void copy()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareAction, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5" }),
						label: "Fichier",
						onClick: download
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 px-2 pb-[calc(1rem+env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }),
						label: saved ? "Enregistré" : "Enregistrer",
						onClick: () => save(clipId)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-5" }),
						label: "Pas intéressé",
						onClick: () => {
							hide(clipId);
							toast("Clip masqué");
							pop();
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-5" }),
						label: "Signaler",
						onClick: () => toast("Signalement enregistré")
					})
				]
			})
		]
	});
}
function ShareRow({ icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex h-12 w-full items-center gap-3 px-2 text-sm",
		children: [icon, label]
	});
}
function ShareAction({ icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex flex-col items-center gap-1.5 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-12 items-center justify-center rounded-md bg-surface-2",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted",
			children: label
		})]
	});
}
function SettingsSheet() {
	const { pop, toast } = useNav();
	const muted = useSway((s) => s.muted);
	const setMuted = useSway((s) => s.setMuted);
	const me = useSway((s) => s.me);
	const accounts = useSway((s) => s.accounts);
	const switchAccount = useSway((s) => s.switchAccount);
	const createAccount = useSway((s) => s.createAccount);
	const [form, setForm] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [handle, setHandle] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-3 text-center text-sm font-medium",
				children: "Réglages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-2 pt-1 text-xs text-muted",
				children: "Comptes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex flex-col gap-1",
				children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						switchAccount(a.id);
						toast(`Connecté en @${a.handle}`);
					},
					className: "flex h-12 items-center gap-3 border-b border-line text-left text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							user: a,
							size: "sm",
							className: "rounded-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1 truncate",
							children: ["@", a.handle]
						}),
						a.id === me.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-accent",
							children: "Actif"
						}) : null
					]
				}, a.id))
			}),
			form ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nom",
						value: name,
						onChange: setName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Identifiant",
						value: handle,
						onChange: setHandle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "mt-3 w-full",
						onClick: () => {
							if (!name.trim() && !handle.trim()) return;
							const u = createAccount({
								name,
								handle
							});
							setForm(false);
							setName("");
							setHandle("");
							toast(`Compte @${u.handle} créé`);
						},
						children: "Créer"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mb-3 h-11 w-full rounded-md bg-surface-2 text-sm",
				onClick: () => setForm(true),
				children: "Nouveau compte"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
				label: "Son par défaut",
				value: muted ? "Coupe" : "Activé",
				onClick: () => setMuted(!muted)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
				label: "Lecture auto",
				value: "Wi-Fi et données"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
				label: "Confidentialité",
				value: "Public"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
				label: "Notifications",
				value: "Activées"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
				label: "À propos",
				value: "Sway 0.1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 h-11 w-full rounded-md text-sm text-heart",
				onClick: () => {
					try {
						localStorage.removeItem("sway-v1");
					} catch {}
					toast("Prototype réinitialisé");
					pop();
					window.location.reload();
				},
				children: "Réinitialiser le prototype"
			})
		]
	});
}
function Row$1({ label, value, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex h-12 w-full items-center justify-between border-b border-line text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: value
		})]
	});
}
function EditSheet() {
	const { pop, toast } = useNav();
	const me = useSway((s) => s.me);
	const setMe = useSway((s) => s.setMe);
	const [name, setName] = (0, import_react.useState)(me.name);
	const [handle, setHandle] = (0, import_react.useState)(me.handle);
	const [bio, setBio] = (0, import_react.useState)(me.bio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-3 text-center text-sm font-medium",
				children: "Modifier le profil"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nom",
				value: name,
				onChange: setName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Identifiant",
				value: handle,
				onChange: setHandle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-3 block text-xs text-muted",
				children: "Bio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: bio,
				onChange: (e) => setBio(e.target.value),
				rows: 3,
				className: "mt-1 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "mt-4",
				onClick: () => {
					setMe({
						name: name.trim() || me.name,
						handle: handle.replace(/^@/, "").trim() || me.handle,
						bio: bio.trim()
					});
					toast("Profil mis à jour");
					pop();
				},
				children: "Enregistrer"
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
		})]
	});
}
var GIFTS = [
	{
		id: "rose",
		label: "Rose",
		zems: 5,
		emoji: "🌹",
		Icon: Flower2,
		className: "text-heart"
	},
	{
		id: "tulipe",
		label: "Tulipe",
		zems: 8,
		emoji: "🌷",
		Icon: Flower2,
		className: "text-heart"
	},
	{
		id: "coeur",
		label: "Cœur",
		zems: 10,
		emoji: "❤️",
		Icon: Heart,
		className: "text-heart"
	},
	{
		id: "feu",
		label: "Feu",
		zems: 15,
		emoji: "🔥",
		Icon: Flame,
		className: "text-live"
	},
	{
		id: "clap",
		label: "Clap",
		zems: 20,
		emoji: "👏",
		Icon: Star,
		className: "text-accent"
	},
	{
		id: "etoile",
		label: "Étoile",
		zems: 25,
		emoji: "⭐",
		Icon: Star,
		className: "text-accent"
	},
	{
		id: "lion",
		label: "Lion",
		zems: 49,
		emoji: "🦁",
		Icon: Crown,
		className: "text-accent"
	},
	{
		id: "fusee",
		label: "Fusée",
		zems: 79,
		emoji: "🚀",
		Icon: Flame,
		className: "text-live"
	},
	{
		id: "couronne",
		label: "Couronne",
		zems: 99,
		emoji: "👑",
		Icon: Crown,
		className: "text-accent"
	},
	{
		id: "diamant",
		label: "Diamant",
		zems: 199,
		emoji: "💎",
		Icon: Gem,
		className: "text-accent"
	},
	{
		id: "chateau",
		label: "Château",
		zems: 299,
		emoji: "🏰",
		Icon: Crown,
		className: "text-accent"
	},
	{
		id: "planete",
		label: "Planète",
		zems: 499,
		emoji: "🪐",
		Icon: Gem,
		className: "text-accent"
	}
];
function GiftGrid({ onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-2",
		children: GIFTS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onPick(g),
			className: "flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-lg bg-surface-2 px-1 py-2 transition-transform duration-150 active:scale-[0.96]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl",
					children: g.emoji
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: g.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] tabular-nums text-muted",
					children: [g.zems, " Zems"]
				})
			]
		}, g.id))
	});
}
function GiftTray({ open, onPick, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("ask-veil absolute inset-0 z-40", open && "is-open"),
		"aria-label": "Fermer",
		"aria-hidden": !open,
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("live-sheet is-gifts absolute inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-bg px-3", open && "is-open"),
		"aria-hidden": !open,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-fg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium",
				children: "Cadeaux"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted",
				children: "Les 4 premiers · glisse pour voir la suite"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid max-h-[6.75rem] grid-cols-4 gap-1.5 overflow-y-auto pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: GIFTS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(g),
					className: "flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-xl bg-surface px-1 py-2 transition-transform duration-150 active:scale-[0.96]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl leading-none",
							children: g.emoji
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium",
							children: g.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] tabular-nums text-muted",
							children: g.zems
						})
					]
				}, g.id))
			})
		]
	})] });
}
var HEART_NS = "http://www.w3.org/2000/svg";
var HEART_D = "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";
var HEART_COLORS = [
	"#e25b4a",
	"#c45c4a",
	"#d4c4a8",
	"#f2eee6"
];
function burst(layer, n, snappy, at) {
	if (!layer) return;
	while (layer.childElementCount > 18) layer.firstElementChild?.remove();
	for (let i = 0; i < n; i++) {
		const svg = document.createElementNS(HEART_NS, "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("class", "anim-liveheart");
		const path = document.createElementNS(HEART_NS, "path");
		path.setAttribute("d", HEART_D);
		path.setAttribute("fill", "currentColor");
		svg.appendChild(path);
		const size = 18 + Math.random() * 14;
		const color = HEART_COLORS[Math.random() * HEART_COLORS.length | 0];
		const dur = snappy ? 820 + Math.random() * 220 : 1100 + Math.random() * 280;
		const delay = i * 40;
		const pos = at ? `left:${(at.x - size / 2 + (Math.random() * 18 - 9)).toFixed(0)}px;top:${(at.y - size / 2).toFixed(0)}px;` : `left:${((layer.clientWidth - size) / 2).toFixed(0)}px;top:${(layer.clientHeight * .4).toFixed(0)}px;`;
		svg.style.cssText = `position:absolute;${pos}width:${size}px;height:${size}px;pointer-events:none;color:${color};--heart-x:${(-36 + Math.random() * 72).toFixed(0)}px;--heart-r:${(-28 + Math.random() * 56).toFixed(0)}deg;--heart-dur:${dur.toFixed(0)}ms;animation-delay:${delay}ms`;
		layer.appendChild(svg);
		svg.addEventListener("animationend", () => svg.remove(), { once: true });
	}
}
function LiveRoom({ clipId }) {
	const { pop } = useNav();
	const clip = [...useSway.getState().myClips, ...CLIPS].find((c) => c.id === clipId);
	const me = useSway((s) => s.me);
	const accounts = useSway((s) => s.accounts);
	const user = clip ? userById(clip.userId, me, accounts) : void 0;
	const videoEl = (0, import_react.useRef)(null);
	const layer = (0, import_react.useRef)(null);
	const likesEl = (0, import_react.useRef)(null);
	const comboEl = (0, import_react.useRef)(null);
	const [viewers, setViewers] = (0, import_react.useState)((clip?.viewers ?? 1280) + 1);
	const likesRef = (0, import_react.useRef)(clip?.likes ?? 2400);
	const [floaties, setFloaties] = (0, import_react.useState)([]);
	const [text, setText] = (0, import_react.useState)("");
	const [emojiOpen, setEmojiOpen] = (0, import_react.useState)(false);
	const [tray, setTray] = (0, import_react.useState)(null);
	const [guestId, setGuestId] = (0, import_react.useState)(null);
	const [pinned, setPinned] = (0, import_react.useState)(null);
	const [chat, setChat] = (0, import_react.useState)(clip ? [{
		id: "l1",
		name: "maya.clay",
		text: "la lumière est folle"
	}, {
		id: "l2",
		name: "rina.ok",
		text: "j’y suis"
	}] : []);
	const [questions, setQuestions] = (0, import_react.useState)([{
		id: "q1",
		name: "jules.m",
		text: "C’est où, exactement ?"
	}, {
		id: "q2",
		name: "solnavarro",
		text: "Tu restes encore longtemps ?"
	}]);
	const [qtext, setQtext] = (0, import_react.useState)("");
	const timers = (0, import_react.useRef)([]);
	const lastTap = (0, import_react.useRef)(0);
	const comboRef = (0, import_react.useRef)(0);
	const comboClear = (0, import_react.useRef)(null);
	const trayRef = (0, import_react.useRef)(null);
	trayRef.current = tray;
	const later = (fn, ms) => {
		const id = window.setTimeout(fn, ms);
		timers.current.push(id);
		return id;
	};
	const paintLikes = (n) => {
		likesRef.current = n;
		if (likesEl.current) likesEl.current.textContent = compact(n);
	};
	const paintCombo = (n) => {
		comboRef.current = n;
		const el = comboEl.current;
		if (!el) return;
		if (n > 1) {
			el.textContent = `x${n}`;
			el.style.opacity = "1";
		} else el.style.opacity = "0";
	};
	const tap = () => {
		burst(layer.current, 1, true);
		const now = performance.now();
		const next = now - lastTap.current < 900 ? comboRef.current + 1 : 1;
		lastTap.current = now;
		paintCombo(next);
		paintLikes(likesRef.current + 1);
		if (comboClear.current) window.clearTimeout(comboClear.current);
		comboClear.current = later(() => paintCombo(0), 900);
	};
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => {
			setViewers((v) => Math.max(12, v + Math.floor(Math.random() * 13) - 5));
		}, 1100);
		return () => window.clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => {
			burst(layer.current, 1, false);
			if (Math.random() > .35) paintLikes(likesRef.current + 1 + Math.floor(Math.random() * 2));
		}, 900);
		return () => window.clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = videoEl.current;
		if (!el) return;
		el.muted = false;
		el.play().catch(() => {
			el.muted = true;
			el.play().catch(() => {});
		});
	}, [clipId]);
	(0, import_react.useEffect)(() => () => {
		timers.current.forEach((id) => window.clearTimeout(id));
		if (comboClear.current) window.clearTimeout(comboClear.current);
	}, []);
	if (!clip || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full flex-col bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenHeader, {
			title: "Live",
			onBack: pop
		})
	});
	const spawnGift = (kind) => {
		const id = Date.now() + Math.random();
		setFloaties((h) => [...h, {
			id,
			x: 8 + Math.random() * 36,
			kind
		}]);
		later(() => setFloaties((h) => h.filter((x) => x.id !== id)), 1200);
	};
	const sendGift = (g) => {
		spawnGift(g.id);
		burst(layer.current, 2, true);
		setChat((c) => [...c, {
			id: `g-${Date.now()}`,
			name: me.handle,
			text: `envoie ${g.label.toLowerCase()}`
		}]);
		setViewers((v) => v + 3);
		paintLikes(likesRef.current + 8);
		setTray(null);
	};
	const guest = guestId ? userById(guestId, me, accounts) : void 0;
	const guestClip = guestId ? CLIPS.find((c) => c.userId === guestId && c.src) : void 0;
	const pin = questions.find((q) => q.id === pinned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("absolute inset-0", guest ? "flex" : ""),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoEl,
					src: clip.src,
					poster: clip.poster,
					className: guest ? "h-full w-1/2 object-cover" : "absolute inset-0 size-full object-cover",
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true
				}), guest && guestClip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: guestClip.src,
					poster: guestClip.poster,
					className: "h-full w-1/2 object-cover",
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true
				}) : guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-1/2 items-center justify-center bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["@", guest.handle]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg/80 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[1] touch-manipulation",
				role: "presentation",
				onPointerDown: (e) => {
					if (e.pointerType === "mouse" && e.button !== 0) return;
					if (trayRef.current) {
						setTray(null);
						return;
					}
					tap();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-0 z-10 flex items-center gap-2 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: pop,
						"aria-label": "Quitter",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "22",
							height: "22",
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M15 5 L8 12 L15 19",
								stroke: "currentColor",
								strokeWidth: "1.8",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: user.avatar,
							alt: "",
							className: "size-8 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: user.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1 text-[11px] text-fg/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 fill-heart text-heart" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										ref: likesEl,
										className: "tabular-nums",
										children: compact(likesRef.current)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg/50",
										children: "tapotages"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-fg anim-live" }), "Live"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-bg/40 px-2 py-1 text-xs tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), viewers.toLocaleString("fr-FR")]
					})
				]
			}),
			pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 top-[calc(4.5rem+env(safe-area-inset-top))] z-10 rounded-md bg-bg/55 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-accent",
					children: "Question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-snug",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: pin.name
						}),
						" ",
						pin.text
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-24 left-3 right-4 z-10 flex flex-col gap-1.5",
				children: chat.slice(-4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-[80%] text-xs leading-snug text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: c.name
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg/85",
							children: c.text
						})
					]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: layer,
				className: "pointer-events-none absolute inset-0 z-20 overflow-hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				ref: comboEl,
				className: "pointer-events-none absolute bottom-40 right-5 z-20 font-display text-3xl italic tabular-nums opacity-0",
				children: "x2"
			}),
			floaties.map((h) => {
				const G = GIFTS.find((g) => g.id === h.kind);
				if (!G) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gift-float",
					style: { right: h.x },
					children: G.emoji
				}, h.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftTray, {
				open: tray === "gifts",
				onPick: sendGift,
				onClose: () => setTray(null)
			}),
			tray === "invite" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-3 bottom-[7.5rem] z-10 max-h-40 overflow-y-auto rounded-lg bg-bg/80 p-2",
				children: Object.values(USERS).filter((u) => u.id !== clip.userId).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex h-11 w-full items-center gap-2 rounded-md px-2 text-left text-sm",
					onClick: () => {
						setGuestId(u.id);
						setTray(null);
						setChat((c) => [...c, {
							id: `j-${Date.now()}`,
							name: u.handle,
							text: "a rejoint le live"
						}]);
						setViewers((v) => v + 40);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: u.avatar,
							alt: "",
							className: "size-7 rounded-full object-cover"
						}),
						"@",
						u.handle
					]
				}, u.id))
			}) : null,
			tray === "qa" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 bottom-[7.5rem] z-10 rounded-lg bg-bg/80 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium",
						children: "Q&A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-h-28 flex-col gap-1.5 overflow-y-auto",
						children: questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPinned(pinned === q.id ? null : q.id),
							className: cn("rounded-md px-2 py-1.5 text-left text-xs", pinned === q.id ? "bg-accent/20" : "bg-surface-2"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: q.name
								}),
								" ",
								q.text
							]
						}, q.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-2 flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							const v = qtext.trim();
							if (!v) return;
							setQuestions((q) => [...q, {
								id: `q-${Date.now()}`,
								name: me.handle,
								text: v
							}]);
							setQtext("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: qtext,
							onChange: (e) => setQtext(e.target.value),
							placeholder: "Poser une question",
							className: "h-9 flex-1 rounded-full bg-surface px-3 text-xs outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "text-xs font-medium text-accent",
							children: "Envoyer"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "absolute inset-x-0 bottom-0 z-10 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
				onSubmit: (e) => {
					e.preventDefault();
					const v = text.trim();
					if (!v) return;
					setChat((c) => [...c, {
						id: `l-${Date.now()}`,
						name: me.handle,
						text: v
					}]);
					setText("");
				},
				children: [emojiOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex flex-wrap gap-1.5 rounded-lg bg-bg/70 p-2",
					children: [
						"❤️",
						"🔥",
						"👏",
						"😂",
						"🙏",
						"✨"
					].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setText((d) => d + e),
						className: "size-8 rounded-md bg-surface-2 text-sm",
						children: e
					}, e))
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: text,
							onChange: (e) => setText(e.target.value),
							placeholder: "Dire quelque chose",
							className: "h-11 min-w-0 flex-1 rounded-full bg-bg/50 px-4 text-sm outline-none placeholder:text-fg/50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEmojiOpen((o) => !o),
							className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-bg/50",
							"aria-label": "Réactions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTray(tray === "gifts" ? null : "gifts"),
							className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-bg/50",
							"aria-label": "Cadeau",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4 text-accent" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg",
							"aria-label": "Envoyer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
						})
					]
				})]
			})
		]
	});
}
var TICKETS = [
	"1",
	"3",
	"5",
	"10"
];
function SetupProgress({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "kind-bar h-1 flex-1 rounded-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1 flex-1 rounded-full", step === 2 ? "kind-bar" : "bg-surface-2") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[10px] font-medium tracking-wide text-muted",
				children: [step, "/2"]
			})
		]
	});
}
function SetupSec({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-3 rounded-lg bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "text-sm font-medium",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "kind-ink",
					children: [n, "."]
				}),
				" ",
				title
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2.5",
			children
		})]
	});
}
function SetupChoice({ on, icon, title, line, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex-1 rounded-md p-3 text-left ring-1", on ? "ring-[color:var(--kind,var(--color-accent))]/60 bg-[color:color-mix(in_srgb,var(--kind,var(--color-accent))_12%,transparent)]" : "bg-bg ring-line"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("flex items-center gap-1.5 text-sm font-medium", on ? "kind-ink" : ""),
			children: [icon, title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] leading-snug text-muted",
			children: line
		})]
	});
}
function SetupChip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 rounded-full px-3 text-xs font-medium", on ? "bg-fg text-bg" : "bg-surface-2 text-fg"),
		children
	});
}
function SetupRecap({ icon, label, value, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center gap-3 rounded-lg bg-surface px-3 py-3 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "kind-ink flex size-8 items-center justify-center rounded-md bg-bg",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate text-right text-sm",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted" })
		]
	});
}
function SetupToggle({ label, on, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex h-11 w-full items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("rounded-full px-2 py-0.5 text-xs", on ? "bg-fg text-bg" : "bg-surface-2 text-muted"),
			children: on ? "Oui" : "Non"
		})]
	});
}
function CoverPick({ covers, value, onPick }) {
	const file = (0, import_react.useRef)(null);
	const custom = value.startsWith("blob:") || !covers.includes(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [covers.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onPick(src),
				className: cn("h-16 w-12 overflow-hidden rounded-sm outline outline-1 -outline-offset-1 outline-fg/10", value === src ? "shadow-[0_0_0_2px_var(--kind,var(--color-accent))]" : "opacity-70"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "size-full object-cover"
				})
			}, src)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => file.current?.click(),
				className: cn("relative flex h-16 w-12 flex-col items-center justify-center overflow-hidden rounded-sm bg-bg outline outline-1 -outline-offset-1 outline-fg/15", custom ? "shadow-[0_0_0_2px_var(--kind,var(--color-accent))]" : "text-muted"),
				"aria-label": "Ajouter ta photo",
				children: custom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: file,
			type: "file",
			accept: "image/*",
			className: "sr-only",
			onChange: (e) => {
				const f = e.target.files?.[0];
				if (!f) return;
				onPick(URL.createObjectURL(f));
				e.currentTarget.value = "";
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-[11px] text-muted",
			children: "Ou ajoute ta photo en couverture."
		})
	] });
}
function conn() {
	if (typeof navigator === "undefined") return void 0;
	const n = navigator;
	return n.connection ?? n.mozConnection ?? n.webkitConnection;
}
function netQuality() {
	const c = conn();
	if (!c) return "good";
	const kind = c.effectiveType;
	if (kind === "slow-2g" || kind === "2g" || c.saveData) return "weak";
	if (kind === "3g") return "weak";
	if (c.downlink != null && c.downlink > 0 && c.downlink < .7) return "weak";
	if (c.rtt != null && c.rtt > 650) return "weak";
	return "good";
}
function useLink() {
	const [online, setOnline] = (0, import_react.useState)(() => typeof navigator === "undefined" ? true : navigator.onLine !== false);
	const [quality, setQuality] = (0, import_react.useState)(netQuality);
	(0, import_react.useEffect)(() => {
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
function linkLabel(level, who) {
	if (level === "off") return who ? `Connexion de ${who} perdue` : "Pas de réseau · reconnexion…";
	if (level === "weak") return who ? `Connexion de ${who} instable` : "Connexion instable · qualité réduite";
	return who ? `${who} est en ligne` : "Connexion stable";
}
function SignalBars({ level, className }) {
	const n = level === "good" ? 4 : level === "weak" ? 2 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("link-bars", level === "off" && "is-off", className),
		"aria-hidden": true,
		children: [
			0,
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: i < n ? "is-on" : void 0 }, i))
	});
}
function LinkChip({ level, who }) {
	if (level === "good") return null;
	const off = level === "off";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("link-chip", off ? "is-off" : "is-weak"),
		role: "status",
		children: [
			off ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: linkLabel(level, who)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBars, { level })
		]
	});
}
function LinkBanner({ level, who, className }) {
	if (level === "good") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none absolute inset-x-3 z-[60]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkChip, {
			level,
			who
		})
	});
}
function SeatHold({ name, hold, weak }) {
	if (!hold && !weak) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("face-seat-veil", hold ? "is-hold" : "is-weak"),
		children: [
			hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-5 text-fg" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-4 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-center text-[10px] font-medium leading-tight",
				children: hold ? `Reconnexion…` : "Qualité réduite"
			}),
			hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 text-center text-[9px] text-muted",
				children: [name, " revient"]
			}) : null
		]
	});
}
function LinkLost({ name, onRetry, onQuit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2 },
		className: "absolute inset-0 z-[55] flex flex-col items-center bg-bg/92 px-6 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-14 place-items-center rounded-full bg-surface ring-1 ring-fg/12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-6 text-accent" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-2xl",
				children: "Connexion perdue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: [name, " n’est plus en ligne. Tes réponses sont conservées. On peut réessayer."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "world-gold mt-auto",
				onClick: onRetry,
				children: "Réessayer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 h-11 text-sm text-muted",
				onClick: onQuit,
				children: "Quitter"
			})
		]
	}, "lost");
}
var KINDS = [
	{
		id: "story",
		title: "Storytime",
		verb: "Raconte ton histoire.",
		line: "Je raconte, vous écoutez. Chat seulement — personne ne monte.",
		badge: "Chat seulement",
		cover: "/posters/sunrise.jpg",
		icon: BookOpen
	},
	{
		id: "openmic",
		title: "Micro Ouvert",
		verb: "Anime. Partage. Échange.",
		line: "Les spectateurs demandent la parole et montent en vidéo.",
		badge: "Demander la parole",
		cover: "/posters/city.jpg",
		icon: Mic
	},
	{
		id: "stand",
		title: "Stand-Up",
		verb: "Le micro t’appartient.",
		line: "Tu restes seul à l’écran. Le public pose des questions écrites.",
		badge: "Poser une question",
		cover: "/posters/latte.jpg",
		icon: GraduationCap
	},
	{
		id: "slam",
		title: "Slam Thérapie",
		verb: "Tes mots. Ta voix. Ta scène.",
		line: "Une voix à la fois. Le slameur prend le grand écran, l’hôte reste en coin.",
		badge: "Demander à slamer",
		cover: "/posters/plants.jpg",
		icon: MicVocal
	}
];
var LAUNCH = {
	story: "Lancer mon Storytime",
	openmic: "Lancer le Micro Ouvert",
	slam: "Ouvrir la scène",
	stand: "Lancer mon Stand-Up"
};
var COVERS$1 = {
	story: [
		"/posters/sunrise.jpg",
		"/posters/plants.jpg",
		"/posters/latte.jpg",
		"/posters/city.jpg"
	],
	openmic: [
		"/posters/city.jpg",
		"/posters/pottery.jpg",
		"/posters/latte.jpg",
		"/posters/sunrise.jpg"
	],
	slam: [
		"/posters/plants.jpg",
		"/posters/city.jpg",
		"/posters/hoops.jpg",
		"/posters/sunrise.jpg"
	],
	stand: [
		"/posters/latte.jpg",
		"/posters/pottery.jpg",
		"/posters/bread.jpg",
		"/posters/city.jpg"
	]
};
var CAST = [
	USERS["u-maya"],
	USERS["u-noah"],
	USERS["u-luca"],
	USERS["u-ines"],
	USERS["u-sol"]
];
function faceOf(name) {
	return CAST.find((u) => u.name.startsWith(name))?.avatar ?? "";
}
var MUSIC = [
	"Piano",
	"Guitare",
	"Lo-fi",
	"Émotion",
	"Mélancolique",
	"Motivante",
	"Afro douce",
	"Sans musique"
];
var TRACKS = {
	Piano: [
		"Clair de table",
		"Renaissance",
		"Nuit calme"
	],
	Guitare: [
		"Racines",
		"Corde ouverte",
		"Bois"
	],
	"Lo-fi": [
		"Fenêtre",
		"Brume",
		"Tard"
	],
	Émotion: [
		"Silence plein",
		"Lettre",
		"Cœur"
	],
	Mélancolique: [
		"Absence",
		"Pluie",
		"Loin"
	],
	Motivante: [
		"Debout",
		"Élan",
		"Feu"
	],
	"Afro douce": [
		"Mama",
		"Soleil",
		"Kora"
	],
	"Sans musique": []
};
var LINES = [
	"j’écoute",
	"force",
	"la voix",
	"continue",
	"c’est fort",
	"bravo"
];
var STORY_LINES = [
	"Tellement vrai",
	"Continue !",
	"j’ai vécu la même chose",
	"c’est fort",
	"force",
	"bravo"
];
var REACTS = [
	"❤️",
	"🔥",
	"👏",
	"😂",
	"🙏",
	"✨",
	"💯",
	"😮",
	"🙌",
	"💪",
	"😍",
	"😭",
	"🥺",
	"😎",
	"🤔",
	"👀",
	"🌹",
	"🎉",
	"🥳",
	"🫶",
	"💥",
	"🌸",
	"☀️",
	"🎶"
];
var RULES_DEF = "Respect · Pas de jugement · Bonne écoute";
function LiveRecap({ stats, onClose }) {
	const cells = [
		{
			k: "Durée",
			v: fmtDuration(stats.seconds)
		},
		{
			k: "Spectateurs",
			v: compact(stats.viewers)
		},
		{
			k: "Commentaires",
			v: compact(stats.comments)
		},
		{
			k: "Tapotages",
			v: compact(stats.likes)
		},
		{
			k: "Cadeaux",
			v: compact(stats.gifts)
		}
	];
	if (stats.premium) cells.push({
		k: "Mbo tickets",
		v: compact(stats.ticketsSold)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: stats.cover,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-0 flex-1 flex-col px-5 pt-[calc(2.25rem+env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex w-fit items-center gap-1.5 rounded-full bg-fg/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-muted" }), "Terminé"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-accent",
						children: stats.kindLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-4xl tracking-tight",
						children: "Live terminé"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-snug text-fg/85",
						children: stats.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Les compteurs sont figés à la fin du live."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 grid grid-cols-2 gap-2",
						children: cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-bg/60 px-3 py-3 ring-1 ring-fg/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted",
								children: c.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl tabular-nums tracking-tight",
								children: c.v
							})]
						}, c.k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-snug text-muted",
						children: stats.premium ? `${stats.ticketsSold} Mbo ticket${stats.ticketsSold > 1 ? "s" : ""} vendu${stats.ticketsSold > 1 ? "s" : ""} · ${stats.ticketPrice} / entrée` : "Live gratuit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: onClose,
							children: "Fermer"
						})
					})
				]
			})
		]
	});
}
function LiveKinds({ onBack, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-2 px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-12 items-center justify-center",
						onClick: onBack,
						"aria-label": "Retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6 rotate-180" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1 text-center font-display text-xl italic tracking-tight",
						children: "Sway"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-12" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-3 px-4 pb-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/12 text-accent ring-1 ring-accent/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
						className: "size-5",
						strokeWidth: 1.7
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl leading-none tracking-tight",
						children: "Talk Show"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-accent",
						children: "Exprime-toi. Inspire. Écoute. Échange."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-3 px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-fg/12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-medium uppercase tracking-[0.18em] text-accent",
						children: "Choisis ton format"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-fg/12" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-none px-3 pt-1",
				children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(k.id),
					className: "kind-card hub-tile flex min-h-0 flex-1 items-center gap-3 overflow-hidden rounded-2xl p-2 pr-3 text-left ring-1 ring-fg/15 transition-transform duration-150 ease-out active:scale-[0.99]",
					"data-kind": k.id,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative size-[4.75rem] shrink-0 overflow-hidden rounded-xl sm:size-[5.5rem]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: k.cover,
									alt: "",
									className: "size-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "kind-wash absolute inset-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "kind-ink absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, {
										className: "size-7 sm:size-8",
										strokeWidth: 1.5
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[10px] font-medium uppercase tracking-[0.18em] text-fg/90",
									children: k.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "kind-ink mt-0.5 block font-display text-[0.95rem] leading-snug tracking-tight sm:text-lg",
									children: k.verb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "kind-line mt-1 block text-xs leading-snug text-muted",
									children: k.line
								}),
								k.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "kind-chip mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), k.badge]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-current/40 sm:size-11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "kind-ink size-4 sm:size-5" })
						})
					]
				}, k.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] mt-2 flex shrink-0 items-center gap-3 rounded-2xl bg-bg/30 px-3 py-2.5 ring-1 ring-fg/12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs font-medium",
						children: "Sois respectueux et bienveillant."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-[11px] leading-snug text-muted",
						children: "Un espace d’expression libre. Quatre formats, quatre règles."
					})]
				})]
			})
		]
	});
}
function HostSetup({ kind, onBack, onLaunch }) {
	const def = KINDS.find((k) => k.id === kind);
	const covers = COVERS$1[kind];
	const [step, setStep] = (0, import_react.useState)(1);
	const [title, setTitle] = (0, import_react.useState)(kind === "story" ? "Le jour où j’ai tout recommencé" : "");
	const [desc, setDesc] = (0, import_react.useState)("");
	const [cover, setCover] = (0, import_react.useState)(covers[0]);
	const [priv, setPriv] = (0, import_react.useState)(false);
	const [premium, setPremium] = (0, import_react.useState)(false);
	const [tickets, setTickets] = (0, import_react.useState)("3");
	const [commentWho, setCommentWho] = (0, import_react.useState)("all");
	const [questions, setQuestions] = (0, import_react.useState)(kind === "stand");
	const [maxGuests, setMaxGuests] = (0, import_react.useState)(4);
	const [slamMode, setSlamMode] = (0, import_react.useState)("open");
	const [rules, setRules] = (0, import_react.useState)(RULES_DEF);
	const [rulesOpen, setRulesOpen] = (0, import_react.useState)(false);
	const [draftRules, setDraftRules] = (0, import_react.useState)(RULES_DEF);
	const cfg = {
		title: title.trim() || def.title,
		desc,
		cover,
		priv,
		premium,
		comments: commentWho !== "none",
		questions: kind === "stand" ? questions : false,
		maxGuests: kind === "openmic" ? maxGuests : 0,
		slamMode,
		rules,
		commentWho,
		tickets
	};
	if (step === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Tout est prêt",
		onBack: () => setStep(1),
		kind,
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-accent",
			children: "2/2"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-center text-sm text-muted",
					children: [
						"Vérifie avant de lancer ton ",
						def.title,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupProgress, { step: 2 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 overflow-hidden rounded-lg bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cover,
							alt: "",
							className: "h-36 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStep(1),
							className: "absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-bg/70 px-2.5 py-1 text-[10px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3" }), " Modifier"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: title.trim() || def.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted",
							children: desc || "Aucune description."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: priv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
							label: "Visibilité",
							value: priv ? "Privé" : "Public",
							onClick: () => setStep(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: premium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
							label: "Accès",
							value: premium ? `Payant · ${tickets} ticket${tickets === "1" ? "" : "s"}` : "Gratuit",
							onClick: () => setStep(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
							label: "Commentaires",
							value: commentWho === "all" ? "Tout le monde" : commentWho === "followers" ? "Abonnés" : "Personne",
							onClick: () => setStep(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
							label: "Règles",
							value: rules,
							onClick: () => setStep(1)
						}),
						kind === "openmic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
							label: "Invités",
							value: `Jusqu’à ${maxGuests} en vidéo`,
							onClick: () => setStep(1)
						}) : null,
						kind === "slam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicVocal, { className: "size-4" }),
							label: "Mode",
							value: slamMode === "solo" ? "Solo" : "Scène ouverte",
							onClick: () => setStep(1)
						}) : null,
						kind === "stand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }),
							label: "Questions",
							value: questions ? "Acceptées" : "Fermées",
							onClick: () => setStep(1)
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2.5 rounded-lg bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug text-muted",
						children: "Respecte les règles de la communauté. Un écart peut fermer le live."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				onClick: () => onLaunch(cfg),
				children: LAUNCH[kind]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "line",
				size: "lg",
				onClick: () => setStep(1),
				children: "Modifier"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: `Configurer mon ${def.title}`,
		onBack,
		kind,
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-muted",
			children: "1/2"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kind-ink flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface ring-1 ring-current/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(def.icon, {
								className: "size-5",
								strokeWidth: 1.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl leading-none tracking-tight",
								children: def.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "kind-ink mt-1 text-xs",
								children: def.verb
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupProgress, { step: 1 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupSec, {
						n: 1,
						title: "Titre",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							maxLength: 100,
							onChange: (e) => setTitle(e.target.value),
							placeholder: kind === "story" ? "De quoi veux-tu parler ?" : kind === "slam" ? "Le titre de ton slam" : kind === "openmic" ? "Le sujet de ton Micro Ouvert" : "Le titre de ton Stand-Up",
							className: "h-11 w-full rounded-md bg-bg px-3 text-sm outline-none placeholder:text-subtle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-right text-[10px] text-muted",
							children: [title.length, "/100"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 2,
						title: "Description",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: desc,
							onChange: (e) => setDesc(e.target.value),
							rows: 2,
							maxLength: 500,
							placeholder: kind === "slam" ? "De quoi parle ton slam ?" : "De quoi vas-tu parler ?",
							className: "w-full resize-none rounded-md bg-bg p-3 text-sm outline-none placeholder:text-subtle"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 3,
						title: "Couverture",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverPick, {
							covers,
							value: cover,
							onPick: setCover
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 4,
						title: "Visibilité",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: !priv,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
								title: "Public",
								line: "Tout le monde peut entrer",
								onClick: () => setPriv(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: priv,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }),
								title: "Privé",
								line: "Sur invitation",
								onClick: () => setPriv(true)
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupSec, {
						n: 5,
						title: "Accès",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: !premium,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
								title: "Gratuit",
								line: "Accès libre",
								onClick: () => setPremium(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: premium,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }),
								title: "Payant",
								line: "En tickets",
								onClick: () => setPremium(true)
							})]
						}), premium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-1.5",
							children: TICKETS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupChip, {
								on: tickets === n,
								onClick: () => setTickets(n),
								children: [
									n,
									" ticket",
									n === "1" ? "" : "s"
								]
							}, n))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 6,
						title: "Commentaires",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
									on: commentWho === "all",
									onClick: () => setCommentWho("all"),
									children: "Tout le monde"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
									on: commentWho === "followers",
									onClick: () => setCommentWho("followers"),
									children: "Abonnés"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
									on: commentWho === "none",
									onClick: () => setCommentWho("none"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-3" }), " Personne"]
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 7,
						title: "Règles",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setDraftRules(rules);
								setRulesOpen(true);
							},
							className: "flex h-11 w-full items-center gap-2 rounded-md bg-bg px-3 text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate",
								children: rules
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted" })]
						})
					}),
					kind === "stand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 8,
						title: "Questions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupToggle, {
							label: "Accepter les questions écrites",
							on: questions,
							onClick: () => setQuestions(!questions)
						})
					}) : null,
					kind === "openmic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupSec, {
						n: 8,
						title: "Invités sur scène",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs text-muted",
							children: "L’hôte anime. Jusqu’à 4 invités montent en vidéo."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5",
							children: [
								2,
								3,
								4
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
								on: maxGuests === n,
								onClick: () => setMaxGuests(n),
								children: n
							}, n))
						})]
					}) : null,
					kind === "slam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 8,
						title: "Mode",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
								on: slamMode === "solo",
								onClick: () => setSlamMode("solo"),
								children: "Solo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
								on: slamMode === "open",
								onClick: () => setSlamMode("open"),
								children: "Scène ouverte"
							})]
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					disabled: title.trim().length < 2,
					onClick: () => setStep(2),
					children: "Suivant"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveSheet, {
				open: rulesOpen,
				onClose: () => setRulesOpen(false),
				title: "Règles de ton live",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: draftRules,
					rows: 4,
					onChange: (e) => setDraftRules(e.target.value),
					className: "mt-2 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "mt-3",
					onClick: () => {
						setRules(draftRules.trim() || RULES_DEF);
						setRulesOpen(false);
					},
					children: "Enregistrer"
				})]
			})
		]
	});
}
function HostRoom({ kind, title, desc, cover, comments, questions, maxGuests, slamMode, rules = RULES_DEF, premium = false, tickets = "3", onLeave, startWatch }) {
	const { toast, setTab } = useNav();
	const link = useLink();
	const layer = (0, import_react.useRef)(null);
	const video = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const likesEl = (0, import_react.useRef)(null);
	const comboEl = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const likes = (0, import_react.useRef)(12);
	const giftsN = (0, import_react.useRef)(0);
	(0, import_react.useRef)(0);
	(0, import_react.useRef)(0);
	(0, import_react.useRef)(null);
	const [cam, setCam] = (0, import_react.useState)(false);
	const [viewers, setViewers] = (0, import_react.useState)(48);
	const [chat, setChat] = (0, import_react.useState)(kind === "story" ? [
		{
			id: "1",
			name: "Maya",
			text: "Tellement vrai",
			at: Date.now() - 5e3
		},
		{
			id: "2",
			name: "Noah",
			text: "Continue !",
			at: Date.now() - 3200
		},
		{
			id: "3",
			name: "Inès",
			text: "j’ai vécu la même chose",
			at: Date.now() - 1400
		}
	] : [{
		id: "1",
		name: "maya.clay",
		text: "j’écoute",
		at: Date.now()
	}]);
	const [text, setText] = (0, import_react.useState)("");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [draw, setDraw] = (0, import_react.useState)(null);
	const [role, setRole] = (0, import_react.useState)(startWatch ? "watch" : "host");
	const [follow, setFollow] = (0, import_react.useState)(false);
	const [emojiOpen, setEmojiOpen] = (0, import_react.useState)(false);
	const [asks, setAsks] = (0, import_react.useState)(kind === "openmic" ? [{
		id: CAST[2].id,
		name: CAST[2].name.split(" ")[0],
		avatar: CAST[2].avatar,
		muted: false,
		cam: true,
		hand: false
	}, {
		id: CAST[3].id,
		name: CAST[3].name.split(" ")[0],
		avatar: CAST[3].avatar,
		muted: false,
		cam: true,
		hand: false
	}] : []);
	const [onStage, setOnStage] = (0, import_react.useState)(kind === "openmic" ? [{
		id: CAST[0].id,
		name: CAST[0].name.split(" ")[0],
		avatar: CAST[0].avatar,
		muted: false,
		cam: true,
		hand: false,
		speaking: true
	}, {
		id: CAST[1].id,
		name: CAST[1].name.split(" ")[0],
		avatar: CAST[1].avatar,
		muted: false,
		cam: true,
		hand: true,
		speaking: false
	}] : []);
	const [asksOpen, setAsksOpen] = (0, import_react.useState)(true);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [myHand, setMyHand] = (0, import_react.useState)(false);
	const [qs, setQs] = (0, import_react.useState)(kind === "stand" && questions ? [
		{
			id: "q1",
			name: "Inès",
			text: "Comment savoir si on manque de confiance ?",
			st: "wait",
			ago: "Il y a 2 min"
		},
		{
			id: "q2",
			name: "Noah",
			text: "Par où commencer, concrètement ?",
			st: "wait",
			ago: "Il y a 5 min"
		},
		{
			id: "q3",
			name: "Sol",
			text: "Tu conseilles ça à qui ?",
			st: "wait",
			ago: "Il y a 8 min"
		},
		{
			id: "q4",
			name: "Maya",
			text: "Comment poser ses limites sans culpabiliser ?",
			st: "wait",
			ago: "Il y a 12 min"
		},
		{
			id: "q5",
			name: "Luca",
			text: "Un exercice simple à faire ce soir ?",
			st: "done",
			ago: "Il y a 28 min"
		},
		{
			id: "q6",
			name: "Anonyme",
			text: "Question hors sujet",
			st: "skip",
			ago: "Il y a 14 min"
		}
	] : []);
	const [qTab, setQTab] = (0, import_react.useState)("wait");
	const [slam, setSlam] = (0, import_react.useState)(kind === "slam" && slamMode === "solo" ? {
		name: "Toi",
		title,
		min: 3,
		music: "Piano",
		track: "Renaissance",
		left: 180
	} : null);
	const [queue, setQueue] = (0, import_react.useState)(slamMode === "open" ? [{
		id: "d",
		name: "Noah",
		title: "Dernier panier",
		min: 3,
		music: "Guitare",
		track: "Racines"
	}, {
		id: "s",
		name: "Inès",
		title: "Le lait",
		min: 1,
		music: "Lo-fi",
		track: "Fenêtre"
	}] : []);
	const [requests, setRequests] = (0, import_react.useState)(slamMode === "open" ? [{
		id: "r1",
		name: "Sol",
		title: "Ce que je n’ai jamais dit",
		min: 1,
		music: "Émotion",
		track: "Lettre"
	}, {
		id: "r2",
		name: "Luca",
		title: "Les blessures invisibles",
		min: 3,
		music: "Piano",
		track: "Renaissance"
	}] : []);
	const [flow, setFlow] = (0, import_react.useState)(null);
	const [mine, setMine] = (0, import_react.useState)(null);
	const [count, setCount] = (0, import_react.useState)(null);
	const [nextUp, setNextUp] = (0, import_react.useState)(null);
	const [thanks, setThanks] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)("idle");
	const [soonLeft, setSoonLeft] = (0, import_react.useState)(30);
	const [formTitle, setFormTitle] = (0, import_react.useState)("");
	const [formMin, setFormMin] = (0, import_react.useState)(3);
	const [formMusic, setFormMusic] = (0, import_react.useState)("Piano");
	const [formTrack, setFormTrack] = (0, import_react.useState)("Renaissance");
	const [gifts, setGifts] = (0, import_react.useState)([]);
	const [mutedHost, setMutedHost] = (0, import_react.useState)(false);
	const [speakingMe, setSpeakingMe] = (0, import_react.useState)(false);
	const [camOn, setCamOn] = (0, import_react.useState)(true);
	const [askText, setAskText] = (0, import_react.useState)("");
	const [giftNote, setGiftNote] = (0, import_react.useState)(null);
	const [quiet, setQuiet] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [kb, setKb] = (0, import_react.useState)(0);
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const [recap, setRecap] = (0, import_react.useState)(false);
	const [snap, setSnap] = (0, import_react.useState)(null);
	const ended = (0, import_react.useRef)(false);
	const [slamRun, setSlamRun] = (0, import_react.useState)(true);
	const queueRef = (0, import_react.useRef)(queue);
	queueRef.current = queue;
	const host = role === "host";
	const guest = role === "guest" && kind === "openmic";
	const watch = !host && !guest;
	(0, import_react.useEffect)(() => {
		let stream = null;
		let stopVoice;
		let dead = false;
		const onAir = host || guest;
		navigator.mediaDevices.getUserMedia(liveConstraints(onAir)).then((s) => {
			if (dead) {
				s.getTracks().forEach((t) => t.stop());
				return;
			}
			stream = s;
			streamRef.current = s;
			setCam(true);
			if (video.current) {
				video.current.srcObject = s;
				video.current.play().catch(() => {});
			}
			if (onAir) stopVoice = watchVoice(s, setSpeakingMe);
		}).catch(() => {
			if (!dead) setCam(false);
		});
		return () => {
			dead = true;
			stopVoice?.();
			stream?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
			setSpeakingMe(false);
		};
	}, [host, guest]);
	(0, import_react.useEffect)(() => {
		setTrackOn(streamRef.current, "audio", (host || guest) && !mutedHost);
		if (mutedHost) setSpeakingMe(false);
	}, [
		mutedHost,
		host,
		guest
	]);
	(0, import_react.useEffect)(() => {
		setTrackOn(streamRef.current, "video", camOn);
	}, [camOn]);
	(0, import_react.useEffect)(() => {
		applyLinkQuality(streamRef.current, link !== "good");
	}, [link]);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			setSeconds((s) => s + 1);
		}, 1e3);
		return () => window.clearInterval(t);
	}, [recap]);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			setViewers((v) => Math.max(12, v + Math.floor(Math.random() * 7) - 2));
		}, 1400);
		return () => window.clearInterval(t);
	}, [recap]);
	const peak = (0, import_react.useRef)(48);
	(0, import_react.useEffect)(() => {
		if (ended.current) return;
		peak.current = Math.max(peak.current, viewers);
	}, [viewers]);
	(0, import_react.useEffect)(() => {
		if (kind !== "story" || recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			burst(layer.current, 1, true);
			paintLikes(likes.current + 1);
		}, 3600);
		return () => window.clearInterval(t);
	}, [kind, recap]);
	(0, import_react.useEffect)(() => {
		if (kind !== "story") return;
		setRole((r) => r === "guest" ? "watch" : r);
		setOnStage([]);
		setAsks([]);
		setMounted(false);
		setMyHand(false);
		setQs([]);
		setDraw(null);
	}, [kind]);
	(0, import_react.useEffect)(() => {
		if (kind !== "story" || recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			const u = CAST[Math.floor(Math.random() * CAST.length)];
			const g = GIFTS[Math.floor(Math.random() * GIFTS.length)];
			playGift(g, u.name.split(" ")[0]);
			setChat((c) => [...c, {
				id: uid("g"),
				name: u.name.split(" ")[0],
				text: `envoie ${g.emoji} ${g.label.toLowerCase()}`,
				at: Date.now()
			}]);
		}, 11e3);
		return () => window.clearInterval(t);
	}, [kind, recap]);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			const u = CAST[Math.floor(Math.random() * CAST.length)];
			const story = kind === "story";
			const line = (story ? STORY_LINES : LINES)[Math.floor(Math.random() * (story ? STORY_LINES : LINES).length)];
			const next = {
				id: uid("c"),
				name: story ? u.name.split(" ")[0] : u.handle,
				text: line,
				at: Date.now()
			};
			setChat((c) => story ? [...c, next].slice(-13) : [...c.slice(-18), next]);
		}, kind === "story" ? 1600 : 4200);
		return () => window.clearInterval(t);
	}, [kind, recap]);
	const fadeId = kind === "story" ? chat.find((c) => c.fading)?.id : void 0;
	(0, import_react.useEffect)(() => {
		if (kind !== "story" || recap) return;
		const tick = window.setInterval(() => {
			if (ended.current) return;
			setChat((c) => {
				if (c.some((x) => x.fading) || c.length === 0) return c;
				const oldest = c[0];
				if (c.length > 12 || Date.now() - oldest.at > 14e3) return c.map((x, i) => i === 0 ? {
					...x,
					fading: true
				} : x);
				return c;
			});
		}, 280);
		return () => window.clearInterval(tick);
	}, [kind, recap]);
	(0, import_react.useEffect)(() => {
		if (!fadeId) return;
		const t = window.setTimeout(() => setChat((c) => c.filter((x) => x.id !== fadeId)), 340);
		return () => window.clearTimeout(t);
	}, [fadeId]);
	(0, import_react.useEffect)(() => {
		if (kind !== "openmic" || !asksOpen) return;
		const t = window.setTimeout(() => {
			setAsks((a) => {
				if (a.length + onStage.length >= 5) return a;
				const next = CAST[a.length + onStage.length];
				if (!next) return a;
				return [...a, {
					id: next.id,
					name: next.name.split(" ")[0],
					avatar: next.avatar,
					muted: false,
					cam: true,
					hand: false
				}];
			});
		}, 1800);
		return () => window.clearTimeout(t);
	}, [
		kind,
		asks.length,
		asksOpen,
		onStage.length
	]);
	const slamOn = slam !== null;
	const bindVideo = (0, import_react.useCallback)((el) => {
		video.current = el;
		if (el && streamRef.current) {
			el.srcObject = streamRef.current;
			el.play().catch(() => {});
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!slamOn || !slamRun || recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			setSlam((s) => {
				if (!s) return s;
				if (s.left <= 1) {
					setSlamRun(false);
					setThanks(s.name);
					window.setTimeout(() => {
						setThanks(null);
						const n0 = queueRef.current[0];
						if (n0) {
							setNextUp(n0);
							setQueue((q) => q.filter((x) => x.id !== n0.id));
							setCount(3);
						}
					}, 2200);
					return null;
				}
				return {
					...s,
					left: s.left - 1
				};
			});
		}, 1e3);
		return () => window.clearInterval(t);
	}, [
		slamOn,
		slamRun,
		recap
	]);
	const startNow = (pick) => {
		setDraw(null);
		setQueue((q) => q.filter((x) => x.id !== pick.id));
		setNextUp(pick);
		setCount(3);
	};
	const startNext = (pick) => {
		const n0 = pick ?? queueRef.current[0];
		if (!n0) {
			setReady("idle");
			return;
		}
		startNow(n0);
		setReady("idle");
	};
	(0, import_react.useEffect)(() => {
		if (count === null || recap) return;
		if (count === 0) {
			const s = nextUp;
			const t = window.setTimeout(() => {
				if (s) {
					setSlam({
						name: s.name,
						title: s.title,
						min: s.min,
						music: s.music,
						track: s.track,
						left: s.min * 60
					});
					setSlamRun(true);
					if (s.name === "Toi") {
						setMine(null);
						setFlow(null);
					}
				}
				setNextUp(null);
				setCount(null);
			}, 700);
			return () => window.clearTimeout(t);
		}
		const t = window.setTimeout(() => setCount((c) => c === null ? null : c - 1), 900);
		return () => window.clearTimeout(t);
	}, [
		count,
		nextUp,
		recap
	]);
	(0, import_react.useEffect)(() => {
		if (ready !== "soon" || recap) return;
		setSoonLeft(30);
		window.setInterval(() => setSoonLeft((n) => Math.max(0, n - 1)), 1e3);
	}, [ready, recap]);
	(0, import_react.useEffect)(() => {
		const vv = window.visualViewport;
		if (!vv) return;
		const sync = () => setKb(Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)));
		vv.addEventListener("resize", sync);
		vv.addEventListener("scroll", sync);
		return () => {
			vv.removeEventListener("resize", sync);
			vv.removeEventListener("scroll", sync);
		};
	}, []);
	const paintLikes = (n) => {
		likes.current = n;
		const t = compact(n);
		if (likesEl.current) likesEl.current.textContent = t;
	};
	const tap = (e) => {
		if (ended.current) return;
		let at;
		if (layer.current) {
			const r = layer.current.getBoundingClientRect();
			if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
				const x = e.clientX - r.left;
				const y = e.clientY - r.top;
				at = x > r.width - 64 ? {
					x: r.width * .5,
					y: r.height * .42
				} : {
					x,
					y
				};
			} else at = {
				x: r.width * .5,
				y: r.height * .42
			};
		}
		burst(layer.current, 1, true, at);
		paintLikes(likes.current + 1);
	};
	const playGift = (g, name) => {
		const n = g.zems >= 99 ? 5 : 3;
		const batch = Array.from({ length: n }, (_, i) => ({
			id: Date.now() + i + Math.random(),
			x: 10 + Math.random() * 42,
			kind: g.id,
			delay: i * 90,
			drift: -28 + Math.random() * 56,
			rot: -18 + Math.random() * 36
		}));
		setGifts((h) => [...h, ...batch]);
		window.setTimeout(() => setGifts((h) => h.filter((x) => !batch.some((b) => b.id === x.id))), 1750);
		setGiftNote({
			name,
			emoji: g.emoji,
			label: g.label,
			zems: g.zems
		});
		window.setTimeout(() => setGiftNote(null), 2500);
	};
	const sendGift = (g) => {
		playGift(g, "Toi");
		burst(layer.current, 2, true);
		setChat((c) => [...c, {
			id: uid("g"),
			name: "toi",
			text: `envoie ${g.emoji} ${g.label.toLowerCase()}`,
			at: Date.now()
		}]);
		paintLikes(likes.current + 8);
		giftsN.current += 1;
		setSheet(null);
	};
	const sendChat = () => {
		const v = text.trim();
		if (!v) return;
		setChat((c) => [...c, {
			id: uid("c"),
			name: "toi",
			text: v,
			at: Date.now()
		}]);
		setText("");
		setEmojiOpen(false);
	};
	const askMount = () => {
		if (kind === "story" || kind === "stand") return;
		setAsks((a) => a.some((x) => x.id === "me") ? a : [...a, {
			id: "me",
			name: "Toi",
			avatar: ME.avatar,
			muted: false,
			cam: true,
			hand: false
		}]);
		flash("Demande envoyée — l’hôte va te répondre");
	};
	const requestMount = () => {
		if (kind === "story" || kind === "stand") return;
		if (asks.some((x) => x.id === "me")) {
			flash("Ta demande est déjà partie");
			return;
		}
		openSheet("askConfirm");
	};
	const flash = (t) => {
		setNotice(t);
		window.setTimeout(() => setNotice(null), 2400);
	};
	const goHome = () => {
		setTab("home");
		onLeave();
	};
	const endLive = () => {
		ended.current = true;
		streamRef.current?.getTracks().forEach((t) => t.stop());
		if (host) {
			setSnap({
				kindLabel: KINDS.find((k) => k.id === kind)?.title ?? "Live",
				title,
				cover,
				viewers: peak.current,
				comments: chat.length,
				likes: likes.current,
				gifts: giftsN.current,
				premium,
				ticketsSold: premium ? Math.max(1, Math.round(peak.current * .14)) : 0,
				ticketPrice: tickets,
				seconds
			});
			setRecap(true);
		} else onLeave();
	};
	const acceptAsk = (a) => {
		if (kind === "story") return;
		if (onStage.length >= guestCap) {
			toast("Scène pleine — 4 invités max");
			return;
		}
		setOnStage((s) => [...s, {
			...a,
			hand: false,
			speaking: false
		}]);
		setAsks((x) => x.filter((i) => i.id !== a.id));
		if (a.id === "me") {
			setMounted(true);
			setRole("guest");
		}
		flash(`${a.name} monte sur scène`);
	};
	const refuseAsk = (a) => {
		setAsks((x) => x.filter((i) => i.id !== a.id));
		if (a.id === "me") setMounted(false);
		flash(`Demande de ${a.name} refusée`);
	};
	const giveFloor = (id) => {
		if (kind === "story") return;
		setOnStage((s) => s.map((i) => ({
			...i,
			hand: i.id === id ? false : i.hand,
			speaking: i.id === id
		})));
		const g = onStage.find((i) => i.id === id);
		flash(g ? `Parole à ${g.name}` : "Parole donnée");
	};
	const kick = (id) => {
		const g = onStage.find((i) => i.id === id);
		setOnStage((s) => s.filter((i) => i.id !== id));
		if (id === "me") {
			setMounted(false);
			setMyHand(false);
			setRole((r) => r === "guest" ? "watch" : r);
		}
		flash(g ? `${g.name} quitte la scène` : "Place libérée");
	};
	const leaveStage = () => {
		kick("me");
	};
	const cycleRole = () => {
		setDraw(null);
		setSheet(null);
		setFlow(null);
		if (kind !== "openmic") {
			setRole((r) => r === "host" ? "watch" : "host");
			setMounted(false);
			setMyHand(false);
			return;
		}
		if (role === "host") {
			const me = {
				id: "me",
				name: "Toi",
				avatar: ME.avatar,
				muted: false,
				cam: true,
				hand: false,
				speaking: false
			};
			setOnStage((s) => {
				if (s.some((x) => x.id === "me")) return s;
				if (s.length >= maxGuests) return [...s.slice(0, maxGuests - 1), me];
				return [...s, me];
			});
			setMounted(true);
			setRole("guest");
			return;
		}
		if (role === "guest") {
			setOnStage((s) => s.filter((x) => x.id !== "me"));
			setMounted(false);
			setMyHand(false);
			setRole("watch");
			return;
		}
		setRole("host");
	};
	const pin = kind === "stand" && questions ? qs.find((q) => q.st === "on") : void 0;
	const waiting = kind === "stand" && questions ? qs.filter((q) => q.st === "wait") : [];
	const slammer = slam && slam.name !== "Toi";
	const slamFace = slammer ? CAST.find((u) => u.name.startsWith(slam.name))?.avatar ?? cover : cover;
	const fmt = KINDS.find((k) => k.id === kind);
	const isMic = kind === "openmic";
	const isStory = kind === "story";
	const guestCap = isMic ? Math.min(4, Math.max(1, maxGuests || 4)) : 0;
	const slots = Array.from({ length: guestCap }, (_, i) => onStage[i] ?? null);
	const hands = onStage.filter((g) => g.hand);
	const total = slam ? slam.min * 60 : 1;
	const ratio = slam ? slam.left / total : 0;
	const circ = 2 * Math.PI * 44;
	const close = () => setSheet(null);
	const closeDraw = () => setDraw(null);
	const openDraw = (d) => {
		if (kind === "story") return;
		setSheet(null);
		setDraw(d);
	};
	const openSheet = (s) => {
		if (kind === "story" && (s === "qsAsk" || s === "slamAsk")) return;
		setDraw(null);
		setSheet(s);
	};
	const acceptSlam = (r) => {
		setRequests((x) => x.filter((i) => i.id !== r.id));
		setQueue((q) => [...q, r]);
		toast(`${r.name} entre dans la file`);
		if (r.name === "Toi") {
			setMine(r);
			setFlow("confirm");
			setDraw(null);
		}
	};
	const refuseSlam = (r) => {
		setRequests((x) => x.filter((i) => i.id !== r.id));
		toast(`Demande de ${r.name} refusée`);
	};
	const moveQ = (i, dir) => {
		setQueue((q) => {
			const n = [...q];
			const j = i + dir;
			if (j < 0 || j >= n.length) return q;
			[n[i], n[j]] = [n[j], n[i]];
			return n;
		});
	};
	const myPos = mine ? queue.findIndex((q) => q.id === mine.id) + 1 : 0;
	const etaMin = mine ? Math.max(1, Math.round((slam?.left ?? 0) / 60) + queue.slice(0, Math.max(0, myPos - 1)).reduce((a, q) => a + q.min, 0)) : 0;
	const hostCam = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref: bindVideo,
		muted: true,
		playsInline: true,
		autoPlay: true,
		className: cn("absolute inset-0 size-full object-cover -scale-x-100", (!cam || !camOn) && "opacity-0", speakingMe && !mutedHost && "outline outline-2 -outline-offset-2 outline-live")
	}), !cam || !camOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: cover,
		alt: "",
		className: "absolute inset-0 size-full object-cover"
	}) : null] });
	const hostName = host ? ME.name.split(" ")[0] : "Maya";
	const hostFace = (host ? ME.avatar : "/avatars/maya.jpg") || "/avatars/maya.jpg";
	const header = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-x-0 top-0 z-20 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						src: hostFace,
						name: hostName,
						size: "lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 truncate text-[13px] font-medium leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: hostName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
								className: "kind-ink size-3.5 shrink-0",
								"aria-label": "Vérifié"
							})]
						}), host ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[10px] text-muted",
							children: "Hôte"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFollow((f) => !f),
							className: cn("mt-1 h-6 rounded-full px-2.5 text-[10px] font-medium", follow ? "bg-bg/50 text-muted" : "bg-accent text-accent-fg"),
							children: follow ? "Suivi" : "Suivre"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-bg/45 px-2 py-1 text-[10px] tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }), viewers]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-bg/45 px-2 py-1 text-[10px] tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 fill-heart text-heart" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								ref: likesEl,
								children: compact(likes.current)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: cycleRole,
							className: "rounded-full bg-bg/40 px-2 py-1 text-[10px] font-medium",
							children: role === "host" ? "Hôte" : role === "guest" ? "Invité" : "Public"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-8 items-center justify-center rounded-full bg-bg/40",
							onClick: () => openSheet("more"),
							"aria-label": "Plus",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-live px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-fg anim-live" }), "Live"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kind-ink text-[11px] font-medium",
						children: fmt.title
					}),
					isMic ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-bg/45 px-2 py-0.5 text-[10px]",
						children: [
							onStage.length,
							"/",
							guestCap,
							" invités"
						]
					}) : null
				]
			}),
			title && title !== fmt.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate text-[13px] font-medium leading-snug text-fg/90",
				children: title
			}) : null,
			kind === "openmic" && host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => openDraw("asks"),
				className: "mt-1.5 flex items-center gap-1 rounded-full bg-bg/50 px-2 py-1 text-[10px] font-medium ring-1 ring-accent/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-3 text-accent" }),
					" Demandes (",
					asks.length + hands.length,
					")"
				]
			}) : null,
			kind === "slam" && host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => openDraw("slam"),
				className: "mt-1.5 flex items-center gap-1 rounded-full bg-bg/50 px-2 py-1 text-[10px] font-medium ring-1 ring-accent/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "size-3 text-accent" }),
					" File",
					requests.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid min-w-4 place-items-center rounded-full bg-live px-1 text-[9px]",
						children: requests.length
					}) : null
				]
			}) : null,
			kind === "slam" && slam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "absolute right-3 top-[calc(3.4rem+env(safe-area-inset-top))] z-10 grid size-12 place-items-center",
				onClick: () => host && setSlamRun((r) => !r),
				"aria-label": host ? slamRun ? "Mettre en pause" : "Reprendre" : "Chrono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 100 100",
					className: "live-ring absolute inset-0 size-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "50",
							cy: "50",
							r: "44",
							fill: "rgb(8 8 10 / 0.55)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "50",
							cy: "50",
							r: "44",
							stroke: "rgb(242 238 230 / 0.16)",
							strokeWidth: "6",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "50",
							cy: "50",
							r: "44",
							stroke: "var(--color-accent)",
							strokeWidth: "6",
							strokeLinecap: "round",
							fill: "none",
							strokeDasharray: circ,
							strokeDashoffset: circ * (1 - ratio)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative text-center font-display text-[10px] tabular-nums leading-none",
					children: host && !slamRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "mx-auto size-3" }) : `${Math.floor(slam.left / 60)}:${String(slam.left % 60).padStart(2, "0")}`
				})]
			}) : null
		]
	});
	const chatCol = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("z-10 flex flex-col", isMic ? "min-h-0 max-h-[8.5rem] shrink-0 gap-1 overflow-y-auto px-3 pt-1.5" : isStory ? "story-chat pointer-events-none absolute bottom-[8.25rem] left-3 z-10 w-[86%]" : "pointer-events-none absolute bottom-24 left-3 right-4 gap-1.5"),
		children: comments ? (isStory ? chat : chat.slice(-(isMic ? 8 : 4))).map((c) => {
			const av = c.name === "toi" ? ME.avatar : CAST.find((u) => u.handle === c.name || u.name.startsWith(c.name))?.avatar;
			const who = c.name === "toi" ? "Toi" : c.name;
			if (isStory) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("story-line max-w-full text-[13px] leading-snug [text-shadow:0_1px_10px_rgb(0_0_0_/_0.75)]", c.fading && "is-out"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: who
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-fg/90",
					children: [" : ", c.text]
				})]
			}, c.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex w-fit max-w-[90%] items-center gap-1.5 rounded-full bg-bg/45 py-0.5 pr-2 pl-0.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
					src: av,
					name: who,
					size: "xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: who
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg/85",
							children: c.text
						})
					]
				})]
			}, c.id);
		}) : null
	});
	const composer = comments ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3",
		children: [emojiOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 grid grid-cols-8 gap-1 rounded-2xl bg-bg/80 p-2",
			children: REACTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `Emoji ${e}`,
				onClick: () => {
					setText((d) => d + e);
					if (isStory) setChat((c) => [...c, {
						id: uid("c"),
						name: "toi",
						text: e,
						at: Date.now()
					}]);
				},
				className: "grid size-9 place-items-center rounded-md text-lg",
				children: e
			}, e))
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex items-center gap-1.5",
			onSubmit: (e) => {
				e.preventDefault();
				sendChat();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute left-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-fg/80",
						onClick: () => setEmojiOpen((o) => !o),
						"aria-label": "Smileys",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						value: text,
						onChange: (e) => setText(e.target.value),
						placeholder: "Dire quelque chose…",
						className: "h-10 w-full rounded-full bg-bg/55 pr-9 pl-9 text-sm outline-none placeholder:text-fg/45"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "absolute right-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-accent",
						"aria-label": "Envoyer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center rounded-full bg-accent text-accent-fg",
						onClick: () => openSheet("gifts"),
						"aria-label": "Cadeau",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center rounded-full bg-bg/55",
						onClick: () => openSheet("share"),
						"aria-label": "Partager",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
					}),
					kind === "openmic" && watch && !mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: requestMount,
						"aria-label": asks.some((x) => x.id === "me") ? "En attente de l’hôte" : "Demander la parole",
						className: cn("flex size-9 items-center justify-center rounded-full", asks.some((x) => x.id === "me") ? "bg-accent text-accent-fg" : "bg-bg/55"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-4" })
					}) : null,
					kind === "slam" && slamMode === "open" && watch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => mine ? setFlow("backstage") : openSheet("slamAsk"),
						"aria-label": mine ? "Préparer ma performance" : "Demander à slamer",
						className: "flex size-9 items-center justify-center rounded-full bg-bg/55",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicVocal, { className: "size-4" })
					}) : null,
					kind === "stand" && watch && questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => openSheet("qsAsk"),
						"aria-label": "Poser une question",
						className: "flex size-9 items-center justify-center rounded-full bg-bg/55",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" })
					}) : null
				]
			})]
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-3 text-center text-xs text-muted",
		children: "Commentaires coupés"
	});
	const sheets = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftTray, {
			open: sheet === "gifts",
			onPick: sendGift,
			onClose: close
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveSheet, {
			open: sheet === "askConfirm",
			onClose: close,
			title: "Monter sur scène",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-snug",
					children: "Tu veux envoyer une demande pour monter ?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-muted",
					children: "L’hôte verra ta demande et décidera."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "mt-4",
					onClick: () => {
						askMount();
						close();
					},
					children: "Envoyer la demande"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "line",
					size: "lg",
					className: "mt-2",
					onClick: close,
					children: "Pas maintenant"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveSheet, {
			open: sheet === "share",
			onClose: close,
			title: "Partager le live",
			children: [
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" }),
					label: "Copier le lien",
					t: "Lien du live copié"
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
					label: "Envoyer en message",
					t: "Partagé en message"
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }),
					label: "WhatsApp",
					t: "Partagé sur WhatsApp"
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }),
					label: "Story",
					t: "Ajouté à ta story"
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }),
					label: "Partager ailleurs",
					t: "Feuille de partage ouverte"
				}
			].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					toast(o.t);
					close();
				},
				className: "mt-2 flex h-12 w-full items-center gap-3 rounded-lg bg-surface px-3 text-sm",
				children: [o.icon, o.label]
			}, o.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveSheet, {
			open: sheet === "more",
			onClose: close,
			title: `Options du live · ${host ? "Hôte" : guest ? "Invité" : "Public"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: isStory ? "Chat seulement · personne ne monte" : fmt.title
			}), (host ? [
				isStory ? {
					icon: camOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, { className: "size-4" }),
					title: camOn ? "Couper la caméra" : "Allumer la caméra",
					sub: "Tu restes seul à l’écran",
					go: () => setCamOn((c) => !c)
				} : null,
				isStory ? {
					icon: mutedHost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-accent" }),
					title: mutedHost ? "Micro coupé" : "Couper le micro",
					sub: "Personne d’autre ne peut monter",
					go: () => setMutedHost((m) => !m)
				} : null,
				isStory ? {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }),
					title: "Partager",
					sub: "Inviter à écouter ton histoire",
					go: () => openSheet("share")
				} : null,
				isMic ? {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-accent" }),
					title: "Gérer les places",
					sub: `${maxGuests} places max · ${Math.max(0, maxGuests - onStage.length)} libre(s)`,
					go: () => openDraw("asks")
				} : null,
				isMic ? {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-4 text-accent" }),
					title: "Demandes de montée",
					sub: "Spectateurs qui veulent une place",
					badge: asks.length,
					go: () => openDraw("asks")
				} : null,
				isMic ? {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-accent" }),
					title: "Demandes de parole",
					sub: "Mains levées sur scène",
					badge: hands.length,
					go: () => openDraw("asks")
				} : null,
				kind === "slam" ? {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "size-4 text-accent" }),
					title: "File d’attente",
					sub: `${queue.length} à suivre · ${requests.length} demande(s)`,
					badge: requests.length,
					go: () => openDraw("slam")
				} : null,
				kind === "stand" && questions ? {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4 text-accent" }),
					title: "Questions",
					sub: `${waiting.length} en attente`,
					badge: waiting.length,
					go: () => openDraw("qs")
				} : null,
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }),
					title: "Règles",
					sub: rules,
					go: () => flash(rules)
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }),
					title: "Modération / Signaler",
					sub: "Gérer un comportement",
					go: () => toast("Signalement envoyé")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 text-heart" }),
					title: "Terminer le live",
					sub: "Fermer pour tout le monde",
					go: endLive,
					danger: true
				}
			] : guest ? [
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }),
					title: "Partager",
					sub: "Inviter des amis à écouter",
					go: () => openSheet("share")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }),
					title: "Qualité vidéo",
					sub: link === "off" ? "Hors ligne · reconnexion…" : link === "weak" ? "Basse · connexion instable" : "Auto · adaptée à ta connexion",
					go: () => toast(link === "off" ? "Hors ligne · on réessaie" : link === "weak" ? "Qualité : Basse" : "Qualité : Auto")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }),
					title: "Quitter la scène",
					sub: "Redevenir spectateur",
					go: leaveStage
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }),
					title: "Signaler",
					sub: "Signaler un comportement",
					go: () => toast("Signalement envoyé")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
					title: "Règles",
					sub: rules,
					go: () => flash(rules)
				}
			] : [
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }),
					title: "Partager",
					sub: "Inviter des amis à écouter",
					go: () => openSheet("share")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }),
					title: "Qualité vidéo",
					sub: link === "off" ? "Hors ligne · reconnexion…" : link === "weak" ? "Basse · connexion instable" : "Auto · adaptée à ta connexion",
					go: () => toast(link === "off" ? "Hors ligne · on réessaie" : link === "weak" ? "Qualité : Basse" : "Qualité : Auto")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }),
					title: quiet ? "Rétablir le son" : "Couper le son du live",
					sub: "Continuer à lire le chat",
					go: () => {
						setQuiet((q) => !q);
						flash(quiet ? "Son rétabli" : "Son du live coupé");
					}
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }),
					title: "Signaler le live",
					sub: "Prévenir la modération",
					go: () => toast("Signalement envoyé")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-4" }),
					title: "Ne plus recommander",
					sub: "Moins de lives comme celui-ci",
					go: () => toast("Ce live ne sera plus recommandé")
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
					title: "Règles de la communauté",
					sub: rules,
					go: () => flash(rules)
				},
				{
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 text-heart" }),
					title: "Quitter",
					sub: "Sortir du live",
					go: onLeave,
					danger: true
				}
			]).filter((x) => Boolean(x)).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					close();
					it.go();
				},
				className: cn("mt-1.5 flex w-full items-center gap-3 rounded-lg bg-surface px-3 py-2.5 text-left", "danger" in it && it.danger && "text-heart"),
				children: [it.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-sm",
						children: [it.title, "badge" in it && it.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid min-w-4 place-items-center rounded-full bg-live px-1 text-[10px] text-fg",
							children: it.badge
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-[11px] text-muted",
						children: it.sub
					})]
				})]
			}, it.title))]
		}),
		isMic ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveSheet, {
			open: sheet === "react",
			onClose: close,
			title: "Réactions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: REACTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						burst(layer.current, 2, true);
						close();
					},
					className: "flex size-12 items-center justify-center rounded-lg bg-surface-2 text-lg",
					children: e
				}, e))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SideSheet, {
			open: draw === "asks",
			onClose: closeDraw,
			title: "Demandes",
			sub: `${asks.length} pour monter · ${hands.length} main${hands.length > 1 ? "s" : ""} levée${hands.length > 1 ? "s" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							Math.max(0, maxGuests - onStage.length),
							" place",
							maxGuests - onStage.length > 1 ? "s" : "",
							" libre",
							maxGuests - onStage.length > 1 ? "s" : ""
						]
					}), host ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-muted",
						onClick: () => setAsksOpen((v) => !v),
						children: asksOpen ? "Fermer les demandes" : "Rouvrir"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: [
						"Demandes de montée (",
						asks.length,
						")"
					]
				}),
				asks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-2 text-xs text-muted",
					children: "Aucune demande pour le moment."
				}) : null,
				asks.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
							src: a.avatar,
							name: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: a.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted",
								children: "Spectateur · veut monter"
							})]
						}),
						host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-fg",
								onClick: () => acceptAsk(a),
								children: "Faire monter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted",
								onClick: () => refuseAsk(a),
								children: "Refuser"
							})]
						}) : null
					]
				}, a.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: [
						"Demandes de parole (",
						hands.length,
						")"
					]
				}),
				hands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-2 text-xs text-muted",
					children: "Aucune main levée."
				}) : null,
				hands.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
							src: a.avatar,
							name: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: a.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted",
								children: "Sur scène · main levée"
							})]
						}),
						host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-fg",
								onClick: () => giveFloor(a.id),
								children: "Donner la parole"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted",
								onClick: () => setOnStage((s) => s.map((i) => i.id === a.id ? {
									...i,
									hand: false
								} : i)),
								children: "Refuser"
							})]
						}) : null
					]
				}, a.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: [
						"Sur scène · ",
						onStage.length,
						"/",
						maxGuests
					]
				}),
				slots.map((g, i) => g ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
							src: g.avatar,
							name: g.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm",
								children: [g.name, g.speaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-[10px] text-accent",
									children: "parle"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted",
								children: ["Place ", i + 1]
							})]
						}),
						host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-muted",
								"aria-label": "Micro",
								onClick: () => setOnStage((s) => s.map((x) => x.id === g.id ? {
									...x,
									muted: !x.muted
								} : x)),
								children: g.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted",
								onClick: () => kick(g.id),
								children: "Faire descendre"
							})]
						}) : null
					]
				}, g.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center gap-2 rounded-lg border border-dashed border-accent/40 px-2.5 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-full ring-1 ring-accent/50 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm",
							children: "Place libre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] text-muted",
							children: ["Place ", i + 1]
						})]
					})]
				}, `free-${i}`))
			]
		})] }) : null,
		kind === "slam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveSheet, {
			open: sheet === "slamAsk",
			onClose: close,
			title: "Demander à slamer",
			tall: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: "Titre de ton slam"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: formTitle,
					maxLength: 48,
					onChange: (e) => setFormTitle(e.target.value),
					placeholder: "Ex. : J’ai appris à me choisir",
					className: "mt-1.5 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-right text-[10px] text-muted",
					children: [formTitle.length, "/48"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: "Durée"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 grid grid-cols-2 gap-2",
					children: [1, 3].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFormMin(d),
						className: cn("rounded-lg py-4 text-center ring-1", formMin === d ? "bg-accent text-accent-fg ring-accent" : "bg-surface ring-line"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-lg font-medium",
							children: [d, " min"]
						})
					}, d))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[11px] text-muted",
					children: "Uniquement 1 ou 3 minutes — c’est la règle de la scène."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: "Ambiance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 flex flex-wrap gap-1.5",
					children: MUSIC.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
						on: formMusic === m,
						onClick: () => {
							setFormMusic(m);
							setFormTrack(TRACKS[m][0] ?? "");
						},
						children: m
					}, m))
				}),
				formMusic === "Sans musique" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-lg bg-surface p-3 text-xs text-muted",
					children: "Tu slameras a cappella — aucune mélodie ne sera lancée."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: [
						"Instrumentales · ",
						formMusic,
						" · ",
						formMin,
						" min"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 flex flex-col gap-1.5",
					children: TRACKS[formMusic].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setFormTrack(s),
						className: cn("flex items-center gap-2 rounded-lg px-3 py-2.5 text-left ring-1", formTrack === s ? "bg-accent/15 ring-accent/50" : "bg-surface ring-line"),
						children: [formTrack === s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-4 place-items-center rounded-full bg-accent text-accent-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-2.5",
								strokeWidth: 3
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: s
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted",
								children: [formMin, ":00"]
							})]
						})]
					}, s))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "mt-4",
					disabled: formTitle.trim().length < 2,
					onClick: () => {
						const t = formTitle.trim();
						const req = {
							id: uid("s"),
							name: "Toi",
							title: t,
							min: formMin,
							music: formMusic,
							track: formTrack
						};
						setRequests((q) => [req, ...q]);
						setFormTitle("");
						flash("Demande envoyée à l’hôte");
						close();
						if (watch) window.setTimeout(() => {
							setRequests((x) => x.filter((i) => i.id !== req.id));
							setQueue((q) => [...q, req]);
							setMine(req);
							setFlow("confirm");
						}, 1800);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), " Envoyer ma demande"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SideSheet, {
			open: draw === "slam",
			onClose: closeDraw,
			title: "Slam Thérapie — Scène ouverte",
			sub: `${queue.length} à suivre · ${requests.length} demande${requests.length > 1 ? "s" : ""}`,
			children: [
				host && requests.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
						children: [
							"Demandes de passage (",
							requests.length,
							")"
						]
					}),
					requests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 rounded-lg bg-surface p-2.5 ring-1 ring-accent/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
								src: faceOf(r.name),
								name: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm",
										children: r.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[11px] italic text-muted",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-[10px] text-muted",
										children: [
											r.min,
											" min · ",
											r.track || r.music
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-9 flex-1 rounded-md bg-surface-2 text-xs",
								onClick: () => refuseSlam(r),
								children: "Refuser"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-9 flex-1 rounded-md bg-accent text-xs font-medium text-accent-fg",
								onClick: () => acceptSlam(r),
								children: "Accepter"
							})]
						})]
					}, r.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-[10px] text-muted",
						children: "On n’entre dans la file qu’après acceptation."
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: "Sur scène"
				}),
				slam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center gap-2 rounded-lg bg-surface p-2.5 ring-1 ring-accent/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
							src: slam.name === "Toi" ? ME.avatar : slamFace,
							name: slam.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: slam.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] italic text-muted",
								children: slam.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted",
								children: slam.track || slam.music
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-medium text-accent",
								children: [slam.min, " min"]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-2 text-xs text-muted",
					children: "Personne sur scène."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted",
					children: [
						"À suivre (",
						queue.length,
						")"
					]
				}),
				queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 rounded-lg bg-surface p-3 text-xs text-muted",
					children: "La file est vide — la scène est à toi."
				}) : null,
				queue.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("mt-1.5 rounded-lg p-2.5", q.name === "Toi" ? "bg-accent/15 ring-1 ring-accent/40" : "bg-surface"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] font-medium text-accent",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
								src: faceOf(q.name) || (q.name === "Toi" ? ME.avatar : void 0),
								name: q.name,
								size: "sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm",
									children: [q.name, q.name === "Toi" ? " (toi)" : ""]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] italic text-muted",
									children: q.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted",
									children: q.track || q.music
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] font-medium text-accent",
									children: [q.min, " min"]
								})]
							})
						]
					}), host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-7 place-items-center rounded-md bg-surface-2",
								"aria-label": "Monter",
								onClick: () => moveQ(i, -1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-7 place-items-center rounded-md bg-surface-2",
								"aria-label": "Descendre",
								onClick: () => moveQ(i, 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-7 place-items-center rounded-md bg-surface-2 text-heart",
								"aria-label": "Retirer",
								onClick: () => {
									setQueue((all) => all.filter((x) => x.id !== q.id));
									flash(`${q.name} retiré de la file`);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ml-auto flex items-center gap-1 rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-medium text-accent-fg",
								onClick: () => startNow(q),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-3" }), " Passer maintenant"]
							})
						]
					}) : null]
				}, q.id)),
				host && slamMode === "open" && !slam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "mt-3 w-full",
					disabled: !queue[0],
					onClick: () => {
						closeDraw();
						startNext();
					},
					children: "Faire monter le suivant"
				}) : null,
				slamMode === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Envie de slamer ?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Partage ton texte avec la communauté. 1 ou 3 minutes."
						}),
						mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] font-medium text-accent",
							children: [
								"Tu es déjà dans la file (#",
								myPos || 1,
								") — ~",
								etaMin,
								" min"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "mt-2 w-full",
							onClick: () => {
								closeDraw();
								setFlow("backstage");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), " Préparer ma performance"]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "mt-2 w-full",
							onClick: () => {
								closeDraw();
								openSheet("slamAsk");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), " Demander à slamer"]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-lg bg-surface p-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-fg",
							children: "Règles de la scène"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: rules
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: "1 ou 3 minutes uniquement."
						})
					]
				})
			]
		})] }) : null,
		kind === "stand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SideSheet, {
			open: draw === "qs",
			onClose: closeDraw,
			title: "Questions",
			sub: "Gère les questions de ton live",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 rounded-lg bg-surface p-1",
				children: [
					[
						"wait",
						"En attente",
						waiting.length
					],
					[
						"done",
						"Répondues",
						qs.filter((q) => q.st === "done").length
					],
					[
						"skip",
						"Ignorées",
						qs.filter((q) => q.st === "skip").length
					]
				].map(([k, l, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setQTab(k),
					className: cn("rounded-md py-1.5 text-[11px]", qTab === k ? "bg-accent text-accent-fg" : "text-muted"),
					children: [
						l,
						" (",
						n,
						")"
					]
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [
					qs.filter((q) => qTab === "wait" ? q.st === "wait" || q.st === "on" : q.st === qTab).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-xs text-muted",
						children: "Aucune question ici pour l’instant."
					}) : null,
					qs.filter((q) => qTab === "wait" ? q.st === "wait" || q.st === "on" : q.st === qTab).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("mb-2 rounded-lg px-3 py-2.5", q.st === "on" ? "bg-accent/20 ring-1 ring-accent/40" : "bg-surface"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
										src: faceOf(q.name) || (q.name === "Toi" ? ME.avatar : void 0),
										name: q.name,
										size: "sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs font-medium",
											children: q.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[10px] text-muted",
											children: q.ago
										})]
									}),
									q.st === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-snug",
								children: q.text
							}),
							qTab === "wait" && host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-9 flex-1 rounded-md bg-surface-2 text-xs",
									onClick: () => setQs((all) => all.map((i) => i.id === q.id ? {
										...i,
										st: "skip"
									} : i)),
									children: "Ignorer"
								}), q.st === "on" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-9 flex-1 rounded-md bg-accent text-xs text-accent-fg",
									onClick: () => {
										setQs((all) => all.map((i) => i.id === q.id ? {
											...i,
											st: "done"
										} : i));
										flash("Question répondue");
									},
									children: "Répondue"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-9 flex-1 rounded-md bg-accent text-xs text-accent-fg",
									onClick: () => {
										setQs((all) => all.map((i) => ({
											...i,
											st: i.id === q.id ? "on" : i.st === "on" ? "wait" : i.st
										})));
										closeDraw();
										if (q.name === "Toi") flash("L’hôte répond à ta question");
									},
									children: "Répondre"
								})]
							}) : null
						]
					}, q.id)),
					qTab === "wait" && host && waiting.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mt-1 flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-heart/15 text-xs text-heart",
						onClick: () => {
							setQs((all) => all.map((i) => i.st === "wait" ? {
								...i,
								st: "skip"
							} : i));
							flash("Toutes les questions en attente ignorées");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Tout supprimer"]
					}) : null
				]
			})]
		}) }) : null
	] });
	const stageBody = isMic ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-[2.8] flex-col overflow-hidden bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-0 flex-1 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					children: hostCam
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/70 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg/50 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: layer,
					className: "pointer-events-none absolute inset-0 z-20 overflow-hidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 z-[1]",
					onPointerDown: tap
				}),
				header
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "z-10 grid h-[6.25rem] shrink-0 gap-1.5 px-2 pb-1.5 pt-1",
			style: { gridTemplateColumns: `repeat(${guestCap}, minmax(0, 1fr))` },
			children: slots.map((g, i) => g ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					if (host && g.hand) giveFloor(g.id);
					else if (g.id === "me") {
						setMyHand((h) => !h);
						setOnStage((s) => s.map((x) => x.id === "me" ? {
							...x,
							hand: !x.hand
						} : x));
					}
				},
				className: cn("mic-slot relative overflow-hidden rounded-md bg-surface-2", g.hand && "is-hand", g.speaking && "is-speak"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.avatar || cover,
						alt: "",
						className: "size-full object-cover"
					}),
					g.cam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-1 top-1 flex size-5 items-center justify-center rounded-full bg-bg/70",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-2.5 text-accent" })
					}) : null,
					g.hand ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-accent text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-3" })
					}) : null,
					g.hand ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute inset-x-1 top-1/2 -translate-y-1/2 rounded-sm bg-bg/75 px-1 py-0.5 text-center text-[8px] leading-tight font-medium text-accent",
						children: "a demandé à parler"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute inset-x-0 bottom-0 flex items-center gap-1 bg-bg/70 px-1 py-0.5 text-[9px]",
						children: [
							g.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-2.5 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate",
								children: g.name
							}),
							!g.muted && g.speaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wave, {}) : null
						]
					})
				]
			}, g.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					if (host) openDraw("asks");
					else if (watch) requestMount();
				},
				className: "flex flex-col items-center justify-center rounded-md border border-dashed border-accent/45 bg-bg/35",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-6 items-center justify-center rounded-full ring-1 ring-accent text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 px-1 text-center text-[9px] leading-tight text-fg/85",
					children: "Place libre"
				})]
			}, `e-${i}`))
		})]
	}) : isStory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-0",
				children: hostCam
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-bg/50 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-bg/45 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: layer,
				className: "pointer-events-none absolute inset-0 z-20 overflow-hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[1] touch-manipulation",
				onPointerDown: tap
			}),
			header
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			kind === "slam" && slammer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: slamFace,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: hostCam
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg/85 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: layer,
				className: "pointer-events-none absolute inset-0 z-20 overflow-hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[1]",
				onPointerDown: tap
			}),
			header
		]
	});
	if (recap && snap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRecap, {
		stats: snap,
		onClose: goHome
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-kind": kind,
		className: cn("relative overflow-hidden bg-bg", isMic ? "flex h-full flex-col" : "h-full"),
		children: [
			stageBody,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkBanner, {
				level: link,
				className: "top-[4.7rem]"
			}),
			pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 top-[42%] z-10 rounded-lg bg-bg/75 px-3 py-2.5 ring-1 ring-accent/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-3" }),
							" ",
							pin.name,
							" demande"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm leading-snug",
						children: [
							"« ",
							pin.text,
							" »"
						]
					}),
					host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mt-2 flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-accent text-xs font-medium text-accent-fg",
						onClick: () => {
							setQs((all) => all.map((i) => i.id === pin.id ? {
								...i,
								st: "done"
							} : i));
							toast("Question répondue");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Question répondue"]
					}) : null
				]
			}) : null,
			isMic && host && asks[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 top-[7.4rem] z-20 rounded-lg bg-bg/80 px-3 py-2.5 ring-1 ring-accent/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 text-sm leading-snug",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: asks[0].name
					}), " souhaite prendre la parole"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 flex-1 rounded-md bg-surface-2 text-xs",
						onClick: () => refuseAsk(asks[0]),
						children: "Refuser"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 flex-1 rounded-md bg-accent text-xs font-medium text-accent-fg",
						onClick: () => acceptAsk(asks[0]),
						children: "Accepter"
					})]
				})]
			}) : null,
			kind === "slam" && slammer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-[5.75rem] right-3 z-20 size-20 overflow-hidden rounded-md outline outline-1 -outline-offset-1 outline-accent/50",
				children: hostCam
			}) : null,
			kind === "slam" && slam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute left-3 right-24 top-[5.4rem] z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-tight tracking-tight",
						children: slam.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-[11px] italic text-fg/80",
						children: slam.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "pointer-events-auto mt-1 inline-flex max-w-full items-center gap-1.5 rounded-md bg-bg/55 px-2 py-1 text-[10px]",
						onClick: () => toast(slam.track ? `${slam.track} · ${slam.music}` : "Sans musique — a cappella"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-3 shrink-0 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: slam.track || slam.music
							}),
							slam.track ? slamRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-2.5 shrink-0 fill-accent text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-2.5 shrink-0 text-muted" }) : null
						]
					})
				]
			}) : null,
			kind === "stand" && host && questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => openDraw("qs"),
				className: "absolute left-3 top-[42%] z-20 flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-xs font-medium text-accent-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-3.5" }),
					" Questions",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid min-w-4 place-items-center rounded-full bg-accent-fg px-1 text-[10px] text-accent",
						children: waiting.length
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				ref: comboEl,
				className: "pointer-events-none absolute bottom-40 right-16 z-20 font-display text-3xl italic tabular-nums opacity-0"
			}),
			gifts.map((h) => {
				const G = GIFTS.find((g) => g.id === h.kind);
				if (!G) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gift-float",
					style: {
						right: `${h.x}%`,
						["--gift-delay"]: `${h.delay}ms`,
						["--gift-x"]: `${h.drift}px`,
						["--gift-r"]: `${h.rot}deg`
					},
					children: G.emoji
				}, h.id);
			}),
			giftNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "gift-banner pointer-events-none absolute left-3 top-[38%] z-[25] flex max-w-[72%] items-center gap-2 rounded-full bg-bg/80 py-1 pr-3 pl-1 ring-1 ring-accent/35",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						src: giftNote.name === "Toi" ? ME.avatar || "/avatars/maya.jpg" : CAST.find((u) => u.name.startsWith(giftNote.name))?.avatar,
						name: giftNote.name,
						size: "sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs font-medium",
							children: giftNote.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-[10px] text-muted",
							children: [
								"envoie ",
								giftNote.label,
								" · ",
								giftNote.zems,
								" Zems"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg leading-none",
						children: giftNote.emoji
					})
				]
			}) : null,
			isMic ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [chatCol, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1",
				style: kb ? { paddingBottom: kb } : void 0,
				children: [composer, host || guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-2 mt-2 flex items-end justify-between rounded-2xl bg-bg/70 px-1.5 py-2 ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }),
							label: host ? "Quitter" : "Quitter la scène",
							onClick: host ? endLive : leaveStage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
							icon: mutedHost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: cn("size-4", speakingMe && "text-live") }),
							label: mutedHost ? "Coupé" : speakingMe ? "Parle" : "Mic",
							onClick: () => setMutedHost((m) => !m)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
							icon: camOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, { className: "size-4" }),
							label: "Caméra",
							onClick: () => setCamOn((c) => !c)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								if (host) openDraw("asks");
								else {
									setMyHand((h) => !h);
									setOnStage((s) => s.map((x) => x.id === "me" ? {
										...x,
										hand: !x.hand
									} : x));
								}
							},
							className: "relative -mt-3 flex size-14 shrink-0 flex-col items-center justify-center rounded-full bg-accent text-accent-fg",
							children: [
								host ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "max-w-12 text-center text-[8px] leading-tight font-medium",
									children: host ? "Parole" : myHand ? "Main levée" : "Parler"
								}),
								host && asks.length + hands.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-live text-[10px]",
									children: asks.length + hands.length
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
							label: "Inviter",
							onClick: () => openSheet("share")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "size-4" }),
							label: "Réagir",
							onClick: () => openSheet("react")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" }),
							label: "Plus",
							onClick: () => openSheet("more")
						})
					]
				}) : null]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [chatCol, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 z-10 pb-[max(0.6rem,env(safe-area-inset-bottom))]",
				style: kb ? { paddingBottom: kb } : void 0,
				children: composer
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-[70]",
				children: [
					sheets,
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-auto absolute inset-x-6 top-[42%] z-[62] rounded-lg bg-bg/90 px-4 py-3 text-center text-sm font-medium ring-1 ring-accent/40",
						children: notice
					}) : null,
					quiet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute right-3 top-[7.4rem] z-20 flex items-center gap-1 rounded-full bg-bg/60 px-2 py-1 text-[10px] text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-3" }), " Son coupé"]
					}) : null,
					sheet === "qsAsk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ask-veil is-open pointer-events-auto absolute inset-0 z-[60]",
						"aria-label": "Fermer",
						onClick: close
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute inset-x-4 top-[22%] z-[61] rounded-2xl bg-bg p-4 ring-1 ring-accent/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Poser une question"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: "Ta question est envoyée à l’hôte. Il choisit d’y répondre à l’antenne."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: askText,
								onChange: (e) => setAskText(e.target.value),
								rows: 3,
								placeholder: "Écris ta question…",
								className: "mt-3 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "mt-3",
								disabled: !askText.trim(),
								onClick: () => {
									setQs((all) => [{
										id: uid("q"),
										name: "Toi",
										text: askText.trim(),
										st: "wait",
										ago: "À l’instant"
									}, ...all]);
									setAskText("");
									flash("Question envoyée à l’hôte");
									close();
								},
								children: "Envoyer"
							})
						]
					})] }) : null,
					thanks ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-6 top-[42%] z-[62] rounded-lg bg-bg/90 px-4 py-3 text-center ring-1 ring-accent/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium text-accent",
							children: ["Merci ", thanks]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Ta performance est terminée. Retour en spectateur."
						})]
					}) : null,
					nextUp && count !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto absolute inset-0 z-[63] grid place-items-center bg-bg/85",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-medium uppercase tracking-[0.2em] text-accent",
									children: "Prochain sur scène"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-3xl leading-none",
									children: nextUp.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm italic text-muted",
									children: nextUp.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										nextUp.track || nextUp.music,
										" · ",
										nextUp.min,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display text-6xl leading-none text-accent",
									children: count === 0 ? "●" : count
								}),
								count === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted",
									children: "Chrono et musique lancés"
								}) : null
							]
						})
					}) : null,
					flow === "notice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute inset-x-3 top-[46%] z-[61] rounded-lg bg-bg p-3 ring-1 ring-accent/45",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-accent",
								children: "Tu passes bientôt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: "Ta performance commence dans ~1 minute."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "flex-1",
									onClick: () => setFlow("backstage"),
									children: "Préparer ma performance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-md bg-surface px-3 text-xs",
									onClick: () => setFlow(null),
									children: "Plus tard"
								})]
							})
						]
					}) : null,
					flow === "backstage" && mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ask-veil is-open pointer-events-auto absolute inset-0 z-[64]",
						"aria-label": "Fermer",
						onClick: () => setFlow(null)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute inset-x-4 top-1/2 z-[65] -translate-y-1/2 rounded-2xl bg-bg p-4 ring-1 ring-accent/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-medium uppercase tracking-[0.18em] text-accent",
								children: "Backstage privé"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl",
								children: "Tu es le prochain"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									"Passage dans ",
									String(Math.floor(soonLeft / 60)).padStart(2, "0"),
									":",
									String(soonLeft % 60).padStart(2, "0"),
									" — personne ne te voit ni ne t’entend pour l’instant."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-col gap-1.5",
								children: [
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-accent" }),
										label: "Micro prêt"
									},
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4 text-accent" }),
										label: "Caméra prête"
									},
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-4 text-accent" }),
										label: mine.track ? `${mine.track} — ${mine.music}` : mine.music
									}
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5",
									children: [
										c.icon,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "min-w-0 flex-1 truncate text-sm",
											children: c.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" })
									]
								}, c.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 text-[11px] text-muted",
								children: "Ta caméra ne s’allumera qu’après ta confirmation. Sans confirmation, l’hôte passe au suivant."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "mt-3",
								onClick: () => {
									setReady("soon");
									setFlow(null);
									flash("Tu es prêt — l’hôte va te faire monter");
									startNow(mine);
								},
								children: "Je suis prêt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-1.5 flex h-11 w-full items-center justify-center rounded-md bg-surface text-sm text-muted",
								onClick: () => setFlow(null),
								children: "Fermer"
							})
						]
					})] }) : null,
					flow === "confirm" && mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ask-veil is-open pointer-events-auto absolute inset-0 z-[64]",
						"aria-label": "Fermer",
						onClick: () => setFlow(null)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute inset-x-4 top-1/2 z-[65] -translate-y-1/2 rounded-2xl bg-bg p-4 text-center ring-1 ring-accent/45",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-accent",
								children: "Ta demande a été acceptée"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: [
									"Tu es ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-accent",
										children: ["#", myPos || 1]
									}),
									" dans la file d’attente."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									"Passage estimé dans ~",
									etaMin,
									" min."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg bg-surface p-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: mine.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-[11px] text-muted",
									children: [
										mine.min,
										" min · ",
										mine.track || mine.music
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "mt-3",
								onClick: () => setFlow(null),
								children: "Super, je patiente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-1.5 flex h-11 w-full items-center justify-center rounded-md bg-surface text-sm",
								onClick: () => setFlow("backstage"),
								children: "Préparer ma performance"
							})
						]
					})] }) : null
				]
			})
		]
	});
}
function Shell$1({ title, onBack, children, right, kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-kind": kind,
		className: "relative flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-2 px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: onBack,
					"aria-label": "Retour",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex-1 text-center text-sm font-medium",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center",
					children: right
				})
			]
		}), children]
	});
}
function Dock({ icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-11 flex-col items-center gap-0.5 text-fg/85",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[8px] leading-none",
			children: label
		})]
	});
}
function LiveSheet({ open, onClose, title, tall, children }) {
	const ref = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)({
		on: false,
		start: 0,
		y: 0
	});
	const onDown = (e) => {
		if (e.target.closest("button, input, textarea")) return;
		drag.current = {
			on: true,
			start: e.clientY,
			y: 0
		};
		ref.current?.classList.add("is-drag");
		e.currentTarget.setPointerCapture(e.pointerId);
	};
	const onMove = (e) => {
		if (!drag.current.on) return;
		const dy = Math.max(0, e.clientY - drag.current.start);
		drag.current.y = dy;
		if (ref.current) ref.current.style.transform = `translate3d(0,${dy}px,0)`;
	};
	const onUp = () => {
		if (!drag.current.on) return;
		drag.current.on = false;
		ref.current?.classList.remove("is-drag");
		if (drag.current.y > 90) {
			if (ref.current) ref.current.style.transform = "";
			onClose();
			return;
		}
		if (ref.current) ref.current.style.transform = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("ask-veil absolute inset-0 z-40", open && "is-open"),
		"aria-label": "Fermer",
		"aria-hidden": !open,
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("live-sheet absolute inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-bg px-4", open && "is-open", tall && "is-tall"),
		"aria-hidden": !open,
		inert: !open || void 0,
		onPointerDown: onDown,
		onPointerMove: onMove,
		onPointerUp: onUp,
		onPointerCancel: onUp,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-fg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex shrink-0 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: onClose,
					"aria-label": "Fermer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar min-h-0 flex-1 overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]",
				children
			})
		]
	})] });
}
function SideSheet({ open, onClose, title, sub, children }) {
	const ref = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)({
		on: false,
		start: 0,
		x: 0
	});
	const onDown = (e) => {
		if (e.target.closest("button, input, textarea")) return;
		drag.current = {
			on: true,
			start: e.clientX,
			x: 0
		};
		ref.current?.classList.add("is-drag");
		e.currentTarget.setPointerCapture(e.pointerId);
	};
	const onMove = (e) => {
		if (!drag.current.on) return;
		const dx = Math.max(0, e.clientX - drag.current.start);
		drag.current.x = dx;
		if (ref.current) ref.current.style.transform = `translate3d(${dx}px,0,0)`;
	};
	const onUp = () => {
		if (!drag.current.on) return;
		drag.current.on = false;
		ref.current?.classList.remove("is-drag");
		if (drag.current.x > 80) {
			if (ref.current) ref.current.style.transform = "";
			onClose();
			return;
		}
		if (ref.current) ref.current.style.transform = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("ask-veil absolute inset-0 z-40", open && "is-open"),
		"aria-label": "Fermer",
		"aria-hidden": !open,
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("side-sheet absolute inset-y-0 right-0 z-50 flex flex-col bg-bg pl-6 pr-4", open && "is-open"),
		"aria-hidden": !open,
		inert: !open || void 0,
		onPointerDown: onDown,
		onPointerMove: onMove,
		onPointerUp: onUp,
		onPointerCancel: onUp,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "side-handle",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-[calc(0.5rem+env(safe-area-inset-top))] flex shrink-0 items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: title
					}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: sub
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 shrink-0 items-center justify-center",
					onClick: onClose,
					"aria-label": "Fermer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted",
				children: "Glisse vers la droite pour fermer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]",
				children
			})
		]
	})] });
}
function Face({ src, name, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 text-[10px]", size === "xs" ? "size-5" : size === "sm" ? "size-8" : size === "lg" ? "size-11" : "size-9"),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			className: "size-full object-cover"
		}) : name.charAt(0)
	});
}
function Wave() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "eq",
		"aria-hidden": true,
		children: [
			0,
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "eq-bar anim-eq" }, i))
	});
}
function fmtDuration(s) {
	const m = Math.floor(s / 60);
	const r = s % 60;
	if (m <= 0) return `${r} s`;
	return `${m} min ${String(r).padStart(2, "0")} s`;
}
var GAMES = [
	{
		id: "quiz",
		title: "Zembo Quiz",
		line: "Culture, chrono, dernier survivant.",
		players: "4 – 10",
		badge: "Compétition",
		icon: Brain
	},
	{
		id: "hotseat",
		title: "Hot Seat",
		line: "Un micro ouvert. La salle vote.",
		players: "4 – 10",
		badge: "Interactif",
		icon: Flame
	},
	{
		id: "prefer",
		title: "Tu préfères ?",
		line: "Deux choix. La salle vote avec toi.",
		players: "4 – 10",
		badge: "Discussion",
		icon: Sparkles
	}
];
var QUIZ = [
	{
		q: "Quelle ville est la métropole ?",
		a: [
			"Québec",
			"Montréal",
			"Ottawa"
		],
		g: 1
	},
	{
		q: "Le latte art se fait surtout avec ?",
		a: [
			"L’eau",
			"Le lait",
			"Le sucre"
		],
		g: 1
	},
	{
		q: "Un slam, c’est d’abord ?",
		a: [
			"Une performance parlée",
			"Un plat",
			"Un sport"
		],
		g: 0
	},
	{
		q: "Le Plateau, c’est à ?",
		a: [
			"Longueuil",
			"Montréal",
			"Laval"
		],
		g: 1
	},
	{
		q: "Le levain, on le trouve dans ?",
		a: [
			"Le pain",
			"Le café",
			"Le slam"
		],
		g: 0
	}
];
var HOTQ = [
	"Quel est ton plus grand luxe, vraiment ?",
	"Tu trahirais un secret pour 10 000 $ ?",
	"Tu quitterais tout demain ?",
	"Qui ici te fait le plus peur ?",
	"Tu pardonnes trop vite ?",
	"Tu dirais non à qui, ce soir ?",
	"Qu’est-ce que tu caches encore ?"
];
var PREFER = [
	["Un message de trop", "Un silence de trop"],
	["Tout dire", "Tout taire"],
	["Perdre la mémoire", "Perdre le goût"],
	["Être en avance", "Arriver pile"],
	["Un secret", "Un mensonge"],
	["Le premier café", "Le dernier verre"],
	["Une scène vide", "Une salle pleine"],
	["Savoir", "Deviner"]
];
function PlayHub({ onBack, onPick }) {
	const { toast } = useNav();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: onBack,
						"aria-label": "Retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1 text-center text-sm font-medium",
						children: "Play & Fun"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						"aria-label": "Aide",
						onClick: () => toast("Choisis un jeu. Ta communauté joue avec toi."),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-5 text-muted" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pb-3 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl tracking-tight",
					children: ["Play ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "& Fun"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Choisis ton jeu et lance la partie."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid min-h-0 flex-1 grid-cols-2 content-start gap-2.5 overflow-y-auto px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]",
				children: GAMES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(g.id),
					className: "flex min-h-[11.5rem] flex-col rounded-2xl bg-surface p-3 text-left shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)] transition-transform duration-150 active:scale-[0.985]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-xl bg-accent/12 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-accent ring-1 ring-accent/40",
							children: g.badge
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-auto pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-lg leading-tight tracking-tight",
								children: g.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs leading-snug text-muted",
								children: g.line
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-2 flex items-center gap-1.5 text-[11px] text-accent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
									g.players,
									" joueurs"
								]
							})
						]
					})]
				}, g.id))
			})
		]
	});
}
function QuizGame({ onBack }) {
	const names = [
		"toi",
		"Maya",
		"Noah",
		"Luca"
	];
	const [i, setI] = (0, import_react.useState)(0);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [left, setLeft] = (0, import_react.useState)(10);
	const [score, setScore] = (0, import_react.useState)({
		toi: 0,
		Maya: 0,
		Noah: 0,
		Luca: 0
	});
	const [out, setOut] = (0, import_react.useState)([]);
	const [done, setDone] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)(null);
	const q = QUIZ[i];
	const locked = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		locked.current = false;
		if (done) return;
		const t = window.setInterval(() => {
			setLeft((s) => {
				if (s <= 1) {
					settle(null);
					return 0;
				}
				return s - 1;
			});
		}, 1e3);
		return () => window.clearInterval(t);
	}, [i, done]);
	const settle = (n) => {
		if (locked.current) return;
		locked.current = true;
		const you = n;
		setPick(you ?? -1);
		setScore((s) => ({
			toi: s.toi + (you === q.g ? 1 : 0),
			Maya: s.Maya + (out.includes("Maya") ? 0 : Math.random() > .45 ? 1 : 0),
			Noah: s.Noah + (out.includes("Noah") ? 0 : Math.random() > .5 ? 1 : 0),
			Luca: s.Luca + (out.includes("Luca") ? 0 : Math.random() > .55 ? 1 : 0)
		}));
		window.setTimeout(() => {
			if (i === 2) setScore((s) => {
				const alive = names.filter((n) => !out.includes(n));
				const drop = [...alive].sort((a, b) => (s[a] ?? 0) - (s[b] ?? 0))[0];
				if (drop && alive.length > 2) {
					setOut((o) => [...o, drop]);
					setNote(`${drop === "toi" ? "Tu es" : drop + " est"} éliminé·e.`);
				}
				return s;
			});
			if (i >= QUIZ.length - 1) setDone(true);
			else {
				setI((x) => x + 1);
				setPick(null);
				setLeft(10);
				setNote(null);
			}
		}, 1100);
	};
	const ranking = Object.entries(score).sort((a, b) => b[1] - a[1]);
	const youOut = out.includes("toi");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, {
		title: "Zembo Quiz",
		onBack,
		children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finish, {
			title: `${ranking[0][0] === "toi" ? "Toi" : ranking[0][0]} gagne`,
			line: ranking.map(([n, v]) => `${n} ${v} pts`).join(" · "),
			onBack,
			onAgain: () => {
				setI(0);
				setPick(null);
				setLeft(10);
				setScore({
					toi: 0,
					Maya: 0,
					Noah: 0,
					Luca: 0
				});
				setOut([]);
				setDone(false);
				setNote(null);
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5",
				children: names.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("flex-1 rounded-md py-1.5 text-center text-[10px] tabular-nums", out.includes(n) ? "bg-surface-2 text-subtle line-through" : "bg-surface-2 text-fg"),
					children: [
						n,
						" ",
						score[n]
					]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs tabular-nums text-muted",
				children: [
					i + 1,
					" / ",
					QUIZ.length,
					" · ",
					left,
					" s"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl tracking-tight",
				children: q.q
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-accent",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-col gap-2",
				children: q.a.map((opt, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: pick !== null || youOut,
					onClick: () => settle(n),
					className: cn("h-12 rounded-md px-4 text-left text-sm", pick === null ? "bg-surface-2" : n === q.g ? "bg-accent text-accent-fg" : n === pick ? "bg-live/40" : "bg-surface-2 opacity-50"),
					children: [
						[
							"A",
							"B",
							"C"
						][n],
						" · ",
						opt
					]
				}, opt))
			}),
			youOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-auto pt-6 text-center text-sm text-muted",
				children: "Éliminé. Tu regardes la suite."
			}) : null
		] })
	});
}
function HotSeatGame({ onBack }) {
	const seats = (0, import_react.useMemo)(() => [
		"Maya",
		"Noah",
		"Luca",
		"Toi",
		"Inès",
		"Sol",
		"Jules"
	], []);
	const [turn, setTurn] = (0, import_react.useState)(0);
	const [votes, setVotes] = (0, import_react.useState)({});
	const [joker, setJoker] = (0, import_react.useState)(true);
	const [log, setLog] = (0, import_react.useState)("La partie commence. Micros coupés, sauf le hot seat.");
	const [done, setDone] = (0, import_react.useState)(false);
	const who = seats[turn % seats.length];
	const q = HOTQ[turn % HOTQ.length];
	const you = who === "Toi";
	const others = seats.filter((s) => s !== who);
	const left = others.slice(0, 3);
	const right = others.slice(3);
	const winner = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
	const next = (msg) => {
		setLog(msg);
		window.setTimeout(() => {
			if (turn >= seats.length - 1) setDone(true);
			else setTurn((t) => t + 1);
		}, 700);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, {
		title: "Hot Seat",
		onBack,
		children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finish, {
			title: `${winner?.[0] ?? "Toi"} l’emporte`,
			line: `${winner?.[1] ?? 0} réactions. La salle a voté.`,
			onBack,
			onAgain: () => {
				setTurn(0);
				setVotes({});
				setJoker(true);
				setLog("La partie commence.");
				setDone(false);
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col gap-2",
						children: left.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat$1, { name: s }, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-[38%] flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-[10px] uppercase tracking-wider text-accent",
								children: "Hot seat"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-accent text-accent-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-2xl",
									children: who
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "Micro ouvert"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col gap-2",
						children: right.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat$1, { name: s }, s))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center font-display text-xl tracking-tight",
				children: q
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-xs text-muted",
				children: log
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [you ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setVotes((v) => ({
							...v,
							Toi: (v.Toi ?? 0) + 2
						}));
						next("Tu as répondu. La salle vote.");
					},
					children: "Répondre"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						setVotes((v) => ({
							...v,
							[who]: (v[who] ?? 0) + 1
						}));
						next(`Tu votes pour ${who}.`);
					},
					children: "Réaction · voter"
				}), joker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "line",
					onClick: () => {
						setJoker(false);
						next("Joker. La question saute.");
					},
					children: "Utiliser mon joker"
				}) : null]
			})
		] })
	});
}
function Seat$1({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-14 items-center justify-center rounded-md bg-surface-2 text-xs text-muted",
		children: [name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: " micro coupé"
		})]
	});
}
function PreferGame({ onBack }) {
	const [i, setI] = (0, import_react.useState)(0);
	const [seen, setSeen] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	const q = PREFER[i];
	const pick = (n) => {
		if (seen !== null) return;
		setSeen(n);
		window.setTimeout(() => {
			if (i >= PREFER.length - 1) setDone(true);
			else {
				setI((x) => x + 1);
				setSeen(null);
			}
		}, 900);
	};
	const leftPct = 42 + i * 7 % 31;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, {
		title: "Tu préfères ?",
		onBack,
		children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finish, {
			title: "C’est tout",
			line: "La salle a voté avec toi.",
			onBack,
			onAgain: () => {
				setI(0);
				setSeen(null);
				setDone(false);
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				i + 1,
				" / ",
				PREFER.length
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-1 flex-col gap-3",
			children: q.map((opt, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => pick(n),
				className: cn("flex flex-1 flex-col items-center justify-center rounded-xl px-4 text-center font-display text-2xl", seen === n ? "bg-accent text-accent-fg" : "bg-surface"),
				children: [opt, seen !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-2 font-sans text-sm tabular-nums opacity-80",
					children: [n === 0 ? leftPct : 100 - leftPct, " %"]
				}) : null]
			}, opt))
		})] })
	});
}
function GameShell({ title, onBack, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-2 px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: onBack,
					"aria-label": "Retour",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex-1 text-center text-sm font-medium",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-11" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 flex-col px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
			children
		})]
	});
}
function Finish({ title, line, onBack, onAgain }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: line
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				onClick: onAgain,
				children: "Rejouer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 text-sm text-muted",
				onClick: onBack,
				children: "Autres jeux"
			})
		]
	});
}
var EMPTY_PROFILE = () => ({
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
	visible: true
});
var EMPTY_HELLOS = () => ({
	pending: [],
	ignored: [],
	sent: [],
	mutual: [],
	connections: []
});
var TAKEN = /* @__PURE__ */ new Set([
	"ines.moreau",
	"maya.clay",
	"theolang",
	"noahb",
	"solnavarro",
	"jules.m",
	"lucaferri",
	"rina.ok",
	"toi"
]);
var PHOTO_POOL = [
	"/avatars/ines.jpg",
	"/avatars/maya.jpg",
	"/avatars/sol.jpg",
	"/avatars/rina.jpg",
	"/posters/sunrise.jpg",
	"/posters/city.jpg",
	"/posters/latte.jpg",
	"/posters/plants.jpg",
	"/posters/pottery.jpg",
	"/posters/skate.jpg"
];
var COUNTRIES = [
	{
		id: "Canada",
		flag: "🇨🇦"
	},
	{
		id: "France",
		flag: "🇫🇷"
	},
	{
		id: "Belgique",
		flag: "🇧🇪"
	},
	{
		id: "Suisse",
		flag: "🇨🇭"
	},
	{
		id: "Sénégal",
		flag: "🇸🇳"
	},
	{
		id: "Côte d'Ivoire",
		flag: "🇨🇮"
	},
	{
		id: "Cameroun",
		flag: "🇨🇲"
	},
	{
		id: "Maroc",
		flag: "🇲🇦"
	},
	{
		id: "États-Unis",
		flag: "🇺🇸"
	},
	{
		id: "Royaume-Uni",
		flag: "🇬🇧"
	},
	{
		id: "Espagne",
		flag: "🇪🇸"
	},
	{
		id: "Brésil",
		flag: "🇧🇷"
	}
];
var LANGS = [
	"Français",
	"English",
	"Español",
	"Português",
	"Wolof",
	"Arabe",
	"Deutsch"
];
var ORIENTATIONS = [
	"Hétérosexuel·le",
	"Homosexuel·le",
	"Bisexuel·le",
	"Pansexuel·le",
	"Autre",
	"Préfère ne pas dire"
];
var INTENTS = [
	{
		id: "amitie",
		label: "Amitié",
		mark: "👥"
	},
	{
		id: "discussion",
		label: "Discussion",
		mark: "💬"
	},
	{
		id: "serieuse",
		label: "Rencontre sérieuse",
		mark: "❤️"
	},
	{
		id: "legere",
		label: "Rencontre sans prise de tête",
		mark: "⚡"
	},
	{
		id: "peu-importe",
		label: "Peu importe",
		mark: "♾"
	}
];
var WORLD_CARDS = [
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
		interests: [
			"Marché",
			"Jazz",
			"Mer"
		],
		sunday: "Thiéré, plage, rien d’autre.",
		redFlag: "Ceux qui n’écoutent pas.",
		travel: "Lisbonne, puis on verra.",
		photos: [
			"/avatars/rina.jpg",
			"/posters/sunrise.jpg",
			"/posters/plants.jpg"
		],
		languages: [
			"Français",
			"Wolof",
			"English"
		],
		online: true,
		verified: true
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
		interests: [
			"Afrobeat",
			"Foot",
			"Café"
		],
		sunday: "Match, puis attieke.",
		redFlag: "Ne jamais répondre.",
		travel: "Montréal en hiver, pour voir.",
		photos: [
			"/avatars/noah.jpg",
			"/posters/city.jpg",
			"/posters/hoops.jpg"
		],
		languages: ["Français", "English"],
		online: true,
		verified: true
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
		interests: [
			"Photo",
			"Vin",
			"Train"
		],
		sunday: "Brunch et longue marche.",
		redFlag: "Toujours en retard, jamais d’excuse.",
		travel: "Direction Lisbonne.",
		photos: [
			"/avatars/ines.jpg",
			"/posters/latte.jpg",
			"/posters/pottery.jpg"
		],
		languages: ["Français", "Español"],
		online: false,
		verified: true
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
		interests: [
			"Samba",
			"Cuisine",
			"Nuit"
		],
		sunday: "Feijoada et sieste.",
		redFlag: "Parler de soi sans pause.",
		travel: "Dakar, j’ai un cousin.",
		photos: [
			"/avatars/luca.jpg",
			"/posters/skate.jpg",
			"/posters/city.jpg"
		],
		languages: [
			"Português",
			"Français",
			"English"
		],
		online: true,
		verified: false
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
		interests: [
			"Mer",
			"Livres",
			"Céramique"
		],
		sunday: "Marché, puis rien.",
		redFlag: "Toujours occupé.",
		travel: "Un train vers le Maroc.",
		photos: [
			"/avatars/maya.jpg",
			"/posters/pottery.jpg",
			"/posters/plants.jpg"
		],
		languages: [
			"Español",
			"Français",
			"English"
		],
		online: true,
		verified: true
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
		interests: [
			"Thé",
			"Architecture",
			"Nuit"
		],
		sunday: "Médina, puis la corniche.",
		redFlag: "Mépris du silence.",
		travel: "Montréal, j’ai entendu la neige.",
		photos: [
			"/avatars/theo.jpg",
			"/posters/city.jpg",
			"/posters/sunrise.jpg"
		],
		languages: ["Arabe", "Français"],
		online: false,
		verified: true
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
		interests: [
			"Danse",
			"Cinéma",
			"Plage"
		],
		sunday: "Playlist et balcon.",
		redFlag: "Les grandes phrases, zéro acte.",
		travel: "Paris d’abord, ensuite le reste.",
		photos: [
			"/avatars/sol.jpg",
			"/posters/sunrise.jpg",
			"/posters/plants.jpg"
		],
		languages: ["Français", "English"],
		online: true,
		verified: false
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
		interests: [
			"Jazz",
			"Neige",
			"Café"
		],
		sunday: "Bagel, canal, manteau trop grand.",
		redFlag: "Toujours en déplacement.",
		travel: "Dakar, j’ai trop attendu.",
		photos: [
			"/avatars/jules.jpg",
			"/posters/bread.jpg",
			"/posters/latte.jpg"
		],
		languages: ["Français", "English"],
		online: true,
		verified: true
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
		interests: [
			"Poésie",
			"Vélo",
			"Théâtre"
		],
		sunday: "Marché Jean-Talon, puis le canal.",
		redFlag: "Ceux qui corrigent mon prénom.",
		travel: "Lisbonne, sans plan.",
		photos: [
			"/avatars/sol.jpg",
			"/posters/plants.jpg",
			"/posters/pottery.jpg"
		],
		languages: ["Français", "English"],
		online: true,
		verified: true
	}
];
var cardById = (id) => WORLD_CARDS.find((c) => c.id === id);
var intentLabel = (id) => INTENTS.find((i) => i.id === id)?.label ?? id;
var intentMark = (id) => INTENTS.find((i) => i.id === id)?.mark ?? "";
var flagOf = (country) => COUNTRIES.find((c) => c.id === country)?.flag ?? "🌍";
var validHandle = (v) => /^[a-zA-Z0-9._]{3,20}$/.test(v);
var QSEC = 15;
var SESSION = 1200;
var SEARCH_MS = 2e4;
var FOUND_AT = 17200;
var LOST_MS = 12e3;
var BLIP_AT = 4800;
var FACE_LINK_DEMO = "sway-face-link-demo";
var GOALS = [
	70,
	80,
	85,
	90,
	100
];
var EASE = [
	.22,
	1,
	.36,
	1
];
var PIPS$1 = {
	1: [4],
	2: [0, 8],
	3: [
		0,
		4,
		8
	],
	4: [
		0,
		2,
		6,
		8
	],
	5: [
		0,
		2,
		4,
		6,
		8
	],
	6: [
		0,
		2,
		3,
		5,
		6,
		8
	]
};
var stingEl = null;
var stingCtx = null;
function audioCtor() {
	return window.AudioContext || window.webkitAudioContext;
}
function unlockSting() {
	try {
		const Ctx = audioCtor();
		if (Ctx) {
			if (!stingCtx) stingCtx = new Ctx({ latencyHint: "interactive" });
			stingCtx.resume();
		}
		if (!stingEl) {
			stingEl = new Audio("/face/zembocall.wav");
			stingEl.preload = "auto";
		}
		stingEl.muted = true;
		const p = stingEl.play();
		if (p) p.then(() => {
			if (!stingEl) return;
			stingEl.pause();
			stingEl.currentTime = 0;
			stingEl.muted = false;
		}).catch(() => {
			if (stingEl) stingEl.muted = false;
		});
		window.speechSynthesis.cancel();
		const warm = new SpeechSynthesisUtterance(" ");
		warm.volume = 0;
		window.speechSynthesis.speak(warm);
	} catch {}
}
function playChime() {
	try {
		const Ctx = audioCtor();
		if (!Ctx) return;
		if (!stingCtx) stingCtx = new Ctx({ latencyHint: "interactive" });
		const ctx = stingCtx;
		ctx.resume();
		const now = ctx.currentTime;
		for (const [freq, delay, amp] of [
			[
				196,
				0,
				.22
			],
			[
				523.25,
				.04,
				.28
			],
			[
				659.25,
				.16,
				.26
			],
			[
				783.99,
				.3,
				.32
			],
			[
				1046.5,
				.46,
				.38
			]
		]) {
			const o = ctx.createOscillator();
			const g = ctx.createGain();
			o.type = "triangle";
			o.frequency.value = freq;
			g.gain.setValueAtTime(0, now + delay);
			g.gain.linearRampToValueAtTime(amp, now + delay + .02);
			g.gain.exponentialRampToValueAtTime(.001, now + delay + .55);
			o.connect(g);
			g.connect(ctx.destination);
			o.start(now + delay);
			o.stop(now + delay + .6);
		}
	} catch {}
}
function playSting() {
	let usedFile = false;
	try {
		const el = stingEl ?? new Audio("/face/zembocall.wav");
		stingEl = el;
		el.muted = false;
		el.currentTime = 0;
		const p = el.play();
		if (p) {
			usedFile = true;
			p.catch(() => playChime());
		}
	} catch {}
	if (!usedFile) playChime();
	try {
		const u = new SpeechSynthesisUtterance("Zembocall. Face à Face.");
		u.lang = "fr-FR";
		u.rate = .9;
		u.pitch = 1.04;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(u);
	} catch {}
}
var FACE_QS = [
	{
		q: "Dans une relation, qu’est-ce qui compte le plus pour toi ?",
		a: [
			"La confiance",
			"La communication",
			"La stabilité financière",
			"La passion"
		]
	},
	{
		q: "Un dimanche idéal, c’est plutôt ?",
		a: [
			"Rien faire ensemble",
			"Une sortie",
			"Du sport",
			"Cuisiner"
		]
	},
	{
		q: "Tu préfères qu’on se parle…",
		a: [
			"Tous les jours",
			"Quand on a quelque chose à dire",
			"Le soir seulement",
			"En vocal"
		]
	},
	{
		q: "Le plus grand luxe ?",
		a: [
			"Le temps",
			"L’argent",
			"La liberté",
			"Être compris"
		]
	},
	{
		q: "Un conflit, tu gères comment ?",
		a: [
			"On en parle tout de suite",
			"J’ai besoin d’une pause",
			"J’écris",
			"Je fuis un peu"
		]
	},
	{
		q: "Les réseaux, dans un couple ?",
		a: [
			"Tout partager",
			"Chacun sa vie",
			"Un peu, pas trop",
			"Je m’en fiche"
		]
	},
	{
		q: "Tu vises plutôt…",
		a: [
			"Quelque chose de sérieux",
			"Voir venir",
			"L’amitié d’abord",
			"La légèreté"
		]
	},
	{
		q: "Le voyage parfait ?",
		a: [
			"Imprévu",
			"Planifié",
			"Plage",
			"Ville"
		]
	},
	{
		q: "Tu dis je t’aime…",
		a: [
			"Vite et vrai",
			"Quand c’est sûr",
			"Par les gestes",
			"Rarement"
		]
	},
	{
		q: "Les enfants, un jour ?",
		a: [
			"Oui",
			"Peut-être",
			"Non",
			"Trop tôt pour dire"
		]
	},
	{
		q: "La jalousie ?",
		a: [
			"Saine, un peu",
			"Toxique",
			"Ça dépend",
			"Pas mon truc"
		]
	},
	{
		q: "Le premier rendez-vous ?",
		a: [
			"Un café",
			"Une marche",
			"Un dîner",
			"Quelque chose d’insolite"
		]
	},
	{
		q: "Tu pardonnes ?",
		a: [
			"Toujours",
			"Une fois",
			"Difficilement",
			"Ça dépend du geste"
		]
	},
	{
		q: "L’argent dans le couple ?",
		a: [
			"Chacun son compte",
			"Tout en commun",
			"On verra",
			"Celui qui a, paie"
		]
	},
	{
		q: "Le plus attirant ?",
		a: [
			"L’humour",
			"L’ambition",
			"La douceur",
			"La voix"
		]
	},
	{
		q: "Tu as besoin de…",
		a: [
			"D’espace",
			"De présence",
			"Des deux",
			"De surprises"
		]
	},
	{
		q: "Les messages la nuit ?",
		a: [
			"J’adore",
			"Le matin plutôt",
			"Un vocal",
			"On se couche"
		]
	},
	{
		q: "Un red flag ?",
		a: [
			"Le silence",
			"L’ego",
			"Les ex partout",
			"Les mensonges"
		]
	},
	{
		q: "Dans 5 ans, tu te vois ?",
		a: [
			"Ici, ancré",
			"Ailleurs",
			"On verra",
			"Avec quelqu’un"
		]
	},
	{
		q: "Ce Face à Face, tu le prends comment ?",
		a: [
			"À fond",
			"On rit",
			"Un peu stressé",
			"Curieux"
		]
	}
];
function seekLine(see) {
	if (see === "hommes") return "un homme";
	if (see === "femmes") return "une femme";
	if (see === "lgbt") return "une personne LGBT+";
	return "quelqu’un";
}
function matchesSeek(c, seek) {
	if (seek === "tous") return true;
	if (seek === "hommes") return c.gender === "homme";
	if (seek === "femmes") return c.gender === "femme";
	return c.gender === "autre";
}
function pickOpponent(seek, blocked, preferred) {
	if (preferred && matchesSeek(preferred, seek) && !blocked.includes(preferred.id)) return preferred;
	const pool = WORLD_CARDS.filter((c) => matchesSeek(c, seek) && !blocked.includes(c.id));
	if (!pool.length) return null;
	return pool[Math.floor(Math.random() * pool.length)];
}
function phaseFade(reduce) {
	if (reduce) return {
		initial: { opacity: 1 },
		animate: { opacity: 1 },
		exit: { opacity: 1 }
	};
	return {
		initial: {
			opacity: 0,
			y: 14
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .28,
				ease: EASE
			}
		},
		exit: {
			opacity: 0,
			y: -10,
			transition: {
				duration: .15,
				ease: EASE
			}
		}
	};
}
function optVars(reduce) {
	if (reduce) return {
		hidden: {
			opacity: 1,
			y: 0
		},
		visible: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 1,
			y: 0
		}
	};
	return {
		hidden: {
			opacity: 1,
			y: 10
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .22,
				ease: EASE
			}
		},
		exit: {
			opacity: 1,
			y: -8,
			transition: {
				duration: .12,
				ease: EASE
			}
		}
	};
}
function DualMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 90 32",
		className: "h-7 w-[4.85rem]",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "none",
				stroke: "#3ecbff",
				strokeWidth: "1.7",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "9.5",
					r: "4.6"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.5 28c.8-8.4 4.8-12.2 9.5-12.2S25.2 19.6 26 28" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M45 4.2 38.2 16h6.2L40.6 28.4 53 15.2h-6.4z",
				fill: "#ead9b0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "none",
				stroke: "#ff4eb5",
				strokeWidth: "1.7",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "74",
						cy: "9.5",
						r: "4.6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M64.5 28c.8-8.4 4.8-12.2 9.5-12.2S83.2 19.6 84 28" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M69.2 8.2c.4-4.6 3.2-7 5.2-7 2.6 0 5.2 1.8 6.2 5.4" })
				]
			})
		]
	});
}
function mmss(n) {
	const s = Math.max(0, n);
	const m = Math.floor(s / 60);
	return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function hhmm() {
	const d = /* @__PURE__ */ new Date();
	return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function ZMug() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/face/mug.png",
		alt: "",
		className: "face-mug"
	});
}
function Die$1({ face, rolling }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("die-iso", rolling && "is-roll"),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "die-iso-top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "die-iso-side" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "die-iso-front",
				children: Array.from({ length: 9 }, (_, p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: PIPS$1[face]?.includes(p) ? "die-pip" : void 0 }, p))
			})
		]
	});
}
function ThrowHand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 190",
		className: "face-hand-svg",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 176c8 6 22 8 34 4 10-4 16-14 18-28",
				fill: "none",
				stroke: "#8a6a3e",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M42 168c12 4 28 2 38-10",
				fill: "none",
				stroke: "#c4a574",
				strokeWidth: "6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M54 170c-12-6-20-22-16-40 4-16 12-28 20-48 4-10 2-20-4-26-6-8-4-18 4-22 8-4 16 2 18 10 2-12 10-18 20-16 10 2 16 10 16 20 4-8 14-12 22-8 8 4 10 14 6 22 8-2 18 4 20 14 2 10-4 20-12 26-12 10-22 30-26 48-4 16-12 28-26 32-12 4-32 0-42-12z",
				fill: "#ead9b0",
				stroke: "#b89a6e",
				strokeWidth: "2.4",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M72 108c2 22 4 38 2 54",
				fill: "none",
				stroke: "#b89a6e",
				strokeWidth: "1.5",
				opacity: ".5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M88 96c1 20 0 36-4 52",
				fill: "none",
				stroke: "#b89a6e",
				strokeWidth: "1.3",
				opacity: ".35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "118",
				cy: "78",
				r: "4.2",
				fill: "#d4c4a8",
				stroke: "#8a6a3e",
				strokeWidth: "1.2"
			})
		]
	});
}
function FaceDuel({ preferred, me, blocked, initialMode = "video", onQuit, onWin, onLose }) {
	const { toast } = useNav();
	const reduce = useReducedMotion();
	const fade = phaseFade(reduce);
	const local = useLink();
	const [phase, setPhase] = (0, import_react.useState)("setup");
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [seek, setSeek] = (0, import_react.useState)("tous");
	const [goal, setGoal] = (0, import_react.useState)(85);
	const [opp, setOpp] = (0, import_react.useState)(preferred ?? null);
	const [rules, setRules] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [i, setI] = (0, import_react.useState)(0);
	const [sec, setSec] = (0, import_react.useState)(QSEC);
	const [left, setLeft] = (0, import_react.useState)(SESSION);
	const [you, setYou] = (0, import_react.useState)(null);
	const [them, setThem] = (0, import_react.useState)(null);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [youPts, setYouPts] = (0, import_react.useState)(10);
	const [themPts, setThemPts] = (0, import_react.useState)(10);
	const [same, setSame] = (0, import_react.useState)(0);
	const [asked, setAsked] = (0, import_react.useState)(0);
	const [peer, setPeer] = (0, import_react.useState)("live");
	const [lost, setLost] = (0, import_react.useState)(false);
	const [flash, setFlash] = (0, import_react.useState)(null);
	const video = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [cam, setCam] = (0, import_react.useState)(false);
	const youR = (0, import_react.useRef)(null);
	const themR = (0, import_react.useRef)(null);
	const lockR = (0, import_react.useRef)(false);
	const iR = (0, import_react.useRef)(0);
	const held = local === "off" || peer === "drop";
	const weak = !held && local === "weak";
	const heldR = (0, import_react.useRef)(held);
	heldR.current = held;
	const q = FACE_QS[i];
	const meName = me.username || "Toi";
	const pct = asked ? Math.round(same / asked * 100) : null;
	const win = (pct ?? 0) >= goal;
	const card = opp;
	const themLevel = held ? "off" : weak ? "weak" : "good";
	const youLevel = local === "off" ? "off" : local === "weak" ? "weak" : "good";
	(0, import_react.useEffect)(() => {
		if (mode !== "video") {
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
			if (video.current) video.current.srcObject = null;
			setCam(false);
			return;
		}
		let stream = null;
		navigator.mediaDevices.getUserMedia(liveConstraints(false, true, local !== "good")).then((s) => {
			stream = s;
			streamRef.current = s;
			setCam(true);
			if (video.current) {
				video.current.srcObject = s;
				video.current.play().catch(() => {});
			}
		}).catch(() => setCam(false));
		return () => {
			stream?.getTracks().forEach((t) => t.stop());
		};
	}, [mode]);
	(0, import_react.useEffect)(() => {
		applyLinkQuality(streamRef.current, local !== "good");
	}, [local]);
	(0, import_react.useEffect)(() => {
		if (phase !== "search") return;
		let acc = 0;
		const t = window.setInterval(() => {
			if (heldR.current) return;
			acc += 200;
			if (acc >= SEARCH_MS) setPhase("play");
		}, 200);
		return () => window.clearInterval(t);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (phase !== "play") return;
		if (video.current && streamRef.current) {
			video.current.srcObject = streamRef.current;
			video.current.play().catch(() => {});
		}
	}, [phase, cam]);
	(0, import_react.useEffect)(() => {
		if (phase !== "play") return;
		let shown = false;
		try {
			shown = sessionStorage.getItem(FACE_LINK_DEMO) === "1";
		} catch {}
		if (shown) return;
		let dropped = false;
		const a = window.setTimeout(() => {
			if (heldR.current) return;
			dropped = true;
			setPeer("drop");
			try {
				sessionStorage.setItem(FACE_LINK_DEMO, "1");
			} catch {}
		}, BLIP_AT);
		const b = window.setTimeout(() => {
			if (!dropped) return;
			setPeer("live");
			setFlash("Reconnecté");
		}, 1e4);
		return () => {
			window.clearTimeout(a);
			window.clearTimeout(b);
		};
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (!flash) return;
		const t = window.setTimeout(() => setFlash(null), 1800);
		return () => window.clearTimeout(t);
	}, [flash]);
	(0, import_react.useEffect)(() => {
		if (phase === "setup" || phase === "result" || !held) {
			if (!held && lost) setLost(false);
			return;
		}
		const t = window.setTimeout(() => setLost(true), LOST_MS);
		return () => window.clearTimeout(t);
	}, [
		held,
		phase,
		lost
	]);
	(0, import_react.useEffect)(() => {
		if (phase !== "play" || held) return;
		const t = window.setInterval(() => setLeft((s) => s <= 1 ? 0 : s - 1), 1e3);
		return () => window.clearInterval(t);
	}, [phase, held]);
	(0, import_react.useEffect)(() => {
		if (phase !== "play" || locked || held) return;
		if (sec <= 0) {
			closeRound();
			return;
		}
		const t = window.setTimeout(() => setSec((s) => s - 1), 1e3);
		return () => window.clearTimeout(t);
	}, [
		phase,
		sec,
		locked,
		held
	]);
	(0, import_react.useEffect)(() => {
		if (phase !== "play" || locked || them !== null || held) return;
		const wait = 1100 + Math.random() * 1600;
		const t = window.setTimeout(() => {
			if (lockR.current || heldR.current) return;
			const pick = youR.current != null && Math.random() < .82 ? youR.current : Math.floor(Math.random() * 4);
			themR.current = pick;
			setThem(pick);
			if (youR.current != null) closeRound();
		}, wait);
		return () => window.clearTimeout(t);
	}, [
		phase,
		i,
		locked,
		held
	]);
	const closeRound = () => {
		if (lockR.current) return;
		lockR.current = true;
		setLocked(true);
		const y = youR.current;
		const t = themR.current;
		const match = y != null && t != null && y === t;
		setAsked((n) => n + 1);
		if (y != null) setYouPts((n) => n + 10);
		if (t != null) setThemPts((n) => n + 10);
		if (match) {
			setSame((n) => n + 1);
			setYouPts((n) => n + 10);
			setThemPts((n) => n + 10);
		}
		window.setTimeout(() => {
			if (iR.current >= FACE_QS.length - 1) {
				setPhase("result");
				return;
			}
			iR.current += 1;
			setI(iR.current);
			youR.current = null;
			themR.current = null;
			lockR.current = false;
			setYou(null);
			setThem(null);
			setLocked(false);
			setSec(QSEC);
		}, 1050);
	};
	const pick = (n) => {
		if (locked || youR.current != null) return;
		youR.current = n;
		setYou(n);
		if (themR.current != null) closeRound();
	};
	const startSearch = () => {
		if (local === "off") {
			toast("Pas de réseau. Réessaie dans un instant.");
			return;
		}
		const found = pickOpponent(seek, blocked, preferred);
		if (!found) {
			toast("Personne en ligne pour ce critère.");
			return;
		}
		setOpp(found);
		setPeer("live");
		setLost(false);
		unlockSting();
		setPhase("search");
	};
	const retryLink = () => {
		if (local === "off") {
			toast("Toujours hors ligne.");
			return;
		}
		setLost(false);
		setPeer("live");
		setFlash("Reconnecté");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyMotion, {
		features: domAnimation,
		strict: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 z-50 flex flex-col overflow-hidden bg-void pt-[env(safe-area-inset-top)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: phase === "setup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.div, {
						className: "flex min-h-0 flex-1 flex-col",
						...fade,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Setup, {
							mode,
							setMode,
							seek,
							setSeek,
							goal,
							setGoal,
							preferred,
							cam,
							video,
							me,
							onQuit,
							onGo: startSearch
						})
					}, "setup") : phase === "search" && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.div, {
						className: "flex min-h-0 flex-1 flex-col",
						...fade,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search$1, {
							card,
							me,
							mode,
							seek,
							goal,
							held,
							local,
							onQuit
						})
					}, "search") : (phase === "play" || phase === "result") && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
						className: "no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto",
						...fade,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "relative flex shrink-0 items-center px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex h-9 items-center gap-0.5 px-2 text-xs text-accent",
										onClick: onQuit,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Quitter"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-1/2 -translate-x-1/2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DualMark, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-auto flex items-center gap-0.5 pr-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex h-8 items-center gap-1 rounded-full px-2.5 text-[10px] ring-1 ring-accent/35",
											onClick: () => setRules(true),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-3" }), " Règles"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "grid size-8 place-items-center rounded-full",
											"aria-label": "Menu",
											onClick: () => setMenu((v) => !v),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4 text-muted" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
										initial: reduce ? false : {
											opacity: 0,
											y: -8,
											scale: .96
										},
										animate: {
											opacity: 1,
											y: 0,
											scale: 1
										},
										exit: {
											opacity: 0,
											y: -8,
											scale: .96
										},
										transition: {
											duration: .18,
											ease: EASE
										},
										className: "absolute right-2 top-10 z-30 min-w-[9rem] rounded-2xl bg-surface p-1 ring-1 ring-fg/12",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex h-10 w-full items-center gap-2 rounded-xl px-3 text-sm",
											onClick: () => {
												setMenu(false);
												setRules(true);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }), " Règles"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex h-10 w-full items-center gap-2 rounded-xl px-3 text-sm",
											onClick: onQuit,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Quitter"]
										})]
									}) : null })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 px-3 pt-0.5 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-sans text-[1.35rem] font-black leading-none tracking-wide",
									children: [
										"FACE ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "world-gold-text",
											children: "À"
										}),
										" FACE"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[10px] text-muted",
									children: "Testez votre compatibilité en temps réel !"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "face-seats-wrap relative mx-1.5 mt-1 w-[calc(100%-0.75rem)] shrink-0 self-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "face-seats",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
										label: "Vous",
										name: meName,
										pts: youPts,
										tone: "you",
										live: mode === "video",
										cam,
										video,
										photo: me.photos[0],
										level: youLevel,
										hold: local === "off",
										weak
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
										label: "Adversaire",
										name: card.name,
										pts: themPts,
										tone: "them",
										live: mode === "video",
										photo: card.photos[0],
										level: themLevel,
										hold: held,
										weak: weak && peer === "live"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-full bg-bg px-2.5 py-0.5 text-[10px] tracking-wider text-accent ring-1 ring-accent/45",
									children: [
										"QUESTION ",
										i + 1,
										" / ",
										FACE_QS.length
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-3 mt-1 flex shrink-0 items-center gap-2 rounded-full bg-surface px-3 py-1 ring-1 ring-fg/8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative h-4 w-6 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "absolute left-0 size-3.5 fill-face-you text-face-you" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "absolute left-2 size-3.5 fill-face-them text-face-them" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[8px] uppercase tracking-wider text-muted",
											children: "Compatibilité actuelle"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm tabular-nums",
											children: pct == null ? "— %" : `${pct} %`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "face-chip text-sm",
										children: "Z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[8px] uppercase tracking-wider text-muted",
											children: [
												"Objectif match : ",
												goal,
												"%+"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative mt-0.5 block h-1.5 overflow-visible rounded-full bg-fg/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.span, {
												className: "block h-full origin-left rounded-full world-gold",
												initial: false,
												animate: { scaleX: Math.min(1, (pct ?? 0) / goal || 0) },
												transition: {
													duration: reduce ? 0 : .4,
													ease: EASE
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "absolute -right-0.5 -top-1 size-3 fill-accent text-accent" })]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "face-scene mx-1.5 mt-1.5 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "face-board",
									"aria-hidden": true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "face-wood" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "face-edge" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "face-props",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZMug, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/face/chip.png",
													alt: "",
													className: "face-chip-prop"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZMug, {})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "face-q rounded-2xl px-3 pb-3 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
										mode: "wait",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.p, {
											initial: reduce ? false : {
												opacity: 0,
												y: 8
											},
											animate: {
												opacity: 1,
												y: 0
											},
											exit: {
												opacity: 0,
												y: -8
											},
											transition: {
												duration: reduce ? 0 : .2,
												ease: EASE
											},
											className: "text-center font-display text-[15px] leading-snug tracking-tight",
											children: q.q
										}, `q-${i}`)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
										mode: "wait",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.div, {
											className: "face-opts mt-3",
											initial: "hidden",
											animate: "visible",
											exit: "exit",
											variants: {
												hidden: { opacity: 1 },
												visible: {
													opacity: 1,
													transition: { staggerChildren: reduce ? 0 : .05 }
												},
												exit: {
													opacity: 1,
													transition: {
														staggerChildren: reduce ? 0 : .03,
														staggerDirection: -1
													}
												}
											},
											children: q.a.map((opt, n) => {
												const mine = you === n;
												const theirs = locked && them === n;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.button, {
													type: "button",
													disabled: locked || you != null,
													onClick: () => pick(n),
													variants: optVars(reduce),
													whileTap: reduce || locked || you != null ? void 0 : { scale: .96 },
													className: cn("face-opt w-full gap-2.5 rounded-full px-2.5 py-2 text-left text-[13px] leading-snug", mine && "is-pick", theirs && !mine && "ring-1 ring-face-them/70"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("grid size-7 shrink-0 place-items-center rounded-full text-[12px] ring-1 ring-accent/50", mine && "world-gold ring-0"),
														children: String.fromCharCode(65 + n)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "min-w-0 flex-1 whitespace-normal",
														children: opt
													})]
												}, `${i}-${n}`);
											})
										}, `a-${i}`)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "face-dock shrink-0 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mx-3 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitBox, {
												label: "Votre réponse",
												ready: you != null,
												locked,
												pick: you,
												opts: q.a,
												mine: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer$1, {
												sec,
												held
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitBox, {
												label: "Réponse adversaire",
												ready: them != null,
												locked,
												pick: them,
												opts: q.a,
												held
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mx-3 mt-1 grid shrink-0 grid-cols-3 gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-3.5 text-accent" }),
												k: "Compatibilité actuelle",
												v: pct == null ? "— %" : `${pct} %`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-3.5 text-accent" }),
												k: "Objectif match",
												v: `${goal}%+`,
												sub: "pour un match"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3.5 text-accent" }),
												k: "Temps restant",
												v: mmss(left),
												sub: "min"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mx-3 mt-1 mb-[calc(0.55rem+env(safe-area-inset-bottom))] flex shrink-0 items-start gap-2 rounded-2xl bg-surface px-3 py-1.5 ring-1 ring-fg/8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-8 shrink-0 place-items-center rounded-full world-gold font-display text-sm",
											children: "Z"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-1.5 text-xs",
												children: [
													"Zembo",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-story/20 px-1.5 py-px text-[8px] uppercase tracking-wider text-story",
														children: "Bot"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-auto text-[10px] text-muted",
														children: hhmm()
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-[11px] text-muted",
												children: held ? `Connexion instable. On retient tes réponses avec ${card.name}.` : flash ? "Reconnecté. On reprend le Face à Face." : weak ? "Qualité réduite pour garder l’appel." : "Répondez sincèrement et bonne chance !"
											})]
										})]
									})
								]
							})
						]
					}, "play") : null
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: phase === "result" && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
					initial: reduce ? false : { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: { duration: reduce ? 0 : .22 },
					className: "absolute inset-0 z-40 flex flex-col items-center bg-bg/92 px-6 pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DualMark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.p, {
							initial: reduce ? false : {
								opacity: 0,
								scale: .86
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								type: "spring",
								duration: .45,
								bounce: 0
							},
							className: "mt-4 font-display text-5xl tabular-nums tracking-tight",
							children: [pct ?? 0, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: ["compatibilité avec ", card.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "world-gold-text mt-4 text-center font-display text-2xl",
							children: win ? "C’est un match" : "Pas cette fois"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-sm text-muted",
							children: win ? `Objectif ${goal}% atteint. Vous pouvez vous connecter.` : `Il fallait ${goal}% de réponses identiques.`
						}),
						win ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							className: "world-gold mt-auto",
							onClick: () => onWin(card),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }), " Connecter"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: "world-gold mt-auto",
							onClick: () => onLose(card),
							children: "Retour aux Face à Face"
						}),
						win ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 h-11 text-sm text-muted",
							onClick: () => onLose(card),
							children: "Passer"
						}) : null
					]
				}, "result") : null }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: flash && phase === "play" && !held ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.p, {
					initial: {
						opacity: 0,
						y: -8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -6
					},
					transition: {
						duration: .2,
						ease: EASE
					},
					className: "link-chip is-ok pointer-events-none absolute inset-x-8 top-[calc(0.35rem+env(safe-area-inset-top))] z-[56]",
					children: flash
				}, "flash") : null }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lost && card && phase !== "setup" && phase !== "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkLost, {
					name: card.name,
					onRetry: retryLink,
					onQuit
				}) : null }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: rules ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.div, {
					initial: reduce ? false : { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: { duration: reduce ? 0 : .18 },
					className: "absolute inset-0 z-50 grid place-items-end bg-bg/70",
					onClick: () => setRules(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
						initial: reduce ? false : { y: 28 },
						animate: { y: 0 },
						exit: { y: 16 },
						transition: {
							duration: reduce ? 0 : .28,
							ease: EASE
						},
						className: "w-full rounded-t-3xl bg-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: "Règles"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-2 text-sm text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "20 questions. 15 secondes chacune." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Les réponses restent cachées jusqu’à la révélation." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [goal, "% de réponses identiques → connexion mutuelle."] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Connexion instable : le chrono se met en pause, tes réponses sont gardées." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: mode === "video" ? "Caméra allumée. Répondez sincèrement." : "Appel audio. Caméra éteinte. Répondez sincèrement." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "world-gold mt-5",
								onClick: () => setRules(false),
								children: "Compris"
							})
						]
					})
				}, "rules") : null })
			]
		})
	});
}
function Setup({ mode, setMode, seek, setSeek, goal, setGoal, preferred, cam, video, me, onQuit, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-scrollbar flex h-full flex-col overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex h-11 w-fit items-center gap-1 text-xs text-accent",
				onClick: onQuit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Quitter"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DualMark, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-center font-display text-[1.7rem] leading-none tracking-tight",
				children: ["FACE À ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "world-gold-text",
					children: "FACE"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: "D’abord le format, puis qui tu recherches."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-[11px] uppercase tracking-wider text-muted",
				children: "Format"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode("video"),
					className: cn("flex h-[5.4rem] flex-col items-center justify-center gap-1 rounded-2xl px-2 text-sm ring-1", mode === "video" ? "world-gold ring-0" : "bg-surface ring-fg/12"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Face à Face vidéo" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[10px]", mode === "video" ? "text-accent-fg/70" : "text-muted"),
							children: "Caméra allumée"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode("audio"),
					className: cn("flex h-[5.4rem] flex-col items-center justify-center gap-1 rounded-2xl px-2 text-sm ring-1", mode === "audio" ? "world-gold ring-0" : "bg-surface ring-fg/12"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Face à Face audio" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[10px]", mode === "audio" ? "text-accent-fg/70" : "text-muted"),
							children: "Vocal seulement"
						})
					]
				})]
			}),
			mode === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto mt-4 size-16 overflow-hidden rounded-full ring-2 ring-face-you",
				children: cam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: video,
					muted: true,
					playsInline: true,
					autoPlay: true,
					className: "size-full object-cover -scale-x-100"
				}) : me.photos[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: me.photos[0],
					alt: "",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-full place-items-center text-xs",
					children: "Toi"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-center text-[11px] text-accent",
				children: cam ? "Caméra prête" : "Caméra en attente"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-[11px] text-muted",
				children: "Appel vocal. Ta photo s’affiche, la caméra reste éteinte."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-[11px] uppercase tracking-wider text-muted",
				children: "Je veux être connecté à"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [
					["hommes", "Un homme"],
					["femmes", "Une femme"],
					["lgbt", "LGBT+"],
					["tous", "Peu importe"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSeek(id),
					className: cn("h-12 rounded-2xl text-sm ring-1", seek === id ? "world-gold ring-0" : "bg-surface ring-fg/12"),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-[11px] uppercase tracking-wider text-muted",
				children: "Objectif de compatibilité"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "world-gold-text mt-1 font-display text-4xl tabular-nums",
				children: [goal, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-1.5",
				children: GOALS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setGoal(n),
					className: cn("h-10 flex-1 rounded-full text-xs", goal === n ? "world-gold" : "bg-surface ring-1 ring-fg/12"),
					children: n
				}, n))
			}),
			preferred ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-center text-xs text-muted",
				children: [
					"Tu peux aussi lancer avec ",
					preferred.name,
					" si le critère correspond."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "world-gold mt-6",
				onClick: onGo,
				children: mode === "video" ? "Lancer la vidéo" : "Lancer l’appel"
			})
		]
	});
}
function Search$1({ card, me, mode, seek, goal, held, local, onQuit }) {
	const [found, setFound] = (0, import_react.useState)(false);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [faceA, setFaceA] = (0, import_react.useState)(5);
	const [faceB, setFaceB] = (0, import_react.useState)(3);
	const heldR = (0, import_react.useRef)(held);
	heldR.current = held;
	(0, import_react.useEffect)(() => {
		let acc = 0;
		const t = window.setInterval(() => {
			if (heldR.current) return;
			acc += 200;
			if (acc >= FOUND_AT) {
				window.clearInterval(t);
				setFound(true);
				playSting();
			}
		}, 200);
		return () => window.clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => {
			if (heldR.current) return;
			setTick((n) => n + 1);
		}, 1e3);
		return () => window.clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (found) return;
		const t = window.setInterval(() => {
			if (heldR.current) return;
			setFaceA(1 + Math.floor(Math.random() * 6));
			setFaceB(1 + Math.floor(Math.random() * 6));
		}, 2600);
		return () => window.clearInterval(t);
	}, [found]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex h-11 w-fit items-center gap-1 text-xs text-accent",
				onClick: onQuit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Quitter"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center font-display text-[1.65rem] leading-none tracking-tight",
				children: ["FACE À ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "world-gold-text",
					children: "FACE"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-center text-[11px] uppercase tracking-wider text-muted",
				children: [mode === "video" ? "Vidéo" : "Audio", " · recherche"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("face-throw mx-auto mt-5", found && "is-found", held && "is-held"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "face-felt",
						"aria-hidden": true
					}),
					!found ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "face-hand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThrowHand, {})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("face-die-fly is-a", found && "is-land"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Die$1, {
							face: faceA,
							rolling: !found && !held
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("face-die-fly is-b", found && "is-land"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Die$1, {
							face: faceB,
							rolling: !found && !held
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: held && !found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					className: "mt-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 font-display text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-4 text-accent" }), " Réseau instable"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "On garde ta recherche. Les dés reprendront dès que ça revient."
					})]
				}, "held") : found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .28,
						ease: EASE
					},
					className: "mt-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "face-call-flash font-display text-3xl tracking-wide",
							children: "Zembocall"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs uppercase tracking-[0.22em] text-accent",
							children: "Face à Face"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-display text-lg",
							children: [card.name, " est connecté"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								card.flag,
								" ",
								card.city,
								" · ",
								mode === "video" ? "caméra en ligne" : "appel en ligne"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: me.photos[0] || "",
									alt: "",
									className: "size-12 rounded-full object-cover ring-2 ring-face-you"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "world-gold-text font-display text-xl",
									children: "Z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: card.photos[0],
									alt: "",
									className: "size-12 rounded-full object-cover ring-2 ring-face-them"
								})
							]
						})
					]
				}, "found") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					className: "mt-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-lg",
							children: [
								"Recherche ",
								seekLine(seek),
								"…"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Une main lance les dés. On cherche un utilisateur connecté."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs tabular-nums text-accent",
							children: mmss(tick)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "face-dots mt-3",
							"aria-hidden": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							]
						})
					]
				}, "wait")
			}),
			local === "weak" && !held ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-[11px] text-muted",
				children: "Connexion faible · on continue quand même."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-auto text-center text-[11px] text-muted",
				children: [
					"Objectif : ",
					goal,
					"% de compatibilité"
				]
			})
		]
	});
}
function Seat({ label, name, pts, tone, live, cam, video, photo, level = "good", hold, weak }) {
	const you = tone === "you";
	const showCam = Boolean(live && you && cam && video);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("face-seat", you ? "face-frame-you" : "face-frame-them", hold && "is-held", weak && "is-weak"),
		children: [
			showCam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: video,
				muted: true,
				playsInline: true,
				autoPlay: true,
				className: "face-seat-media -scale-x-100"
			}) : photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: "",
				className: "face-seat-media"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "face-seat-media grid place-items-center bg-surface text-xs text-muted",
				children: live ? "Caméra" : "Audio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatHold, {
				name,
				hold,
				weak
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-1 p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("min-w-0", !you && "pl-9"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("truncate text-[10px] font-semibold uppercase tracking-wider", you ? "text-face-you" : "text-face-them"),
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs leading-none",
						children: name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-1 rounded-full bg-bg/70 px-1.5 py-0.5 text-[8px] text-open",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBars, { level }),
						hold ? "…" : live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-2.5" }),
						hold ? "" : " ON"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 z-10 flex items-center gap-1 bg-gradient-to-t from-bg/90 to-transparent px-2 pb-1.5 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-3.5 fill-current", you ? "text-heart" : "text-face-them") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums",
						children: pts
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8px] uppercase tracking-wider text-muted",
						children: "points"
					})
				]
			})
		]
	});
}
function WaitBox({ label, ready, locked, pick, opts, mine, held }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl px-2 py-2 ring-1", mine ? "ring-face-you/35 bg-face-you/8" : "ring-face-them/35 bg-face-them/8"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-[8px] uppercase tracking-wider", mine ? "text-face-you" : "text-face-them"),
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: locked && pick != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.p, {
				initial: {
					opacity: 0,
					y: 4
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -4
				},
				transition: { duration: .16 },
				className: "mt-0.5 truncate text-[12px]",
				children: opts[pick]
			}, "v") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(m.p, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: .12 },
				className: "mt-0.5 flex items-center gap-1 text-[12px] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-2.5" }),
					" ",
					held && !mine ? "Hors ligne…" : ready ? "Répondu" : "En attente…"
				]
			}, "w")
		})]
	});
}
function Timer$1({ sec, held }) {
	const r = 20;
	const c = 2 * Math.PI * r;
	const p = c * (1 - sec / QSEC);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid size-16 place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 48 48",
			className: "absolute inset-0 -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "24",
				r,
				fill: "none",
				stroke: "rgb(242 238 230 / 0.12)",
				strokeWidth: "3.2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "face-timer-ring",
				cx: "24",
				cy: "24",
				r,
				fill: "none",
				stroke: "#d4c4a8",
				strokeWidth: "3.2",
				strokeDasharray: c,
				strokeDashoffset: p,
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [held ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[10px] leading-none text-accent",
				children: "Pause"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.p, {
				initial: sec <= 5 ? {
					scale: .86,
					opacity: .7
				} : false,
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					type: "spring",
					duration: .28,
					bounce: 0
				},
				className: cn("font-display text-lg leading-none tabular-nums", sec <= 5 && "text-heart"),
				children: sec
			}, sec), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[8px] uppercase tracking-wider text-muted",
				children: held ? "réseau" : "s"
			})]
		})]
	});
}
function Stat({ icon, k, v, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-2 py-2 ring-1 ring-fg/8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1 text-[8px] uppercase tracking-wider text-muted",
				children: [icon, k]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 font-display text-base tabular-nums leading-tight",
				children: v
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[8px] text-muted",
				children: sub
			}) : null
		]
	});
}
var EMPTY_FILTERS = () => ({
	see: "tous",
	age: "all",
	zone: "monde",
	lang: "all",
	intent: "all"
});
var useWorld = create()(persist((set, get) => ({
	profile: null,
	hellos: EMPTY_HELLOS(),
	threads: {},
	unread: {},
	filters: EMPTY_FILTERS(),
	meets: [],
	saveProfile: (p) => set({ profile: {
		...p,
		completed: true
	} }),
	patchProfile: (p) => set((s) => ({ profile: s.profile ? {
		...s.profile,
		...p
	} : s.profile })),
	leaveWorld: () => set({
		profile: null,
		hellos: EMPTY_HELLOS(),
		threads: {},
		unread: {},
		filters: EMPTY_FILTERS(),
		meets: []
	}),
	setFilters: (f) => set({ filters: f }),
	sendHello: (id) => set((s) => ({ hellos: {
		...s.hellos,
		sent: s.hellos.sent.includes(id) ? s.hellos.sent : [...s.hellos.sent, id]
	} })),
	cancelHello: (id) => set((s) => ({ hellos: {
		...s.hellos,
		sent: s.hellos.sent.filter((x) => x !== id)
	} })),
	ignoreHello: (id) => set((s) => ({ hellos: {
		...s.hellos,
		pending: s.hellos.pending.filter((x) => x !== id),
		ignored: s.hellos.ignored.includes(id) ? s.hellos.ignored : [...s.hellos.ignored, id]
	} })),
	answerHello: (id) => set((s) => ({ hellos: {
		...s.hellos,
		pending: s.hellos.pending.filter((x) => x !== id),
		sent: s.hellos.sent.filter((x) => x !== id),
		mutual: s.hellos.mutual.includes(id) ? s.hellos.mutual : [...s.hellos.mutual, id]
	} })),
	connect: (id) => set((s) => ({
		hellos: {
			...s.hellos,
			connections: s.hellos.connections.includes(id) ? s.hellos.connections : [...s.hellos.connections, id],
			mutual: s.hellos.mutual.filter((x) => x !== id)
		},
		meets: s.meets.some((m) => m.id === id) ? s.meets.map((m) => m.id === id ? {
			...m,
			result: "connected",
			at: Date.now()
		} : m) : [...s.meets, {
			id,
			result: "connected",
			at: Date.now()
		}],
		threads: {
			...s.threads,
			[id]: s.threads[id] ?? [{
				id: uid("m"),
				from: "them",
				text: "Hello. Content que ça ait matché.",
				at: Date.now()
			}]
		},
		unread: {
			...s.unread,
			[id]: (s.unread[id] ?? 0) + 1
		}
	})),
	skipMeet: (id) => set((s) => ({
		hellos: {
			...s.hellos,
			mutual: s.hellos.mutual.filter((x) => x !== id)
		},
		meets: s.meets.some((m) => m.id === id) ? s.meets.map((m) => m.id === id ? {
			...m,
			result: "ended",
			at: Date.now()
		} : m) : [...s.meets, {
			id,
			result: "ended",
			at: Date.now()
		}]
	})),
	seedPending: (ids) => set((s) => ({ hellos: {
		...s.hellos,
		pending: [.../* @__PURE__ */ new Set([...ids, ...s.hellos.pending])]
	} })),
	seedMutual: (ids) => set((s) => ({ hellos: {
		...s.hellos,
		mutual: [.../* @__PURE__ */ new Set([...ids, ...s.hellos.mutual])]
	} })),
	sendWorldMsg: (id, text) => {
		const line = {
			id: uid("m"),
			from: "me",
			text,
			at: Date.now()
		};
		set((s) => ({ threads: {
			...s.threads,
			[id]: [...s.threads[id] ?? [], line]
		} }));
	},
	markRead: (id) => set((s) => ({ unread: {
		...s.unread,
		[id]: 0
	} })),
	resetDemo: () => {
		const p = get().profile;
		set({
			hellos: {
				...EMPTY_HELLOS(),
				pending: p ? ["w-moussa", "w-lea"] : [],
				mutual: p ? ["w-sofia"] : []
			},
			threads: {},
			unread: {},
			meets: []
		});
	}
}), { name: "sway-world-v1" }));
var buzz = () => {
	try {
		navigator.vibrate(8);
	} catch {}
};
function Logo({ size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("font-display tracking-tight text-accent", size === "sm" ? "text-lg" : "text-3xl"),
		children: [
			"W",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative inline-block px-0.5",
				children: ["O", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-accent" })]
			}),
			"RLD ROOM"
		]
	});
}
function WorldRoom({ onBack }) {
	const profile = useWorld((s) => s.profile);
	const saveProfile = useWorld((s) => s.saveProfile);
	const seedPending = useWorld((s) => s.seedPending);
	const seedMutual = useWorld((s) => s.seedMutual);
	const [hydrated, setHydrated] = (0, import_react.useState)(() => useWorld.persist.hasHydrated());
	const [intro, setIntro] = (0, import_react.useState)(!profile?.completed);
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(profile ?? EMPTY_PROFILE());
	const [step, setStep] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const done = () => {
			setHydrated(true);
			const p = useWorld.getState().profile;
			setDraft(p ?? EMPTY_PROFILE());
			setIntro(!p?.completed);
		};
		if (useWorld.persist.hasHydrated()) done();
		return useWorld.persist.onFinishHydration(done);
	}, []);
	const startEdit = (at = 1) => {
		setDraft(useWorld.getState().profile ?? EMPTY_PROFILE());
		setStep(at);
		setIntro(false);
		setEdit(true);
	};
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-bg" });
	if (!profile?.completed || edit) {
		if (intro && !edit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {
			onBack,
			onStart: () => setIntro(false)
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboard, {
			draft,
			step,
			setStep,
			setDraft,
			onBack: () => {
				if (edit) setEdit(false);
				else setIntro(true);
			},
			onDone: () => {
				saveProfile(draft);
				if (!profile?.completed) {
					seedPending(["w-moussa", "w-lea"]);
					seedMutual(["w-sofia"]);
				}
				setEdit(false);
				setIntro(false);
				buzz();
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldApp, {
		onBack,
		onEdit: startEdit
	});
}
function Intro({ onBack, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col overflow-hidden bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/posters/sunrise.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "relative z-10 flex items-center px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: onBack,
					"aria-label": "Fermer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-h-0 flex-1 flex-col px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl italic tracking-tight text-accent",
						children: "Le monde est à un Hello."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto mt-6 size-40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/posters/city.jpg",
								alt: "",
								className: "size-full rounded-full object-cover ring-1 ring-accent/40"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatars/rina.jpg",
								alt: "",
								className: "absolute -left-2 top-6 size-10 rounded-full object-cover ring-2 ring-bg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatars/luca.jpg",
								alt: "",
								className: "absolute -right-1 bottom-8 size-11 rounded-full object-cover ring-2 ring-bg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatars/maya.jpg",
								alt: "",
								className: "absolute bottom-0 left-10 size-9 rounded-full object-cover ring-2 ring-bg"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "mt-0.5 size-4 shrink-0 text-accent" }), "Fais de nouvelles rencontres aux quatre coins du monde"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-0.5 size-4 shrink-0 text-accent" }), "Des échanges authentiques et bienveillants"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mt-0.5 size-4 shrink-0 text-accent" }), "Amitié, discussion ou plus… C’est toi qui choisis"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "world-gold mt-auto",
						onClick: onStart,
						children: ["Créer mon profil ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				]
			})
		]
	});
}
function Onboard({ draft, step, setStep, setDraft, onBack, onDone }) {
	const patch = (p) => setDraft({
		...draft,
		...p
	});
	const handle = draft.username.toLowerCase();
	const taken = TAKEN.has(handle);
	const okUser = validHandle(handle) && !taken;
	const okPhotos = draft.photos.length >= 2;
	const ageN = Number(draft.age);
	const ready = [
		okUser,
		okPhotos,
		ageN >= 18 && ageN <= 99 && draft.answerSunday.trim() && draft.answerRedFlag.trim() && draft.answerEscape.trim(),
		!!draft.gender && !!draft.orientation,
		!!draft.country && draft.city.trim().length >= 2 && draft.languages.length > 0,
		draft.intentions.length > 0,
		true
	][step - 1];
	const [picking, setPicking] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: () => step === 1 ? onBack() : setStep(step - 1),
						"aria-label": "Retour",
						children: step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 gap-1",
						children: Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1 flex-1 rounded-full", i < step ? "world-gold" : "bg-surface-2") }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "w-11 text-center text-xs text-muted",
						children: [step, "/7"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-4",
				children: [
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						title: "Ton pseudo",
						sub: "C’est comme ça que le monde te verra.",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 flex h-12 items-center gap-2 rounded-md bg-surface px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: "@"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.username,
									maxLength: 20,
									onChange: (e) => patch({ username: e.target.value.replace(/\s/g, "") }),
									placeholder: "dina.world",
									className: "h-full w-full bg-transparent text-sm outline-none"
								})]
							}),
							handle.length >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-2 text-xs", taken ? "text-heart" : okUser ? "text-open" : "text-muted"),
								children: taken ? "✗ Ce pseudo est déjà pris" : okUser ? "✓ Pseudo disponible" : "Lettres, chiffres, point, underscore."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "Au moins 3 caractères."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs leading-relaxed text-muted",
								children: "Ton nom, ta date de naissance et ton email restent dans ton compte Zembo."
							})
						]
					}) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						title: "Tes photos",
						sub: "2 à 6 images. La première est la principale.",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-2 gap-2",
								children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
									big: true,
									src: draft.photos[i],
									main: i === 0,
									onPick: () => setPicking(true),
									onDrop: () => patch({ photos: draft.photos.filter((_, x) => x !== i) })
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-4 gap-2",
								children: [
									2,
									3,
									4,
									5
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
									src: draft.photos[i],
									onPick: () => setPicking(true),
									onDrop: () => patch({ photos: draft.photos.filter((_, x) => x !== i) })
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-center text-xs text-muted",
								children: [draft.photos.length, "/6 — appuie sur + pour ouvrir ta pellicule."]
							})
						]
					}) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						title: "Âge & World Card",
						sub: "Trois réponses. C’est ta carte.",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "numeric",
								value: draft.age,
								onChange: (e) => patch({ age: e.target.value.replace(/\D/g, "").slice(0, 2) }),
								placeholder: "Âge",
								className: "mt-4 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft.bio,
								maxLength: 120,
								rows: 2,
								onChange: (e) => patch({ bio: e.target.value }),
								placeholder: "Bio (facultatif)",
								className: "mt-2 w-full resize-none rounded-md bg-surface p-3 text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-right text-[10px] text-muted",
								children: [draft.bio.length, "/120"]
							}),
							[
								[
									"answerSunday",
									"Mon dimanche parfait",
									"brunch et longue marche"
								],
								[
									"answerRedFlag",
									"Mon plus gros red flag",
									"ne jamais répondre"
								],
								[
									"answerEscape",
									"Si je pouvais partir demain",
									"direction Lisbonne"
								]
							].map(([k, label, ph]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft[k],
									onChange: (e) => patch({ [k]: e.target.value }),
									placeholder: ph,
									className: "mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
								})]
							}, k))
						]
					}) : null,
					step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						title: "Genre & orientation",
						sub: "Tu choisis ce que le monde voit.",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-2",
								children: [
									[
										"femme",
										"Femme",
										"♀"
									],
									[
										"homme",
										"Homme",
										"♂"
									],
									[
										"autre",
										"Autre",
										"⚧"
									]
								].map(([id, label, mark]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => patch({ gender: id }),
									className: cn("h-11 flex-1 rounded-md text-sm", draft.gender === id ? "world-gold" : "bg-surface"),
									children: [
										mark,
										" ",
										label
									]
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: draft.orientation,
								onChange: (e) => patch({ orientation: e.target.value }),
								className: "mt-3 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Orientation"
								}), ORIENTATIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => patch({ showAge: !draft.showAge }),
								className: "mt-4 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm",
								children: ["Âge visible", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("h-6 w-10 rounded-full p-0.5", draft.showAge ? "world-gold" : "bg-surface-2"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-5 rounded-full bg-bg transition-transform", draft.showAge && "translate-x-4") })
								})]
							})
						]
					}) : null,
					step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						title: "Où tu es",
						sub: "Pays, ville, langues.",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: draft.country,
								onChange: (e) => patch({ country: e.target.value }),
								className: "mt-4 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Pays"
								}), COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: c.id,
									children: [
										c.flag,
										" ",
										c.id
									]
								}, c.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft.city,
								onChange: (e) => patch({ city: e.target.value }),
								placeholder: "Ville",
								className: "mt-2 h-11 w-full rounded-md bg-surface px-3 text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: LANGS.map((l) => {
									const on = draft.languages.includes(l);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => patch({ languages: on ? draft.languages.filter((x) => x !== l) : [...draft.languages, l] }),
										className: cn("h-8 rounded-full px-3 text-xs", on ? "world-gold" : "bg-surface-2"),
										children: l
									}, l);
								})
							})
						]
					}) : null,
					step === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						title: "Tes intentions",
						sub: "Au moins une.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: INTENTS.map((it) => {
								const on = draft.intentions.includes(it.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => patch({ intentions: on ? draft.intentions.filter((x) => x !== it.id) : [...draft.intentions, it.id] }),
									className: cn("flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm", on ? "world-gold" : "bg-surface"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.mark }), it.label]
								}, it.id);
							})
						})
					}) : null,
					step === 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						title: "C’est toi",
						sub: "Vérifie ta World Card.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 overflow-hidden rounded-2xl bg-surface",
							children: [draft.photos[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: draft.photos[0],
								alt: "",
								className: "h-44 w-full object-cover"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-xl tracking-tight",
										children: [
											"@",
											draft.username,
											draft.showAge ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted",
												children: [" · ", draft.age]
											}) : null
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											flagOf(draft.country),
											" ",
											draft.city,
											", ",
											draft.country
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-accent",
										children: draft.intentions.map(intentLabel).join(" · ")
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 text-sm text-accent",
							onClick: () => setStep(1),
							children: "Modifier"
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: step < 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "world-gold",
					disabled: !ready,
					onClick: () => setStep(step + 1),
					children: "Continuer"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "world-gold",
					onClick: onDone,
					children: "Entrer dans World Room"
				})
			}),
			picking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoPicker, {
				chosen: draft.photos,
				onClose: () => setPicking(false),
				onAddMany: (srcs) => patch({ photos: addPhotos(draft.photos, srcs) })
			}) : null
		]
	});
}
function Step({ title, sub, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-display text-2xl tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: sub
		}),
		children
	] });
}
function addPhotos(all, srcs) {
	const next = [...all];
	for (const src of srcs) {
		if (next.length >= 6) break;
		if (!next.includes(src)) next.push(src);
	}
	return next;
}
async function fileToPhoto(file) {
	try {
		const bitmap = await createImageBitmap(file);
		const scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
		const w = Math.max(1, Math.round(bitmap.width * scale));
		const h = Math.max(1, Math.round(bitmap.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("canvas");
		ctx.drawImage(bitmap, 0, 0, w, h);
		bitmap.close();
		return canvas.toDataURL("image/jpeg", .72);
	} catch {
		return await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result));
			reader.onerror = () => reject(reader.error);
			reader.readAsDataURL(file);
		});
	}
}
function PhotoSlot({ src, big, main, onPick, onDrop }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden rounded-lg bg-surface", big ? "aspect-[3/4]" : "aspect-square"),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "size-full object-cover"
			}),
			main ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-2 top-2 rounded-full bg-bg/80 px-2 py-0.5 text-[10px]",
				children: "Photo principale"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onDrop,
				className: "absolute right-1 top-1 grid size-8 place-items-center rounded-full bg-bg/80",
				"aria-label": "Retirer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onPick,
			className: "flex size-full flex-col items-center justify-center gap-1 text-accent",
			"aria-label": "Ajouter une photo",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" }), big ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px]",
				children: "Ajouter"
			}) : null]
		})
	});
}
function PhotoPicker({ chosen, onAddMany, onClose }) {
	const { toast } = useNav();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const remain = 6 - chosen.length;
	const ingest = async (files) => {
		if (!files?.length || remain <= 0) return;
		setBusy(true);
		try {
			const picked = [...files].filter((f) => f.type.startsWith("image/")).slice(0, remain);
			const srcs = [];
			for (const file of picked) srcs.push(await fileToPhoto(file));
			if (srcs.length) onAddMany(srcs);
			onClose();
		} catch {
			toast("Impossible de lire cette photo.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-2 pt-[env(safe-area-inset-top)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: onClose,
						"aria-label": "Fermer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1 font-display text-lg tracking-tight",
						children: "Ajouter des photos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "pr-3 text-xs text-muted",
						children: [chosen.length, "/6"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 text-sm text-muted",
				children: "Depuis ton téléphone, ou dans la galerie."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl bg-surface text-sm ring-1 ring-fg/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-5 text-accent" }),
						"Pellicule",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							multiple: true,
							className: "sr-only",
							disabled: busy || remain <= 0,
							onChange: (e) => {
								ingest(e.target.files);
								e.target.value = "";
							}
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl bg-surface text-sm ring-1 ring-fg/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5 text-accent" }),
						"Appareil photo",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							capture: "environment",
							className: "sr-only",
							disabled: busy || remain <= 0,
							onChange: (e) => {
								ingest(e.target.files);
								e.target.value = "";
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 px-5 text-xs uppercase tracking-wider text-muted",
				children: "Galerie World Room"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-2 min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-sm text-muted",
					children: "Import en cours…"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-1.5",
					children: PHOTO_POOL.map((p) => {
						const on = chosen.includes(p);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: busy || !on && remain <= 0,
							onClick: () => {
								if (on) return;
								onAddMany([p]);
								if (remain <= 1) onClose();
							},
							className: "relative aspect-square overflow-hidden rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p,
								alt: "",
								className: "size-full object-cover"
							}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 grid place-items-center bg-bg/55 text-xs",
								children: "Déjà choisie"
							}) : null]
						}, p);
					})
				})]
			})
		]
	});
}
function WorldApp({ onBack, onEdit }) {
	const { toast } = useNav();
	const profile = useWorld((s) => s.profile);
	const hellos = useWorld((s) => s.hellos);
	const filters = useWorld((s) => s.filters);
	const setFilters = useWorld((s) => s.setFilters);
	const sendHello = useWorld((s) => s.sendHello);
	const answerHello = useWorld((s) => s.answerHello);
	const ignoreHello = useWorld((s) => s.ignoreHello);
	const cancelHello = useWorld((s) => s.cancelHello);
	const connect = useWorld((s) => s.connect);
	const skipMeet = useWorld((s) => s.skipMeet);
	const seedMutual = useWorld((s) => s.seedMutual);
	const resetDemo = useWorld((s) => s.resetDemo);
	const threads = useWorld((s) => s.threads);
	const unread = useWorld((s) => s.unread);
	const meets = useWorld((s) => s.meets);
	const sendWorldMsg = useWorld((s) => s.sendWorldMsg);
	const markRead = useWorld((s) => s.markRead);
	const leaveWorld = useWorld((s) => s.leaveWorld);
	const patchProfile = useWorld((s) => s.patchProfile);
	const [tab, setTab] = (0, import_react.useState)("discover");
	const [i, setI] = (0, import_react.useState)(0);
	const [details, setDetails] = (0, import_react.useState)(false);
	const [full, setFull] = (0, import_react.useState)(false);
	const [filterOpen, setFilterOpen] = (0, import_react.useState)(false);
	const [helloSide, setHelloSide] = (0, import_react.useState)("in");
	const [over, setOver] = (0, import_react.useState)({ t: "none" });
	const [draftF, setDraftF] = (0, import_react.useState)(filters);
	(0, import_react.useEffect)(() => {
		const s = useWorld.getState();
		if (s.hellos.mutual.length === 0 && s.meets.length === 0) s.seedMutual(["w-sofia"]);
	}, [seedMutual]);
	const cards = (0, import_react.useMemo)(() => {
		return WORLD_CARDS.filter((c) => {
			if (hellos.ignored.includes(c.id) || hellos.connections.includes(c.id)) return false;
			if (filters.see === "hommes" && c.gender !== "homme") return false;
			if (filters.see === "femmes" && c.gender !== "femme") return false;
			if (filters.see === "lgbt" && c.gender !== "autre") return false;
			if (filters.age === "18-24" && (c.age < 18 || c.age > 24)) return false;
			if (filters.age === "25-35" && (c.age < 25 || c.age > 35)) return false;
			if (filters.age === "36-45" && (c.age < 36 || c.age > 45)) return false;
			if (filters.age === "46+" && c.age < 46) return false;
			if (filters.zone === "afrique" && c.zone !== "afrique") return false;
			if (filters.zone === "europe" && c.zone !== "europe") return false;
			if (filters.zone === "asie" && c.zone !== "asie") return false;
			if (filters.zone === "pays" && c.country !== profile.country) return false;
			if (filters.lang === "FR" && !c.languages.some((l) => l.startsWith("Français"))) return false;
			if (filters.lang === "EN" && !c.languages.includes("English")) return false;
			if (filters.intent !== "all" && c.intent !== filters.intent) return false;
			return true;
		});
	}, [
		filters,
		hellos.ignored,
		hellos.connections,
		profile.country
	]);
	const card = cards.length ? cards[i % cards.length] : void 0;
	const next = () => {
		buzz();
		setDetails(false);
		setFull(false);
		setI((n) => n + 1);
	};
	const helloTo = (c) => {
		buzz();
		if (hellos.mutual.includes(c.id)) {
			setOver({
				t: "celebrate",
				card: c
			});
			return;
		}
		if (hellos.pending.includes(c.id)) {
			answerHello(c.id);
			setOver({
				t: "celebrate",
				card: c
			});
			return;
		}
		if (hellos.sent.includes(c.id)) {
			toast(`Hello déjà envoyé à ${c.name}`);
			return;
		}
		sendHello(c.id);
		toast(`👋 Hello envoyé à ${c.name}`);
	};
	const askConnect = (c) => {
		buzz();
		toast(`✨ Demande de connexion envoyée à ${c.name}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full overflow-hidden bg-bg",
		children: [
			over.t === "none" && tab === "discover" && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discover, {
				card,
				details,
				setDetails,
				onFilter: () => {
					setDraftF(filters);
					setFilterOpen(true);
				},
				onFull: () => setFull(true),
				onPass: next,
				onHello: () => helloTo(card),
				onConnect: () => askConnect(card),
				onBack
			}, card.id) : null,
			over.t === "none" && tab === "discover" && !card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col items-center justify-center px-8 pb-24 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-8 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-2xl tracking-tight",
						children: "Plus personne ici"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Élargis tes filtres — le monde est grand."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "world-gold mt-6",
						onClick: () => {
							setDraftF(filters);
							setFilterOpen(true);
						},
						children: "Filtres"
					})
				]
			}) : null,
			over.t === "none" && tab === "hellos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hellos, {
				side: helloSide,
				setSide: setHelloSide,
				hellos,
				onView: (id) => {
					if (cardById(id)) {
						const idx = cards.findIndex((x) => x.id === id);
						if (idx >= 0) setI(idx);
						setTab("discover");
						setFull(true);
					}
				},
				onAnswer: (id) => {
					const c = cardById(id);
					if (!c) return;
					answerHello(id);
					setOver({
						t: "celebrate",
						card: c
					});
				},
				onIgnore: ignoreHello,
				onCancel: cancelHello,
				onReset: resetDemo
			}) : null,
			over.t === "none" && tab === "face" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacePage, {
				pending: hellos.mutual,
				history: meets,
				onStart: (c) => {
					buzz();
					setOver({
						t: "meet",
						card: c
					});
				},
				onLaunch: (mode) => {
					buzz();
					setOver({
						t: "meet",
						mode
					});
				},
				onDiscover: () => setTab("discover")
			}) : null,
			over.t === "none" && tab === "inbox" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox$1, {
				ids: hellos.connections,
				threads,
				unread,
				pending: hellos.pending.length,
				onOpen: (id) => {
					markRead(id);
					setOver({
						t: "thread",
						id
					});
				},
				onHellos: () => setTab("hellos")
			}) : null,
			over.t === "none" && tab === "me" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MePage, {
				profile,
				n: hellos.connections.length,
				ids: hellos.connections,
				onPatch: patchProfile,
				onEdit,
				onLeave: () => {
					leaveWorld();
					onBack();
				}
			}) : null,
			over.t === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "world-dock absolute inset-x-4 z-30 flex h-14 items-center justify-around px-2",
				style: { bottom: "calc(0.6rem + env(safe-area-inset-bottom))" },
				children: [
					[
						"discover",
						"Découvrir",
						Globe
					],
					[
						"hellos",
						"Hellos",
						Heart
					],
					[
						"face",
						"Face à Face",
						Video
					],
					[
						"inbox",
						"Messages",
						MessageCircle
					],
					[
						"me",
						"Profil",
						Users
					]
				].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						buzz();
						setTab(id);
						setFull(false);
						setDetails(false);
					},
					className: cn("flex min-w-0 flex-1 flex-col items-center gap-0.5 text-[9px] leading-tight", tab === id ? "text-accent" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
							id === "hellos" && hellos.pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full world-gold text-[8px]",
								children: hellos.pending.length
							}) : null,
							id === "face" && hellos.mutual.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full world-gold text-[8px]",
								children: hellos.mutual.length
							}) : null
						]
					}), label]
				}, id))
			}) : null,
			filterOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				onClose: () => setFilterOpen(false),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "Filtres"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Je veux voir"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						chips: [
							["tous", "Tous"],
							["hommes", "Hommes"],
							["femmes", "Femmes"],
							["lgbt", "LGBT+"]
						],
						value: draftF.see,
						on: (v) => setDraftF({
							...draftF,
							see: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Âge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						chips: [
							["all", "Tous"],
							["18-24", "18-24"],
							["25-35", "25-35"],
							["36-45", "36-45"],
							["46+", "46+"]
						],
						value: draftF.age,
						on: (v) => setDraftF({
							...draftF,
							age: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Zone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						chips: [
							["monde", "Monde"],
							["pays", "Mon pays"],
							["afrique", "Afrique"],
							["europe", "Europe"],
							["asie", "Asie"]
						],
						value: draftF.zone,
						on: (v) => setDraftF({
							...draftF,
							zone: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Langue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						chips: [
							["all", "Toutes"],
							["FR", "FR"],
							["EN", "EN"]
						],
						value: draftF.lang,
						on: (v) => setDraftF({
							...draftF,
							lang: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Intention"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						chips: [["all", "Peu importe"], ...INTENTS.filter((x) => x.id !== "peu-importe" && x.id !== "legere").map((x) => [x.id, x.label])],
						value: draftF.intent,
						on: (v) => setDraftF({
							...draftF,
							intent: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "world-gold mt-5",
						onClick: () => {
							setFilters(draftF);
							setFilterOpen(false);
							setI(0);
						},
						children: "Voir les profils"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 w-full py-2 text-center text-xs text-muted",
						onClick: () => {
							setFilterOpen(false);
							onEdit(1);
						},
						children: "Recommencer l’onboarding"
					})
				]
			}) : null,
			full && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullCard, {
				card,
				onClose: () => setFull(false),
				onPass: next,
				onHello: () => helloTo(card),
				onConnect: () => askConnect(card)
			}) : null,
			over.t === "celebrate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Celebrate, {
				card: over.card,
				mePhoto: profile.photos[0],
				onLater: () => {
					setOver({ t: "none" });
					setTab("face");
					toast("Face à Face en attente");
				},
				onMeet: () => setOver({
					t: "meet",
					card: over.card
				})
			}) : null,
			over.t === "meet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaceDuel, {
				preferred: over.card,
				me: profile,
				blocked: [...hellos.connections, ...hellos.ignored],
				initialMode: over.mode,
				onQuit: () => setOver({ t: "none" }),
				onWin: (c) => {
					connect(c.id);
					setOver({
						t: "linked",
						card: c
					});
				},
				onLose: (c) => {
					skipMeet(c.id);
					setOver({
						t: "done",
						card: c
					});
				}
			}) : null,
			over.t === "decide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Decide, {
				card: over.card,
				onNext: () => {
					skipMeet(over.card.id);
					setOver({
						t: "done",
						card: over.card
					});
				},
				onYes: () => setOver({
					t: "wait",
					card: over.card
				})
			}) : null,
			over.t === "wait" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wait, {
				card: over.card,
				onOk: () => {
					connect(over.card.id);
					setOver({
						t: "linked",
						card: over.card
					});
				},
				onNo: () => {
					skipMeet(over.card.id);
					setOver({
						t: "done",
						card: over.card
					});
				}
			}) : null,
			over.t === "linked" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linked, {
				card: over.card,
				mePhoto: profile.photos[0],
				onChat: () => {
					markRead(over.card.id);
					setOver({
						t: "thread",
						id: over.card.id
					});
					setTab("inbox");
				},
				onMore: () => {
					setOver({ t: "none" });
					setTab("face");
				}
			}) : null,
			over.t === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ended, { onMore: () => {
				setOver({ t: "none" });
				setTab("face");
			} }) : null,
			over.t === "thread" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, {
				id: over.id,
				lines: threads[over.id] ?? [],
				onBack: () => setOver({ t: "none" }),
				onSend: (t) => sendWorldMsg(over.id, t)
			}) : null
		]
	});
}
function Discover({ card, details, setDetails, onFilter, onFull, onPass, onHello, onConnect, onBack }) {
	const start = (0, import_react.useRef)(0);
	const [photo, setPhoto] = (0, import_react.useState)(0);
	const src = card.photos[photo % card.photos.length] ?? card.photos[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "world-in absolute inset-0",
		onPointerDown: (e) => {
			start.current = e.clientY;
		},
		onPointerUp: (e) => {
			const d = start.current - e.clientY;
			if (d > 80) onPass();
			else if (d > 28) setDetails(true);
		},
		onWheel: (e) => {
			if (e.deltaY > 40) onPass();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "absolute inset-0 size-full object-cover",
				onClick: () => setPhoto((n) => (n + 1) % card.photos.length)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/85 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-bg via-bg/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "absolute inset-x-0 top-0 z-10 flex items-start justify-between px-3 pt-[calc(0.4rem+env(safe-area-inset-top))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onFilter,
						className: "flex size-11 items-center justify-center rounded-full bg-bg/40",
						"aria-label": "Filtres",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onBack,
						className: "flex size-11 items-center justify-center rounded-full bg-bg/40",
						"aria-label": "Quitter",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onFull,
					className: "relative mt-0.5",
					"aria-label": "Voir le profil",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: card.photos[0],
						alt: "",
						className: "size-11 rounded-full object-cover ring-2 ring-accent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute -bottom-1 left-1/2 flex -translate-x-1/2 whitespace-nowrap items-center gap-0.5 rounded-full bg-bg/80 px-1.5 py-px text-[8px] leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-2" }), " Voir"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-3 top-1/3 z-10 flex flex-col gap-2",
				children: card.photos.map((_, p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Photo ${p + 1}`,
					onClick: () => setPhoto(p),
					className: cn("w-1 rounded-full", p === photo % card.photos.length ? "h-6 world-gold" : "h-1.5 bg-fg/30")
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-4 z-10",
				style: { bottom: "calc(7.35rem + env(safe-area-inset-bottom))" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl tracking-tight",
						children: [
							card.name,
							card.age ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-fg/80",
								children: [", ", card.age]
							}) : null,
							card.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "ml-1 inline size-4 text-open" }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-1 inline size-3.5" }),
							card.flag,
							" ",
							card.city,
							", ",
							card.country
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto flex items-center gap-1 text-[10px] text-accent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "size-3" }),
								card.distanceKm,
								" km"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex flex-wrap gap-1.5 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-bg/50 px-2 py-0.5",
							children: [
								intentMark(card.intent),
								" ",
								intentLabel(card.intent)
							]
						}), card.online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-bg/50 px-2 py-0.5 text-open",
							children: "En ligne"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDetails(true),
						className: "mt-1.5 text-xs text-accent",
						children: "Voir plus ▾"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 z-20 flex items-center justify-center gap-2 px-5",
				style: { bottom: "calc(4.45rem + env(safe-area-inset-bottom))" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onPass,
						className: "flex h-10 items-center justify-center gap-1 rounded-full bg-bg/60 px-3.5 text-[11px] text-accent ring-1 ring-fg/15",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" }), " Passer"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onHello,
						className: "world-gold flex size-12 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgb(212_196_168_/_0.3)]",
						"aria-label": "Dire Hello",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onConnect,
						className: "world-connect flex h-10 items-center justify-center gap-1 rounded-full px-3.5 text-[11px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xs",
								children: "Z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5" }),
							" Connecter"
						]
					})
				]
			}),
			details ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute inset-0 z-30 bg-bg/40",
				onClick: () => setDetails(false),
				"aria-label": "Fermer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 max-h-[64%] overflow-y-auto rounded-t-3xl bg-bg/80 p-4 text-left backdrop-blur-md",
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, { card })
				})
			}) : null
		]
	});
}
function CardBody({ card }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-lg italic text-accent",
			children: [
				"“",
				card.quote,
				"”"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children: card.interests.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-fg/10 px-2 py-0.5 text-[11px]",
				children: t
			}, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-2",
			children: [
				["Mon dimanche parfait ?", card.sunday],
				["Mon plus gros red flag ?", card.redFlag],
				["Si je pouvais partir demain ?", card.travel]
			].map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-bg/55 p-3 ring-1 ring-fg/12 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: a
				})]
			}, q))
		})
	] });
}
function FullCard({ card, onClose, onPass, onHello, onConnect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-40 overflow-y-auto bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: onClose,
					"aria-label": "Fermer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex-1 text-sm",
					children: card.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex snap-x gap-2 overflow-x-auto px-4",
				children: card.photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p,
					alt: "",
					className: "h-[300px] w-[68%] shrink-0 snap-center rounded-2xl object-cover"
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-4 pb-36",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl",
						children: [
							card.name,
							", ",
							card.age,
							" ",
							card.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "inline size-4 text-open" }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							card.flag,
							" ",
							card.city,
							", ",
							card.country
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-accent",
						children: [
							intentMark(card.intent),
							" ",
							intentLabel(card.intent)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, { card })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-4 flex gap-2",
				style: { bottom: "calc(5.2rem + env(safe-area-inset-bottom))" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "line",
						className: "flex-1",
						onClick: onPass,
						children: "Passer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "world-gold flex-1",
						onClick: onHello,
						children: "Hello"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "flex-1",
						onClick: onConnect,
						children: "Connecter"
					})
				]
			})
		]
	});
}
function Hellos({ side, setSide, hellos, onView, onAnswer, onIgnore, onCancel, onReset }) {
	const list = side === "in" ? hellos.pending : hellos.sent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pt-3 font-display text-2xl",
				children: "Hellos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-5 mt-3 flex rounded-full bg-surface p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSide("in"),
					className: cn("h-9 flex-1 rounded-full text-xs", side === "in" && "world-gold"),
					children: ["Reçus ", hellos.pending.length ? `(${hellos.pending.length})` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSide("out"),
					className: cn("h-9 flex-1 rounded-full text-xs", side === "out" && "world-gold"),
					children: ["Envoyés ", hellos.sent.length ? `(${hellos.sent.length})` : ""]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-28",
				children: [
					list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-center text-sm text-muted",
						children: "Rien pour l’instant."
					}) : null,
					side === "in" ? list.map((id) => {
						const c = cardById(id);
						if (!c) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 rounded-3xl bg-fg/5 p-3 ring-1 ring-accent/25",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.photos[0],
									alt: "",
									className: "size-14 rounded-full object-cover ring-2 ring-accent/80"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [
											"👋 ",
											c.name,
											" t’a envoyé un Hello depuis ",
											c.country
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-[11px] text-muted",
										children: [
											c.flag,
											" ",
											c.city,
											" · ",
											c.age,
											" · il y a 12 min"
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onView(id),
										className: "h-9 flex-1 rounded-full text-xs ring-1 ring-accent/35",
										children: "Voir"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onAnswer(id),
										className: "world-gold h-9 flex-1 rounded-full text-xs",
										children: "Répondre"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onIgnore(id),
										className: "h-9 flex-1 rounded-full text-xs ring-1 ring-fg/15",
										children: "Ignorer"
									})
								]
							})]
						}, id);
					}) : list.map((id) => {
						const c = cardById(id);
						if (!c) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-3 rounded-2xl bg-surface p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.photos[0],
									alt: "",
									className: "size-12 rounded-full object-cover ring-1 ring-accent/45"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [
											c.name,
											" ",
											c.flag
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1 text-[11px] text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), " En attente de sa réponse…"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onCancel(id),
									className: "h-8 rounded-full px-3 text-xs ring-1 ring-fg/12",
									children: "Annuler"
								})
							]
						}, id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-[11px] text-muted",
						children: "Hello mutuel → Face à Face → connexion."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onReset,
						className: "mx-auto mt-2 block text-[11px] text-accent",
						children: "Recommencer la démo"
					})
				]
			})
		]
	});
}
function whenMeet(at) {
	return new Date(at).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short"
	});
}
function FacePage({ pending, history, onStart, onLaunch, onDiscover }) {
	const hist = [...history].sort((a, b) => b.at - a.at);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col pt-[env(safe-area-inset-top)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Face à Face"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Choisis audio ou vidéo, puis on cherche quelqu’un de connecté."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onLaunch("video"),
						className: "flex h-[5rem] flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface px-2 text-sm ring-1 ring-fg/12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Face à Face" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted",
								children: "vidéo"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onLaunch("audio"),
						className: "flex h-[5rem] flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface px-2 text-sm ring-1 ring-fg/12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Face à Face" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted",
								children: "audio"
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-scrollbar mt-4 min-h-0 flex-1 overflow-y-auto px-4 pb-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] uppercase tracking-wider text-muted",
					children: ["En attente", pending.length ? ` (${pending.length})` : ""]
				}),
				pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-3xl bg-fg/5 p-5 text-center ring-1 ring-accent/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mx-auto size-6 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: "Aucun Face à Face en attente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Un Hello mutuel, ou lance une recherche selon tes critères."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onDiscover,
							className: "mt-4 h-9 rounded-full px-4 text-xs ring-1 ring-accent/35",
							children: "Découvrir"
						})
					]
				}) : pending.map((id) => {
					const c = cardById(id);
					if (!c) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 mt-3 rounded-3xl bg-fg/5 p-3 ring-1 ring-accent/25",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.photos[0],
									alt: "",
									className: "size-14 rounded-full object-cover ring-2 ring-accent/80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [c.name, c.age ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [", ", c.age]
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-[11px] text-muted",
										children: [
											c.flag,
											" ",
											c.city
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onStart(c),
									className: "world-gold h-9 shrink-0 rounded-full px-3.5 text-xs",
									children: "Commencer"
								})
							]
						})
					}, id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-[11px] uppercase tracking-wider text-muted",
					children: "Historique"
				}),
				hist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm text-muted",
					children: "Tes rencontres apparaîtront ici."
				}) : null,
				hist.map((m) => {
					const c = cardById(m.id);
					if (!c) return null;
					const ok = m.result === "connected";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 mt-2 flex items-center gap-3 rounded-2xl bg-surface p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.photos[0],
							alt: "",
							className: "size-12 rounded-full object-cover ring-1 ring-accent/45"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									c.name,
									" ",
									c.flag
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("mt-0.5 flex items-center gap-1 text-[11px]", ok ? "text-open" : "text-muted"),
								children: [
									ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
									ok ? "Connecté" : "Terminé",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [" · ", whenMeet(m.at)]
									})
								]
							})]
						})]
					}, `${m.id}-${m.at}`);
				})
			]
		})]
	});
}
function Inbox$1({ ids, threads, unread, pending, onOpen, onHellos }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col pt-[env(safe-area-inset-top)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 pt-3 font-display text-2xl",
			children: "Messages"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-28",
			children: [
				ids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center text-sm text-muted",
					children: "Tes connexions mutuelles apparaîtront ici."
				}) : null,
				pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onHellos,
					className: "mb-3 w-full rounded-full py-2 text-xs ring-1 ring-accent/35",
					children: [pending, " Hello(s) en attente"]
				}) : null,
				ids.map((id) => {
					const c = cardById(id);
					if (!c) return null;
					const last = threads[id]?.at(-1);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onOpen(id),
						className: "mb-1 flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.photos[0],
								alt: "",
								className: "size-12 rounded-full object-cover ring-2 ring-accent/70"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm",
									children: [
										c.name,
										" ",
										c.flag
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: last?.text ?? "Nouvelle connexion"
								})]
							}),
							unread[id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "world-gold grid size-5 place-items-center rounded-full text-[10px]",
								children: unread[id]
							}) : null
						]
					}, id);
				})
			]
		})]
	});
}
function MePage({ profile, n, ids, onPatch, onEdit, onLeave }) {
	const intent = profile.intentions[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar h-full overflow-y-auto pt-[env(safe-area-inset-top)] pb-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" }),
				profile.photos[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: profile.photos[0],
					alt: "",
					className: "mt-4 h-52 w-full rounded-2xl object-cover"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-2xl",
					children: [
						"@",
						profile.username,
						profile.showAge ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", profile.age]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						flagOf(profile.country),
						" ",
						profile.city,
						", ",
						profile.country
					]
				}),
				intent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-accent",
					children: [
						intentMark(intent),
						" ",
						intentLabel(intent)
					]
				}) : null,
				profile.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: profile.bio
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: profile.languages.join(" · ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: [
						profile.answerSunday,
						profile.answerRedFlag,
						profile.answerEscape
					].map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-surface p-3 text-sm",
						children: a
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "world-gold mt-5",
					onClick: () => onEdit(1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Éditer mon profil World"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs uppercase tracking-wider text-muted",
					children: "Mes photos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-3 gap-1.5",
					children: profile.photos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p,
							alt: "",
							className: "aspect-square w-full rounded-md object-cover"
						}), i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-1 top-1 rounded-full bg-bg/80 px-1.5 text-[9px]",
							children: "Principale"
						}) : null]
					}, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs uppercase tracking-wider text-muted",
					children: "Mes connexions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex -space-x-2",
						children: ids.slice(0, 5).map((id) => {
							const c = cardById(id);
							return c ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.photos[0],
								alt: "",
								className: "size-8 rounded-full object-cover ring-2 ring-bg"
							}, id) : null;
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [n, " connexion(s) World"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs uppercase tracking-wider text-muted",
					children: "Réglages"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPatch({ helloFrom: profile.helloFrom === "all" ? "criteria" : "all" }),
					className: "mt-2 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm",
					children: ["Qui peut m’envoyer un Hello", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: profile.helloFrom === "all" ? "Tout le monde" : "Selon mes critères"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPatch({ visible: !profile.visible }),
					className: "mt-2 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm",
					children: ["Visibilité", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: profile.visible ? "Visible" : "En pause"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onEdit(5),
					className: "mt-2 flex w-full items-center justify-between rounded-md bg-surface px-3 py-3 text-sm",
					children: ["Langues", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-accent",
						children: profile.languages.slice(0, 2).join(", ") || "Ajouter"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onLeave,
					className: "mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm text-heart",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Quitter World Room"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 pb-4 text-center text-[11px] text-muted",
					children: "Ton profil World Room est lié à ton compte Zembo."
				})
			]
		})
	});
}
function Celebrate({ card, mePhoto, onLater, onMeet }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/posters/sunrise.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/70" }),
			Array.from({ length: 14 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "world-confetti absolute top-8 size-2 rounded-full bg-accent",
				style: {
					left: `${8 + i * 6}%`,
					animationDelay: `${i * 40}ms`,
					["--dx"]: `${-40 + i * 8}px`,
					["--dy"]: `${120 + i % 5 * 20}px`
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex h-full flex-col items-center px-6 pt-[calc(2rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display italic text-accent",
						children: "Vous vous êtes dit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "world-gold-text mt-2 font-display text-5xl tracking-tight",
						children: "HELLO !"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-sm text-muted",
						children: "Une belle connexion commence peut-être ici…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-3",
						children: [
							mePhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: mePhoto,
								alt: "",
								className: "size-20 rounded-full object-cover ring-2 ring-accent"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-20 place-items-center rounded-full bg-surface",
								children: "Toi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-7 fill-heart text-heart" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: card.photos[0],
								alt: "",
								className: "size-20 rounded-full object-cover ring-2 ring-accent"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 space-y-2 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-accent" }), " Découvrez une nouvelle personne"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4 text-accent" }), " Un Face à Face, 20 questions"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-accent" }), " Et laissez la conversation suivre son cours…"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "world-gold mt-auto",
						onClick: onMeet,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), " Lancer le Face à Face"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onLater,
						className: "mt-2 h-11 text-sm text-muted",
						children: "Plus tard"
					})
				]
			})
		]
	});
}
function Decide({ card, onYes, onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col items-center bg-bg px-6 pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: card.photos[0],
				alt: "",
				className: "size-24 rounded-full object-cover ring-2 ring-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-2xl",
				children: "Envie de continuer ?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: "Vous répondez chacun de votre côté. La conversation ne s’ouvre que si vous choisissez tous les deux Connecter."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				className: "world-gold mt-auto",
				onClick: onYes,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }), " Connecter"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onNext,
				className: "mt-3 h-12 w-full rounded-full text-sm ring-1 ring-fg/18",
				children: "Merci, au suivant"
			})
		]
	});
}
function Wait({ card, onOk, onNo }) {
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => {
			if (Math.random() < .75) onOk();
			else onNo();
		}, 1600);
		return () => window.clearTimeout(t);
	}, [onOk, onNo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-50 grid place-items-center bg-bg px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "anim-live text-4xl",
			children: "⏳"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"En attente de la réponse de ",
				card.name,
				"…"
			]
		})] })
	});
}
function Linked({ card, mePhoto, onChat, onMore }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col items-center bg-bg px-6 pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					mePhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mePhoto,
						alt: "",
						className: "size-16 rounded-full object-cover ring-2 ring-accent"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-6 fill-heart text-heart" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: card.photos[0],
						alt: "",
						className: "size-16 rounded-full object-cover ring-2 ring-accent"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "world-gold-text mt-6 text-center font-display text-2xl tracking-tight",
				children: "Connexion mutuelle"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: [card.name, " est maintenant dans tes connexions World Room."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "world-gold mt-auto",
				onClick: onChat,
				children: "Ouvrir la conversation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onMore,
				className: "mt-3 h-11 text-sm text-muted",
				children: "Retour aux Face à Face"
			})
		]
	});
}
function Ended({ onMore }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col items-center bg-bg px-6 pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-20 place-items-center rounded-full bg-surface text-3xl",
				children: "🌍"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-xl",
				children: "La rencontre est terminée."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: "Le monde est grand : une autre belle connexion t’attend peut-être."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "world-gold mt-auto",
				onClick: onMore,
				children: "Retour aux Face à Face"
			})
		]
	});
}
function Thread({ id, lines, onBack, onSend }) {
	const c = cardById(id);
	const [text, setText] = (0, import_react.useState)("");
	if (!c) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: onBack,
						"aria-label": "Retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.photos[0],
						alt: "",
						className: "size-9 rounded-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted",
						children: [
							c.flag,
							" ",
							c.city,
							" · Connexion mutuelle"
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-4 rounded-lg bg-surface p-2 text-[11px] leading-relaxed text-muted",
				children: "Vous vous êtes dit Hello, vous vous êtes rencontrés 60 secondes et vous avez choisi de vous connecter. À vous de jouer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar mt-2 min-h-0 flex-1 overflow-y-auto px-4",
				children: lines.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mb-2 max-w-[80%] rounded-2xl px-3 py-2 text-sm", m.from === "me" ? "ml-auto world-gold" : "bg-surface"),
					children: m.text
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-center gap-2 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))]",
				onSubmit: (e) => {
					e.preventDefault();
					const v = text.trim();
					if (!v) return;
					onSend(v);
					setText("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Écrire…",
					className: "h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "world-gold grid size-11 place-items-center rounded-full",
					"aria-label": "Envoyer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	});
}
function Sheet({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/50",
			onClick: onClose,
			"aria-label": "Fermer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 bottom-0 max-h-[80%] overflow-y-auto rounded-t-3xl bg-bg p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
			children
		})]
	});
}
function Row({ chips, value, on }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1.5 flex flex-wrap gap-1.5",
		children: chips.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => on(id),
			className: cn("h-8 rounded-full px-3 text-xs", value === id ? "world-gold" : "bg-surface-2"),
			children: label
		}, id))
	});
}
var VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;
var FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float n1 = noise(uv * 42.0);
  float n2 = noise(uv * 110.0 + 7.3);
  float n3 = noise(uv * 9.0 + u_time * 0.04);
  vec3 N = normalize(vec3((n1 - 0.5) * 0.55, 0.82, (n2 - 0.5) * 0.55));

  float t = u_time * 0.18;
  vec3 L = normalize(vec3(0.28 + sin(t) * 0.42, 0.78, 0.48 + cos(t * 0.65) * 0.22));
  float wrap = clamp(dot(N, L) * 0.55 + 0.5, 0.0, 1.0);
  vec3 H = normalize(L + vec3(0.0, 0.35, 1.0));
  float spec = pow(max(dot(N, H), 0.0), 32.0) * 0.22;
  float nap = pow(abs(dot(normalize(vec2(0.15, 1.0)), uv - vec2(0.5, 0.38))), 1.35);

  vec3 lo = vec3(0.055, 0.145, 0.11);
  vec3 mid = vec3(0.12, 0.30, 0.225);
  vec3 hi = vec3(0.24, 0.50, 0.365);
  vec3 col = mix(lo, mid, wrap);
  col = mix(col, hi, wrap * wrap * 0.55);
  col += spec * vec3(0.92, 0.84, 0.58);
  col += nap * 0.07;
  col += (n1 * 0.07 + n2 * 0.045 - 0.04);
  col += (n3 - 0.5) * 0.03;

  float r = length((uv - vec2(0.5, 0.4)) * vec2(1.18, 1.0));
  col *= 1.0 - smoothstep(0.28, 0.95, r) * 0.5;
  col += vec3(0.22, 0.18, 0.1) * exp(-r * 5.0) * 0.16;

  gl_FragColor = vec4(col, 1.0);
}
`;
function compile(gl, type, src) {
	const sh = gl.createShader(type);
	if (!sh) return null;
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		gl.deleteShader(sh);
		return null;
	}
	return sh;
}
function FeltShader() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const gl = canvas.getContext("webgl", {
			alpha: false,
			antialias: false,
			preserveDrawingBuffer: false
		});
		if (!gl) return;
		const vs = compile(gl, gl.VERTEX_SHADER, VERT);
		const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
		if (!vs || !fs) return;
		const prog = gl.createProgram();
		if (!prog) return;
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.linkProgram(prog);
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
		gl.useProgram(prog);
		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), gl.STATIC_DRAW);
		const loc = gl.getAttribLocation(prog, "a_pos");
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
		const uRes = gl.getUniformLocation(prog, "u_res");
		const uTime = gl.getUniformLocation(prog, "u_time");
		let dead = false;
		let raf = 0;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const size = () => {
			const dpr = Math.min(1.5, window.devicePixelRatio || 1);
			const w = Math.max(2, Math.floor(canvas.clientWidth * dpr));
			const h = Math.max(2, Math.floor(canvas.clientHeight * dpr));
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
				gl.viewport(0, 0, w, h);
			}
		};
		const draw = (now) => {
			if (dead) return;
			size();
			gl.uniform2f(uRes, canvas.width, canvas.height);
			gl.uniform1f(uTime, reduced ? 0 : now * .001);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			if (!reduced && document.visibilityState === "visible") raf = requestAnimationFrame(draw);
		};
		const ro = new ResizeObserver(() => {
			size();
			if (reduced) draw(0);
		});
		ro.observe(canvas);
		size();
		raf = requestAnimationFrame(draw);
		const onVis = () => {
			if (document.visibilityState === "visible" && !reduced) {
				cancelAnimationFrame(raf);
				raf = requestAnimationFrame(draw);
			}
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			dead = true;
			cancelAnimationFrame(raf);
			ro.disconnect();
			document.removeEventListener("visibilitychange", onVis);
			gl.deleteBuffer(buf);
			gl.deleteProgram(prog);
			gl.deleteShader(vs);
			gl.deleteShader(fs);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "felt-shader",
		"aria-hidden": true
	});
}
var PIPS = {
	1: [4],
	2: [0, 8],
	3: [
		0,
		4,
		8
	],
	4: [
		0,
		2,
		6,
		8
	],
	5: [
		0,
		2,
		4,
		6,
		8
	],
	6: [
		0,
		2,
		3,
		5,
		6,
		8
	]
};
var QUESTIONS = [
	"Qu’est-ce que tu n’as dit à personne cette semaine ?",
	"Tu mentirais pour protéger quelqu’un ?",
	"Quel silence te pèse, vraiment ?",
	"La dernière fois que tu as eu peur.",
	"Qui t’a manqué, sans le dire.",
	"Un secret que tu gardes encore.",
	"Tu quitterais tout demain ?",
	"Ce que tu fuis, en ce moment.",
	"À qui tu dois encore un mot.",
	"Le mensonge le plus utile.",
	"Ce que tu n’oses pas vouloir.",
	"Si on t’écoutait pour de vrai."
];
var CUPS = [
	{
		x: 50,
		y: 3.8
	},
	{
		x: 6,
		y: 28
	},
	{
		x: 6,
		y: 72
	},
	{
		x: 50,
		y: 96.2
	},
	{
		x: 94,
		y: 72
	},
	{
		x: 94,
		y: 28
	}
];
var WAITING = [
	USERS["u-jules"],
	USERS["u-luca"],
	USERS["u-rina"]
];
var JOINERS = [
	"Dina",
	"Kadi",
	"Samir"
];
var SPECTATE = [
	"j’écoute",
	"force",
	"la question est dure",
	"je reste",
	"continue",
	"bravo"
];
var SPECTATE_QS = [{
	from: "Dina",
	to: "u-maya",
	text: "Tu partirais sans un mot ?"
}, {
	from: "Kadi",
	to: "u-theo",
	text: "Qui tu protèges encore ?"
}];
var SEAT_POS = [
	{
		x: 50,
		y: 107
	},
	{
		x: 6,
		y: 88
	},
	{
		x: -7,
		y: 50
	},
	{
		x: 6,
		y: 12
	},
	{
		x: 50,
		y: -4
	},
	{
		x: 94,
		y: 12
	},
	{
		x: 107,
		y: 50
	},
	{
		x: 94,
		y: 88
	}
];
var hostIndex = (n) => n === 8 ? 4 : n === 6 ? 3 : 2;
var seatLayout = (n) => {
	if (n === 8) return SEAT_POS;
	if (n === 4) return [
		SEAT_POS[0],
		SEAT_POS[2],
		SEAT_POS[4],
		SEAT_POS[6]
	];
	const rx = 57;
	const ry = 55.5;
	return Array.from({ length: 6 }, (_, i) => {
		const a = i * Math.PI / 3;
		return {
			x: +(50 - rx * Math.sin(a)).toFixed(1),
			y: +(50 + ry * Math.cos(a)).toFixed(1)
		};
	});
};
var WOODS = [
	{
		id: "noyer",
		label: "Noyer",
		line: "Grain droit, foncé"
	},
	{
		id: "chene",
		label: "Chêne",
		line: "Sable clair"
	},
	{
		id: "fume",
		label: "Fumé",
		line: "Presque encre"
	},
	{
		id: "loupe",
		label: "Loupe",
		line: "Tourbillons"
	}
];
var COVERS = [
	"/posters/pottery.jpg",
	"/posters/sunrise.jpg",
	"/posters/city.jpg",
	"/posters/plants.jpg"
];
var COMMENT_OPTS = [
	{
		id: "all",
		label: "Tout le monde"
	},
	{
		id: "subs",
		label: "Abonnés"
	},
	{
		id: "off",
		label: "Personne"
	}
];
var readWood = () => {
	try {
		const v = localStorage.getItem("sway-wood");
		if (v === "noyer" || v === "chene" || v === "fume" || v === "loupe") return v;
	} catch {}
	return "noyer";
};
var DEFAULT_CFG = () => ({
	title: "Une question à la fois",
	desc: "",
	cover: COVERS[0],
	wood: readWood(),
	places: 8,
	priv: false,
	premium: false,
	tickets: "3",
	comments: "all",
	questions: true,
	rules: "Respect. Pas de jugement. Une question à la fois."
});
var START = [
	{
		user: USERS["u-ines"],
		muted: false,
		cam: false
	},
	{
		user: USERS["u-maya"],
		muted: false,
		cam: false
	},
	{
		user: null,
		muted: true,
		cam: false
	},
	{
		user: USERS["u-theo"],
		muted: true,
		cam: false
	},
	{
		user: { ...ME },
		muted: false,
		cam: true
	},
	{
		user: null,
		muted: true,
		cam: false
	},
	{
		user: USERS["u-sol"],
		muted: false,
		cam: false
	},
	{
		user: USERS["u-noah"],
		muted: true,
		cam: false
	}
];
var GUESTS = [
	USERS["u-ines"],
	USERS["u-maya"],
	USERS["u-theo"],
	USERS["u-sol"],
	USERS["u-noah"]
];
var openSeats = (n, me) => {
	if (n === 8) {
		const next = START.map((s) => ({ ...s }));
		next[4] = {
			user: me,
			muted: false,
			cam: true
		};
		return next;
	}
	const hostI = hostIndex(n);
	const seats = Array.from({ length: n }, () => ({
		user: null,
		muted: true,
		cam: false
	}));
	seats[hostI] = {
		user: me,
		muted: false,
		cam: true
	};
	const fill = n === 4 ? 1 : 2;
	let g = 0;
	for (let i = 0; i < n && g < fill; i++) {
		if (i === hostI) continue;
		const u = GUESTS[g++];
		if (!u) break;
		seats[i] = {
			user: u,
			muted: false,
			cam: false
		};
	}
	return seats;
};
function TableSetup({ onBack, onLaunch, draft }) {
	const [step, setStep] = (0, import_react.useState)(draft ? "review" : "edit");
	const [title, setTitle] = (0, import_react.useState)(draft?.title ?? DEFAULT_CFG().title);
	const [desc, setDesc] = (0, import_react.useState)(draft?.desc ?? "");
	const [cover, setCover] = (0, import_react.useState)(draft?.cover ?? COVERS[0]);
	const [wood, setWood] = (0, import_react.useState)(draft?.wood ?? readWood());
	const [places, setPlaces] = (0, import_react.useState)(draft?.places ?? 8);
	const [priv, setPriv] = (0, import_react.useState)(draft?.priv ?? false);
	const [premium, setPremium] = (0, import_react.useState)(draft?.premium ?? false);
	const [tickets, setTickets] = (0, import_react.useState)(draft?.tickets ?? "3");
	const [comments, setComments] = (0, import_react.useState)(draft?.comments ?? "all");
	const [questions, setQuestions] = (0, import_react.useState)(draft?.questions ?? true);
	const [rules, setRules] = (0, import_react.useState)(draft?.rules ?? DEFAULT_CFG().rules);
	const cfg = () => ({
		title: title.trim() || "Zembo Table",
		desc,
		cover,
		wood,
		places,
		priv,
		premium,
		tickets,
		comments,
		questions,
		rules
	});
	const goReview = () => {
		try {
			localStorage.setItem("sway-wood", wood);
		} catch {}
		setStep("review");
	};
	if (step === "review") {
		const c = cfg();
		const woodLabel = WOODS.find((w) => w.id === c.wood)?.label ?? "Noyer";
		const who = COMMENT_OPTS.find((o) => o.id === c.comments)?.label ?? "Tout le monde";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2 px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							onClick: () => setStep("edit"),
							"aria-label": "Retour",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex-1 text-center text-sm font-medium",
							children: "Tout est prêt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 text-xs font-medium text-accent",
							children: "2/2"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-sm text-muted",
							children: "Vérifie avant de lancer ta table."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupProgress, { step: 2 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 overflow-hidden rounded-lg bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.cover,
									alt: "",
									className: "h-36 w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute bottom-2 right-2 rounded-full bg-bg/70 px-2.5 py-1 text-[10px] uppercase tracking-wider",
									children: woodLabel
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: c.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted",
									children: c.desc || "Aucune description."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
									label: "Places",
									value: `${c.places} personnes`,
									onClick: () => setStep("edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
									icon: c.priv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
									label: "Visibilité",
									value: c.priv ? "Privé" : "Public",
									onClick: () => setStep("edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
									icon: c.premium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
									label: "Accès",
									value: c.premium ? `Payant · ${c.tickets} ticket${c.tickets === "1" ? "" : "s"}` : "Gratuit",
									onClick: () => setStep("edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
									label: "Commentaires",
									value: who,
									onClick: () => setStep("edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
									label: "Règles",
									value: c.rules,
									onClick: () => setStep("edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRecap, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }),
									label: "Questions",
									value: c.questions ? "Acceptées" : "Fermées",
									onClick: () => setStep("edit")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2.5 rounded-lg bg-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-snug text-muted",
								children: "Une carte, une question. On écoute. Un écart peut fermer la table."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: () => onLaunch(c),
						children: "Lancer ma Zembo Table"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "line",
						size: "lg",
						onClick: () => setStep("edit"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Modifier"]
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg pt-[env(safe-area-inset-top)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: onBack,
						"aria-label": "Retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1 text-center text-sm font-medium",
						children: "Configurer Zembo Table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2 text-xs font-medium text-muted",
						children: "1/2"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-accent/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, {
								className: "size-5",
								strokeWidth: 1.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl leading-none tracking-tight",
								children: "Zembo Table"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-accent",
								children: "Une table. Un dé. Une question."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupProgress, { step: 1 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupSec, {
						n: 1,
						title: "Titre",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							maxLength: 100,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Le titre de ta table",
							className: "h-11 w-full rounded-md bg-bg px-3 text-sm outline-none placeholder:text-subtle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-right text-[10px] text-muted",
							children: [title.length, "/100"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 2,
						title: "Description",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: desc,
							maxLength: 500,
							rows: 2,
							onChange: (e) => setDesc(e.target.value),
							placeholder: "De quoi parle-t-on, ce soir ?",
							className: "w-full resize-none rounded-md bg-bg p-3 text-sm outline-none placeholder:text-subtle"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 3,
						title: "Couverture",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverPick, {
							covers: COVERS,
							value: cover,
							onPick: setCover
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 4,
						title: "Bois du rail",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: WOODS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setWood(w.id),
								"aria-label": w.label,
								"aria-pressed": wood === w.id,
								className: cn("overflow-hidden rounded-md bg-bg text-left", wood === w.id ? "shadow-[0_0_0_2px_var(--kind,var(--color-accent))]" : "shadow-[0_0_0_1px_rgb(242_238_230_/_0.08)]"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/wood/${w.id}.jpg`,
									alt: "",
									className: "h-14 w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block px-2 pb-2 pt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium",
										children: w.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted",
										children: w.line
									})]
								})]
							}, w.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupSec, {
						n: 5,
						title: "Places",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5",
							children: [
								4,
								6,
								8
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
								on: places === n,
								onClick: () => setPlaces(n),
								children: n
							}, n))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-[11px] text-muted",
							children: "L’hôte compris. Personne de plus ne monte."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 6,
						title: "Visibilité",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: !priv,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
								title: "Public",
								line: "Tout le monde peut entrer",
								onClick: () => setPriv(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: priv,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }),
								title: "Privé",
								line: "Sur invitation",
								onClick: () => setPriv(true)
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupSec, {
						n: 7,
						title: "Accès",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: !premium,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
								title: "Gratuit",
								line: "Accès libre",
								onClick: () => setPremium(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChoice, {
								on: premium,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }),
								title: "Payant",
								line: "En tickets",
								onClick: () => setPremium(true)
							})]
						}), premium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-1.5",
							children: TICKETS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SetupChip, {
								on: tickets === n,
								onClick: () => setTickets(n),
								children: [
									n,
									" ticket",
									n === "1" ? "" : "s"
								]
							}, n))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 8,
						title: "Commentaires",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
									on: comments === "all",
									onClick: () => setComments("all"),
									children: "Tout le monde"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
									on: comments === "subs",
									onClick: () => setComments("subs"),
									children: "Abonnés"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupChip, {
									on: comments === "off",
									onClick: () => setComments("off"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-3" }), " Personne"]
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 9,
						title: "Règles",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: rules,
							onChange: (e) => setRules(e.target.value),
							className: "h-11 w-full rounded-md bg-bg px-3 text-sm outline-none"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupSec, {
						n: 10,
						title: "Questions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupToggle, {
							label: "Accepter les questions écrites",
							on: questions,
							onClick: () => setQuestions(!questions)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: goReview,
					children: "Suivant"
				})
			})
		]
	});
}
function TableRoom({ onBack, cfg }) {
	const me = useSway((s) => s.me);
	const { toast, setTab } = useNav();
	const places = cfg.places === 4 || cfg.places === 6 ? cfg.places : 8;
	const POS = seatLayout(places);
	const [seats, setSeats] = (0, import_react.useState)(() => openSeats(places, me));
	const wood = cfg.wood;
	const [asks, setAsks] = (0, import_react.useState)([]);
	const [askOpen, setAskOpen] = (0, import_react.useState)(false);
	const [speaker, setSpeaker] = (0, import_react.useState)("Toi");
	const [viewers, setViewers] = (0, import_react.useState)(86);
	const [recap, setRecap] = (0, import_react.useState)(false);
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const [snap, setSnap] = (0, import_react.useState)(null);
	const ended = (0, import_react.useRef)(false);
	const [talk, setTalk] = (0, import_react.useState)([]);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const [mid, setMid] = (0, import_react.useState)(false);
	const [rolling, setRolling] = (0, import_react.useState)(false);
	const [freshId, setFreshId] = (0, import_react.useState)(null);
	const [tray, setTray] = (0, import_react.useState)(null);
	const [giftTo, setGiftTo] = (0, import_react.useState)(null);
	const [qtext, setQtext] = (0, import_react.useState)("");
	const [qPending, setQPending] = (0, import_react.useState)([]);
	const [qQueue, setQQueue] = (0, import_react.useState)([]);
	const [askTo, setAskTo] = (0, import_react.useState)(null);
	const [asker, setAsker] = (0, import_react.useState)(null);
	const [askedTo, setAskedTo] = (0, import_react.useState)(null);
	const [dieSeat, setDieSeat] = (0, import_react.useState)(hostIndex(places));
	const [picking, setPicking] = (0, import_react.useState)(false);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [floaties, setFloaties] = (0, import_react.useState)([]);
	const layer = (0, import_react.useRef)(null);
	const likesEl = (0, import_react.useRef)(null);
	const comboEl = (0, import_react.useRef)(null);
	const likes = (0, import_react.useRef)(36);
	const giftsN = (0, import_react.useRef)(0);
	const lastTap = (0, import_react.useRef)(0);
	const combo = (0, import_react.useRef)(0);
	const comboClear = (0, import_react.useRef)(null);
	const [frame, setFrame] = (0, import_react.useState)(null);
	const [face, setFace] = (0, import_react.useState)(1);
	const [question, setQuestion] = (0, import_react.useState)(QUESTIONS[0]);
	const spins = (0, import_react.useRef)(0);
	const waitI = (0, import_react.useRef)(0);
	const timers = (0, import_react.useRef)([]);
	const seatsRef = (0, import_react.useRef)(seats);
	seatsRef.current = seats;
	const qRef = (0, import_react.useRef)(qQueue);
	qRef.current = qQueue;
	const sheetRef = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)({
		on: false,
		start: 0,
		x: 0
	});
	const later = (fn, ms) => {
		const id = window.setTimeout(fn, ms);
		timers.current.push(id);
	};
	const paintLikes = (n) => {
		likes.current = n;
		if (likesEl.current) likesEl.current.textContent = compact(n);
	};
	const paintCombo = (n) => {
		combo.current = n;
		const el = comboEl.current;
		if (!el) return;
		if (n > 1) {
			el.textContent = `x${n}`;
			el.style.opacity = "1";
		} else el.style.opacity = "0";
	};
	const tap = () => {
		if (ended.current) return;
		const el = layer.current;
		if (el) {
			const r = el.getBoundingClientRect();
			burst(el, 1, true, {
				x: r.width - 26 - Math.random() * 14,
				y: r.height * .62
			});
		}
		const now = performance.now();
		const next = now - lastTap.current < 900 ? combo.current + 1 : 1;
		lastTap.current = now;
		paintCombo(next);
		paintLikes(likes.current + 1);
		if (comboClear.current) window.clearTimeout(comboClear.current);
		comboClear.current = window.setTimeout(() => paintCombo(0), 900);
	};
	const sendGift = (g) => {
		const batch = Array.from({ length: g.zems >= 99 ? 5 : 3 }, (_, i) => ({
			id: Date.now() + i + Math.random(),
			x: 10 + Math.random() * 42,
			kind: g.id
		}));
		setFloaties((h) => [...h, ...batch]);
		later(() => setFloaties((h) => h.filter((x) => !batch.some((b) => b.id === x.id))), 1750);
		const el = layer.current;
		if (el) {
			const r = el.getBoundingClientRect();
			burst(el, 2, true, {
				x: r.width - 28,
				y: r.height * .62
			});
		}
		const to = giftTo?.name.split(" ")[0];
		pushLine("Toi", to ? `envoie ${g.emoji} ${g.label.toLowerCase()} à ${to}` : `envoie ${g.emoji} ${g.label.toLowerCase()}`);
		paintLikes(likes.current + 8);
		toast(to ? `${g.emoji} ${g.label} pour ${to}` : `${g.emoji} ${g.label}`);
		giftsN.current += 1;
		setTray(null);
		setGiftTo(null);
	};
	const openGifts = (user) => {
		setGiftTo(user ?? null);
		setTray("gifts");
		setAskOpen(false);
	};
	const sendAsk = () => {
		if (!cfg.questions) return;
		if (!askTo) {
			setPicking(true);
			setTray(null);
			toast("Tape quelqu’un à la table");
			return;
		}
		const v = qtext.trim();
		if (!v) return;
		const to = askTo;
		setQPending((all) => [...all, {
			id: uid("q"),
			from: "Toi",
			to,
			text: v
		}]);
		setQtext("");
		setTray(null);
		setAskTo(null);
		setPicking(false);
		toast("L’hôte doit l’accepter");
	};
	const acceptQ = (q) => {
		setQPending((all) => all.filter((x) => x.id !== q.id));
		setQQueue((all) => [...all, q]);
		const i = seatsRef.current.findIndex((s) => s.user?.id === q.to.id);
		if (i >= 0) setDieSeat(i);
		toast(`Le dé passe à ${q.to.name.split(" ")[0]}`);
		setAskOpen(false);
	};
	const refuseQ = (q) => {
		setQPending((all) => all.filter((x) => x.id !== q.id));
	};
	const closeSheet = () => {
		const el = sheetRef.current;
		if (el) el.style.transform = "";
		setAskOpen(false);
	};
	const onSheetDown = (e) => {
		if (e.target.closest("button, input")) return;
		drag.current = {
			on: true,
			start: e.clientX,
			x: 0
		};
		sheetRef.current?.classList.add("is-drag");
		e.currentTarget.setPointerCapture(e.pointerId);
	};
	const onSheetMove = (e) => {
		if (!drag.current.on) return;
		const dx = Math.max(0, e.clientX - drag.current.start);
		drag.current.x = dx;
		if (sheetRef.current) sheetRef.current.style.transform = `translate3d(${dx}px,0,0)`;
	};
	const onSheetUp = () => {
		if (!drag.current.on) return;
		drag.current.on = false;
		sheetRef.current?.classList.remove("is-drag");
		if (drag.current.x > 80) {
			closeSheet();
			return;
		}
		if (sheetRef.current) sheetRef.current.style.transform = "";
	};
	const pushLine = (name, body, kind = "chat") => {
		const id = uid("c");
		setTalk((c) => [...c.filter((x) => !x.out).slice(-8), {
			id,
			name,
			text: body,
			kind,
			at: Date.now()
		}]);
	};
	(0, import_react.useEffect)(() => {
		const vv = window.visualViewport;
		if (!vv) return;
		const sync = () => {
			const top = Math.max(0, Math.round(vv.offsetTop));
			const height = Math.round(vv.height);
			if (top < 2 && Math.abs(height - window.innerHeight) < 10) {
				setFrame(null);
				return;
			}
			setFrame({
				top,
				height
			});
		};
		sync();
		vv.addEventListener("resize", sync);
		vv.addEventListener("scroll", sync);
		return () => {
			vv.removeEventListener("resize", sync);
			vv.removeEventListener("scroll", sync);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			setViewers((v) => Math.max(24, v + Math.floor(Math.random() * 7) - 2));
		}, 1600);
		return () => window.clearInterval(t);
	}, [recap]);
	const peak = (0, import_react.useRef)(86);
	(0, import_react.useEffect)(() => {
		if (ended.current) return;
		peak.current = Math.max(peak.current, viewers);
	}, [viewers]);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			setSeconds((s) => s + 1);
		}, 1e3);
		return () => window.clearInterval(t);
	}, [recap]);
	(0, import_react.useEffect)(() => {
		const next = qQueue[0];
		if (!next) return;
		const i = seats.findIndex((s) => s.user?.id === next.to.id);
		if (i >= 0) setDieSeat(i);
	}, [qQueue, seats]);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const t = window.setInterval(() => {
			if (ended.current) return;
			const el = layer.current;
			if (el) {
				const r = el.getBoundingClientRect();
				burst(el, 1, false, {
					x: r.width - 24 - Math.random() * 18,
					y: r.height * .6
				});
			}
			if (Math.random() > .4) paintLikes(likes.current + 1);
		}, 1100);
		return () => window.clearInterval(t);
	}, [recap]);
	(0, import_react.useEffect)(() => {
		if (recap) return;
		const tick = window.setInterval(() => {
			if (ended.current) return;
			setTalk((c) => {
				if (!c.length) return c;
				const now = Date.now();
				const head = c[0];
				if (head.out) return c.slice(1);
				const life = head.kind === "join" ? 3400 : 8200;
				if (now - head.at >= life) return [{
					...head,
					out: true
				}, ...c.slice(1)];
				return c;
			});
		}, 600);
		return () => window.clearInterval(tick);
	}, [recap]);
	(0, import_react.useEffect)(() => {
		later(() => pushLine(JOINERS[0], "rejoint", "join"), 1600);
		later(() => {
			const u = WAITING[0];
			if (u) setAsks((a) => a.some((x) => x.user.id === u.id) ? a : [...a, {
				id: uid("a"),
				user: u
			}]);
		}, 2600);
		later(() => pushLine(JOINERS[1], "rejoint", "join"), 4800);
		later(() => {
			const u = WAITING[1];
			if (u) setAsks((a) => a.some((x) => x.user.id === u.id) ? a : [...a, {
				id: uid("a"),
				user: u
			}]);
		}, 6200);
		later(() => pushLine(JOINERS[2], "rejoint", "join"), 9e3);
		if (cfg.questions) {
			later(() => {
				const q = SPECTATE_QS[0];
				const to = USERS[q.to];
				if (to) setQPending((all) => [...all, {
					id: uid("q"),
					from: q.from,
					to,
					text: q.text
				}]);
			}, 3200);
			later(() => {
				const q = SPECTATE_QS[1];
				const to = USERS[q.to];
				if (to) setQPending((all) => [...all, {
					id: uid("q"),
					from: q.from,
					to,
					text: q.text
				}]);
			}, 7800);
		}
		if (cfg.comments === "off") return () => timers.current.forEach((id) => window.clearTimeout(id));
		later(() => pushLine("Maya", "On écoute."), 2200);
		const chatter = window.setInterval(() => {
			const seated = seatsRef.current.filter((s) => s.user).map((s) => s.user.name.split(" ")[0]);
			const who = seated[Math.floor(Math.random() * seated.length)];
			if (!who || who === "Toi") return;
			pushLine(who, SPECTATE[Math.floor(Math.random() * SPECTATE.length)]);
		}, 4800);
		return () => {
			timers.current.forEach((id) => window.clearTimeout(id));
			window.clearInterval(chatter);
			if (comboClear.current) window.clearTimeout(comboClear.current);
		};
	}, []);
	const sitUser = (u) => {
		if (seatsRef.current.filter((s) => s.user).length >= places) return false;
		const i = seatsRef.current.findIndex((s) => !s.user);
		if (i < 0) return false;
		setSeats((all) => {
			if (all[i]?.user) return all;
			const copy = [...all];
			copy[i] = {
				user: u,
				muted: false,
				cam: false
			};
			return copy;
		});
		setFreshId(u.id);
		later(() => setFreshId(null), 420);
		return true;
	};
	const sit = (i) => {
		if (seats[i]?.user) return;
		if (seats.filter((s) => s.user).length >= places) {
			toast("La table est pleine");
			return;
		}
		const u = WAITING[waitI.current % WAITING.length];
		if (!u) return;
		waitI.current += 1;
		setSeats((all) => {
			if (all[i]?.user) return all;
			const copy = [...all];
			copy[i] = {
				user: u,
				muted: false,
				cam: false
			};
			return copy;
		});
		setFreshId(u.id);
		later(() => setFreshId(null), 420);
		pushLine(u.name.split(" ")[0], "rejoint la table", "join");
		toast(`${u.name.split(" ")[0]} monte`);
	};
	const acceptAsk = (ask) => {
		const ok = sitUser(ask.user);
		setAsks((a) => a.filter((x) => x.id !== ask.id));
		if (!ok) {
			toast("La table est pleine");
			return;
		}
		pushLine(ask.user.name.split(" ")[0], "rejoint la table", "join");
		setViewers((v) => v + 4);
		toast(`${ask.user.name.split(" ")[0]} monte`);
	};
	const refuseAsk = (ask) => {
		setAsks((a) => a.filter((x) => x.id !== ask.id));
	};
	const toggleMic = (i) => {
		setSeats((all) => {
			const s = all[i];
			if (!s?.user) return all;
			const copy = [...all];
			copy[i] = {
				...s,
				muted: !s.muted
			};
			return copy;
		});
	};
	const toggleCam = (i) => {
		setSeats((all) => {
			const s = all[i];
			if (!s?.user) return all;
			const copy = [...all];
			copy[i] = {
				...s,
				cam: !s.cam
			};
			return copy;
		});
	};
	const kickSeat = (i) => {
		const s = seats[i];
		if (!s?.user) return;
		const name = s.user.id === me.id || s.user.handle === "toi" ? "Toi" : s.user.name.split(" ")[0];
		if (s.user.id === me.id || s.user.handle === "toi") return;
		setSeats((all) => {
			const copy = [...all];
			copy[i] = {
				user: null,
				muted: true,
				cam: false
			};
			return copy;
		});
		pushLine(name, "descend de la table", "join");
		toast(`${name} descend`);
		setPick(null);
	};
	const roll = () => {
		if (busy) return;
		setBusy(true);
		const n = 1 + Math.floor(Math.random() * 6);
		const queued = qRef.current[0];
		const nextText = queued?.text ?? QUESTIONS[(n - 1 + spins.current) % QUESTIONS.length];
		const nextAsker = queued?.from ?? null;
		const nextTo = queued?.to ?? null;
		if (queued) setQQueue((all) => all.filter((x) => x.id !== queued.id));
		const rewind = flipped ? 200 : 0;
		if (flipped) {
			setMid(true);
			later(() => {
				setFlipped(false);
				setMid(false);
			}, 200);
		}
		later(() => {
			spins.current += 1;
			setRolling(true);
			later(() => setFace(n), 450);
		}, rewind);
		later(() => {
			setRolling(false);
			setMid(true);
			later(() => {
				setQuestion(nextText);
				setAsker(nextAsker);
				const toName = nextTo ? nextTo.id === me.id || nextTo.handle === "toi" ? "Toi" : nextTo.name.split(" ")[0] : null;
				setAskedTo(toName);
				const answererId = nextTo?.id;
				let seatI = answererId ? seatsRef.current.findIndex((s) => s.user?.id === answererId) : -1;
				if (seatI < 0) {
					const answer = toName ?? "Toi";
					seatI = seatsRef.current.findIndex((s) => {
						if (!s.user) return false;
						return (s.user.id === me.id || s.user.handle === "toi" ? "Toi" : s.user.name.split(" ")[0]) === answer;
					});
				}
				setDieSeat(seatI >= 0 ? seatI : 0);
				setFlipped(true);
				setMid(false);
				const answer = toName ?? (() => {
					const seated = seatsRef.current.filter((s) => s.user);
					const pick = seated[spins.current % Math.max(1, seated.length)];
					return pick?.user && (pick.user.id === me.id || pick.user.handle === "toi") || !pick?.user ? "Toi" : pick.user.name.split(" ")[0];
				})();
				setSpeaker(answer);
				setBusy(false);
				later(() => pushLine(answer, "Je prends celle-là."), 500);
				if (nextAsker) later(() => pushLine(nextAsker, "j’écoute la réponse"), 1100);
			}, 200);
		}, rewind + 920);
	};
	const send = () => {
		const v = text.trim();
		if (!v) return;
		pushLine("Toi", v);
		setText("");
		setSpeaker("Toi");
	};
	if (recap && snap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRecap, {
		stats: snap,
		onClose: () => {
			setTab("home");
			onBack();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden bg-bg",
		style: frame ? {
			position: "absolute",
			top: frame.top,
			height: frame.height,
			left: 0,
			right: 0
		} : { height: "100%" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "table-room-bg absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[1] touch-manipulation",
				role: "presentation",
				onPointerDown: (e) => {
					if (e.pointerType === "mouse" && e.button !== 0) return;
					if (askOpen) {
						closeSheet();
						return;
					}
					if (pick) {
						setPick(null);
						return;
					}
					if (picking) {
						setPicking(false);
						return;
					}
					if (tray) {
						setTray(null);
						setGiftTo(null);
						setAskTo(null);
						return;
					}
					tap();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: layer,
				className: "pointer-events-none absolute inset-0 z-[18] overflow-hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						onClick: () => {
							ended.current = true;
							setSnap({
								kindLabel: "Zembo Table",
								title: cfg.title,
								cover: cfg.cover,
								viewers: peak.current,
								comments: talk.length,
								likes: likes.current,
								gifts: giftsN.current,
								premium: cfg.premium,
								ticketsSold: cfg.premium ? Math.max(1, Math.round(peak.current * .14)) : 0,
								ticketPrice: cfg.tickets,
								seconds
							});
							setRecap(true);
						},
						"aria-label": "Terminer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-xs text-fg/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 fill-heart text-heart" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									ref: likesEl,
									className: "tabular-nums",
									children: compact(likes.current)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg/50",
									children: "tapotages"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-xs bg-live px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-fg anim-live" }), "Live"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-bg/40 px-2 py-1 text-xs tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), compact(viewers)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAskOpen((v) => !v),
						"aria-label": "Demandes pour monter",
						className: "relative flex size-11 items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-5" }), asks.length + qPending.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "anim-count absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-fg",
							children: asks.length + qPending.length
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("ask-veil absolute inset-0 z-40", askOpen && "is-open"),
				"aria-label": "Fermer les demandes",
				onClick: closeSheet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: sheetRef,
				className: cn("ask-sheet absolute inset-y-0 right-0 z-40 flex flex-col bg-bg px-4", askOpen && "is-open"),
				onPointerDown: onSheetDown,
				onPointerMove: onSheetMove,
				onPointerUp: onSheetUp,
				onPointerCancel: onSheetUp,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-[calc(0.4rem+env(safe-area-inset-top))] h-1 w-10 rounded-full bg-fg/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Demandes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							onClick: closeSheet,
							"aria-label": "Fermer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Glisse pour fermer. L’hôte accepte, sans lire la carte."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted",
								children: "Monter"
							}),
							asks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "Personne pour l’instant."
							}) : null,
							asks.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ask-row flex items-center gap-2 py-2",
								children: [
									a.user.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: a.user.avatar,
										alt: "",
										className: "size-10 rounded-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-10 items-center justify-center rounded-full bg-surface-2 text-xs",
										children: a.user.name.charAt(0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm",
											children: a.user.name.split(" ")[0]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted",
											children: "Veut monter"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-8 rounded-full bg-surface-2 px-3 text-xs transition-transform duration-150 ease-out active:scale-[0.96]",
										onClick: () => refuseAsk(a),
										children: "Non"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-8 rounded-full bg-accent px-3 text-xs text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]",
										onClick: () => acceptAsk(a),
										children: "Monter"
									})
								]
							}, a.id)),
							cfg.questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-[10px] uppercase tracking-wider text-muted",
									children: "Questions"
								}),
								qPending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted",
									children: "Aucune question en attente."
								}) : null,
								qPending.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ask-row flex items-center gap-2 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-sm",
												children: [
													q.from,
													" → ",
													q.to.id === me.id || q.to.handle === "toi" ? "Toi" : q.to.name.split(" ")[0]
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted",
												children: [
													"Pour ",
													q.to.name.split(" ")[0],
													" · texte caché"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-8 rounded-full bg-surface-2 px-3 text-xs transition-transform duration-150 ease-out active:scale-[0.96]",
											onClick: () => refuseQ(q),
											children: "Non"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-8 rounded-full bg-accent px-3 text-xs text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]",
											onClick: () => acceptQ(q),
											children: "Carte"
										})
									]
								}, q.id))
							] }) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-[calc(3.05rem+env(safe-area-inset-top))] bottom-[9rem] z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-scene relative h-full w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-world",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "poker-rail",
							"data-wood": wood,
							children: [
								CUPS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "poker-cup",
									style: {
										left: `${c.x}%`,
										top: `${c.y}%`
									}
								}, i)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "poker-pad",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "poker-felt relative overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltShader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pointer-events-none absolute inset-0 z-[3]",
											children: [cfg.title.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "felt-title absolute left-1/2 top-[10%] w-[11.5rem] -translate-x-1/2 line-clamp-2 text-center font-display text-[15px] leading-snug tracking-tight",
												children: cfg.title.trim()
											}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute left-1/2 top-[32%] flex -translate-x-1/2 flex-col items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: roll,
														disabled: busy,
														"aria-label": "Lancer le dé",
														className: "die-spot is-park z-[12] pointer-events-auto active:scale-[0.96]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Die, {
															face,
															rolling
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: roll,
														disabled: busy,
														"aria-label": "Retourner la carte",
														className: "pointer-events-auto",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: cn("playing-card flex flex-col items-center justify-center px-2.5 text-center", mid && "is-mid", flipped ? "card-front" : "card-back"),
															children: flipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex flex-col items-center gap-1 px-0.5",
																children: [asker && askedTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[9px] font-medium leading-tight uppercase tracking-wider text-accent-fg/55",
																	children: [asker, " a posé une question pour"]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-display text-[13px] tracking-tight",
																	children: askedTo
																})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] uppercase tracking-wider text-accent-fg/40",
																	children: "Table"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "line-clamp-4 font-display text-[11px] leading-snug tracking-tight",
																	children: question
																})]
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-display text-xl italic leading-none",
																	children: "Z"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "mt-0.5 text-[8px] uppercase tracking-[0.22em] text-accent-fg/70",
																	children: "Table de"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "mt-0.5 max-w-full truncate font-display text-[13px] leading-none tracking-tight",
																	children: (me.name.trim() || "Toi").split(" ")[0]
																}),
																cfg.questions && qQueue.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "mt-1 text-[9px] text-accent-fg/50",
																	children: [qQueue.length, " sur la carte"]
																}) : null
															] })
														})
													}),
													flipped && !busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-accent",
														children: speaker === "Toi" ? "À toi de répondre" : `${speaker} répond`
													}) : null
												]
											})]
										})]
									})
								}),
								seats.map((seat, i) => {
									const pos = POS[i];
									const mine = !!seat.user && (seat.user.id === me.id || seat.user.handle === "toi");
									const speaking = !!seat.user && (seat.user.name.split(" ")[0] === speaker || mine && speaker === "Toi");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatNode, {
										seat,
										x: pos.x,
										y: pos.y,
										speaking,
										picking: picking && !!seat.user,
										entering: !!seat.user && seat.user.id === freshId,
										onMic: () => toggleMic(i),
										onSit: () => sit(i),
										onAvatar: () => {
											if (!seat.user) {
												sit(i);
												return;
											}
											if (picking && cfg.questions) {
												setAskTo(seat.user);
												setTray("ask");
												setPicking(false);
												setPick(null);
												return;
											}
											setPick(seat.user);
											setTray(null);
										}
									}, i);
								})
							]
						})
					})
				})
			}),
			talk.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-chat pointer-events-none absolute bottom-[6.15rem] left-3 z-[15] flex max-h-[11.5rem] w-[52%] flex-col justify-end gap-1.5",
				children: talk.slice(-8).map((m) => m.kind === "join" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("live-join table-join", m.out && "is-out"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: m.name
					}), " rejoint"]
				}, m.id) : cfg.comments === "off" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("live-line table-line", m.out && "is-out"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "table-line-name",
						children: m.name
					}), m.text]
				}, m.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				ref: comboEl,
				className: "pointer-events-none absolute bottom-40 right-5 z-20 font-display text-3xl italic tabular-nums opacity-0",
				children: "x2"
			}),
			floaties.map((h) => {
				const G = GIFTS.find((g) => g.id === h.kind);
				if (!G) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gift-float",
					style: { right: h.x },
					children: G.emoji
				}, h.id);
			}),
			pick ? (() => {
				const i = seats.findIndex((s) => s.user && (s.user.id === pick.id || s.user.handle === pick.handle));
				const seated = i >= 0 ? seats[i] : null;
				const mine = pick.id === me.id || pick.handle === "toi";
				const name = mine ? "Toi" : pick.name.split(" ")[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-9 items-center justify-center",
								onClick: () => setPick(null),
								"aria-label": "Fermer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						seated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 items-center gap-3 text-left text-sm transition-transform duration-150 ease-out active:scale-[0.98]",
									onClick: () => {
										toggleMic(i);
									},
									children: [seated.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4 text-accent" }), seated.muted ? "Activer le micro" : "Couper le micro"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 items-center gap-3 text-left text-sm transition-transform duration-150 ease-out active:scale-[0.98]",
									onClick: () => {
										toggleCam(i);
										if (!seated.cam) toast(`Caméra demandée à ${name}`);
									},
									children: [seated.cam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4 text-accent" }), seated.cam ? "Couper la caméra" : "Demander la caméra"]
								}),
								!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 items-center gap-3 text-left text-sm text-heart transition-transform duration-150 ease-out active:scale-[0.98]",
									onClick: () => kickSeat(i),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-4" }), "Faire descendre"]
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex gap-2",
							children: [cfg.questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setAskTo(pick);
									setPick(null);
									setTray("ask");
									setPicking(false);
								},
								className: "flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface-2 text-sm transition-transform duration-150 ease-out active:scale-[0.96]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4 text-accent" }), "Question"]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									const u = pick;
									setPick(null);
									openGifts(u);
								},
								className: "flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface-2 text-sm transition-transform duration-150 ease-out active:scale-[0.96]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4 text-accent" }), "Cadeau"]
							})]
						})
					]
				});
			})() : null,
			tray === "gifts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-2 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 px-1 text-[11px] text-muted",
					children: giftTo ? `Cadeau pour ${giftTo.name.split(" ")[0]}` : "Cadeau pour la table"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftGrid, { onPick: sendGift })]
			}) : null,
			tray === "ask" ? cfg.questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]",
				onSubmit: (e) => {
					e.preventDefault();
					sendAsk();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted",
							children: askTo ? `Question pour ${askTo.id === me.id || askTo.handle === "toi" ? "toi" : askTo.name.split(" ")[0]}. L’hôte accepte, sans lire.` : "Tape d’abord quelqu’un à la table."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAskOpen(true),
							"aria-label": "Demandes pour monter",
							className: "relative flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-4" }), asks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-fg",
								children: asks.length
							}) : null]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: qtext,
						onChange: (e) => setQtext(e.target.value),
						onFocus: () => window.scrollTo(0, 0),
						placeholder: "Pose ta question",
						className: "mt-2 h-11 w-full rounded-full bg-surface px-4 text-sm outline-none placeholder:text-fg/50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] text-muted",
							children: [qPending.length, " chez l’hôte"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-8 rounded-full bg-accent px-3 text-xs text-accent-fg",
							children: "Envoyer"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 bottom-[5.5rem] z-30 rounded-lg bg-bg/90 p-3 shadow-[0_0_0_1px_rgb(242_238_230_/_0.1)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Questions fermées"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted",
					children: "Ce live n’accepte pas les questions."
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
				children: [
					cfg.comments !== "off" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						className: "min-w-0 flex-1",
						onSubmit: (e) => {
							e.preventDefault();
							send();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: text,
							onChange: (e) => setText(e.target.value),
							onFocus: () => window.scrollTo(0, 0),
							placeholder: "Dire quelque chose",
							className: "h-11 w-full rounded-full bg-bg/55 px-4 text-sm outline-none placeholder:text-fg/50"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (!cfg.questions) {
								setAskTo(null);
								setTray((t) => t === "ask" ? null : "ask");
								return;
							}
							if (tray === "ask") {
								setTray(null);
								setAskTo(null);
								setPicking(false);
								return;
							}
							setTray(null);
							setPicking(true);
							toast("Tape un avatar");
						},
						"aria-label": "Poser une question",
						"aria-pressed": tray === "ask",
						className: cn("relative flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-150 ease-out active:scale-[0.96]", tray === "ask" || picking ? "bg-accent text-accent-fg" : "bg-bg/55"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-5" }), cfg.questions && qPending.length + qQueue.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-fg",
							children: qPending.length + qQueue.length
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => tray === "gifts" ? (setTray(null), setGiftTo(null)) : openGifts(giftTo),
						"aria-label": "Cadeaux",
						"aria-pressed": tray === "gifts",
						className: cn("flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-150 ease-out active:scale-[0.96]", tray === "gifts" ? "bg-accent text-accent-fg" : "bg-bg/55"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5" })
					})
				]
			})
		]
	});
}
function SeatNode({ seat, x, y, speaking, entering, picking, onMic, onSit, onAvatar }) {
	const label = !seat.user ? "" : seat.user.id === "me" || seat.user.handle === "toi" ? "Toi" : seat.user.name.split(" ")[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("poker-seat relative absolute z-10 flex w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center", entering && "is-in"),
		style: {
			left: `${x}%`,
			top: `${y}%`
		},
		children: seat.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("poker-avatar relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-surface-2 font-display text-accent", speaking && "is-speak", picking && "shadow-[0_0_0_3px_var(--color-accent)]", seat.muted && "opacity-55"),
				role: "button",
				tabIndex: 0,
				onClick: onAvatar,
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onAvatar();
					}
				},
				"aria-label": seat.user ? `Cadeau pour ${label}` : "S’asseoir",
				children: [seat.user.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: seat.user.avatar,
					alt: "",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg",
					children: label.charAt(0)
				}), seat.cam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0.5 top-0.5 size-1.5 rounded-full bg-open" }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onMic,
				"aria-label": seat.muted ? "Activer le micro" : "Couper le micro",
				className: cn("absolute right-0 top-8 flex size-5 items-center justify-center rounded-full", seat.muted ? "bg-surface-2 text-muted" : "bg-accent text-accent-fg"),
				children: seat.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-2.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-0.5 max-w-full truncate text-[10px]", speaking ? "text-accent" : "text-fg/80"),
				children: label
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onSit,
			className: "flex flex-col items-center",
			"aria-label": "S’asseoir",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-full bg-bg/50 shadow-[0_0_0_1px_rgb(242_238_230_/_0.16)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5 text-accent" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 text-[11px] uppercase tracking-wider text-muted",
				children: "Libre"
			})]
		})
	});
}
function Die({ face, rolling }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("die-iso", rolling && "is-roll"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "die-iso-top",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "die-iso-side",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "die-iso-front",
				children: Array.from({ length: 9 }, (_, p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: PIPS[face]?.includes(p) ? "die-pip" : void 0 }, p))
			})
		]
	});
}
var TILES = [
	{
		id: "live",
		title: "Créer un live",
		line: "Lance un débat, une discussion ou ton émission en direct.",
		tags: [
			"Storytime",
			"Micro Ouvert",
			"Stand-Up"
		],
		img: "/create/live.jpg",
		ink: "bg-accent text-accent-fg",
		frame: "ring-accent/45",
		lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(212_196_168_/_0.16)]"
	},
	{
		id: "table",
		title: "Zembo Table",
		line: "Réunis 4 à 8 personnes autour d’une table interactive.",
		tags: [
			"Discussions",
			"Jeux",
			"Cartes"
		],
		img: "/create/table.jpg",
		ink: "bg-rail-hi text-fg",
		frame: "ring-rail-hi/70",
		lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(92_59_38_/_0.4)]"
	},
	{
		id: "play",
		title: "Play & Fun",
		line: "Lance un jeu et défie ta communauté.",
		tags: [
			"Quiz",
			"Hot Seat",
			"Tu préfères"
		],
		img: "/create/play.jpg",
		ink: "bg-live text-fg",
		frame: "ring-live/55",
		lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(196_92_74_/_0.28)]"
	},
	{
		id: "world",
		title: "World Room",
		line: "Le monde est à un Hello.",
		tags: [
			"Hello",
			"Face à Face",
			"60 s"
		],
		img: "/create/world.jpg",
		ink: "bg-fg text-accent-fg",
		frame: "ring-fg/25",
		lift: "shadow-[0_10px_24px_rgb(0_0_0_/_0.45),0_0_28px_rgb(242_238_230_/_0.1)]"
	}
];
function Hub() {
	const { pop, toast } = useNav();
	const publish = useSway((s) => s.publish);
	const [view, setView] = (0, import_react.useState)({ t: "root" });
	const postLive = (kind, title, cover, desc, tablePlaces) => {
		publish({
			src: "",
			poster: cover,
			caption: title,
			tags: [kind],
			soundId: "s-puddle",
			live: true,
			photo: true,
			viewers: 12,
			liveKind: kind,
			...kind === "table" ? { tablePlaces: tablePlaces ?? 8 } : {}
		});
		toast(kind === "table" ? "Ta table est dans le flux" : "Ton live est dans le flux");
	};
	const back = () => {
		if (view.t === "root") pop();
		else if (view.t === "setup") setView({ t: "lives" });
		else if (view.t === "host") setView({
			t: "setup",
			kind: view.kind
		});
		else if (view.t === "game") setView({ t: "play" });
		else if (view.t === "table") setView({
			t: "table-setup",
			draft: view.cfg
		});
		else setView({ t: "root" });
	};
	const go = (id) => {
		if (id === "live") setView({ t: "lives" });
		else if (id === "play") setView({ t: "play" });
		else if (id === "table") setView({ t: "table-setup" });
		else setView({ t: "world" });
	};
	if (view.t === "root") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/30",
			onClick: pop,
			"aria-label": "Fermer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hub-drop hub-glass hub-panel absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-3xl pt-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto h-1 w-10 shrink-0 rounded-full bg-fg/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex shrink-0 items-center justify-between px-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-12 items-center justify-center",
							onClick: pop,
							"aria-label": "Fermer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl italic tracking-tight",
							children: "Sway"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-12" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hub-hero-wrap shrink-0 px-5 pb-3 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hub-hero font-display leading-[1.12] tracking-tight",
						children: [
							"Que veux-tu",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: "créer aujourd’hui ?"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hub-lede mt-2 text-sm text-muted",
						children: "Partage, joue, débat, connecte-toi."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2.5 overflow-hidden px-3",
					children: TILES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go(t.id),
						className: cn("hub-tile flex min-h-0 flex-col overflow-hidden rounded-2xl p-2 text-left ring-1", "transition-[transform,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985]", t.frame, t.lift),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative block min-h-0 flex-1 overflow-hidden rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: t.img,
								alt: "",
								className: "size-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex shrink-0 flex-col px-1 pb-0.5 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hub-card-title font-display leading-tight tracking-tight",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hub-line mt-1 line-clamp-2 text-xs leading-snug text-muted",
									children: t.line
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hub-tags mt-1.5 flex flex-wrap gap-1 overflow-hidden",
									children: t.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-bg/30 px-2 py-0.5 text-[10px] leading-none text-fg/85 ring-1 ring-fg/15",
										children: tag
									}, tag))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("mt-2 ml-auto flex size-8 items-center justify-center rounded-full", t.ink),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
								})
							]
						})]
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => toast("Planifier un live — bientôt."),
					className: "mx-3 mt-2 mb-[max(0.75rem,env(safe-area-inset-bottom))] flex shrink-0 items-center gap-3 rounded-2xl bg-bg/30 px-3 py-2.5 text-left ring-1 ring-fg/12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: ["Planifier un événement", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full px-1.5 py-0.5 text-[9px] text-muted ring-1 ring-fg/15",
									children: "Bientôt"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block truncate text-[11px] text-muted",
								children: "Programme un live pour plus tard"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted" })
					]
				})
			]
		})]
	});
	if (view.t === "lives") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/30",
			onClick: back,
			"aria-label": "Retour"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hub-drop hub-glass hub-panel absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-3xl pt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto h-1 w-10 shrink-0 rounded-full bg-fg/25" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveKinds, {
				onBack: back,
				onPick: (kind) => setView({
					t: "setup",
					kind
				})
			})]
		})]
	});
	if (view.t === "setup") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostSetup, {
			kind: view.kind,
			onBack: back,
			onLaunch: (cfg) => {
				postLive(view.kind, cfg.title, cfg.cover, cfg.desc);
				setView({
					t: "host",
					kind: view.kind,
					...cfg
				});
			}
		})
	});
	if (view.t === "host") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostRoom, {
			...view,
			onLeave: pop
		})
	});
	if (view.t === "play") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayHub, {
			onBack: back,
			onPick: (game) => setView({
				t: "game",
				game
			})
		})
	});
	if (view.t === "game") {
		const game = view.game === "quiz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizGame, { onBack: back }) : view.game === "hotseat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HotSeatGame, { onBack: back }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferGame, { onBack: back });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full bg-bg",
			children: game
		});
	}
	if (view.t === "table-setup") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSetup, {
			draft: view.draft,
			onBack: back,
			onLaunch: (cfg) => {
				postLive("table", cfg.title, cfg.cover, cfg.desc, cfg.places);
				setView({
					t: "table",
					cfg
				});
			}
		})
	});
	if (view.t === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRoom, {
			cfg: view.cfg,
			onBack: back
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldRoom, { onBack: back })
	});
}
function SoundScreen({ soundId }) {
	const { pop, push } = useNav();
	const sound = SOUNDS[soundId];
	const clips = clipsBySound(soundId, useSway((s) => s.myClips));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenHeader, {
				title: "Son original",
				onBack: pop
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl tracking-tight",
					children: sound?.title ?? "Son"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: sound?.artist
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid min-h-0 flex-1 grid-cols-3 gap-px overflow-y-auto bg-line pb-8",
				children: clips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "relative aspect-[3/4] bg-surface",
					onClick: () => push({
						t: "viewer",
						clipId: c.id,
						ids: clips.map((x) => x.id)
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.poster,
						alt: "",
						className: "size-full object-cover"
					})
				}, c.id))
			})
		]
	});
}
function TagScreen({ tag }) {
	const { pop, push } = useNav();
	const t = tag.replace(/^#/, "").toLowerCase();
	const myClips = useSway((s) => s.myClips);
	const clips = t === "tendance" ? [...myClips, ...CLIPS] : clipsByTag(t, myClips);
	const meta = HASHTAGS.find((h) => h.tag === t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenHeader, {
				title: `#${t}`,
				onBack: pop
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-4 pb-3 text-sm text-muted",
				children: [meta?.views ?? `${clips.length}`, " vues"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid min-h-0 flex-1 grid-cols-3 gap-px overflow-y-auto bg-line pb-8",
				children: clips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "relative aspect-[3/4] bg-surface",
					onClick: () => push({
						t: "viewer",
						clipId: c.id,
						ids: clips.map((x) => x.id)
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.poster,
						alt: "",
						className: "size-full object-cover"
					})
				}, c.id))
			})
		]
	});
}
function ViewerScreen({ clipId, ids }) {
	const { pop } = useNav();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipPager, {
			ids,
			startId: clipId
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: pop,
			className: "absolute left-2 top-[calc(0.5rem+env(safe-area-inset-top))] z-20 flex size-11 items-center justify-center text-fg",
			"aria-label": "Retour",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "22",
				height: "22",
				viewBox: "0 0 24 24",
				fill: "none",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M15 5 L8 12 L15 19",
					stroke: "currentColor",
					strokeWidth: "1.8",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		})]
	});
}
function SwayApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}) });
}
function Phone() {
	const [splash, setSplash] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		useSway.persist.rehydrate();
		const t = window.setTimeout(() => setSplash(false), 800);
		return () => window.clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-void text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative isolate h-dvh w-full max-w-[430px] overflow-hidden bg-bg sm:h-[min(100dvh,844px)] sm:rounded-2xl sm:shadow-phone",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}), splash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {}) : null]
		})
	});
}
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-5xl italic tracking-tight text-fg",
			children: "Sway"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-3 h-px w-12 bg-accent" })]
	});
}
function Shell() {
	const { tab, setTab, stack, push, pop, notice } = useNav();
	const markInbox = useSway((s) => s.markInboxSeen);
	const inboxSeen = useSway((s) => s.inboxSeen);
	const top = stack[stack.length - 1];
	const hideBar = stack.length > 0;
	const link = useLink();
	(0, import_react.useEffect)(() => {
		if (tab === "inbox") markInbox();
	}, [tab, markInbox]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0", tab !== "home" && "invisible pointer-events-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFeed, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0", tab !== "discover" && "invisible pointer-events-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discover$1, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0", tab !== "inbox" && "invisible pointer-events-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox$2, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0", tab !== "profile" && "invisible pointer-events-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHome, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
				tab,
				hidden: hideBar,
				unread: !inboxSeen,
				onTab: setTab,
				onCreate: () => push({ t: "hub" })
			}),
			top ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layer, {
				open: true,
				variant: top.t === "hub" ? "glass" : isSheet(top) ? "sheet" : "push",
				onClose: pop,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayView, { item: top })
			}) : null,
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-24 z-50 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-surface-2 px-4 py-2 text-sm text-fg shadow-[0_0_0_1px_rgb(242_238_230_/_0.12)]",
					children: notice
				})
			}) : null,
			link !== "good" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("pointer-events-none absolute inset-x-0 z-[60] flex justify-center px-4", hideBar ? "top-[3.25rem]" : "bottom-[5.25rem]"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkChip, { level: link })
			}) : null,
			top ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: top.t
			}) : null
		]
	});
}
function OverlayView({ item }) {
	switch (item.t) {
		case "comments": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentsSheet, { clipId: item.clipId });
		case "share": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareSheet, { clipId: item.clipId });
		case "settings": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {});
		case "edit": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditSheet, {});
		case "user": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserScreen, { userId: item.userId });
		case "sound": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundScreen, { soundId: item.soundId });
		case "tag": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagScreen, { tag: item.tag });
		case "live": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinLive, { clipId: item.clipId });
		case "create": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateStudio, { duoOf: item.duoOf });
		case "hub": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hub, {});
		case "chat": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chat, { threadId: item.threadId });
		case "viewer": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerScreen, {
			clipId: item.clipId,
			ids: item.ids
		});
	}
}
function JoinLive({ clipId }) {
	const { pop } = useNav();
	const me = useSway((s) => s.me);
	const clip = getClip(clipId);
	if (!clip?.liveKind) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRoom, { clipId });
	if (clip.liveKind === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRoom, {
		cfg: {
			title: clip.caption,
			desc: "",
			cover: clip.poster,
			wood: "noyer",
			places: clip.tablePlaces === 4 || clip.tablePlaces === 6 ? clip.tablePlaces : 8,
			priv: false,
			premium: false,
			tickets: "3",
			comments: "all",
			questions: true,
			rules: "Respect. Pas de jugement. Une question à la fois."
		},
		onBack: pop
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostRoom, {
		kind: clip.liveKind,
		title: clip.caption,
		desc: "",
		cover: clip.poster,
		priv: false,
		premium: false,
		comments: true,
		questions: clip.liveKind === "stand",
		maxGuests: clip.liveKind === "openmic" ? 4 : 0,
		slamMode: "open",
		rules: "Respect · Pas de jugement · Bonne écoute",
		commentWho: "all",
		tickets: "3",
		onLeave: pop,
		startWatch: clip.userId !== me.id
	});
}
function TabBar({ tab, hidden, unread, onTab, onCreate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: cn("absolute inset-x-0 bottom-0 z-30 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)] transition-transform duration-200 ease-out", hidden && "pointer-events-none invisible translate-y-full"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid h-14 grid-cols-5 items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "home",
					label: "Accueil",
					onClick: () => onTab("home"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
						className: "size-6",
						strokeWidth: tab === "home" ? 2.2 : 1.7
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "discover",
					label: "Découvrir",
					onClick: () => onTab("discover"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
						className: "size-6",
						strokeWidth: tab === "discover" ? 2.2 : 1.7
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Créer",
					onClick: onCreate,
					className: "relative z-30 flex h-14 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-12 items-center justify-center rounded-sm bg-accent text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-5",
							strokeWidth: 2.4
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "inbox",
					label: "Boîte",
					onClick: () => onTab("inbox"),
					badge: unread,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
						className: "size-6",
						strokeWidth: tab === "inbox" ? 2.2 : 1.7
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "profile",
					label: "Profil",
					onClick: () => onTab("profile"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
						className: "size-6",
						strokeWidth: tab === "profile" ? 2.2 : 1.7
					})
				})
			]
		})
	});
}
function TabBtn({ active, label, onClick, children, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": label,
		"aria-current": active ? "page" : void 0,
		className: cn("relative flex h-14 items-center justify-center", active ? "text-fg" : "text-muted"),
		children: [children, badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-[calc(50%-14px)] top-2 size-1.5 rounded-full bg-accent" }) : null]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwayApp, {});
}
//#endregion
export { Home as component };
