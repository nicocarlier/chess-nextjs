import { ChessBoard } from '@/app/lib/chessClasses/chessBoard';
import { fetchBotById, fetchCurrentUser, fetchGameById, getUser, getUserById, fetchUserGameInfo, fetchOpponentGameInfo, fetchOpponentType } from '@/app/lib/data';
import { Game } from '@/app/lib/definitions';
import GameWrapper from '@/app/ui/play-[id]/GameWrapper';
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

    // // start new game object
    // const chessBoard = new ChessBoard(game.fen);

    return (
        <main>
            <GameWrapper 
                // chessBoard={chessBoard}
                game={game} 
                userInfo={userInfo}
                opponentInfo={opponentInfo}
            />
        </main>
    );
}
