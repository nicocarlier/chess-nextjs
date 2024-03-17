'use client'

import { generateMoveHistoryTablePagination, getFullMoveAndColor, getHalfMovesFromFull } from '@/app/lib/utils';
import styles from './MoveHistoryIndex.module.css'
import MoveNav from './move-nav'
import { Move } from '@/app/lib/definitions';
import MoveTable from '../move-table';
import React, { useCallback, useEffect, useRef } from 'react';

export default React.memo(function MoveHistoryIndex({ 
    moveHistory,
    currHalfMove,
    moveUpdater,
  }: { 
    moveHistory: Move[];
    currHalfMove: number;
    moveUpdater: Function
  }) {

    // console.log("MOVE HISTORY INDEX RE-RENDERED")

    // const usePreviousProps = (props: any) => {
    //     const ref = useRef();
    //     useEffect(() => {
    //         ref.current = props;
    //     });
    //     return ref.current; // Returns the previous props before the update
    // };

    // const prevProps = usePreviousProps({ moveHistory, currHalfMove, moveUpdater });

    // useEffect(() => {
    //     Object.entries({ moveHistory, currHalfMove, moveUpdater}).forEach(([key, val]) => {
    //         if (prevProps && prevProps[key] !== val) {
    //             console.log(`${key} has changed`);
    //         }
    //     });
    // }, [moveHistory, currHalfMove, moveUpdater]); // Add all props that should trigger the effect


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

})