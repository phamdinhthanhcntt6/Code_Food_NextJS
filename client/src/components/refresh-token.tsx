"use client";

import { useEffect } from "react";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";

const UNAUTHENTICATED_PATH = ["/login", "/logout", "/refresh-token"];

const RefreshToken = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;

    let interval: any = null;

    const checkAndRefreshToken = async () => {
      const accessToken = getAccessTokenFromLocalStorage();
      const refreshToken = getRefreshTokenFromLocalStorage();

      if (!accessToken || !refreshToken) return;

      const decodedAccessToken = jwt.decode(accessToken) as {
        exp: number;
        iat: number;
      };
      console.log(decodedAccessToken.iat);

      const decodedRefreshToken = jwt.decode(refreshToken) as {
        exp: number;
        iat: number;
      };

      const now = Math.round(new Date().getTime() / 1000);

      if (decodedRefreshToken.exp <= now) return;

      if (
        decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
      ) {
        try {
          const res = await authApiRequest.refreshToken();

          setAccessTokenToLocalStorage(res.payload.data.accessToken);
          setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
        } catch (error) {
          clearInterval(interval);
        }
        // }
      }
      //Phải gọi lần đầu tiên vì interval sẽ chạy sau thời gian TIME OUT
    };

    checkAndRefreshToken();
    const TIME_OUT = 1000;

    interval = setInterval(checkAndRefreshToken, TIME_OUT);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
};

export default RefreshToken;
