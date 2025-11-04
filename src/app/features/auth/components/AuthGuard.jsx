"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const publicPaths = new Set(["/Login", "/Signup"]);
    const isPublic = publicPaths.has(pathname || "");
    const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("auth") === "true";

    if (!isAuthenticated && !isPublic) {
      router.replace("/Login");
      setChecked(true);
      return;
    }
    setChecked(true);
  }, [pathname, router]);

  if (!checked) return null;
  return <>{children}</>;
}


