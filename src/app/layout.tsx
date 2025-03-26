import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/Shared/navbar";
import Footer from "@/components/Shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MINIAILIVE",
  description: "MiniAILive Online Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full flex flex-col min-h-screen relative">
            <TopNavbar />
            <div className="flex-grow bg-[#f7f8fb] p-3">{children}</div>

            <div className="lg:-ml-[16rem]">
              <Footer />
            </div>
            <Toaster />
            <ToastContainer />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
