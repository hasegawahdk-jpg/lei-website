'use client';

import React, { useEffect, useRef, useState } from 'react';

const REDUCED = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView(
  opts: IntersectionObserverInit = { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (REDUCED) { setInView(true); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
};

export function Reveal({
  children, delay = 0, duration = 700, distance = 24, as = 'div', style = {}, className,
}: RevealProps) {
  const [ref, inView] = useInView();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}

type TypewriterProps = {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: string;
  showCursor?: boolean;
  cursorBlink?: boolean;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onDone?: () => void;
};

export function Typewriter({
  text, speed = 28, startDelay = 200, cursor = '#3fc8c0',
  showCursor = true, cursorBlink = true, style = {}, className, as = 'span', onDone,
}: TypewriterProps) {
  const [ref, inView] = useInView();
  const [out, setOut] = useState(REDUCED ? text : '');
  const [done, setDone] = useState(REDUCED);
  useEffect(() => {
    if (!inView || REDUCED) return;
    let i = 0;
    let canceled = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (canceled) return;
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        onDone && onDone();
        return;
      }
      const wobble = 0.8 + Math.random() * 0.6;
      timer = setTimeout(tick, speed * wobble);
    };
    timer = setTimeout(tick, startDelay);
    return () => { canceled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text, speed, startDelay]);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} style={style}>
      <span style={{ whiteSpace: 'pre-wrap' }}>{out}</span>
      {showCursor && !done && (
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '0.06em', height: '1em', marginLeft: 1,
            background: cursor, verticalAlign: '-0.16em',
            animation: cursorBlink ? 'lei-caret 0.9s steps(2) infinite' : 'none',
          }}
        />
      )}
    </Tag>
  );
}

export function TypewriterParagraphs({
  paragraphs, speed = 22, gap = 320, startDelay = 200, color, style = {},
}: {
  paragraphs: string[];
  speed?: number;
  gap?: number;
  startDelay?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const [ref, inView] = useInView();
  const [idx, setIdx] = useState(REDUCED ? paragraphs.length : 0);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={style}>
      {paragraphs.map((p, i) => {
        if (REDUCED) {
          return <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? 18 : 0 }}>{p}</p>;
        }
        if (i > idx) return null;
        return (
          <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? 18 : 0 }}>
            <Typewriter
              text={p}
              speed={speed}
              startDelay={i === 0 ? startDelay : gap}
              showCursor={i === idx}
              cursor={color || '#3fc8c0'}
              onDone={() => {
                if (i === idx && idx < paragraphs.length - 1) setIdx(idx + 1);
              }}
            />
          </p>
        );
      })}
      {!inView && null}
    </div>
  );
}

export function TypewriterList({
  items, speed = 24, gap = 220, startDelay = 200, render, color,
}: {
  items: string[];
  speed?: number;
  gap?: number;
  startDelay?: number;
  render?: (typed: React.ReactNode, i: number, ready: boolean) => React.ReactNode;
  color?: string;
}) {
  const [ref, inView] = useInView();
  const [idx, setIdx] = useState(REDUCED ? items.length : 0);
  return (
    <ul ref={ref as React.RefObject<HTMLUListElement>} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
      {items.map((it, i) => {
        if (REDUCED) return render ? render(it, i, true) : <li key={i}>{it}</li>;
        if (i > idx) return null;
        const typed = (
          <Typewriter
            text={typeof it === 'string' ? it : ''}
            speed={speed}
            startDelay={i === 0 ? startDelay : gap}
            showCursor={i === idx}
            cursor={color || '#3fc8c0'}
            onDone={() => { if (i === idx && i < items.length - 1) setIdx(i + 1); }}
          />
        );
        return render ? render(typed, i, true) : (
          <li key={i}>{typed}</li>
        );
      })}
      {!inView && null}
    </ul>
  );
}
