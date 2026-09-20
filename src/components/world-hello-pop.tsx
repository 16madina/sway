import { Heart, MessageCircle, Plane, Sparkles, Users, Video } from "lucide-react";
import { Button } from "@/components/ui";
import { flagOf, intentLabel, type WorldCard, type WorldProfile } from "@/lib/world";

/** D’où vient le match — le 2e bouton change, le chat reste. */
export type HelloPopKind = "face" | "compat" | "match";

type Person = {
  name: string;
  age?: number | string;
  photo?: string;
  city?: string;
  country?: string;
  flag?: string;
  tags?: string[];
};

function fromCard(c: WorldCard): Person {
  return {
    name: c.name,
    age: c.age,
    photo: c.photos[0],
    city: c.city,
    country: c.country,
    flag: c.flag,
    tags: [intentLabel(c.intent)].filter(Boolean),
  };
}

function fromMe(p: WorldProfile): Person {
  return {
    name: p.username ? `@${p.username}` : "Toi",
    age: p.showAge ? p.age : undefined,
    photo: p.photos[0],
    city: p.city,
    country: p.country,
    flag: flagOf(p.country),
    tags: p.intentions.slice(0, 3).map(intentLabel),
  };
}

export function HelloMatchPop({
  kind,
  me,
  them,
  mePhoto,
  card,
  onChat,
  onAgain,
}: {
  kind: HelloPopKind;
  them: WorldCard;
  me?: WorldProfile;
  mePhoto?: string;
  card?: WorldCard;
  onChat: () => void;
  onAgain?: () => void;
}) {
  const left = me ? fromMe(me) : { name: "Toi", photo: mePhoto };
  const right = fromCard(card ?? them);
  const again =
    kind === "face"
      ? "Un autre Face à Face"
      : kind === "compat"
        ? "Essayer une autre compatibilité"
        : null;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-[#07060c]">
      <img src="/posters/sunrise.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-black" />
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="world-confetti pointer-events-none absolute top-6 size-2 rounded-sm bg-accent"
          style={{
            left: `${4 + i * 6}%`,
            animationDelay: `${i * 50}ms`,
            ["--dx" as string]: `${-36 + i * 6}px`,
            ["--dy" as string]: `${140 + (i % 4) * 18}px`,
          }}
        />
      ))}

      <div className="relative z-10 flex h-full flex-col px-5 pt-[calc(1.1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <p className="text-center font-display text-lg tracking-[0.2em] text-accent">ZEMBO</p>
        <p className="mt-0.5 text-center text-[11px] text-fg/70">Là où les connexions prennent vie.</p>

        <p className="mt-5 text-center text-xs uppercase tracking-[0.18em] text-fg/80">Vous vous êtes dit</p>
        <p className="world-gold-text mt-1 text-center font-display text-6xl leading-none tracking-tight">
          HELLO
          <Heart className="ml-1 inline size-8 fill-accent text-accent" />
        </p>
        <p className="mt-3 text-center text-sm text-fg/75">Une belle connexion commence peut-être ici…</p>

        <div className="relative mx-auto mt-6 flex w-full max-w-[22rem] items-center justify-center">
          <FaceCoin person={left} side="left" />
          <FaceCoin person={right} side="right" />
          <span className="absolute left-1/2 top-1/2 z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg ring-2 ring-accent">
            <Heart className="size-5 fill-accent text-accent" />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <Meta person={left} />
          <Meta person={right} />
        </div>

        <div className="mt-auto space-y-2.5">
          <Button size="lg" className="world-gold" onClick={onChat}>
            <MessageCircle className="size-4" /> Commencer à chatter
          </Button>
          {again && onAgain ? (
            <button
              type="button"
              onClick={onAgain}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm ring-1 ring-accent/40"
            >
              {kind === "compat" ? <Sparkles className="size-4 text-accent" /> : <Video className="size-4 text-accent" />}
              {again}
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] text-fg/70">
          <p>
            <Users className="mx-auto mb-1 size-4 text-accent" />
            Des gens du monde entier
          </p>
          <p>
            <Heart className="mx-auto mb-1 size-4 text-accent" />
            Des conversations vraies
          </p>
          <p>
            <Plane className="mx-auto mb-1 size-4 text-accent" />
            De nouvelles opportunités
          </p>
        </div>
        <p className="mt-3 text-center font-display italic text-accent">Keep the vibe</p>
      </div>
    </div>
  );
}

function FaceCoin({ person, side }: { person: Person; side: "left" | "right" }) {
  return (
    <div className={side === "left" ? "relative z-[1] -mr-4" : "relative z-[1] -ml-4"}>
      <div className="size-[8.4rem] overflow-hidden rounded-full ring-2 ring-accent shadow-[0_0_24px_rgb(212_196_168_/_0.35)]">
        {person.photo ? (
          <img src={person.photo} alt="" className="size-full object-cover" />
        ) : (
          <span className="grid size-full place-items-center bg-surface text-sm">?</span>
        )}
      </div>
    </div>
  );
}

function Meta({ person }: { person: Person }) {
  return (
    <div>
      <p className="text-sm font-medium">
        {person.name}
        {person.age ? <span className="text-muted">, {person.age}</span> : null}
      </p>
      <p className="mt-0.5 text-[11px] text-muted">
        {person.flag} {person.city}
        {person.country ? `, ${person.country}` : ""}
      </p>
      {person.tags?.length ? (
        <p className="mt-1.5 flex flex-wrap justify-center gap-1">
          {person.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-fg/10 px-2 py-0.5 text-[10px]">
              {t}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
