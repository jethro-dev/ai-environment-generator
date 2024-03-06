import PromptForm from "@/components/prompt-form";
import PanoramaViewer from "@/components/panorama-viewer";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="h-[100dvh] relative flex items-center justify-center">
      <h1>You dont have permission to access this page.</h1>
    </main>
  );
}
