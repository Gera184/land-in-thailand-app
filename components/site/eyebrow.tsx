/** Section label styled like an airport gate sign: a numbered gate plus the section name. */
export function Eyebrow({ gate, children }: { gate?: number; children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      {gate !== undefined && (
        <span className="gate" lang="en" aria-hidden="true">
          {String(gate).padStart(2, "0")}
        </span>
      )}
      {children}
    </p>
  );
}
