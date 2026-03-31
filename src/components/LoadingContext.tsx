"use client";
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{ loaded: boolean; setLoaded: (v: boolean) => void }>({
  loaded: false,
  setLoaded: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoadingContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
