
// type PieceFenChar = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
// type PromotionPiece = 'N' | 'B' | 'R' | 'Q';

export function algebraicNotation(
  pieceFenChar,
  startSquare,
  endSquare,
  promotionPiece,
  moveTypes
) {

  const {isCapture, isPromotion, isCheck, isCastlingKingSide, isCastlingQueenSide, isCheckmate} = moveTypes;
  let notation = '';

  // Add piece notation
  const pieceNotation = pieceFenChar.toLowerCase() === 'p' ? '' : pieceFenChar.toUpperCase();
  notation += pieceNotation

  // Handle pawn captures
  if (pieceFenChar.toLowerCase() === 'p' && isCapture) {
    notation += startSquare[0]; // file of departure
  }

  // Add 'x' for captures
  if (isCapture) {
    notation += 'x';
  }

  // Add destination square
  notation += endSquare;

  // Handle pawn promotion
  if (isPromotion && promotionPiece) {
    notation += `=${promotionPiece}`;
  }

  // Castling
  if (isCastlingKingSide) {
    notation = 'O-O';
  } else if (isCastlingQueenSide) {
    notation = 'O-O-O';
  }

  // Append check or checkmate symbols
  if (isCheckmate) {
    notation += '#';
  } else if (isCheck) {
    notation += '+';
  }

  return notation;
}