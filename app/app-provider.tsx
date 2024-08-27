"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CachePolicies, Provider as HTTPProvider } from "use-http";
import getCookie from "./utils/getCookie";

interface ContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const token = getCookie("session");
  console.log("token",token)
  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <HTTPProvider
        url="http://example.com"
        options={{
          cachePolicy: CachePolicies.NO_CACHE,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
      >
        {children}
      </HTTPProvider>
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
