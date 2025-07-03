"use client";

import { usePathname } from "next/navigation";
import Footer from "./generic/Footer";

export default function FooterController() {
  const pathname = usePathname();
  const noFooterRoutes = ["/realty"];
  if (noFooterRoutes.includes(pathname)) return null;
  return <Footer />;
}
