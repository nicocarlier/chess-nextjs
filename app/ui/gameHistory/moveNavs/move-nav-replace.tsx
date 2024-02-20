import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import  styles from './move-nav.module.css'

export default function MoveNavReplace({ 
  currentMove,
  totalMoves,
  directMoveUpdate,
  updateMove,
  moveNavArray
}: { 
  currentMove: number;
  totalMoves: number;
  directMoveUpdate: Function;
  updateMove: Function;
  moveNavArray: number[] | (string | number)[];
}) {
  
  return (
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
        {moveNavArray.map((move, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined; 

          if (index === 0) position = 'first';
          if (index === moveNavArray.length - 1 ) position = 'last';
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
          ${ currentMove >=  totalMoves ?  styles.disabled : ''} 
        `}
        onClick={()=>updateMove(1)}>
          <ArrowRightIcon className="w-4" />
      </div>

    </div>
  );
}