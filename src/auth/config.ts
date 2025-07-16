// auth/config.ts
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // ✅ use singleton
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const authConfig = {
  // debug: true,
  adapter: PrismaAdapter(prisma), // 👈 REQUIRED FOR EMAIL

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT)!,
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.GMAIL_SERVER_PASSWORD!,
          // pass: process.env.AUTH_RESEND_API_KEY!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
    // AppleProvider (advanced setup for later)
  ],
  pages: {
    signIn: "/auth", // optional, custom sign-in page
  },
};
