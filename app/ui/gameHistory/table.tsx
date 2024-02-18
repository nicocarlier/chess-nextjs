import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredGames, fetchGameById } from '@/app/lib/data';
import InactiveChessBoard from '../InactiveChessBoard';
import GameStatus from './status';
import { ReviewGame } from './buttons';
import styles from './table.module.css'
import Link from 'next/link';
import { ForwardIcon } from '@heroicons/react/24/outline';
import { Game, GamesTable } from '@/app/lib/definitions';


export default async function GamesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const games = await fetchFilteredGames(query, currentPage);

  function addMoveParams(game: GamesTable) {
    const numMoves = JSON.parse(game.moves).moves.length;
    return `${numMoves}b`
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.inlineBlock}>
        <div className={styles.roundedBox}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
            <tr>
              <th scope="col" className={`${styles.tableHeadCell} ${styles.gameDetails}`}>Game Details</th>
              <th scope="col" className={`${styles.tableHeadCell} ${styles.tableHeadCellFirst} ${styles.detailsGroup}`}>Opponent</th>
              <th scope="col" className={`${styles.tableHeadCell} ${styles.detailsGroup}`}>Date</th>
              <th scope="col" className={styles.tableHeadCell}>Result</th>
              <th scope="col" className={`${styles.tableHeadCell} ${styles.detailsGroup}`}>Duration</th>
              <th scope="col" className={`${styles.tableHeadCell} ${styles.endPosColumn}`}>End Position</th>
              <th scope="col" className={`${styles.tableHeadCell} ${styles.tableCellLast}`}>
                <span className="sr-only">Details</span>
              </th>
            </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {games?.map((game) => (
              <tr key={game.id} className={styles.tableRow}>
                <td className={`${styles.tableCell} ${styles.tableCellFirst} ${styles.gameDetails}`}>
                  <div>{game.opponent_name}</div>
                  <div>{formatDateToLocal(game.created_at.toISOString())}</div>
                  <div>{`${Math.round(game.duration)} minutes`}</div>
                </td>
                <td className={`${styles.tableCell} ${styles.detailsGroup}`}>
                  {game.opponent_name}
                </td>
                <td className={`${styles.tableCell} ${styles.detailsGroup}`}>
                  {formatDateToLocal(game.created_at.toISOString())}
                </td>
                <td className={styles.tableCell}>
                  <GameStatus result={game.result} />
                </td>
                <td className={`${styles.tableCell} ${styles.detailsGroup}`}>
                  {`${Math.round(game.duration)} minutes`}
                </td>
                <td className={`${styles.tableCell} ${styles.endPosColumn}`}>
                  {<InactiveChessBoard position={game.fen.split(' ')[0]}/>}
                </td>
                <td className={`${styles.tableCell}`}>
                  <div className={`${styles.reviewGame}`}>
                    <Link href={`/dashboard/game-history/${game.id}/review?move=${addMoveParams(game)}`} className={styles.reviewLink}>
                      <span className={styles.reviewLinkText}>Review Game</span>
                      <ForwardIcon className={styles.forwardIcon} />
                    </Link>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}