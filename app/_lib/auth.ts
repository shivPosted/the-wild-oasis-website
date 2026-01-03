import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

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
    async signIn({ user }) {
      //NOTE: this also needs to return boolean
      try {
        const guest = await getGuest(user.email);

        if (!guest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    //NOTE: injecting the guest id in session by creating the guest if not exist above in signIn callback
    async session({ user, session }) {
      //NOTE: don't use user param here use session one
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id; //NOTE: adding guestId to the user session
      return session;
    },
  },
  pages: {
    signIn: "/login", //NOTE: define the page route to redirect to
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
