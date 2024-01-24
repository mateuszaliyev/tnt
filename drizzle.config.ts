import type { Config } from "drizzle-kit";

import { environment } from "@/environment.mjs";

export default {
  dbCredentials: {
    connectionString: environment.DATABASE_URL,
  },
  driver: "pg",
  schema: "./src/server/database/schema.ts",
  tablesFilter: environment.DATABASE_TABLE_PREFIX
    ? `${environment.DATABASE_TABLE_PREFIX}*`
    : undefined,
} satisfies Config;
