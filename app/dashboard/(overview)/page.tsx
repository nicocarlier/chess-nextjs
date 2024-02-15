import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import CreateGame from '@/app/ui/dashboard/create-game';
import InviteFriends from '@/app/ui/dashboard/invite-friends';
import InactiveChessBoard from '@/app/ui/InactiveChessBoard';
import { GAME_START_FEN } from '@/app/lib/chessUtils';
 
export default async function Page() {


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback= { <CardSkeleton/>}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={ <RevenueChartSkeleton/> }>
          <CreateGame/>
        </Suspense>
        <Suspense fallback = { <LatestInvoicesSkeleton/>}>
          <InviteFriends/>
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