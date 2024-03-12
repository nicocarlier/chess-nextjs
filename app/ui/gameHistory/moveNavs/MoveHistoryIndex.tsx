'use client'

import { generateMoveHistoryTablePagination, getFullMoveAndColor, getHalfMovesFromFull } from '@/app/lib/utils';
import styles from './MoveHistoryIndex.module.css'
import MoveNav from './move-nav'
import { Move } from '@/app/lib/definitions';
import MoveTable from '../move-table';
import { useCallback, useEffect } from 'react';

export default function MoveHistoryIndex({ 
    moveHistory,
    currHalfMove,
    moveUpdater,
  }: { 
    moveHistory: Move[];
    currHalfMove: number;
    moveUpdater: Function
  }) {

    const [currNum, _] = getFullMoveAndColor(currHalfMove);
    const totalMoves = moveHistory.length;
    const tableMoves = generateMoveHistoryTablePagination(currNum, totalMoves);


    // Use useCallback to memoize the event handler, so it gets updated when currHalfMove changes
    const handleKeyPress = useCallback((event: { key: string; }) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            const newHalfMove = event.key === 'ArrowLeft' ? currHalfMove - 1 : currHalfMove + 1;
            moveUpdater(newHalfMove);
        }
    }, [currHalfMove, moveUpdater]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress); // Use the memoized event handler
        return () => {
            window.removeEventListener('keydown', handleKeyPress); // Clean up with the same memoized handler
        };
    }, [handleKeyPress]);

    const movesTable =  tableMoves.map((moveNum) => {
        if (moveNum === -1){
            return null;
        } else {
            const move = moveHistory[moveNum - 1]
            const {moveNumber, white, black, fenWhite, fenBlack} = move;
            const whiteHalfmove = getHalfMovesFromFull(moveNumber,"white");
            const blackHalfMove = whiteHalfmove + 1;
            const blackMove = black && fenBlack ? {move: black, fen: fenBlack, halfMove: blackHalfMove} : null;
            const whiteMove = {move: white, fen: fenWhite, halfMove: whiteHalfmove}
            return {white: whiteMove, black: blackMove, moveNumber}
        }
    })

    const tooSmallForNav = totalMoves < 2;

    return (
        <div className={`${styles.reviewBoardContainer} md:col-span-4`}>
            <div className={styles.moveListContainer}>
                <h2 className={`${styles.heading} ${styles.headingMd}`}>
                    Move History
                </h2>

                { !tooSmallForNav &&
                    <MoveNav
                        currHalfMove={currHalfMove}
                        totalMoves={totalMoves}
                        moveUpdater={moveUpdater}
                    />
                }

                <div className={styles.movesList}>
                    <MoveTable
                        movesTable={movesTable}
                        currHalfMove={currHalfMove}
                        moveUpdater={moveUpdater}
                    />
                </div>
            </div>
        </div>
    )

}