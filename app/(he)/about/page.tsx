import { InfoPage } from "@/components/site/info-page";
import { buildMetadata } from "@/app/document";

export const metadata = buildMetadata("he", "about");

export default function Page() {
  return <InfoPage locale="he" page="about" />;
}
