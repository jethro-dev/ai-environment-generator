import PromptForm from "@/components/prompt-form";
import PanoramaViewer from "@/components/panorama-viewer";
import { getServerSession } from "next-auth";
import { LoginForm } from "@/components/login-form";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="h-[100dvh] relative">
      <PanoramaViewer />

      {(!session || !session?.user) && (
        <div className="absolute inset-0 grid place-items-center ring-2 z-[9999]">
          <LoginForm />
        </div>
      )}

      {session && session?.user && <PromptForm />}
    </main>
  );
}
