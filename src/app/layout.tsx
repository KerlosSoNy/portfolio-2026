import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/organisims/footer/footer";
import { namian } from "@/lib/fonts/fonts";
import Navbar from "@/components/organisims/navbar/navbar";


export const metadata: Metadata = {
  title: "Kerlos Magdy | Frontend Designer",
  description: "Digital, creative designer portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={` ${namian.variable} h-full antialiased`}
    >
      <body className="min-h-full font-en! flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
