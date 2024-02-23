import { MoveHistory } from '@/app/lib/definitions';
import InactiveChessBoard from '../../inactiveBoard/InactiveChessBoard';
import styles from './ReplayBoard.module.css';
import { GAME_START_FEN } from '@/app/lib/chessUtils';

export default function ReplayBoard({
  moveHistory,
  currentMove,
}: {
  moveHistory: MoveHistory;
  currentMove: [number, "white" | "black"];
}) {

  const currentMoveFen = () => {
    const [moveNumber, moveColor] = currentMove;
    if (moveNumber === 0){
      return GAME_START_FEN.split(' ')[0];
    } else {
      const { fenWhite, fenBlack } = moveHistory.moves[moveNumber - 1];
      const whitePositionFen = fenWhite.split(' ')[0];
      const blackPositionFen = fenBlack.split(' ')[0];
      return moveColor === "white" ? whitePositionFen : blackPositionFen
    }

  }

  return (
    <div className={`${styles.replayGameBoard}`}>
        {
            <InactiveChessBoard position={currentMoveFen()}/>
        }
    </div>
  );
}