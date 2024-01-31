import "server-only";

import type { NextRequest } from "next/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { environment } from "@/environment.mjs";

import { router } from "./router";
import { createContext } from "./trpc";

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    createContext: () => createContext({ source: "client" }),
    endpoint: "/api/trpc",
    onError:
      environment.NEXT_PUBLIC_ENVIRONMENT === "development"
        ? ({ error, path }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
    req: request,
    router,
  });

export { handler as GET, handler as POST };
