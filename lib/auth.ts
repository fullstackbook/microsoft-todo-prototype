import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users } from "./schema";

function passwordToSalt(password: string) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

async function getUserFromDb(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.name, username),
  });
  return user;
}

async function addUserToDb(username: string, saltedPassword: string) {
  const user = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      name: username,
      password: saltedPassword,
    })
    .returning();
  return user.pop();
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user = null;
        const username = credentials.username as string;
        const password = credentials.password as string;

        if (!username || !password) {
          return null;
        }

        user = await getUserFromDb(username);

        if (user) {
          if (!user.password) {
            return null;
          }
          const isAuthenticated = await bcrypt.compare(password, user.password);
          if (isAuthenticated) {
            return user;
          } else {
            return null;
          }
        }

        if (!user) {
          const saltedPassword = passwordToSalt(password);
          user = await addUserToDb(username, saltedPassword);
        }

        if (!user) {
          throw new Error("User was not found and could not be created");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
