"use client";

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const RefreshToken = () => {
  const searchParam = useSearchParams();
  const refreshTokenFromUrl = searchParam.get("refreshToken");
  const redirectPathname = searchParam.get("redirect");
  const router = useRouter();

  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPathname || "/");
        },
      });
    } else {
      router.push("/");
    }
  }, [router, refreshTokenFromUrl, redirectPathname]);
  return <div>RefreshToken...</div>;
};

const RefreshTokenPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RefreshToken />
    </Suspense>
  );
};

export default RefreshTokenPage;
