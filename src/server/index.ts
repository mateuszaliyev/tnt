import "server-only";

import { cache } from "react";

import { router } from "./router";
import { createCallerFactory, createContext } from "./trpc";

export const createCaller = createCallerFactory(router);

const createServerContext = cache(() => createContext({ source: "server" }));

export const server = createCaller(createServerContext);
