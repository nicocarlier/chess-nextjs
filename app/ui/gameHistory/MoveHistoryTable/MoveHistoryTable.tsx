import { Move } from "@/app/lib/definitions";
import styles from './MoveHistoryTable.module.css'

export default function MoveHistoryTable({ 
    movesTable,
    directMoveUpdate,
    current
  }: { 
    movesTable: (-1 | Move)[];
    directMoveUpdate: Function;
    current: [number, string];
}) {
  
    return (
        movesTable.map((move, i) => {
        if (move === -1){
        return (
            <div key={i} className={`${styles.moveItem} ${styles.moveGap} ${styles.topBorder}`}>
            ...
            </div>
        )
        } else {
            const { moveNumber, white, black } = move;
            const [currNum, currColor] = current;
            const isCurrentWhite = currNum === moveNumber && currColor === 'white';
            const isCurrentBlack = currNum === moveNumber && currColor === 'black';
            return (
                <div
                key={i}
                className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
                >
                    <div className={styles.moveInfo}>
                        <div>{moveNumber}</div>
                        <div className={styles.moveWhiteBlackContainer}>
                        <div className={`${styles.whiteMove} 
                            ${isCurrentWhite ? styles.currentMove : ''}`}
                            onClick={()=>directMoveUpdate(moveNumber,'white')}>
                            White: {white}
                        </div>
                        {
                            black && 
                            <div className={`${styles.blackMove} 
                            ${isCurrentBlack ? styles.currentMove : ''}`}
                            onClick={()=>directMoveUpdate(moveNumber,'black')}>
                            Black: {black}
                            </div>
                        }
                        </div>
                    </div>
                </div>
            )
        }
    })
    )
}