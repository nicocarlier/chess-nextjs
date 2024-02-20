import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import CreateGame from '@/app/ui/dashboard/create-game';
import InviteFriends from '@/app/ui/dashboard/invite-friends';
import { fetchCurrentUser } from '@/app/lib/data';
 
export default async function Page() {

  const user = await fetchCurrentUser();

  return (
    <main>
      <h1 className={`${lusitana.className} text-center mb-4 text-xl md:text-4xl`}>
        {`Welcome, ${user.name}`}
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={ <RevenueChartSkeleton/> }>
          <CreateGame/>
        </Suspense>
        <Suspense fallback = { <LatestInvoicesSkeleton/>}>
          <InviteFriends/>
        </Suspense>
      </div>
    </main>
  );
}