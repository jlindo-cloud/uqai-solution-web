import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UQ AI Solution Company",
  description: "Inteligencia Artificial para el Peru y el Mundo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
