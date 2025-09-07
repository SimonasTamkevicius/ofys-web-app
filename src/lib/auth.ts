import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Check against environment variables
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!adminUsername || !adminPassword || !adminEmail) {
          console.error("Admin credentials not configured in environment variables");
          return null;
        }

        // Verify credentials
        if (credentials.username === adminUsername && credentials.password === adminPassword) {
          return {
            id: "admin",
            name: adminUsername,
            email: adminEmail,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach role to session
      if (token?.role) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        (token as { role?: string }).role = (user as { role?: string }).role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes in seconds
  },
};
