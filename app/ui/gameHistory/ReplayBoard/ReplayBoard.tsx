import { Move, playerColors } from '@/app/lib/definitions';
import InactiveChessBoard from '@/app/ui/inactiveBoard/InactiveChessBoard';
import styles from './ReplayBoard.module.css';
import { getSubMoveFromMoveHistory } from '@/app/lib/utils';

export default function ReplayBoard({
  moveHistory,
  currHalfMove,
  userColor
}: {
  moveHistory: Move[];
  currHalfMove: number;
  userColor: playerColors
}) {

  // console.log("MOVE HISTORY INDEX RE-RENDERED")

  const { fen } = getSubMoveFromMoveHistory(currHalfMove, moveHistory)

  return (
    <div className={`${styles.replayGameBoard}`}>
      {
        fen && <InactiveChessBoard position={fen} userColor={userColor}/>
      }
    </div>
  );
}