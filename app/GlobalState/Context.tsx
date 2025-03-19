"use client";

import { createContext, RefObject, useRef, Context } from "react";

interface ContextProps {
  toggleSideNav: RefObject<HTMLDivElement>;
  toggleAdminFilterModel: RefObject<HTMLDivElement>;
}

export let ContextApi: Context<ContextProps>;

export function AllProvider({ children }: { children: React.ReactNode }) {
  const toggleSideNav = useRef<HTMLDivElement>(null);
  const toggleAdminFilterModel = useRef<HTMLDivElement>(null);

  ContextApi = createContext<ContextProps>({
    toggleSideNav: toggleSideNav,
    toggleAdminFilterModel: toggleAdminFilterModel,
  });

  const contextValue: ContextProps = {
    toggleSideNav,
    toggleAdminFilterModel,
  };
  return (
    <ContextApi.Provider value={contextValue}>{children}</ContextApi.Provider>
  );
}
