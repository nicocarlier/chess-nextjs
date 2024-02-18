import { Suspense } from 'react';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import CreateGame from '@/app/ui/dashboard/create-game';
import InviteFriends from '@/app/ui/dashboard/invite-friends';
import { WelcomeUser } from '@/app/ui/dashboard/welcome-user';
 
export default async function Page() {


  return (
    <main>
      <WelcomeUser/>
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