import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { UserProvider } from "@/contexts/UserContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { SchoolProvider } from "@/contexts/SchoolContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abada Viva - Capoeira Class Booking",
  description: "Book your capoeira classes with Abada Viva",
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
        <SchoolProvider>
          <UserProvider>
            <BookingProvider>
              <Navigation />
              {children}
            </BookingProvider>
          </UserProvider>
        </SchoolProvider>
      </body>
    </html>
  );
}
