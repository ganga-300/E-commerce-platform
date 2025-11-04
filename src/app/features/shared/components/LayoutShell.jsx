"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthGuard from "../../auth/components/AuthGuard";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const hideChrome = pathname === "/Login" || pathname === "/Signup";

  return (
    <>
      {!hideChrome && <Navbar />}
      <AuthGuard>{children}</AuthGuard>
      {!hideChrome && <Footer />}
    </>
  );
}


