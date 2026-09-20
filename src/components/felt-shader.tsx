import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
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

function compile(gl: WebGLRenderingContext, type: number, src: string) {
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

export function FeltShader() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, preserveDrawingBuffer: false });
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
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

    const draw = (now: number) => {
      if (dead) return;
      size();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 0 : now * 0.001);
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

  return <canvas ref={ref} className="felt-shader" aria-hidden />;
}
