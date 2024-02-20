import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchGameById, getUser, getUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import ReplayWrapper from '@/app/ui/gameHistory/ReplayWrapper/ReplayWrapper';

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
            <ReplayWrapper moveHistory={moveHistory}/>
        </main>
    );
}
