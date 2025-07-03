import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import "./globals.css";
// import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import FooterController from "./components/FooterController";

export const metadata: Metadata = {
  title: "OFYS",
  description: "Optimal Framework for Your Success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <CursorFollower /> */}
        {children}
        <FooterController />
      </body>
    </html>
  );
}
