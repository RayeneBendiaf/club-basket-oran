import localFont from "next/font/local";
import "./globals.css";

const bebasneue = localFont({
  src: "./fonts/BebasNeue.ttf",
  variable: "--font-bebas",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${bebasneue.variable} antialiased`}>{children}</body>
    </html>
  );
}
