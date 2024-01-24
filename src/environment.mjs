import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const urlSchema =
  process.env.NODE_ENV === "development"
    ? z.string().url().default("http://localhost:3000")
    : z.string().url();

const baseClientUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const baseServerUrl = process.env.NEXTAUTH_URL ?? baseClientUrl;

export const environment = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: urlSchema,
    NEXT_PUBLIC_ENVIRONMENT: z
      .enum(["development", "production", "test"])
      .default("development"),
    NEXT_PUBLIC_ID_LENGTH: z.coerce.number().int().max(191).min(7),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DATABASE_TABLE_PREFIX: process.env.DATABASE_TABLE_PREFIX,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_BASE_URL: baseClientUrl,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NODE_ENV,
    NEXT_PUBLIC_ID_LENGTH: process.env.NEXT_PUBLIC_ID_LENGTH,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: baseServerUrl,
  },
  server: {
    DATABASE_TABLE_PREFIX: z
      .string()
      .min(1)
      .or(z.undefined().transform(() => "")),
    DATABASE_URL: z.string().url().startsWith("postgresql://"),
    GITHUB_CLIENT_ID: z
      .string()
      .length(20)
      .regex(/^[0-9a-f]+$/),
    GITHUB_CLIENT_SECRET: z
      .string()
      .length(40)
      .regex(/^[0-9a-f]+$/),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: urlSchema,
  },
});
