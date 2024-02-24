import { cache } from "react";

import { notFound } from "next/navigation";

import { TRPCError } from "@trpc/server";

import { router } from "./router";
import { createCallerFactory, createContext } from "./trpc";

const createCaller = createCallerFactory(router);
const createServerContext = cache(() => createContext({ source: "server" }));

export const server = createCaller(createServerContext);

export const handleNotFound = (error: unknown) => {
  if (error instanceof TRPCError && error.code === "NOT_FOUND") notFound();
  throw error;
};
