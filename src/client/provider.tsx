import { useState, type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import transformer from "superjson";

import { environment } from "@/environment.mjs";

import { api } from ".";

export type TrpcProviderProps = {
  children: ReactNode;
};

export const TrpcProvider = ({ children }: TrpcProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (options) =>
            process.env.NODE_ENV === "development" ||
            (options.direction === "down" && options.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${environment.NEXT_PUBLIC_BASE_URL}/api/trpc`,
        }),
      ],
      transformer,
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
