"use client";

import { useAppContext } from "@/components/app-provider";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const Logout = () => {
  const { mutateAsync } = useLogoutMutation();
  const searchParam = useSearchParams();
  const refreshTokenFromUrl = searchParam.get("refreshToken");
  const accessTokenFromUrl = searchParam.get("accessToken");
  const router = useRouter();
  const ref = useRef<any>(null);
  const { setIsAuth } = useAppContext();

  useEffect(() => {
    if (
      !ref.current &&
      ((refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
        (accessTokenFromUrl &&
          accessTokenFromUrl === getAccessTokenFromLocalStorage()))
    ) {
      ref.current = mutateAsync;
      mutateAsync().then((res) => {
        setTimeout(() => {
          ref.current = null;
        }, 1000);
        setIsAuth(false);
        router.push("/login");
      });
    } else {
      router.push("/");
    }
  }, [router, mutateAsync, refreshTokenFromUrl, accessTokenFromUrl, setIsAuth]);

  return <div>Logout...</div>;
};

const LogoutPage = () => {
  <Suspense>
    <Logout />
  </Suspense>;
};

export default LogoutPage;
