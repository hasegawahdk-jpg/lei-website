"use client";

import { FormEvent } from "react";

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const company = formData.get("company") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const category = formData.get("category") as string;
    const message = formData.get("message") as string;
    
    const subject = encodeURIComponent(`【LEI, inc.】お問い合わせ：${category}`);
    const body = encodeURIComponent(
      `会社名：${company}\n` +
      `お名前：${name}\n` +
      `メール：${email}\n` +
      `内容：${category}\n\n` +
      `${message}`
    );
    window.location.href = `mailto:info@lei-inc.jp?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="section-num-bg">03</div>
      <div className="section-inner" style={{ textAlign: "center" }}>
        <div className="section-label reveal" style={{ justifyContent: "center" }}>Contact</div>
        <h2 className="section-title reveal reveal-delay-1">
          ビジネスの未来を、<br />共に創る。
        </h2>
        
        <img 
          src="/images/ip-creation.jpg" 
          alt="Contact" 
          className="reveal reveal-delay-2" 
          style={{ width: "100%", maxWidth: "900px", height: "280px", objectFit: "cover", margin: "2.5rem auto 0", borderRadius: "8px" }} 
        />

        <div className="contact-wrap">
          <p className="contact-lead reveal reveal-delay-3">
            貴社の課題に合わせた最適なAIソリューションをご提案します。<br />初回相談は無料です。お気軽にお問い合わせください。
          </p>

          <form id="contact-form" className="reveal reveal-delay-4" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">会社名<span className="req">*</span></label>
                <input type="text" name="company" className="form-input" placeholder="株式会社〇〇" required />
              </div>
              <div className="form-group">
                <label className="form-label">お名前<span className="req">*</span></label>
                <input type="text" name="name" className="form-input" placeholder="山田 太郎" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">メールアドレス<span className="req">*</span></label>
              <input type="email" name="email" className="form-input" placeholder="info@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">お問い合わせ内容<span className="req">*</span></label>
              <select name="category" className="form-select form-input" required defaultValue="">
                <option value="" disabled>内容を選択してください</option>
                <option value="AIコンサルティングについて">AIコンサルティングについて</option>
                <option value="クラウドコスト削減支援について">クラウドコスト削減支援について</option>
                <option value="WEBマーケティング支援について">WEBマーケティング支援について</option>
                <option value="IP創出支援について">IP創出支援について</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">メッセージ</label>
              <textarea name="message" className="form-textarea" placeholder="ご相談内容をご記入ください"></textarea>
            </div>
            <div className="form-submit-wrap">
              <button type="submit" className="btn-submit">送信する</button>
              <p className="form-note">送信後、担当者より2営業日以内にご返信いたします。</p>
            </div>
          </form>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',marginTop:'2.5rem',paddingTop:'2rem',borderTop:'1px solid rgba(13,33,55,0.1)'}}>
            <img src="/images/lei-logo.png" alt="LEI logo" style={{width:'48px',height:'48px',objectFit:'contain'}} />
            <span style={{fontFamily:'"Arial Black",Arial,sans-serif',fontSize:'24px',fontWeight:900,letterSpacing:'0.18em',color:'#0d2137',lineHeight:1}}>LEI<span style={{color:'#2abfbf'}}>.</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
