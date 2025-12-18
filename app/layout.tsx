import "@/app/_styles/globals.css";
import React from "react";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary-950">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyrigh 2025 wild-oasis</footer>
      </body>
    </html>
  );
}
