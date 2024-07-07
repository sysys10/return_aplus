import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from '@/components/ui/footer'
import Banner from "@/components/ui/banner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "기억보관소",
};

export default function RootLayout({
  children,
} : Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
       <Footer/>
      </body>
    </html>
  );
}
