import { Fragment } from "react";

/** Renders heading markup from lib/content.ts: `*word*` → <em>, `\n` → <br>. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/(\*[^*]+\*)/).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") ? <em key={j}>{part.slice(1, -1)}</em> : part,
          )}
        </Fragment>
      ))}
    </>
  );
}
