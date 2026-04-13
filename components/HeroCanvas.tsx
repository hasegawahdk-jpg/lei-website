"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TEAL = "#2abfbf", TEAL_L = "#5dd4d4", TEAL_D = "#1a9090", NAVY = "#0d2137", NAVY_M = "#1a3a52";
    const COLS = [TEAL, TEAL_L, TEAL_D, NAVY, NAVY_M];

    // タイムライン(ms)
    const T_A = 3000, T_SCATTER = 4000, T_BLANK = 4600, T_LIGHT = 5600;

    let W = () => canvas.offsetWidth || window.innerWidth * 0.6;
    let H = () => canvas.offsetHeight || window.innerHeight;

    const resize = () => {
      canvas.width = W() * dpr;
      canvas.height = H() * dpr;
    };
    resize();

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const easeIn = (t: number) => t * t;

    // ── Particle A ──
    const PC = 120;
    let parts: any[] = [];
    const initParts = () => {
      const cx = W() / 2, cy = H() / 2;
      const rad = Math.min(W(), H()) * 0.33, sp = rad * 0.28;
      parts = Array.from({ length: PC }, () => {
        const a = Math.random() * Math.PI * 2, r = rad + (Math.random() - 0.5) * sp;
        return {
          baseAngle: a, baseR: r,
          speed: (Math.random() - 0.5) * 0.15,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          size: 3 + Math.random() * 10,
          isCircle: Math.random() > 0.45,
          color: COLS[Math.floor(Math.random() * COLS.length)],
          alpha: 0.55 + Math.random() * 0.45,
          scatterA: Math.random() * Math.PI * 2,
          scatterD: 50 + Math.random() * 100,
        };
      });
    };

    const drawA = (am: number) => {
      const cx = W() / 2, cy = H() / 2;
      parts.forEach(p => {
        p.baseAngle += p.speed * 0.008; p.rot += p.rotSpeed;
        const x = cx + Math.cos(p.baseAngle) * p.baseR;
        const y = cy + Math.sin(p.baseAngle) * p.baseR;
        ctx.save(); ctx.globalAlpha = p.alpha * am; ctx.fillStyle = p.color;
        ctx.translate(x, y); ctx.rotate(p.rot);
        if (p.isCircle) { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.beginPath(); ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size, 1.5); ctx.fill(); }
        ctx.restore();
      });
    };

    const drawAScatter = (t: number) => {
      const cx = W() / 2, cy = H() / 2, et = easeIn(t);
      parts.forEach(p => {
        p.baseAngle += p.speed * 0.008; p.rot += p.rotSpeed;
        const bx = cx + Math.cos(p.baseAngle) * p.baseR;
        const by = cy + Math.sin(p.baseAngle) * p.baseR;
        const sx = bx + Math.cos(p.scatterA) * p.scatterD * et;
        const sy = by + Math.sin(p.scatterA) * p.scatterD * et;
        const a = p.alpha * (1 - et), s = p.size * (1 - et * 0.5);
        if (a < 0.01) return;
        ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = p.color;
        ctx.translate(sx, sy); ctx.rotate(p.rot);
        if (p.isCircle) { ctx.beginPath(); ctx.arc(0, 0, s / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, 1.5); ctx.fill(); }
        ctx.restore();
      });
    };

    // ── Node C ──
    const NC = 18;
    let nodes: any[] = [], edges: number[][] = [], nodeLitOrder: number[] = [];
    const initNodes = () => {
      const cx = W() / 2, cy = H() / 2, rad = Math.min(W(), H()) * 0.33;
      nodes = Array.from({ length: NC }, (_, i) => {
        const a = (i / NC) * Math.PI * 2, r = rad + (Math.random() - 0.5) * rad * 0.14;
        return {
          x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r,
          size: 5 + Math.random() * 8, color: COLS[Math.floor(Math.random() * COLS.length)],
          pulse: Math.random() * Math.PI * 2, speed: (Math.random() - 0.5) * 0.004,
          baseA: a, baseR: r
        };
      });
      edges = Array.from({ length: NC }, (_, i) => [i, (i + 1) % NC]);
      nodeLitOrder = [...Array(NC).keys()].sort(() => Math.random() - 0.5);
    };

    const drawC = (litP: number) => {
      const now = Date.now() * 0.002, cx = W() / 2, cy = H() / 2;
      nodes.forEach(n => { n.baseA += n.speed; n.x = cx + Math.cos(n.baseA) * n.baseR; n.y = cy + Math.sin(n.baseA) * n.baseR; });
      ctx.save(); ctx.strokeStyle = TEAL; ctx.lineWidth = 1.2;
      edges.forEach(([i, j]) => {
        const ri = nodeLitOrder.indexOf(i) / NC, rj = nodeLitOrder.indexOf(j) / NC;
        const lit = Math.min(clamp((litP - ri) / (1 / NC), 0, 1), clamp((litP - rj) / (1 / NC), 0, 1));
        if (lit < 0.01) return;
        ctx.globalAlpha = lit * 0.22; ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
      });
      ctx.restore();
      nodes.forEach((n, i) => {
        const rank = nodeLitOrder.indexOf(i) / NC;
        const lit = clamp((litP - rank) / (1 / NC * 2), 0, 1);
        if (lit < 0.01) return;
        const pulse = Math.sin(now * 2 + n.pulse) * 0.3 + 0.7, s = n.size * (1 + pulse * 0.12) * lit;
        ctx.save();
        ctx.globalAlpha = 0.15 * lit * pulse; ctx.fillStyle = n.color;
        ctx.beginPath(); ctx.arc(n.x, n.y, s * 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = (0.6 + pulse * 0.3) * lit; ctx.fillStyle = n.color;
        ctx.beginPath(); ctx.arc(n.x, n.y, s / 2, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
    };

    const initAll = () => { initParts(); initNodes(); };
    initAll();

    let animationFrameId: number;
    let elapsed = 0, lastTs: number | null = null;

    const frame = (ts: number) => {
      if (!lastTs) lastTs = ts;
      elapsed += ts - lastTs; lastTs = ts;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W(), H());
      const e = elapsed;
      if (e < T_A) { drawA(1); }
      else if (e < T_SCATTER) { drawAScatter((e - T_A) / (T_SCATTER - T_A)); }
      else if (e < T_BLANK) { /* 空白 */ }
      else if (e < T_LIGHT) { drawC((e - T_BLANK) / (T_LIGHT - T_BLANK)); }
      else { drawC(1); }
      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    const handleResize = () => {
      resize();
      initAll();
      elapsed = 0; // Resizeしてもアニメーションを最初から再生させない場合はここを調整
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef}></canvas>;
}
