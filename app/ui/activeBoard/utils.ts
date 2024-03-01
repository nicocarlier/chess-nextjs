// export function getMousePos(e: MouseEvent){
//     let x, y;
//     if ((e.type === 'touchstart' || e.type === 'touchmove' ) && e.touches) {
//         x = e.touches[0].clientX;
//         y = e.touches[0].clientY;  
//     } else if (e.type === 'touchend' && e.changedTouches) {
//         x = e.changedTouches[0].clientX;
//         y = e.changedTouches[0].clientY;  
//     } else {
//         x = e.clientX;
//         y = e.clientY;
//     }
//     return [x, y];
// }

import { ChessBoard } from "@/app/lib/chessClasses/chessBoard";
import { Piece } from "@/app/lib/chessClasses/piece";


// export function mouseDownPos(e: MouseEvent){
//     return [e.clientX, e.clientY];
// }

const RANKS = 'ABCDEFGH';
const FILES = '12345678';

export function mouseMovePos(e: MouseEvent){
    return [e.clientX, e.clientY];
}

export function getSquareBeneathPosition(pos: {x: number, y: number}): string | null {
    const {x, y} = pos
    const elements = document.elementsFromPoint(x, y);
    for (const ele of elements) {
    // document.elementsFromPoint(x, y).forEach((ele=>{
        if (ele.id.length === 2){
            const [rank, file] = ele.id.split('');
            if ( RANKS.includes(rank) && FILES.includes(file) ){
                return ele.id;
            }
        }
    }
    return null;
}


export function playMoveifValid(endSquare: string | null, piece: Piece | null, chessBoard: ChessBoard, userColor: "white" | "black"){
    if (endSquare && piece){
        const moveOptions = piece.getAllMoves()
        if (moveOptions.has(endSquare) && userColor === chessBoard.currentTurn){
            chessBoard.movePiece(piece, endSquare)
        }
    }
}

export const createBoardArray = (userColor: "white" | "black", position: string) => {
    const expandedBoard = position.split(' ')[0].split('/').reverse().map( fenRow => {
        return fenRow.replace(/\d/g, num => '-'.repeat(parseInt(num)) ).split('');
    });

    const WHITE_BOARD = expandedBoard.map((row, r) => row.map((char,c) => {
        const file = String.fromCharCode("A".charCodeAt(0) + c);
        const rank = r + 1;
        const fenChar = char !== '-' ? char : null;
        const pos = [r,c];
        return {file, rank, fenChar, pos};
    }))

    const BLACK_BOARD = [...WHITE_BOARD].reverse().map(row=>[...row].reverse())
    return userColor === "white" ? WHITE_BOARD : BLACK_BOARD;
}

export const consoleLogBoard = (board: { file: string; rank: number; fenChar: string | null; pos: number[]; }[][]): void => {
    const printBoard = [...board].reverse().map(row => {
        return row.map((square) => {
            return square.fenChar ?? ' ';
        }).join(' ');
    }).join('\n\n\n');
    console.log("\n\n", printBoard);
}

export const consoleLogBoardPositions = (board: { file: string; rank: number; fenChar: string | null; pos: number[]; }[][]): void => {
    const printBoard = [...board].reverse().map(row => {
        return row.map((square) => {
            return `${square.file}${square.rank}`
        }).join(' ');
    }).join('\n\n\n');
    console.log("\n\n", printBoard);
}