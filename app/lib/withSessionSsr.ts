import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// This is the secret used in your NextAuth configuration
const secret = process.env.NEXTAUTH_SECRET;

export async function withSessionSsr(request: NextRequest) {
  // Use NextAuth.js's JWT getToken method to get the session
  if (typeof secret === 'undefined') {
    throw new Error('NEXTAUTH_SECRET is not set. Please define it in your environment variables.');
  }

  const session = await getToken({ req: request, secret } as any);

  if (!session) {
    // Handle the case where there is no session.
    // You could throw an error or return a specific object to indicate unauthorized access.
    throw new Error("Session not found.");
  }

  // Return the session if found
  return session;
}
