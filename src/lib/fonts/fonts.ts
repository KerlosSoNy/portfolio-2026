import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const namian = localFont({
  src: [
    {
      path: "../../fonts/en/Namian-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/en/Namian-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-namian",
  display: "swap",
});

export const notoKufiArabic = localFont({
  src: [
    {
      path: "../../fonts/ar/NotoKufiArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/ar/NotoKufiArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ar",
  display: "swap",
});