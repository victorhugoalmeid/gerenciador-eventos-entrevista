// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Gestão de Eventos",
  description: "Desafio : Sistema de Gestão de Eventos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>
          <AppHeader />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}