import { PanoramaViewer } from "@/components/panorama-viewer";
import { UIPanel } from "@/components/ui-panel";

export default async function Home() {
  return (
    <main className="h-[100dvh] relative">
      <PanoramaViewer />
      <UIPanel />
    </main>
  );
}
