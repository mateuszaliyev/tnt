import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { environment } from "@/environment.mjs";

import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

export const sql = neon(environment.DATABASE_URL);

export const database = drizzle(sql, { schema });
