// components/Toast.tsx
"use client";

import * as Toast from "@radix-ui/react-toast";
import { CgClose } from "react-icons/cg";

interface ToastProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  description: string;
}

export function ToastComponent({ isOpen, setIsOpen, description }: ToastProps) {
  return (
    <>
      <Toast.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className="rounded-md bg-black text-white w-72 border  border-yellow-600 px-3 py-3 shadow-md"
      >
        {/* <Toast.Title className="font-bold">{title}</Toast.Title> */}
        <div className="flex justify-between">
          <Toast.Description className="text-sm">
            {description}
          </Toast.Description>
          <Toast.Action altText="Close">
            <div
              className="ml-4 text-sm text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <CgClose />
            </div>
          </Toast.Action>
        </div>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-5 right-5 max-lg:left-5 flex flex-col  space-y-2 w-96" />
    </>
  );
}
