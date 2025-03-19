"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

function useCustomRouter() {
  const router = useRouter();

  const navigateTo = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return { navigateTo };
}

export default useCustomRouter;
