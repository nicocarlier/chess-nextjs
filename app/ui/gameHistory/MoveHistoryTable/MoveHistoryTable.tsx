// import { moveTableTemp } from "@/app/lib/definitions";
// import styles from './MoveHistoryTable.module.css'

// export default function MoveHistoryTable({ 
//     movesTable,
//     halfMovesTable,
//     currHalfMove,
//     moveUpdater,
//   }: { 
//     movesTable: moveTableTemp;
//     halfMovesTable: ({ move: string; fen: string; halfMove: number; } | null)[];
//     currHalfMove: number;
//     moveUpdater: Function;
// }) {

//     console.log("movesTable", JSON.stringify(movesTable))
//     return (
//         halfMovesTable.map((moveInfo, i) => {

//         if (!moveInfo){
//             return (
//                 <div key={i} className={`${styles.moveItem} ${styles.moveGap} ${styles.topBorder}`}>
//                 ...
//                 </div>
//             )
//         } else {

//             const {move, fen, halfMove} = moveInfo;
//             const isCurrent = halfMove === currHalfMove;

            
//             return (
//                 <div
//                     key={i}
//                     className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
//                 >
//                     <div className={styles.moveInfo}>
//                         <div>{moveNumber}</div>
//                         <div className={styles.moveContainer}>
//                             <MoveTile
//                                 move={white}
//                                 isCurrent={whiteIsCurrent}
//                                 moveUpdater={moveUpdater}
//                             />
//                             {
//                                 black &&
//                                 <MoveTile
//                                     move={black}
//                                     isCurrent={blackIsCurrent}
//                                     moveUpdater={moveUpdater}
//                                 />
//                             }
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     })
//     )
  
//     // return (
//     //     movesTable.map((move, i) => {
//     //     if (!move){
//     //     return (
//     //         <div key={i} className={`${styles.moveItem} ${styles.moveGap} ${styles.topBorder}`}>
//     //         ...
//     //         </div>
//     //     )
//     //     } else {

//     //         const {white, black, moveNumber} = move
//     //         const blackIsCurrent = currHalfMove === black?.halfMove;
//     //         const whiteIsCurrent = currHalfMove === white.halfMove;

//     //         return (
//     //             <div
//     //             key={i}
//     //             className={`${styles.moveItem} ${i !== 0 ? styles.topBorder : ''}`}
//     //             >
//     //                 <div className={styles.moveInfo}>
//     //                     <div>{moveNumber}</div>
//     //                     <div className={styles.moveContainer}>
//     //                         <MoveTile
//     //                             move={white}
//     //                             isCurrent={whiteIsCurrent}
//     //                             moveUpdater={moveUpdater}
//     //                         />
//     //                         {
//     //                             black &&
//     //                             <MoveTile
//     //                                 move={black}
//     //                                 isCurrent={blackIsCurrent}
//     //                                 moveUpdater={moveUpdater}
//     //                             />
//     //                         }
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         )
//     //     }
//     // })
//     // )
// }


// function MoveTile({ 
//     move,
//     isCurrent,
//     moveUpdater
//   }: { 
//     move: {move: string;fen: string; halfMove: number;};
//     isCurrent: boolean;
//     moveUpdater: Function;
//   }) {
  
//     return (
//         <div 
//         className={`${styles.move} ${isCurrent ? styles.currentMove : ''}`}
//         onClick={() => moveUpdater(move.halfMove)}
//         >
//             {move.move}
//         </div>

//     )
// }