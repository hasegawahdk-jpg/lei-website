"use client";

import HeroCanvas from "./HeroCanvas";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">株式会社◯ — LEI, inc.</span>
        </div>

        <h1 className="hero-main">
          最先端のAI活用により、<br />
          <span className="underline-accent">ビジネスの最適化</span>を。
        </h1>

        <div className="hero-divider">
          <div className="div-line"></div>
          <span className="div-label">Vision</span>
          <div className="div-line"></div>
        </div>

        <p className="vision-en">
          RESET TO <span className="teal">◯</span>.<br />
          RISE TOGETHER.
        </p>
        <p className="vision-ja">
          <span className="teal-s">◯</span>（ゼロ）に戻ることを、恐れない。<br />
          <span className="teal-s">◯</span>（円）を共に描く仲間と、次のステージへ。
        </p>

        <div className="hero-cta">
          <Link href="#service" className="btn-primary">SERVICE</Link>
          <Link href="#about" className="btn-ghost">
            About Us <span className="arr">→</span>
          </Link>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'12px',marginTop:'3rem',paddingTop:'2rem',borderTop:'1px solid rgba(42,191,191,0.2)'}}>
          <img src="/images/lei-logo.png" alt="LEI logo" style={{width:'56px',height:'56px',objectFit:'contain'}} />
          <span style={{fontFamily:'"Arial Black",Arial,sans-serif',fontSize:'28px',fontWeight:900,letterSpacing:'0.18em',color:'#0d2137',lineHeight:1}}>LEI<span style={{color:'#2abfbf'}}>.</span></span>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-eq">LEI = ◯ = ZERO</div>
        <HeroCanvas />
      </div>

      <div className="services-bar">
        <div className="svc-item">AI Consulting</div>
        <div className="svc-item">Cloud Cost Reduction</div>
        <div className="svc-item">Web Marketing</div>
        <div className="svc-item">IP Creation</div>
      </div>
    </section>
  );
}
