import { idToPos, posToId, GAME_START_FEN } from '../chessUtils.ts';
import { Bishop } from './bishop.js';
import { King } from './king.js';
import { Knight } from './knight.js';
import { Pawn } from './pawn.js';
import { Queen } from './queen.js';
import { Rook } from './rook.js';

const PIECE_CLASSES = {
    "p": Pawn,
    "r": Rook,
    "n": Knight,
    "b": Bishop,
    "q": Queen,
    "k": King
};

const ALPHA="abcdefghijklmnopqrstuvwxyz"
const NUMERIC = "0123456789"

export class ChessBoard {
    constructor(fen = GAME_START_FEN) {
        const [position, turn, castles, enPassent, halfMove, fullmove] = fen.split(' ');
        this.placePieces(position);
        this.currentTurn = turn;
        this.whiteKingCastle = true;
        this.castleAbilities = {
            whiteQueenSide: castles.includes('Q'),
            whiteKingSide: castles.includes('K'),
            blackQueenSide: castles.includes('q'),
            blackKingSide: castles.includes('k'),
        }
        this.enPassent = enPassent;
        this.halfMove = halfMove;
        this.fullmove = fullmove;

        this.fen = fen;
    }

    placePieces(position) {
        const expandedBoard = position.split('/').map((row)=>{
            const expandedRow = []; 
            let i = 0;
            while ( i < 8 ){
                const char = row[i];
                if (ALPHA.includes(char.toLowerCase())){
                    expandedRow.push(char)
                    i++;
                } else if (NUMERIC.includes(char)){
                    for (let count = parseInt(char) ; count > 0 ; count-- ){
                        expandedRow.push(null);
                        i++;
                    }
                }
            }
            return expandedRow;
        })
        this.boardArray = expandedBoard.map((row, r)=> row.map((square, c) => {
            if (square === null){
                return square;
            } else if (ALPHA.includes(square.toLowerCase())){
                const color = square.toUpperCase() === square ? "white" : "black";
                const PieceClass = PIECE_CLASSES[square.toLowerCase()]
                return new PieceClass(color, [r, c], this);
            }
        }))
    }

    updateFen() {

        const position = getPositionString()

        const fenCastleVals = {
            whiteQueenSide: 'Q',
            whiteKingSide: 'K',
            blackQueenSide: 'q',
            blackKingSide: 'k',
        }

        const castles = Object.entries(this.castleAbilities)
            .filter(([_, value]) => value)
            .map(([key]) => fenCastleVals[key])
            .sort()
            .join('');

        return [position, this.currentTurn, castles, this.enPassent, this.halfMove, this.fullmove].join(' ')
    }

    getPositionString(){
        const rows = [];
        for (const row of this.boardArray){
            let fenRow = '';
            let emptySquareCount = 0;
            for (const square of row) {
                if (square === null) {
                    // Count consecutive empty squares
                    emptySquareCount++;
                } else {
                    // If there were empty squares before, append the count
                    if (emptySquareCount > 0) {
                        fenRow += emptySquareCount;
                        emptySquareCount = 0;
                    }
                    // Append the piece FEN representation
                    fenRow += square.fenChar;
                }
            }
            // If there were empty squares at the end of the row, append the count
            if (emptySquareCount > 0) {
                fenRow += emptySquareCount;
            }
            rows.push(fenRow);
        }
        return rows.join('/')
    }

    getBoard() {
        return this.boardArray;
    }

    getPiece(pos) {
        const board = this.getBoard();
        return board[pos[0]][pos[1]];
    }

    getPieceFromId(id) {
        const [r,c] = idToPos(id);
        const board = this.getBoard();
        return board[r][c];
    }

    // addTakenPiece(piece) {
    //     this.takenPieces.add(piece);
    //     return this.takenPieces;
    // }

    // getTakenPieces() {
    //     return this.takenPieces;
    // }

    // getBoardHash() {
    //     return this.boardArray.map(row => 
    //         row.map(square => {
    //             if (square) {
    //                 return `${square.getPieceName()}-${square.getColor()}`;
    //             }
    //             return "empty";
    //         }).join("_")
    //     ).join("|");
    // }

    // setBoardTo(boardHash) {
    //     boardHash.split("|").forEach((row, r) => {
    //         row.split("_").forEach((square, c) => {
    //             if (square === "empty"){
    //                 this.boardArray[r][c] = null;
    //             } else {
    //                 const [pieceName, color] = square.split("-");
    //                 const PieceClass = pieceClasses[pieceName];
    //                 this.boardArray[r][c] = new PieceClass(color, [r,c], this);
    //             }
    //         });
    //     });
    // }

    whosMove() {
        return this.currentTurn;
    }

    isPlayersMove(piece) {
        return piece.getColor() === this.whosMove();
    }

    switchTurn() {
        const current = this.currentTurn;
        this.currentTurn = current === "w" ? "b" : "w";
    }

    movePiece(startSquare, endSquare, piece) {
        try {
            if (!ChessBoard.isInsideBoard(startSquare) || !ChessBoard.isInsideBoard(endSquare)) {
                throw new Error("Move is outside the board.");
            }
            if (!this.isOccupied(startSquare)) {
                throw new Error("No piece at the start square.");
            }

            const [startRank, startFile] = startSquare;
            const [endRank, endFile] = endSquare;
            
            const isCastling = piece.pieceName === "king" && Math.abs(endFile - startFile) > 1 && piece.firstMove;
            const isBlackMove = piece.getColor() === "black";

            const capturedPiece = this.getPiece(endSquare);

            // Update the moved piece
            this.boardArray[startRank][startFile] = null;
            this.boardArray[endRank][endFile] = piece;
            piece.setSquare(endSquare);

            // Update a captured piece
            if (capturedPiece) {
                capturedPiece.setSquare(null);
                // this.addTakenPiece(capturedPiece);
                capturedPiece.taken = true;
            }

            if (isCastling){
                this.moveCorrespondingRook(piece, endFile);
            }
            
            if (piece.firstMove) piece.firstMove = false;
            
            if (!isCastling){ // (rook move will increment - king shouldn't also increment these)
                this.switchTurn();
                this.halfMove = this.halfMove + 1;
                this.fullmove = isBlackMove ? this.fullmove + 1 : this.fullmove;
                this.updateFen();
            }
            
        } catch (error) {
            console.error(error.message);
        }
    }


    moveCorrespondingRook(piece, endFile){
        // white castling logic
        if (piece.color === "white"){
            if (endFile === 2 && this.castleAbilities.whiteQueenSide){
                const rook = this.getPiece([0,0]);
                this.movePiece([0,0], [0,3], rook)
            } else if (endFile === 6 && this.castleAbilities.whiteKingSide){
                const rook = this.getPiece([0,7]);
                this.movePiece([0,7], [0,5], rook)
            }
        }

        // black castling logic
        if (piece.color === "black"){
            if (endFile === 2 && this.castleAbilities.blackQueenSide){
                const rook = this.getPiece([0,0]);
                this.movePiece([7,0], [7,3], rook)
            } else if (endFile === 6 && this.castleAbilities.blackKingSide){
                const rook = this.getPiece([0,7]);
                this.movePiece([7,7], [7,5], rook)
            }
        }
    }

    isOccupied(pos) {
        if (!ChessBoard.isInsideBoard(pos)) return false;
        const [rank,file] = pos;
        return this.boardArray[rank][file] != null;
    }

    isOccupiedByColor(pos, color) {
        if (!ChessBoard.isInsideBoard(pos)) return false;
        const [rank,file] = pos;
        return this.isOccupied(pos) && this.boardArray[rank][file].color === color;
    }

    squareEmpty(pos) {
        return this.getPiece(pos) === null;
    }

    addCastleOptions(piece, options) {
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
    }

    static isInsideBoard(pos) {
        const [rank,file] = pos;
        return rank >= 0 && rank < 8 && file >= 0 && file < 8;
    }

    static createBoardFromHash(boardHash) {
        const board = new ChessBoard();
        board.setBoardTo(boardHash);
        return board;
    }
}