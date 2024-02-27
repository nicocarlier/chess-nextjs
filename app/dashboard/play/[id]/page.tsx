import { fetchBotById, fetchCurrentUser, fetchGameById, getUser, getUserById, fetchUserGameInfo, fetchOpponentGameInfo } from '@/app/lib/data';
import { Game } from '@/app/lib/definitions';
import GameWrapper from '@/app/ui/play/GameWrapper';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const game: Game | null = await fetchGameById(id);
    if (!game) {
        return notFound();
    }

    const userInfo = await fetchUserGameInfo(game)
    const userId = userInfo.user.id
    const opponentInfo = await fetchOpponentGameInfo(game, userId)

    return (
        <main>
            <GameWrapper 
                game={game} 
                userInfo={userInfo}
                opponentInfo={opponentInfo}
            />
        </main>
    );
}
