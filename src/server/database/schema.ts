import type { AdapterAccount } from "next-auth/adapters";

import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp as pgTimestamp,
  primaryKey,
  text,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { environment } from "@/environment.mjs";

import { generateId } from "@/utilities/id";

const foreignKey = (name: string) =>
  varchar(name, { length: environment.NEXT_PUBLIC_ID_LENGTH });

const id = varchar("id", { length: environment.NEXT_PUBLIC_ID_LENGTH })
  .primaryKey()
  .$defaultFn(generateId);

const timestamp = <Name extends string>(name: Name) =>
  pgTimestamp(name, { mode: "date", withTimezone: true });

const timestamps = {
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
};

const table = pgTableCreator(
  (name) => `${environment.DATABASE_TABLE_PREFIX}${name}`,
);

export const accounts = table(
  "accounts",
  {
    id,
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    idToken: text("id_token"),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 191,
    }).notNull(),
    refreshToken: text("refresh_token"),
    scope: text("scope"),
    sessionState: text("session_state"),
    tokenType: varchar("token_type", { length: 191 }),
    type: varchar("type", { length: 191 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
    ...timestamps,
  },
  (account) => ({
    providerUnique: unique().on(account.provider, account.providerAccountId),
    userIdIndex: index().on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = table(
  "sessions",
  {
    expires: timestamp("expires").notNull(),
    sessionToken: text("session_token").notNull().primaryKey(),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
  },
  (session) => ({
    userIdIndex: index().on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const users = table("users", {
  id,
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  name: varchar("name", { length: 191 }),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const verificationTokens = table(
  "verification_tokens",
  {
    expires: timestamp("expires").notNull(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
  },
  (verificationToken) => ({
    compoundKey: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);
