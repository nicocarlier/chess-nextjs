'use client'

import styles from './ActiveChessBoard.module.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from '@/app/lib/hooks/useThrottle';

import { ChessBoard, FEN_TO_OBJECT } from '@/app/lib/chessClasses/chessBoard';
import { Piece } from '@/app/lib/chessClasses/piece';
import { createBoardArray, getSquareBeneathPosition, mouseMovePos } from './utils';
import { removeDraggingPiece, selectDraggingPiece, setDraggingPiece } from '@/redux/draggingSlice';
import Square from './Square';
import { BoardArray } from '../play/GameWrapper';


function ActiveChessBoard({ 
    position,
    // boardArray,

    userColor,
    chessBoard,
    playMoveifValid,
    setDraggingPosition,
    hoverSquare,
    setHoverSquare,
}: { 
    position: string, 
    // boardArray: BoardArray,

    userColor: "black" | "white",
    chessBoard: ChessBoard,
    playMoveifValid: Function;
    setDraggingPosition: Function,
    hoverSquare: string | null,
    setHoverSquare: Function,
}) {

    const dispatch = useDispatch();

    const finalDragSquareRef = useRef<null | string>(null);
    const selectedPieceRef = useRef<null | Piece>(null);

    const [selectedPiece, setSelectedPiece] = useState<null | Piece>(null);

    const draggingPiece = useSelector(selectDraggingPiece);

    // console.log("chessBoard", chessBoard)

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

    function handleMouseEnd (e: MouseEvent) {
        e.preventDefault()

        setHoverSquare(null)
        setDraggingPosition(null)
        setSelectedPiece(null)

        const endSquare = finalDragSquareRef.current;
        const piece = selectedPieceRef.current;

        if (piece?.getColor() === userColor){
            playMoveifValid(endSquare, piece, userColor)
        }

        dispatch(removeDraggingPiece())

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    }


    const BOARD = createBoardArray(userColor, position);

    return (
        <div className={styles.chessBoard}>
            {BOARD.reverse().map((row, r) => (
                <div key={r} className={styles.boardRow}>

                    {row.map((squareProps, c) => {
                        const {rank, file, pos} = squareProps;
                        const squareId = `${file}${rank}`;
                        // const [boardRow, boardCol] = pos;

                        const piece = chessBoard.getPiece(pos);
                        // const piece = boardArray[boardRow][boardCol];

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