"use client";
import React from "react";
import { store } from "../GlobalState/store";
import { Provider } from "react-redux";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}

export default Providers;
