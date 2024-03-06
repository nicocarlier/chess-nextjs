import styles from './ActiveChessBoard.module.css'
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { useEffect, useRef } from 'react';
import { Piece } from '@/app/lib/chessClasses/piece';

export default function ChessPiece({ 
    piece,
    handlePieceClick,
}: { 
    piece: Piece;
    handlePieceClick: Function;
}) {

    const pieceRef = useRef<HTMLImageElement | null>(null);

    const fen = piece.getFen();
    const altText = PIECE_NAMES[fen as PieceKey] ?? 'Chess piece';
    const imageSrc = PIECE_IMAGES[fen as PieceKey];

    const handleClickStart = (e: MouseEvent) => {
        handlePieceClick(piece, e);
    }

    useEffect(() => {
        const pieceElement = pieceRef.current;
        if (pieceElement !== null) {
            const updateEventListeners = () => {
                if (!piece.isTaken()) {
                    // pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });
                    pieceElement.addEventListener('mousedown', handleClickStart);
                } else {
                    // pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
                    pieceElement.removeEventListener('mousedown', handleClickStart);
                }
            };

            updateEventListeners();

            return () => {
                // pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
                pieceElement.removeEventListener('mousedown', handleClickStart);
            };
        }
    }, [piece]);

    return (
        <Image 
            ref={pieceRef}
            alt={altText}
            src={imageSrc!}
            className={styles.chessPiece}
            // width={50}
            // height={50}
            unoptimized={true}
        />
    )
}