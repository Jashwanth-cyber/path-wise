import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,

  // 🔥 Prevention & Proper ID Handling
  callbacks: {
    // Handle sign-in safely (prevents duplicate account issues)
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        try {
          // Check if there's already an account linked to this email
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: "google",
              providerAccountId: account.providerAccountId,
            },
          });

          if (existingAccount) {
            // If user was deleted but account remains, clean it up automatically
            if (!existingAccount.userId) {
              await prisma.account.delete({
                where: { id: existingAccount.id },
              });
            }
          }
        } catch (error) {
          console.error("SignIn cleanup error:", error);
        }
      }
      return true; // Allow sign in
    },

    // Properly pass user.id to session
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});