import NextAuth from "next-auth"

import Credentials from 'next-auth/providers/credentials';
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
// import LinkedInProvider from "@auth/core/providers/linkedin"

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';

import { authConfig } from './auth.config';
import type { NextAuthConfig } from "next-auth"

const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID!
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET!

const GITHUB_CLIENT_ID = process.env.AUTH_GITHUB_ID!
const GITHUB_CLIENT_SECRET = process.env.AUTH_GITHUB_SECRET!


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    // console.log("user =>>>>>>> ", user.rows[0] )
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const config = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        console.log("inside authorization function ")
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {

          console.log("parsedCredentials ", parsedCredentials)


          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          console.log("user: ", user)
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          console.log("passwordsMatch: ",passwordsMatch)

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
    GithubProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)