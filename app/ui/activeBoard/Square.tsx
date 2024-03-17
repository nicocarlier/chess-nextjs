import React from 'react';
import styles from './Square.module.css'
import { Piece } from '@/app/lib/chessClasses/piece';
import ChessPiece from './ChessPiece';
import { playerColors } from '@/app/lib/definitions';

const Square = React.memo(({
    squareProps, 
    isSelected,
    isMoveOption,
    isTakeOption,
    isHoveredOver,
    isBeingDragged,
    isInCheck,
    userColor,
    piece,
    handlePieceClick,
}: { 
    squareProps: { file: string; rank: number; fenChar: string | null; pos: number[]; };
    isSelected: boolean;
    isMoveOption: boolean;
    isTakeOption: boolean;
    isHoveredOver: boolean;
    isBeingDragged: boolean;
    isInCheck: boolean;
    userColor: playerColors;
    piece: Piece | null;
    handlePieceClick: Function;
}) => {

    // console.log("SQUARE RE-RENDERED")

    // constants
    const {rank, file, pos} = squareProps;
    const [row, col] = pos;
    const id = `${file}${rank}`;

    // color related classes
    const squareColor: "brown" | "white" = (row + col) % 2 === 0 ? "brown" : "white";
    const sqaureColorClass = styles[squareColor]
    const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;
    const inCheckClass = isInCheck ? styles.inCheck : styles.inCheck;

    // label booleans
    const hasRankLabel = (userColor === "white" && file === "A") || (userColor === "black" && file === "H");
    const hasFileLabel = (userColor === "white" && rank === 1) || (userColor === "black" && rank === 8);

    // other style classes
    const hoverClass = isHoveredOver ? styles.hoveringSquare : '';
    const selectedClass = isSelected ? styles.selectedSquare : '';

    // if (isTakeOption){
    //     console.log("square is a take option!")
    //     console.log("square: ", id)
    // }

    return (
        <div 
        className={`${styles.boardSquare} ${sqaureColorClass} ${hoverClass} ${selectedClass}`} key={id} id={id}>
            
            {
                piece && !isBeingDragged &&
                <ChessPiece 
                    key={id}
                    piece={piece}
                    handlePieceClick={handlePieceClick}
                />
            }
            {
                hasRankLabel && 
                <div className={`${styles.squareLabel} ${styles.squareLabelFile} ${labelColorClass}`} key={`file-${file}-${rank}`}>
                    {rank}
                </div>
            }
            {
                hasFileLabel &&
                <div className={`${styles.squareLabel} ${styles.squareLabelRank} ${labelColorClass}`} key={`rank-${file}-${rank}`}>
                    {file.toLowerCase()}
                </div>
            }
            {   
                isMoveOption && 
                <div className={styles.suggestedSquare}></div>
            }
            {
                isTakeOption && 
                <div className={styles.suggestedCapture} ></div>
            }
            {
                inCheckClass &&
                <div className={`${styles.inCheck}`}></div>
            }
        </div>
    )
})


export default Square