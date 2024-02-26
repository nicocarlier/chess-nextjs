// import { posToId } from "../Utils/posIdConversion.js";
import { idToPos, posToId } from '../chessUtils.ts';
import { Board } from "./board.js";

export function Piece(color, square, board){
    this.color = color;
    this.square = square;
    this.board = board;
    this.taken = false
}

Piece.prototype.getColor = function(){
    return this.color;
}

Piece.prototype.getSquare = function(){
    return this.square;
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

Piece.prototype.getSquareId = function(){
    return posToId(this.square);
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

Piece.prototype.getMoves = function(){
    const validMoves = this.validMoves();
    const options = new Set();
    const takeOptions = new Set();
    validMoves[0].forEach( pos => {
        if (Board.isInsideBoard(pos)){
            options.add(posToId(pos));
        }
    });
    validMoves[1].forEach( pos => {
        if (Board.isInsideBoard(pos)){
            takeOptions.add(posToId(pos));
        }
    });
    this.board.addCastleOptions(this,options);

    return { options, takeOptions }
}
