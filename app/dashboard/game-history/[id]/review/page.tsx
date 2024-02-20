import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchGameById, getUser, getUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import InactiveChessBoard from '@/app/ui/InactiveChessBoard';
import styles from '@/app/ui/gameHistory/GameHistoryReview.module.css';
import ReviewBoard from '@/app/ui/gameHistory/review-board';
import { auth } from '@/auth';
import MoveNav from '@/app/ui/gameHistory/moveNavs/move-nav';
import ReplayBoard from '@/app/ui/gameHistory/ReplayBoard/ReplayBoard';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const game = await fetchGameById(id);
    if (!game) {
        return notFound(); 
    }
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error('You must be signed in to perform this action');
    }
    const user = await getUser(session.user.email);
    if (!user) {
      throw new Error('User not found');
    }

    const opponentId = game.white_player_id === user.id ? game.black_player_id : game.white_player_id;
    const opponent = await getUserById(opponentId);
    const moveHistory = JSON.parse(game.move_history)

    
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Game History', href: '/dashboard/game-history' },
                {
                    label: `Review Game vs ${opponent.name}`,
                    href: `/dashboard/game-history/${id}/review`,
                    active: true,
                },
                ]}
            />
            {/* <MoveNav totalMoves={moveHistory.moves.length}/> */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
                <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                    {/* <InactiveChessBoard position={game.fen.split(' ')[0]}/> */}
                    <ReplayBoard moveHistory={moveHistory}/>
                </div>
                <div className={`w-full lg:col-span-3 ${styles.sidePanel}`}>
                    <ReviewBoard moveHistory={moveHistory}/>
                </div>
            </div>
        </main>
    );
}
