'use client'

import styles from './ActiveChessBoard.module.css'
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { fetchCurrentUser } from '@/app/lib/data';
import ChessPiece from './ChessPiece';
import { useCallback, useEffect, useRef, useState } from 'react';
import { initialize } from 'next/dist/server/lib/render-server';
import { ChessBoardType } from '@/app/lib/definitions';
import { ChessBoard } from '@/app/lib/chessClasses/chessBoard';
import { Piece } from '@/app/lib/chessClasses/piece';
import { getSquareBeneathPosition, mouseMovePos } from './utils';
import { idToPos, posToId } from '@/app/lib/chessUtils';
import { removeDraggingPiece, setDraggingPiece, updateDraggingPosition } from '@/redux/draggingSlice';
import { useDispatch } from 'react-redux';
import { useThrottle } from '@/app/lib/hooks/useThrottle';


const RANKS = 'ABCDEFGH';
const FILES = '12345678';

function ActiveChessBoard({ 
    position,
    userColor="white",
    chessBoard,
    setDraggingPosition,
    hoverSquare,
    // hoverSquareRef
    setHoverSquare
}: { 
    position: string, 
    userColor: "black" | "white",
    chessBoard: ChessBoard,
    setDraggingPosition: Function,
    hoverSquare: string | null,
    setHoverSquare: Function,
}) {

    const dispatch = useDispatch();

    const finalDragSquareRef = useRef<null | string>(null);
    const selectedPieceRef = useRef<null | Piece>(null);

    const [selectedPiece, setSelectedPiece] = useState<null | Piece>(null);


    function startActions(piece: Piece, e: MouseEvent) {
        const [x, y] = mouseMovePos(e);

        setSelectedPiece(piece)

        dispatch(setDraggingPiece({
            piece: piece.getSquareId(),
            initialPosition: {x, y}
        }))

        setDraggingPosition({x, y})
    }


    function moveActions(e: MouseEvent){
        const [x,y] = mouseMovePos(e);

        const pos = {x, y}

        setDraggingPosition(pos)

        const squareBelow = getSquareBeneathPosition(pos)
        if (hoverSquare !== squareBelow){
            setHoverSquare(squareBelow);
        }
    }


    const throttledMoveActions = useThrottle(moveActions, 60);


    function handlePieceClick (piece: Piece, e: MouseEvent){
        e.preventDefault();
        startActions(piece, e)
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseEnd);
    }

    function handleMouseMove (e: MouseEvent) {
        e.preventDefault();
        // moveActions(e);
        throttledMoveActions(e)
    };

    useEffect(() => {
        if (selectedPiece){
            selectedPieceRef.current = selectedPiece;
        }
    }, [selectedPiece]);

    useEffect(() => {
        if (hoverSquare){
            finalDragSquareRef.current = hoverSquare;
        }
    }, [hoverSquare]);


    function handleMouseEnd (e: MouseEvent) {
        setHoverSquare(null)
        setDraggingPosition(null)
        setSelectedPiece(null)

        const endSquare = finalDragSquareRef.current;
        const piece = selectedPieceRef.current;

        playMoveifValid(endSquare, piece)

        dispatch(removeDraggingPiece())

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    }


    function playMoveifValid (endSquare: string | null, piece: Piece | null){
        debugger
        if (endSquare && piece){
            const moveOptions = piece.getAllMoves()
            if (moveOptions.has(endSquare) && userColor === chessBoard.currentTurn){
                chessBoard.movePiece(piece, endSquare)
            }
        }
    }



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
                        const pos = [reversedR,7 - c];

                        const imageSrc = PIECE_IMAGES[fenChar as PieceKey];
                        const piece = chessBoard.getPiece(pos);

                        const isSelected = selectedPiece?.getSquareId() === piece?.getSquareId();

                        const allOptions = selectedPiece?.getMoves();
                        const movingOptions = allOptions?.options;
                        const takingOptions = allOptions?.takeOptions;

                        // console.log("selected piece: ", selectedPiece)
                        // console.log("options : ", allOptions)

                        // console.log("posToId(pos as [number, number])", posToId(pos as [number, number]))
                        const hoverClass = hoverSquare === posToId(pos as [number, number]) ? styles.hoveringSquare : '';

                        return (
                            <div className={`${styles.boardSquare} ${sqaureColorClass} ${hoverClass}`} key={id} id={id}>
                                {
                                    fenChar && imageSrc && piece &&
                                    <ChessPiece 
                                        key={id}
                                        fenChar={fenChar}
                                        userColor={userColor}
                                        imageSrc={imageSrc}
                                        piece={piece}

                                        selected={isSelected}

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
                                <SuggestedOptions 
                                 movingOptions={movingOptions}
                                 takingOptions={takingOptions}
                                 squareId={id}
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


function SuggestedOptions({
    movingOptions, 
    takingOptions,
    squareId,
}:{
    movingOptions: Set<any> | undefined;
    takingOptions: Set<any> | undefined;
    squareId: string;
}){
    return (
        <div className={styles.suggestedOptionContainer}>
            {   
                movingOptions && movingOptions.has(squareId) && 
                <div className={styles.suggestedSquare}></div>
            }
            {
                takingOptions && takingOptions.has(squareId) && 
                <div className={styles.suggestedCapture} ></div>
            }
        </div>
    )
}


export default ActiveChessBoard;