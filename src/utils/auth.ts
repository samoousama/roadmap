import "server-only";

import { AuthOptions } from "next-auth";
import prisma from "@/db/prisma";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  session: {
    strategy: "database",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#c026d3", // Hex color code
    logo: "https://dev.nataindata.com/_next/image/?url=%2Fimages%2Flogo.png&w=96&q=75", // Absolute URL to image
    buttonText: "#ffffff", // Hex color code
  },
  events: {
    async createUser(message) {
      if (
        message.user.name &&
        message.user.email &&
        !(message.user as any).firstName
      ) {
        // set "firstName" and "lastName" if available "name"
        const parts = message.user.name.split(" ").filter((s) => Boolean(s));
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ");
        await prisma.user.update({
          where: {
            email: message.user.email,
          },
          data: {
            firstName,
            lastName,
          },
        });
      }
      // create default company for user
      const company = await prisma.company.create({
        data: {
          name: message.user.name ? `${message.user.name}'s company` : "",
        },
      });
      await prisma.user.update({
        where: {
          email: message.user.email!,
        },
        data: {
          companyId: company.id,
        },
      });
    },
  },
};
