import { moveTableTemp } from '@/app/lib/definitions';
import styles from './move-table.module.css'

export default async function MoveTable({
  movesTable,
  currHalfMove,
  moveUpdater,
}: {
  movesTable: moveTableTemp;
  currHalfMove: number
  moveUpdater: Function
}) {

  return (
    <table className={styles.table}>
        <thead className={styles.tableHead}>
            <tr>
                <th scope="col" className={`${styles.tableHeadCell}`}>Move #</th>
                <th scope="col" className={`${styles.tableHeadCell}`}>White</th>
                <th scope="col" className={`${styles.tableHeadCell}`}>Black</th>
            </tr>
        </thead>
        <tbody className={styles.tableBody}>
            {movesTable.map((entry, index) => {
                if (!entry) {
                    // Render a row for skipped indexes
                    return (
                        <tr key={index} className={styles.tableRow}>
                            <td className={`${styles.tableCell}`}>...</td>
                            <td className={`${styles.tableCell}`}>...</td>
                            <td className={`${styles.tableCell}`}>...</td>
                        </tr>
                    );
                }

                const { white, black, moveNumber } = entry;
                const whiteIsCurrent = currHalfMove === white.halfMove;
                const blackIsCurrent = black ? currHalfMove === black.halfMove : false;

                return (
                    <tr key={index} className={styles.tableRow}>
                        <td className={`${styles.tableCell}`}>
                            {moveNumber || '...'}
                        </td>
                        <MoveTile
                            move={white}
                            isCurrent={whiteIsCurrent}
                            moveUpdater={moveUpdater}
                        />
                        {black ? (
                            <MoveTile
                                move={black}
                                isCurrent={blackIsCurrent}
                                moveUpdater={moveUpdater}
                            />
                        ) : (
                            <td className={`${styles.tableCell}`}>...</td>
                        )}
                    </tr>
                );
            })}
        </tbody>
    </table>
  );
}
function MoveTile({
  move,
  isCurrent,
  moveUpdater
}: {
  move: { move: string; fen: string; halfMove: number; } | null;
  isCurrent: boolean;
  moveUpdater: Function;
}) {
  if (!move) return null;
  return (
      <td 
          className={`${styles.tableCell} ${styles.detailsGroup} ${isCurrent ? styles.currentMove : ''}`}
          onClick={() => moveUpdater(move.halfMove)}
      >
          {move.move}
      </td>
  );
}