import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import { UserProvider } from "@/contexts/UserContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { SchoolProvider } from "@/contexts/SchoolContext";
import { openSans, lexend } from "./fonts";

export const metadata: Metadata = {
  title: "Abadá Viva - Reserva de Aulas de Capoeira",
  description: "Reserve as suas aulas de capoeira com Abadá Viva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${openSans.variable} ${lexend.variable} antialiased`}>
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
