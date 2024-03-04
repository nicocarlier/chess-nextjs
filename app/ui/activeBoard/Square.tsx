import React from 'react';
import styles from './Square.module.css'
import { Piece } from '@/app/lib/chessClasses/piece';
import { useSelector } from 'react-redux';
import { selectDraggingPiece } from '@/redux/draggingSlice';
import ChessPiece from './ChessPiece';

const Square = React.memo(({
    squareProps, 
    isSelected,
    isMoveOption,
    isTakeOption,
    isHoveredOver,
    userColor,
    piece,
    handlePieceClick,
}: { 
    squareProps: { file: string; rank: number; fenChar: string | null; pos: number[]; };
    isSelected: boolean;
    isMoveOption: boolean;
    isTakeOption: boolean;
    isHoveredOver: boolean;
    userColor: "black" | "white";
    piece: Piece;
    handlePieceClick: Function;
}) => {

    const draggingPiece = useSelector(selectDraggingPiece)

    const {rank, file, fenChar, pos} = squareProps;
    const [row, col] = pos;

    const squareColor: "brown" | "white" = (row + col) % 2 === 0 ? "brown" : "white";
    
    const sqaureColorClass = styles[squareColor]
    const labelColorClass = squareColor === 'brown' ? styles.squareLabelWhite : styles.squareLabelBrown;

    const id = `${file}${rank}`;

    const hasRankLabel = (userColor === "white" && file === "A") || (userColor === "black" && file === "H");

    const hasFileLabel = (userColor === "white" && rank === 1) || (userColor === "black" && rank === 8);

    const hoverClass = isHoveredOver ? styles.hoveringSquare : '';

    const selectedClass = isSelected ? styles.selectedSquare : '';

    return (
        <div className={`${styles.boardSquare} ${sqaureColorClass} ${hoverClass} ${selectedClass}`} key={id} id={id}>
            <ChessPiece 
                key={id}
                piece={piece}
                isDragging={draggingPiece === piece.getSquareId()}
                handlePieceClick={handlePieceClick}
            />

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