import styles from './ActiveChessBoard.module.css'
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'

function ActiveChessBoard({ position }: { position: string }) {
    const BOARD = Array(8).fill(null).map(() => Array(8).fill(null));

    // if position already sanitised, split will still select position
    const startingRows = position.split(' ')[0].split('/')

    startingRows.forEach((fenRow, r) => {
        const expandedRow = fenRow.replace(/\d/g, num => '-'.repeat(parseInt(num)));
        expandedRow.split('').forEach((fenChar, c) => {
            BOARD[r][c] = fenChar !== '-' ? fenChar : null;
        });
    });

    function squareLabel(file: string, rank: number, squareColor: 'brown' | 'white') {
        const labels = [];
        const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;
        if (file === "A") {
            labels.push(
                <div className={`${styles.squareLabel} ${styles.squareLabelFile} ${labelColorClass}`} key={`file-${file}-${rank}`}>
                    {rank}
                </div>
            );
        }
        if (rank === 1) {
            labels.push(
                <div className={`${styles.squareLabel} ${styles.squareLabelRank} ${labelColorClass}`} key={`rank-${file}-${rank}`}>
                    {file.toLowerCase()}
                </div>
            );
        }
        return labels;
    }

    return (
        <div className={styles.chessBoard}>
            {BOARD.map((row, reversedR) => (
                <div key={reversedR} className={styles.boardRow}>
                    {row.map((fenChar, c) => {
                        const r = 7 - reversedR;
                        const sqaureColorClass = (r + c) % 2 === 0 ? styles.brown : styles.white;
                        const squareColor: "brown" | "white" = (r + c) % 2 === 0 ? "brown" : "white";
                        const rank = r + 1;
                        const charCode = 'A'.charCodeAt(0) + c;
                        const file = String.fromCharCode(charCode);
                        const id = `${file}${rank}`;
                        return (
                            <div className={`${styles.boardSquare} ${sqaureColorClass}`} key={id} id={id}>
                                {
                                    fenChar && PIECE_IMAGES[fenChar as PieceKey] &&
                                    <Image 
                                        alt={PIECE_NAMES[fenChar as PieceKey] ?? 'Chess piece'}
                                        src={PIECE_IMAGES[fenChar as PieceKey]!} // Asserting it's not undefined
                                        className={styles.chessPiece}
                                        width={50}
                                        height={50}
                                        unoptimized={true}
                                    />
                                }
                                {squareLabel(file, rank, squareColor)}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


export default ActiveChessBoard;