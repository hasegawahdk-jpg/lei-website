"use client";

import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const targets = aboutSection.querySelectorAll('.about-body > .typing-target');
    let typedCount = 0;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (typedCount === 0) {
          startSequentialTyping(Array.from(targets));
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });

    function startSequentialTyping(elements: Element[]) {
      if (typedCount >= elements.length) return;

      const el = elements[typedCount] as HTMLElement;
      startTyping(el, 0, () => {
        typedCount++;
        if (typedCount < elements.length) {
          startSequentialTyping(elements);
        }
      });
    }

    function startTyping(el: HTMLElement, delay: number, onComplete?: () => void) {
      const text = el.getAttribute('data-text') || '';
      const chars = [...text];
      const speed = 20;
      let i = 0;
      el.textContent = '';

      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';

      setTimeout(function type() {
        if (i < chars.length) {
          if (i === 0) {
            el.appendChild(cursor);
          }
          el.insertBefore(document.createTextNode(chars[i]), cursor);
          i++;
          setTimeout(type, speed + Math.random() * 8);
        } else {
          setTimeout(() => {
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
            if (onComplete) onComplete();
          }, 1000);
        }
      }, delay + 200);
    }

    targets.forEach(el => obs.observe(el));

    return () => {
      obs.disconnect();
    };
  }, []);

  return (
    <section id="about" className="section">
      <div className="section-num-bg">02</div>
      <div className="section-inner">
        <div className="section-label reveal">About</div>
        <h2 className="section-title reveal reveal-delay-1">
          史上最速の<span className="teal">変化</span>を、<br />事業最大の<span className="teal">変革</span>に。
        </h2>

        <div className="about-grid">
          {/* 左：会社概要テーブル */}
          <div className="reveal reveal-delay-1">
            <table className="company-table">
              <tbody>
                <tr>
                  <th>社名</th>
                  <td>株式会社◯<br /><small style={{ color: "var(--gray-dark)" }}>LEI, inc.</small></td>
                </tr>
                <tr>
                  <th>設立</th>
                  <td>2022年6月</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>東京都渋谷区神宮前六丁目23番4号</td>
                </tr>
                <tr>
                  <th>事業</th>
                  <td>AIコンサルティング<br />クラウドコスト削減支援<br />WEBマーケティング支援<br />IP創出支援</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 右：メッセージ */}
          <div className="about-message reveal reveal-delay-2">
            <h3 className="about-headline">
              50年越しの産業革命の変革を<br />
              AIは<strong style={{ color: "var(--teal-dark)" }}>「10倍の速さ」</strong><br />
              <strong style={{ color: "var(--teal-dark)" }}>「300倍の規模」</strong>で<br />
              塗り替えようとしています。
            </h3>
            <div className="about-body">
              <p className="typing-target" data-text="実質3,000倍ものインパクト――数年内にオフィス業務の大半が自動化され、超知能の実現すら視野に入る今、あらゆる産業の前提が根底から書き換わろうとしています。"></p>
              <p className="typing-target" data-text="株式会社◯（LEI, inc.）は、最先端のAI技術を自ら事業に実装してきた「実感値」と、数十億規模の企業経営で培った「経験値」を融合。◯（ゼロ）からリセットする覚悟を持つ企業様とともに、事業と組織のパフォーマンスを再定義し、ビジネスの最適化を実現します。"></p>
              <p className="typing-target" data-text="生成AIの進化は、連日の新機能リリースが示すとおり、想像を超える速度で加速しています。この転換期にこそ、商機と危機の両面を見極め、行動を起こせるかが分かれ目です。近い未来の勝ち組となるために――私たちが、その伴走者になります。"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
