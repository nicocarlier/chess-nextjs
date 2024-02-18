'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generateMiniPagination, generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import  styles from './move-nav.module.css'
import { useRouter } from 'next/router';


export default function MoveNav({ 
  totalMoves,
  isMini
}: { 
  totalMoves: number ,
  isMini: boolean
}) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const currentMove = searchParams.get('move') || '1a';
  // "?move=1&color=b"

  const updateMoveURL = (change: 1 | -1) => {

    console.log("IN UPDATE FUNCTION ")
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
    // return `${pathname}?${params.toString()}`;
    replace(`${pathname}?${params.toString()}`)
  }

  const directToMoveURL = (moveNumber: number | string) => {
    console.log("IN DIRECT TO MOVE FUNC ")
    const params = new URLSearchParams(searchParams);
    const currentColor = currentMove.slice(-1);
    console.log("NEW MOVE NUM: ", `${moveNumber}${currentColor}`)
    params.set('move', `${moveNumber}${currentColor}`);
    // return `${pathname}?${params.toString()}`
    replace(`${pathname}?${params.toString()}`)
  }

  const currentMoveNum = parseInt(currentMove.slice(0, -1));
  // const allMoves = [];
  // for (let i = 1; i <= totalMoves; i++) { 
  //   allMoves.push(i);
  // }

  const allMoves = isMini ? 
  generateMiniPagination(currentMoveNum, totalMoves) : 
  generatePagination(currentMoveNum, totalMoves);


  console.log("currentMoveNum ", currentMoveNum)
  return (
    <>
      <div className={styles.container}>
        <PaginationArrow
          direction="left"
          cb={updateMoveURL}
          // href={updateMoveURL(-1)}
          isDisabled={parseInt(currentMove) <= 1}
        />
        
        <div className="flex -space-x-px">
          {allMoves.map((move, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === totalMoves - 1) position = 'last';
            if (totalMoves === 1) position = 'single';
            if (index > 0 && index < totalMoves - 1) position = 'middle';

            // const currentMoveNum = parseInt(currentMove.slice(0, -1));

            return (
              <PaginationNumber
                key={index}
                // href={directToMoveURL(move)}
                cb = {directToMoveURL}
                move={move}
                position={position}
                isActive={currentMoveNum === move}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          cb={updateMoveURL}
          // href={updateMoveURL(1)}
          isDisabled={currentMoveNum >=  totalMoves}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  move,
  cb,
  // href,
  isActive,
  position,
}: {
  move: number | string;
  cb: Function;
  // href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {

  let classes = `${styles.paginationNumber} ${position ? styles[position]: ''}`;
  isActive ? classes += ` ${styles.active}` : '';

  return (
  // isActive || position === 'middle' ? 
  // (
    <div className={classes}
    onClick={()=>{cb(move)}}
    >{move}</div>
  ) 
  // : (
  //   <Link href={href} className={classes}>
  //     {move}
  //   </Link>
  // );
}

function PaginationArrow({
  // href,
  cb,
  direction,
  isDisabled,
}: {
  // href: string;
  cb: Function;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {

  let classes = `${styles.paginationArrow} ${direction ? styles[direction]: ''}`;
  isDisabled ? classes += ` ${styles.disabled}` : '';

  const Icon = direction === 'left' ? ArrowLeftIcon : ArrowRightIcon;

  return (
  // isDisabled ? (
    <div className={classes}
    onClick={()=>cb(direction === 'left' ? -1 : 1)}>
      <Icon className="w-4" />
    </div>
  // ) : (
  //   <Link href={href} className={classes}>
  //     <Icon className="w-4" />
  //   </Link>
  );
}