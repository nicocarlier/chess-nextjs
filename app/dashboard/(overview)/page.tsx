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
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback= { <CardSkeleton/>}>
          <CardWrapper />
        </Suspense>
      </div> */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={ <RevenueChartSkeleton/> }>
          <CreateGame/>
        </Suspense>
        <Suspense fallback = { <LatestInvoicesSkeleton/>}>
          <InviteFriends/>
          {/* <LatestInvoices/> */}
          {/* <InactiveChessBoard 
          style={{width: 100, height: 100}}
          position={GAME_START_FEN.split(' ')[0]}/> */}
        </Suspense>
        {/* <Suspense fallback={ <RevenueChartSkeleton/> }>
          <CreateGame/>
        </Suspense> */}
      </div>
    </main>
  );
}