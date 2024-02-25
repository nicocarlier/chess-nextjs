import styles from './ActiveChessBoard.module.css'
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { fetchCurrentUser } from '@/app/lib/data';
import ChessPiece from './ChessPiece';
import { useRef } from 'react';
import { initialize } from 'next/dist/server/lib/render-server';

function ActiveChessBoard({ position, userColor="white" }: { position: string, userColor: "black" | "white" }) {


    const finalDragSquareRef = useRef(null);
    const selectedPiece = useRef(null);


    const WHITE_BOARD = Array(8).fill(null).map(() => Array(8).fill(null));
    const startingRows = position.split(' ')[0].split('/')
    startingRows.forEach((fenRow, r) => {
        const expandedRow = fenRow.replace(/\d/g, num => '-'.repeat(parseInt(num)));
        expandedRow.split('').forEach((fenChar, c) => {
            const file = String.fromCharCode("A".charCodeAt(0) + c);
            const rank = 8 - r;
            const val = fenChar !== '-' ? fenChar : null;
            WHITE_BOARD[r][c] = {rank, file, fenChar: val};
        });
    });
    const BLACK_BOARD = WHITE_BOARD.reverse().map(row => row.reverse());

    const BOARD = userColor === "white" ? WHITE_BOARD : BLACK_BOARD;

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

                        const imageSrc = PIECE_IMAGES[fenChar as PieceKey];

                        return (
                            <div className={`${styles.boardSquare} ${sqaureColorClass}`} key={id} id={id}>
                                {
                                    fenChar && imageSrc &&
                                    // <Image 
                                    //     alt={PIECE_NAMES[fenChar as PieceKey] ?? 'Chess piece'}
                                    //     src={imageSrc}
                                    //     className={styles.chessPiece}
                                    //     width={50}
                                    //     height={50}
                                    //     unoptimized={true}
                                    //     placeholder="blur"
                                    // />

                                    <ChessPiece 
                                        key={id}
                                        fenChar={fenChar}
                                        userColor={userColor}
                                        imageSrc={imageSrc}
                                        // piece={piece}
                                        // onTouchDragStart={handleTouchStart}
                                        // onClickDragStart={handleClickStart}
                                    />
                                }
                                {
                                    (userColor == "white" && file === "A") || (userColor == "black" && file === "H") && 
                                    <div className={`${styles.squareLabel} ${styles.squareLabelFile} ${labelColorClass}`} key={`file-${file}-${rank}`}>
                                        {rank}
                                    </div>
                                }
                                {
                                    (userColor == "white" && rank === 1) || (userColor == "black" && rank === 8) &&
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


export default ActiveChessBoard;