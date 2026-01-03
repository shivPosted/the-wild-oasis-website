import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "", //neglecting typescript error for now
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    //NOTE: should return a boolean return true--->request continues, false ---> request declined redirected to api/auth/login
    authorized({ request, auth }) {
      const isLoggedIn = Boolean(auth);
      const isProtectedRoute = request.nextUrl.pathname.startsWith("/account");

      if (isProtectedRoute) {
        //NOTE: for protected route return true or false based on if user exists or not;
        return isLoggedIn;
      }

      //for all unprotected routes;
      return true;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
