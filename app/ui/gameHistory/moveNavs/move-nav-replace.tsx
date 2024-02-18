'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { generateMiniPagination, generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import  styles from './move-nav.module.css'
// import { useRouter } from 'next/router';


export default function MoveNavReplace({ 
  totalMoves,
  isMini
}: { 
  totalMoves: number ,
  isMini: boolean
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const parseMoveParam = (moveParam: string | null) => {
    if (!moveParam) return totalMoves;
    const numPart = parseInt(moveParam.slice(0, -1), 10);
    const alphaPart = moveParam.slice(-1);
    return numPart + (alphaPart === 'b' ? 0.5 : 0);
  };

  const moveInbounds = (move: number) => {
    return move > 0 && move <= totalMoves;
  }

  const currentMove = parseMoveParam(searchParams.get('move'));


  const directMoveUpdate = (newMove: number) => {
    const params = new URLSearchParams(searchParams);
    if (moveInbounds(newMove)){
      params.set('move', `${Math.floor(newMove)}a`);
    } 
    replace(`${pathname}?${params.toString()}`)
  }

  const updateMove = (change: 1 | -1) => {
    const params = new URLSearchParams(searchParams);

    const halfMoves = currentMove * 2 + change;
    if (moveInbounds(halfMoves / 2.0)){
      const fullMoves = Math.floor(halfMoves / 2.0);
      const suffix = halfMoves % 2 === 0 ? 'a' : 'b'

      params.set('move', `${Math.round(fullMoves)}${suffix}`);
    } 
    replace(`${pathname}?${params.toString()}`)
  }


  const allMoves = isMini ? 
  generateMiniPagination(Math.floor(currentMove), totalMoves) : 
  generatePagination(Math.floor(currentMove), totalMoves);


  // console.log("currentMoveNum ", currentMove)
  return (
    <>
      <div className={styles.container}>

        <div 
          className={`
            ${styles.paginationArrow} ${styles.left}
            ${ currentMove <= 1 ?  styles.disabled : ''} 
          `}
          onClick={()=>updateMove(-1)}>
            <ArrowLeftIcon className="w-4" />
        </div>
        
        <div className="flex -space-x-px">
          {allMoves.map((move, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined; 

            if (index === 0) position = 'first';
            if (index === allMoves.length - 1 ) position = 'last';
            if (totalMoves === 1) position = 'single';
            if (move === '...') position = 'middle';

            const moveNum = parseInt(move.toString());
            const isActive = Math.floor(currentMove) === move

            return (
              <div className={`
                ${styles.paginationNumber} ${position ? styles[position]: ''}
                ${isActive ? styles.active : ''}
              `}
              onClick={()=>directMoveUpdate(moveNum)}
              >
                {move}
              </div>
            );
          })}
        </div>

        <div 
          className={`
            ${styles.paginationArrow} ${styles.left}
            ${ currentMove >=  totalMoves ?  styles.disabled : ''} 
          `}
          onClick={()=>updateMove(1)}>
            <ArrowRightIcon className="w-4" />
        </div>

      </div>
    </>
  );
}