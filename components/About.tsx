export default function About() {
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
              AIは<strong style={{ color: "var(--teal-dark)" }}>「10倍の速さ」</strong><strong style={{ color: "var(--teal-dark)" }}>「300倍の規模」</strong>で<br />
              今まさに、塗り替えようとしています。
            </h3>
            <div className="about-body">
              <p>実質3,000倍ものインパクト――数年内にオフィス業務の<strong>大半が自動化</strong>され、超知能の実現すら視野に入る今、あらゆる産業の前提が<strong>根底から</strong>書き換わろうとしています。</p>
              <p>株式会社◯（LEI, inc.）は、最先端のAI技術を自ら事業に実装してきた<strong>「実感値」</strong>と、数十億規模の企業経営で培った<strong>「経験値」</strong>を融合。◯（ゼロ）から<strong>リセット</strong>する覚悟を持つ企業様とともに、事業と組織のパフォーマンスを再定義し、<strong>ビジネスの最適化</strong>を実現します。</p>
              <p>生成AIの進化は、連日の新機能リリースが示すとおり、<strong>想像を超える速度</strong>で加速しています。この転換期にこそ、<strong>商機</strong>と<strong>危機</strong>の両面を見極め、行動を起こせるかが<strong>分かれ目</strong>です。近い未来の勝ち組となるために――私たちが、その<strong>伴走者</strong>になります。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
