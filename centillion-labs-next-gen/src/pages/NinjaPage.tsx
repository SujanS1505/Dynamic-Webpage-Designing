import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NinjaGLBViewer } from '../components/NinjaGLBViewer';
import type { NinjaAction, NinjaMode } from '../components/NinjaGLBViewer';

const NINJA_CSS = `
#ninja-rt, #ninja-rt[data-theme="dark"] {
  --red: #e84118; --red2: #ff2d00;
  --red-dim: rgba(232,65,24,0.15); --red-glow: rgba(232,65,24,0.6);
  --bg: #070304; --bg2: #0f0505; --bg3: #160808;
  --card: #110404; --card-b: rgba(232,65,24,0.18);
  --text: #fff; --sub: rgba(255,255,255,0.85);
  --muted: rgba(255,255,255,0.45);
  --nav-bg: rgba(7,3,4,0.88); --nav-border: rgba(232,65,24,0.25);
  --panel-bg: rgba(0,0,0,0.78);
  --scanline-color: rgba(0,0,0,0.07);
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Barlow Condensed', sans-serif; --cond: 'Barlow Condensed', sans-serif;
}

#ninja-rt[data-theme="light"] {
  --red: #c42800; --red2: #a82200;
  --red-dim: rgba(196,40,0,0.12); --red-glow: rgba(196,40,0,0.4);
  --bg: #fdf2ee; --bg2: #f9e8e3; --bg3: #f5ddd6;
  --card: #fffafa; --card-b: rgba(196,40,0,0.2);
  --text: #1a0300; --sub: rgba(26,3,0,0.82);
  --muted: rgba(26,3,0,0.5);
  --nav-bg: rgba(253,242,238,0.92); --nav-border: rgba(196,40,0,0.22);
  --panel-bg: rgba(253,242,238,0.92);
  --scanline-color: rgba(150,30,0,0.03);
}

#ninja-rt { position: fixed; inset: 0; z-index: 9999; overflow: hidden;
  font-family: var(--sans);
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, var(--red-dim) 0%, transparent 70%),
    radial-gradient(ellipse 50% 50% at 90% 80%, rgba(255,45,0,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 50% 50% at 10% 90%, rgba(232,65,24,0.07) 0%, transparent 70%),
    linear-gradient(180deg, var(--bg2), var(--bg));
  color: var(--sub);
}

#ninja-rt[data-theme="light"] {
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(196,40,0,0.14) 0%, transparent 70%),
    radial-gradient(ellipse 50% 50% at 90% 80%, rgba(196,40,0,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 50% 50% at 10% 90%, rgba(196,40,0,0.06) 0%, transparent 70%),
    linear-gradient(180deg, var(--bg2), var(--bg));
}

#ninja-scanlines { position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, var(--scanline-color) 3px, var(--scanline-color) 4px); }

.ninja-back {
  position: fixed; top: 1rem; left: 1rem; z-index: 10003;
  background: var(--nav-bg); backdrop-filter: blur(12px);
  border: 1.5px solid var(--nav-border); color: var(--red);
  padding: .5rem 1.1rem; border-radius: 6px; cursor: pointer;
  font-size: .78rem; font-family: var(--cond); font-weight: 700;
  letter-spacing: .12em; display: flex; align-items: center; gap: .5rem;
  box-shadow: 0 0 20px rgba(232,65,24,0.2);
}

.ninja-widget { position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); z-index: 10003; }
.ninja-btn-row { display: flex; align-items: center; justify-content: center; gap: .6rem; }
.ninja-btn {
  width: 44px; height: 44px; border-radius: 12px; border: 1px solid rgba(232,65,24,0.35);
  background: var(--nav-bg); backdrop-filter: blur(12px);
  color: var(--red); cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
  box-shadow: 0 0 18px rgba(232,65,24,0.12);
}
.ninja-btn:hover { border-color: rgba(232,65,24,0.6); }
.ninja-btn[aria-expanded="true"] { border-color: rgba(232,65,24,0.75); }
.ninja-panel {
  position: absolute; top: calc(100% + 10px); right: auto;
  width: min(320px, calc(100vw - 2rem));
  margin: 0;
  inset: unset;
  left: 50%;
  bottom: auto;
  transform: translateX(-50%);
  border-radius: 14px;
  border: 1px solid rgba(232,65,24,0.22);
  background: var(--panel-bg); backdrop-filter: blur(16px);
  padding: 14px 14px 12px;
  outline: none;
  box-sizing: border-box;
  display: block;
  max-height: calc(100vh - 90px);
  overflow: auto;
  transform: none;
}
.ninja-panel::backdrop { background: transparent; }
.ninja-panel h4 { margin: 0 0 8px; font-family: var(--cond); letter-spacing: .14em; text-transform: uppercase; color: var(--text); font-size: .9rem; }
.n-row { display: flex; align-items: center; justify-content: space-between; gap: .6rem; margin: .55rem 0; }
.n-row label { font-family: var(--mono); font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.n-row input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--red); }
.n-row input[type="range"] { width: 150px; }
.n-row select {
  background: rgba(0,0,0,0.18);
  border: 1px solid var(--nav-border);
  color: var(--text);
  font-size: .72rem;
  padding: 6px 8px;
  border-radius: 10px;
  outline: none;
}
.n-mini { font-family: var(--mono); font-size: .62rem; color: var(--muted); }

.ninja-roamer {
  position: fixed; left: 5px; top: 0;
  z-index: 10002;
  touch-action: none;
  user-select: none;
  cursor: grab;
  filter: drop-shadow(0 0 24px rgba(232,65,24,0.12));
}
.ninja-roamer.dragging { cursor: grabbing; transition: none !important; }
.ninja-roamer.off { opacity: 0; pointer-events: none; }
.ninja-roamer .ninja-aura {
  position: absolute; inset: -30%;
  background: radial-gradient(ellipse at center, rgba(232,65,24,0.35) 0%, transparent 70%);
  filter: blur(18px);
  opacity: 0.8;
  animation: ninjaPulse 1.1s ease-in-out infinite;
}
.ninja-roamer.stealth .ninja-aura { opacity: 0.15; }
.ninja-roamer.rage .ninja-aura { background: radial-gradient(ellipse at center, rgba(255,80,0,0.55) 0%, transparent 70%); animation-duration: .6s; }
@keyframes ninjaPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }

.ninja-title {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  font-family: var(--cond);
  font-weight: 800;
  letter-spacing: .25em;
  padding-left: .25em; /* Compensate for letter-spacing at end */
  text-transform: uppercase;
  font-size: clamp(3rem, 6vw, 6rem);
  color: #200505;
  text-align: center;
  white-space: nowrap;
  opacity: 0.85;
  text-shadow: 0 0 20px rgba(232, 65, 24, 0.5), 0 0 40px rgba(232, 65, 24, 0.3);
  animation: ninja-glitch-anim 5s infinite;
}
#ninja-rt[data-theme="light"] .ninja-title {
  color: #1a0300;
  text-shadow: 0 0 20px rgba(196, 40, 0, 0.4), 0 0 40px rgba(196, 40, 0, 0.2);
  opacity: 0.9;
}
.ninja-title span {
  color: var(--red);
}
@keyframes ninja-glitch-anim {
  0%, 94%, 98%, 100% { transform: translate(-50%, -50%); opacity: 0.85; }
  95%, 97% { transform: translate(-50.5%, -50%); opacity: 1; }
  96% { transform: translate(-49.5%, -50%); opacity: 1; }
}

`;

const ACTION_LABELS: Record<NinjaAction, string> = {
  run: 'Walk',
  fight: 'Fight Idle',
  jump: 'Jumping',
  martelo: 'Martelo 2',
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const NinjaPage: React.FC = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('ninja-theme') as 'dark' | 'light') || 'dark'
  );

  const [ninjaMode, setNinjaMode] = useState<NinjaMode>('patrol');
  const [ninjaAction, setNinjaAction] = useState<NinjaAction>('run');
  const [ninjaEnabled, setNinjaEnabled] = useState(true);
  const [ninjaSpeed, setNinjaSpeed] = useState(1);
  const [ninjaScale, setNinjaScale] = useState(2);
  const [ninjaReplicas, setNinjaReplicas] = useState(1);

  const [ninjaAutopilot, setNinjaAutopilot] = useState(true);
  const [ninjaFollowCursor, setNinjaFollowCursor] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ninja-theme', theme);
  }, [theme]);

  const ninjaRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const replicaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Particle canvas ───────────────────────────────────────────────────────
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const cx = cv.getContext('2d')!;
    let W = 0, H = 0, rafId = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let ns: P[] = [];
    const getColor = () => theme === 'light' ? 'rgba(196,40,0,' : 'rgba(232,65,24,';
    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    const make = (n: number) => { ns = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.5 + .5, a: Math.random() * .45 + .15 })); };
    const draw = () => {
      cx.clearRect(0, 0, W, H);
      const c = getColor();
      for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) { const dx = ns[i].x - ns[j].x, dy = ns[i].y - ns[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 140) { cx.beginPath(); cx.strokeStyle = c + (1 - d / 140) * .25 + ')'; cx.lineWidth = .5; cx.moveTo(ns[i].x, ns[i].y); cx.lineTo(ns[j].x, ns[j].y); cx.stroke(); } }
      ns.forEach(n => { cx.beginPath(); cx.arc(n.x, n.y, n.r, 0, Math.PI * 2); cx.fillStyle = c + n.a + ')'; cx.fill(); n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; });
      rafId = requestAnimationFrame(draw);
    };
    const onResize = () => { resize(); make(90); };
    window.addEventListener('resize', onResize);
    resize(); make(90); draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, [theme]);

  const cfgRef = useRef({ enabled: true, speed: 1, scale: 2, autopilot: true, follow: false });
  useEffect(() => {
    cfgRef.current = {
      enabled: ninjaEnabled,
      speed: ninjaSpeed,
      scale: ninjaScale,
      autopilot: ninjaAutopilot,
      follow: ninjaFollowCursor,
    };
  }, [ninjaEnabled, ninjaSpeed, ninjaScale, ninjaAutopilot, ninjaFollowCursor]);

  // Inject RT-style background + widget + ninja styles
  useEffect(() => {
    const style = document.createElement('style');
    style.dataset.ninjaRt = 'true';
    style.textContent = NINJA_CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Close controls when clicking outside
  useEffect(() => {
    if (!widgetOpen) return;
    const onDown = (e: Event) => {
      const el = widgetRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setWidgetOpen(false);
    };
    globalThis.addEventListener('pointerdown', onDown);
    return () => globalThis.removeEventListener('pointerdown', onDown);
  }, [widgetOpen]);

  // Replica patrol loops
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    for (let ri = 1; ri < ninjaReplicas; ri++) {
      const el = replicaRefs.current[ri - 1];
      if (!el) continue;

      let state = ri % 4;
      let cX = [5, globalThis.innerWidth - 100, globalThis.innerWidth - 100, 5][state];
      let cY = [0, 0, globalThis.innerHeight - 130, globalThis.innerHeight - 130][state];
      let mt: ReturnType<typeof setTimeout> | null = null;

      const patrol = () => {
        const cfg = cfgRef.current;
        if (!cfg.enabled) return;
        const w = globalThis.innerWidth;
        const h = globalThis.innerHeight;
        const sc = clamp(cfg.scale ?? 2, 0.6, 6);
        const NW = 110 * sc;
        const NH = 145 * sc;
        const oX_L = 16 * sc;
        const oX_R = 25 * sc;
        const oY_T = 16 * sc;
        const oY_B = 14 * sc;

        let tx: number;
        let ty: number;
        let tf = '';
        if (state === 0) { tx = w - NW + oX_R; ty = -oY_T; tf = 'rotate(180deg) scaleX(-1)'; state = 1; }
        else if (state === 1) { tx = w - NW + oX_R; ty = h - NH + oY_B; tf = 'rotate(-90deg) scaleX(-1)'; state = 2; }
        else if (state === 2) { tx = -oX_L; ty = h - NH + oY_B; tf = 'rotate(0deg) scaleX(-1)'; state = 3; }
        else { tx = -oX_L; ty = -oY_T; tf = 'rotate(90deg) scaleX(-1)'; state = 0; }

        const spd = 220 * clamp(cfg.speed ?? 1, 0.5, 3) * 0.8;
        const dist = Math.hypot(tx - cX, ty - cY);
        const dur = Math.max(dist / spd, 0.5);
        el.style.transition = `left ${dur}s linear, top ${dur}s linear, transform 0.2s ease`;
        el.style.transform = tf;
        cX = tx;
        cY = ty;
        el.style.left = cX + 'px';
        el.style.top = cY + 'px';
        mt = setTimeout(patrol, dur * 1000 + 500);
      };

      el.style.left = cX + 'px';
      el.style.top = cY + 'px';
      el.style.transform = ['rotate(180deg) scaleX(-1)', 'rotate(-90deg) scaleX(-1)', 'rotate(0deg) scaleX(-1)', 'rotate(90deg) scaleX(-1)'][state];
      const initT = setTimeout(() => patrol(), 600 + ri * 800);
      cleanups.push(() => {
        if (mt) clearTimeout(mt);
        clearTimeout(initT);
      });
    }
    return () => cleanups.forEach(fn => fn());
  }, [ninjaReplicas]);

  // Main roaming ninja (circles the viewport) + optional drag + follow cursor
  useEffect(() => {
    const ninja = ninjaRef.current;
    if (!ninja) return;

    const BASE_W = 110;
    const BASE_H = 145;
    const baseSpd = 220;

    let state = 0;
    let cX = 5;
    let cY = 0;
    let mt: ReturnType<typeof setTimeout> | null = null;

    let dragging = false;
    let dsX = 0;
    let dsY = 0;
    let nsX = 0;
    let nsY = 0;

    const getSize = () => {
      const sc = clamp(cfgRef.current.scale ?? 2, 0.6, 6);
      return { w: BASE_W * sc, h: BASE_H * sc, sc };
    };

    const patrol = () => {
      const cfg = cfgRef.current;
      if (!cfg.enabled || dragging || !cfg.autopilot || cfg.follow) return;

      const w = globalThis.innerWidth;
      const h = globalThis.innerHeight;
      const { w: NW, h: NH, sc } = getSize();
      const oX_L = 16 * sc;
      const oX_R = 25 * sc;
      const oY_T = 16 * sc;
      const oY_B = 14 * sc;

      let tx: number;
      let ty: number;
      let tf = '';
      if (state === 0) { tx = w - NW + oX_R; ty = -oY_T; tf = 'rotate(180deg) scaleX(-1)'; state = 1; }
      else if (state === 1) { tx = w - NW + oX_R; ty = h - NH + oY_B; tf = 'rotate(-90deg) scaleX(-1)'; state = 2; }
      else if (state === 2) { tx = -oX_L; ty = h - NH + oY_B; tf = 'rotate(0deg) scaleX(-1)'; state = 3; }
      else { tx = -oX_L; ty = -oY_T; tf = 'rotate(90deg) scaleX(-1)'; state = 0; }

      const spd = baseSpd * clamp(cfg.speed ?? 1, 0.5, 3);
      const dist = Math.hypot(tx - cX, ty - cY);
      const dur = Math.max(dist / spd, 0.5);
      ninja.style.transition = `left ${dur}s linear, top ${dur}s linear, transform 0.2s ease`;
      ninja.style.transform = tf;
      cX = tx;
      cY = ty;
      ninja.style.left = cX + 'px';
      ninja.style.top = cY + 'px';

      mt = setTimeout(patrol, dur * 1000 + 500);
    };

    const onDown = (e: PointerEvent) => {
      const cfg = cfgRef.current;
      if (!cfg.enabled) return;
      dragging = true;
      if (mt) clearTimeout(mt);
      mt = null;

      ninja.classList.add('dragging');
      const r = ninja.getBoundingClientRect();
      cX = r.left;
      cY = r.top;
      ninja.style.transition = 'none';
      ninja.style.left = cX + 'px';
      ninja.style.top = cY + 'px';
      ninja.style.transform = 'rotate(0deg) scaleX(1)';

      dsX = e.clientX;
      dsY = e.clientY;
      nsX = cX;
      nsY = cY;
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      const cfg = cfgRef.current;
      if (!cfg.enabled) return;

      if (dragging) {
        cX = nsX + e.clientX - dsX;
        cY = nsY + e.clientY - dsY;
        ninja.style.left = cX + 'px';
        ninja.style.top = cY + 'px';
        return;
      }

      if (cfg.follow) {
        const { w: NW, h: NH } = getSize();
        cX = Math.max(0, Math.min(e.clientX - NW / 2, globalThis.innerWidth - NW));
        cY = Math.max(0, Math.min(e.clientY - NH / 2, globalThis.innerHeight - NH));
        ninja.style.transition = 'left 0.08s linear, top 0.08s linear, transform 0.2s ease';
        ninja.style.transform = 'rotate(0deg) scaleX(1)';
        ninja.style.left = cX + 'px';
        ninja.style.top = cY + 'px';
      }
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      ninja.classList.remove('dragging');
      const cfg = cfgRef.current;
      if (cfg.autopilot && !cfg.follow) mt = setTimeout(patrol, 400);
    };

    // Init
    ninja.style.left = cX + 'px';
    ninja.style.top = cY + 'px';
    ninja.style.transform = 'rotate(180deg) scaleX(-1)';

    ninja.addEventListener('pointerdown', onDown as EventListener);
    globalThis.addEventListener('pointermove', onMove as EventListener);
    globalThis.addEventListener('pointerup', onUp as EventListener);

    const sid = setTimeout(patrol, 900);
    const heartbeat = setInterval(() => {
      const cfg = cfgRef.current;
      if (!cfg.enabled || dragging) return;
      if (!cfg.autopilot || cfg.follow) return;
      if (mt) return;
      patrol();
    }, 1200);

    return () => {
      if (mt) clearTimeout(mt);
      clearTimeout(sid);
      clearInterval(heartbeat);
      ninja.removeEventListener('pointerdown', onDown as EventListener);
      globalThis.removeEventListener('pointermove', onMove as EventListener);
      globalThis.removeEventListener('pointerup', onUp as EventListener);
    };
  }, []);

  const NinjaBody = useCallback(() => (
    <>
      <div className="ninja-aura" />
      <NinjaGLBViewer mode={ninjaMode} action={ninjaAction} speed={ninjaSpeed} />
    </>
  ), [ninjaAction, ninjaMode, ninjaSpeed]);

  const speedLabel = useMemo(() => ninjaSpeed.toFixed(2), [ninjaSpeed]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div id="ninja-rt" data-theme={theme}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div id="ninja-scanlines" />

      <div className="ninja-title">Ninja <span>Playground</span></div>

      <button className="ninja-back" onClick={() => navigate(-1)} type="button">
        ← BACK
      </button>

      <div className="ninja-widget" ref={widgetRef}>
        <div className="ninja-btn-row">
          <button
            className="ninja-btn"
            type="button"
            onClick={() => setWidgetOpen(v => !v)}
            aria-expanded={widgetOpen}
            title="Ninja controls"
          >
            🥷
          </button>

          <button
            className="ninja-btn"
            type="button"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {widgetOpen && (
          <dialog className="ninja-panel" aria-label="Ninja controls" open>
            <h4>Ninja Controls</h4>

            <div className="n-row">
              <label htmlFor="n-enabled">Enabled</label>
              <input id="n-enabled" type="checkbox" checked={ninjaEnabled} onChange={(e) => setNinjaEnabled(e.target.checked)} />
            </div>

            <div className="n-row">
              <label htmlFor="n-speed">Speed</label>
              <input
                id="n-speed"
                type="range"
                min={0.5}
                max={3}
                step={0.05}
                value={ninjaSpeed}
                onChange={(e) => setNinjaSpeed(Number.parseFloat(e.target.value))}
              />
              <span className="n-mini">x{speedLabel}</span>
            </div>

            <div className="n-row">
              <label htmlFor="n-size">Size</label>
              <input
                id="n-size"
                type="range"
                min={0.6}
                max={6}
                step={0.1}
                value={ninjaScale}
                onChange={(e) => setNinjaScale(Number.parseFloat(e.target.value))}
              />
              <span className="n-mini">x{ninjaScale.toFixed(1)}</span>
            </div>

            <div className="n-row">
              <label htmlFor="n-replicas">Replicas</label>
              <input
                id="n-replicas"
                type="range"
                min={1}
                max={5}
                step={1}
                value={ninjaReplicas}
                onChange={(e) => setNinjaReplicas(Number.parseInt(e.target.value))}
              />
              <span className="n-mini">{ninjaReplicas}×</span>
            </div>

            <div className="n-row">
              <label htmlFor="n-autop">Autopilot</label>
              <input id="n-autop" type="checkbox" checked={ninjaAutopilot} onChange={(e) => setNinjaAutopilot(e.target.checked)} />
            </div>

            <div className="n-row">
              <label htmlFor="n-follow">Follow Cursor</label>
              <input id="n-follow" type="checkbox" checked={ninjaFollowCursor} onChange={(e) => setNinjaFollowCursor(e.target.checked)} />
            </div>

            <div className="n-row">
              <label htmlFor="n-action">Action</label>
              <select
                id="n-action"
                value={ninjaAction}
                onChange={(e) => {
                  const val = e.target.value as NinjaAction;
                  setNinjaAction(val);
                  if (val === 'fight' || val === 'martelo' || val === 'jump') setNinjaAutopilot(false);
                }}
              >
                {(Object.keys(ACTION_LABELS) as NinjaAction[]).map((k) => (
                  <option key={k} value={k}>{ACTION_LABELS[k]}</option>
                ))}
              </select>
            </div>

            <div className="n-row">
              <label htmlFor="n-mode">Mode</label>
              <select id="n-mode" value={ninjaMode} onChange={(e) => setNinjaMode(e.target.value as NinjaMode)}>
                <option value="patrol">Patrol</option>
                <option value="stealth">Stealth</option>
                <option value="rage">Rage</option>
              </select>
            </div>


          </dialog>
        )}
      </div>

      {/* Primary ninja */}
      <div
        ref={ninjaRef}
        className={`ninja-roamer ${ninjaMode}${ninjaEnabled ? '' : ' off'}`}
        aria-hidden={!ninjaEnabled}
        style={{
          width: 90 * ninjaScale,
          height: 120 * ninjaScale,
          borderRadius: 12,
          position: 'fixed',
        }}
      >
        {NinjaBody()}
      </div>

      {/* Replicas */}
      {Array.from({ length: ninjaReplicas - 1 }, (_, i) => (
        <div
          key={`replica-${i}`}
          ref={(el) => { replicaRefs.current[i] = el; }}
          className={`ninja-roamer ${ninjaMode}${ninjaEnabled ? '' : ' off'}`}
          aria-hidden
          style={{
            width: 90 * ninjaScale,
            height: 120 * ninjaScale,
            borderRadius: 12,
            position: 'fixed',
            opacity: 0.65,
          }}
        >
          {NinjaBody()}
        </div>
      ))}
    </div>
  );
};
