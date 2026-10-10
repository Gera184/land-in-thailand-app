"use client";
import * as React from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Departure-board text: when `text` changes, each character riffles through a few
 * letters and settles left to right. Reduced motion: switches instantly.
 */
export function SplitFlap({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = React.useState(text);
  const first = React.useRef(true);

  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = text.split("");
    const settleAt = target.map((_, i) => 4 + i * 2); // frames until each char lands
    let frame = 0;
    const id = window.setInterval(() => {
      frame++;
      const next = target
        .map((ch, i) => (reduce || frame >= settleAt[i] ? ch : LETTERS[Math.floor(Math.random() * LETTERS.length)]))
        .join("");
      setShown(next);
      if (reduce || frame >= settleAt[settleAt.length - 1]) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <span className={className} aria-label={text} role="img">
      {shown.split("").map((ch, i) => (
        <span key={i} className="flap" aria-hidden="true">
          {ch}
        </span>
      ))}
    </span>
  );
}
