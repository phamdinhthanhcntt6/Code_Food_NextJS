"use client";

import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const UNAUTHENTICATED_PATH = ["/login", "/logout", "/refresh-token"];

const RefreshToken = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;

    let interval: any = null;

    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
      },
    });
    const TIME_OUT = 1000;

    interval = setInterval(checkAndRefreshToken, TIME_OUT);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
};

export default RefreshToken;
