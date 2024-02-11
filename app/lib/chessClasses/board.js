import { idToPos, posToId } from '../Utils/posIdConversion.js';
import { Bishop } from './bishop.js';
import { King } from './king.js';
import { Knight } from './knight.js';
import { Pawn } from './pawn.js';
import { Queen } from './queen.js';
import { Rook } from './rook.js';

const pieceClasses = {
    "pawn": Pawn,
    "rook": Rook,
    "knight": Knight,
    "bishop": Bishop,
    "queen": Queen,
    "king": King
};

export function Board(){
    this.board = 
    Array(8).fill(null).map(() => Array(8).fill(null));
    this.placePieces()
    this.takenPieces = new Set();
    this.history = [{move: null, board: this.board}];

    this.whosTurn = "white";
    this.whiteCanCastle = true;
    this.blackCanCastle = true;
}

Board.prototype.placePieces = function() {

    const backRank = ["rook","knight","bishop","queen","king","bishop","knight","rook"];

    backRank.forEach((pieceName, i)=>{
        const PieceClass = pieceClasses[pieceName];
        this.board[0][i] = new PieceClass("white", [0, i], this);
        this.board[7][i] = new PieceClass("black", [7, i], this);
    })
    for (let i = 0; i < 8 ; i++){
        this.board[1][i] = new Pawn("white", [1, i], this);
        this.board[6][i] = new Pawn("black", [6, i], this);
    }
}

Board.prototype.getBoard = function(){
    return this.board;
}

Board.prototype.getPiece = function(pos){
    const board = this.getBoard();
    return board[pos[0]][pos[1]];
}

Board.prototype.getPieceFromId = function(id){
    const [r,c] = idToPos(id);
    const board = this.getBoard();
    return board[r][c];
}

Board.prototype.addTakenPiece = function(piece){
    this.takenPieces.add(piece);
    return this.takenPieces;
}

Board.prototype.getTakenPieces = function(){
    return this.takenPieces;
}

Board.prototype.getBoardHash = function() {
    return this.board.map(row => 
        row.map(square => {
            if (square) {
                return `${square.getPieceName()}-${square.getColor()}`;
            }
            return "empty";
        }).join("_")
    ).join("|");
}

Board.prototype.setBoardTo = function(boardHash){
    boardHash.split("|").forEach((row, r) => {
        row.split("_").forEach((square, c) => {
            if (square === "empty"){
                this.board[r][c] = null;
            } else {
                const [pieceName, color] = square.split("-");
                const PieceClass = pieceClasses[pieceName];
                this.board[r][c] = new PieceClass(color, [r,c], this);
            }
        })
    })
}

// this.playersMove = "white";
// this.whiteCanCastle = true;
// this.blackCanCastle = true;

Board.prototype.whosMove = function(){
    return this.whosTurn;
}

Board.prototype.isPlayersMove = function(piece){
    return piece.getColor() === this.whosMove();
}



Board.prototype.switchTurn = function(){
    if (this.whosTurn === "white"){
        this.whosTurn = "black";
    } else {
        this.whosTurn = "white";
    }
}

Board.prototype.movePiece = function(startSquare, endSquare, piece){
    try {
        if (!Board.isInsideBoard(startSquare) || !Board.isInsideBoard(endSquare)) {
            throw new Error("Move is outside the board.");
        }
        if (!this.isOccupied(startSquare)) {
            throw new Error("No piece at the start square.");
        }

        const [startRank, startFile] = startSquare;
        const [endRank, endFile] = endSquare;
        const capturedPiece = this.getPiece(endSquare);

        // Update the moved piece
        this.board[startRank][startFile] = null;
        this.board[endRank][endFile] = piece;
        piece.setSquare(endSquare);

        // Update a captured piece
        if (capturedPiece) {
            capturedPiece.setSquare(null);
            this.addTakenPiece(capturedPiece);
            capturedPiece.taken = true;
        }


        // if it was a catle, also move the corresponding rook
        if (piece.pieceName === "king" &&  piece.firstMove){
            // debugger
            // const [endRank, endFile] = endSquare;
            const queensideRook = this.getPiece([endRank,0])
            if (endFile  === 2 && queensideRook.firstMove) {
                this.board[endRank][0] = null;
                this.board[endRank][3] = queensideRook;
                queensideRook.setSquare([endRank,3]);
                queensideRook.firstMove = false;
            }

            const kingsideRook = this.getPiece([endRank,7])
            if (endFile  === 6 && kingsideRook.firstMove) {
                this.board[endRank][7] = null;
                this.board[endRank][5] = kingsideRook;
                kingsideRook.setSquare([endRank,5]);
                kingsideRook.firstMove = false;
            }
        }

        if (piece.firstMove) piece.firstMove = false;

        // update move history
        const move = {piece: piece, endSquare}
        const newHistoryEntry = {
            move,
            board: this.board
        };
        const newHistory = [...this.history, newHistoryEntry];
        this.history = newHistory;

        // switch the turn
        this.switchTurn();
        
    } catch (error) {
        console.error(error.message);
    }
}

Board.prototype.isOccupied = function(pos) {
    if (!Board.isInsideBoard(pos)) return false;
    const [rank,file] = pos;
    return this.board[rank][file] != null;
};

Board.prototype.isOccupiedByColor = function(pos, color) {
    if (!Board.isInsideBoard(pos)) return false;
    const [rank,file] = pos;
    return this.isOccupied(pos) && this.board[rank][file].color === color;
};

Board.prototype.squareEmpty = function(pos) {
    return this.getPiece(pos) === null;
};

Board.prototype.addCastleOptions = function(piece, options) {
    if (piece.pieceName === "king" && piece.firstMove){
        const rank = piece.getSquare()[0];

        // Check for queenside castling
        const queensideRook = this.getPiece([rank,0]);
        if (queensideRook && queensideRook.pieceName === "rook" && queensideRook.firstMove){
            if (this.squareEmpty([rank,1]) && 
                this.squareEmpty([rank,2]) && 
                this.squareEmpty([rank,3])) {
                    options.add(posToId([rank,2]));
            }
        }

        // Check for kingside castling
        const kingsideRook = this.getPiece([rank,7]);
        if (kingsideRook && kingsideRook.pieceName === "rook" && kingsideRook.firstMove){
            if (this.squareEmpty([rank,5]) && 
                this.squareEmpty([rank,6])) {
                options.add(posToId([rank,6]));
            }
        }

    }
};

Board.isInsideBoard = function(pos) {
    const [rank,file] = pos;
    return rank >= 0 && rank < 8 && file >= 0 && file < 8;
};

Board.createBoardFromHash = function(boardHash) {
    const board = new Board();
    board.setBoardTo(boardHash);
    return board;
};