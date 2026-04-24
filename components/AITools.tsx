"use client";

import { useState } from "react";

const toolCategories = [
  {
    name: "AI生成・分析",
    icon: "🤖",
    tools: [
      { name: 'Claude.ai', domain: 'claude.ai', bg: '#CC8B5A' },
      { name: 'Claude Code', domain: 'claude.ai', bg: '#B87040' },
      { name: 'Claude Cowork', domain: 'claude.ai', bg: '#A05830' },
      { name: 'Gemini', domain: 'gemini.google.com', bg: '#4285F4' },
      { name: 'Google AI Studio', domain: 'aistudio.google.com', bg: '#34A853' },
      { name: 'NotebookLM', domain: 'notebooklm.google.com', bg: '#9C27B0' },
      { name: 'Grok', domain: 'x.ai', bg: '#222222' },
      { name: 'Perplexity', domain: 'perplexity.ai', bg: '#20B2AA' },
      { name: 'Genspark', domain: 'genspark.ai', bg: '#7C3AED' },
      { name: 'DeepResearch', domain: 'gemini.google.com', bg: '#4285F4' },
    ]
  },
  {
    name: "開発・インフラ",
    icon: "⚙️",
    tools: [
      { name: 'Visual Studio Code', domain: 'code.visualstudio.com', bg: '#007ACC' },
      { name: 'GitHub', domain: 'github.com', bg: '#24292E' },
      { name: 'Supabase', domain: 'supabase.com', bg: '#3ECF8E' },
      { name: 'shadcn', domain: 'shadcn.net', bg: '#000000' },
      { name: 'CodeBuddy', domain: 'codebuddy.cn', bg: '#1366EC' },
      { name: 'Google Antigravity', domain: 'antigravity.google', bg: '#34A853' },
      { name: 'Make', domain: 'make.com', bg: '#6D00CC' },
      { name: 'Stitch', domain: 'stitch.withgoogle.com', bg: '#4285F4' },
    ]
  },
  {
    name: "デザイン・クリエイティブ",
    icon: "🎨",
    tools: [
      { name: 'Canva', domain: 'canva.com', bg: '#00C4CC' },
      { name: 'Figma', domain: 'figma.com', bg: '#F24E1E' },
      { name: 'Obsidian', domain: 'obsidian.md', bg: '#7C3AED' },
      { name: 'SUNO', domain: 'suno.com', bg: '#FF3B5C' },
      { name: 'OpenClaw', domain: 'openclaw.ai', bg: '#FF6B00' },
      { name: 'nanobanana Pro 2', domain: 'nanobananas.ai', bg: '#FF6B35' },
    ]
  },
  {
    name: "ビジネス・ユーティリティ",
    icon: "💼",
    tools: [
      { name: 'WebCatalog', domain: 'webcatalog.io', bg: '#4A90D9' },
    ]
  }
];

export default function AITools() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(toolCategories.slice(0, 2).map(cat => cat.name))
  );

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const logoUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const renderToolChip = (tool: any) => (
    <div className="tool-chip-accordion" key={tool.name}>
      <img
        className="tool-logo-accordion"
        src={logoUrl(tool.domain)}
        alt={tool.name}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div className="tool-logo-fallback-accordion" style={{ background: tool.bg }}>
        {tool.name.slice(0, 2).toUpperCase()}
      </div>
      <span className="tool-name-accordion">{tool.name}</span>
    </div>
  );

  return (
    <section id="ai-tools">
      <div className="tools-header">
        <div className="tools-header-label">活用AI・ITツール</div>
        <p className="tools-header-title">最先端ツールを駆使し、<br />事業にFITさせています。</p>
      </div>

      <div className="tools-accordion">
        {toolCategories.map((category) => (
          <div className="accordion-item" key={category.name}>
            <button
              className="accordion-button"
              onClick={() => toggleCategory(category.name)}
              aria-expanded={expandedCategories.has(category.name)}
            >
              <span className="accordion-icon">{category.icon}</span>
              <span className="accordion-title">{category.name}</span>
              <span className={`accordion-chevron ${expandedCategories.has(category.name) ? 'expanded' : ''}`}>
                ▼
              </span>
            </button>

            {expandedCategories.has(category.name) && (
              <div className="accordion-content">
                <div className="tools-grid">
                  {category.tools.map((tool) => renderToolChip(tool))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="tools-disclaimer">
        ※ 記載のツール・サービス名およびロゴは各社の商標または登録商標です。<br />
        当社は各社の公認パートナーではありません。
      </p>
    </section>
  );
}
