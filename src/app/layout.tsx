// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";   
import Footer from "./components/footer";         
import Providers from "./components/providers";
import ScrollToTop from "./components/scrollToTop";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PathWise — AI Career Guidance for Students",
  description: "Stop guessing your career. Get a clear AI-powered roadmap, daily tasks, and accountability to build your future.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "PathWise — Stop Guessing. Start Building.",
    description: "Personal AI career coach for Indian students.",
    images: [{ url: "https://pathwise.in/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#0f0407] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Providers>
        
          <Header />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}