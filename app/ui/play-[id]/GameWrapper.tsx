'use client'

import React, { useEffect, useState, useMemo } from "react";
import { Bot, Game, Move, User, moveTypeKeys, moveTypes, playerColors } from "@/app/lib/definitions";
import styles from './GameWrapper.module.css';
import ActiveChessBoard from "@/app/ui/activeBoard/ActiveChessBoard";
import { ChessBoard } from "@/app/lib/chessClasses/chessBoard";
import { selectDraggingPiece } from "@/redux/draggingSlice";
import { useSelector } from "react-redux";
import DragClone from "../dragClone/DragClone";
import PlayerCard from "./playerCard/PlayerCard";
import { fetchBotMove, updateGameMoveHistory } from "@/app/lib/actions";
import { Piece } from "@/app/lib/chessClasses/piece";
import ReplayBoard from "../gameHistory/ReplayBoard/ReplayBoard";
import MoveHistoryIndex from "../gameHistory/moveNavs/MoveHistoryIndex";
import { getFullMoveAndColor, getHalfMovesFromMoveHistory, getRandomWaitTime } from "@/app/lib/utils";
import { getMoveSound, getMoveSoundFilePath } from "@/app/lib/soundUtils";
import useSound from "use-sound";

// import sound from '/sounds/move-self.mp3'

export type BoardArray = (Piece | null)[][];

export default function GameWrapper({
    game,
    userInfo,
    opponentInfo,
}: {
    game: Game;
    userInfo: {user: User, type: "human" | "demo-user", color: "white" | "black"};
    opponentInfo: {opponent: User | Bot, type: "human" | "bot", color: "white" | "black"};
}) {

    // console.log("GAME WRAPPER RE-RENDERED")
    // const audio = new Audio(sound)
    // audio.play()

    // const [playMove] = useSound('/sounds/move-self.mp3');
    // const [playMove] = useSound('./move-self.mp3');

    // destructure params
    const {user, type: userType, color: userColor} = userInfo;
    const {opponent, type: opponentType, color: opponentColor} = opponentInfo;

    // start game object, update when game changes
    const chessBoard = useMemo(() => new ChessBoard(game.fen), [game.fen]); 
    const moveHistory = game?.move_history.moves;
    
    const [draggingPosition, setDraggingPosition] = useState<{ x: number; y: number } | null>(null);
    const [hoverSquare, setHoverSquare] = useState<string | null>(null);
    const [replayMode, setReplayMode] = useState<boolean>(false);
    const [stateMoveHistory, setStateMoveHistory] = useState<Move[]>(moveHistory);
    const totalHalfMoves = useMemo(() => getHalfMovesFromMoveHistory(stateMoveHistory), [stateMoveHistory]); 
    const [currentReplayHalfMove, setCurrentReplayHalfMove] = useState(totalHalfMoves);
    
    const draggingPiece = useSelector(selectDraggingPiece)

    // everytime an update has been made to the game
    useEffect(()=>{
        let timeoutId: NodeJS.Timeout;
        const makeBotMove = async () => {
            const isBotsTurn = chessBoard.currentTurn !== userColor;
            if (opponentType === 'bot' && isBotsTurn) {
                const waitTime = getRandomWaitTime(2,4);    // between 2 & 4 sec
                timeoutId = setTimeout(async () => {
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
                const res = chessBoard.movePiece(piece, endSquare);
                if (res){
                    const { moveExpression, moveTypes } = res;


                    // logMove(moveTypes, color)
                    
                    const currentBoardFen =  chessBoard.getFen();
                    addMoveToGame(moveExpression, color, currentBoardFen);  // update game in DB:

                    return moveTypes;
                }
            }
        }
        return null;
    }


    function logMove(moveTypes: any, color: playerColors){
        console.log("=== MOVE MADE =====")
        console.log("move color: ", color)
        const types = Object.keys(moveTypes).filter((type)=>moveTypes[type]);
        types.forEach((type) => {
            console.log("move type: ", type)
        })
        if (!types.length){
            console.log("move type: standard")
        }
    }

    // function playMoveSound(moveTypes: moveTypes){
    //     const path = getMoveSoundFilePath(moveTypes);
    //     const sound = new Audio(path);
    //     if (sound){
    //         sound.play();
    //     }
    // }

    // function addSpecialEffects(moveTypes: moveTypes){

    //     const path = getMoveSoundFilePath(moveTypes);
    //     const sound = new Audio(path);
    //     if (sound){
    //         sound.play();
    //     }
    // }

    // update state and DB move histories
    const addMoveToGame = async (moveExpression: string, colorsTurn: playerColors, fenAfterMove: string) => {
        const newMoveHistory: Move[] = [...moveHistory];
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
        updateGameMoveHistory(game.id, newMoveHistory, fenAfterMove);

        // update states
        setStateMoveHistory(newMoveHistory);
        setCurrentReplayHalfMove(getHalfMovesFromMoveHistory(newMoveHistory));
        setReplayMode(false);   // turn off replay mode on every new move
    };


    const replayMoveUpdate = (newHalfMove: number) => {
        if (newHalfMove >= 0 && newHalfMove <= totalHalfMoves){
            setReplayMode(true);
            setCurrentReplayHalfMove(newHalfMove)
            if (newHalfMove === totalHalfMoves){    // i.e. they have gone to current board state
                setReplayMode(false);
            }
        }
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
                            moveHistory={stateMoveHistory} 
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
                    <PlayerCard player={user} type={userType}/>
                </div>

            <div className={`w-full lg:col-span-3`}>
                <MoveHistoryIndex
                    moveHistory={stateMoveHistory} 
                    currHalfMove={currentReplayHalfMove}
                    moveUpdater={replayMoveUpdate}
                />
            </div>
        </div>

        </>
    )

}


// export const getMoveSound = (moveTypes: moveTypes): HTMLAudioElement | undefined => {
//     // Check if window is defined, which indicates we're running in the browser
//     if (typeof window === 'undefined') {
//         return undefined;
//     }

//     if (moveTypes.isCastlingKingSide || moveTypes.isCastlingQueenSide) {
//         return new Audio('/sounds/castle.mp3');
//     } else if (moveTypes.isPromotion) {
//         return new Audio('/sounds/promote.mp3'); // Assuming there's a promote.mp3, replace as necessary
//     } else if (moveTypes.isCapture) {
//         return new Audio('/sounds/capture.mp3');
//     } else if (moveTypes.isCheck) {
//         return new Audio('/sounds/check.mp3'); // Assuming there's a check.mp3, replace as necessary
//     } else {
//         return new Audio('/sounds/move-self.mp3');
//     }
// };