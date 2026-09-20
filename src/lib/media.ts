export const LIVE_AUDIO: MediaTrackConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  channelCount: 1,
};

export const LIVE_VIDEO: MediaTrackConstraints = {
  facingMode: "user",
  width: { ideal: 1280 },
  height: { ideal: 720 },
  frameRate: { ideal: 24 },
};

export const LIVE_VIDEO_WEAK: MediaTrackConstraints = {
  facingMode: "user",
  width: { ideal: 640 },
  height: { ideal: 360 },
  frameRate: { ideal: 12 },
};

export function liveConstraints(audio: boolean, video = true, weak = false): MediaStreamConstraints {
  return {
    audio: audio ? LIVE_AUDIO : false,
    video: video ? (weak ? LIVE_VIDEO_WEAK : LIVE_VIDEO) : false,
  };
}

export function setTrackOn(stream: MediaStream | null, kind: "audio" | "video", on: boolean) {
  stream?.getTracks().forEach((t) => {
    if (t.kind === kind) t.enabled = on;
  });
}

export function applyLinkQuality(stream: MediaStream | null, weak: boolean) {
  const track = stream?.getVideoTracks()[0];
  if (!track) return;
  void track.applyConstraints(weak ? LIVE_VIDEO_WEAK : LIVE_VIDEO).catch(() => {});
}

export function watchVoice(stream: MediaStream, onSpeak: (on: boolean) => void) {
  const track = stream.getAudioTracks()[0];
  if (!track) return () => {};
  const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return () => {};
  const ctx = new Ctx();
  const src = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = 0.4;
  src.connect(analyser);
  const data = new Uint8Array(analyser.fftSize);
  let raf = 0;
  let last = false;
  const tick = () => {
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i]! - 128) / 128;
      sum += v * v;
    }
    const on = Math.sqrt(sum / data.length) > 0.045;
    if (on !== last) {
      last = on;
      onSpeak(on);
    }
    raf = requestAnimationFrame(tick);
  };
  void ctx.resume().then(() => tick());
  return () => {
    cancelAnimationFrame(raf);
    src.disconnect();
    void ctx.close();
  };
}
