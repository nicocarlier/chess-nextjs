import { getToken } from 'next-auth/jwt';

export async function getUserSession(request: Request) {
  if (!process.env.AUTH_SECRET) {
    throw new Error('AUTH_SECRET environment variable is not set.');
  }
  
  // Ensure you have a SALT value set in your environment variables or define it directly
  const salt = process.env.AUTH_SALT || '76ea1dde308d1bf726167c04bc2a91ca9b2d8ca198cbd6d2d7e4d3152031ac49'

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    salt: salt, // Add the salt value here
  });

  return token; // This contains the user's session information, including their ID if available
}
