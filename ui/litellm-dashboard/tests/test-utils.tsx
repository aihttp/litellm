import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WorkerProvider } from "@/contexts/WorkerContext";

// Create a client for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkerProvider>{children}</WorkerProvider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
