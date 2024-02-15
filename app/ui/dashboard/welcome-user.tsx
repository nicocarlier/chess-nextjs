import { lusitana } from '@/app/ui/fonts';
import { getUser } from "@/app/lib/data";
import { auth } from "@/auth";

export async function WelcomeUser() {

  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be signed in to perform this action');
  }

  const user = await getUser(session.user.email);
  if (!user) {
    throw new Error('User not found');
  }

  return (
    <h1 className={`${lusitana.className} text-center mb-4 text-xl md:text-4xl`}>
      {`Welcome, ${user.name}`}
    </h1>
  );
}
