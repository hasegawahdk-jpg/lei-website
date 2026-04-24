"use client";

const tools = [
  { name: 'Claude.ai',           domain: 'claude.ai',                bg: '#CC8B5A' },
  { name: 'Claude Code',         domain: 'claude.ai',                bg: '#B87040' },
  { name: 'Claude Cowork',       domain: 'claude.ai',                bg: '#A05830' },
  { name: 'Gemini',              domain: 'gemini.google.com',        bg: '#4285F4' },
  { name: 'Google AI Studio',    domain: 'aistudio.google.com',      bg: '#34A853' },
  { name: 'NotebookLM',          domain: 'notebooklm.google.com',    bg: '#9C27B0' },
  { name: 'Grok',                domain: 'x.ai',                     bg: '#222222' },
  { name: 'Perplexity',          domain: 'perplexity.ai',            bg: '#20B2AA' },
  { name: 'Genspark',            domain: 'genspark.ai',              bg: '#7C3AED' },
  { name: 'DeepResearch',        domain: 'gemini.google.com',        bg: '#4285F4' },
  { name: 'Make',                domain: 'make.com',                 bg: '#6D00CC' },
  { name: 'Figma',               domain: 'figma.com',                bg: '#F24E1E' },
  { name: 'Canva',               domain: 'canva.com',                bg: '#00C4CC' },
  { name: 'Visual Studio Code',  domain: 'code.visualstudio.com',    bg: '#007ACC' },
  { name: 'WebCatalog',          domain: 'webcatalog.io',            bg: '#4A90D9' },
  { name: 'nanobanana Pro 2',    domain: 'nanobananas.ai',           bg: '#FF6B35' },
  { name: 'Google Antigravity',  domain: 'antigravity.google',       bg: '#34A853' },
  { name: 'CodeBuddy',           domain: 'codebuddy.cn',             bg: '#1366EC' },
  { name: 'Obsidian',            domain: 'obsidian.md',              bg: '#7C3AED' },
  { name: 'SUNO',                domain: 'suno.com',                 bg: '#FF3B5C' },
  { name: 'GitHub',              domain: 'github.com',               bg: '#24292E' },
  { name: 'Stitch',              domain: 'stitch.withgoogle.com',    bg: '#4285F4' },
  { name: 'OpenClaw',            domain: 'openclaw.ai',              bg: '#FF6B00' },
  { name: 'shadcn',              domain: 'shadcn.net',               bg: '#000000' },
  { name: 'Supabase',            domain: 'supabase.com',             bg: '#3ECF8E' },
];

const row1 = tools.slice(0, 8);
const row2 = tools.slice(8, 16);
const row3 = tools.slice(16);

export default function AITools() {
  const logoUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const renderChip = (t: any, key: string) => (
    <div className="tool-chip" key={key}>
      <img
        className="tool-logo"
        src={logoUrl(t.domain)}
        alt={t.name}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div className="tool-logo-fallback" style={{ background: t.bg, display: 'none' }}>
        {t.name.slice(0, 2).toUpperCase()}
      </div>
      <span className="tool-name">{t.name}</span>
    </div>
  );

  const renderTrack = (items: any[]) => {
    const doubled = [...items, ...items, ...items, ...items];
    return (
      <div className="marquee-track">
        {doubled.map((t, index) => renderChip(t, `${t.name}-${index}`))}
      </div>
    );
  };

  return (
    <section id="ai-tools">
      <div className="tools-header">
        <div className="tools-header-label">活用AI・ITツール</div>
        <p className="tools-header-title">最先端ツールを駆使し、<br />事業にFITさせています。</p>
      </div>

      <div className="marquee-rows-desktop" id="marquee-rows">
        <div className="marquee-row marquee-row-1" id="mrow-1">
          {renderTrack(row1)}
        </div>
        <div className="marquee-row marquee-row-2" id="mrow-2">
          {renderTrack(row2)}
        </div>
        <div className="marquee-row marquee-row-3" id="mrow-3">
          {renderTrack(row3)}
        </div>
      </div>

      <p className="tools-disclaimer">
        ※ 記載のツール・サービス名およびロゴは各社の商標または登録商標です。<br />
        当社は各社の公認パートナーではありません。
      </p>
    </section>
  );
}
