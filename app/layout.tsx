import type { Metadata } from "next";
import "./globals.css";

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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-surface-bright text-on-surface font-sans text-body-md antialiased min-h-screen selection:bg-neutral-200 selection:text-neutral-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
