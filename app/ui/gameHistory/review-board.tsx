'use client';

import styles from './review-board.module.css';
import { useSearchParams } from 'next/navigation';
import MoveNav from './moveNavs/move-nav';
import MoveNavReplace from './moveNavs/move-nav-replace';
import { generateMoveHistoryTablePagination, generatePagination } from '@/app/lib/utils';

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
  const currentMove = searchParams.get('move');

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

          <MoveHistoryTable moveHistory={moveHistory} currentMove={currentMove}/>

          {/* {moveHistory.moves.map(({ moveNumber, white, black }, i) => {


            const currColor = currentMove?.split('')[1];
            const currNum = currentMove ? parseInt(currentMove?.split('')[0]) : null;

            const isCurrentWhite = currNum === moveNumber && currColor === 'a';
            const isCurrentBlack = currNum === moveNumber && currColor === 'b';

            return (
              <div
                key={i}
                className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
                // ${moveNumber === currentMove ? styles.currentMove : ''}
              >
                <div className={styles.moveInfo}>
                  <div>{moveNumber}</div>
                  <div className={styles.divider}></div>
                  <div className={styles.moveWhiteBlackContainer}>
                    <div className={`${styles.whiteMove} 
                      ${isCurrentWhite ? styles.currentMove : ''}`}>
                      White: {white}
                    </div>
                    <div className={`${styles.blackMove} 
                      ${isCurrentBlack ? styles.currentMove : ''}`}>
                      Black: {black}
                    </div>
                  </div>
                </div>
              </div>
            )})
          } */}

        </div>
      </div>
    </div>
  );
}

function MoveHistoryTable({ 
  moveHistory,
  currentMove
}: { 
    moveHistory: MoveHistory;
    currentMove: string | null;
  }) {

  const currColor = currentMove?.split('')[1];
  const currNum = currentMove ? parseInt(currentMove?.split('')[0]) : null;
  
  const moves = generateMoveHistoryTablePagination(currNum || moveHistory.moves.length, moveHistory.moves.length);
  
  // const presentedMoves = moveHistory.moves.filter(move => moves.includes(move.moveNumber))


  return (
    moves.map((move, i) => {

      if (move === 'gap'){
        return (
          <div
            key={i}
            className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
          >
            <div className={styles.moveInfo}>...</div>
          </div>
        )
      }

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
                ${isCurrentWhite ? styles.currentMove : ''}`}>
                White: {white}
              </div>
              {
                black && 
                <div className={`${styles.blackMove} 
                  ${isCurrentBlack ? styles.currentMove : ''}`}>
                  Black: {black}
                </div>
              }

            </div>
          </div>
        </div>
      )
    })
  )

}