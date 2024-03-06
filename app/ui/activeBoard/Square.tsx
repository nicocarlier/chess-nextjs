import React from 'react';
import styles from './Square.module.css'
import { Piece } from '@/app/lib/chessClasses/piece';
import ChessPiece from './ChessPiece';

const Square = React.memo(({
    squareProps, 
    isSelected,
    isMoveOption,
    isTakeOption,
    isHoveredOver,
    isBeingDragged,
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
    userColor: "black" | "white";
    piece: Piece | null;
    handlePieceClick: Function;
}) => {

    // constants
    const {rank, file, pos} = squareProps;
    const [row, col] = pos;
    const id = `${file}${rank}`;

    // color related classes
    const squareColor: "brown" | "white" = (row + col) % 2 === 0 ? "brown" : "white";
    const sqaureColorClass = styles[squareColor]
    const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;

    // label booleans
    const hasRankLabel = (userColor === "white" && file === "A") || (userColor === "black" && file === "H");
    const hasFileLabel = (userColor === "white" && rank === 1) || (userColor === "black" && rank === 8);

    // other style classes
    const hoverClass = isHoveredOver ? styles.hoveringSquare : '';
    const selectedClass = isSelected ? styles.selectedSquare : '';

    return (
        <div className={`${styles.boardSquare} ${sqaureColorClass} ${hoverClass} ${selectedClass}`} key={id} id={id}>
            
            {
                piece && !isBeingDragged &&
                <ChessPiece 
                    key={id}
                    piece={piece}
                    handlePieceClick={handlePieceClick}
                />
            }

            {/* <div className={styles.squareLabelContainer}> */}
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
            {/* </div> */}

            {   
                isMoveOption && 
                <div className={styles.suggestedSquare}></div>
            }
            {
                isTakeOption && 
                <div className={styles.suggestedCapture} ></div>
            }
        </div>
    )
})


export default Square