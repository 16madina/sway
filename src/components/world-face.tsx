function playDiceLoop() {
  try {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!diceEl) {
      diceEl = new Audio("/face/dice-roll.wav");
      diceEl.preload = "auto";
      diceEl.loop = true;
    }
    diceEl.muted = false;
    diceEl.volume = 0.58;
    const p = diceEl.play();
    if (p) void p.catch(() => {});
  } catch {
    /* ignore */
  }
}

function stopDiceLoop() {
  if (!diceEl) return;
  try {
    diceEl.pause();
    diceEl.currentTime = 0;
  } catch {
    /* ignore */
  }
}

function pauseDiceLoop() {
  if (!diceEl) return;
  try {
    diceEl.pause();
  } catch {
    /* ignore */
  }
}

function resumeDiceLoop() {
  if (!diceEl) return;
  try {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    diceEl.muted = false;
    const p = diceEl.play();
    if (p) void p.catch(() => {});
  } catch {
    /* ignore */
  }
}
