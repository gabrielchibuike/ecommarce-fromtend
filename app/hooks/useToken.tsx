"use client";

import { useSelector } from "react-redux";

export function useToken() {
  const fetchTokenpayload = useSelector((state: any) => state.getTokenResult);

  return fetchTokenpayload;
}

// export default useToken;
