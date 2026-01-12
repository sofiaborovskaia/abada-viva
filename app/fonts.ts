import { Open_Sans, Lexend } from "next/font/google";

export const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});
