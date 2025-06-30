/* eslint-disable react/react-in-jsx-scope */
"use client";

import {
  createContext,
  RefObject,
  useRef,
  Context,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
export interface filterProps {
  main_category: string;
  product_category: string;
  sub_category: string;
  color: string[];
  size: string[];
  price_max: number;
  manufacturer_brand: string;
}

interface ContextProps {
  toggleSideNav: RefObject<HTMLDivElement>;
  toggleAdminFilterModel: RefObject<HTMLDivElement>;
  filters: filterProps;
  setFilters: Dispatch<SetStateAction<filterProps>>;
}

export let ContextApi: Context<ContextProps>;

export function AllProvider({ children }: { children: React.ReactNode }) {
  const toggleSideNav = useRef<HTMLDivElement>(null);
  const toggleAdminFilterModel = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    main_category: "",
    product_category: "",
    sub_category: "",
    color: [] as string[],
    size: [] as string[],
    price_max: 7000,
    manufacturer_brand: "",
  });

  ContextApi = createContext<ContextProps>({
    toggleSideNav: toggleSideNav,
    toggleAdminFilterModel: toggleAdminFilterModel,
    filters: filters,
    setFilters: setFilters,
  });

  const contextValue: ContextProps = {
    toggleSideNav,
    toggleAdminFilterModel,
    filters,
    setFilters,
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <ContextApi.Provider value={contextValue}>{children}</ContextApi.Provider>
    </>
  );
}
