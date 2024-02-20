'use client'

import React, { useEffect, useState } from "react";
import { MoveHistory } from "@/app/lib/definitions";
import { useRouter, useSearchParams } from 'next/navigation';
import ReplayBoard from "../ReplayBoard/ReplayBoard";
import styles from './ReplayWrapper.module.css';
import MoveNavReplace from "../moveNavs/move-nav-replace";
import MoveHistoryTable from "../MoveHistoryTable/MoveHistoryTable";
import { generateMiniPagination, generateMoveHistoryTablePagination, generatePagination } from "@/app/lib/utils";

export default function StateReplayWrapper({moveHistory}: {moveHistory: MoveHistory}) {

    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const totalMoves = moveHistory.moves.length;
    const lastMove = moveHistory.moves[totalMoves-1];
    const totalHalfMoves = totalMoves * 2 + (lastMove["black"] === "" ? 0 : 1);

    const [currentHalfMove, setCurrentHalfMove] = useState(totalHalfMoves);

    
    const getFullMoveAndColor = (numHalfMoves: number): [number, string] => {
        const fullMoves = Math.floor(numHalfMoves / 2.0);
        const color = numHalfMoves % 2 === 0 ? 'white' : 'black';
        return [fullMoves, color];
    }
    

    console.log("currentHalfMove",currentHalfMove)
    console.log("full move and color: ", ...getFullMoveAndColor(currentHalfMove))

    const getNumHalfMoves = (fullMoves: number, color: string): number => {
        const halfMoves = fullMoves * 2 - (color === "white" ? 1 : 0)
        return halfMoves;
    }
    
    const moveInbounds = (halfMoves: number) => {
        return halfMoves >= 2 && halfMoves <= totalHalfMoves;
    }

    const directMoveUpdate = (newMove: number, color: 'white' | 'black') => {
        const halfMoves = getNumHalfMoves(newMove, color)
        if (moveInbounds(halfMoves)){
            setCurrentHalfMove(halfMoves)
        } 
    }

    const updateMove = (change: 1 | -1) => {
        const newHalfMove = currentHalfMove + change;
        if (moveInbounds(newHalfMove)){
            setCurrentHalfMove(newHalfMove);
        }
    }

    useEffect(() => {
        const handleKeyPress = (event: { key: string; }) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                if (event.key === 'ArrowLeft') {
                    updateMove(-1)
                } else if (event.key === 'ArrowRight') {
                    updateMove(1)
                }
            }
        };
    
        // Add event listener
        window.addEventListener('keydown', handleKeyPress);
    
        // Remove event listener on cleanup
        return () => {
        window.removeEventListener('keydown', handleKeyPress);
        };
    }, [searchParams, replace, totalMoves]); 


    const [currNum, currColor] = getFullMoveAndColor(currentHalfMove);
    const tableMoves = generateMoveHistoryTablePagination(currNum, totalMoves);
    const movesTable =  tableMoves.map(moveNumber => moveNumber === -1 ? moveNumber : moveHistory.moves[moveNumber - 1]);

    const smallMoveNavArray =  generateMiniPagination(currNum, totalMoves);
    const largeMoveNavArray =  generatePagination(currNum, totalMoves);

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
            <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                <ReplayBoard moveHistory={moveHistory}/>
            </div>
            <div className={`w-full lg:col-span-3`}>
                <div className={`${styles.reviewBoardContainer} md:col-span-4`}>
                    <div className={styles.moveListContainer}>
                        <h2 className={`${styles.heading} ${styles.headingMd}`}>
                            Move History
                        </h2>

                        <div className={styles.miniMoveNavContainer}>
                            <MoveNavReplace 
                                currentMove={currNum}
                                totalMoves={totalMoves}
                                directMoveUpdate={directMoveUpdate} updateMove={updateMove}
                                moveNavArray={smallMoveNavArray}
                            />
                        </div>
                        <div className={styles.moveNavContainer}>
                            <MoveNavReplace
                                currentMove={currNum} 
                                totalMoves={totalMoves}
                                directMoveUpdate={directMoveUpdate} updateMove={updateMove}
                                moveNavArray={largeMoveNavArray}
                            />
                        </div>

                        <div className={styles.movesList}>
                            <MoveHistoryTable 
                            movesTable={movesTable} directMoveUpdate={directMoveUpdate}
                            current={[currNum, currColor]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}