import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ToastContainer } from "@/components/ui/toast";
import router from "./routes";
import { queryClient } from "@/lib/queryClient";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

