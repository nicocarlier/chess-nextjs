import { inherit } from './inherit.js';
import { Piece } from './piece.js';
import { Slideable } from './slideable.js';

const DIRS = [[1,0],[0,1],[-1,0],[0,-1]];

export function Rook(color,square, board){
    this.pieceName = "rook";
    this.type = color.slice(0,1) + "_" + this.pieceName;
    Piece.call(this, color, square, board);
    this.slideable = new Slideable(board);
    this.firstMove = true;
    this.fenChar = color === "white" ? "R" : "r";
}

inherit(Piece, Rook);

Rook.prototype.getType = function(){
    return this.type;
}

// Rook.prototype.validMoves = function(pos = this.getPos()){
Rook.prototype.pieceMoves = function(pos = this.getPos()){
    const color = this.getColor();
    // return this.slideable.calculateMoves(color, pos, DIRS);
    const [options,takeOptions] = this.slideable.calculateMoves(color, pos, DIRS);
    return [options,takeOptions];
}