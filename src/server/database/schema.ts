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
} from "drizzle-orm/pg-core";

import { environment } from "@/environment.mjs";

import { generateId } from "@/utilities/id";

const foreignKey = (name: string) => text(name);

const id = text("id").primaryKey().$default(generateId);

const timestamp = <Name extends string>(name: Name) =>
  pgTimestamp(name, { mode: "date", withTimezone: true });

const timestamps = {
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
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
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    scope: text("scope"),
    sessionState: text("session_state"),
    tokenType: text("token_type"),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
    ...timestamps,
  },
  (account) => ({
    accountsProviderUnique: unique().on(
      account.provider,
      account.providerAccountId,
    ),
    accountsUserIdIndex: index().on(account.userId),
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
    sessionsUserIdIndex: index().on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const users = table("users", {
  id,
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  name: text("name"),
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
    verificationTokenPrimaryKey: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);
