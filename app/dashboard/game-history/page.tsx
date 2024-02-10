
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/gameHistory/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { fetchInvoicesPages } from '@/app/lib/data';
// import { getSessionUser } from '@/app/lib/actions';
// import { getSession } from 'next-auth/react';

import { useSession, signIn, signOut } from "next-auth/react"
import { auth } from '@/auth';

// export default function CamperVanPage() {
//   const { data: session, status } = useSession()
//   const userEmail = session?.user?.email

//   if (status === "loading") {
//     return <p>Hang on there...</p>
//   }

//   if (status === "authenticated") {
//     return (
//       <>
//         <p>Signed in as {userEmail}</p>
//         <button onClick={() => signOut()}>Sign out</button>
//         <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
//       </>
//     )
//   }

//   return (
//     <>
//       <p>Not signed in.</p>
//       <button onClick={() => signIn("github")}>Sign in</button>
//     </>
//   )
// }

export default async function Page({
  searchParams,
} : {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const session = await auth()
  let user = null;
  if (session?.user) {
    user = session.user;
    console.log("session", session)
    console.log("user", user)
  }
    
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      {user ? <p>Signed in as {user.name}</p> : null}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Game History</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}