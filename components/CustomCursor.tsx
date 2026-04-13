"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const animRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      animationFrameId = requestAnimationFrame(animRing);
    };
    
    animRing();

    const handleMouseEnter = () => ring.classList.add("hovered");
    const handleMouseLeave = () => ring.classList.remove("hovered");
    const handleDocMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const handleDocMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleDocMouseLeave);
    document.addEventListener("mouseenter", handleDocMouseEnter);

    const observeHovers = () => {
      const hovers = document.querySelectorAll(
        "a, button, .service-card, .btn-primary, .btn-ghost, .btn-submit"
      );
      hovers.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return hovers;
    };

    // 初期マウント時と、DOMの変更を検知してイベントを再アタッチする（簡易版）
    const hovers = observeHovers();

    // DOMの変更を検知する（ページ内のコンポーネントがマウントされた際に適用するため）
    const observer = new MutationObserver(() => {
      observeHovers();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleDocMouseLeave);
      document.removeEventListener("mouseenter", handleDocMouseEnter);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      hovers.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
