import { MoveHistory } from '@/app/lib/definitions';
import InactiveChessBoard from '@/app/ui/inactiveBoard/InactiveChessBoard';
import styles from './ReplayBoard.module.css';
import { GAME_START_FEN } from '@/app/lib/chessUtils';
import { getFullMoveAndColor } from '@/app/lib/utils';

export default function ReplayBoard({
  moveHistory,
  currHalfMove,
  userColor="white"
}: {
  moveHistory: MoveHistory;
  currHalfMove: number;
  userColor: "white" | "black"
}) {

  const [currMove, currColor] = getFullMoveAndColor(currHalfMove);

  const currentMoveFen = () => {
    if (currMove === 0){
      return GAME_START_FEN.split(' ')[0];
    } else {
      const { fenWhite, fenBlack } = moveHistory.moves[currMove - 1];
      if (!!fenBlack && currColor === "black"){
        return fenBlack;
      } else {
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