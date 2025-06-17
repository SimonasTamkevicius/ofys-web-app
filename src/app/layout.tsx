import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
// import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-roboto",
// });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

// export const metadata: Metadata = {
//   title: "OFYS",
//   description: "Optimal Framework for Your Success",
// };

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/logo32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/logo180.png" sizes="180x180" />
        {/* Fallback SVG icon (Safari might ignore) */}
        <link rel="icon" href="/OFYSLOGO.svg" type="image/svg+xml" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
