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
import ReplayBoard from "../gameHistory/ReplayBoard/ReplayBoard";
import MoveHistoryIndex from "../gameHistory/moveNavs/MoveHistoryIndex";
import { getHalfMovesFromFull } from "@/app/lib/utils";

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


    const [replayMode, setReplayMode] = useState<boolean>(false);
    
    // console.log("game.move_history.moves", game.move_history.moves)
    const moveHistory = game?.move_history;
    const totalHalfMoves = getHalfMovesFromFull(moveHistory.moves.length, chessBoard.currentTurn);
    const [currentReplayHalfMove, setCurrentReplayHalfMove] = useState(totalHalfMoves);

    console.log("=====================")
    console.log("fullMove: ", moveHistory.moves.length)
    console.log("color is: ", chessBoard.currentTurn)
    console.log("halfmove is: ", totalHalfMoves)
    // console.log("in wrapper -- totalHalfMoves", totalHalfMoves)
    // console.log("in wrapper -- currentReplayHalfMove", currentReplayHalfMove)
    // console.log("totalHalfMoves : ", totalHalfMoves)

    const draggingPiece = useSelector(selectDraggingPiece)


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

                setCurrentReplayHalfMove(totalHalfMoves);
                setReplayMode(false);

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


    const replayMoveNum = Math.ceil(currentReplayHalfMove / 2.0);
    const replayColor = currentReplayHalfMove % 2 === 0 ? 'black' : 'white';


    const replayMoveUpdate = (newHalfMove: number) => {
        if (newHalfMove >= 0 && newHalfMove <= totalHalfMoves){
            setCurrentReplayHalfMove(newHalfMove)
        } 
    }


    if (replayMode){
        console.log("IN REPLAY MODE!")
    }


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

                    {
                        replayMode && 
                            <ReplayBoard 
                                moveHistory={game.move_history} 
                                currHalfMove={currentReplayHalfMove}
                                userColor={userColor}
                        />
                    }
                    {
                        !replayMode && 
                            <ActiveChessBoard 
                                position={chessBoard.getPosition()}
                                userColor={userColor}
                                playMoveifValid={playMoveifValid}
                                chessBoard={chessBoard}
                                setDraggingPosition={setDraggingPosition}
                                hoverSquare={hoverSquare}
                                setHoverSquare={setHoverSquare}
                            />
                    }
                    {/* <ActiveChessBoard 
                        position={chessBoard.getPosition()}
                        userColor={userColor}
                        playMoveifValid={playMoveifValid}
                        chessBoard={chessBoard}
                        setDraggingPosition={setDraggingPosition}
                        hoverSquare={hoverSquare}
                        setHoverSquare={setHoverSquare}
                    /> */}
                    <PlayerCard player={user} type={userType}/>
                </div>

            <div className={`w-full lg:col-span-3`}>

                <MoveHistoryIndex
                        moveHistory={moveHistory}
                        currHalfMove={currentReplayHalfMove}
                        moveUpdater={replayMoveUpdate}
                    />
                {/* 
                <Button onClick={()=>dispatch(increment())}>increment counter</Button>

                <div className={`${styles.reviewBoardContainer} md:col-span-4`}>
                    <MoveHistoryIndex
                        moveHistory={moveHistory}
                        currHalfMove={currentReplayHalfMove}
                        moveUpdater={replayMoveUpdate}
                    />
                </div> */}
            </div>
        </div>

        </>
    )

}