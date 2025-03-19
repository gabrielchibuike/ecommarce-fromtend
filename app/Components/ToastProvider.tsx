// components/ToastProvider.tsx
"use client";

import { ToastProvider } from "@radix-ui/react-toast";

export default function ToastProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider swipeDirection="right">{children}</ToastProvider>;
}
