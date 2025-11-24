import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import { AppHeader } from "@/components/AppHeader";
import { ThemeRegistry } from "@/theme/ThemeRegistry";

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
        <ReduxProvider>
          <ThemeRegistry>
            <AppHeader />
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}