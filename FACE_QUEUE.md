# Face queue (pickFaceOpponent)

`src/lib/match-queue.ts` is on main.

In `src/components/world.tsx`:

1. Add import:
```
import { pickFaceOpponent } from "@/lib/match-queue";
```

2. Replace FacePage `onLaunch` with:
```
onLaunch={(mode) => {
  buzz();
  const picked = pickFaceOpponent({
    me: profile,
    seek: "tous",
    blocked: [...hellos.connections, ...hellos.ignored],
    hellos,
  });
  setOver({ t: "meet", mode, card: picked ?? undefined });
}}
```

FaceDuel already receives `preferred={over.card}`.
After a Hello mutuel with Sofia, search should connect to Sofia first.
