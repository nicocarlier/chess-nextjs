// import { generateAlgebraicNotation } from '@/app/ui/activeBoard/utils.js';
import { idToPos, posToId, GAME_START_FEN } from '../chessUtils.ts';
import { Bishop } from './bishop.js';
import { King } from './king.js';
import { Knight } from './knight.js';
import { Pawn } from './pawn.js';
import { Queen } from './queen.js';
import { Rook } from './rook.js';

import { algebraicNotation } from './utils.js';

const PIECE_CLASSES = {
    "p": Pawn,
    "r": Rook,
    "n": Knight,
    "b": Bishop,
    "q": Queen,
    "k": King
};



export const FEN_TO_OBJECT = {
    "p": { class: Pawn, color: "black"},
    "r": { class: Rook, color: "black"},
    "n": { class: Knight, color: "black"},
    "b": { class: Bishop, color: "black"},
    "q": { class: Queen, color: "black"},
    "k": { class: King, color: "black"},
    "P": { class: Pawn, color: "white"},
    "R": { class: Rook, color: "white"},
    "N": { class: Knight, color: "white"},
    "B": { class: Bishop, color: "white"},
    "Q": { class: Queen, color: "white"},
    "K": { class: King, color: "white"},
};

const CASTLE_MOVES = {
    'G1': { castleType: 'K', rookStartPos: [0,7], rookEndPos: [0,5], inverseType: 'Q'},
    'C1': { castleType: 'Q', rookStartPos: [0,0], rookEndPos: [0,3], inverseType: 'K'},
    'G8': { castleType: 'k', rookStartPos: [7,7], rookEndPos: [7,5], inverseType: 'q'},
    'C8': { castleType: 'q', rookStartPos: [7,0], rookEndPos: [7,3], inverseType: 'k'}
};

export class ChessBoard {
    constructor(fen = GAME_START_FEN) {
        const [position, turn, castles, enPassent, halfMove, fullmove] = fen.split(' ');
        this.placePieces(position);
        this.currentTurn = turn === 'w' ? 'white' : 'black';
        this.whiteKingCastle = true;
        this.castleAbilities = {
            Q: castles.includes('Q'),
            K: castles.includes('K'),
            q: castles.includes('q'),
            k: castles.includes('k'),
        }
        this.enPassent = enPassent;
        this.halfMove = parseInt(halfMove);
        this.fullmove = parseInt(fullmove);

        this.fen = fen;
    }

    placePieces(position) {
        const expandedBoard = position.split(' ')[0].split('/').reverse().map( fenRow => {
            return fenRow.replace(/\d/g, num => '-'.repeat(parseInt(num)) ).split('');
        });

        this.boardArray = expandedBoard.map((row, r)=> row.map((square, c) => {
            if (square === '-'){
                return null;
            } else {
                const color = square.toUpperCase() === square ? "white" : "black";
                const PieceClass = PIECE_CLASSES[square.toLowerCase()]
                return new PieceClass(color, [r, c], this);
            }
        }))
    }

    updateFen() {
        const position = this.getPositionString()

        const castles = Object.entries(this.castleAbilities)
            .filter(([_, value]) => value)
            .map(([key,_]) => key)
            .sort()
            .join('');

        this.fen = [position, this.currentTurn, castles, this.enPassent, this.halfMove, this.fullmove].join(' ');
        return this.fen;
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
        return rows.reverse().join('/')
    }

    getBoard() {
        return this.boardArray;
    }

    getFen() {
        return this.fen;
    }

    getPosition() {
        return this.fen.split(' ')[0];
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

    whosMove() {
        return this.currentTurn;
    }

    isPlayersMove(piece) {
        return piece.getColor() === this.whosMove();
    }

    switchTurn() {
        const newTurn = this.currentTurn === 'black' ? 'white' : 'black';
        this.currentTurn = newTurn;
    }

    movePiece(piece, endSquare) {

        // debugger 

        // define variables
        const startSquare = piece.getSquareId();
        const startPos = piece.getSquare();
        const endPos = idToPos(endSquare);

        // throw errors
        if (startSquare === endSquare){
            console.log('move nowhere')
            return
        }
        if (!ChessBoard.isInsideBoard(startPos) || !ChessBoard.isInsideBoard(endPos)) {
            throw new Error("Move is outside the board.");
        }
        if (!this.isOccupied(startPos)) {
            throw new Error("No piece at the start square.");
        }

        // determine move type 
        const isCapture = this.getPiece(endPos) !== null;
        
        const isPromotion = false;  //  temporary
        let promotionPiece;
        
        const isCheck = false;  //  temporary
        
        const isCheckmate = false;  //  temporary
        
        const castleMove = CASTLE_MOVES[endSquare];
        const isCastle = piece.pieceName === "king" && piece.firstMove && castleMove;
        const isCastlingKingSide = isCastle && castleMove.castleType.toLowerCase() === 'k';
        const isCastlingQueenSide = isCastle && castleMove.castleType.toLowerCase() === 'q';

        const isEnPassent = false;  //  temporary

        // play corresponding move type
        if (isCastle){
            console.log("castle move made!")
            this.playCastleMove(CASTLE_MOVES[endSquare], startPos, endPos);
        } else if (isCapture){
            console.log("capture move made!")
            this.playTakeMove(startPos, endPos);
        } else if (isEnPassent){
            return null
        } else if (isPromotion){
            return null
        } else {
            console.log("normal move made!")
            this.playNormalMove(startPos, endPos);
        }

        // update board states
        if (piece.firstMove) piece.firstMove = false;
        this.switchTurn();
        this.halfMove = this.halfMove + 1;
        this.fullmove = piece.getColor() === "black" ? this.fullmove + 1 : this.fullmove;
        this.updateFen();

        // return the move expression
        const moveExpression = algebraicNotation(
            piece.getFen(), startSquare.toLowerCase(), endSquare.toLowerCase(), 
            isCapture, isPromotion, promotionPiece, isCheck, isCheckmate, isCastlingKingSide, isCastlingQueenSide
        );
        return moveExpression
    }


    playNormalMove( [startRank, startFile], [endRank, endFile] ){
        const piece = this.boardArray[startRank][startFile];
        this.boardArray[endRank][endFile] = piece;
        this.boardArray[startRank][startFile] = null;
        
        piece.setSquare([endRank, endFile]);
    }

    playTakeMove( [startRank, startFile], [endRank, endFile] ){
        const piece = this.boardArray[startRank][startFile];
        const capturePiece = this.boardArray[endRank][endFile];

        capturePiece.setSquare(null);

        this.boardArray[endRank][endFile] = piece;
        this.boardArray[startRank][startFile] = null;
        
        piece.setSquare([endRank, endFile]);
    }

    playCastleMove(castleMove, [startRank, startFile], [endRank, endFile]){
        // destructure variables
        const {castleType, inverseType, rookStartPos, rookEndPos } = castleMove;
        const [rookStartRank, rookStartFile] = rookStartPos;
        const [rookEndRank, rookEndFile] = rookEndPos;

        // move king 
        const king = this.boardArray[startRank][startFile];
        this.boardArray[endRank][endFile] = king;
        this.boardArray[startRank][startFile] = null;

        // move rook
        const rook = this.boardArray[rookStartRank][rookStartFile];
        this.boardArray[rookEndRank][rookEndFile] = rook;
        this.boardArray[rookStartRank][rookStartFile] = null;

        // update firstMove and castle properties
        king.firstMove = false;
        rook.firstMove = false;
        this.castleAbilities[castleType] = false;
        this.castleAbilities[inverseType] = false;
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

}