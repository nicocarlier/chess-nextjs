import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './review-board.module.css';

type Move = {
  moveNumber: number;
  white: string;
  black: string;
};

type MoveHistory = {
  moves: Move[];
};

export default async function ReviewBoard({
  moveHistory
}: {
  moveHistory: MoveHistory;
}) {

  const currentMove = moveHistory.moves.length;

  return (
    <div className={`${styles.reviewBoardContainer} md:col-span-4`}>

      <div className={styles.moveListContainer}>

        <h2 className={`${styles.heading} ${styles.headingMd}`}>
          Move History
        </h2>

        <div className={styles.changeMoves}>
          <div className={styles.changeMovesInner}>
            <ChevronLeftIcon className={styles.moveBackIcon}/>
            <div className={styles.divider}/>
            <ChevronRightIcon className={styles.moveForwardIcon} />
          </div>
        </div>

        <div className={styles.movesList}>
          {moveHistory.moves.map(({ moveNumber, white, black }, i) => (
            <div
              key={moveNumber}
              className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}
              ${moveNumber === currentMove ? styles.currentMove : ''}`}
            >
              <div className={styles.moveInfo}>
                <div>Move: {moveNumber}</div>
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