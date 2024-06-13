import { authorise } from "../../../lib/actions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Username or Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                return authorise(credentials);
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        console.log("JWT Callback - Token:", token);
        return token;
      },
      async session({ session, token }) {
        if (token.user) {
          session.user = token.user;
        }
        console.log("Session Callback - Session:", session);
        return session;
      },
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
