'use client'

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Bot, ChessBoardType, Game, Move, User } from "@/app/lib/definitions";
import styles from './GameWrapper.module.css';
import { generateMiniPagination, generateMoveHistoryTablePagination, generatePagination } from "@/app/lib/utils";
import { GAME_START_FEN } from "@/app/lib/chessUtils";
import ActiveChessBoard from "@/app/ui/activeBoard/ActiveChessBoard";
import { useDispatch } from "react-redux";
import { increment } from "@/redux/counterSlice";
import { Button } from "../button";
import { ChessBoard } from "@/app/lib/chessClasses/chessBoard";
import { selectDraggingPiece, selectDraggingPosition } from "@/redux/draggingSlice";
import { useSelector } from "react-redux";
import DragClone from "../dragClone/DragClone";
import PlayerCard from "./playerCard/PlayerCard";

// const RANKS = 'ABCDEFGH';
// const FILES = '12345678';

export default function GameWrapper({
    game,
    userInfo,
    opponentInfo,
}: {
    game: Game;
    userInfo: {user: User, type: "human" | "demo-user", color: "white" | "black"};
    opponentInfo: {opponent: User | Bot, type: "human" | "bot", color: "white" | "black"};
}) {

    const {user, type: userType, color: userColor} = userInfo;
    const {opponent, type: opponentType, color: opponentColor} = opponentInfo;

    const cloneRef = useRef<HTMLElement | null>(null)

    const dispatch = useDispatch();

    const [moveHistory, setMoveHistory] = useState<Move[]>([]);
    // const [selectedPiece, setSelectedPiece] = useState<HTMLElement | null>(null);

    const [draggingPosition, setDraggingPosition] = useState<{ x: number; y: number } | null>(null);


    const [hoverSquare, setHoverSquare] = useState<string | null>(null);
    const hoverSquareRef = useRef<string | null>(null)

    // const [chessBoard, setChessBoard] = useState<ChessBoard>(new ChessBoard(game.fen));

    const chessBoard = new ChessBoard(game.fen);

    // const updateHoverSquare = useCallback((position: { x: number; y: number } | null)=>{
    //     // debugger
    //     if (position){
    //         debugger
    //         document.elementsFromPoint(position.x, position.y).forEach((ele=>{
    //             if (ele.id.length === 2){
    //                 const [rank, file] = ele.id.split('');
    //                 if ( RANKS.includes(rank) && FILES.includes(file) ){
    //                     if (hoverSquare !== ele.id){
    //                         setHoverSquare(null);
    //                     }
    //                 }
    //             }
    //         }))
    //     } else {
    //         setHoverSquare(null)
    //     }
    // }, [])


    // console.log("hoverSquare: ", hoverSquare)

    // useEffect(()=>{
    //     if (draggingPosition){
    //         document.elementsFromPoint(draggingPosition.x, draggingPosition.y).forEach((ele=>{
    //             if (ele.id.length === 2){
    //                 const [rank, file] = ele.id.split('');
    //                 if ( RANKS.includes(rank) && FILES.includes(file) ){
    //                     if (hoverSquare !== ele.id){
    //                         setHoverSquare(ele.id);
    //                         hoverSquareRef.current = ele.id;
    //                     }
    //                 }
    //             }
    //         }))
    //     } else if (!!hoverSquare) {
    //         setHoverSquare(null)
    //         hoverSquareRef.current = null;
    //     }
    // }, [draggingPosition])

    function updateFen(move: string, previousFen: string): string {
        // need to write this logic
        return GAME_START_FEN;
    }

    const updateMoveHistory = useCallback(({ color, move }: { color: "white" | "black", move: string }) => {
        let newMove: Move;
        if (color === 'white') {
            const previousFen = moveHistory[moveHistory.length - 1].fenBlack;
            const newFen = updateFen(move, previousFen || GAME_START_FEN);
            newMove = {
                moveNumber: moveHistory.length + 1,
                white: move,
                fenWhite: newFen,
                black: "",
                fenBlack: "",
            };
            setMoveHistory(prev => [...prev, newMove]);
        } else {
            const currentMove = moveHistory[moveHistory.length - 1];
            const newFen = updateFen(move, currentMove.fenWhite);
            newMove = {
                ...currentMove,
                black: move,
                fenBlack: newFen,
            };
            setMoveHistory(prev => [...prev.slice(0, -1), newMove]);
        }
    }, [moveHistory]);

    const draggingPiece = useSelector(selectDraggingPiece)
    // const draggingPosition = useSelector(selectDraggingPosition)

    return (
        <>
        {
            draggingPiece && draggingPosition &&
            <DragClone
                // ref={cloneRef}
                piece={chessBoard?.getPieceFromId(draggingPiece)}
                position={draggingPosition}
            />
        }
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
                <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                    <PlayerCard player={opponent} type={opponentType}/>
                    <ActiveChessBoard 
                        position={game.fen.split(' ')[0]} 
                        // userColor={userColor}
                        userColor={"white"}
                        chessBoard={chessBoard}
                        setDraggingPosition={setDraggingPosition}
                        hoverSquare={hoverSquare}
                        setHoverSquare={setHoverSquare}
                        // hoverSquareRef={hoverSquareRef.current}
                    />
                    <PlayerCard player={user} type={userType}/>
                </div>

            <div className={`w-full lg:col-span-3`}>

                <Button onClick={()=>dispatch(increment())}>increment counter</Button>

                <div className={`${styles.reviewBoardContainer} md:col-span-4`}>
                    <div className={styles.moveListContainer}>
                        <h2 className={`${styles.heading} ${styles.headingMd}`}>
                            Live Moves
                        </h2>

                        <div className={styles.movesList}>
                            <p>moves go here</p>
                            {/* <MoveHistoryTable 
                            movesTable={movesTable} directMoveUpdate={directMoveUpdate}
                            current={[currNum, currColor]}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )

}