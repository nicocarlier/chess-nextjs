import styles from '@/app/ui/inactiveBoard/InactiveChessBoard.module.css';
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { playerColors } from '@/app/lib/definitions';
import { getStaticBoardArray } from '@/app/lib/utils';
import { useMemo } from 'react';

function InactiveChessBoard({ position, userColor }: { position: string, userColor: playerColors }) {

    const BOARD = useMemo(() => getStaticBoardArray(position, userColor), [position, userColor])

    return (
        <div className={styles.chessBoard}>
            {BOARD.map((row, reversedR) => (
                <div key={reversedR} className={styles.boardRow}>
                    {row.map(({rank, file, fenChar}, c) => {

                        const r = 7 - reversedR;
                        const sqaureColorClass = (r + c) % 2 === 0 ? styles.brown : styles.white;
                        const squareColor: "brown" | "white" = (r + c) % 2 === 0 ? "brown" : "white";
                        const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;
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
                                {
                                    (userColor === "white" && file === "A") || (userColor === "black" && file === "H") && 
                                    <div className={`${styles.squareLabel} ${styles.squareLabelFile} ${labelColorClass}`} key={`file-${file}-${rank}`}>
                                        {rank}
                                    </div>
                                }
                                {
                                    (userColor === "white" && rank === 1) || (userColor === "black" && rank === 8) &&
                                    <div className={`${styles.squareLabel} ${styles.squareLabelRank} ${labelColorClass}`} key={`rank-${file}-${rank}`}>
                                        {file.toLowerCase()}
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default InactiveChessBoard;