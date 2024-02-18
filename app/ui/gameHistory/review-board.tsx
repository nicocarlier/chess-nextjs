// 'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './review-board.module.css';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import MoveNav from './moveNavs/move-nav';

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
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // const currentMove = parseInt(searchParams.get('move') || '0');


  // const updateMove = (change: 1 | -1) => {
  //   const params = new URLSearchParams(searchParams);
  //   const prevMoveNum = parseInt(searchParams.get('move') || '0');
  //   const nextMoveNum = prevMoveNum + change;
  //   if (nextMoveNum >= 1 && nextMoveNum <= moveHistory.moves.length) {
  //     params.set('move', nextMoveNum.toString());
  //     replace(`${pathname}?${params.toString()}`)
  //   }
  // };

  return (
    <div className={`${styles.reviewBoardContainer} md:col-span-4`}>

      <div className={styles.moveListContainer}>

        <h2 className={`${styles.heading} ${styles.headingMd}`}>
          Move History
        </h2>

        {/* <div className={styles.changeMoves}>
          <div className={styles.changeMovesInner}>
          <div onClick={() => updateMove(-1)}>
              <ChevronLeftIcon className={styles.moveBackIcon}/>
            </div>
            <div className={styles.divider}/>
            <div onClick={() => updateMove(1)}>
              <ChevronRightIcon className={styles.moveForwardIcon} />
            </div>
          </div>
        </div> */}

        <div className={styles.moveNavContainer}>
          <MoveNav totalMoves={moveHistory.moves.length} isMini={false}/>
        </div>
        <div className={styles.miniMoveNavContainer}>
          <MoveNav totalMoves={moveHistory.moves.length} isMini={true}/>
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