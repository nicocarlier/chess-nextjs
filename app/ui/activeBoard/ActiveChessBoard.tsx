import styles from './ActiveChessBoard.module.css'
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { fetchCurrentUser } from '@/app/lib/data';
import ChessPiece from './ChessPiece';
import { useRef } from 'react';
import { initialize } from 'next/dist/server/lib/render-server';
import { ChessBoardType } from '@/app/lib/definitions';
import { ChessBoard } from '@/app/lib/chessClasses/chessBoard';
import { Piece } from '@/app/lib/chessClasses/piece';
import { mouseMovePos } from './utils';
import { posToId } from '@/app/lib/chessUtils';

function ActiveChessBoard({ 
    position,
    userColor="white",
    chessBoard
}: { 
    position: string, 
    userColor: "black" | "white",
    chessBoard: ChessBoard
}) {


    const finalDragSquareRef = useRef<null | HTMLElement>(null);
    const selectedPiece = useRef<null | Piece>(null);

    function startActions(piece: Piece, e: MouseEvent) {
        // const isOurMove = userColor === game.whosMove();
        // if (isOurMove || !isActive){
            const [x, y] = mouseMovePos(e);
            const startSquareId = posToId(piece.getSquare());
            selectedPiece.current = piece;
    
            // dispatch(receiveDraggingPiece(piece));
            // dispatch(receiveDragPosition({x,y}));
            // dispatch(receiveSelected(startSquareId));
            // dispatch(receiveMoveOptions(piece.getMoves()));
        // }
    }

    function moveActions(e: MouseEvent){
        const [x,y] = mouseMovePos(e);
        // dispatch(receiveDragPosition({x,y}));
        console.log("drag position.  x: ", x, "y: ", y)
    }

    function endActions() {
        const endSquare = finalDragSquareRef.current;
        const piece = selectedPiece.current;
        if (endSquare){
            // if (playMoveIfValid(piece, endSquare)){
            //     dispatch(removeSelected())
            // }
            finalDragSquareRef.current = null;
        }

        // dispatch(removeTouchHighlightedSquare());
        // dispatch(removeHighlightedSquare());
        // dispatch(removeDragPosition());
        // dispatch(removeDraggingPiece());
    }




    function handlePieceClick (piece: Piece, e: MouseEvent){
        // debugger
        e.preventDefault();
        startActions(piece, e)
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseEnd);
    }

    function handleMouseMove (e: MouseEvent) {
        e.preventDefault();
        moveActions(e);
    };

    function handleMouseEnd (e: MouseEvent) {
        e.preventDefault()

        endActions();
    
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    };

    // mouseover event listeners for highlighting?




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
                        // (reverse the row order do we print the board to screen with rank 1 at bottom)
                        const r = 7 - reversedR;
                        const sqaureColorClass = (r + c) % 2 === 0 ? styles.brown : styles.white;
                        const squareColor: "brown" | "white" = (r + c) % 2 === 0 ? "brown" : "white";
                        // const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;
                        const id = `${file}${rank}`;
                        const pos = [r,c];

                        const imageSrc = PIECE_IMAGES[fenChar as PieceKey];
                        const piece = chessBoard.getPiece(pos);

                        return (
                            <div className={`${styles.boardSquare} ${sqaureColorClass}`} key={id} id={id}>
                                {
                                    fenChar && imageSrc && piece &&
                                    <ChessPiece 
                                        key={id}
                                        fenChar={fenChar}
                                        userColor={userColor}
                                        imageSrc={imageSrc}
                                        piece={piece}

                                        handlePieceClick={handlePieceClick}
                                        // onTouchDragStart={handleTouchStart}
                                        // onClickDragStart={handleClickStart}
                                    />
                                }
                                <SquareLabels 
                                 userColor={userColor}
                                 file={file}
                                 rank={rank}
                                 squareColor={squareColor}
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function SquareLabels({
    userColor, 
    file,
    rank,
    squareColor
}:{
    userColor: "white" | "black";
    file: string;
    rank: number;
    squareColor: "brown" | "white"
}){

    const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;
    return (
        <div className={styles.squareLabelContainer}>
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
    )
}


export default ActiveChessBoard;