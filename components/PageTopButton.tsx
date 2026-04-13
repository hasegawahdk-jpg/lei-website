"use client";

import { useEffect, useState } from "react";

export default function PageTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 300);
    };

    window.addEventListener("scroll", handleScroll);
    
    // 初期値設定
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        backgroundColor: "#0d2137",
        color: "#2abfbf",
        fontFamily: 'var(--font-syne), "Arial Black", Arial, sans-serif',
        fontWeight: 700,
        fontSize: "12px",
        letterSpacing: "0.1em",
        borderRadius: "4px",
        padding: "10px 16px",
        border: "none",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.3s ease",
        zIndex: 9999,
      }}
    >
      PAGE TOP ↑
    </button>
  );
}
