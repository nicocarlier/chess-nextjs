'use client'

import React, { useEffect } from "react";
import { MoveHistory } from "@/app/lib/definitions";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReplayBoard from "../ReplayBoard/ReplayBoard";
import ReviewBoard from "../review-board";
import styles from '@/app/ui/gameHistory/GameHistoryReview.module.css';

export default function ReplayWrapper({moveHistory}: {moveHistory: MoveHistory}) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const parseMoveParam = function (moveParam: string | null) {
        if (!moveParam) return totalMoves;
        const numPart = parseInt(moveParam.slice(0, -1), 10);
        const alphaPart = moveParam.slice(-1);
        return numPart + (alphaPart === 'b' ? 0.5 : 0);
    };

    const currentMove = parseMoveParam(searchParams.get('move'));
    const totalMoves = moveHistory.moves.length;
    
    const moveInbounds = (move: number) => {
        return move > 0 && move <= totalMoves;
    }

    const directMoveUpdate = (newMove: number, suffix: 'a' | 'b') => {
        const params = new URLSearchParams(searchParams);
        if (moveInbounds(newMove)){
            params.set('move', `${newMove}${suffix}`);
        } 
        replace(`${pathname}?${params.toString()}`)
    }

    const updateMove = (change: 1 | -1) => {
        const params = new URLSearchParams(searchParams);
        const halfMoves = currentMove * 2 + change;
        if (moveInbounds(halfMoves / 2.0)){
            const fullMoves = Math.floor(halfMoves / 2.0);
            const suffix = halfMoves % 2 === 0 ? 'a' : 'b'
            params.set('move', `${fullMoves}${suffix}`);
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

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
            <div className={`w-full lg:col-span-5 ${styles.boardContainer}`}>
                <ReplayBoard moveHistory={moveHistory}/>
            </div>
            <div className={`w-full lg:col-span-3 ${styles.sidePanel}`}>
                <ReviewBoard moveHistory={moveHistory}/>
            </div>
        </div>
    )

}