import "./globals.css";
import "./site.css";
import type { Metadata } from "next";
import Link from "next/link";

import { RootDocument } from "./document";
import { BrandMark } from "@/components/site/icons";

// One 404 for both languages (the app has two root layouts): GitHub Pages serves it for every unknown URL
export const metadata: Metadata = {
  title: "404 · Land In Thailand",
  description: "העמוד לא נמצא · Page not found",
  robots: { index: false },
};
export { viewport } from "./document";

export default function GlobalNotFound() {
  return (
    <RootDocument locale="he">
      <main id="main" className="nf">
        <Link href="/" className="nf-brand" aria-label="Land In Thailand · דף הבית">
          <BrandMark />
          <span className="brand-word" lang="en">
            Land <em>in</em> Thailand
          </span>
        </Link>
        <div className="nf-board">
          <p className="nf-code" lang="en" aria-hidden="true">
            404
          </p>
          <h1 className="h2">
            השער הזה <em>לא קיים.</em>
          </h1>
          <p className="nf-lead">ייתכן שהקישור שגוי או שהעמוד עבר מקום. נמשיך מכאן:</p>
          <Link className="btn btn-primary" href="/">
            חזרה לדף הבית
          </Link>
          <div className="nf-en" lang="en" dir="ltr">
            <p>This gate doesn&apos;t exist.</p>
            <Link href="/en/">Back to the English site</Link>
          </div>
        </div>
      </main>
    </RootDocument>
  );
}
