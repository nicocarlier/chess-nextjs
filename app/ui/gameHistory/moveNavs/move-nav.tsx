'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generateMiniPagination, generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import  styles from './move-nav.module.css'


export default function MoveNav({ 
  totalMoves,
  isMini
}: { 
  totalMoves: number ,
  isMini: boolean
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMove = searchParams.get('move') || '1a';
  // "?move=1&color=b"

  const updateMoveURL = (change: 1 | -1) => {
    const params = new URLSearchParams(searchParams);
    
    const currentMoveNum = parseInt(currentMove.slice(0, -1));
    const currentColor = currentMove.slice(-1);
    let nextMoveNum = currentMoveNum;
    let nextColor = currentColor;

    if (change === 1) {
      nextColor = (currentColor === 'a') ? 'b' : 'a';
      if (currentColor === 'b') nextMoveNum++;
    } else {
      nextColor = (currentColor === 'b') ? 'a' : 'b';
      if (currentColor === 'a' && currentMoveNum > 1) nextMoveNum--;
    }
    params.set('move', `${nextMoveNum}${nextColor}`);
    return `${pathname}?${params.toString()}`;
  }

  const directToMoveURL = (moveNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    const currentColor = currentMove.slice(-1);
    // console.log("NEW MOVE NUM: ", `${moveNumber}${currentColor}`)
    params.set('move', `${moveNumber}${currentColor}`);
    return `${pathname}?${params.toString()}`
  }

  const currentMoveNum = parseInt(currentMove.slice(0, -1));

  const allMoves = isMini ? 
  generateMiniPagination(currentMoveNum, totalMoves) : 
  generatePagination(currentMoveNum, totalMoves);


  // console.log("currentMoveNum ", currentMoveNum)
  return (
    <>
      <div className={styles.container}>
        <PaginationArrow
          direction="left"
          href={updateMoveURL(-1)}
          isDisabled={parseInt(currentMove) <= 1}
        />
        
        <div className="flex -space-x-px">
          {allMoves.map((move, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            // const numMove = parseInt(move.toString());
            const isLast = index === allMoves.length - 1 
            // debugger

            if (index === 0) position = 'first';
            if (isLast) position = 'last';
            if (totalMoves === 1) position = 'single';
            if (move === '...') position = 'middle';

            return (
              <PaginationNumber
                key={index}
                href={directToMoveURL(move)}
                move={move}
                position={position}
                isActive={currentMoveNum === move}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={updateMoveURL(1)}
          isDisabled={currentMoveNum >=  totalMoves}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  move,
  href,
  isActive,
  position,
}: {
  move: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {

  let classes = `${styles.paginationNumber} ${position ? styles[position]: ''}`;
  isActive ? classes += ` ${styles.active}` : '';

  return isActive || position === 'middle' ? (
    <div className={classes}>{move}</div>
  ) : (
    <Link href={href} className={classes}>
      {move}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {

  let classes = `${styles.paginationArrow} ${direction ? styles[direction]: ''}`;
  isDisabled ? classes += ` ${styles.disabled}` : '';

  const Icon = direction === 'left' ? ArrowLeftIcon : ArrowRightIcon;

  return isDisabled ? (
    <div className={classes}>
      <Icon className="w-4" />
    </div>
  ) : (
    <Link href={href} className={classes}>
      <Icon className="w-4" />
    </Link>
  );
}