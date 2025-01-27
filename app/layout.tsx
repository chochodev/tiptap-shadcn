import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TipTap Editor - Build Your Rich Text Editor",
  description: "A powerful rich text editor built with TipTap and shadcn/ui. Features AI assistance, file uploads, math equations, and more.",
  keywords: ["tiptap", "rich text editor", "react", "nextjs", "ai", "markdown"],
  authors: [
    {
      name: "Your Name",
      url: "https://github.com/yourusername",
    },
  ],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "TipTap Editor - Build Your Rich Text Editor",
    description: "A powerful rich text editor built with TipTap and shadcn/ui. Features AI assistance, file uploads, math equations, and more.",
    siteName: "TipTap Editor",
  },
  twitter: {
    card: "summary_large_image",
    title: "TipTap Editor - Build Your Rich Text Editor",
    description: "A powerful rich text editor built with TipTap and shadcn/ui. Features AI assistance, file uploads, math equations, and more.",
    creator: "@yourusername",
  },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
