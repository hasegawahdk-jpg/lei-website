'use client';

import React from 'react';

// ─────────────────────────────────────────────────────────────
// Brand tokens
// ─────────────────────────────────────────────────────────────
export const LEI = {
  navy:    '#0a1f3a',
  navyDeep:'#06152a',
  teal:    '#3fc8c0',
  tealDk:  '#2da39b',
  ink:     '#0a1320',
  body:    '#3a4250',
  muted:   '#7b8392',
  line:    'rgba(10,31,58,0.10)',
  paper:   '#f7f6f1',
  bone:    '#ecebe4',
  white:   '#ffffff',
} as const;

// Local image paths (本番では既存パスに合わせて差し替え)
export const LEI_IMG = {
  logo:    '/images/lei-logo.png',
  cloud:   '/images/cloud-cost.jpg',
  ai:      '/images/ai-consulting.jpg',
  web:     '/images/web-marketing-new.jpg',
  ip:      '/images/web-marketing.jpg',
  contact: '/images/ip-creation.jpg',
  care:    '/images/care-dx.jpg',
} as const;

export const LEI_TOOLS: ReadonlyArray<[string, string]> = [
  ['Claude.ai','claude.ai'], ['Claude Code','claude.ai'], ['Claude Cowork','claude.ai'],
  ['Gemini','gemini.google.com'], ['Google AI Studio','aistudio.google.com'],
  ['NotebookLM','notebooklm.google.com'], ['Grok','x.ai'], ['Perplexity','perplexity.ai'],
  ['Genspark','genspark.ai'], ['DeepResearch','gemini.google.com'], ['Make','make.com'],
  ['Figma','figma.com'], ['Canva','canva.com'], ['VS Code','code.visualstudio.com'],
  ['WebCatalog','webcatalog.io'], ['nanobanana Pro 2','nanobananas.ai'],
  ['Google Antigravity','antigravity.google'], ['CodeBuddy','codebuddy.cn'],
  ['Obsidian','obsidian.md'], ['SUNO','suno.com'], ['GitHub','github.com'],
  ['Stitch','stitch.withgoogle.com'], ['shadcn','shadcn.com'], ['Supabase','supabase.com'],
];

export type Service = {
  n: string;
  tag: string;
  title: string;
  img: string;
  body: string;
  bullets: string[];
  cta?: { label: string; href: string };
  social?: { x: string; handle: string };
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    n: '01', tag: 'FinOps',
    title: 'クラウドコスト削減支援',
    img: LEI_IMG.cloud,
    body: 'ダウンタイムなし・構成変更不要で、既存のクラウド環境を一切変えず、商流最適化により、AWSやGCPのコストを最大20％削減します。',
    bullets: [
      'AWS・GCPの最大20％のコスト削減',
      '日本円・請求書対応によるCF改善',
      'AIによるリソース最適化提案',
    ],
    // TODO: CloudCut名称・ロゴを一時非表示中。復活時はコメントアウト解除
    // cta: { label: 'サービスサイトを見る', href: 'https://cloudcut.lei-inc.jp/' },
    // social: { x: 'https://x.com/cloudcut_', handle: '@cloudcut_' },
    featured: true,
  },
  {
    n: '02', tag: 'AI Consulting',
    title: 'AIコンサルティング',
    img: LEI_IMG.ai,
    body: '業務プロセスの自律化（Agentic AI）に向けた戦略策定から実装までを伴走。エグゼクティブ層が求めるガバナンスを担保しつつ、最新技術の導入を加速させます。',
    bullets: [
      'Agentic AI 導入戦略の策定',
      '業務プロセスの自律化支援',
      '10年以上の経営経験から課題抽出',
    ],
  },
  {
    n: '03', tag: 'Web Marketing',
    title: 'WEBマーケティング支援',
    img: LEI_IMG.web,
    body: '最新の生成AIと業務最適化を掛け合わせ、最小限のパワーで最大限のパフォーマンスを発揮。顧客体験を最大化するマーケティング戦略を実行します。',
    bullets: [
      'AI活用を軸とした集客設計',
      'SNS等での自動投稿や素材生成支援',
      'Output・Input を最新技術で効率化',
    ],
  },
  {
    n: '04', tag: 'IP Creation',
    title: 'IP創出支援',
    img: LEI_IMG.ip,
    body: 'AIアルゴリズムを駆使し、新たな知的財産を創出。ニーズに合わせたキャラクター設計から具現化まで、デジタル資産の価値を最大化する戦略を提供します。',
    bullets: [
      '生成AIを駆使したキャラクター設計',
      '様々な手法を駆使したIP露出支援',
      '中国提携工場と連携した商品化支援',
    ],
  },
  // TODO: 介護DX / 遠隔支援サービスを一時非表示中。復活時はコメントアウト解除
  // {
  //   n: '05', tag: 'Care DX',
  //   title: '介護DX / 遠隔支援サービス',
  //   img: LEI_IMG.care,
  //   body: '介護現場における課題を、人間版ドラレコとして、世界初の遠隔ウェアラブルカメラ支援サービスとして、現場スタッフと管理者をリアルタイムで繋ぎ、迅速かつ的確な指導を可能にします。',
  //   bullets: [
  //     '超軽量＋骨伝導でストレスフリー',
  //     '現場の音声と映像が管理側へ',
  //     'クラウドに録音録画を常時保存',
  //   ],
  // },
];

// ─────────────────────────────────────────────────────────────
// LEI logo — dotted ring + LEI. wordmark
// ─────────────────────────────────────────────────────────────
type LeiLogoProps = {
  height?: number;
  color?: string;
  dot?: string;
  ringTeal?: string;
  mono?: boolean;
};

export function LeiLogo({ height = 28, color, dot, ringTeal, mono = false }: LeiLogoProps) {
  const c = color || LEI.navy;
  const d = dot || LEI.teal;
  const ring = ringTeal || LEI.teal;
  const id = React.useId();

  const dots = React.useMemo(() => {
    const out: { cx: number; cy: number; r: number; op: number }[] = [];
    const seed = (i: number) => ((i * 9301 + 49297) % 233280) / 233280;
    const N = 130;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + seed(i) * 0.06;
      const r = 22 + (seed(i + 7) - 0.5) * 6;
      const sz = 0.5 + seed(i + 17) * 1.7;
      const op = 0.35 + seed(i + 31) * 0.6;
      const dense = Math.cos(a) < -0.2 ? 1.05 : 0.85;
      out.push({
        cx: 32 + Math.cos(a) * r * dense,
        cy: 32 + Math.sin(a) * r * dense,
        r: sz,
        op,
      });
    }
    for (let i = 0; i < 22; i++) {
      const a = Math.PI * 0.4 + (i / 22) * Math.PI * 1.2;
      const r = 28 + seed(i + 99) * 6;
      out.push({
        cx: 32 + Math.cos(a) * r,
        cy: 32 + Math.sin(a) * r,
        r: 0.4 + seed(i + 41) * 1.2,
        op: 0.3 + seed(i + 53) * 0.5,
      });
    }
    return out;
  }, []);

  const h = height;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: height * 0.28,
      lineHeight: 1,
    }}>
      <svg width={h * 1.05} height={h} viewBox="0 0 64 64" aria-label="LEI">
        <defs>
          <radialGradient id={`lg-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor={ring} stopOpacity="0"/>
            <stop offset="85%" stopColor={ring} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={ring} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="24" fill={`url(#lg-${id})`}/>
        {dots.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r}
            fill={mono ? c : (i % 7 === 0 ? c : ring)} opacity={p.op}/>
        ))}
      </svg>
      <span style={{
        fontFamily: '"Helvetica Neue", "Inter", sans-serif',
        fontWeight: 800, letterSpacing: '0.12em',
        fontSize: height * 0.82, color: c,
        display: 'inline-flex', alignItems: 'baseline',
      }}>
        LEI<span style={{ color: d, marginLeft: 1 }}>.</span>
      </span>
    </span>
  );
}

/**
 * 公式ロゴ画像版（リング＋LEI.）。
 * tone='dark' の Nav 用には dark-bg、白背景の Footer には with-mark を使う。
 */
export function LeiLogoImg({
  height = 32, variant = 'light',
}: { height?: number; variant?: 'light' | 'dark' }) {
  const src = variant === 'dark'
    ? '/images/logo/lei-logo-dark-bg.png'
    : '/images/logo/lei-logo-with-mark.png';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="LEI, inc."
      style={{
        height, width: 'auto', display: 'block',
      }}
    />
  );
}

export function LeiMark({ size = 22, color, dot }: { size?: number; color?: string; dot?: string }) {
  const c = color || LEI.navy;
  const d = dot || LEI.teal;
  return (
    <span style={{
      fontFamily: '"Helvetica Neue", "Inter", "Hiragino Sans", sans-serif',
      fontWeight: 800, letterSpacing: '0.16em',
      fontSize: size, color: c, lineHeight: 1, display: 'inline-flex', alignItems: 'baseline',
    }}>
      LEI<span style={{ color: d, marginLeft: 1 }}>.</span>
    </span>
  );
}

export function LeiCircle({
  size = 320, dotted = true, animate = true, accent, opacity = 1,
}: { size?: number; dotted?: boolean; animate?: boolean; accent?: string; opacity?: number }) {
  const t = accent || LEI.teal;
  const id = React.useId();
  const dots: React.ReactElement[] = [];
  if (dotted) {
    const N = 96;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 46 + (((i * 13) % 7) / 7 - 0.5) * 2;
      const cx = 50 + Math.cos(a) * r;
      const cy = 50 + Math.sin(a) * r;
      const sz = 0.4 + ((i * 13) % 7) / 10;
      dots.push(<circle key={i} cx={cx} cy={cy} r={sz} fill={t} opacity={0.45 + ((i * 7) % 5) / 10} />);
    }
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible', opacity }}>
      <defs>
        <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor={t} stopOpacity="0"/>
          <stop offset="80%" stopColor={t} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={t} stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={`l-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t} stopOpacity="0.9"/>
          <stop offset="50%" stopColor={t} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={LEI.navy} stopOpacity="0.85"/>
        </linearGradient>
      </defs>
      <g style={animate ? { transformOrigin: '50% 50%', animation: 'lei-spin 60s linear infinite' } : undefined}>
        <circle cx="50" cy="50" r="46" fill={`url(#g-${id})`}/>
        <circle cx="50" cy="50" r="46" fill="none" stroke={`url(#l-${id})`} strokeWidth="0.5"/>
        {dots}
      </g>
      <g style={animate ? { transformOrigin: '50% 50%', animation: 'lei-spin-rev 80s linear infinite' } : undefined}>
        <circle cx="50" cy="50" r="40" fill="none" stroke={t} strokeOpacity="0.18" strokeWidth="0.25" strokeDasharray="0.5 2"/>
        <circle cx="50" cy="50" r="32" fill="none" stroke={t} strokeOpacity="0.12" strokeWidth="0.25"/>
      </g>
    </svg>
  );
}

export function HeroCircle({
  accent, navy, intensity = 1,
}: { accent?: string; navy?: string; intensity?: number }) {
  const t = accent || LEI.teal;
  const n = navy || LEI.navy;
  const id = React.useId();
  return (
    <svg viewBox="-50 -50 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <radialGradient id={`hg-${id}`} cx="0" cy="0" r="40">
          <stop offset="40%" stopColor={t} stopOpacity="0"/>
          <stop offset="78%" stopColor={t} stopOpacity={0.55 * intensity}/>
          <stop offset="100%" stopColor={n} stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`hg2-${id}`} cx="0" cy="0" r="40">
          <stop offset="0%" stopColor={t} stopOpacity={0.35 * intensity}/>
          <stop offset="65%" stopColor={t} stopOpacity={0.08 * intensity}/>
          <stop offset="100%" stopColor={t} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <g style={{ transformOrigin: '0 0', animation: 'lei-breathe 6s ease-in-out infinite' }}>
        <circle cx="0" cy="0" r="40" fill={`url(#hg2-${id})`}/>
      </g>
      <g style={{ transformOrigin: '0 0', animation: 'lei-spin 90s linear infinite' }}>
        <circle cx="0" cy="0" r="38" fill={`url(#hg-${id})`}/>
        {Array.from({ length: 144 }).map((_, i) => {
          const a = (i / 144) * Math.PI * 2;
          const r = 38 + (Math.sin(i * 1.3) * 0.6);
          return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r}
            r={0.18 + ((i * 11) % 6) / 18} fill={t}
            opacity={0.35 + ((i * 17) % 6) / 14}/>;
        })}
      </g>
      <g style={{ transformOrigin: '0 0', animation: 'lei-spin-rev 120s linear infinite' }}>
        <circle cx="0" cy="0" r="27" fill="none" stroke={t} strokeOpacity="0.25" strokeWidth="0.18" strokeDasharray="0.5 2.4"/>
        <circle cx="0" cy="0" r="20" fill="none" stroke={t} strokeOpacity="0.18" strokeWidth="0.15"/>
      </g>
    </svg>
  );
}

export function StampO({ size = 22, color, weight = 1.8 }: { size?: number; color?: string; weight?: number }) {
  const c = color || LEI.teal;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ verticalAlign: '-0.18em' }}>
      <circle cx="10" cy="10" r="8.2" fill="none" stroke={c} strokeWidth={weight}/>
    </svg>
  );
}
