"use client";
import * as React from "react";

const timeIn = (zone: string, d: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);

/** Minutes past UTC for a zone at a given moment (handles Israel's daylight saving) */
const offsetMinutes = (zone: string, d: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longOffset" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value; // e.g. "GMT+07:00"
  const m = parts?.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!m) return 0;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0));
};

/**
 * Departure-board clocks: Bangkok and Tel Aviv local time, updated each minute.
 * Rendered empty on the server (time is client-only) to avoid a hydration mismatch.
 */
export function FooterClocks({
  label,
  bangkok,
  telAviv,
  ahead,
}: {
  label: string;
  bangkok: string;
  telAviv: string;
  ahead: string;
}) {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const tick = () => setNow(new Date());
    // Align updates to the start of each minute
    let interval: number | undefined;
    const first = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    const initial = window.setTimeout(tick, 0);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(initial);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const bkk = now ? timeIn("Asia/Bangkok", now) : "--:--";
  const tlv = now ? timeIn("Asia/Jerusalem", now) : "--:--";
  const diff = now ? Math.round((offsetMinutes("Asia/Bangkok", now) - offsetMinutes("Asia/Jerusalem", now)) / 60) : null;

  return (
    <div className="footer-board">
      <p className="footer-board-label">{label}</p>
      <div className="footer-clocks">
        {[
          { code: "BKK", city: bangkok, time: bkk },
          { code: "TLV", city: telAviv, time: tlv },
        ].map((c) => (
          <div key={c.code} className="footer-clock">
            <span className="footer-clock-code" lang="en">{c.code}</span>
            {/* key on the time: each minute change replays the flip */}
            <time key={c.time} className="footer-clock-time" lang="en">
              {/* the flap tiles are decorative; screen readers get the time as one phrase */}
              <span className="sr-only">{c.time}</span>
              {c.time.split("").map((ch, i) => (
                <span key={i} className={ch === ":" ? "colon" : "flap flap-sm"} aria-hidden="true">
                  {ch}
                </span>
              ))}
            </time>
            <span className="footer-clock-city">{c.city}</span>
          </div>
        ))}
      </div>
      {diff !== null && <p className="footer-board-note">{bangkok} · {ahead.replace("{h}", String(diff))}</p>}
    </div>
  );
}
