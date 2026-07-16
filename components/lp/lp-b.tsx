'use client';

import React from 'react';
import { LEI, SERVICES, HeroCircle, type Service } from './brand';
import { Reveal, Typewriter, TypewriterList } from './reveal';
import { LPNav, SectionLabel, ToolsMarquee, About, Contact, Footer, IconArrow, IconCheck, IconX } from './lp-shared';
import { NetworkBand } from './network-anim';
import { useDevice, type Device } from './use-device';

function HeroB({ device }: { device: Device }) {
  const isSP = device === 'sp';
  return (
    <section id="home" data-screen-label="01 Hero" style={{
      position: 'relative', overflow: 'hidden',
      background: `radial-gradient(120% 80% at 50% 40%, #0e2647 0%, #06152a 60%, #04101e 100%)`,
      color: '#fff',
      minHeight: isSP ? 720 : 880,
      padding: isSP ? '52px 0 80px' : '120px 0',
    }}>
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSP ? '180%' : '110%',
        aspectRatio: '1', pointerEvents: 'none',
        opacity: 0.95,
      }}>
        <HeroCircle />
      </div>
      <div style={{
        position: 'absolute',
        right: isSP ? '-50%' : '-15%',
        bottom: isSP ? '-25%' : '-30%',
        width: isSP ? '100%' : '55%',
        aspectRatio: '1', pointerEvents: 'none', opacity: 0.4,
      }}>
        <HeroCircle />
      </div>

      <div style={{
        position: 'relative', maxWidth: 1440, margin: '0 auto',
        padding: isSP ? '0 20px' : '0 56px',
      }}>
        <div className="lei-rise" style={{
          fontSize: isSP ? 10 : 11, fontWeight: 600, letterSpacing: '0.32em',
          color: 'rgba(255,255,255,0.5)', marginBottom: isSP ? 40 : 80,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 24, height: 1, background: LEI.teal }}/>
          <span className="lp-en">株式会社LEI</span>
        </div>

        <div className="lei-rise lei-rise-d1" style={{ textAlign: isSP ? 'left' : 'center', position: 'relative' }}>
          <h1 className="lp-jp" style={{
            fontSize: isSP ? 28 : 'clamp(36px, 5.2vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.4, letterSpacing: '0.005em', color: '#fff',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}>
            最先端の<span style={{
              backgroundImage: `linear-gradient(90deg, ${LEI.teal}, #b8f1ed)`,
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>AI活用</span>により、<br/>
            ビジネスの<span style={{ position: 'relative', display: 'inline-block' }}>
              最適化
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: '0.05em',
                height: '0.08em', background: LEI.teal,
                animation: 'lei-line 1.2s .8s ease-out both', transformOrigin: 'left',
              }}/>
            </span>を。
          </h1>
        </div>

        <div className="lei-rise lei-rise-d2" style={{
          marginTop: isSP ? 48 : 96, textAlign: isSP ? 'left' : 'center',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 18,
          }}>
            <span style={{ width: 28, height: 1, background: LEI.teal }}/>
            <span className="lp-en" style={{
              fontSize: isSP ? 10 : 11, fontWeight: 700, letterSpacing: '0.32em', color: LEI.teal,
            }}>VISION</span>
            <span style={{
              width: 28, height: 1, background: LEI.teal,
              display: isSP ? 'none' : 'inline-block',
            }}/>
          </div>
          <p className="lp-en" style={{
            fontSize: isSP ? 22 : 'clamp(28px, 3vw, 40px)',
            fontWeight: 800, lineHeight: 1.25,
            color: '#fff', letterSpacing: '0.04em',
          }}>
            RESET&nbsp;TO&nbsp;<span style={{ color: LEI.teal }}>◯</span>.<br/>
            RISE&nbsp;TOGETHER.
          </p>
          <p className="lp-jp" style={{
            marginTop: 18, fontSize: isSP ? 14 : 15, lineHeight: 2,
            color: 'rgba(255,255,255,0.7)',
          }}>
            <span style={{ color: LEI.teal, fontWeight: 700 }}>◯</span>（ゼロ）に戻ることを、恐れない。<br/>
            <span style={{ color: LEI.teal, fontWeight: 700 }}>◯</span>（円）を共に描く仲間と、次のステージへ。
          </p>
        </div>

        <div className="lei-rise lei-rise-d3" style={{
          marginTop: isSP ? 40 : 64,
          display: 'flex', gap: 12,
          justifyContent: isSP ? 'flex-start' : 'center', flexWrap: 'wrap',
        }}>
          <a href="#service" style={{
            padding: isSP ? '15px 26px' : '20px 40px',
            borderRadius: 999, background: LEI.teal, color: LEI.navyDeep,
            fontSize: isSP ? 12 : 13, fontWeight: 800, letterSpacing: '0.24em',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            boxShadow: `0 10px 30px ${LEI.teal}55`,
          }}>
            SERVICE →
          </a>
          <a href="#about" style={{
            padding: isSP ? '15px 22px' : '20px 36px',
            borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontSize: isSP ? 12 : 13, fontWeight: 700, letterSpacing: '0.24em',
          }}>
            ABOUT US →
          </a>
        </div>
      </div>

      {!isSP && (
        <div style={{
          position: 'absolute', left: '50%', bottom: 36, transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.32em', fontWeight: 600,
        }}>
          <span className="lp-en">SCROLL</span>
          <span style={{
            width: 1, height: 36, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6))',
            animation: 'lei-pulse 2s ease-in-out infinite',
          }}/>
        </div>
      )}
    </section>
  );
}

function ServiceRowB({ s, device, idx }: { s: Service; device: Device; idx: number }) {
  const isSP = device === 'sp';
  const reversed = !isSP && idx % 2 === 1;
  const featured = s.featured;

  if (featured) {
    return (
      <article style={{
        position: 'relative', borderRadius: 28, overflow: 'hidden',
        background: `linear-gradient(135deg, #0e2647 0%, ${LEI.navyDeep} 100%)`,
        color: '#fff',
        marginBottom: isSP ? 36 : 64,
        border: `1px solid rgba(63,200,192,0.2)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.5,
          background: `radial-gradient(circle at 80% 50%, ${LEI.teal}33, transparent 50%)`,
        }}/>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isSP ? '1fr' : 'minmax(0,1fr) minmax(0,1.05fr)',
          position: 'relative',
        }}>
          <div style={{
            aspectRatio: isSP ? '16/10' : 'auto',
            minHeight: isSP ? 'auto' : 540,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(${isSP ? '180deg' : '90deg'}, transparent 30%, ${LEI.navyDeep})`,
            }}/>
          </div>
          <div style={{ padding: isSP ? 24 : 56, alignSelf: 'center' }}>
            <Reveal style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
              <span className="lp-en" style={{ fontSize: isSP ? 40 : 48, fontWeight: 200, color: LEI.teal, lineHeight: 1 }}>{s.n}</span>
              <span className="lp-en" style={{
                padding: '4px 10px', borderRadius: 99,
                background: `${LEI.teal}22`, color: LEI.teal,
                fontSize: isSP ? 9 : 10, fontWeight: 700, letterSpacing: '0.2em',
              }}>FEATURED · {s.tag.toUpperCase()}</span>
            </Reveal>
            <Reveal delay={120} as="h3" className="lp-jp" style={{
              fontSize: isSP ? 24 : 40, fontWeight: 800, lineHeight: 1.35, margin: 0,
            }}>{s.title}</Reveal>
            <Typewriter
              as="p"
              text={s.body}
              speed={20}
              startDelay={700}
              cursor={LEI.teal}
              style={{ marginTop: 16, fontSize: isSP ? 14 : 16, lineHeight: 1.95,
                color: 'rgba(255,255,255,0.78)', display: 'block' }}
            />
            <TypewriterList
              items={s.bullets}
              speed={22}
              gap={260}
              startDelay={Math.max(900, s.body.length * 22 + 600)}
              color={LEI.teal}
              render={(typed, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start',
                  fontSize: isSP ? 13 : 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.92)' }}>
                  <span style={{ marginTop: 6 }}><IconCheck size={14} color={LEI.teal}/></span>
                  {typed}
                </li>
              )}
            />
            {(s.cta || s.social) && (
              <Reveal delay={400} style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {s.cta && (
                  <a href={s.cta.href} target="_blank" rel="noreferrer" style={{
                    padding: isSP ? '13px 20px' : '16px 28px', borderRadius: 999,
                    background: LEI.teal, color: LEI.navyDeep,
                    fontSize: isSP ? 12 : 13, fontWeight: 800, letterSpacing: '0.14em',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    boxShadow: `0 8px 24px ${LEI.teal}55`,
                  }}>
                    {s.cta.label} <IconArrow size={14} color={LEI.navyDeep}/>
                  </a>
                )}
                {s.social && (
                  <a href={s.social.x} target="_blank" rel="noreferrer" style={{
                    padding: isSP ? '13px 16px' : '16px 22px', borderRadius: 999,
                    border: `1px solid rgba(255,255,255,0.25)`, color: '#fff',
                    fontSize: isSP ? 12 : 13, fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    <IconX size={13}/> {s.social.handle}
                  </a>
                )}
              </Reveal>
            )}
            {/* 提供ブランド：CloudCut ロゴ署名（一時非表示。復活時はコメントアウト解除）
            <Reveal delay={520} style={{
              marginTop: isSP ? 22 : 30, paddingTop: isSP ? 18 : 22,
              borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', gap: isSP ? 11 : 15,
            }}>
              <span className="lp-en" style={{
                fontSize: isSP ? 9 : 10, fontWeight: 700, letterSpacing: '0.2em', color: LEI.teal,
              }}>POWERED BY</span>
              <img src="/images/logo/cloudcut-full-white.png" alt="CloudCut"
                style={{ height: isSP ? 20 : 26, width: 'auto' }}/>
            </Reveal>
            */}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: isSP ? '1fr' : '1fr 1fr',
      gap: isSP ? 20 : 64, alignItems: 'center',
      marginBottom: isSP ? 56 : 96,
      direction: reversed ? 'rtl' : 'ltr',
    }}>
      <Reveal style={{
        aspectRatio: '4/3', overflow: 'hidden', borderRadius: 20,
        background: '#0a1320', direction: 'ltr',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Reveal>
      <div style={{ direction: 'ltr' }}>
        <Reveal style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
          <span className="lp-en" style={{ fontSize: isSP ? 36 : 40, fontWeight: 200, color: LEI.teal, lineHeight: 1 }}>{s.n}</span>
          <span className="lp-en" style={{
            fontSize: isSP ? 10 : 11, fontWeight: 700, letterSpacing: '0.26em', color: LEI.muted,
          }}>{s.tag.toUpperCase()}</span>
        </Reveal>
        <Reveal delay={120} as="h3" className="lp-jp"
          style={{ fontSize: isSP ? 22 : 32, fontWeight: 800, lineHeight: 1.4, margin: 0 }}>
          {s.title}
        </Reveal>
        <Typewriter
          as="p"
          text={s.body}
          speed={20}
          startDelay={700}
          cursor={LEI.teal}
          style={{ marginTop: 16, fontSize: isSP ? 14 : 15, lineHeight: 1.95, color: LEI.body, display: 'block' }}
        />
        <TypewriterList
          items={s.bullets}
          speed={22}
          gap={260}
          startDelay={Math.max(900, s.body.length * 22 + 600)}
          color={LEI.teal}
          render={(typed, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start',
              fontSize: isSP ? 13 : 14, lineHeight: 1.7, color: LEI.body }}>
              <span style={{ marginTop: 6 }}><IconCheck size={14} color={LEI.teal}/></span>
              {typed}
            </li>
          )}
        />
      </div>
    </article>
  );
}

function ServiceB({ device }: { device: Device }) {
  const isSP = device === 'sp';
  return (
    <section id="service" data-screen-label="02 Service" style={{
      padding: isSP ? '88px 0' : '160px 0', background: '#fff', color: LEI.ink,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isSP ? '0 20px' : '0 56px' }}>
        <Reveal><SectionLabel index="01" label="SERVICE"/></Reveal>
        <Reveal as="h2" delay={120} className="lp-jp" style={{
          marginTop: isSP ? 18 : 28, marginBottom: isSP ? 48 : 96,
          fontSize: isSP ? 26 : 'clamp(32px, 4vw, 48px)',
          fontWeight: 800,
          lineHeight: 1.4, letterSpacing: '0.005em',
          wordBreak: 'keep-all', overflowWrap: 'break-word',
        }}>
          <span style={{ color: LEI.teal }}>AIファースト</span>の事業で、<br/>
          ビジネスを最適化する。
        </Reveal>
        {SERVICES.map((s, i) => <ServiceRowB key={s.n} s={s} device={device} idx={i}/>)}
      </div>
    </section>
  );
}

export default function LPVariantB() {
  const device = useDevice();
  return (
    <div className="lp-root">
      <LPNav device={device} variant="B" tone="dark"/>
      <HeroB device={device}/>
      <ServiceB device={device}/>
      <NetworkBand device={device}/>
      <ToolsMarquee device={device} variant="B"/>
      <About device={device} variant="B"/>
      <Contact device={device} variant="B"/>
      <Footer device={device}/>
    </div>
  );
}
