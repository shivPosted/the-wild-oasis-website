import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "", //neglecting typescript error for now
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
