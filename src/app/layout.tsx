import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FooterController from "./custom-components/FooterController";
import { LoadingProvider } from "./custom-components/generic/LoadingProvider";
import { Toaster } from "sonner";
import AuthProvider from "./providers/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "OFYS",
  description: "Optimal Framework for Your Success",
  icons: [
    {
      url: "/logo16.png",
      sizes: "16x16",
    },
    {
      url: "/logo32.png",
      sizes: "32x32",
    },
    {
      url: "/logo180.png",
      sizes: "180x180",
    },
    {
      url: "/OFYSLOGO.svg",
      sizes: "any",
    },
  ],
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
            {/* Vercel Analytics */}
            <Analytics />
            {/* Vercel Speed Insights */}
            <SpeedInsights />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
