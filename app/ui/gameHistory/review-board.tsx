'use client';

import styles from './review-board.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MoveNav from './moveNavs/move-nav';
import MoveNavReplace from './moveNavs/move-nav-replace';
import { generateMoveHistoryTablePagination } from '@/app/lib/utils';

type Move = {
  moveNumber: number;
  white: string;
  black: string;
};

type MoveHistory = {
  moves: Move[];
};

export default function ReviewBoard({
  moveHistory
}: {
  moveHistory: MoveHistory;
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentMove = searchParams.get('move');

  const directMoveUpdate = (newMove: number, suffix: 'a' | 'b') => {
    const params = new URLSearchParams(searchParams);
    params.set('move', `${newMove}${suffix}`);
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={`${styles.reviewBoardContainer} md:col-span-4`}>

      <div className={styles.moveListContainer}>

        <h2 className={`${styles.heading} ${styles.headingMd}`}>
          Move History
        </h2>

        <div className={styles.moveNavContainer}>
          <MoveNavReplace totalMoves={moveHistory.moves.length} isMini={false}/>
          {/* <MoveNav totalMoves={moveHistory.moves.length} isMini={false}/> */}
        </div>
        <div className={styles.miniMoveNavContainer}>
          <MoveNavReplace totalMoves={moveHistory.moves.length} isMini={true}/>
          {/* <MoveNav totalMoves={moveHistory.moves.length} isMini={true}/> */}
        </div>

        <div className={styles.movesList}>

          <MoveHistoryTable moveHistory={moveHistory} currentMove={currentMove} directMoveUpdate={directMoveUpdate}/>

        </div>
      </div>
    </div>
  );
}

function MoveHistoryTable({ 
  moveHistory,
  currentMove,
  directMoveUpdate
}: { 
    moveHistory: MoveHistory;
    currentMove: string | null;
    directMoveUpdate: Function;
  }) {

  const currNumMatch = currentMove ? currentMove.match(/\d+/) : null;
  const currNum = currNumMatch ? parseInt(currNumMatch[0]) : null;
  const currColor = currentMove ? currentMove.charAt(currentMove.length - 1) : null;
  const presentedMoves = generateMoveHistoryTablePagination(currNum || moveHistory.moves.length, moveHistory.moves.length);

  return (
    presentedMoves.map((move, i) => {

      if (move === -1){
        return (
          <div key={i} className={`${styles.moveItem} ${styles.moveGap} ${styles.topBorder}`}>
            ...
          </div>
        )
      } else {

        const { moveNumber, white, black } = moveHistory.moves[move - 1];
        const isCurrentWhite = currNum === moveNumber && currColor === 'a';
        const isCurrentBlack = currNum === moveNumber && currColor === 'b';

        return (
          <div
            key={i}
            className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
          >
            <div className={styles.moveInfo}>
              <div>{moveNumber}</div>


              <div className={styles.moveWhiteBlackContainer}>

                <div className={`${styles.whiteMove} 
                  ${isCurrentWhite ? styles.currentMove : ''}`}
                  onClick={()=>directMoveUpdate(moveNumber,'a')}>
                  White: {white}
                </div>
                {
                  black && 
                  <div className={`${styles.blackMove} 
                    ${isCurrentBlack ? styles.currentMove : ''}`}
                    onClick={()=>directMoveUpdate(moveNumber,'b')}>
                    Black: {black}
                  </div>
                }

              </div>
            </div>
          </div>
        )
      }

    })
    
  )

}