import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isInsideApp = (
        nextUrl.pathname.startsWith('/play') ||
        nextUrl.pathname.startsWith('/game-history') ||
        nextUrl.pathname.startsWith('/account')
      )
      if (isInsideApp) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/play', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;