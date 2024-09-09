"use client";

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenToLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const LogoutPage = () => {
  const { mutateAsync } = useLogoutMutation();
  const searchParam = useSearchParams();
  const refreshTokenFromUrl = searchParam.get("refreshToken");
  const accessTokenFromUrl = searchParam.get("accessToken");
  const router = useRouter();
  const ref = useRef<any>(null);

  useEffect(() => {
    if (
      (refreshTokenFromUrl &&
        refreshTokenFromUrl !== getRefreshTokenToLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl !== getAccessTokenFromLocalStorage())
    ) {
      return;
    }
    ref.current = mutateAsync;
    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null;
      }, 1000);
      router.push("/login");
    });
  }, [router, mutateAsync, refreshTokenFromUrl, accessTokenFromUrl]);

  return <div>LogoutPage</div>;
};

export default LogoutPage;
