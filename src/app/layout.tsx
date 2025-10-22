import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer/footer";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B2 Portal",
  description: "A portal used for managing phones for the B2 company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>B2 Portal</title>
        <link
          rel="icon"
          href="/icon.png"
          type="image/jpg"
          sizes="<generated>"
        />
      </head>

      <Script
        src="https://kit.fontawesome.com/d32ad62e17.js"
        crossOrigin="anonymous"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              border: "1px solid",
            },
            classNames: {
              // success: "shadow-green-800 border-green-800",
              // content: "!shadow-[5px_5px]",
              toast: "!shadow-[3px_3px] border-1",
            },
          }}
        />
        <Header />
        <main className="mx-auto min-h-[800px] p-2 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
