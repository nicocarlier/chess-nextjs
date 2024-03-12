import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import PlayAgainstBot from '@/app/ui/playDashboard/PlayAgainstBot';
import InviteFriends from '@/app/ui/playDashboard/invite-friends';
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
          <PlayAgainstBot/>
        </Suspense>
        <Suspense fallback = { <LatestInvoicesSkeleton/>}>
          <InviteFriends/>
        </Suspense>
      </div>
    </main>
  );
}