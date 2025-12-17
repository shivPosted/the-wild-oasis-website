import React from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
