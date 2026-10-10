import "../globals.css";
import "../site.css";
import { RootDocument, buildMetadata } from "../document";

export const metadata = buildMetadata("he");
export { viewport } from "../document";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="he">{children}</RootDocument>;
}
