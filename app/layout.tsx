import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "SceneAI",
  description:
    "SceneAI is a cutting-edge app designed to generate stunning 360-degree panoramic images from textual prompts. Leveraging advanced AI algorithms, SceneAI transforms your ideas into immersive environments, perfect for virtual tours, real estate presentations, and creative visual storytelling.",
  keywords: [
    "360 panorama",
    "AI imaging",
    "virtual reality",
    "environment generator",
    "scene creation",
    "VR tours",
  ],
  // author: "Your Company Name",
  // website: "www.sceneai.com",
  // supportEmail: "support@sceneai.com",
  // privacyPolicy: "www.sceneai.com/privacy",
  // category: "Photography, Virtual Reality",
  // platforms: ["iOS", "Android", "Web"],
  // releaseDate: "2024-05-01",
  // license: "Proprietary",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
