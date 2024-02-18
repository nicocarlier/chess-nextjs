import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchGameById, getUser, getUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import InactiveChessBoard from '@/app/ui/InactiveChessBoard';
import styles from '@/app/ui/gameHistory/GameHistoryReview.module.css';
import ReviewBoard from '@/app/ui/gameHistory/review-board';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { id: string } }) {
    
    // const [currentFen]
    const id = params.id;

    // console.log("game id ", id)

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

    // console.log("user : ", user);
    const opponentId = game.white_player_id === user.id ? game.black_player_id : game.white_player_id;

    console.log("opponentId", opponentId)

    const opponent = await getUserById(opponentId);

    const moveHistory = JSON.parse(game.move_history)

    console.log("game fen ", game.move_history);
    
    return (
        <main>
            {/* <h1>{`Review Game vs: ${opponent.name}`}</h1> */}
            {/* <h1>{`Review game fen: ${game.fen}`}</h1> */}
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
            <div className={styles.reviewContainer}>
                <div className={styles.boardContainer}>
                    <InactiveChessBoard position={game.fen.split(' ')[0]}/>
                </div>
                <div className={styles.sidePanel}>
                    <ReviewBoard moveHistory={moveHistory}/>
                </div>

            </div>
            {/* <Form invoice={invoice} customers={customers} /> */}
        </main>
    );
}