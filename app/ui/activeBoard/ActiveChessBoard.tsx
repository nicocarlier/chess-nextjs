'use client'

import styles from './ActiveChessBoard.module.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from '@/app/lib/hooks/useThrottle';

import { ChessBoard } from '@/app/lib/chessClasses/chessBoard';
import { Piece } from '@/app/lib/chessClasses/piece';
import { createBoardArray, getSquareBeneathPosition, mouseMovePos } from './utils';
import { removeDraggingPiece, selectDraggingPiece, setDraggingPiece } from '@/redux/draggingSlice';
import Square from './Square';

function ActiveChessBoard({ 
    position,
    userColor,
    chessBoard,
    setDraggingPosition,
    hoverSquare,
    setHoverSquare,
    addMoveToGame
}: { 
    position: string, 
    userColor: "black" | "white",
    chessBoard: ChessBoard,
    setDraggingPosition: Function,
    hoverSquare: string | null,
    setHoverSquare: Function,
    addMoveToGame: Function
}) {

    const dispatch = useDispatch();

    const finalDragSquareRef = useRef<null | string>(null);
    const selectedPieceRef = useRef<null | Piece>(null);

    const [selectedPiece, setSelectedPiece] = useState<null | Piece>(null);

    const draggingPiece = useSelector(selectDraggingPiece);

    console.log("chessBoard", chessBoard)

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

        const pos = {x, y};

        setDraggingPosition(pos);

        const squareBelow = getSquareBeneathPosition(pos);
        if (hoverSquare !== squareBelow){
            setHoverSquare(squareBelow);
        }
    }

    
    
    function handlePieceClick (piece: Piece, e: MouseEvent){
        e.preventDefault();
        startActions(piece, e)
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseEnd);
    }
    

    const throttledMoveActions = useCallback(useThrottle(moveActions, 30), [moveActions]);

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

    // useEffect(() => {
    //     if (!draggingPiece){
    //         setHoverSquare(null)
    //         setDraggingPosition(null)
    //         setSelectedPiece(null)
    //     }
    // }, [draggingPiece]);

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

        console.log("checkpoint #1")
        console.log("white pawns: ", chessBoard.boardArray[1])
        console.log("current pawn pos: ", piece?.getSquareId())
        console.log("current pawn move options: ", piece?.allMoveOptions())

        if (endSquare && piece){

            console.log("checkpoint #2")
            console.log("white pawns: ", chessBoard.boardArray[1])
            console.log("current pawn pos: ", piece?.getSquareId())
            console.log("current pawn move options: ", piece?.allMoveOptions())

            const moveOptions = piece.allMoveOptions()

            console.log("checkpoint #3")
            console.log("white pawns: ", chessBoard.boardArray[1])
            console.log("current pawn pos: ", piece?.getSquareId())
            console.log("current pawn move options: ", piece?.allMoveOptions())

            const colorsTurn = chessBoard.currentTurn;
            if (moveOptions.has(endSquare) && userColor === colorsTurn){
                // update chessboard object
                const moveExpression = chessBoard.movePiece(piece, endSquare);
                const currentBoardFen =  chessBoard.getFen();
                // update game in DB
                if (moveExpression){
                    addMoveToGame(moveExpression, colorsTurn, currentBoardFen)
                }
            }
        }
    }

    const BOARD = createBoardArray(userColor, position);

    return (
        <div className={styles.chessBoard}>
            {BOARD.reverse().map((row, r) => (
                <div key={r} className={styles.boardRow}>

                    {row.map((squareProps, c) => {
                        const {rank, file, pos} = squareProps;
                        const squareId = `${file}${rank}`;
                        const piece = chessBoard.getPiece(pos);
                        const selectedPieceId = selectedPiece?.getSquareId();
                        const allOptions = selectedPiece?.getMoves();

                        return (
                            <Square
                                key={`${r}${c}`}
                                squareProps={squareProps}

                                isSelected={!!selectedPieceId && selectedPieceId === squareId}
                                isMoveOption={allOptions?.options?.has(squareId)!}
                                isTakeOption={allOptions?.takeOptions?.has(squareId)!}
                                isHoveredOver={hoverSquare === squareId}
                                isBeingDragged={draggingPiece === squareId}

                                userColor={userColor}
                                piece={piece}
                                handlePieceClick={handlePieceClick}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    );
}

export default ActiveChessBoard;