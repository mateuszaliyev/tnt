import "server-only";

import type { AuthOptions, DefaultSession } from "next-auth";
import githubProvider from "next-auth/providers/github";

import { environment } from "@/environment.mjs";

import { database } from "@/server/database";

import { drizzleAdapter } from "./adapter";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export const configuration: AuthOptions = {
  adapter: drizzleAdapter(database),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  providers: [
    githubProvider({
      clientId: environment.GITHUB_CLIENT_ID,
      clientSecret: environment.GITHUB_CLIENT_SECRET,
    }),
  ],
};
