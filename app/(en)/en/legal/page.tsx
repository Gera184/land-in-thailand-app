import { InfoPage } from "@/components/site/info-page";
import { buildMetadata } from "@/app/document";

export const metadata = buildMetadata("en", "legal");

export default function Page() {
  return <InfoPage locale="en" page="legal" />;
}
