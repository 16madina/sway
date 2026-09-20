# Face queue + restore world.tsx

`src/components/world.tsx` on main is currently truncated by a bad push. Restore the last good copy then apply the hook.

```bash
git fetch origin
git checkout 754240c2683118f2877c8a35eeba3947f8980124 -- src/components/world.tsx
```

Then in that file:

1. Under the FaceDuel import, add:
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

`src/lib/match-queue.ts` is already on main.
FaceDuel already uses `preferred={over.card}`.
After Hello mutuel (Sofia), a Face search should open on Sofia.
