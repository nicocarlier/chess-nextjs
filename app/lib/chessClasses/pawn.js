import { inherit } from './inherit.js';
import { Piece } from './piece.js';

export function Pawn(color,square, board){
    this.pieceName = "pawn";
    this.type = color.slice(0,1) + "_" + this.pieceName;
    Piece.call(this, color, square, board);
    this.firstMove = true;
    this.fenChar = color === "white" ? "P" : "p";
}

inherit(Piece, Pawn);

Pawn.prototype.getType = function(){
    return this.type;
}

Pawn.prototype.isFirstMove = function(){
    return this.firstMove;
}

Pawn.prototype.validMoves = function(){
    const [rank, file] = this.getSquare();
    const isWhite = this.getColor() === "white";
    const opponentColor = isWhite ? "black" : "white";
    const dir = isWhite ? 1 : -1;
    const options = [];
    const forwardOne = [rank + 1 * dir, file];
    if (!this.board.isOccupied(forwardOne)) {
        options.push(forwardOne);
        const forwardTwo = [rank + 2 * dir, file];
        if (this.isFirstMove() && !this.board.isOccupied(forwardTwo)){
            options.push(forwardTwo);
        }
    }

    const leftDiag = [rank + 1*dir, file - 1*dir];
    const rightDiag = [rank + 1*dir, file + 1*dir];
    const takeOptions = [leftDiag, rightDiag].filter(pos =>
        this.board.isOccupiedByColor(pos, opponentColor)
    )

    return [options,takeOptions];
}