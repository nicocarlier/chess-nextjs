'use client'

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Bot, ChessBoardType, Game, Move, User, playerColors } from "@/app/lib/definitions";
import styles from './GameWrapper.module.css';
import ActiveChessBoard from "@/app/ui/activeBoard/ActiveChessBoard";
import { useDispatch } from "react-redux";
import { increment } from "@/redux/counterSlice";
import { Button } from "../button";
import { ChessBoard } from "@/app/lib/chessClasses/chessBoard";
import { selectDraggingPiece } from "@/redux/draggingSlice";
import { useSelector } from "react-redux";
import DragClone from "../dragClone/DragClone";
import PlayerCard from "./playerCard/PlayerCard";
import { consoleLogBoard, consoleLogBoardArray, generateAlgebraicNotation } from "../activeBoard/utils";
import { fetchBotMove, updateGameMoveHistory } from "@/app/lib/actions";
import { Piece } from "@/app/lib/chessClasses/piece";

export type BoardArray = (Piece | null)[][];

export default function GameWrapper({
    // chessBoard,
    game,
    userInfo,
    opponentInfo,
}: {
    // chessBoard: ChessBoard;
    game: Game;
    userInfo: {user: User, type: "human" | "demo-user", color: "white" | "black"};
    opponentInfo: {opponent: User | Bot, type: "human" | "bot", color: "white" | "black"};
}) {

    // destructure params
    const {user, type: userType, color: userColor} = userInfo;
    const {opponent, type: opponentType, color: opponentColor} = opponentInfo;


    // start game object, update when game changes
    const chessBoard = useMemo(() => new ChessBoard(game.fen), [game.fen]); 

    const dispatch = useDispatch();

    const [draggingPosition, setDraggingPosition] = useState<{ x: number; y: number } | null>(null);
    const [hoverSquare, setHoverSquare] = useState<string | null>(null);

    const draggingPiece = useSelector(selectDraggingPiece)

    console.log("chessBoard.currentTurn ", chessBoard.currentTurn)
    console.log("game.fen ", game.fen)
    // console.log("isUsersTurn ", isUsersTurn)


    // everytime an update has been made to the game
    useEffect(()=>{
        let timeoutId: NodeJS.Timeout;

        // console.log("About to make bot move.....")
        const makeBotMove = async () => {
            const isBotsTurn = chessBoard.currentTurn !== userColor;
            if (opponentType === 'bot' && isBotsTurn) {
                // const waitTime = Math.random() * Math.random() * 10 * 1000; // Random wait time between 0 to 10 seconds
                const waitTime = ( 2 + Math.random() * Math.random() * 2) * 1000; // between 2 - 4 seconds

                timeoutId = setTimeout(async () => {
                    // console.log("Making bot move.....")
                    const [piecePosition, endSquare] = await fetchBotMove(chessBoard.getFen(), opponent as Bot);
                    const piece = chessBoard.getPiece(piecePosition);
                    playMoveifValid (endSquare, piece, opponentColor)
                }, waitTime);
            }
        };
    
        makeBotMove();
    
        return () => {
            clearTimeout(timeoutId);
        };
    },  [game, chessBoard])


    // play user's moves
    function playMoveifValid (endSquare: string | null, piece: Piece | null, color: playerColors){
        const isUsersTurn = color === chessBoard.currentTurn;
        if (endSquare && piece){
            const moveOptions = piece.allMoveOptions();
            if (moveOptions.has(endSquare) && isUsersTurn){
                const moveExpression = chessBoard.movePiece(piece, endSquare);
                const currentBoardFen =  chessBoard.getFen();
                if (moveExpression){
                    addMoveToGame(moveExpression, userColor, currentBoardFen);  // update game in DB:
                }
            }
        }
    }


    const addMoveToGame = async (moveExpression: string, colorsTurn: playerColors, fenAfterMove: string) => {
        const newMoveHistory: Move[] = [...game.move_history.moves];

        if (colorsTurn === "white"){
            const newMove: Move = {
                moveNumber: chessBoard.fullmove,
                white: moveExpression,
                fenWhite: fenAfterMove,
            };
            newMoveHistory.push(newMove);
        } else if (colorsTurn === "black"){
            const currentMove = newMoveHistory[newMoveHistory.length - 1];
            currentMove.black = moveExpression;
            currentMove.fenBlack = fenAfterMove;
        }

        updateGameMoveHistory(game.id, newMoveHistory, fenAfterMove)
    };


    return (
        <>
        {
            draggingPiece && draggingPosition &&
            <DragClone
                piece={chessBoard?.getPieceFromId(draggingPiece)}
                position={draggingPosition}
            />
        }
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8 max-h-screen">
                <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                    <PlayerCard player={opponent} type={opponentType}/>
                    <ActiveChessBoard 
                        // position={position} 
                        // boardArray={boardArray}
                        position={chessBoard.getPosition()}

                        userColor={userColor}
                        playMoveifValid={playMoveifValid}
                        chessBoard={chessBoard}
                        setDraggingPosition={setDraggingPosition}
                        hoverSquare={hoverSquare}
                        setHoverSquare={setHoverSquare}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )

}