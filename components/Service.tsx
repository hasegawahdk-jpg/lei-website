"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Service() {
  useEffect(() => {
    const targets = document.querySelectorAll('.typing-target');
    const typed = new Set();

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || typed.has(entry.target)) return;

        const body = entry.target.closest('.service-body');
        if (!body) {
          startTyping(entry.target as HTMLElement, 0);
          typed.add(entry.target);
          return;
        }

        const group = body.querySelectorAll('.typing-target');
        group.forEach(el => {
          if (!typed.has(el)) {
            typed.add(el);
          }
        });

        let cumulativeDelay = 0;
        group.forEach(el => {
          startTyping(el as HTMLElement, cumulativeDelay);
          const len = (el.getAttribute('data-text') || '').length;
          cumulativeDelay += len * 30 + 400; // 文字数×speed + バッファ
        });
      });
    }, { threshold: 0.35 });

    function startTyping(el: HTMLElement, delay: number) {
      const text = el.getAttribute('data-text') || '';
      const chars = [...text];
      const speed = 28;
      let i = 0;
      el.textContent = '';

      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      el.appendChild(cursor);

      setTimeout(function type() {
        if (i < chars.length) {
          el.insertBefore(document.createTextNode(chars[i]), cursor);
          i++;
          setTimeout(type, speed + Math.random() * 12);
        } else {
          setTimeout(() => {
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
          }, 2500);
        }
      }, delay + 200);
    }

    targets.forEach(el => obs.observe(el));

    return () => {
      obs.disconnect();
    };
  }, []);

  return (
    <section id="service" className="section">
      <div className="section-num-bg">01</div>
      <div className="section-inner">
        <div className="section-label reveal">Service</div>
        <h2 className="section-title reveal reveal-delay-1">
          4つの事業で、<br />ビジネスを<span className="teal">最適化</span>する。
        </h2>

        <div className="service-grid">
          {/* 01 クラウドコスト */}
          <div className="service-card reveal reveal-delay-1">
            <div className="service-img">
              {/* @next/image ではなく標準imgタグを使用（要件：事業画像は /public/images/ に配置する想定でimgタグ設置） */}
              <img src="/images/cloud-cost.jpg" alt="クラウドコスト削減支援"
                   style={{ objectFit: 'cover', objectPosition: 'top' }}
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.style.display = 'none';
                     const placeholder = target.nextElementSibling as HTMLElement;
                     if (placeholder) placeholder.style.display = 'flex';
                   }} />
              <div className="img-placeholder" style={{ display: 'none' }}>
                <div className="ph-icon">☁</div>
                <span>cloud-cost.jpg</span>
              </div>
            </div>
            <div className="service-body">
              <div className="service-num">01</div>
              <h3 className="service-title">クラウドコスト削減支援<br /><small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--gray-dark)' }}>(FinOps)</small></h3>
              <p className="service-desc typing-target" data-text="クラウドインフラの利用状況を可視化し、無駄なリソースを特定。AIを活用した精緻な分析により、パフォーマンスを維持しながらコストを劇的に最適化します。"></p>
              <ul className="service-checks">
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="AIによるリソース最適化提案"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="AWS・GCP・AZUREの平均20％のコスト削減"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="請求書対応によるCF改善"></span>
                </li>
              </ul>
            </div>
          </div>

          {/* 02 AIコンサルティング */}
          <div className="service-card reveal reveal-delay-2">
            <div className="service-img">
              <img src="/images/ai-consulting.jpg" alt="AIコンサルティング"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.style.display = 'none';
                     const placeholder = target.nextElementSibling as HTMLElement;
                     if (placeholder) placeholder.style.display = 'flex';
                   }} />
              <div className="img-placeholder" style={{ display: 'none' }}>
                <div className="ph-icon">🧠</div>
                <span>ai-consulting.jpg</span>
              </div>
            </div>
            <div className="service-body">
              <div className="service-num">02</div>
              <h3 className="service-title">AIコンサルティング</h3>
              <p className="service-desc typing-target" data-text="業務プロセスの自律化（Agentic AI）に向けた戦略策定から実装までを伴走。エグゼクティブ層が求めるガバナンスを担保しつつ、最新技術の導入を加速させます。"></p>
              <ul className="service-checks">
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="Agentic AI導入戦略の策定"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="業務プロセスの自律化支援"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="10年以上の経営経験から課題抽出"></span>
                </li>
              </ul>
            </div>
          </div>

          {/* 03 WEBマーケティング */}
          <div className="service-card reveal reveal-delay-1">
            <div className="service-img">
              <img src="/images/web-marketing-new.jpg" alt="WEBマーケティング支援"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.style.display = 'none';
                     const placeholder = target.nextElementSibling as HTMLElement;
                     if (placeholder) placeholder.style.display = 'flex';
                   }} />
              <div className="img-placeholder" style={{ display: 'none' }}>
                <div className="ph-icon">📊</div>
                <span>web-marketing-new.jpg</span>
              </div>
            </div>
            <div className="service-body">
              <div className="service-num">03</div>
              <h3 className="service-title">WEBマーケティング支援</h3>
              <p className="service-desc typing-target" data-text="最新の生成AIと業務最適化を掛け合わせ、最小限のパワーで最大限のパフォーマンスを発揮。顧客体験を最大化するマーケティング戦略を実行します。"></p>
              <ul className="service-checks">
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="AI活用を軸とした集客設計"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="SNS等での自動投稿や素材生成支援"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="Output・Inputを最新技術で効率化"></span>
                </li>
              </ul>
            </div>
          </div>

          {/* 04 IP創出支援 */}
          <div className="service-card reveal reveal-delay-2">
            <div className="service-img">
              <img src="/images/web-marketing.jpg" alt="IP創出支援"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.style.display = 'none';
                     const placeholder = target.nextElementSibling as HTMLElement;
                     if (placeholder) placeholder.style.display = 'flex';
                   }} />
              <div className="img-placeholder" style={{ display: 'none' }}>
                <div className="ph-icon">✦</div>
                <span>web-marketing.jpg</span>
              </div>
            </div>
            <div className="service-body">
              <div className="service-num">04</div>
              <h3 className="service-title">IP創出支援</h3>
              <p className="service-desc typing-target" data-text="AIアルゴリズムを駆使し、新たな知的財産を創出。ニーズに合わせたキャラクター設計から具現化まで、デジタル資産の価値を最大化する戦略を提供します。"></p>
              <ul className="service-checks">
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="生成AIを駆使したキャラクター設計"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="様々な手法を駆使したIP露出支援"></span>
                </li>
                <li className="service-check">
                  <span className="check-icon"><svg viewBox="0 0 10 8" fill="none"><polyline points="1,4 4,7 9,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="typing-target" data-text="中国提携工場と連携した商品化支援"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
