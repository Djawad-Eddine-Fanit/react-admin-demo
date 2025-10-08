"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils"; // clsx helper

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = () => (
  <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-50 flex flex-col p-4 gap-2 w-96 max-w-full" />
);

// Function to trigger toast
export const toast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const id = Math.random().toString(36).substring(2, 9);
  document.dispatchEvent(
    new CustomEvent("show-toast", { detail: { id, title, description } }),
  );
};

export const ToastContainer = () => {
  const [toasts, setToasts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const handler = (event: any) => {
      setToasts((prev) => [...prev, event.detail]);
    };
    document.addEventListener("show-toast", handler);
    return () => document.removeEventListener("show-toast", handler);
  }, []);

  return (
    <ToastProvider>
      {toasts.map((t) => (
        <ToastPrimitives.Root
          key={t.id}
          duration={2000}
          className={cn(
            "relative bg-white border rounded-md shadow-md p-4 mb-2 w-full",
            "dark:bg-gray-800 dark:border-gray-700 dark:text-white",
          )}
        >
          <ToastPrimitives.Title className="font-bold">
            {t.title}
          </ToastPrimitives.Title>
          {t.description && (
            <ToastPrimitives.Description>
              {t.description}
            </ToastPrimitives.Description>
          )}
          <ToastPrimitives.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white">
            ✕
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};
