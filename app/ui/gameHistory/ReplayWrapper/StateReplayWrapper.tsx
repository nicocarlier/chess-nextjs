'use client'

import React, { useEffect, useState, useCallback } from "react";
import { Game, MoveHistory } from "@/app/lib/definitions";
import ReplayBoard from "../ReplayBoard/ReplayBoard";
import styles from './ReplayWrapper.module.css';
import MoveNavReplace from "../moveNavs/move-nav-replace";
// import MoveHistoryTable from "../MoveHistoryTable/MoveHistoryTable";
import { generateMiniPagination, generateMoveHistoryTablePagination, generatePagination, getHalfMovesFromFull } from "@/app/lib/utils";
import MoveNav from "../moveNavs/move-nav";
import MoveHistoryIndex from "../moveNavs/MoveHistoryIndex";

export default function StateReplayWrapper({
    game,
    userColor
}: {
    game: Game,
    userColor: "white" | "black"
}) {

    const moveHistory = game.move_history;

    const totalMoves = moveHistory.moves.length;
    const lastMove = moveHistory.moves[totalMoves-1];
    const lastMoveColor = lastMove["black"] === "" ? "white" : "black"

    const totalHalfMoves = getHalfMovesFromFull(totalMoves, lastMoveColor);


    const [currentHalfMove, setCurrentHalfMove] = useState(totalHalfMoves);


    const replayMoveUpdate = (newHalfMove: number) => {
        if (newHalfMove >= 0 && newHalfMove <= totalHalfMoves){
            setCurrentHalfMove(newHalfMove)
        } 
    }

    useEffect(() => {
        const handleKeyPress = (event: { key: string; }) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                if (event.key === 'ArrowLeft') {
                    const newHalfMove = currentHalfMove - 1;
                    replayMoveUpdate(newHalfMove);
                } else if (event.key === 'ArrowRight') {
                    const newHalfMove = currentHalfMove + 1;
                    replayMoveUpdate(newHalfMove);
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress); // Add event listener
    
        return () => { // Remove event listener on cleanup
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []); 

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
            <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                <ReplayBoard 
                    moveHistory={moveHistory} 
                    currHalfMove={currentHalfMove}
                    userColor={userColor}
                />
            </div>
            <div className={`w-full lg:col-span-3`}>
                <MoveHistoryIndex
                    moveHistory={moveHistory}
                    currHalfMove={currentHalfMove}
                    moveUpdater={replayMoveUpdate}
                />
            </div>
        </div>
    )

}