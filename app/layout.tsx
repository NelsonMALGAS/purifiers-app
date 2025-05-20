import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Header from "@/components/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],

});


export const metadata: Metadata = {
  title: "💧AquaSync",
  description:
    "AquaSync is a smart water purifier management system that helps you monitor usage, receive maintenance alerts, and manage inventory — all in real time from your phone or desktop.",
  keywords: [
    "AquaSync",
    "water purifier",
    "purifier monitoring",
    "smart water system",
    "filter alerts",
    "maintenance notifications",
    "real-time monitoring",
    "IoT water purifier",
    "clean water",
    "inventory tracking",
    "purity pipe",
    "water quality",
    "remote control",
    "mobile notifications"
  ],
  authors: [
    {
      name: "Nelson Zongezile Malgas",
    },
    {
      name: "Keamogetswe Kgakatsi"
    }
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto px-8">{children}</main>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
