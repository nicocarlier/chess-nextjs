import { fetchCurrentUser, fetchGameById, getUser, getUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const game = await fetchGameById(id);
    if (!game) {
        return notFound(); 
    }

    console.log("game", game)

    const user = await fetchCurrentUser();

    const opponentId = user.id === game.white_player_id ? game.black_player_id : game.white_player_id
    const gameStatus = game.status;
    const startedAt = game.created_at.toISOString();

    
    return (
        <main>
            <h1>GAME GOES HERE</h1>
            <h2>USER ID: {user.id}</h2>
            <h2>OPPONENT ID: {opponentId}</h2>
            <h2>GAME STATUS: {gameStatus}</h2>
            <h2>GAME STARTED AT: {startedAt}</h2>
        </main>
    );
}
