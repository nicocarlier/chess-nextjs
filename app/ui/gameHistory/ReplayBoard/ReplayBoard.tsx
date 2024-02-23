import { MoveHistory } from '@/app/lib/definitions';
import InactiveChessBoard from '@/app/ui/inactiveBoard/InactiveChessBoard';
import styles from './ReplayBoard.module.css';
import { GAME_START_FEN } from '@/app/lib/chessUtils';

export default function ReplayBoard({
  moveHistory,
  currentMove,
  userColor="white"
}: {
  moveHistory: MoveHistory;
  currentMove: [number, "white" | "black"];
  userColor: "white" | "black"
}) {

  const currentMoveFen = () => {
    const [moveNumber, moveColor] = currentMove;
    if (moveNumber === 0){
      return GAME_START_FEN.split(' ')[0];
    } else {
      const { fenWhite, fenBlack } = moveHistory.moves[moveNumber - 1];
      if (!!fenBlack && moveColor === "black"){
        return fenBlack;
      } else if (moveColor === "white"){
        return fenWhite;
      }
    }
  }

  const currentFen = currentMoveFen();

  return (
    <div className={`${styles.replayGameBoard}`}>
        {
            currentFen && <InactiveChessBoard position={currentFen} userColor={userColor}/>
        }
    </div>
  );
}