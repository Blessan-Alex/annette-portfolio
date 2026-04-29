import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const wtsolaire = localFont({
  src: [
    { path: '../public/font/Fontspring-DEMO-wtsolaire-displaylight.woff2', weight: '300', style: 'normal' },
    { path: '../public/font/Fontspring-DEMO-wtsolaire-displaylightitalic.woff2', weight: '300', style: 'italic' },
    { path: '../public/font/Fontspring-DEMO-wtsolaire-displayregular.woff2', weight: '400', style: 'normal' },
    { path: '../public/font/Fontspring-DEMO-wtsolaire-displayitalic.woff2', weight: '400', style: 'italic' },
    { path: '../public/font/Fontspring-DEMO-wtsolaire-displaymedium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Annettes Corner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${wtsolaire.variable} bg-surface-bright text-on-surface font-sans text-body-md antialiased min-h-screen selection:bg-neutral-200 selection:text-neutral-900 flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
