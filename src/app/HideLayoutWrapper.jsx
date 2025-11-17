"use client";

import { usePathname } from "next/navigation";
import Navbar from "./features/shared/components/Navbar";
import Footer from "./features/shared/components/Footer";

export default function HideLayoutWrapper({ children }) {
  const pathname = usePathname();

  const hide = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </>
  );
}
