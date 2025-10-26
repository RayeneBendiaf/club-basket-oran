import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";

const bebasneue = localFont({
  src: "../fonts/BebasNeue.ttf",
  variable: "--font-Bebas",
  weight: "100 200 300 400 500 700 800 900",
});

export const metadata: Metadata = {
  title: "C.O.B.B - Connextion Administrateur",
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
      <body className={`${bebasneue.variable} antialiased`}>{children}</body>
    </html>
  );
}
