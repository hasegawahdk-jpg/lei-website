'use client';

import React, { useEffect, useRef } from 'react';
import { LEI } from './brand';
import type { Device } from './use-device';

const ANIM_PALETTE = {
  navy:     '#0a1f3a',
  navyMid:  '#3a4a66',
  teal:     '#3fc8c0',
  tealLt:   '#7fd9d4',
  tealPale: '#b8e7e3',
  gray:     '#8a99a5',
} as const;

function srand(i: number, salt = 1): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Confetti = {
  x: number; y: number; color: string; shape: 'square' | 'circle'; sz: number;
  dispDx: number; dispDy: number; rotStart: number; rotSpin: number;
  appearAt: number; explodeAt: number; opMax: number;
};

function buildConfetti(w: number, h: number, count: number): Confetti[] {
  const cx = w / 2, cy = h / 2;
  const baseR = Math.min(w, h) * 0.36;
  const out: Confetti[] = [];
  for (let i = 0; i < count; i++) {
    const a = srand(i, 1) * Math.PI * 2;
    const rJit = (srand(i, 2) - 0.5) * baseR * 0.6;
    const r = baseR + rJit;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;

    const palette = [
      ANIM_PALETTE.navy, ANIM_PALETTE.navy,
      ANIM_PALETTE.navyMid, ANIM_PALETTE.gray,
      ANIM_PALETTE.teal, ANIM_PALETTE.teal, ANIM_PALETTE.teal,
      ANIM_PALETTE.tealLt, ANIM_PALETTE.tealLt,
      ANIM_PALETTE.tealPale,
    ];
    const color = palette[Math.floor(srand(i, 3) * palette.length)];
    const shape: 'square' | 'circle' = srand(i, 4) < 0.42 ? 'square' : 'circle';
    const sz = 3 + srand(i, 5) * 14;

    const dispA = a + (srand(i, 6) - 0.5) * 0.5;
    const dispMag = baseR * (0.9 + srand(i, 7) * 1.4);

    out.push({
      x, y, color, shape, sz,
      dispDx: Math.cos(dispA) * dispMag,
      dispDy: Math.sin(dispA) * dispMag,
      rotStart: srand(i, 8) * Math.PI * 2,
      rotSpin: (srand(i, 9) - 0.5) * 6,
      appearAt: srand(i, 10) * 0.55,
      explodeAt: srand(i, 11) * 0.25,
      opMax: 0.75 + srand(i, 12) * 0.25,
    });
  }
  return out;
}

type LiveNode = {
  ax: number; ay: number; teal: boolean; big: boolean;
  ax1: number; ay1: number; ax2: number; ay2: number;
  px1: number; py1: number; px2: number; py2: number;
  sx1: number; sy1: number; sx2: number; sy2: number;
  hasRing: boolean; dotR: number; haloR: number; appearAt: number;
};

function buildLiveNodes(w: number, h: number, count: number): LiveNode[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    pts.push({
      x: w * (0.08 + srand(i, 21) * 0.84),
      y: h * (0.08 + srand(i, 22) * 0.84),
    });
  }
  for (let iter = 0; iter < 8; iter++) {
    for (let i = 0; i < pts.length; i++) {
      let dx = 0, dy = 0;
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;
        const ddx = pts[i].x - pts[j].x;
        const ddy = pts[i].y - pts[j].y;
        const d2 = ddx * ddx + ddy * ddy + 1;
        const force = 6000 / d2;
        dx += ddx / Math.sqrt(d2) * force;
        dy += ddy / Math.sqrt(d2) * force;
      }
      pts[i].x = Math.max(w * 0.07, Math.min(w * 0.93, pts[i].x + dx * 0.4));
      pts[i].y = Math.max(h * 0.1, Math.min(h * 0.9, pts[i].y + dy * 0.4));
    }
  }

  return pts.map((p, i) => {
    const teal = srand(i, 31) > 0.45;
    const big = srand(i, 32) > 0.55;
    return {
      ax: p.x, ay: p.y,
      teal, big,
      ax1: 18 + srand(i, 33) * 30,
      ay1: 18 + srand(i, 34) * 30,
      ax2: 8 + srand(i, 35) * 18,
      ay2: 8 + srand(i, 36) * 18,
      px1: srand(i, 37) * Math.PI * 2,
      py1: srand(i, 38) * Math.PI * 2,
      px2: srand(i, 39) * Math.PI * 2,
      py2: srand(i, 40) * Math.PI * 2,
      sx1: 2200 + srand(i, 41) * 1800,
      sy1: 2400 + srand(i, 42) * 2000,
      sx2: 700 + srand(i, 43) * 900,
      sy2: 600 + srand(i, 44) * 900,
      hasRing: srand(i, 45) > 0.78,
      dotR: big ? 5.5 + srand(i, 46) * 1.5 : 2.6 + srand(i, 47) * 1.6,
      haloR: big ? 26 + srand(i, 48) * 14 : 13 + srand(i, 49) * 8,
      appearAt: srand(i, 50) * 0.45,
    };
  });
}

type Edge = { a: number; b: number; delay: number; kind: 'main' | 'chord' };

function buildLiveEdges(pattern: 'polygon' | 'constellation' | 'chain', n: number): Edge[] {
  const edges: Edge[] = [];
  if (pattern === 'polygon') {
    for (let i = 0; i < n; i++) {
      edges.push({ a: i, b: (i + 1) % n, delay: i / n, kind: 'main' });
    }
    for (let k = 0; k < Math.floor(n / 6); k++) {
      const i = Math.floor(srand(k, 61) * n);
      const j = (i + 2 + Math.floor(srand(k, 62) * 3)) % n;
      edges.push({ a: i, b: j, delay: 0.7 + srand(k, 63) * 0.3, kind: 'chord' });
    }
  } else if (pattern === 'chain') {
    for (let i = 0; i < n - 1; i++) {
      edges.push({ a: i, b: i + 1, delay: i / n, kind: 'main' });
    }
    for (let i = 0; i < n - 3; i += 3) {
      edges.push({ a: i, b: i + 3, delay: 0.5 + (i / n) * 0.5, kind: 'chord' });
    }
  }
  return edges;
}

type NetworkAnimProps = {
  pattern?: 'polygon' | 'constellation' | 'chain';
  cycleMs?: number;
  phase1Ms?: number;
  phase2Ms?: number;
  blankMs?: number;
  phase3Ms?: number;
  confettiCount?: number;
  liveCount?: number;
  bg?: string;
  style?: React.CSSProperties;
};

export function NetworkAnim({
  pattern = 'polygon',
  cycleMs = 14500,
  phase1Ms = 2400,
  phase2Ms = 2400,
  blankMs = 350,
  phase3Ms = 9350,
  confettiCount = 220,
  liveCount = 16,
  bg = '#f0f5f4',
  style = {},
}: NetworkAnimProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<{
    w: number; h: number;
    confetti: Confetti[]; liveNodes: LiveNode[]; liveEdges: Edge[];
  } | null>(null);
  const t0Ref = useRef<number>(0);
  const visibleRef = useRef<boolean>(false);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.intersectionRatio > 0.15) {
          if (!visibleRef.current) {
            visibleRef.current = true;
            t0Ref.current = 0;
          }
        } else {
          visibleRef.current = false;
        }
      }
    }, { threshold: [0, 0.15, 0.5] });
    io.observe(cvs);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function rebuild() {
      if (!cvs || !ctx) return;
      const r = cvs.getBoundingClientRect();
      cvs.width = Math.max(1, r.width * dpr);
      cvs.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = r.width, h = r.height;
      const confetti = buildConfetti(w, h, confettiCount);
      const liveNodes = buildLiveNodes(w, h, liveCount);
      const liveEdges = buildLiveEdges(pattern, liveCount);
      stateRef.current = { w, h, confetti, liveNodes, liveEdges };
    }
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(cvs);

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeIn  = (t: number) => t * t * t;

    function frame(now: number) {
      const st = stateRef.current;
      if (!st || !ctx) { rafRef.current = requestAnimationFrame(frame); return; }
      const { w, h, confetti, liveNodes, liveEdges } = st;

      if (!visibleRef.current) {
        ctx.clearRect(0, 0, w, h);
        t0Ref.current = 0;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      if (!t0Ref.current) t0Ref.current = now;
      const t = (now - t0Ref.current) % cycleMs;

      ctx.clearRect(0, 0, w, h);

      const T1end = phase1Ms;
      const T2end = T1end + phase2Ms;
      const T3start = T2end + blankMs;

      if (t < T2end) {
        for (const p of confetti) {
          let alpha = 0, x = p.x, y = p.y, scale = 1, rot = 0;

          if (t < T1end) {
            const localT = clamp((t / T1end - p.appearAt) / (1 - p.appearAt * 0.5 + 0.001), 0, 1);
            alpha = easeOut(localT) * p.opMax;
            rot = p.rotStart + p.rotSpin * (t / 4000);
          } else {
            const ph2T = (t - T1end) / phase2Ms;
            const localT = clamp((ph2T - p.explodeAt) / (1 - p.explodeAt + 0.001), 0, 1);
            alpha = (1 - easeIn(localT)) * p.opMax;
            const eased = easeOut(localT);
            x = p.x + p.dispDx * eased;
            y = p.y + p.dispDy * eased;
            scale = 1 - eased * 0.35;
            rot = p.rotStart + p.rotSpin * (t / 1500);
          }

          if (alpha < 0.01) continue;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          if (p.shape === 'square') {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            const s = p.sz * scale;
            ctx.fillRect(-s/2, -s/2, s, s);
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(x, y, p.sz * scale * 0.55, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      if (t >= T3start && t < cycleMs) {
        const localT = t - T3start;
        const fadeIn = clamp(localT / 600, 0, 1);
        const fadeOutStart = phase3Ms - 700;
        const fadeOut = localT > fadeOutStart ? clamp(1 - (localT - fadeOutStart) / 700, 0, 1) : 1;
        const baseAlpha = easeOut(fadeIn) * fadeOut;

        const positions = liveNodes.map((n) => ({
          x: n.ax + Math.sin(localT / n.sx1 + n.px1) * n.ax1
                  + Math.sin(localT / n.sx2 + n.px2) * n.ax2,
          y: n.ay + Math.sin(localT / n.sy1 + n.py1) * n.ay1
                  + Math.cos(localT / n.sy2 + n.py2) * n.ay2,
        }));

        const edgeDrawMs = 600;
        const edgesPhaseMs = 2200;
        const drawEdge = (a: number, b: number, drawProg: number, kind: 'main' | 'chord') => {
          if (drawProg <= 0) return;
          const ax = positions[a].x, ay = positions[a].y;
          const bx = positions[b].x, by = positions[b].y;
          const dx = bx - ax, dy = by - ay;
          const ex = ax + dx * easeOut(drawProg);
          const ey = ay + dy * easeOut(drawProg);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = ANIM_PALETTE.teal;
          ctx.globalAlpha = baseAlpha * (kind === 'chord' ? 0.32 : 0.55) * easeOut(drawProg);
          ctx.lineWidth = kind === 'chord' ? 0.8 : 1;
          ctx.stroke();
        };

        if (pattern === 'constellation') {
          for (let i = 0; i < positions.length; i++) {
            const others: { j: number; d: number }[] = [];
            for (let j = 0; j < positions.length; j++) {
              if (i === j) continue;
              const dx = positions[i].x - positions[j].x;
              const dy = positions[i].y - positions[j].y;
              others.push({ j, d: dx * dx + dy * dy });
            }
            others.sort((a, b) => a.d - b.d);
            for (let k = 0; k < 2; k++) {
              const j = others[k].j;
              if (j <= i) continue;
              const startEdge = localT > (edgesPhaseMs * 0.6) ? 1 : easeOut(clamp(localT / edgesPhaseMs, 0, 1));
              drawEdge(i, j, startEdge, 'main');
            }
          }
        } else {
          for (let k = 0; k < liveEdges.length; k++) {
            const e = liveEdges[k];
            const startT = e.delay * (edgesPhaseMs - edgeDrawMs);
            const drawProg = clamp((localT - startT) / edgeDrawMs, 0, 1);
            drawEdge(e.a, e.b, drawProg, e.kind);
          }
        }
        ctx.globalAlpha = 1;

        for (let i = 0; i < liveNodes.length; i++) {
          const n = liveNodes[i];
          const p = positions[i];
          const localApT = clamp((localT / 800 - n.appearAt), 0, 1);
          const alpha = easeOut(localApT) * baseAlpha;
          if (alpha < 0.01) continue;

          const baseColor = n.teal ? ANIM_PALETTE.teal : ANIM_PALETTE.navy;
          const haloColor = n.teal ? ANIM_PALETTE.tealPale : ANIM_PALETTE.gray;
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, n.haloR);
          halo.addColorStop(0, haloColor + 'aa');
          halo.addColorStop(0.45, haloColor + '55');
          halo.addColorStop(1, haloColor + '00');
          ctx.fillStyle = halo;
          ctx.globalAlpha = alpha * 0.75;
          ctx.beginPath();
          ctx.arc(p.x, p.y, n.haloR, 0, Math.PI * 2);
          ctx.fill();

          if (n.hasRing) {
            ctx.strokeStyle = ANIM_PALETTE.teal;
            ctx.globalAlpha = alpha * 0.7;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, n.dotR * 2.5, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.fillStyle = baseColor;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, n.dotR, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [pattern, cycleMs, phase1Ms, phase2Ms, blankMs, phase3Ms, confettiCount, liveCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%', height: '100%',
        background: bg,
        ...style,
      }}
    />
  );
}

export function NetworkBand({ device }: { device: Device }) {
  const isSP = device === 'sp';
  return (
    <section style={{
      background: '#f0f5f4', position: 'relative', overflow: 'hidden',
      padding: 0,
    }}>
      <div style={{
        position: 'relative',
        height: isSP ? 460 : 700,
      }}>
        <NetworkAnim pattern="polygon" bg="#f0f5f4"/>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', textAlign: 'center',
          padding: isSP ? '0 32px' : '0 56px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 16,
          }}>
            <span style={{ width: 28, height: 1, background: LEI.teal }}/>
            <span className="lp-en" style={{
              fontSize: isSP ? 10 : 11, fontWeight: 700, letterSpacing: '0.32em',
              color: LEI.teal,
            }}>CONNECTING DOTS</span>
            <span style={{ width: 28, height: 1, background: LEI.teal }}/>
          </div>
          <p className="lp-jp" style={{
            fontSize: isSP ? 17 : 26, fontWeight: 700,
            lineHeight: 1.7, letterSpacing: '0.02em',
            color: LEI.ink, maxWidth: 760,
          }}>
            点と点を、線で結ぶ。<br/>
            <span style={{ color: LEI.navy }}>
              事業を、組織を、テクノロジーを。
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
