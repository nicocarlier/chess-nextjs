'use client'

import React, { useEffect } from "react";
import { MoveHistory } from "@/app/lib/definitions";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReplayBoard from "../ReplayBoard/ReplayBoard";
import styles from './ReplayWrapper.module.css';
import MoveNavReplace from "../moveNavs/move-nav-replace";
import MoveHistoryTable from "../MoveHistoryTable/MoveHistoryTable";
import { generateMiniPagination, generateMoveHistoryTablePagination, generatePagination } from "@/app/lib/utils";

export default function ReplayWrapper({moveHistory}: {moveHistory: MoveHistory}) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const parseMoveParam = function (moveParam: string | null) {
        if (!moveParam) return totalMoves;
        const numPart = parseInt(moveParam.slice(0, -1), 10);
        const alphaPart = moveParam.slice(-1);
        return numPart * 2 + (alphaPart === 'b' ? 1 : 0);
    };

    const currentHalfMove = parseMoveParam(searchParams.get('move')) || 0;
    const totalMoves = moveHistory.moves.length;
    const lastMove = moveHistory.moves[totalMoves-1];
    const totalHalfMoves = totalMoves * 2 + (lastMove["black"] === "" ? 0 : 1);
    
    const moveInbounds = (halfMoves: number) => {
        return halfMoves >= 2 && halfMoves <= totalHalfMoves;
    }

    const directMoveUpdate = (newMove: number, suffix: 'a' | 'b') => {
        const params = new URLSearchParams(searchParams);
        const halfMoves = newMove * 2 - (suffix === "a" ? 1 : 0)
        if (moveInbounds(halfMoves)){
            params.set('move', `${newMove}${suffix}`);
        } 
        replace(`${pathname}?${params.toString()}`)
    }

    const fullMoveAndSuffix = (numHalfMoves: number): [number, string] => {
        const fullMoves = Math.floor(numHalfMoves / 2.0);
        const suffix = numHalfMoves % 2 === 0 ? 'a' : 'b';
        return [fullMoves, suffix];
    }

    const updateMove = (change: 1 | -1) => {
        const params = new URLSearchParams(searchParams);
        if (currentHalfMove === 0 ){
            if (change === 1){
                params.set('move', `1a`);
            }
        } else {
            const halfMoves = currentHalfMove + change;
            const [fullMoves, suffix] = fullMoveAndSuffix(halfMoves);
            if (moveInbounds(halfMoves)){
                params.set('move', `${fullMoves}${suffix}`);
            } else if (fullMoves === 0){
                params.set('move', `0`);
            }
        }
        replace(`${pathname}?${params.toString()}`)
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


    const [currNum, currColor] = fullMoveAndSuffix(currentHalfMove);
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