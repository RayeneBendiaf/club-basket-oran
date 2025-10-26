import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";

const bebasneue = localFont({
  src: "../fonts/BebasNeue.ttf",
  variable: "--font-Bebas",
  weight: "100 200 300 400 500 700 800 900",
});

export const metadata: Metadata = {
  title: "C.O.B.B - Club Oranais de Basketball",
  description: "Site officiel du Club Oranais de Basketball.",
  icons: {
    icon: "/logos/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${bebasneue.variable}antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
