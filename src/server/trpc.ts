import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

import { getSession } from "@/server/authentication/session";
import { database } from "@/server/database";

export type CreateContextOptions = {
  source: "client" | "server";
};

export const createContext = async ({ source }: CreateContextOptions) => ({
  database,
  session: await getSession(),
  source,
});

export const {
  createCallerFactory,
  middleware,
  procedure: publicProcedure,
  router: createRouter,
} = initTRPC.context<typeof createContext>().create({
  errorFormatter: ({ error, shape }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof z.ZodError ? error.cause.flatten() : null,
    },
  }),
  transformer: superjson,
});

const authenticationMiddleware = middleware(({ ctx: { session }, next }) => {
  if (!session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      session: {
        ...session,
        user: session.user,
      },
    },
  });
});

export const procedure = publicProcedure.use(authenticationMiddleware);
