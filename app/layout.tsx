import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { DockNav } from "@/components/dock-nav/dock-nav";
import { MotionRoot } from "@/components/ui/animation-wrapper";
import { Cursor } from "@/components/ui/cursor";
import { profile } from "@/lib/data";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.about,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} antialiased`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <MotionRoot>
          {children}
          <DockNav />
          <Cursor />
        </MotionRoot>
      </body>
    </html>
  );
}
