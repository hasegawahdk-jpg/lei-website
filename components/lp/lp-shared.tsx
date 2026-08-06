'use client';

import React, { useState } from 'react';
import { LEI, LEI_TOOLS, LeiMark, LeiLogoImg, HeroCircle } from './brand';
import { Reveal, Typewriter, TypewriterParagraphs } from './reveal';
import type { Device } from './use-device';

export type Variant = 'A' | 'B' | 'C';

// ─────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────
export function LPNav({ device, tone = 'light' }: { device: Device; variant?: Variant; tone?: 'light' | 'dark' }) {
  const isSP = device === 'sp';
  const onDark = tone === 'dark';
  const [open, setOpen] = useState(false);
  const link: React.CSSProperties = {
    fontSize: 13, letterSpacing: '0.18em', fontWeight: 500,
    color: onDark ? 'rgba(255,255,255,0.78)' : 'rgba(10,31,58,0.7)',
  };
  const dot: React.CSSProperties = {
    display: 'inline-block', width: 4, height: 4, borderRadius: 999,
    background: LEI.teal, marginRight: 8, verticalAlign: 'middle',
  };
  const mobileLink: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '18px 24px',
    fontSize: 16, fontWeight: 600, letterSpacing: '0.16em',
    color: onDark ? '#fff' : LEI.navy,
    borderTop: `1px solid ${onDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,31,58,0.06)'}`,
  };
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: onDark ? 'rgba(6,21,42,0.85)' : 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${onDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,31,58,0.06)'}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isSP ? '8px 16px' : '12px 56px',
        maxWidth: 1440, margin: '0 auto',
      }}>
        <a
          href="#home"
          style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
          onClick={() => setOpen(false)}
        >
          <LeiMark
            size={isSP ? 22 : 26}
            color={onDark ? '#fff' : LEI.navy}
            dot={LEI.teal}
          />
        </a>
        {isSP ? (
          <button
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              width: 44, height: 44, border: 'none', background: 'transparent',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', gap: 6, padding: 0, cursor: 'pointer',
            }}
          >
            <span style={{
              width: 24, height: 2, background: onDark ? '#fff' : LEI.navy,
              transition: 'transform .25s',
              transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
            }}/>
            <span style={{
              width: 24, height: 2, background: onDark ? '#fff' : LEI.navy,
              transition: 'transform .25s',
              transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none',
            }}/>
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            <a href="#service" style={link}><span style={dot}/>SERVICE</a>
            <a href="#about" style={link}><span style={dot}/>ABOUT</a>
            <a href="#contact" style={{
              ...link,
              padding: '11px 22px', borderRadius: 999,
              background: onDark ? LEI.teal : LEI.navy,
              color: onDark ? LEI.navy : '#fff',
              fontWeight: 600,
            }}>CONTACT</a>
          </div>
        )}
      </div>

      {/* SP メニューパネル */}
      {isSP && (
        <div
          style={{
            overflow: 'hidden',
            maxHeight: open ? 320 : 0,
            transition: 'max-height .3s ease',
            background: onDark ? 'rgba(6,21,42,0.96)' : 'rgba(255,255,255,0.98)',
            borderTop: open ? `1px solid ${onDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,31,58,0.06)'}` : 'none',
          }}
        >
          <a href="#service" style={mobileLink} onClick={() => setOpen(false)}>
            <span style={dot}/>SERVICE
          </a>
          <a href="#about" style={mobileLink} onClick={() => setOpen(false)}>
            <span style={dot}/>ABOUT
          </a>
          <a href="#contact" style={{
            ...mobileLink,
            background: onDark ? LEI.teal : LEI.navy,
            color: onDark ? LEI.navy : '#fff',
          }} onClick={() => setOpen(false)}>
            <span style={{ ...dot, background: onDark ? LEI.navy : LEI.teal }}/>CONTACT
          </a>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────
// Section label
// ─────────────────────────────────────────────
export function SectionLabel({
  index, label, color = LEI.teal, dark = false,
}: { index?: string; label: string; color?: string; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      {index && (
        <span className="lp-en" style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,31,58,0.35)',
        }}>{index}</span>
      )}
      <span style={{
        width: 28, height: 1, background: color, transformOrigin: 'left',
        animation: 'lei-line 1s ease-out both',
      }}/>
      <span className="lp-en" style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.32em', color,
      }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Iconography
// ─────────────────────────────────────────────
export function IconX({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
    </svg>
  );
}
export function IconArrow({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  );
}
export function IconCheck({ size = 14, color = LEI.teal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
// Tools marquee
// ─────────────────────────────────────────────
export function ToolsMarquee({ device, variant }: { device: Device; variant: Variant }) {
  const isSP = device === 'sp';
  const onDark = variant === 'B';
  const half = LEI_TOOLS;
  const items = [...half, ...half];
  const speed = variant === 'C' ? 70 : 50;
  return (
    <section style={{
      padding: isSP ? '72px 0' : '120px 0',
      background: onDark ? LEI.navyDeep : LEI.paper,
      color: onDark ? '#fff' : LEI.navy,
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: isSP ? '0 20px' : '0 56px',
        marginBottom: isSP ? 32 : 56,
      }}>
        <SectionLabel label="TOOLS" dark={onDark}/>
        <h3 className="lp-jp" style={{
          marginTop: 16, fontSize: isSP ? 26 : 36, fontWeight: 700,
          lineHeight: 1.45, letterSpacing: '0.01em',
        }}>
          活用AI・ITツール
        </h3>
        <p style={{
          marginTop: 12, color: onDark ? 'rgba(255,255,255,0.6)' : LEI.muted,
          fontSize: isSP ? 14 : 15, lineHeight: 1.8,
        }}>
          最先端ツールを駆使し、事業にFITさせています。
        </p>
      </div>
      {[0, 1].map((row) => (
        <div className="lei-marquee" key={row} style={{
          overflow: 'hidden', whiteSpace: 'nowrap',
          mask: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMask: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          marginBottom: row === 0 ? 14 : 0,
        }}>
          <div className="lei-marquee-track" style={{
            animationDuration: `${speed + row * 8}s`,
            animationDirection: row === 1 ? 'reverse' : 'normal',
          }}>
            {items.map(([name, domain], i) => (
              <div key={`${row}-${i}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: isSP ? '11px 18px' : '14px 22px',
                borderRadius: 999,
                background: onDark ? 'rgba(255,255,255,0.05)' : '#fff',
                border: `1px solid ${onDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,31,58,0.06)'}`,
                whiteSpace: 'nowrap',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                  width={isSP ? 20 : 22} height={isSP ? 20 : 22}
                  style={{ borderRadius: 4, flex: '0 0 auto' }} alt=""/>
                <span style={{
                  fontSize: isSP ? 13 : 14, fontWeight: 500,
                  color: onDark ? '#fff' : LEI.navy,
                }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p style={{
        maxWidth: 1440, margin: '32px auto 0', padding: isSP ? '0 20px' : '0 56px',
        fontSize: isSP ? 11 : 11, color: onDark ? 'rgba(255,255,255,0.4)' : LEI.muted,
        lineHeight: 1.7,
      }}>
        ※ 記載のツール・サービス名およびロゴは各社の商標または登録商標です。当社は各社の公認パートナーではありません。
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────
// About
// ─────────────────────────────────────────────
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="lp-en" style={{
        fontSize: 44, fontWeight: 300, color: LEI.teal, lineHeight: 1, letterSpacing: '-0.03em',
      }}>{n}</div>
      <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em' }}>{label}</div>
    </div>
  );
}

export function About({ device, variant }: { device: Device; variant: Variant }) {
  const isSP = device === 'sp';

  const rows: [string, string][] = [
    ['社名', '株式会社LEI'],
    ['設立', '2022年'],
    ['住所', '東京都渋谷区神宮前六丁目23番4号'],
    ['事業', 'クラウドコスト削減支援 / AIコンサルティング / WEBマーケティング支援 / IP創出支援'],
  ];

  return (
    <section id="about" data-screen-label="03 About" style={{
      padding: isSP ? '88px 0' : '160px 0',
      background: variant === 'C' ? LEI.paper : '#fff',
      color: LEI.ink, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isSP ? '0 20px' : '0 56px', position: 'relative' }}>
        <Reveal><SectionLabel index="02" label="ABOUT" /></Reveal>
        <Reveal as="h2" delay={120} className="lp-jp" style={{
          marginTop: isSP ? 18 : 28, marginBottom: isSP ? 40 : 64,
          fontSize: isSP ? 26 : 'clamp(32px, 3.8vw, 44px)',
          fontWeight: 800,
          lineHeight: 1.4, letterSpacing: '0.01em',
          wordBreak: 'keep-all', overflowWrap: 'break-word',
        }}>
          史上最速の変化を、<br/>
          事業最大の<span style={{ color: LEI.teal }}>変革</span>に。
        </Reveal>

        <div style={{
          padding: isSP ? '40px 24px' : '72px 64px',
          background: 'linear-gradient(135deg,#0e2647,#06152a)',
          color: '#fff', borderRadius: variant === 'C' ? 0 : 24,
          position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(63,200,192,0.18)',
        }}>
          <div style={{
            position: 'absolute',
            right: isSP ? '-30%' : '-8%',
            top: '50%', transform: 'translateY(-50%)',
            width: isSP ? '120%' : '60%',
            aspectRatio: '1', pointerEvents: 'none', opacity: 0.65,
          }}>
            <HeroCircle intensity={0.9} />
          </div>
          <div style={{
            position: 'absolute',
            left: isSP ? '-40%' : '-10%',
            bottom: isSP ? '-30%' : '-50%',
            width: isSP ? '80%' : '40%',
            aspectRatio: '1', pointerEvents: 'none', opacity: 0.4,
          }}>
            <HeroCircle intensity={0.7} />
          </div>

          <div style={{ position: 'relative', maxWidth: 820 }}>
            <Reveal as="p" className="lp-en" style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.32em',
              color: LEI.teal, margin: '0 0 22px',
            }}>VISION</Reveal>
            <Reveal as="h3" delay={120} className="lp-jp" style={{
              fontSize: isSP ? 18 : 'clamp(22px, 2.4vw, 30px)',
              fontWeight: 700, lineHeight: 1.7, letterSpacing: '0.02em',
              margin: 0,
              wordBreak: 'keep-all', overflowWrap: 'break-word',
            }}>
              50年越しの産業革命の変革を<br/>
              AIは
              <span style={{
                background: `linear-gradient(180deg, transparent 60%, ${LEI.teal}40 60%)`,
                padding: '0 4px', fontWeight: 800,
                display: 'inline-block',
              }}>「10倍の速さ」</span>
              <span style={{ color: LEI.teal }}> × </span>
              <span style={{
                background: `linear-gradient(180deg, transparent 60%, ${LEI.teal}40 60%)`,
                padding: '0 4px', fontWeight: 800,
                display: 'inline-block',
              }}>「300倍の規模」</span>
              で塗り替えようとしています。
            </Reveal>

            <TypewriterParagraphs
              paragraphs={[
                '実質3,000倍ものインパクト――数年内にオフィス業務の大半が自動化され、超知能の実現すら視野に入る今、あらゆる産業の前提が根底から書き換わろうとしています。',
                '株式会社LEIは、最先端のAI技術を自ら事業に実装してきた「実感値」と、数十億規模の企業経営で培った「経験値」を融合。◯（ゼロ）からリセットする覚悟を持つ企業様とともに、事業と組織のパフォーマンスを再定義し、ビジネスの最適化を実現します。',
                '生成AIの進化は、連日の新機能リリースが示すとおり、想像を超える速度で加速しています。この転換期にこそ、商機と危機の両面を見極め、行動を起こせるかが分かれ目です。近い未来の勝ち組となるために――私たちが、その伴走者になります。',
              ]}
              speed={18}
              gap={400}
              startDelay={1000}
              color={LEI.teal}
              style={{
                marginTop: isSP ? 32 : 48,
                fontSize: isSP ? 14 : 16, lineHeight: 2,
                color: 'rgba(255,255,255,0.82)',
                maxWidth: 720,
              }}
            />

            <Reveal delay={400} style={{ display: 'flex', gap: isSP ? 24 : 56, marginTop: isSP ? 36 : 56, flexWrap: 'wrap' }}>
              <Stat n="10×" label="変化のスピード" />
              <Stat n="300×" label="変革のスケール" />
              <Stat n="3,000×" label="実質インパクト" />
            </Reveal>
          </div>
        </div>

        <div style={{
          marginTop: isSP ? 48 : 80, display: 'grid',
          gridTemplateColumns: isSP ? '1fr' : '160px 1fr', gap: 0,
        }}>
          {rows.map(([k, v], i) => (
            <React.Fragment key={i}>
              <div style={{
                gridColumn: '1',
                padding: isSP ? '20px 0 6px' : '28px 0',
                borderTop: i === 0 ? 'none' : (isSP ? 'none' : `1px solid ${LEI.line}`),
                fontSize: 12, letterSpacing: '0.18em', fontWeight: 600,
                color: LEI.muted,
              }}>{k}</div>
              <div style={{
                gridColumn: isSP ? '1' : '2',
                padding: isSP ? '0 0 20px' : '28px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${LEI.line}`,
                borderBottom: isSP && i === rows.length - 1 ? 'none' : (isSP ? `1px solid ${LEI.line}` : 'none'),
                fontSize: isSP ? 15 : 17, fontWeight: 500, color: LEI.ink, lineHeight: 1.8,
              }}>{v}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Contact (フォーム中央寄せ、RESET TO ◯ ビジュアル無し)
// ─────────────────────────────────────────────
export function Contact({ device, variant }: { device: Device; variant: Variant }) {
  const isSP = device === 'sp';
  const onDark = variant === 'B';
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: isSP ? '14px 16px' : '18px 20px',
    border: `1px solid ${onDark ? 'rgba(255,255,255,0.12)' : LEI.line}`,
    borderRadius: 12,
    background: onDark ? 'rgba(255,255,255,0.04)' : '#fff',
    fontSize: isSP ? 15 : 16, fontFamily: 'inherit', color: onDark ? '#fff' : LEI.ink,
    outline: 'none',
  };
  const lbl: React.CSSProperties = {
    fontSize: 12, fontWeight: 600,
    color: onDark ? 'rgba(255,255,255,0.7)' : LEI.body,
    letterSpacing: '0.06em',
    marginBottom: 8, display: 'block',
  };

  return (
    <section id="contact" data-screen-label="04 Contact" style={{
      padding: isSP ? '88px 0' : '160px 0',
      background: onDark ? LEI.navyDeep : LEI.paper,
      color: onDark ? '#fff' : LEI.ink,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: isSP ? '-50%' : '-15%', top: isSP ? '8%' : '12%',
        width: isSP ? '110%' : '55%', aspectRatio: 1, pointerEvents: 'none',
        opacity: onDark ? 0.55 : 0.35,
      }}>
        <HeroCircle intensity={onDark ? 0.85 : 0.5} />
      </div>
      <div style={{
        position: 'absolute', left: isSP ? '-40%' : '-8%', bottom: '-10%',
        width: isSP ? '90%' : '40%', aspectRatio: 1, pointerEvents: 'none',
        opacity: onDark ? 0.4 : 0.25,
      }}>
        <HeroCircle intensity={onDark ? 0.7 : 0.4} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isSP ? '0 20px' : '0 56px', position: 'relative' }}>
        <Reveal><SectionLabel index="03" label="CONTACT" dark={onDark} /></Reveal>
        <Reveal as="h2" delay={120} className="lp-jp" style={{
          marginTop: isSP ? 18 : 28, marginBottom: isSP ? 16 : 24,
          fontSize: isSP ? 26 : 'clamp(32px, 3.8vw, 44px)',
          fontWeight: 800,
          lineHeight: 1.4, letterSpacing: '0.01em',
          wordBreak: 'keep-all', overflowWrap: 'break-word',
        }}>
          ビジネスの未来を、<br/>共に<span style={{ color: LEI.teal }}>創る</span>。
        </Reveal>
        <Typewriter
          as="p"
          text={'貴社の課題に合わせた最適なAIソリューションをご提案します。\n初回相談は無料です。お気軽にお問い合わせください。'}
          speed={22}
          startDelay={700}
          cursor={LEI.teal}
          style={{
            maxWidth: 640, fontSize: isSP ? 14 : 16, lineHeight: 1.95,
            color: onDark ? 'rgba(255,255,255,0.7)' : LEI.body,
            display: 'block', whiteSpace: 'pre-line',
          }}
        />

        <div style={{
          marginTop: isSP ? 36 : 64,
          maxWidth: 720, margin: isSP ? '36px auto 0' : '64px auto 0',
        }}>
          <form style={{
            background: onDark ? 'rgba(255,255,255,0.04)' : '#fff',
            borderRadius: 24,
            padding: isSP ? 24 : 40,
            border: onDark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${LEI.line}`,
            display: 'grid', gap: isSP ? 18 : 22,
            backdropFilter: onDark ? 'blur(20px)' : 'none',
          }} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label style={lbl}>会社名 <span style={{ color: LEI.teal }}>*</span></label>
              <input style={inputStyle} placeholder="株式会社LEI" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isSP ? '1fr' : '1fr 1fr', gap: isSP ? 18 : 22 }}>
              <div>
                <label style={lbl}>お名前 <span style={{ color: LEI.teal }}>*</span></label>
                <input style={inputStyle} placeholder="山田 太郎" />
              </div>
              <div>
                <label style={lbl}>メールアドレス <span style={{ color: LEI.teal }}>*</span></label>
                <input style={inputStyle} placeholder="name@example.com" />
              </div>
            </div>
            <div>
              <label style={lbl}>お問い合わせ内容 <span style={{ color: LEI.teal }}>*</span></label>
              <select style={inputStyle} defaultValue="">
                <option value="" disabled>内容を選択してください</option>
                <option>クラウドコスト削減支援について</option>
                <option>AIコンサルティングについて</option>
                <option>WEBマーケティング支援について</option>
                <option>IP創出支援について</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label style={lbl}>メッセージ</label>
              <textarea style={{ ...inputStyle, minHeight: isSP ? 120 : 140, resize: 'vertical' }} />
            </div>
            <button type="submit" style={{
              marginTop: 4,
              padding: isSP ? '16px 24px' : '20px 28px',
              borderRadius: 999, border: 'none',
              background: onDark ? LEI.teal : LEI.navy,
              color: onDark ? LEI.navyDeep : '#fff',
              fontSize: isSP ? 14 : 15, fontWeight: 700,
              letterSpacing: '0.18em', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 12, width: '100%',
              boxShadow: onDark ? `0 12px 32px ${LEI.teal}44` : 'none',
            }}>
              送信する <IconArrow size={16} color={onDark ? LEI.navyDeep : '#fff'}/>
            </button>
            <p style={{
              fontSize: 12,
              color: onDark ? 'rgba(255,255,255,0.5)' : LEI.muted,
              marginTop: 0, textAlign: 'center',
            }}>
              送信後、担当者より2営業日以内にご返信いたします。
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer({ device }: { device: Device }) {
  const isSP = device === 'sp';
  return (
    <footer style={{
      padding: isSP ? '56px 20px 32px' : '96px 56px 56px',
      borderTop: `1px solid ${LEI.line}`,
      background: '#ffffff',
      position: 'relative', zIndex: 1,
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: isSP ? 20 : 32,
      }}>
        <LeiLogoImg height={isSP ? 56 : 72} variant="light"/>
        <p style={{
          fontSize: isSP ? 11 : 12,
          color: LEI.muted,
          letterSpacing: '0.16em', fontWeight: 500,
        }}>
          © 2025 LEI, inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
