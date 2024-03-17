import styles from './ActiveChessBoard.module.css'
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { useCallback, useEffect, useRef } from 'react';
import { Piece } from '@/app/lib/chessClasses/piece';
import useSound from 'use-sound';

export default function ChessPiece({ 
    piece,
    handlePieceClick,
}: { 
    piece: Piece;
    handlePieceClick: Function;
}) {

    // console.log("CHESS PIECE RE-RENDERED")

    // const [playMove] = useSound('/sounds/move-self.mp3');

    const pieceRef = useRef<HTMLImageElement | null>(null);

    const fen = piece.getFen();
    const altText = PIECE_NAMES[fen as PieceKey] ?? 'Chess piece';
    const imageSrc = PIECE_IMAGES[fen as PieceKey];

    const handleClickStart = (e: MouseEvent) => {
        handlePieceClick(piece, e);
        // playMove();
    }

    // const handleClickStart = useCallback((e: MouseEvent) => {
    //     handlePieceClick(piece, e);
    //     playMove();
    // }, [handlePieceClick, playMove]);

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
            // onClick={()=>playMove()}
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