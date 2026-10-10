import { InfoPage } from "@/components/site/info-page";
import { buildMetadata } from "@/app/document";

export const metadata = buildMetadata("he", "legal");

export default function Page() {
  return <InfoPage locale="he" page="legal" />;
}
