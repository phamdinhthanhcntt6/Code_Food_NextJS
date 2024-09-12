"use client";

import RefreshToken from "@/components/refresh-token";
import {
  getAccessTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const AppContext = createContext<{
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}>({
  isAuth: false,
  setIsAuth: (value: boolean) => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthState, setIsAuthState] = useState(false);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      setIsAuthState(true);
    }
  }, []);

  const setIsAuth = useCallback((isAuth: boolean) => {
    if (isAuth) {
      setIsAuthState(true);
    } else {
      setIsAuthState(false);
      removeTokenFromLocalStorage();
    }
  }, []);

  return (
    <AppContext.Provider value={{ isAuth: false, setIsAuth }}>
      <QueryClientProvider client={queryClient}>
        <>
          <RefreshToken />
          {children}
        </>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
