'use client';

import { MoveHistory } from '@/app/lib/definitions';
import InactiveChessBoard from '../../InactiveChessBoard';
import styles from './ReplayBoard.module.css';
import { useSearchParams } from 'next/navigation';
import { GAME_START_FEN } from '@/app/lib/chessUtils';

export default function ReplayBoard({moveHistory}: {moveHistory: MoveHistory}) {

  const searchParams = useSearchParams();
  const currentMove = searchParams.get('move');

  const currentMoveFen = (currMove: string | null) => {
    const currNumMatch = currentMove ? currentMove.match(/\d+/) : null;
    if (currNumMatch && currNumMatch[0] === "0"){
      return GAME_START_FEN.split(' ')[0];
    } else if (currMove && currNumMatch){
        const currNum = parseInt(currNumMatch[0]);
        const currColor = currMove.charAt(currMove.length - 1);
        const { fenWhite, fenBlack } = moveHistory.moves[currNum - 1];
        if (currColor === "a"){
            return fenWhite.split(' ')[0];
        } else {
            return fenBlack.split(' ')[0];
        }
    }
  }

  const currentFen = currentMoveFen(currentMove)

  return (
    <div className={`${styles.replayGameBoard}`}>
        {
            currentFen && 
            <InactiveChessBoard position={currentFen}/>
        }
    </div>
  );
}