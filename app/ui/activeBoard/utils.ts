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
import { BoardArray } from "../play/GameWrapper";


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
        const moveOptions = piece.allMoveOptions()
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

    const BLACK_BOARD = [...WHITE_BOARD].reverse().map(row=>[...row].reverse());
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

export const consoleLogBoardArray = (board: BoardArray): void => {
    const printBoard = [...board].reverse().map(row => {
        return row.map((square) => {
            return square === null ? ' ' : square.getFen();
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


type PieceFenChar = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
type PromotionPiece = 'N' | 'B' | 'R' | 'Q';

export function generateAlgebraicNotation(
  pieceFenChar: PieceFenChar,
  startSquare: string,
  endSquare: string,
  isCapture: boolean,
  isPromotion: boolean,
  promotionPiece?: PromotionPiece,
  isCheck: boolean = false,
  isCheckmate: boolean = false,
  isCastlingKingSide: boolean = false,
  isCastlingQueenSide: boolean = false
): string {
  let notation = '';

  // Determine piece notation
  const pieceNotation: { [key in PieceFenChar]: string } = {
    'P': '', 'N': 'N', 'B': 'B', 'R': 'R', 'Q': 'Q', 'K': 'K',
    'p': '', 'n': 'N', 'b': 'B', 'r': 'R', 'q': 'Q', 'k': 'K',
  };

  // Add piece notation
  notation += pieceNotation[pieceFenChar];

  // Handle pawn captures
  if (pieceFenChar.toLowerCase() === 'p' && isCapture) {
    notation += startSquare[0]; // file of departure
  }

  // Add 'x' for captures
  if (isCapture) {
    notation += 'x';
  }

  // Add destination square
  notation += endSquare;

  // Handle pawn promotion
  if (isPromotion && promotionPiece) {
    notation += `=${promotionPiece}`;
  }

  // Castling
  if (isCastlingKingSide) {
    notation = 'O-O';
  } else if (isCastlingQueenSide) {
    notation = 'O-O-O';
  }

  // Append check or checkmate symbols
  if (isCheckmate) {
    notation += '#';
  } else if (isCheck) {
    notation += '+';
  }

  return notation;
}

// Example Usage
// console.log(generateAlgebraicNotation('N', 'b1', 'c3', false, false, undefined, false, false, false, false)); // Nc3
// console.log(generateAlgebraicNotation('p', 'e7', 'e8', false, true, 'Q')); // e8=Q
// console.log(generateAlgebraicNotation('R', 'a1', 'a8', true, false)); // Rxa8
// console.log(generateAlgebraicNotation('K', '', '', false, false, undefined, false, false, true, false)); // O-O (King-side castling)
// console.log(generateAlgebraicNotation('K', '', '', false, false, undefined, false, false, false, true)); // O-O-O (Queen-side castling)