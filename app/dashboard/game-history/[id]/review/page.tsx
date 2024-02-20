import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCurrentUser, fetchGameById, getUser, getUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import ReplayWrapper from '@/app/ui/gameHistory/ReplayWrapper/ReplayWrapper';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const game = await fetchGameById(id);
    if (!game) {
        return notFound(); 
    }

    const user = await fetchCurrentUser();
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
