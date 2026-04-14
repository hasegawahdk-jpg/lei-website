"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    // スムーススクロールの処理
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const id = link.getAttribute('href')?.slice(1);
        if (id) {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setMobileMenuOpen(false); // モバイルメニューを閉じる
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        <Link href="#home" style={{ textDecoration: 'none' }}>
          <div style={{display:'flex', alignItems:'center', flexShrink:0}}>
            <span style={{
              fontFamily:'"Arial Black", Arial, sans-serif',
              fontSize:'22px',
              fontWeight:900,
              letterSpacing:'0.18em',
              color:'#ffffff',
              whiteSpace:'nowrap',
              lineHeight:1
            }}>
              LEI<span style={{color:'#2abfbf'}}>.</span>
            </span>
          </div>
        </Link>
        <button
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="nav-links">
          <li><Link href="#service">Service</Link></li>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#works">Works</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
      </nav>

      {/* モバイルドロップダウンメニュー */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li><Link href="#service">Service</Link></li>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#works">Works</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}
