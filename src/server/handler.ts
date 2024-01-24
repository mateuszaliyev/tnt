import "server-only";

import type { NextRequest } from "next/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { router } from "./router";
import { createContext } from "./trpc";

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    createContext: () => createContext({ source: "client" }),
    endpoint: "/api/trpc",
    onError:
      process.env.NODE_ENV === "development"
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
