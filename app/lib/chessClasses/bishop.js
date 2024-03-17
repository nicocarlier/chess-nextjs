import { inherit } from './inherit.js';
import { Piece } from './piece.js';
import { Slideable } from './slideable.js';

const DIRS = [[1,1],[1,-1],[-1,1],[-1,-1]];

export function Bishop(color,square,board){
    this.pieceName = "bishop";
    this.type = color.slice(0,1) + "_" + this.pieceName;
    Piece.call(this, color, square, board);
    this.slideable = new Slideable(board);
    this.fenChar = color === "white" ? "B" : "b";
}

inherit(Piece, Bishop);

Bishop.prototype.getType = function(){
    return this.type;
}

// Bishop.prototype.validMoves = function(pos = this.getPos()){
Bishop.prototype.pieceMoves = function(pos = this.getPos()){
    const color = this.getColor();
    // return this.slideable.calculateMoves(color, pos, DIRS);
    const [options,takeOptions] = this.slideable.calculateMoves(color, pos, DIRS);
    return [options,takeOptions];
}