import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import  styles from './move-nav.module.css'
import { generateMiniPagination, generatePagination, getFullMoveAndColor } from '@/app/lib/utils';

export default function MoveNav({ 
  currHalfMove,
  totalMoves,
  moveUpdater,
}: { 
  currHalfMove: number;
  totalMoves: number;
  moveUpdater: Function;
}) {

  const [currFullMove, _] = getFullMoveAndColor(currHalfMove);
  const smallMoveNavArray =  generateMiniPagination(currFullMove, totalMoves);
  const largeMoveNavArray =  generatePagination(currFullMove, totalMoves);

  return (
    <>
      <div className={styles.miniMoveNavContainer}>
          <Nav 
              currHalfMove={currHalfMove}
              currFullMove={currFullMove}
              totalMoves={totalMoves}
              moveNavArray={smallMoveNavArray}
              moveUpdater={moveUpdater}
          />
      </div>
      <div className={styles.moveNavContainer}>
          <Nav
              currHalfMove={currHalfMove}
              currFullMove={currFullMove}
              totalMoves={totalMoves}
              moveNavArray={largeMoveNavArray}
              moveUpdater={moveUpdater}
          />
      </div>
    </>
  )

}

function Nav({ 
  currHalfMove,
  currFullMove,
  totalMoves,
  moveNavArray,
  moveUpdater,
}: { 
  currHalfMove: number;
  currFullMove: number;
  totalMoves: number;
  moveNavArray: number[] | (string | number)[];
  moveUpdater: Function
}) {
  

  const directToFullMove = (moveNum: number) => {
    const halfMoves = moveNum * 2 - 1;
    moveUpdater(halfMoves)
  }

  const incrementMove = () => {
    const newHalfMove = currHalfMove + 1;
    moveUpdater(newHalfMove);
  }

  const decrementMove = () => {
    // debugger
    const newHalfMove = currHalfMove - 1;
    moveUpdater(newHalfMove);
  }

  console.log("currFullMove: ", currFullMove)
  console.log("currHalfMove: ", currHalfMove)

  return (
    <div className={styles.container}>

      <div 
        className={`
          ${styles.paginationArrow} ${styles.left}
          ${ currHalfMove <= 0  ?  styles.disabled : ''} 
        `}
        onClick={decrementMove}
      >
          <ArrowLeftIcon className="w-4" />
      </div>
      
      <div className="flex -space-x-px">
        {moveNavArray.map((move, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined; 

          if (index === 0) position = 'first';
          if (index === moveNavArray.length - 1 ) position = 'last';
          if (totalMoves === 1) position = 'single';
          if (move === '...') position = 'middle';

          const moveNum = parseInt(move.toString());
          const isActive = currFullMove === move

          return (
            <div className={`
              ${styles.paginationNumber} ${position ? styles[position]: ''}
              ${isActive ? styles.active : ''}
            `}
            onClick={()=>directToFullMove(moveNum)}
            key={index}
            >
              {move}
            </div>
          );
        })}
      </div>

      <div 
        className={`
          ${styles.paginationArrow} ${styles.left}
          ${ currFullMove >=  totalMoves ?  styles.disabled : ''} 
        `}
        onClick={incrementMove}
      >
          <ArrowRightIcon className="w-4" />
      </div>

    </div>
  );
}