import { inherit } from './inherit.js';
import { Piece } from './piece.js';
import { Slideable } from './slideable.js';

const DIRS = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];

export function Queen(color,square, board){
    this.pieceName = "queen";
    this.type = color.slice(0,1) + "_" + this.pieceName;
    Piece.call(this, color, square, board);
    this.slideable = new Slideable(board);
    this.fenChar = color === "white" ? "Q" : "q";
}

inherit(Piece, Queen);

Queen.prototype.getType = function(){
    return this.type;
}

Queen.prototype.validMoves = function(){
    const color = this.getColor();
    const pos = this.getSquare();
    return this.slideable.calculateMoves(color, pos, DIRS);
}