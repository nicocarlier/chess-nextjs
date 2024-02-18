// 'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './review-board.module.css';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import MoveNav from './moveNavs/move-nav';
import MoveNavReplace from './moveNavs/move-nav-replace';

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
          {moveHistory.moves.map(({ moveNumber, white, black }, i) => (
            <div
              key={moveNumber}
              className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
              // ${moveNumber === currentMove ? styles.currentMove : ''}
            >
              <div className={styles.moveInfo}>
                <div>{moveNumber}</div>
                <div>White: {white}</div>
                <div>Black: {black}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}