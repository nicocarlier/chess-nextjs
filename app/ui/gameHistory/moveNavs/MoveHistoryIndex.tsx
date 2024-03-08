import { generateMoveHistoryTablePagination, getFullMoveAndColor, getHalfMovesFromFull } from '@/app/lib/utils';
// import MoveHistoryTable from '../MoveHistoryTable/MoveHistoryTable'
import styles from './MoveHistoryIndex.module.css'
import MoveNav from './move-nav'
import { MoveHistory, playerColors } from '@/app/lib/definitions';
import MoveTable from '../move-table';

export default function MoveHistoryIndex({ 
    moveHistory,
    currHalfMove,
    moveUpdater,
  }: { 
    moveHistory: MoveHistory;
    currHalfMove: number;
    moveUpdater: Function
  }) {

    const [currNum, _] = getFullMoveAndColor(currHalfMove);

    const totalMoves = moveHistory.moves.length;

    const tableMoves = generateMoveHistoryTablePagination(currNum, totalMoves);
    // const movesTable =  tableMoves.map(moveNumber => moveNumber === -1 ? moveNumber : moveHistory.moves[moveNumber - 1]);
    
    const halfMovesTable = [];
    for (let i = 0 ; i < tableMoves.length ; i++ ){
        const num = tableMoves[i];
        if (num === -1){
            halfMovesTable.push(null)
        } else {
            const move = moveHistory.moves[num - 1];
            const {moveNumber, white, black, fenWhite, fenBlack} = move;

            const halfMove = getHalfMovesFromFull(num,"white");
            halfMovesTable.push({move: white, fen: fenWhite, halfMove: halfMove, moveNumber})

            if (black && fenBlack){
                halfMovesTable.push({move: black, fen: fenBlack, halfMove: halfMove + 1, moveNumber})
            }
        }

    }

    const movesTable =  tableMoves.map((moveNum) => {
        if (moveNum === -1){
            return null;
        } else {
            const move = moveHistory.moves[moveNum - 1]
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
                    {/* <MoveHistoryTable 
                        movesTable={movesTable} 
                        halfMovesTable={halfMovesTable}
                        currHalfMove={currHalfMove}
                        moveUpdater={moveUpdater}
                    /> */}

                    {/* <MoveTable
                        halfMovesTable={halfMovesTable}
                        currHalfMove={currHalfMove}
                        moveUpdater={moveUpdater}
                    /> */}
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