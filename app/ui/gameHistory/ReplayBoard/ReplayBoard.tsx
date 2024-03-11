import { Move, playerColors } from '@/app/lib/definitions';
import InactiveChessBoard from '@/app/ui/inactiveBoard/InactiveChessBoard';
import styles from './ReplayBoard.module.css';
import { GAME_START_FEN } from '@/app/lib/chessUtils';
import { getFullMoveAndColor, getSubMoveFromMoveHistory } from '@/app/lib/utils';

export default function ReplayBoard({
  moveHistory,
  currHalfMove,
  userColor
}: {
  moveHistory: Move[];
  currHalfMove: number;
  userColor: playerColors
}) {

  const [currMove, currColor] = getFullMoveAndColor(currHalfMove);

  console.log("userColor ", userColor)

  // const currentFen = () => {
  //   if (currMove === 0){
  //     return GAME_START_FEN.split(' ')[0];
  //   } else {
  //     const { fenWhite, fenBlack } = moveHistory[currMove - 1];
  //     if (!!fenBlack && currColor === "black"){
  //       return fenBlack;
  //     } else {
  //       return fenWhite;
  //     }
  //   }
  // }

  // const position = currentFen();

  const { fen } = getSubMoveFromMoveHistory(currHalfMove, moveHistory)

  return (
    <div className={`${styles.replayGameBoard}`}>
      {
        fen && <InactiveChessBoard position={fen} userColor={userColor}/>
      }
    </div>
  );
}