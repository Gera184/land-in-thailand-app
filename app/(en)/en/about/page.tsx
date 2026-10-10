import { InfoPage } from "@/components/site/info-page";
import { buildMetadata } from "@/app/document";

export const metadata = buildMetadata("en", "about");

export default function Page() {
  return <InfoPage locale="en" page="about" />;
}
