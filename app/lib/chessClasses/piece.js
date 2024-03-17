// import { posToId } from "../Utils/posIdConversion.js";
// import { consoleLogBoardArray } from '@/app/ui/activeBoard/utils.js';
import { idToPos, posToId } from '../chessUtils.ts';
// import { Board } from "./board.js";
import { ChessBoard as Board, ChessBoard } from './chessBoard.js';

export function Piece(color, square, board){
    this.color = color;
    this.square = square;
    this.board = board;
    this.taken = false
}

Piece.prototype.getColor = function(){
    return this.color;
}

Piece.prototype.getFen = function(){
    return this.fenChar;
}

// Piece.prototype.getSquare = function(){
//     return this.square;
// }

Piece.prototype.getPos = function(){
    return this.square;
}

Piece.prototype.getSquareId = function(){
    const pos = this.getPos();
    return posToId(pos);
}
Piece.prototype.getType = function(){
    return this.type;
}

Piece.prototype.getPieceName = function(){
    return this.pieceName;
}

Piece.prototype.setSquare = function(pos){
    this.square = pos;
}

Piece.prototype.setBoard = function(board){
    this.board = board;
}

Piece.prototype.getBoard = function(){
    return this.board.board;
}

Piece.prototype.isTaken = function(){
    return this.taken;
}



Piece.prototype.getMoves = function(pos = this.getPos()){
    const [options,takeOptions] = this.validMoves(pos);
    const moveOptions = new Set(options.map((pos)=>posToId(pos)));
    const takingOptions = new Set(takeOptions.map((pos)=>posToId(pos)));
    return { options: moveOptions, takeOptions: takingOptions}
}

// Piece.prototype.getMovesFromPos = function(pos){
//     const [options,takeOptions] = this.validMoves(pos);
//     const moveOptions = new Set(options.map((pos)=>posToId(pos)));
//     const takingOptions = new Set(takeOptions.map((pos)=>posToId(pos)));
//     return { options: moveOptions, takeOptions: takingOptions}
// }

Piece.prototype.validMoves = function(pos = this.getPos()){
    let [options,takeOptions] = this.pieceMoves(pos);
    const [inBoundsOptions,inBoundsTakeOptions] = this.removeOutOfBounds([options,takeOptions]);
    const [obeyCheckOptions,obeyCheckTakeOptions] = this.removeLeaveKingInCheck([inBoundsOptions,inBoundsTakeOptions]);
    return [obeyCheckOptions,obeyCheckTakeOptions];
}

Piece.prototype.removeOutOfBounds = function([options, takeOptions]){
    return [
        options.filter(pos => Board.isInsideBoard(pos)),
        takeOptions.filter(pos => Board.isInsideBoard(pos))
    ];
};

Piece.prototype.allMoveOptions = function(){
    const [options,takeOptions] = this.validMoves();
    const moveArr = [...options, ...takeOptions].map(pos => posToId(pos));
    return new Set(moveArr);
}

Piece.prototype.getFenChar = function(){
    return this.fenChar;
}

Piece.prototype.removeLeaveKingInCheck = function([options,takeOptions]){

    // console.log("removing check options....")

    // console.log(options.map(pos => posToId(pos)).join(','))
    // console.log(takeOptions.map(pos => posToId(pos)).join(','))

    const ourKing = this.getColor() === "white" ? "K" : "k";
    const ourColor = this.getColor();

    const consoleLogBoardArray = (board) => {
        const printBoard = [...board].reverse().map(row => {
            return row.map((square) => {
                return square === null ? 'null' : (square === undefined ? 'und.' : square.getFen());
            }).join(' ');
        }).join('\n\n\n');
        console.log("\n\n", printBoard);
    }

    if (this.board.currentCheck === ourKing){ // remove options that leave the king in check
        const validOptions = [];
        const validTakeOptions = [];

        const boardCopy = new ChessBoard(this.board.getFen());  // make a copy once for simulations
        boardCopy.currentCheck = ourKing;

        // Function to simulate the move
        const simulateMove = (fromPos, toPos, isTake) => {

            // Remember original positions
            const originalPiece = boardCopy.getPiece(toPos);
            // Move the piece
            boardCopy.setPieceAt(toPos, this);
            if (isTake) {
                boardCopy.removePieceAt(toPos);
            }
            boardCopy.removePieceAt(fromPos);
            // Check for check status

            // console.log("checking checkmate");
            // console.log("boardCopy", boardCopy)
            // console.log("boardCopy.boardArray", boardCopy.boardArray)


            // console.log("board array after simulating ");
            // consoleLogBoardArray(boardCopy.boardArray)


            // debugger
            const stillInCheck = boardCopy.isKingInCheck(ourColor);
            // Revert the board
            boardCopy.setPieceAt(fromPos, this);
            boardCopy.setPieceAt(toPos, originalPiece);
            return !stillInCheck; // Return true if this move removes the check
        };

        // Evaluate each standard move
        for (const movePos of options) {

            // console.log("simulating move to ", posToId(movePos));

            if (simulateMove(this.getPos(), movePos, false)) {
                validOptions.push(movePos);
            }
        }

        // Evaluate each take move
        for (const takePos of takeOptions) {
            if (simulateMove(this.getPos(), takePos, true)) {
                validTakeOptions.push(takePos);
            }
        }

        return [validOptions, validTakeOptions];

    } else {
        return [options,takeOptions];   // if not, return the original options
    }
}