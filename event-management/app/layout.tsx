// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "../src/store/ReduxProvider";

export const metadata: Metadata = {
  title: "Event Management",
  description: "Event Management System Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}