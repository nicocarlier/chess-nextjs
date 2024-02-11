import { Board } from "./board";

export class Slideable {
    constructor(board) {
        this.board = board;
    }

    calculateMoves(color, pos, dirs) {
        const isWhite = color === "white";
        const opponentColor = isWhite ? "black" : "white";

        const moves = [];
        const takes = [];

        dirs.forEach((dir) => {
            const dX = dir[0];
            const dY = dir[1];
            let newPos = [pos[0]+dX,pos[1]+dY];

            while (Board.isInsideBoard(newPos) && !this.board.isOccupiedByColor(newPos,color)){
                if (!this.board.isOccupied(newPos)){    // square is empty
                    moves.push(newPos);
                } else if (this.board.isOccupiedByColor(newPos,opponentColor)){ // opponent on square
                    takes.push(newPos);
                    break;
                }

                newPos = [newPos[0]+dX,newPos[1]+dY];
            }

        })

        return [moves,takes];
    }
}