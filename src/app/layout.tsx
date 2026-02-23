import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { GlobalInteraction } from "@/components/layout/global-interaction";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hrushi Bhanvadiya — Software Engineer",
  description: "Computer Science Engineer building scalable applications and intelligent solutions with modern technologies.",
  openGraph: {
    title: "Hrushi Bhanvadiya — Software Engineer",
    description: "Computer Science Engineer building scalable applications and intelligent solutions with modern technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-sans overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GlobalInteraction>
            <ParallaxBackground />
            {children}
          </GlobalInteraction>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
