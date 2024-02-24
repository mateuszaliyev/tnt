import type { Adapter } from "next-auth/adapters";

import { and, eq } from "drizzle-orm";
import type { PgDatabase } from "drizzle-orm/pg-core";

import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/database/schema";

export const drizzleAdapter = (
  database: InstanceType<typeof PgDatabase>,
): Adapter => ({
  createSession: (session) =>
    database
      .insert(sessions)
      .values(session)
      .returning()
      .then(([session]) => session!),
  createUser: (user) =>
    database
      .insert(users)
      .values(user)
      .returning()
      .then(([user]) => user!),
  createVerificationToken: (verificationToken) =>
    database
      .insert(verificationTokens)
      .values(verificationToken)
      .returning()
      .then(([verificationToken]) => verificationToken!),
  deleteSession: async (sessionToken) => {
    await database
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken));
  },
  deleteUser: async (id) => {
    await database.delete(users).where(eq(users.id, id));
  },
  getSessionAndUser: (sessionToken) =>
    database
      .select({ session: sessions, user: users })
      .from(sessions)
      .where(eq(sessions.sessionToken, sessionToken))
      .innerJoin(users, eq(users.id, sessions.userId))
      .then(([sessionAndUser]) => sessionAndUser ?? null),
  getUser: (id) =>
    database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then(([user]) => user ?? null),
  getUserByAccount: (account) =>
    database
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.providerAccountId, account.providerAccountId),
          eq(accounts.provider, account.provider),
        ),
      )
      .leftJoin(users, eq(accounts.userId, users.id))
      .then(([account]) => account?.users ?? null),
  getUserByEmail: (email) =>
    database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(([user]) => user ?? null),
  linkAccount: async (account) => {
    await database.insert(accounts).values(account);
  },
  unlinkAccount: async (account) => {
    await database
      .delete(accounts)
      .where(
        and(
          eq(accounts.providerAccountId, account.providerAccountId),
          eq(accounts.provider, account.provider),
        ),
      );
  },
  updateSession: (session) =>
    database
      .update(sessions)
      .set(session)
      .where(eq(sessions.sessionToken, session.sessionToken))
      .returning()
      .then(([session]) => session),
  updateUser: (user) =>
    database
      .update(users)
      .set(user)
      .where(eq(users.id, user.id))
      .returning()
      .then(([user]) => user!),
  useVerificationToken: (verificationToken) =>
    database
      .delete(verificationTokens)
      .where(
        and(
          eq(verificationTokens.identifier, verificationToken.identifier),
          eq(verificationTokens.token, verificationToken.token),
        ),
      )
      .returning()
      .then(([verificationToken]) => verificationToken ?? null),
});
