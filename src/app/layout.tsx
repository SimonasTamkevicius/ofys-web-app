import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FooterController from "./custom-components/FooterController";
import { LoadingProvider } from "./custom-components/generic/LoadingProvider";
import { Toaster } from "sonner";
import AuthProvider from "./providers/AuthProvider";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "OFYS",
  description: "Optimal Framework for Your Success",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LoadingProvider>
            {children}
            <FooterController />
            {/* Sonner global toaster */}
            <Toaster position="top-right" richColors />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
