import { inherit } from './inherit.js';
import { Piece } from './piece.js';

const L_STEPS = [[2,1],[1,2],[-2,1],[1,-2],[-2,-1],[-1,-2],[2,-1],[-1,2]]

export function Knight(color,square, board){
    this.pieceName = "knight";
    this.type = color.slice(0,1) + "_" + this.pieceName;
    Piece.call(this, color, square, board);
    this.fenChar = color === "white" ? "N" : "n";
}

inherit(Piece, Knight);

Knight.prototype.getType = function(){
    return this.type;
}

Knight.prototype.validMoves = function(){
    const [rank, file] = this.getSquare();
    const color = this.getColor()
    const isWhite = color === "white";
    const opponentColor = isWhite ? "black" : "white";
    const options = [];
    const takeOptions = [];

    L_STEPS.forEach(step => {
        const newRank = rank + step[0];
        const newFile = file + step[1];
        const potentialMove = [newRank,newFile]

        if (!this.board.isOccupiedByColor(potentialMove,color)){

            if (this.board.isOccupiedByColor(potentialMove,opponentColor)){
                takeOptions.push(potentialMove);
            } else {
                options.push(potentialMove);
            }

        }
    })

    return [options,takeOptions];
}