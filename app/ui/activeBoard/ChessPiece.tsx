import styles from './ActiveChessBoard.module.css'
import Image, { StaticImageData } from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { fetchCurrentUser } from '@/app/lib/data';
import { useEffect, useRef } from 'react';
import { Piece } from '@/app/lib/chessClasses/piece';

export default function ChessPiece({ 
    fenChar, 
    userColor="white",
    imageSrc,
    piece,
    selected,
    handlePieceClick
    
}: { 
    fenChar: string, 
    userColor: "black" | "white" ,
    imageSrc: StaticImageData,
    piece: Piece,
    selected: true | false,
    // handlePieceClick: EventListenerOrEventListenerObject
    // handlePieceClick: (piece: Piece, e: MouseEvent) => void
    handlePieceClick: any
}) {

    const pieceRef = useRef<HTMLImageElement | null>(null);


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
            alt={PIECE_NAMES[fenChar as PieceKey] ?? 'Chess piece'}
            src={imageSrc}
            className={styles.chessPiece}
            width={50}
            height={50}
            unoptimized={true}
            // placeholder="blur"
        />

    )
}
