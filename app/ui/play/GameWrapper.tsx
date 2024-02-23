'use client'

import React, { useEffect, useState, useCallback } from "react";
import { Game, Move } from "@/app/lib/definitions";
import styles from './GameWrapper.module.css';
import { generateMiniPagination, generateMoveHistoryTablePagination, generatePagination } from "@/app/lib/utils";
import { GAME_START_FEN } from "@/app/lib/chessUtils";
import ActiveChessBoard from "@/app/ui/activeBoard/ActiveChessBoard";

export default function GameWrapper({
    game
}: {
    game: Game
}) {

    function updateFen(move: string, previousFen: string): string {
        // need to write this logic
        return GAME_START_FEN;
    }

    const [moveHistory, setMoveHistory] = useState<Move[]>([]);

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



    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
            <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                <ActiveChessBoard position={game.fen.split(' ')[0]}/>
            </div>
            <div className={`w-full lg:col-span-3`}>
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
    )

}