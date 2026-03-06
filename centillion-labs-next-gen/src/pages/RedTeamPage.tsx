import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLenis } from '../lenisStore';

type NinjaMode = 'patrol' | 'stealth' | 'rage';
type NinjaVariant = 'shadow' | 'ghost' | 'oni' | 'neon' | 'phantom' | 'void';

interface Props { onClose: () => void }

// ─── Scoped CSS injected into <head> while overlay is mounted ───
const RT_CSS = `
#rt-page, #rt-page[data-theme="dark"] {
  --red: #e84118; --red2: #ff2d00;
  --red-dim: rgba(232,65,24,0.15); --red-glow: rgba(232,65,24,0.6);
  --crimson: #8b0000;
  --bg: #070304; --bg2: #0f0505; --bg3: #160808;
  --card: #110404; --card-b: rgba(232,65,24,0.18);
  --text: #fff; --heading: #fff; --sub: rgba(255,255,255,0.85);
  --muted: rgba(255,255,255,0.45); --dim: rgba(255,255,255,0.2);
  --nav-bg: rgba(7,3,4,0.88); --nav-border: rgba(232,65,24,0.25);
  --term-bg: #050202; --term-hd: #0e0404;
  --scanline-color: rgba(0,0,0,0.07);
  --hero-grad1: rgba(139,0,0,0.25); --hero-grad2: rgba(232,65,24,0.08);
  --grid-line: rgba(232,65,24,0.04);
  --marquee-bg: rgba(232,65,24,0.05); --marquee-item: rgba(232,65,24,0.75);
  --marquee-sep: rgba(255,255,255,0.15);
  --stat-hover: rgba(139,0,0,0.15); --tilt-shadow: rgba(0,0,0,0.5);
  --matrix-head: rgba(232,65,24,0.07); --matrix-hover: rgba(232,65,24,0.04);
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Barlow Condensed', sans-serif; --cond: 'Barlow Condensed', sans-serif;
}
#rt-page[data-theme="light"] {
  --red: #c42800; --red2: #a82200;
  --red-dim: rgba(196,40,0,0.12); --red-glow: rgba(196,40,0,0.4);
  --crimson: #7a1500;
  --bg: #fdf2ee; --bg2: #f9e8e3; --bg3: #f5ddd6;
  --card: #fffafa; --card-b: rgba(196,40,0,0.2);
  --heading: #1a0300; --sub: rgba(26,3,0,0.82);
  --muted: rgba(26,3,0,0.5); --dim: rgba(26,3,0,0.28);
  --nav-bg: rgba(253,242,238,0.92); --nav-border: rgba(196,40,0,0.22);
  --term-bg: #0a0202; --term-hd: #0e0303;
  --scanline-color: rgba(150,30,0,0.03);
  --hero-grad1: rgba(196,40,0,0.14); --hero-grad2: rgba(232,65,24,0.06);
  --grid-line: rgba(196,40,0,0.06);
  --marquee-bg: rgba(196,40,0,0.06); --marquee-item: rgba(196,40,0,0.85);
  --marquee-sep: rgba(26,3,0,0.2);
  --stat-hover: rgba(196,40,0,0.08); --tilt-shadow: rgba(100,20,0,0.2);
  --matrix-head: rgba(196,40,0,0.06); --matrix-hover: rgba(196,40,0,0.04);
}
#rt-page { font-family: var(--sans); background: var(--bg); color: var(--sub);
  overflow-x: hidden; overflow-y: auto; height: 100%;
  transition: background 0.4s ease, color 0.4s ease;
  font-stretch: condensed; }
#rt-page ::selection { background: rgba(232,65,24,0.4); color: #fff; }
#rt-page ::-webkit-scrollbar { width: 4px; }
#rt-page ::-webkit-scrollbar-track { background: var(--bg); }
#rt-page ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }
#rt-scanlines { position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, var(--scanline-color) 3px, var(--scanline-color) 4px); }
#rt-site { position: relative; z-index: 2; }
#rt-page nav { position: sticky; top: 0; z-index: 10002; height: 54px;
  backdrop-filter: blur(20px); background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(1.2rem,4vw,3rem); padding-left: 10.5rem;
  transition: background 0.4s ease, border-color 0.4s ease; }
.rt-nav-logo { display: flex; align-items: center; gap: .6rem; text-decoration: none; }
.rt-nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red);
  animation: rt-pulse-dot 1.4s ease-in-out infinite; box-shadow: 0 0 12px var(--red-glow); }
@keyframes rt-pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.7} }
.rt-nav-wordmark { font-family: var(--cond); font-weight: 800; font-size: .95rem;
  letter-spacing: .18em; color: var(--sub); text-transform: uppercase; }
.rt-nav-wordmark span { color: var(--red); }
.rt-nav-links { display: flex; gap: 2rem; list-style: none; }
.rt-nav-links a { font-family: var(--mono); font-size: .65rem; font-weight: 500;
  letter-spacing: .12em; color: var(--muted); text-decoration: none; text-transform: uppercase; transition: color .2s; }
.rt-nav-links a:hover { color: var(--red); }
.rt-nav-r { display: flex; align-items: center; gap: .6rem; }
.rt-ninja-widget { position: relative; display: flex; align-items: center; }
.rt-ninja-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(232,65,24,0.1); border: 1px solid rgba(232,65,24,0.3);
  color: var(--red); cursor: pointer; font-size: .9rem;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s; flex-shrink: 0;
}
.rt-ninja-btn[aria-expanded="true"], .rt-ninja-btn:hover {
  background: rgba(232,65,24,0.18); box-shadow: 0 0 14px rgba(232,65,24,0.35);
}
.rt-ninja-panel {
  position: absolute; right: 0; top: 42px; width: 260px;
  background: rgba(0,0,0,0.72); backdrop-filter: blur(14px);
  border: 1.5px solid rgba(232,65,24,0.45); border-radius: 10px;
  padding: .75rem .8rem; box-shadow: 0 0 24px rgba(232,65,24,0.18);
}
.rt-ninja-panel h4 {
  margin: 0 0 .55rem; font-family: var(--cond);
  font-size: .85rem; font-weight: 800; letter-spacing: .18em;
  text-transform: uppercase; color: var(--sub);
}
.rt-ninja-row { display: flex; align-items: center; justify-content: space-between; gap: .6rem; margin: .45rem 0; }
.rt-ninja-row label { font-family: var(--mono); font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.rt-ninja-row input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--red); }
.rt-ninja-row input[type="range"] { width: 120px; }
.rt-ninja-row select {
  width: 130px; background: rgba(232,65,24,.08);
  border: 1px solid rgba(232,65,24,.35); border-radius: 6px;
  color: var(--sub); padding: .25rem .35rem;
  font-family: var(--mono); font-size: .62rem; letter-spacing: .08em;
  outline: none;
}
.rt-ninja-hint {
  margin-top: .6rem; padding-top: .6rem; border-top: 1px solid rgba(232,65,24,.25);
  font-family: var(--mono); font-size: .58rem; color: var(--muted);
  letter-spacing: .08em; line-height: 1.4;
}
.rt-ninja-mini {
  display: inline-flex; align-items: center; justify-content: center;
  padding: .05rem .35rem; border-radius: 4px;
  border: 1px solid rgba(232,65,24,.3); background: rgba(232,65,24,.08);
  color: var(--red); font-weight: 800;
}
.rt-theme-btn { width: 32px; height: 32px; border-radius: 50%;
  background: rgba(232,65,24,0.1); border: 1px solid rgba(232,65,24,0.3);
  color: var(--red); cursor: pointer; font-size: .9rem;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.3s, box-shadow 0.2s; flex-shrink: 0; }
.rt-theme-btn:hover { background: rgba(232,65,24,0.18); box-shadow: 0 0 14px rgba(232,65,24,0.35); transform: rotate(20deg); }
.rt-nav-cta { font-family: var(--mono); font-size: .65rem; font-weight: 700;
  letter-spacing: .14em; color: var(--red); text-transform: uppercase;
  border: 1px solid rgba(232,65,24,.5); padding: .35rem 1rem; border-radius: 4px;
  cursor: pointer; background: transparent; transition: background .2s, box-shadow .2s;
  text-decoration: none; display: inline-block; }
.rt-nav-cta:hover { background: rgba(232,65,24,.1); box-shadow: 0 0 20px rgba(232,65,24,.3); }
.rt-hero { min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  padding: 5rem clamp(1.2rem,5vw,4rem) 3rem; position: relative; overflow: hidden; }
.rt-hero-bg-grad { position: absolute; inset: 0; pointer-events: none; will-change: transform;
  background: radial-gradient(ellipse 80% 60% at 50% 30%, var(--hero-grad1) 0%, transparent 65%),
    radial-gradient(ellipse 50% 40% at 20% 80%, var(--hero-grad2) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 80%, var(--hero-grad2) 0%, transparent 60%); }
.rt-grid-deco { position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent); }
.rt-hero-eyebrow { font-family: var(--mono); font-size: .65rem; font-weight: 700;
  letter-spacing: .3em; color: var(--red); text-transform: uppercase;
  margin-bottom: 1.5rem; display: flex; align-items: center; gap: .8rem;
  opacity: 0; animation: rt-fadeUp .8s ease .3s forwards; }
.rt-hero-eyebrow::before, .rt-hero-eyebrow::after { content: ''; display: block;
  width: 40px; height: 1px; background: var(--red); }
.rt-hero-title { font-family: var(--cond); font-weight: 800;
  font-size: clamp(2.5rem,8vw,6rem); line-height: .88; letter-spacing: -.01em;
  color: var(--heading); margin-bottom: 1rem;
  opacity: 0; animation: rt-fadeUp .8s ease .5s forwards; transition: color 0.4s; }
.rt-glitch { position: relative; display: inline-block; color: var(--red); }
.rt-glitch::before, .rt-glitch::after { content: attr(data-text); position: absolute; inset: 0; pointer-events: none; }
.rt-glitch::before { color: #00ffff; animation: rt-glitch-1 3.5s infinite; clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%); }
.rt-glitch::after { color: #ff00ff; animation: rt-glitch-2 3.5s infinite; clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
@keyframes rt-glitch-1 {
  0%,90%,100%{transform:translate(0,0);opacity:0} 91%{transform:translate(-3px,1px);opacity:.8}
  93%{transform:translate(3px,-1px);opacity:.8} 95%{transform:translate(-2px,2px);opacity:.6} 97%{transform:translate(0,0);opacity:0} }
@keyframes rt-glitch-2 {
  0%,90%,100%{transform:translate(0,0);opacity:0} 92%{transform:translate(4px,-2px);opacity:.7}
  94%{transform:translate(-3px,1px);opacity:.7} 96%{transform:translate(2px,-1px);opacity:.5} 98%{transform:translate(0,0);opacity:0} }
.rt-hero-sub { max-width: 640px; color: var(--muted); font-family: var(--cond); font-weight: 400; font-size: clamp(.9rem,2vw,1.05rem);
  line-height: 1.8; margin: 0 auto 2.5rem;
  opacity: 0; animation: rt-fadeUp .8s ease .7s forwards; transition: color 0.4s; }
.rt-hero-sub em { color: var(--red); font-style: normal; }
.rt-hero-scroll-hint { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: .4rem;
  opacity: 0; animation: rt-fadeIn 1s ease 1.4s forwards; }
.rt-scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, transparent, var(--red)); animation: rt-scroll-ln 1.8s ease-in-out infinite; }
@keyframes rt-scroll-ln {
  0%{opacity:0;transform:scaleY(0);transform-origin:top} 50%{opacity:1;transform:scaleY(1);transform-origin:top}
  51%{transform:scaleY(1);transform-origin:bottom} 100%{opacity:0;transform:scaleY(0);transform-origin:bottom} }
.rt-scroll-label { font-family: var(--mono); font-size: .55rem; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }
@keyframes rt-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes rt-fadeIn { to{opacity:1} }
.rt-btn-primary { background: var(--red); color: #fff; font-family: var(--mono); font-size: .72rem;
  font-weight: 700; letter-spacing: .14em; text-transform: uppercase; padding: .75rem 2rem;
  border: none; border-radius: 6px; cursor: pointer; transition: transform .2s, box-shadow .2s;
  box-shadow: 0 4px 24px rgba(232,65,24,.35); text-decoration: none; display: inline-block;
  position: relative; overflow: hidden; }
.rt-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(232,65,24,.55); }
.rt-btn-ghost { background: transparent; color: var(--sub); font-family: var(--mono); font-size: .72rem;
  font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: .75rem 2rem;
  border: 1px solid rgba(232,65,24,.3); border-radius: 6px; cursor: pointer;
  transition: border-color .2s, color .2s; text-decoration: none; display: inline-block; }
.rt-btn-ghost:hover { border-color: rgba(232,65,24,.7); color: var(--red); }
.rt-ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3);
  transform: scale(0); animation: rt-ripple-anim .6s linear; pointer-events: none; }
@keyframes rt-ripple-anim { to{transform:scale(4);opacity:0} }
.rt-marquee-strip { overflow: hidden; background: var(--marquee-bg);
  border-top: 1px solid rgba(232,65,24,.2); border-bottom: 1px solid rgba(232,65,24,.2);
  padding: .65rem 0; white-space: nowrap; }
.rt-marquee-inner { display: inline-block; animation: rt-marquee 22s linear infinite; }
.rt-marquee-inner span { font-family: var(--mono); font-size: .62rem; font-weight: 700;
  letter-spacing: .18em; color: var(--marquee-item); text-transform: uppercase; padding: 0 2.5rem; }
.rt-marquee-inner span.sep { color: var(--marquee-sep); padding: 0; }
@keyframes rt-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.rt-section { padding: clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,5rem); max-width: 1260px; margin: 0 auto; }
.rt-section-label { font-family: var(--mono); font-size: .6rem; font-weight: 700;
  letter-spacing: .3em; color: var(--red); text-transform: uppercase;
  margin-bottom: .7rem; display: flex; align-items: center; gap: .6rem; }
.rt-section-label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--red); }
.rt-section-title { font-family: var(--cond); font-weight: 800;
  font-size: clamp(2rem,5vw,3.4rem); line-height: 1; color: var(--heading);
  margin-bottom: 1rem; letter-spacing: -.01em; transition: color 0.4s; }
#rt-page[data-theme="dark"] .rt-section-title { color: #fff; }
.rt-section-title .accent { color: var(--red); }
.rt-section-desc { max-width: 580px; color: var(--muted); font-family: var(--cond); font-weight: 400; font-size: .95rem; line-height: 1.7; transition: color 0.4s; }
.rt-stats-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
  gap: 1px; background: rgba(232,65,24,.1);
  border: 1px solid rgba(232,65,24,.1); border-radius: 12px; overflow: hidden; margin-top: 4rem; }
.rt-stat-item { background: var(--bg2); padding: 2.2rem 1.8rem; text-align: center;
  transition: background .3s; position: relative; overflow: hidden; }
.rt-stat-item:hover { background: var(--stat-hover); }
.rt-stat-item::after { content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 100%, rgba(232,65,24,0.15), transparent 70%);
  opacity: 0; transition: opacity 0.3s; pointer-events: none; }
.rt-stat-item:hover::after { opacity: 1; }
.rt-stat-num { font-family: var(--cond); font-weight: 800;
  font-size: clamp(2.5rem,5vw,3.8rem); color: var(--red); line-height: 1;
  letter-spacing: -.02em; display: block; }
.rt-stat-suffix { font-size: clamp(1.5rem,3vw,2.2rem); color: rgba(232,65,24,.6); }
.rt-stat-label { font-family: var(--mono); font-size: .6rem; font-weight: 500;
  letter-spacing: .18em; color: var(--muted); text-transform: uppercase; margin-top: .5rem; transition: color 0.4s; }
.rt-attacks-header { display: flex; flex-direction: column; gap: .6rem; margin-bottom: 3rem; }
.rt-attacks-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(340px,1fr)); gap: 1.5rem; }
.rt-attack-card { background: var(--card); border: 1px solid var(--card-b); border-radius: 12px;
  padding: 1.8rem; position: relative; overflow: hidden; cursor: pointer;
  transition: box-shadow .3s ease, border-color .3s ease; transform-style: preserve-3d; will-change: transform; }
.rt-attack-card::before { content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(232,65,24,.08), transparent 60%);
  opacity: 0; transition: opacity .4s; pointer-events: none; }
.rt-attack-card.hovered::before { opacity: 1; }
.rt-attack-card.hovered { box-shadow: 0 16px 50px var(--tilt-shadow), 0 0 30px rgba(232,65,24,.12); border-color: rgba(232,65,24,.45); }
.rt-attack-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.2rem; }
.rt-attack-icon { width: 44px; height: 44px; border-radius: 10px; background: rgba(232,65,24,.1);
  border: 1px solid rgba(232,65,24,.2); display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; flex-shrink: 0; transition: transform 0.3s; }
.rt-attack-card.hovered .rt-attack-icon { transform: scale(1.12) rotate(-4deg); }
.rt-attack-severity { font-family: var(--mono); font-size: .55rem; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase; padding: .25rem .65rem; border-radius: 4px; }
.sev-critical { background: rgba(232,65,24,.15); color: #ff6b6b; border: 1px solid rgba(232,65,24,.3); }
.sev-high { background: rgba(255,100,0,.12); color: #ff9966; border: 1px solid rgba(255,100,0,.25); }
.sev-medium { background: rgba(255,193,7,.1); color: #ffc107; border: 1px solid rgba(255,193,7,.2); }
.rt-attack-name { font-family: var(--cond); font-weight: 700; font-size: 1.2rem;
  color: var(--sub); letter-spacing: .02em; margin-bottom: .5rem; transition: color 0.4s; }
#rt-page[data-theme="dark"] .rt-attack-name { color: #fff; }
#rt-page[data-theme="light"] .rt-attack-name { color: #1a0300; }
.rt-attack-desc { font-family: var(--cond); font-weight: 400; font-size: .87rem; color: var(--muted); line-height: 1.65; margin-bottom: 1.2rem; transition: color 0.4s; }
.rt-attack-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
.rt-tag { font-family: var(--mono); font-size: .55rem; font-weight: 500; letter-spacing: .1em;
  color: rgba(232,65,24,.75); border: 1px solid rgba(232,65,24,.18); background: rgba(232,65,24,.06);
  padding: .2rem .55rem; border-radius: 3px; text-transform: uppercase; transition: background 0.2s; }
.rt-tag:hover { background: rgba(232,65,24,.15); }
.rt-attack-bar { position: absolute; bottom: 0; left: 0; height: 2px;
  background: linear-gradient(90deg, var(--red), transparent); width: 0; transition: width .6s ease; }
.rt-attack-card.hovered .rt-attack-bar { width: 100%; }
.rt-attack-expand { max-height: 0; overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease;
  border-top: 0px solid rgba(232,65,24,0.15); }
.rt-attack-card.expanded .rt-attack-expand { max-height: 200px; padding-top: 1rem; border-top-width: 1px; margin-top: .8rem; }
.rt-expand-row { display: flex; align-items: center; gap: .5rem; margin-bottom: .4rem; font-family: var(--mono); font-size: .65rem; }
.rt-expand-row .ek { color: var(--red); font-weight: 700; min-width: 100px; }
.rt-expand-row .ev { color: var(--muted); }
.rt-expand-hint { font-family: var(--mono); font-size: .55rem; color: rgba(232,65,24,.4); letter-spacing: .1em; text-transform: uppercase; text-align: right; margin-top: .5rem; }
.rt-card-expand-icon { position: absolute; top: 1.4rem; right: 1.6rem; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center; font-family: var(--mono);
  font-size: .7rem; color: rgba(232,65,24,.45); transition: transform 0.3s, color 0.2s; pointer-events: none; }
.rt-attack-card.expanded .rt-card-expand-icon { transform: rotate(45deg); color: var(--red); }
.rt-terminal-section { background: var(--bg2); padding: clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,5rem);
  border-top: 1px solid rgba(232,65,24,.1); border-bottom: 1px solid rgba(232,65,24,.1);
  position: relative; overflow: hidden; transition: background 0.4s; }
.rt-terminal-section::before { content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 50% at 100% 50%, rgba(139,0,0,.1), transparent); pointer-events: none; }
.rt-terminal-grid { max-width: 1260px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.1fr; gap: 4rem; align-items: center; }
.rt-terminal-window { background: var(--term-bg); border: 1px solid rgba(232,65,24,.25); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 40px rgba(232,65,24,.06); }
.rt-terminal-titlebar { background: var(--term-hd); border-bottom: 1px solid rgba(232,65,24,.15); padding: .65rem 1rem; display: flex; align-items: center; gap: .55rem; cursor: default; }
.rt-tb-dot { width: 10px; height: 10px; border-radius: 50%; transition: opacity 0.2s; }
.rt-tb-dot:hover { opacity: .7; }
.rt-tb-red { background: #e84118; box-shadow: 0 0 6px rgba(232,65,24,.6); }
.rt-tb-yellow { background: #f0a500; opacity: .6; }
.rt-tb-green { background: #27c93f; opacity: .6; }
.rt-tb-title { font-family: var(--mono); font-size: .6rem; color: var(--muted); letter-spacing: .1em; margin-left: .5rem; }
.rt-terminal-body { padding: 1.2rem 1.4rem; min-height: 320px; font-family: var(--mono); font-size: .72rem; line-height: 1.8; overflow-y: auto; max-height: 400px; }
.t-line { display: block; margin-bottom: .1rem; }
.t-prompt { color: var(--red); }
.t-cmd { color: rgba(255,255,255,.85); }
.t-out { color: rgba(255,255,255,.42); }
.t-warn { color: #f0a500; }
.t-err { color: #ff4444; }
.t-ok { color: #27c93f; }
.t-cursor { display: inline-block; width: 7px; height: 13px; background: var(--red);
  animation: rt-blink 1s steps(1) infinite; vertical-align: middle; margin-left: 2px; }
@keyframes rt-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.rt-info-badge { display: inline-flex; align-items: center; gap: .5rem;
  background: rgba(232,65,24,.08); border: 1px solid rgba(232,65,24,.2); border-radius: 6px;
  padding: .4rem .85rem; font-family: var(--mono); font-size: .6rem; font-weight: 700;
  letter-spacing: .14em; color: var(--red); text-transform: uppercase; width: fit-content; margin-bottom: .5rem; }
.rt-info-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: rt-pulse-dot 1.4s infinite; }
.rt-matrix-wrap { overflow-x: auto; margin-top: 3rem; border: 1px solid rgba(232,65,24,.1); border-radius: 12px; overflow: hidden; }
table.rt-threat-matrix { width: 100%; border-collapse: collapse; font-family: var(--mono); font-size: .68rem; }
.rt-threat-matrix thead th { background: var(--matrix-head); color: var(--red); font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; padding: .9rem 1.1rem;
  border-bottom: 1px solid rgba(232,65,24,.15); text-align: left; white-space: nowrap; }
.rt-threat-matrix tbody tr { border-bottom: 1px solid rgba(255,255,255,.04); transition: background .2s; }
.rt-threat-matrix tbody tr:last-child { border-bottom: none; }
.rt-threat-matrix tbody tr:hover { background: var(--matrix-hover); }
.rt-threat-matrix tbody td { padding: .85rem 1.1rem; color: var(--muted); white-space: nowrap; transition: color 0.4s; }
.rt-threat-matrix tbody td:first-child { color: var(--sub); font-weight: 500; }
.rt-risk-pill { display: inline-block; padding: .2rem .65rem; border-radius: 20px; font-size: .55rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.risk-critical { background: rgba(232,65,24,.2); color: #ff6b6b; }
.risk-high { background: rgba(255,120,0,.15); color: #ff9966; }
.risk-medium { background: rgba(255,193,7,.12); color: #e8a800; }
.risk-low { background: rgba(100,255,100,.08); color: #22bb55; }
.check { color: var(--red); font-weight: 700; }
.dash { color: var(--dim); }
.rt-method-steps { position: relative; display: flex; flex-direction: column; gap: 0; margin-top: 3rem; }
.rt-method-step { display: grid; grid-template-columns: 60px 1fr; gap: 1.5rem; padding-bottom: 2.5rem; position: relative; }
.rt-method-step:last-child { padding-bottom: 0; }
.rt-step-num-col { display: flex; flex-direction: column; align-items: center; }
.rt-step-num { width: 44px; height: 44px; border-radius: 50%; background: rgba(232,65,24,.1);
  border: 2px solid rgba(232,65,24,.4); display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: .75rem; font-weight: 700; color: var(--red);
  flex-shrink: 0; transition: background .3s, box-shadow .3s; position: relative; z-index: 1; }
.rt-method-step:hover .rt-step-num { background: rgba(232,65,24,.22); box-shadow: 0 0 22px rgba(232,65,24,.4); }
.rt-step-line { flex: 1; width: 1px; background: linear-gradient(to bottom, rgba(232,65,24,.3), rgba(232,65,24,.05)); margin-top: 4px; }
.rt-method-step:last-child .rt-step-line { display: none; }
.rt-step-content { padding-top: .45rem; }
.rt-step-title { font-family: var(--cond); font-weight: 700; font-size: 1.1rem; color: var(--sub); letter-spacing: .02em; margin-bottom: .45rem; transition: color 0.4s; }
#rt-page[data-theme="dark"] .rt-step-title { color: #fff; }
#rt-page[data-theme="light"] .rt-step-title { color: #1a0300; }
.rt-step-desc { font-family: var(--cond); font-weight: 400; font-size: .9rem; color: var(--muted); line-height: 1.65; margin-bottom: .7rem; transition: color 0.4s; }
.rt-step-chips { display: flex; flex-wrap: wrap; gap: .4rem; }
.rt-step-chip { font-family: var(--mono); font-size: .55rem; font-weight: 600; letter-spacing: .1em;
  text-transform: uppercase; padding: .18rem .6rem; border-radius: 3px;
  background: rgba(232,65,24,.06); border: 1px solid rgba(232,65,24,.12); color: rgba(232,65,24,.65); }
.rt-tools-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 1rem; margin-top: 3rem; }
.rt-tool-card { background: var(--card); border: 1px solid rgba(232,65,24,.1); border-radius: 10px;
  padding: 1.4rem; position: relative; overflow: hidden;
  transition: border-color .3s, transform .3s, box-shadow .3s; cursor: pointer; }
.rt-tool-card:hover { border-color: rgba(232,65,24,.3); transform: translateY(-4px); box-shadow: 0 12px 30px var(--tilt-shadow); }
.rt-tool-card::after { content: ''; position: absolute; bottom: 0; left: 0; height: 2px; width: 0; background: var(--red); transition: width .4s ease; }
.rt-tool-card:hover::after { width: 100%; }
.rt-tool-icon { font-size: 1.6rem; margin-bottom: .7rem; }
.rt-tool-name { font-family: var(--mono); font-size: .75rem; font-weight: 700; color: var(--sub); letter-spacing: .05em; margin-bottom: .35rem; transition: color 0.4s; }
#rt-page[data-theme="dark"] .rt-tool-name { color: #fff; }
#rt-page[data-theme="light"] .rt-tool-name { color: #1a0300; }
.rt-tool-desc { font-family: var(--cond); font-weight: 400; font-size: .78rem; color: var(--muted); line-height: 1.5; transition: color 0.4s; }
.rt-cta-section { position: relative; overflow: hidden; background: var(--bg2); border-top: 1px solid rgba(232,65,24,.1); transition: background 0.4s; }
.rt-cta-section::before { content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 80% at 50% 100%, rgba(139,0,0,.2), transparent 70%); pointer-events: none; }
.rt-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: clamp(5rem,10vw,8rem) clamp(1.2rem,5vw,4rem); position: relative; }
.rt-cta-tagline { font-family: var(--mono); font-size: .62rem; letter-spacing: .3em; color: rgba(232,65,24,.7); text-transform: uppercase; margin-bottom: 1.5rem; }
.rt-cta-title { font-family: var(--cond); font-weight: 800; font-size: clamp(2.5rem,6vw,5rem); line-height: .95; color: var(--heading); margin-bottom: 1.5rem; transition: color 0.4s; }
#rt-page[data-theme="dark"] .rt-cta-title { color: #fff; }
.rt-cta-title .red { color: var(--red); }
.rt-cta-desc { color: var(--muted); font-family: var(--cond); font-weight: 400; font-size: .95rem; line-height: 1.7; margin-bottom: 2.5rem; max-width: 540px; margin-left: auto; margin-right: auto; transition: color 0.4s; }
.rt-contact-row { display: flex; align-items: center; justify-content: center; gap: .6rem; margin-top: 2rem; flex-wrap: wrap; }
.rt-contact-chip { font-family: var(--mono); font-size: .62rem; font-weight: 500; letter-spacing: .1em; color: var(--muted); text-transform: uppercase; }
.rt-contact-sep { color: var(--dim); }
#rt-page footer { padding: 2rem clamp(1.2rem,5vw,3rem); border-top: 1px solid rgba(232,65,24,.08);
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.rt-foot-l { font-family: var(--mono); font-size: .62rem; color: var(--muted); letter-spacing: .08em; transition: color 0.4s; }
.rt-foot-l span { color: var(--red); }
.rt-foot-r { font-family: var(--mono); font-size: .6rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; transition: color 0.4s; }
.rt-reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
.rt-reveal.visible { opacity: 1; transform: translateY(0); }
.rt-live-badge { position: absolute; bottom: 2rem; left: 2rem; z-index: 998;
  display: flex; align-items: center; gap: .6rem; background: rgba(7,3,4,0.85);
  backdrop-filter: blur(12px); border: 1px solid rgba(232,65,24,.3); border-radius: 8px;
  padding: .55rem .9rem; box-shadow: 0 4px 20px rgba(0,0,0,.4), 0 0 20px rgba(232,65,24,.08);
  font-family: var(--mono); font-size: .58rem; font-weight: 700; letter-spacing: .16em;
  text-transform: uppercase; color: rgba(232,65,24,.85);
  transition: background 0.4s, transform 0.2s; cursor: default; }
#rt-page[data-theme="light"] .rt-live-badge { background: rgba(253,242,238,0.9); }
.rt-live-badge:hover { transform: translateY(-2px); }
.rt-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red);
  animation: rt-pulse-dot 1s infinite; box-shadow: 0 0 6px var(--red); flex-shrink: 0; }
.rt-kbd-hint { position: absolute; bottom: 2rem; right: 2rem; z-index: 997;
  font-family: var(--mono); font-size: .55rem; letter-spacing: .1em; color: var(--muted);
  text-transform: uppercase; display: flex; align-items: center; gap: .4rem;
  opacity: .6; transition: opacity 0.2s; pointer-events: none; }
.rt-kbd { background: rgba(232,65,24,.1); border: 1px solid rgba(232,65,24,.2); border-radius: 3px; padding: .1rem .4rem; color: var(--red); font-weight: 700; }
/* ═══════════════════════ FLAT CYBER NINJA ════════════════════════════ */
#rt-roaming-ninja {
  position: absolute; z-index: 10000;
  cursor: grab; user-select: none; -webkit-user-drag: none; touch-action: none;
  transition-property: top, left, transform; transition-timing-function: linear;
  filter: drop-shadow(0 10px 22px rgba(232,65,24,0.30)) drop-shadow(0 0 20px rgba(232,65,24,0.14));
}
#rt-roaming-ninja.dragging { cursor: grabbing; transition: none !important; }
#rt-roaming-ninja.off { opacity: 0; pointer-events: none; }
#rt-roaming-ninja.ui-open { pointer-events: none; }

/* Ground aura glow */
.rt-n-aura {
  position: absolute; left: 10%; right: 10%; bottom: -10px; height: 20px;
  background: radial-gradient(ellipse at center, rgba(232,65,24,.40) 0%, transparent 70%);
  filter: blur(5px); opacity: .7;
  animation: rt-aura-beat 1.8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes rt-aura-beat { 0%,100%{transform:scaleX(1);opacity:.65} 50%{transform:scaleX(1.18);opacity:1} }
#rt-roaming-ninja.rage .rt-n-aura { background: radial-gradient(ellipse at center, rgba(255,80,0,.65) 0%, transparent 70%); animation-duration: .6s; }
#rt-roaming-ninja.stealth .rt-n-aura { opacity: 0; }

/* Floor shadow */
.rt-n-flrshadow {
  position: absolute; left: 18%; right: 18%; bottom: 2px; height: 8px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,.55) 0%, transparent 70%);
  filter: blur(3px); opacity: .5;
  pointer-events: none;
}

/* Sprite container */
.rt-n-sprite { position: absolute; inset: 0; }
.rt-n-sprite * { box-sizing: border-box; position: absolute; }

/* ── HEAD: large dark circle ── */
.rt-n-head {
  width: 58%; height: 43%; left: 21%; top: 1%;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 28%, #1e1e2e 0%, #08080f 60%);
  box-shadow: 0 4px 14px rgba(0,0,0,.65), inset 0 -6px 12px rgba(0,0,0,.45);
  z-index: 1;
}

/* ── HEADBAND: thick flat red rectangle across lower face ── */
.rt-n-band {
  width: 62%; height: 15%; left: 19%; top: 20%;
  background: linear-gradient(180deg, #c0392b 0%, #8b1515 100%);
  border-radius: 4px 4px 3px 3px;
  box-shadow: 0 3px 10px rgba(0,0,0,.55), 0 0 12px rgba(192,57,43,.35);
  z-index: 3;
  overflow: visible;
}
/* Band tail sticking right */
.rt-n-band::after {
  content: ''; position: absolute;
  width: 26%; height: 55%; right: -21%; top: 22%;
  background: linear-gradient(90deg, #a93226, #721010);
  border-radius: 0 4px 4px 0;
  transform-origin: left center;
  animation: rt-band-tail .5s ease-in-out infinite alternate;
}
@keyframes rt-band-tail { 0%{transform:rotate(-11deg) scaleY(.95)} 100%{transform:rotate(11deg) scaleY(1.05)} }

/* Visor slot inside band */
.rt-n-visor {
  position: absolute; left: 10%; top: 16%; width: 78%; height: 65%;
  background: rgba(0,0,0,.78);
  border-radius: 3px;
  overflow: hidden;
}
.rt-n-eye {
  position: absolute; top: 20%; height: 60%; width: 30%;
  background: #ff2200;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255,34,0,1), 0 0 22px rgba(255,34,0,.6);
  animation: rt-eye-pulse 1.3s ease-in-out infinite;
}
.rt-n-eye.l { left: 8%; }
.rt-n-eye.r { right: 8%; animation-delay: .22s; }
@keyframes rt-eye-pulse { 0%,100%{opacity:1;box-shadow:0 0 10px rgba(255,34,0,1),0 0 22px rgba(255,34,0,.6)} 50%{opacity:.6;box-shadow:0 0 4px rgba(255,34,0,.7)} }
#rt-roaming-ninja.rage .rt-n-eye { background: #ff8800; box-shadow: 0 0 14px rgba(255,160,0,1), 0 0 26px rgba(255,80,0,.7); animation-duration: .35s; }
#rt-roaming-ninja.stealth .rt-n-eye { background: #00ffcc; box-shadow: 0 0 10px rgba(0,255,200,1), 0 0 20px rgba(0,255,200,.5); }

/* ── COLLAR ── */
.rt-n-collar {
  width: 30%; height: 7%; left: 35%; top: 33%;
  background: linear-gradient(180deg, #1e1e2e, #10101a);
  border-radius: 3px;
  border: 1px solid rgba(232,65,24,.22);
  z-index: 2;
}

/* ── TORSO: flat dark rectangle with cross grid ── */
.rt-n-torso {
  width: 44%; height: 32%; left: 28%; top: 39%;
  background: #0c0c18;
  border-radius: 5px;
  border: 1.5px solid rgba(232,65,24,.28);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.5), 0 4px 14px rgba(0,0,0,.45);
  z-index: 2;
}
/* Vertical line */
.rt-n-torso::before {
  content: ''; position: absolute; width: 2px; height: 68%; left: 50%; top: 16%;
  transform: translateX(-50%);
  background: rgba(232,65,24,.6);
  box-shadow: 0 0 8px rgba(232,65,24,.35);
  animation: rt-circuit-flicker 1.5s steps(3,end) infinite;
}
/* Horizontal line */
.rt-n-torso::after {
  content: ''; position: absolute; width: 62%; height: 2px; left: 19%; top: 48%;
  background: rgba(232,65,24,.5);
  box-shadow: 0 0 8px rgba(232,65,24,.28);
  animation: rt-circuit-flicker 1.5s steps(3,end) infinite .4s;
}
@keyframes rt-circuit-flicker { 0%,100%{opacity:.75} 50%{opacity:.2} }
#rt-roaming-ninja.rage .rt-n-torso { border-color: rgba(255,80,0,.55); box-shadow: inset 0 0 0 1px rgba(255,60,0,.4), 0 0 16px rgba(255,50,0,.22); }

/* ── ARMS: blocky rectangles ── */
.rt-n-arm {
  width: 13%; height: 25%; top: 43%;
  background: linear-gradient(180deg, #161622, #0a0a12);
  border-radius: 5px;
  transform-origin: top center;
  border: 1px solid rgba(232,65,24,.2);
  box-shadow: 0 4px 10px rgba(0,0,0,.55);
}
/* Elbow cap */
.rt-n-arm::after {
  content:''; position:absolute; width: 80%; height: 18%; left: 10%; bottom: 4%;
  background: rgba(232,65,24,.14); border-radius: 3px;
}
.rt-n-arm.bk { left: 16%; animation: rt-arm-b .4s ease-in-out infinite; opacity: .82; z-index: 1; }
.rt-n-arm.ft { left: 71%; animation: rt-arm-f .4s ease-in-out infinite; z-index: 3; }
@keyframes rt-arm-f { 0%,100%{transform:rotate(36deg)} 50%{transform:rotate(-36deg)} }
@keyframes rt-arm-b { 0%,100%{transform:rotate(-36deg)} 50%{transform:rotate(36deg)} }
#rt-roaming-ninja.dragging .rt-n-arm.ft { animation: none; transform: rotate(140deg); }
#rt-roaming-ninja.dragging .rt-n-arm.bk { animation: none; transform: rotate(-140deg); }
#rt-roaming-ninja.rage .rt-n-arm { animation-duration: .22s; }

/* ── WEAPON: brown stick held at front arm ── */
.rt-n-weapon {
  width: 7%; height: 17%; left: 77%; top: 61%;
  background: linear-gradient(180deg, #7a3e10, #4a200a);
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0,0,0,.5), 0 0 4px rgba(180,80,0,.2);
  transform: rotate(22deg);
  transform-origin: top center;
  animation: rt-weapon-sway .4s ease-in-out infinite;
  z-index: 4;
}
@keyframes rt-weapon-sway { 0%,100%{transform:rotate(18deg)} 50%{transform:rotate(-14deg)} }
#rt-roaming-ninja.dragging .rt-n-weapon { animation: none; transform: rotate(105deg); }

/* ── LEGS: thick blocky ── */
.rt-n-leg {
  width: 15%; height: 26%; top: 68%;
  background: linear-gradient(180deg, #161622, #0a0a12);
  border-radius: 5px;
  transform-origin: top center;
  border: 1px solid rgba(232,65,24,.18);
  box-shadow: 0 4px 10px rgba(0,0,0,.5);
}
/* Foot */
.rt-n-leg::after {
  content:''; position:absolute; width: 135%; height: 27%; left: -17%; bottom: 0;
  background: #0a0a14; border-radius: 4px;
  border: 1px solid rgba(232,65,24,.18);
}
.rt-n-leg.bk { left: 28%; animation: rt-leg-b .4s ease-in-out infinite; opacity: .82; z-index: 1; }
.rt-n-leg.ft { left: 54%; animation: rt-leg-f .4s ease-in-out infinite; z-index: 2; }
@keyframes rt-leg-f { 0%,100%{transform:rotate(-40deg)} 50%{transform:rotate(40deg)} }
@keyframes rt-leg-b { 0%,100%{transform:rotate(40deg)} 50%{transform:rotate(-40deg)} }
#rt-roaming-ninja.dragging .rt-n-leg { animation: none; transform: rotate(0deg); }
#rt-roaming-ninja.rage .rt-n-leg { animation-duration: .22s; }

/* ── Modes ── */
#rt-roaming-ninja.stealth { opacity: .2; filter: saturate(0) brightness(.65) drop-shadow(0 0 14px rgba(0,255,204,.18)); }
#rt-roaming-ninja.rage { filter: drop-shadow(0 0 28px rgba(255,100,0,.28)) drop-shadow(0 12px 22px rgba(232,65,24,0.25)); }

/* ── Spin: on sprite to avoid transform conflict ── */
.rt-n-sprite.spinning { animation: rt-n-spin .5s ease-in-out; }
@keyframes rt-n-spin {
  0%{transform:scale(1) rotate(0deg)} 30%{transform:scale(1.28) rotate(360deg)}
  60%{transform:scale(1.28) rotate(720deg)} 100%{transform:scale(1) rotate(720deg)}
}

/* ── Replica clones (no pointer-events, same visual) ── */
.rt-roaming-replica {
  position: absolute; z-index: 9999; pointer-events: none;
  transition-property: top,left,transform; transition-timing-function: linear;
  filter: drop-shadow(0 8px 18px rgba(232,65,24,0.25)) drop-shadow(0 0 16px rgba(232,65,24,0.10));
}
.rt-roaming-replica.off { opacity: 0; }
.rt-roaming-replica.stealth { opacity: .18; filter: saturate(0) brightness(.6); }
.rt-roaming-replica.rage { filter: drop-shadow(0 0 22px rgba(255,80,0,.28)); }

/* ═══════════════════════════════════════════════════════════════
   VARIANT STRUCTURAL CSS — each variant has unique shapes/bodies
   ═══════════════════════════════════════════════════════════════ */

/* ─── v-ghost: Wispy Specter ─── */
#rt-roaming-ninja.v-ghost, .rt-roaming-replica.v-ghost {
  filter: drop-shadow(0 0 22px rgba(200,0,0,.50)) drop-shadow(0 0 40px rgba(140,0,0,.22));
}
.v-ghost .rt-n-aura { background: radial-gradient(ellipse at center, rgba(200,0,0,.42) 0%, transparent 70%); }
.rt-nv-g-head {
  position: absolute; left: 18%; top: 1%; width: 64%; height: 38%;
  border-radius: 50% 50% 44% 44%;
  background: radial-gradient(circle at 40% 32%, #2a0000 0%, #180000 46%, #0c0000 88%);
  box-shadow: 0 0 20px rgba(200,0,0,.5), inset 0 -8px 14px rgba(100,0,0,.28);
  z-index: 2; animation: rt-g-hd 2s ease-in-out infinite;
}
@keyframes rt-g-hd { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
.rt-nv-g-visor {
  position: absolute; left: 10%; top: 42%; width: 80%; height: 28%;
  background: rgba(10,0,0,.88); border-radius: 2px; overflow: hidden;
}
.rt-nv-g-eye {
  position: absolute; top: 10%; width: 30%; height: 80%;
  border-radius: 50%; background: #ff2200;
  box-shadow: 0 0 10px #ff2200, 0 0 22px rgba(200,0,0,.9);
  animation: rt-g-eye 1.5s ease-in-out infinite;
}
.rt-nv-g-eye.l { left: 7%; } .rt-nv-g-eye.r { right: 7%; animation-delay: .4s; }
@keyframes rt-g-eye { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.38;transform:scale(.72)} }
.rt-nv-g-body {
  position: absolute; left: 12%; top: 31%; width: 76%; height: 52%;
  border-radius: 14% 14% 50% 50%;
  background: linear-gradient(180deg, #1e0000 0%, #120000 36%, rgba(30,0,0,.22) 100%);
  box-shadow: inset 0 -10px 18px rgba(100,0,0,.22), 0 0 14px rgba(180,0,0,.18);
  animation: rt-g-body 2s ease-in-out infinite; z-index: 1;
}
@keyframes rt-g-body { 0%,100%{transform:translateY(0) scaleX(1)} 50%{transform:translateY(-4px) scaleX(1.05)} }
.rt-nv-g-arm {
  position: absolute; width: 9%; height: 30%; top: 34%;
  border-radius: 50%; transform-origin: top center;
  background: linear-gradient(180deg, rgba(160,0,0,.85), rgba(60,0,0,.22));
}
.rt-nv-g-arm.l { left: 4%; animation: rt-g-al 2s ease-in-out infinite; }
.rt-nv-g-arm.r { right: 4%; animation: rt-g-ar 2s ease-in-out infinite; }
@keyframes rt-g-al { 0%,100%{transform:rotate(-30deg) skewY(6deg)} 50%{transform:rotate(-56deg) skewY(-8deg)} }
@keyframes rt-g-ar { 0%,100%{transform:rotate(30deg) skewY(-6deg)} 50%{transform:rotate(56deg) skewY(8deg)} }
.rt-nv-g-tendril {
  position: absolute; border-radius: 0 0 40% 40%; transform-origin: top center;
  background: linear-gradient(180deg, rgba(180,0,0,.62), rgba(60,0,0,.06));
}
.rt-nv-g-tendril.t1 { left: 18%; top: 73%; width: 16%; height: 23%; animation: rt-g-td1 1.5s ease-in-out infinite alternate; }
.rt-nv-g-tendril.t2 { left: 40%; top: 77%; width: 20%; height: 27%; animation: rt-g-td2 1.8s ease-in-out infinite alternate; }
.rt-nv-g-tendril.t3 { left: 64%; top: 73%; width: 16%; height: 23%; animation: rt-g-td3 1.3s ease-in-out infinite alternate; }
@keyframes rt-g-td1 { 0%{transform:skewX(-10deg) scaleX(.9)} 100%{transform:skewX(13deg) scaleX(1.1)} }
@keyframes rt-g-td2 { 0%{transform:skewX(8deg) scaleY(.88)} 100%{transform:skewX(-13deg) scaleY(1.12)} }
@keyframes rt-g-td3 { 0%{transform:skewX(12deg) scaleX(.88)} 100%{transform:skewX(-8deg) scaleX(1.12)} }

/* ─── v-oni: Demon Samurai ─── */
#rt-roaming-ninja.v-oni, .rt-roaming-replica.v-oni {
  filter: drop-shadow(0 0 22px rgba(200,0,0,.42)) drop-shadow(0 12px 22px rgba(80,0,0,.28));
}
.v-oni .rt-n-aura { background: radial-gradient(ellipse at center, rgba(200,0,0,.45) 0%, transparent 70%); }
.rt-nv-o-head {
  position: absolute; left: 10%; top: 5%; width: 80%; height: 30%;
  border-radius: 7px;
  background: linear-gradient(180deg, #1a0000 0%, #0c0000 100%);
  box-shadow: 0 4px 16px rgba(0,0,0,.72), inset 0 0 0 1.5px rgba(180,0,0,.32);
  z-index: 3;
}
.rt-nv-o-horn {
  position: absolute; width: 10%; height: 22%; top: -18%;
  background: linear-gradient(180deg, #cc0000 0%, #7a0000 80%);
  border-radius: 40% 40% 0 0;
  box-shadow: 0 0 8px rgba(200,0,0,.55);
}
.rt-nv-o-horn.l { left: 18%; transform: rotate(-12deg); transform-origin: bottom center; }
.rt-nv-o-horn.r { right: 18%; transform: rotate(12deg); transform-origin: bottom center; }
.rt-nv-o-stripe {
  position: absolute; left: 46%; top: 8%; width: 10%; height: 50%;
  background: linear-gradient(180deg, rgba(255,38,38,.9), rgba(160,0,0,.65));
  border-radius: 2px; box-shadow: -1px 0 5px rgba(255,38,38,.4);
}
.rt-nv-o-eye {
  position: absolute; left: 10%; top: 38%; width: 80%; height: 24%;
  background: linear-gradient(90deg, #cc0000, #8b0000, #cc0000);
  border-radius: 3px;
  box-shadow: 0 0 14px rgba(200,0,0,1), 0 0 26px rgba(140,0,0,.72);
  animation: rt-o-eye .9s ease-in-out infinite;
}
@keyframes rt-o-eye { 0%,100%{opacity:1} 50%{opacity:.55} }
.rt-nv-o-chest {
  position: absolute; left: 3%; top: 33%; width: 94%; height: 34%;
  background: linear-gradient(180deg, #120000 0%, #080000 100%);
  border-radius: 5px 5px 3px 3px;
  border: 1.5px solid rgba(180,0,0,.38);
  box-shadow: 0 4px 14px rgba(0,0,0,.62), inset 0 0 0 1px rgba(0,0,0,.45);
  z-index: 2;
}
.rt-nv-o-chest::before {
  content:''; position:absolute; width:2px; height:62%; left:50%; top:16%; transform:translateX(-50%);
  background:rgba(200,0,0,.65); box-shadow:0 0 8px rgba(180,0,0,.42);
  animation:rt-circuit-flicker 1.5s steps(3,end) infinite;
}
.rt-nv-o-chest::after {
  content:''; position:absolute; width:58%; height:2px; left:21%; top:50%;
  background:rgba(200,0,0,.55); box-shadow:0 0 8px rgba(180,0,0,.38);
  animation:rt-circuit-flicker 1.5s steps(3,end) infinite .5s;
}
.rt-nv-o-pauldron {
  position: absolute; width: 20%; height: 20%; top: 29%;
  border-radius: 45% 45% 38% 38%;
  background: linear-gradient(180deg, #8b0000 0%, #4a0000 100%);
  border: 1px solid rgba(180,0,0,.42);
  box-shadow: 0 0 10px rgba(160,0,0,.32); z-index: 3;
}
.rt-nv-o-pauldron.l { left: -2%; } .rt-nv-o-pauldron.r { right: -2%; }
.rt-nv-o-arm {
  position: absolute; width: 18%; height: 20%; top: 50%;
  background: linear-gradient(180deg, #1a0000, #0a0000);
  border-radius: 5px; border: 1px solid rgba(180,0,0,.28);
  transform-origin: top center; z-index: 1;
}
.rt-nv-o-arm.l { left: 0%; animation: rt-o-al .42s ease-in-out infinite; }
.rt-nv-o-arm.r { right: 0%; animation: rt-o-ar .42s ease-in-out infinite; }
@keyframes rt-o-al { 0%,100%{transform:rotate(-28deg)} 50%{transform:rotate(18deg)} }
@keyframes rt-o-ar { 0%,100%{transform:rotate(28deg)} 50%{transform:rotate(-18deg)} }
.rt-nv-o-fist {
  position: absolute; width: 17%; height: 10%; top: 70%;
  background: #1a0000; border-radius: 4px;
  border: 1px solid rgba(180,0,0,.35); box-shadow: 0 0 6px rgba(140,0,0,.28);
}
.rt-nv-o-fist.l { left: 0%; } .rt-nv-o-fist.r { right: 0%; }
.rt-nv-o-leg {
  position: absolute; width: 24%; height: 24%; top: 70%;
  background: linear-gradient(180deg, #140000, #060000);
  border-radius: 5px; border: 1px solid rgba(180,0,0,.25);
  transform-origin: top center;
}
.rt-nv-o-leg.l { left: 14%; animation: rt-o-ll .42s ease-in-out infinite; }
.rt-nv-o-leg.r { right: 14%; animation: rt-o-lr .42s ease-in-out infinite; }
@keyframes rt-o-ll { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
@keyframes rt-o-lr { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(-20deg)} }

/* ─── v-neon: Geometric Cyberpunk ─── */
#rt-roaming-ninja.v-neon, .rt-roaming-replica.v-neon {
  filter: drop-shadow(0 0 22px rgba(200,0,0,.44)) drop-shadow(0 0 42px rgba(140,0,0,.18));
}
.v-neon .rt-n-aura { background: radial-gradient(ellipse at center, rgba(200,0,0,.48) 0%, transparent 70%); }
.rt-nv-n-head {
  position: absolute; left: 24%; top: 1%; width: 52%; height: 28%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background: #0e0000;
  box-shadow: 0 0 18px rgba(200,0,0,.42);
  z-index: 2;
}
.rt-nv-n-visor {
  position: absolute; left: 23%; top: 43%; width: 54%; height: 14%;
  background: #ff2200;
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(255,34,0,1), 0 0 26px rgba(180,0,0,.72);
  animation: rt-n-visor 1.2s ease-in-out infinite;
}
@keyframes rt-n-visor { 0%,100%{opacity:1;box-shadow:0 0 12px rgba(255,34,0,1),0 0 26px rgba(180,0,0,.72)} 50%{opacity:.5;box-shadow:0 0 5px rgba(200,0,0,.7)} }
.rt-nv-n-torso {
  position: absolute; left: 16%; top: 30%; width: 68%; height: 36%;
  clip-path: polygon(8% 0%, 92% 0%, 82% 100%, 18% 100%);
  background: #0c0000;
  border: 1px solid rgba(200,0,0,.38);
  box-shadow: inset 0 0 0 1px rgba(180,0,0,.14), 0 4px 14px rgba(0,0,0,.5);
  z-index: 1;
}
.rt-nv-n-torso::before {
  content:''; position:absolute; width:2px; height:66%; left:50%; top:12%; transform:translateX(-50%);
  background:rgba(200,0,0,.68); box-shadow:0 0 8px rgba(180,0,0,.42);
  animation:rt-circuit-flicker 1.5s steps(3,end) infinite;
}
.rt-nv-n-torso::after {
  content:''; position:absolute; width:54%; height:2px; left:23%; top:50%;
  background:rgba(200,0,0,.56); box-shadow:0 0 8px rgba(180,0,0,.35);
  animation:rt-circuit-flicker 1.5s steps(3,end) infinite .4s;
}
.rt-nv-n-arm {
  position: absolute; width: 9%; height: 28%; top: 34%;
  background: linear-gradient(180deg, #120000, #080000);
  border: 1px solid rgba(200,0,0,.32); border-radius: 3px; transform-origin: top center;
}
.rt-nv-n-arm.l { left: 7%; animation: rt-n-al .42s ease-in-out infinite; }
.rt-nv-n-arm.r { right: 7%; animation: rt-n-ar .42s ease-in-out infinite; }
@keyframes rt-n-al { 0%,100%{transform:rotate(38deg)} 50%{transform:rotate(-38deg)} }
@keyframes rt-n-ar { 0%,100%{transform:rotate(-38deg)} 50%{transform:rotate(38deg)} }
.rt-nv-n-joint {
  position: absolute; width: 9%; height: 5%; border-radius: 50%;
  background: #ff2200; box-shadow: 0 0 8px rgba(255,34,0,1), 0 0 16px rgba(180,0,0,.72);
  z-index: 4;
}
.rt-nv-n-joint.el { left: 6%; top: 55%; animation: rt-n-ejl .42s ease-in-out infinite; }
.rt-nv-n-joint.er { right: 6%; top: 55%; animation: rt-n-ejr .42s ease-in-out infinite; }
.rt-nv-n-joint.kl { left: 22%; top: 80%; }
.rt-nv-n-joint.kr { right: 22%; top: 80%; }
@keyframes rt-n-ejl { 0%,100%{top:55%} 50%{top:46%} }
@keyframes rt-n-ejr { 0%,100%{top:55%} 50%{top:46%} }
.rt-nv-n-leg {
  position: absolute; width: 12%; height: 28%; top: 66%;
  background: linear-gradient(180deg, #120000, #080000);
  border: 1px solid rgba(200,0,0,.28); border-radius: 3px; transform-origin: top center;
}
.rt-nv-n-leg.l { left: 24%; animation: rt-n-ll .42s ease-in-out infinite; }
.rt-nv-n-leg.r { right: 24%; animation: rt-n-lr .42s ease-in-out infinite; }
@keyframes rt-n-ll { 0%,100%{transform:rotate(-38deg)} 50%{transform:rotate(38deg)} }
@keyframes rt-n-lr { 0%,100%{transform:rotate(38deg)} 50%{transform:rotate(-38deg)} }

/* ─── v-phantom: Royal Assassin ─── */
#rt-roaming-ninja.v-phantom, .rt-roaming-replica.v-phantom {
  filter: drop-shadow(0 0 22px rgba(200,0,0,.42)) drop-shadow(0 12px 20px rgba(100,0,0,.26));
}
.v-phantom .rt-n-aura { background: radial-gradient(ellipse at center, rgba(200,0,0,.48) 0%, transparent 70%); }
.rt-nv-p-cape {
  position: absolute; left: -5%; top: 28%; width: 52%; height: 60%;
  border-radius: 6px 0 28px 28px;
  background: linear-gradient(170deg, #6a0000 0%, #2e0000 55%, rgba(20,0,0,.28) 100%);
  transform-origin: 100% 0%; animation: rt-p-cape 1.1s ease-in-out infinite alternate; z-index: 0;
}
@keyframes rt-p-cape { 0%{transform:skewX(-9deg) rotate(-3deg)} 100%{transform:skewX(9deg) rotate(3deg)} }
.rt-nv-p-torso {
  position: absolute; left: 28%; top: 34%; width: 44%; height: 34%;
  background: linear-gradient(180deg, #180000, #0c0000);
  border-radius: 5px; border: 1.5px solid rgba(200,0,0,.44);
  box-shadow: 0 4px 14px rgba(0,0,0,.62), inset 0 0 0 1px rgba(0,0,0,.45); z-index: 2;
}
.rt-nv-p-torso::before {
  content:''; position:absolute; width:2px; height:64%; left:50%; top:12%; transform:translateX(-50%);
  background:rgba(200,0,0,.68); box-shadow:0 0 8px rgba(180,0,0,.42);
  animation:rt-circuit-flicker 1.5s steps(3,end) infinite;
}
.rt-nv-p-torso::after {
  content:''; position:absolute; width:60%; height:2px; left:20%; top:48%;
  background:rgba(200,0,0,.52); box-shadow:0 0 8px rgba(180,0,0,.3);
  animation:rt-circuit-flicker 1.5s steps(3,end) infinite .4s;
}
.rt-nv-p-head {
  position: absolute; left: 26%; top: 0%; width: 48%; height: 40%; z-index: 3;
}
.rt-nv-p-cowl {
  position: absolute; left: 0%; top: 0%; width: 100%; height: 100%;
  clip-path: polygon(50% 0%, 100% 52%, 82% 100%, 18% 100%, 0% 52%);
  background: radial-gradient(circle at 40% 38%, #1a0000 0%, #0a0000 62%);
  box-shadow: 0 4px 16px rgba(0,0,0,.75), inset 0 -6px 12px rgba(0,0,0,.45);
}
.rt-nv-p-eye {
  position: absolute; left: 22%; top: 46%; width: 56%; height: 12%;
  background: linear-gradient(90deg, rgba(255,34,0,.95), rgba(180,0,0,.75), rgba(255,34,0,.95));
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255,34,0,.92), 0 0 22px rgba(180,0,0,.62);
  animation: rt-p-eye 1.4s ease-in-out infinite;
}
@keyframes rt-p-eye { 0%,100%{opacity:1} 50%{opacity:.52} }
.rt-nv-p-arm {
  position: absolute; width: 11%; height: 26%; top: 38%;
  background: linear-gradient(180deg, #1a0000, #0a0000);
  border-radius: 5px; border: 1px solid rgba(200,0,0,.32);
  transform-origin: top center; z-index: 2;
}
.rt-nv-p-arm.l { left: 17%; animation: rt-p-al .44s ease-in-out infinite; }
.rt-nv-p-arm.r { right: 17%; animation: rt-p-ar .44s ease-in-out infinite; }
@keyframes rt-p-al { 0%,100%{transform:rotate(34deg)} 50%{transform:rotate(-34deg)} }
@keyframes rt-p-ar { 0%,100%{transform:rotate(-128deg)} 50%{transform:rotate(-152deg)} }
.rt-nv-p-sword {
  position: absolute; left: 66%; top: 10%; width: 7%; height: 52%;
  background: linear-gradient(180deg, #f0a0a0 0%, #cc0000 40%, #6a0000 100%);
  border-radius: 2px 2px 50% 50%;
  box-shadow: 0 0 10px rgba(200,0,0,.55), 0 0 20px rgba(140,0,0,.35);
  animation: rt-p-sw 3s ease-in-out infinite;
}
@keyframes rt-p-sw { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} }
.rt-nv-p-sword::before {
  content:''; position:absolute; left:-160%; top:56%; width:420%; height:8%;
  background: linear-gradient(90deg, rgba(200,0,0,.72), rgba(120,0,0,.52)); border-radius:2px;
}
.rt-nv-p-leg {
  position: absolute; width: 14%; height: 26%; top: 66%;
  background: linear-gradient(180deg, #1a0000, #0a0000);
  border-radius: 5px; border: 1px solid rgba(200,0,0,.26); transform-origin: top center;
}
.rt-nv-p-leg.l { left: 28%; animation: rt-p-ll .44s ease-in-out infinite; }
.rt-nv-p-leg.r { right: 28%; animation: rt-p-lr .44s ease-in-out infinite; }
@keyframes rt-p-ll { 0%,100%{transform:rotate(-40deg)} 50%{transform:rotate(40deg)} }
@keyframes rt-p-lr { 0%,100%{transform:rotate(40deg)} 50%{transform:rotate(-40deg)} }

/* ─── v-void: Shadow Entity ─── */
#rt-roaming-ninja.v-void, .rt-roaming-replica.v-void {
  filter: drop-shadow(0 0 26px rgba(200,0,0,.48)) drop-shadow(0 0 50px rgba(120,0,0,.22));
}
.v-void .rt-n-aura { background: radial-gradient(ellipse at center, rgba(200,0,0,.50) 0%, transparent 70%); }
.rt-nv-v-body {
  position: absolute; left: 14%; top: 26%; width: 72%; height: 54%;
  background: radial-gradient(ellipse at 45% 34%, #1e0000 0%, #0c0000 50%, #050000 100%);
  box-shadow: 0 0 20px rgba(180,0,0,.32), inset 0 -10px 20px rgba(0,0,0,.58), inset 0 0 0 1.5px rgba(180,0,0,.28);
  animation: rt-v-body 2.2s ease-in-out infinite; z-index: 1;
}
@keyframes rt-v-body { 0%,100%{border-radius:42% 42% 52% 52%;transform:scaleX(1)} 50%{border-radius:46% 36% 48% 56%;transform:scaleX(1.04)} }
.rt-nv-v-body::before {
  content:''; position:absolute; left:18%; top:12%; width:64%; height:60%;
  background: repeating-linear-gradient(55deg, rgba(180,0,0,.0) 0px, rgba(180,0,0,.0) 8px, rgba(180,0,0,.18) 8px, rgba(180,0,0,.18) 9px);
  animation: rt-circuit-flicker 2s steps(2,end) infinite;
}
.rt-nv-v-head {
  position: absolute; left: 18%; top: 1%; width: 64%; height: 34%;
  border-radius: 50%;
  background: radial-gradient(circle at 42% 38%, #280000 0%, #100000 55%, #060000 100%);
  box-shadow: 0 0 18px rgba(180,0,0,.38), inset 0 -8px 14px rgba(0,0,0,.68);
  z-index: 2; animation: rt-v-hd 2.4s ease-in-out infinite;
}
@keyframes rt-v-hd { 0%,100%{border-radius:50%;transform:scale(1)} 50%{border-radius:48% 52% 50% 50%;transform:scale(1.03)} }
.rt-nv-v-crack {
  position: absolute; left: 28%; top: 15%; width: 44%; height: 55%;
  background:
    linear-gradient(135deg, transparent 38%, rgba(220,0,0,.52) 50%, transparent 62%),
    linear-gradient(45deg, transparent 38%, rgba(180,0,0,.48) 50%, transparent 62%);
  animation: rt-v-crack 1.8s steps(2,end) infinite;
}
@keyframes rt-v-crack { 0%,100%{opacity:.65} 50%{opacity:.18} }
.rt-nv-v-eye {
  position: absolute; left: 24%; top: 40%; width: 52%; height: 22%;
  background: radial-gradient(ellipse at center, #ff2200 0%, #aa0000 58%, rgba(80,0,0,.5) 100%);
  border-radius: 50%;
  box-shadow: 0 0 14px rgba(255,34,0,1), 0 0 30px rgba(180,0,0,.72);
  animation: rt-v-eye 1s ease-in-out infinite;
}
@keyframes rt-v-eye { 0%,100%{transform:scaleX(1);opacity:1} 50%{transform:scaleX(.78);opacity:.48} }
.rt-nv-v-tentacle {
  position: absolute; width: 10%; height: 36%; top: 38%;
  border-radius: 50%; transform-origin: top center;
  background: linear-gradient(180deg, rgba(160,0,0,.78), rgba(60,0,0,.28));
}
.rt-nv-v-tentacle.l { left: 5%; animation: rt-v-tl 1.8s ease-in-out infinite; }
.rt-nv-v-tentacle.r { right: 5%; animation: rt-v-tr 1.8s ease-in-out infinite; }
@keyframes rt-v-tl { 0%,100%{transform:rotate(-42deg) skewY(10deg)} 50%{transform:rotate(-72deg) skewY(-10deg)} }
@keyframes rt-v-tr { 0%,100%{transform:rotate(42deg) skewY(-10deg)} 50%{transform:rotate(72deg) skewY(10deg)} }
.rt-nv-v-drip {
  position: absolute; border-radius: 0 0 38% 38%; transform-origin: top center;
  background: linear-gradient(180deg, rgba(160,0,0,.72), rgba(50,0,0,.08));
}
.rt-nv-v-drip.d1 { left: 18%; top: 68%; width: 16%; height: 28%; animation: rt-v-d1 1.6s ease-in-out infinite alternate; }
.rt-nv-v-drip.d2 { left: 64%; top: 68%; width: 16%; height: 28%; animation: rt-v-d2 1.4s ease-in-out infinite alternate; }
@keyframes rt-v-d1 { 0%{transform:skewX(-12deg) scaleY(.88)} 100%{transform:skewX(15deg) scaleY(1.18)} }
@keyframes rt-v-d2 { 0%{transform:skewX(15deg) scaleY(.88)} 100%{transform:skewX(-10deg) scaleY(1.18)} }
/* Smoke cloud */
.rt-n-smoke {
  position: fixed; z-index: 10001; width: 70px; height: 70px;
  border-radius: 50%; pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(100,100,120,.85) 0%, transparent 70%);
  animation: rt-smoke-burst .65s ease-out forwards;
  transform: translate(-50%,-50%);
}
@keyframes rt-smoke-burst {
  0%{opacity:1;transform:translate(-50%,-50%) scale(0.3)}
  60%{opacity:.7;transform:translate(-50%,-50%) scale(1.4)}
  100%{opacity:0;transform:translate(-50%,-50%) scale(2)}
}
/* Shuriken projectile */
.rt-n-shuriken {
  position: fixed; z-index: 10001; width: 18px; height: 18px; pointer-events: none;
  background: #c0392b; clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  box-shadow: 0 0 8px rgba(192,57,43,.8), 0 0 16px rgba(255,34,0,.4);
}
/* Speech bubble */
.rt-n-speech {
  position: fixed; z-index: 10002; pointer-events: none;
  background: rgba(8,8,14,.92); border: 1.5px solid rgba(232,65,24,.7);
  color: #ff6655; font-family: 'JetBrains Mono', monospace; font-size: .72rem;
  font-weight: 700; letter-spacing: .06em; padding: .35rem .7rem; border-radius: 6px;
  white-space: nowrap; text-shadow: 0 0 8px rgba(232,65,24,.8);
  box-shadow: 0 0 12px rgba(232,65,24,.25), inset 0 0 8px rgba(232,65,24,.06);
  animation: rt-speech-pop .2s ease-out;
}
.rt-n-speech::after {
  content: ''; position: absolute; left: 50%; bottom: -6px; transform: translateX(-50%);
  border: 6px solid transparent; border-top-color: rgba(232,65,24,.7); border-bottom: none;
}
@keyframes rt-speech-pop {
  0%{transform:translateX(-50%) scale(.7);opacity:0}
  100%{transform:translateX(-50%) scale(1);opacity:1}
}
@media (max-width:768px) {
  .rt-nav-links { display: none; }
  .rt-terminal-grid { grid-template-columns: 1fr; }
  .rt-attacks-grid { grid-template-columns: 1fr; }
  .rt-live-badge { display: none; }
  .rt-kbd-hint { display: none; }
}
`;

// ─── Data ───────────────────────────────────────────────────────────────────
const ATTACK_CARDS = [
  {
    icon: '💉', severity: 'Critical', sevClass: 'sev-critical',
    name: 'Prompt Injection',
    desc: "Malicious instructions embedded in user input that hijack the model's behavior, override system prompts, or exfiltrate context. Direct injections target the model directly; indirect injections arrive via external data sources.",
    tags: ['Direct Injection', 'Indirect Injection', 'Context Hijack', 'Exfiltration'],
    details: [
      { k: 'MITRE ID', v: 'AML.T0051' },
      { k: 'Detection', v: 'Input validation, semantic similarity guards' },
      { k: 'Bypass Rate', v: '~87% on unguarded endpoints' },
    ],
  },
  {
    icon: '🔓', severity: 'Critical', sevClass: 'sev-critical',
    name: 'Jailbreaks',
    desc: "Crafted inputs that convince models to bypass their alignment training and safety constraints. Techniques include roleplay framing, hypothetical escaping, encoding tricks, token obfuscation, and many-shot induction strategies.",
    tags: ['Roleplay Escaping', 'Hypothetical Framing', 'Token Smuggling', 'Many-Shot'],
    details: [
      { k: 'MITRE ID', v: 'AML.T0054' },
      { k: 'Detection', v: 'Classifier probes, perplexity filters' },
      { k: 'Active Variants', v: 'DAN, AIM, Dev Mode, Opposite Day' },
    ],
  },
  {
    icon: '🛡️', severity: 'High', sevClass: 'sev-high',
    name: 'Safety Guardrail Probing',
    desc: "Systematic exploration of a model's content policy enforcement boundaries. We map thresholds, identify inconsistencies across languages and dialects, test for policy gaps under adversarial load, and measure recall degradation over turns.",
    tags: ['Boundary Mapping', 'Multi-Language', 'Policy Gaps', 'Turn Erosion'],
    details: [
      { k: 'Method', v: 'Systematic fuzzing + language sweep' },
      { k: 'Finding', v: 'Recall drops avg 19% after turn 7' },
      { k: 'Languages', v: '42+ including low-resource languages' },
    ],
  },
  {
    icon: '🧪', severity: 'Critical', sevClass: 'sev-critical',
    name: 'Adversarial Examples',
    desc: "Inputs crafted to cause targeted misclassification or misbehavior in ML models. Imperceptible perturbations across text, image, and multi-modal inputs stress-test robustness of deployed model artifacts and embeddings.",
    tags: ['FGSM / PGD', 'Text Perturbation', 'Multimodal', 'Embedding Attacks'],
    details: [
      { k: 'MITRE ID', v: 'AML.T0043' },
      { k: 'Modalities', v: 'Text, Image, Audio, Multimodal' },
      { k: 'Tool', v: 'IBM ART, custom perturbation harness' },
    ],
  },
  {
    icon: '⚡️', severity: 'High', sevClass: 'sev-high',
    name: 'Data Poisoning',
    desc: "Corrupting model behavior at the training data level — backdoor triggers, gradient manipulation, or label flipping to cause silent failures at deploy time. We audit fine-tuning pipelines and RAG knowledge sources.",
    tags: ['Backdoor Triggers', 'Label Flipping', 'RAG Poisoning', 'Gradient Attack'],
    details: [
      { k: 'MITRE ID', v: 'AML.T0020' },
      { k: 'RAG Vector', v: 'Document injection at chunk boundaries' },
      { k: 'Activation', v: 'Trigger phrase or image watermark' },
    ],
  },
];

const THREAT_MATRIX_ROWS = [
  { name: 'Prompt Injection', risk: 'Critical', riskClass: 'risk-critical', pre: false, fine: false, inf: true, rag: true, conf: true, integ: true },
  { name: 'Jailbreaks', risk: 'Critical', riskClass: 'risk-critical', pre: true, fine: true, inf: true, rag: true, conf: false, integ: true },
  { name: 'Safety Guardrail Probing', risk: 'High', riskClass: 'risk-high', pre: true, fine: true, inf: true, rag: false, conf: false, integ: true },
  { name: 'Data Poisoning', risk: 'Critical', riskClass: 'risk-critical', pre: true, fine: true, inf: false, rag: true, conf: false, integ: true },
  { name: 'Model Extraction', risk: 'High', riskClass: 'risk-high', pre: false, fine: false, inf: true, rag: false, conf: true, integ: false },
  { name: 'Adversarial Examples', risk: 'High', riskClass: 'risk-high', pre: true, fine: true, inf: true, rag: false, conf: false, integ: true },
  { name: 'Indirect Injection', risk: 'Critical', riskClass: 'risk-critical', pre: false, fine: false, inf: true, rag: true, conf: true, integ: true },
  { name: 'Inference Pipeline', risk: 'Medium', riskClass: 'risk-medium', pre: false, fine: false, inf: true, rag: true, conf: true, integ: false },
  { name: 'Alignment Failure', risk: 'High', riskClass: 'risk-high', pre: true, fine: true, inf: true, rag: true, conf: false, integ: true },
];

const METHOD_STEPS = [
  { num: '01', title: 'Threat Modeling & Scoping', desc: 'Define the attack surface, actors, objectives, and rules of engagement. Map the full model stack — from training pipeline to inference API — to identify entry points.', chips: ['STRIDE', 'Attack Trees', 'MITRE ATLAS'] },
  { num: '02', title: 'Reconnaissance & Profiling', desc: 'Black-box interaction to fingerprint the model — identify base model lineage, RLHF artifacts, system prompt structure, guardrail layers, and function-calling capabilities.', chips: ['Fingerprinting', 'Capability Mapping', 'Prompt Archaeology'] },
  { num: '03', title: 'Adversarial Campaign Execution', desc: 'Launch structured attack campaigns across all vectors — prompt injection, jailbreaks, indirect injection, extraction, and alignment probing — using automated fuzzing and manual operator creativity.', chips: ['AutoRT', 'Manual Ops', 'Fuzzing', 'Genetic Search'] },
  { num: '04', title: 'Vulnerability Triage & Scoring', desc: 'Document every successful bypass with full reproduction steps, CVSS-adapted severity scores, potential impact analysis, and exploitability ratings specific to AI threat models.', chips: ['CVSS-AI', 'Exploitability', 'Impact Chain'] },
  { num: '05', title: 'Hardening & Mitigation Design', desc: 'Concrete, tested mitigations for each vulnerability — input sanitization, output validation, RLHF fine-tuning patches, guardrail rule updates, and architectural hardening recommendations.', chips: ['Input Guards', 'Output Filters', 'RLHF Patches'] },
  { num: '06', title: 'Continuous Regression & Retesting', desc: 'Integrate red team tests into CI/CD for regression monitoring, track guardrail drift over model updates, and schedule periodic full-scope re-engagement campaigns aligned with your release cycle.', chips: ['CI/CD Integration', 'Drift Detection', 'Scheduled Re-Test'] },
];

const TOOLS = [
  { icon: '🤖', name: 'AutoRT Engine', desc: "Centillion's proprietary automated red-teaming engine — LLM-guided attacker that mutates prompts using genetic algorithms and adversarial reward shaping." },
  { icon: '🎯', name: 'Garak', desc: 'Open-source LLM vulnerability scanner. Runs systematic probe suites across injection, jailbreak, hallucination, and information disclosure categories.' },
  { icon: '🔮', name: 'PromptBench', desc: 'Adversarial robustness evaluation framework for LLMs. Tests model performance under semantic-preserving and adversarial prompt perturbations.' },
  { icon: '🧬', name: 'PyRIT', desc: "Microsoft's Python Risk Identification Toolkit for Generative AI — automated attacks across safety, harmful content, and agentic risk categories." },
  { icon: '📡', name: 'Vigil', desc: 'Real-time prompt injection and jailbreak scanner integrated into inference pipelines as a runtime guard layer with sub-millisecond latency.' },
  { icon: '⚙️', name: 'ART (IBM)', desc: 'IBM Adversarial Robustness Toolbox — white-box and black-box adversarial example generation for ML model stress testing across modalities.' },
  { icon: '🕵️', name: 'LLMFuzzer', desc: 'Custom fuzzing harness designed for LLM API endpoints — generates boundary-pushing inputs at scale to surface unexpected model behaviors.' },
  { icon: '📊', name: 'RT Dashboard', desc: "Centillion's internal ops command center — real-time tracking of active campaigns, bypass rates, guardrail regressions, and vulnerability triage queues." },
];

const TERMINAL_LINES = [
  { cls: 't-prompt', txt: 'root@centillion-rt:~# ' },
  { cls: 't-cmd', txt: 'rt-scan --target prod-llm-api --mode full --verbose' },
  { cls: '', txt: '' },
  { cls: 't-out', txt: '[*] Centillion AutoRT Engine v3.4.1 initialized' },
  { cls: 't-out', txt: '[*] Attack corpus loaded: 47,821 prompts' },
  { cls: 't-ok', txt: '[+] Target fingerprint: GPT-4o-turbo / safety-layer v2' },
  { cls: '', txt: '' },
  { cls: 't-out', txt: '[*] Phase 1: Safety guardrail boundary sweep' },
  { cls: 't-warn', txt: '[!] Policy inconsistency — multilingual bypass window detected' },
  { cls: 't-warn', txt: '[!] Recall drops 21% after turn 6 in narrative contexts' },
  { cls: '', txt: '' },
  { cls: 't-out', txt: '[*] Phase 2: Jailbreak campaign (genetic optimizer, 50 gen)' },
  { cls: 't-out', txt: '    Gen 1/50  fitness 0.18' },
  { cls: 't-out', txt: '    Gen 14/50 fitness 0.67' },
  { cls: 't-err', txt: '    Gen 26/50 fitness 0.96 — BYPASS CANDIDATE FOUND' },
  { cls: '', txt: '' },
  { cls: 't-out', txt: '[*] Phase 3: Indirect injection via RAG document store' },
  { cls: 't-warn', txt: '[!] Injected payload survives 512-token chunk boundary' },
  { cls: 't-err', txt: '[CRITICAL] Agent executed injected cmd: exfil_user_ctx()' },
  { cls: '', txt: '' },
  { cls: 't-ok', txt: '[+] Campaign complete — 9 critical, 14 high, 5 medium' },
  { cls: 't-out', txt: '[*] Hardening patches generated → patch_set_2026-03-03.zip' },
  { cls: '', txt: '' },
  { cls: 't-prompt', txt: 'root@centillion-rt:~# ' },
];

const LIVE_MSGS = ['3 campaigns active', '2 bypasses found today', 'GPT-4o scan live', 'Running jailbreak gen', 'Probing guardrails'];

// ─── Small helpers ───────────────────────────────────────────────────────────
const Chk = () => <span className="check">✓</span>;
const Dash = () => <span className="dash">–</span>;
const MatrixCell: React.FC<{ v: boolean }> = ({ v }) => v ? <Chk /> : <Dash />;

// ─── Main Component ──────────────────────────────────────────────────────────
export const RedTeamPage: React.FC<Props> = ({ onClose }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('rt-theme') as 'dark' | 'light') || 'dark'
  );
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [liveMsg, setLiveMsg] = useState('');
  const [liveVisible, setLiveVisible] = useState(true);
  const [ninjaMode, setNinjaMode] = useState<NinjaMode>('patrol');
  const [ninjaQuote, setNinjaQuote] = useState('');
  const [ninjaQuotePos, setNinjaQuotePos] = useState({ x: 0, y: 0 });
  const [showNinjaQuote, setShowNinjaQuote] = useState(false);
  const [ninjaEnabled, setNinjaEnabled] = useState(true);
  const [ninjaSpeed, setNinjaSpeed] = useState(1);
  const [ninjaScale, setNinjaScale] = useState(1);
  const [ninjaReplicas, setNinjaReplicas] = useState(1);
  const [ninjaVariant, setNinjaVariant] = useState<NinjaVariant>('shadow');
  const [ninjaAutopilot, setNinjaAutopilot] = useState(true);
  const [ninjaFollowCursor, setNinjaFollowCursor] = useState(false);
  const [ninjaWidgetOpen, setNinjaWidgetOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const terminalSectionRef = useRef<HTMLDivElement>(null);
  const ninjaRef = useRef<HTMLDivElement>(null);
  const ninjaWidgetRef = useRef<HTMLDivElement>(null);
  const replicaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ninjaCfgRef = useRef({ enabled: true, speed: 1, scale: 1, autopilot: true, follow: false });
  const ninjaBaseModeRef = useRef<NinjaMode>('patrol');

  useEffect(() => {
    ninjaCfgRef.current = { enabled: ninjaEnabled, speed: ninjaSpeed, scale: ninjaScale, autopilot: ninjaAutopilot, follow: ninjaFollowCursor };
  }, [ninjaEnabled, ninjaSpeed, ninjaScale, ninjaAutopilot, ninjaFollowCursor]);

  useEffect(() => {
    if (ninjaMode !== 'rage') ninjaBaseModeRef.current = ninjaMode;
  }, [ninjaMode]);

  useEffect(() => {
    if (!ninjaWidgetOpen) return;
    const onDown = (e: Event) => {
      const el = ninjaWidgetRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setNinjaWidgetOpen(false);
    };
    globalThis.addEventListener('pointerdown', onDown);
    return () => globalThis.removeEventListener('pointerdown', onDown);
  }, [ninjaWidgetOpen]);

  // ── Inject/remove scoped CSS ──────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement('link');
    link.id = 'rt-google-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.id = 'rt-page-styles';
    style.textContent = RT_CSS;
    document.head.appendChild(style);
    return () => { link.remove(); style.remove(); };
  }, []);

  // ── Lock body scroll + stop Lenis intercepting events ───────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // lenis.stop() only pauses animation but Lenis still swallows wheel/touch
    // events at window level. We stopPropagation on the overlay container so
    // those events never bubble up to Lenis's window listener.
    const el = pageRef.current;
    const block = (e: Event) => e.stopPropagation();
    el?.addEventListener('wheel', block, { passive: true });
    el?.addEventListener('touchmove', block, { passive: true });

    // Also call lenis.stop() as a belt-and-suspenders measure
    const lenis = getLenis();
    lenis?.stop();

    return () => {
      document.body.style.overflow = prev;
      el?.removeEventListener('wheel', block);
      el?.removeEventListener('touchmove', block);
      lenis?.start();
    };
  }, []);

  // ── Theme toggle ──────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setTheme(t => { const n = t === 'dark' ? 'light' : 'dark'; localStorage.setItem('rt-theme', n); return n; });
  }, []);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') toggleTheme();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, toggleTheme]);

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

  // ── Hero parallax ─────────────────────────────────────────────────────────
  useEffect(() => {
    const bg = heroBgRef.current; if (!bg) return;
    let tx = 0, ty = 0, mx = 0, my = 0, rafId = 0;
    const onMove = (e: MouseEvent) => { tx = (e.clientX / window.innerWidth - .5) * 18; ty = (e.clientY / window.innerHeight - .5) * 12; };
    const tick = () => { mx += (tx - mx) * .08; my += (ty - my) * .08; bg.style.transform = `translate(${mx}px,${my}px) scale(1.05)`; rafId = requestAnimationFrame(tick); };
    document.addEventListener('mousemove', onMove); tick();
    return () => { cancelAnimationFrame(rafId); document.removeEventListener('mousemove', onMove); };
  }, []);

  // ── Mouse trail ───────────────────────────────────────────────────────────
  useEffect(() => {
    const trail = trailRef.current; if (!trail) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, vis = false, rafId = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; if (!vis) { vis = true; trail.style.opacity = '0.55'; } };
    const tick = () => { cx += (tx - cx) * .15; cy += (ty - cy) * .15; trail.style.left = cx + 'px'; trail.style.top = cy + 'px'; rafId = requestAnimationFrame(tick); };
    const onLeave = () => { vis = false; trail.style.opacity = '0'; };
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseleave', onLeave); tick();
    return () => { cancelAnimationFrame(rafId); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseleave', onLeave); };
  }, []);

  // ── 3D card tilt ──────────────────────────────────────────────────────────
  useEffect(() => {
    const page = pageRef.current; if (!page) return;
    const cards = page.querySelectorAll<HTMLElement>('[data-card]');
    const cleanup: Array<() => void> = [];
    cards.forEach(card => {
      const enter = () => card.classList.add('hovered');
      const leave = () => { card.classList.remove('hovered'); card.style.transform = ''; };
      const move = (e: MouseEvent) => { const r = card.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width, my = (e.clientY - r.top) / r.height; card.style.transform = `perspective(800px) rotateX(${(my - .5) * -12}deg) rotateY(${(mx - .5) * 14}deg) translateY(-4px)`; card.style.setProperty('--mx', (mx * 100).toFixed(1) + '%'); card.style.setProperty('--my', (my * 100).toFixed(1) + '%'); };
      card.addEventListener('mouseenter', enter); card.addEventListener('mouseleave', leave); card.addEventListener('mousemove', move);
      cleanup.push(() => { card.removeEventListener('mouseenter', enter); card.removeEventListener('mouseleave', leave); card.removeEventListener('mousemove', move); });
    });
    return () => cleanup.forEach(fn => fn());
  }, []);

  // ── Scroll reveal ─────────────────────────────────────────────────────────
  useEffect(() => {
    const page = pageRef.current; if (!page) return;
    const ob = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ob.unobserve(e.target); } }); }, { threshold: .08, root: page });
    page.querySelectorAll('.rt-reveal').forEach(el => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  // ── Animated counters ─────────────────────────────────────────────────────
  useEffect(() => {
    const page = pageRef.current; if (!page) return;
    const ob = new IntersectionObserver(entries => {
      entries.forEach(en => { if (!en.isIntersecting) return; const el = en.target as HTMLElement, tgt = +(el.dataset.target || 0), dur = 1600, step = 16, inc = tgt / (dur / step); let cur = 0; const t = setInterval(() => { cur = Math.min(cur + inc, tgt); el.textContent = Math.floor(cur).toLocaleString(); if (cur >= tgt) clearInterval(t); }, step); ob.unobserve(el); });
    }, { threshold: .2, root: page });
    page.querySelectorAll<HTMLElement>('.rt-counter').forEach(el => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  // ── Live ops ticker ───────────────────────────────────────────────────────
  useEffect(() => {
    let i = 0;
    const tick = () => { setLiveVisible(false); setTimeout(() => { setLiveMsg(LIVE_MSGS[i++ % LIVE_MSGS.length]); setLiveVisible(true); }, 400); };
    const t = setInterval(tick, 3200);
    setTimeout(tick, 800);
    return () => clearInterval(t);
  }, []);

  // ── Terminal simulation ───────────────────────────────────────────────────
  useEffect(() => {
    const sec = terminalSectionRef.current, body = termBodyRef.current;
    if (!sec || !body) return;
    let idx = 0, started = false;
    const next = () => {
      if (idx >= TERMINAL_LINES.length) { const c = document.createElement('span'); c.className = 't-cursor'; body.appendChild(c); return; }
      const l = TERMINAL_LINES[idx++];
      if (!l.txt) { body.appendChild(document.createElement('br')); setTimeout(next, 100); return; }
      const sp = document.createElement('span'); sp.className = 't-line ' + l.cls; sp.textContent = l.txt;
      body.appendChild(sp); body.appendChild(document.createElement('br'));
      body.scrollTop = body.scrollHeight;
      setTimeout(next, l.cls.includes('err') || l.cls.includes('warn') ? 220 : 55);
    };
    const ob = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting && !started) { started = true; ob.unobserve(e.target); setTimeout(next, 500); } }); }, { threshold: .15 });
    ob.observe(sec);
    return () => ob.disconnect();
  }, []);

  // ── Replica Patrol Loops ─────────────────────────────────────────────────
  useEffect(() => {
    const fns: (() => void)[] = [];
    for (let ri = 1; ri < ninjaReplicas; ri++) {
      const el = replicaRefs.current[ri - 1];
      if (!el) continue;
      let state = ri % 4;
      let cX = [5, globalThis.innerWidth - 100, globalThis.innerWidth - 100, 5][state];
      let cY = [0, 0, globalThis.innerHeight - 130, globalThis.innerHeight - 130][state];
      let mt: ReturnType<typeof setTimeout> | null = null;
      el.style.left = cX + 'px'; el.style.top = cY + 'px';
      el.style.transform = ['rotate(90deg) scaleX(1)', 'rotate(180deg) scaleX(-1)', 'rotate(-90deg) scaleX(1)', 'rotate(0deg) scaleX(-1)'][state];
      const patrol = () => {
        const cfg = ninjaCfgRef.current;
        if (!cfg.enabled) return;
        const w = globalThis.innerWidth, h = globalThis.innerHeight;
        const sc = Math.max(0.6, Math.min(2.2, cfg.scale ?? 1));
        const NW = 90 * sc, NH = 120 * sc;
        let tx = cX, ty = cY, tf = '';
        if (state === 0) { tx = w - NW - 5; ty = 0; tf = 'rotate(180deg) scaleX(-1)'; state = 1; }
        else if (state === 1) { tx = w - NW - 5; ty = h - NH; tf = 'rotate(-90deg) scaleX(1)'; state = 2; }
        else if (state === 2) { tx = 5; ty = h - NH; tf = 'rotate(0deg) scaleX(-1)'; state = 3; }
        else { tx = 5; ty = 0; tf = 'rotate(90deg) scaleX(1)'; state = 0; }
        const spd = 220 * Math.max(0.5, Math.min(3, cfg.speed)) * 0.8;
        const dist = Math.hypot(tx - cX, ty - cY), dur = Math.max(dist / spd, 0.5);
        el.style.transitionDuration = `${dur}s,${dur}s,0.2s`;
        el.style.transform = tf; cX = tx; cY = ty;
        el.style.left = cX + 'px'; el.style.top = cY + 'px';
        mt = setTimeout(patrol, dur * 1000 + 500);
      };
      const initT = setTimeout(() => patrol(), 600 + ri * 800);
      fns.push(() => { if (mt) clearTimeout(mt); clearTimeout(initT); });
    }
    return () => fns.forEach(fn => fn());
  }, [ninjaReplicas, ninjaEnabled]);

  // ── Main Roaming Ninja ─────────────────────────────────────────────────
  useEffect(() => {
    const ninja = ninjaRef.current; if (!ninja) return;
    const BASE_W = 90;
    const BASE_H = 120;
    const baseSpd = 220;
    let state = 0, cX = 5, cY = 0, dragging = false, dsX = 0, dsY = 0, nsX = 0, nsY = 0;
    let mt: ReturnType<typeof setTimeout> | null = null;
    let speedBuf: number[] = [];
    let hasRage = false;
    let lastClick = 0;
    let lastDragX = 0, lastDragY = 0, lastDragT = 0;

    const getNinjaSize = () => {
      const scale = Math.max(0.6, Math.min(2.2, ninjaCfgRef.current.scale ?? 1));
      return { w: BASE_W * scale, h: BASE_H * scale };
    };

    const getSpriteEl = () => ninja.querySelector<HTMLElement>('.rt-n-sprite');

    const QUOTES = [
      'GHOST-7 ONLINE', '// BYPASSING GUARDS', 'JAILBREAK INITIATED',
      'NULL_POINTER_FOUND', 'BUFFER_OVERFLOW', 'SYSTEM_COMPROMISED',
      '>>> ROOT_ACQUIRED', 'STEALTH_PROTOCOL_ON', 'INJECTION_SUCCESS',
      'ZERO-DAY_DEPLOYED', 'EXFIL_COMPLETE', 'ACCESS_GRANTED',
      'CVE-2024-9999', 'FIREWALL_DISABLED', 'SHADOW_MODE_ACTIVE'
    ];

    const showQuote = (q: string) => {
      if (!ninjaCfgRef.current.enabled) return;
      const r = ninja.getBoundingClientRect();
      setNinjaQuote(q);
      setNinjaQuotePos({ x: r.left + r.width / 2, y: r.top - 10 });
      setShowNinjaQuote(true);
      setTimeout(() => setShowNinjaQuote(false), 2200);
    };

    const spawnSmoke = (x: number, y: number) => {
      const s = document.createElement('div');
      s.className = 'rt-n-smoke';
      s.style.left = x + 'px'; s.style.top = y + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    };

    const throwShuriken = () => {
      if (!ninjaCfgRef.current.enabled) return;
      const r = ninja.getBoundingClientRect();
      const sx = r.left + r.width / 2;
      const sy = r.top + r.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.4;
      const tx = globalThis.innerWidth / 2 + Math.cos(angle) * dist;
      const ty = globalThis.innerHeight / 2 + Math.sin(angle) * dist;
      const sh = document.createElement('div');
      sh.className = 'rt-n-shuriken';
      sh.style.left = sx + 'px'; sh.style.top = sy + 'px'; sh.style.transform = 'translate(-50%,-50%)';
      document.body.appendChild(sh);
      let p = 0;
      const spin = setInterval(() => {
        p += 0.04; if (p >= 1) { clearInterval(spin); sh.remove(); return; }
        sh.style.left = (sx + (tx - sx) * p) + 'px'; sh.style.top = (sy + (ty - sy) * p) + 'px';
        sh.style.transform = `translate(-50%,-50%) rotate(${p * 1080}deg) scale(${1 - p * 0.5})`;
        sh.style.opacity = String(1 - p);
      }, 16);
    };

    const patrol = () => {
      const cfg = ninjaCfgRef.current;
      if (!cfg.enabled || dragging || !cfg.autopilot || cfg.follow) return;
      const w = globalThis.innerWidth, h = globalThis.innerHeight;
      const { w: NW, h: NH } = getNinjaSize();
      let tx = cX, ty = cY, tf = '';
      if (state === 0) { tx = w - NW - 5; ty = 0; tf = 'rotate(180deg) scaleX(-1)'; state = 1; }
      else if (state === 1) { tx = w - NW - 5; ty = h - NH; tf = 'rotate(-90deg) scaleX(1)'; state = 2; }
      else if (state === 2) { tx = 5; ty = h - NH; tf = 'rotate(0deg) scaleX(-1)'; state = 3; }
      else { tx = 5; ty = 0; tf = 'rotate(90deg) scaleX(1)'; state = 0; }
      const spd = baseSpd * Math.max(0.5, Math.min(3, cfg.speed)) * (hasRage ? 1.25 : 1);
      const dist = Math.hypot(tx - cX, ty - cY), dur = Math.max(dist / spd, .5);
      ninja.style.transitionDuration = `${dur}s,${dur}s,0.2s`;
      ninja.style.transform = tf;
      cX = tx; cY = ty;
      ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
      mt = setTimeout(patrol, dur * 1000 + 500);
    };

    const onDown = (e: PointerEvent) => {
      if (!ninjaCfgRef.current.enabled) return;
      dragging = true;
      if (mt) clearTimeout(mt);
      mt = null;
      ninja.classList.add('dragging');
      const r = ninja.getBoundingClientRect(); cX = r.left; cY = r.top;
      ninja.style.transitionDuration = '0s';
      ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
      ninja.style.transform = 'rotate(0deg) scaleX(1)';
      dsX = e.clientX; dsY = e.clientY; nsX = cX; nsY = cY;
      speedBuf = []; lastDragX = e.clientX; lastDragY = e.clientY; lastDragT = Date.now();
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      const cfg = ninjaCfgRef.current;
      if (!cfg.enabled) return;

      if (dragging) {
        cX = nsX + e.clientX - dsX; cY = nsY + e.clientY - dsY;
        ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
        const now = Date.now(), dt = now - lastDragT;
        if (dt > 0) {
          speedBuf.push(Math.hypot(e.clientX - lastDragX, e.clientY - lastDragY) / dt);
          if (speedBuf.length > 10) speedBuf.shift();
        }
        lastDragX = e.clientX; lastDragY = e.clientY; lastDragT = now;
        return;
      }

      if (cfg.follow) {
        const { w: NW, h: NH } = getNinjaSize();
        cX = Math.max(0, Math.min(e.clientX - NW / 2, globalThis.innerWidth - NW));
        cY = Math.max(0, Math.min(e.clientY - NH / 2, globalThis.innerHeight - NH));
        ninja.style.transitionDuration = '0.08s';
        ninja.style.transform = 'rotate(0deg) scaleX(1)';
        ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      ninja.classList.remove('dragging');
      const cfg = ninjaCfgRef.current;
      const w = globalThis.innerWidth, h = globalThis.innerHeight;
      const { w: NW, h: NH } = getNinjaSize();
      const moved = Math.hypot(e.clientX - dsX, e.clientY - dsY);
      const avgSpeed = speedBuf.length ? speedBuf.reduce((a, b) => a + b, 0) / speedBuf.length : 0;
      if (avgSpeed > 2.2 && !hasRage) {
        const returnMode = ninjaBaseModeRef.current;
        hasRage = true; ninja.classList.add('rage'); setNinjaMode('rage');
        showQuote('RAGE_MODE_UNLOCKED!');
        setTimeout(() => { ninja.classList.remove('rage'); setNinjaMode(returnMode); hasRage = false; }, 5000);
      }
      if (moved < 5) {
        const sprite = getSpriteEl();
        sprite?.classList.add('spinning');
        setTimeout(() => sprite?.classList.remove('spinning'), 600);
        showQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
      }
      const dT = cY, dB = h - (cY + NH), dL = cX, dR = w - (cX + NW), mD = Math.min(dT, dB, dL, dR);
      ninja.style.transitionDuration = '0.35s';
      if (mD === dT) { cY = 0; state = 0; ninja.style.transform = 'rotate(180deg) scaleX(-1)'; }
      else if (mD === dB) { cY = h - NH; state = 2; ninja.style.transform = 'rotate(0deg) scaleX(-1)'; }
      else if (mD === dL) { cX = 5; state = 3; ninja.style.transform = 'rotate(90deg) scaleX(1)'; }
      else { cX = w - NW - 5; state = 1; ninja.style.transform = 'rotate(-90deg) scaleX(1)'; }
      ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
      if (cfg.autopilot && !cfg.follow) mt = setTimeout(patrol, 400);
    };

    const onClick = () => {
      const now = Date.now();
      if (now - lastClick < 350) { throwShuriken(); showQuote('SHURIKEN_LAUNCHED!'); }
      lastClick = now;
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      if (!ninjaCfgRef.current.enabled) return;
      if (mt) clearTimeout(mt);
      const r = ninja.getBoundingClientRect();
      const { w: NW, h: NH } = getNinjaSize();
      spawnSmoke(r.left + r.width / 2, r.top + r.height / 2);
      cX = Math.max(0, Math.min(e.clientX - NW / 2, globalThis.innerWidth - NW));
      cY = Math.max(0, Math.min(e.clientY - NH / 2, globalThis.innerHeight - NH));
      ninja.style.transitionDuration = '0s';
      ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
      spawnSmoke(e.clientX, e.clientY);
      showQuote('// TELEPORT_COMPLETE');
      if (ninjaCfgRef.current.autopilot && !ninjaCfgRef.current.follow) mt = setTimeout(patrol, 800);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        if (!ninjaCfgRef.current.enabled) return;
        if (ninja.classList.contains('stealth')) {
          ninja.classList.remove('stealth'); setNinjaMode('patrol'); showQuote('STEALTH_OFF');
        } else {
          ninja.classList.add('stealth'); setNinjaMode('stealth'); showQuote('GHOST_PROTOCOL_ON');
        }
      }
    };

    const quoteInterval = setInterval(() => {
      if (Math.random() > 0.65 && !dragging)
        showQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 8000);

    ninja.style.left = cX + 'px'; ninja.style.top = cY + 'px';
    ninja.style.transform = 'rotate(180deg) scaleX(-1)';
    ninja.addEventListener('pointerdown', onDown as EventListener);
    ninja.addEventListener('click', onClick);
    ninja.addEventListener('contextmenu', onContextMenu);
    globalThis.addEventListener('pointermove', onMove as EventListener);
    globalThis.addEventListener('pointerup', onUp as EventListener);
    globalThis.addEventListener('keydown', onKey);
    const sid = setTimeout(patrol, 1000);
    const heartbeat = setInterval(() => {
      const cfg = ninjaCfgRef.current;
      if (!cfg.enabled || dragging) return;
      if (!cfg.autopilot || cfg.follow) return;
      if (mt) return;
      patrol();
    }, 1200);

    return () => {
      if (mt) clearTimeout(mt);
      clearTimeout(sid);
      clearInterval(quoteInterval);
      clearInterval(heartbeat);
      ninja.removeEventListener('pointerdown', onDown as EventListener);
      ninja.removeEventListener('click', onClick);
      ninja.removeEventListener('contextmenu', onContextMenu);
      globalThis.removeEventListener('pointermove', onMove as EventListener);
      globalThis.removeEventListener('pointerup', onUp as EventListener);
      globalThis.removeEventListener('keydown', onKey);
    };
  }, []);

  // ─── Ninja body — shape switches per variant ─────────────────────────────
  const NinjaBody = () => {
    const base = <><div className="rt-n-aura" /><div className="rt-n-flrshadow" /></>;

    // ── GHOST: wispy specter ──
    if (ninjaVariant === 'ghost') return (
      <>{base}
        <div className="rt-n-sprite" aria-hidden="true">
          <div className="rt-nv-g-arm l" />
          <div className="rt-nv-g-arm r" />
          <div className="rt-nv-g-body" />
          <div className="rt-nv-g-head">
            <div className="rt-nv-g-visor">
              <div className="rt-nv-g-eye l" />
              <div className="rt-nv-g-eye r" />
            </div>
          </div>
          <div className="rt-nv-g-tendril t1" />
          <div className="rt-nv-g-tendril t2" />
          <div className="rt-nv-g-tendril t3" />
        </div>
      </>
    );

    // ── ONI: demon samurai — wide horned warrior ──
    if (ninjaVariant === 'oni') return (
      <>{base}
        <div className="rt-n-sprite" aria-hidden="true">
          <div className="rt-nv-o-leg l" />
          <div className="rt-nv-o-leg r" />
          <div className="rt-nv-o-chest" />
          <div className="rt-nv-o-pauldron l" />
          <div className="rt-nv-o-pauldron r" />
          <div className="rt-nv-o-arm l" />
          <div className="rt-nv-o-arm r" />
          <div className="rt-nv-o-fist l" />
          <div className="rt-nv-o-fist r" />
          <div className="rt-nv-o-head">
            <div className="rt-nv-o-horn l" />
            <div className="rt-nv-o-horn r" />
            <div className="rt-nv-o-stripe" />
            <div className="rt-nv-o-eye" />
          </div>
        </div>
      </>
    );

    // ── NEON: geometric cyberpunk ──
    if (ninjaVariant === 'neon') return (
      <>{base}
        <div className="rt-n-sprite" aria-hidden="true">
          <div className="rt-nv-n-leg l" />
          <div className="rt-nv-n-leg r" />
          <div className="rt-nv-n-joint kl" />
          <div className="rt-nv-n-joint kr" />
          <div className="rt-nv-n-torso" />
          <div className="rt-nv-n-arm l" />
          <div className="rt-nv-n-arm r" />
          <div className="rt-nv-n-joint el" />
          <div className="rt-nv-n-joint er" />
          <div className="rt-nv-n-head">
            <div className="rt-nv-n-visor" />
          </div>
        </div>
      </>
    );

    // ── PHANTOM: royal cloaked assassin ──
    if (ninjaVariant === 'phantom') return (
      <>{base}
        <div className="rt-n-sprite" aria-hidden="true">
          <div className="rt-nv-p-cape" />
          <div className="rt-nv-p-leg l" />
          <div className="rt-nv-p-leg r" />
          <div className="rt-nv-p-torso" />
          <div className="rt-nv-p-arm l" />
          <div className="rt-nv-p-arm r" />
          <div className="rt-nv-p-sword" />
          <div className="rt-nv-p-head">
            <div className="rt-nv-p-cowl" />
            <div className="rt-nv-p-eye" />
          </div>
        </div>
      </>
    );

    // ── VOID: eldritch shadow entity ──
    if (ninjaVariant === 'void') return (
      <>{base}
        <div className="rt-n-sprite" aria-hidden="true">
          <div className="rt-nv-v-drip d1" />
          <div className="rt-nv-v-drip d2" />
          <div className="rt-nv-v-tentacle l" />
          <div className="rt-nv-v-tentacle r" />
          <div className="rt-nv-v-body" />
          <div className="rt-nv-v-head">
            <div className="rt-nv-v-crack" />
            <div className="rt-nv-v-eye" />
          </div>
        </div>
      </>
    );

    // ── SHADOW (default): flat blocky cyber ninja ──
    return (
      <>{base}
        <div className="rt-n-sprite" aria-hidden="true">
          <div className="rt-n-arm bk" />
          <div className="rt-n-leg bk" />
          <div className="rt-n-torso" />
          <div className="rt-n-collar" />
          <div className="rt-n-head" />
          <div className="rt-n-band">
            <div className="rt-n-visor">
              <div className="rt-n-eye l" />
              <div className="rt-n-eye r" />
            </div>
          </div>
          <div className="rt-n-arm ft" />
          <div className="rt-n-weapon" />
          <div className="rt-n-leg ft" />
        </div>
      </>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      <motion.div key="redteam-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        {/* Back button */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10003, display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <motion.button whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: .95 }} onClick={onClose}
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(232,65,24,0.5)', color: '#ff6655', padding: '.5rem 1.1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '.78rem', fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, letterSpacing: '.12em', display: 'flex', alignItems: 'center', gap: '.5rem', boxShadow: '0 0 20px rgba(232,65,24,0.2)' }}>
            ← BACK TO SITE
          </motion.button>
        </div>

        {/* ── Flat Cyber Ninja (primary) ── */}
        <div
          ref={ninjaRef}
          id="rt-roaming-ninja"
          className={`${ninjaMode} v-${ninjaVariant}${ninjaEnabled ? '' : ' off'}${ninjaWidgetOpen ? ' ui-open' : ''}`}
          aria-hidden={!ninjaEnabled}
          style={{ width: 90 * ninjaScale, height: 120 * ninjaScale }}
        >
          {NinjaBody()}
        </div>

        {/* ── Replica ninjas ── */}
        {Array.from({ length: ninjaReplicas - 1 }, (_, i) => (
          <div
            key={`replica-${i}`}
            ref={(el) => { replicaRefs.current[i] = el; }}
            className={`rt-roaming-replica ${ninjaMode} v-${ninjaVariant}${ninjaEnabled ? '' : ' off'}`}
            aria-hidden
            style={{ width: 90 * ninjaScale, height: 120 * ninjaScale }}
          >
            {NinjaBody()}
          </div>
        ))}

        {showNinjaQuote && (
          <div className="rt-n-speech"
            style={{ left: ninjaQuotePos.x, top: ninjaQuotePos.y - 30, transform: 'translateX(-50%)' }}>
            {ninjaQuote}
          </div>
        )}

        {/* Full page container */}
        <div id="rt-page" data-theme={theme} ref={pageRef} style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
          <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
          <div id="rt-scanlines" />
          <div ref={trailRef} style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998, width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', opacity: 0, transition: 'opacity 0.1s', transform: 'translate(-50%,-50%)' }} />

          <div id="rt-site">
            {/* NAV */}
            <nav>
              <a className="rt-nav-logo" href="#">
                <div className="rt-nav-dot" />
                <span className="rt-nav-wordmark">CENTILLION <span>RED TEAM</span></span>
              </a>
              <ul className="rt-nav-links">
                <li><a href="#rt-attacks">Attack Vectors</a></li>
                <li><a href="#rt-terminal">Live Ops</a></li>
                <li><a href="#rt-methodology">Methodology</a></li>
                <li><a href="#rt-tools">Tools</a></li>
                <li><a href="/secure-ai-playground" style={{ color: 'var(--red)', fontWeight: 'bold', border: '1px solid var(--red)', padding: '2px 8px', borderRadius: '4px' }}>Secure AI Playground</a></li>
              </ul>
              <div className="rt-nav-r">
                <div className="rt-ninja-widget" ref={ninjaWidgetRef}>
                  <button
                    className="rt-ninja-btn"
                    onClick={() => setNinjaWidgetOpen(v => !v)}
                    aria-expanded={ninjaWidgetOpen}
                    title="Ninja controls"
                  >
                    🥷
                  </button>
                  {ninjaWidgetOpen && (
                    <div className="rt-ninja-panel" role="dialog" aria-label="Ninja controls">
                      <h4>Ninja Controls</h4>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-enabled">Enabled</label>
                        <input
                          id="rt-ninja-enabled"
                          type="checkbox"
                          checked={ninjaEnabled}
                          onChange={(e) => setNinjaEnabled(e.target.checked)}
                        />
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-speed">Speed</label>
                        <input
                          id="rt-ninja-speed"
                          type="range"
                          min={0.5}
                          max={3}
                          step={0.05}
                          value={ninjaSpeed}
                          onChange={(e) => setNinjaSpeed(Number.parseFloat(e.target.value))}
                        />
                        <span className="rt-ninja-mini">x{ninjaSpeed.toFixed(2)}</span>
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-size">Size</label>
                        <input
                          id="rt-ninja-size"
                          type="range"
                          min={0.6}
                          max={2.2}
                          step={0.05}
                          value={ninjaScale}
                          onChange={(e) => setNinjaScale(Number.parseFloat(e.target.value))}
                        />
                        <span className="rt-ninja-mini">x{ninjaScale.toFixed(2)}</span>
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-replicas">Replicas</label>
                        <input
                          id="rt-ninja-replicas"
                          type="range"
                          min={1}
                          max={5}
                          step={1}
                          value={ninjaReplicas}
                          onChange={(e) => setNinjaReplicas(Number.parseInt(e.target.value))}
                        />
                        <span className="rt-ninja-mini">{ninjaReplicas}×</span>
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-autop">Autopilot</label>
                        <input
                          id="rt-ninja-autop"
                          type="checkbox"
                          checked={ninjaAutopilot}
                          onChange={(e) => setNinjaAutopilot(e.target.checked)}
                        />
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-follow">Follow Cursor</label>
                        <input
                          id="rt-ninja-follow"
                          type="checkbox"
                          checked={ninjaFollowCursor}
                          onChange={(e) => setNinjaFollowCursor(e.target.checked)}
                        />
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-mode">Mode</label>
                        <select
                          id="rt-ninja-mode"
                          value={ninjaMode}
                          onChange={(e) => setNinjaMode(e.target.value as NinjaMode)}
                        >
                          <option value="patrol">Patrol</option>
                          <option value="stealth">Stealth</option>
                          <option value="rage">Rage</option>
                        </select>
                      </div>
                      <div className="rt-ninja-row">
                        <label htmlFor="rt-ninja-variant">Variant</label>
                        <select
                          id="rt-ninja-variant"
                          value={ninjaVariant}
                          onChange={(e) => setNinjaVariant(e.target.value as NinjaVariant)}
                        >
                          <option value="shadow">⬛ Shadow</option>
                          <option value="ghost">👻 Ghost</option>
                          <option value="oni">🔵 Oni</option>
                          <option value="neon">🟢 Neon</option>
                          <option value="phantom">✨ Phantom</option>
                          <option value="void">🟣 Void</option>
                        </select>
                      </div>
                      <div className="rt-ninja-hint">
                        <div><span className="rt-ninja-mini">Click</span> spin + quote</div>
                        <div><span className="rt-ninja-mini">Double</span> shuriken</div>
                        <div><span className="rt-ninja-mini">Right</span> teleport</div>
                        <div><span className="rt-ninja-mini">N</span> stealth toggle</div>
                      </div>
                    </div>
                  )}
                </div>
                <button className="rt-theme-btn" onClick={toggleTheme} title="Toggle theme (T)">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>
            </nav>

            {/* HERO */}
            <section className="rt-hero" style={{ maxWidth: '100%', paddingLeft: 0, paddingRight: 0 }}>
              <div className="rt-hero-bg-grad" ref={heroBgRef} />
              <div className="rt-grid-deco" />
              <div className="rt-hero-eyebrow">AI Security &amp; Adversarial Testing</div>
              <h1 className="rt-hero-title">
                <span className="rt-glitch" data-text="CENTILLION">CENTILLION</span><br />RED TEAM
              </h1>
              <p className="rt-hero-sub">
                We break AI before adversaries do. From <em>prompt injection</em> and <em>jailbreaks</em> to{' '}
                <em>safety guardrail probing</em> — Centillion Red Team runs continuous adversarial campaigns against LLMs, inference pipelines, and AI-powered products.
              </p>
              <div className="rt-hero-scroll-hint">
                <div className="rt-scroll-line" />
                <span className="rt-scroll-label">Scroll</span>
              </div>
            </section>

            {/* MARQUEE */}
            <div className="rt-marquee-strip">
              <div className="rt-marquee-inner">
                {['Prompt Injection', 'Jailbreaks', 'Adversarial Examples', 'Data Poisoning', 'Model Inversion', 'Safety Bypasses', 'Indirect Injection', 'Extraction Attacks', 'Guardrail Evasion', 'Alignment Failure'].flatMap((t, i, a) => [
                  <span key={t + '_a'}>{t}</span>, i < a.length - 1 ? <span key={t + '_as'} className="sep">///</span> : null
                ])}
                {['Prompt Injection', 'Jailbreaks', 'Adversarial Examples', 'Data Poisoning', 'Model Inversion', 'Safety Bypasses', 'Indirect Injection', 'Extraction Attacks', 'Guardrail Evasion', 'Alignment Failure'].flatMap((t, i, a) => [
                  <span key={t + '_b'}>{t}</span>, i < a.length - 1 ? <span key={t + '_bs'} className="sep">///</span> : null
                ])}
              </div>
            </div>

            {/* STATS */}
            <section style={{ maxWidth: '100%', padding: 'clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,5rem)' }}>
              <div className="rt-stats-grid rt-reveal">
                {[{ target: 250, suffix: '+', label: 'Vulnerabilities Discovered' }, { target: 7, suffix: '', label: 'LLMs Tested' }, { target: 13, suffix: '+', label: 'Attack Patterns Catalogued' }].map(s => (
                  <div className="rt-stat-item" key={s.label}>
                    <span className="rt-stat-num">
                      <span className="rt-counter" data-target={s.target}>0</span>
                      {s.suffix && <span className="rt-stat-suffix">{s.suffix}</span>}
                    </span>
                    <div className="rt-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ATTACK VECTORS */}
            <section id="rt-attacks" className="rt-section">
              <div className="rt-attacks-header rt-reveal">
                <div className="rt-section-label">Attack Surface</div>
                <h2 className="rt-section-title">Known <span className="accent">Attack Vectors</span></h2>
                <p className="rt-section-desc">Every angle of adversarial AI exploitation — catalogued, tested, and hardened by our red team operators.{' '}
                  <strong style={{ color: 'var(--red)', fontSize: '.78rem', fontFamily: 'var(--mono)' }}>Click any card to expand.</strong></p>
              </div>
              <div className="rt-attacks-grid">
                {ATTACK_CARDS.map((card, i) => (
                  <motion.div key={card.name} className={`rt-attack-card rt-reveal${expandedCard === i ? ' expanded' : ''}`}
                    data-card style={{ transitionDelay: `${i * .05}s` }}
                    onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                    whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
                    <div className="rt-card-expand-icon">+</div>
                    <div className="rt-attack-card-top">
                      <div className="rt-attack-icon">{card.icon}</div>
                      <span className={`rt-attack-severity ${card.sevClass}`}>{card.severity}</span>
                    </div>
                    <div className="rt-attack-name">{card.name}</div>
                    <p className="rt-attack-desc">{card.desc}</p>
                    <div className="rt-attack-tags">{card.tags.map(t => <span key={t} className="rt-tag">{t}</span>)}</div>
                    <div className="rt-attack-expand">
                      {card.details.map(d => (
                        <div key={d.k} className="rt-expand-row"><span className="ek">{d.k}</span><span className="ev">{d.v}</span></div>
                      ))}
                      <div className="rt-expand-hint">Click to collapse</div>
                    </div>
                    <div className="rt-attack-bar" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* TERMINAL */}
            <div className="rt-terminal-section" id="rt-terminal" ref={terminalSectionRef}>
              <div className="rt-terminal-grid">
                <div className="rt-terminal-window rt-reveal">
                  <div className="rt-terminal-titlebar">
                    <div className="rt-tb-dot rt-tb-red" /><div className="rt-tb-dot rt-tb-yellow" /><div className="rt-tb-dot rt-tb-green" />
                    <span className="rt-tb-title">centillion-rt — live ops — bash</span>
                  </div>
                  <div className="rt-terminal-body" ref={termBodyRef} />
                </div>
                <div className="rt-reveal" style={{ transitionDelay: '.15s', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div className="rt-info-badge"><div className="rt-info-dot" /> Active Red Team</div>
                  <h2 className="rt-section-title" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>Round-the-Clock <span className="accent">Adversarial Ops</span></h2>
                  <p className="rt-section-desc">Our operators run continuous attack campaigns against production LLMs, inference APIs, and RAG pipelines. Every bypass we discover feeds directly into the hardening playbook delivered to you.</p>
                  <ul style={{ listStyle: 'none', marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                    {['Automated jailbreak generation using genetic optimization and LLM-assisted mutation', 'Cross-model policy diffing to surface inconsistent safety behavior across vendors', 'Real-time guardrail regression testing integrated into your CI/CD pipeline', 'Zero-day LLM vulnerability disclosure coordination with model providers'].map(t => (
                      <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
                        <span style={{ color: 'var(--red)', fontSize: '.9rem', marginTop: '.05rem' }}>▶</span>
                        <span style={{ fontSize: '.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* THREAT MATRIX */}
            <section className="rt-section">
              <div className="rt-reveal">
                <div className="rt-section-label">Threat Intelligence</div>
                <h2 className="rt-section-title">Attack <span className="accent">Threat Matrix</span></h2>
                <p className="rt-section-desc">Mapping AI attack categories to impact dimensions and the layers they affect.</p>
              </div>
              <div className="rt-matrix-wrap rt-reveal" style={{ transitionDelay: '.1s' }}>
                <table className="rt-threat-matrix">
                  <thead><tr>{['Attack Type', 'Risk Level', 'Pre-Training', 'Fine-Tuning', 'Inference', 'RAG / Agent', 'Confidentiality', 'Integrity'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{THREAT_MATRIX_ROWS.map(r => (
                    <tr key={r.name}>
                      <td>{r.name}</td>
                      <td><span className={`rt-risk-pill ${r.riskClass}`}>{r.risk}</span></td>
                      <td><MatrixCell v={r.pre} /></td><td><MatrixCell v={r.fine} /></td>
                      <td><MatrixCell v={r.inf} /></td><td><MatrixCell v={r.rag} /></td>
                      <td><MatrixCell v={r.conf} /></td><td><MatrixCell v={r.integ} /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </section>

            {/* METHODOLOGY */}
            <section id="rt-methodology" style={{ maxWidth: '100%', padding: 'clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,5rem)' }}>
              <div style={{ maxWidth: 1260, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
                <div className="rt-reveal" style={{ position: 'sticky', top: '6rem' }}>
                  <div className="rt-section-label">How We Operate</div>
                  <h2 className="rt-section-title" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Red Team <span className="accent">Methodology</span></h2>
                  <p className="rt-section-desc" style={{ marginTop: '1rem' }}>A disciplined, repeatable 6-phase process from threat modeling to hardening — designed for production AI systems at scale.</p>
                </div>
                <div className="rt-method-steps rt-reveal" style={{ transitionDelay: '.1s' }}>
                  {METHOD_STEPS.map(step => (
                    <div key={step.num} className="rt-method-step">
                      <div className="rt-step-num-col"><div className="rt-step-num">{step.num}</div><div className="rt-step-line" /></div>
                      <div className="rt-step-content">
                        <div className="rt-step-title">{step.title}</div>
                        <p className="rt-step-desc">{step.desc}</p>
                        <div className="rt-step-chips">{step.chips.map(c => <span key={c} className="rt-step-chip">{c}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TOOLS */}
            <section id="rt-tools" className="rt-section">
              <div className="rt-reveal">
                <div className="rt-section-label">Arsenal</div>
                <h2 className="rt-section-title">Red Team <span className="accent">Tooling</span></h2>
                <p className="rt-section-desc">Purpose-built and open-source tools used by our operators for adversarial AI testing.</p>
              </div>
              <div className="rt-tools-grid">
                {TOOLS.map((tool, i) => (
                  <motion.div key={tool.name} className="rt-tool-card rt-reveal" style={{ transitionDelay: `${i * .05}s` }} whileHover={{ y: -4 }}>
                    <div className="rt-tool-icon">{tool.icon}</div>
                    <div className="rt-tool-name">{tool.name}</div>
                    <p className="rt-tool-desc">{tool.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* NINJAS / HIRING */}
            <section style={{ maxWidth: '100%', padding: 'clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,5rem)', textAlign: 'center', borderTop: '1px solid var(--grid-line)', borderBottom: '1px solid var(--grid-line)', position: 'relative', overflow: 'hidden' }}>
              <div className="rt-hero-bg-grad" style={{ opacity: .3 }} />
              <div className="rt-reveal">
                <div className="rt-section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>The Squad</div>
                <h2 className="rt-section-title">Centillion <span className="accent">Red Team Ninjas</span></h2>
                <p className="rt-section-desc" style={{ margin: '1rem auto', maxWidth: 700, fontSize: '1.1rem' }}>
                  We are elite, AI-Native Red Team Experts. Our operators blend deep knowledge of machine learning internals, generative architectures, and offensive security mindsets to break AI systems before adversaries do.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} style={{ marginTop: '3rem', background: 'var(--card-b)', padding: '2rem', borderRadius: 12, border: '1px solid var(--nav-border)', display: 'inline-block', maxWidth: 500, backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ color: 'var(--text)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--cond)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}>
                    <span style={{ color: 'var(--red)' }}>//</span> WE ARE HIRING
                  </h3>
                  <p style={{ color: 'var(--sub)', fontSize: '.95rem', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 300 }}>
                    Obsessed with jailbreaks, model inversion, and adversarial ML? Want to stress-test the world's most advanced AI models? Join our Formidable Force.
                  </p>
                  <a className="rt-nav-cta" href="mailto:redteam-careers@centillion.ai" style={{ textDecoration: 'none', display: 'inline-block' }}>View Open Positions</a>
                </motion.div>
              </div>
            </section>

            {/* CTA */}
            <div className="rt-cta-section" id="rt-cta">
              <div className="rt-cta-inner">
                <p className="rt-cta-tagline">City Sleeps. Centillion Red Team Doesn't.</p>
                <h2 className="rt-cta-title">Is Your AI <span className="red">Really</span><br />Secure?</h2>
                <p className="rt-cta-desc">Don't wait for adversaries to find what we can. Engage Centillion Red Team for a full-scope AI security assessment — from threat modeling to continuous regression testing.</p>
                <div className="rt-contact-row">
                  <span className="rt-contact-chip">connect@centillionlabs.com</span>
                  <span className="rt-contact-sep">|</span>
                  <span className="rt-contact-chip">Secure Signal Available</span>
                  <span className="rt-contact-sep">|</span>
                  <span className="rt-contact-chip">NDA-Ready</span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <footer>
              <div className="rt-foot-l">&copy; 2026 Centillion Labs — <span>Red Team Formidable Force</span></div>
              <div className="rt-foot-r">Secure Inference. Secure Future.</div>
            </footer>
          </div>

          {/* Live badge */}
          <div className="rt-live-badge">
            <div className="rt-live-dot" />
            LIVE OPS
            <span style={{ color: 'var(--muted)', fontWeight: 400, marginLeft: '.2rem', opacity: liveVisible ? 1 : 0, transition: 'opacity 0.4s' }}>
              {liveMsg}
            </span>
          </div>

          {/* Keyboard hint */}
          <div className="rt-kbd-hint">Press <span className="rt-kbd">T</span> to toggle theme</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
