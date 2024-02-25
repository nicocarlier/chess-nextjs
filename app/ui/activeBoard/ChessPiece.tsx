import styles from './ActiveChessBoard.module.css'
import Image, { StaticImageData } from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { fetchCurrentUser } from '@/app/lib/data';
import { useEffect, useRef } from 'react';

export default function ChessPiece({ 
    fenChar, 
    userColor="white",
    imageSrc,
    
}: { 
    fenChar: string, 
    userColor: "black" | "white" ,
    imageSrc: StaticImageData
}) {

    const pieceRef = useRef(null);

    // const handleTouchStart = (e) => {
    //     onTouchDragStart(piece, e);
    // };

    // const handleClickStart = (e) => {
    //     onClickDragStart(piece, e);
    // }

    // useEffect(()=>{
    //     if (draggingPiece === piece){
    //         pieceRef.current.style.visibility = 'hidden';
    //     } else {
    //         pieceRef.current.style.visibility = '';
    //     }

    // }, [draggingPiece])


    // useEffect(() => {
    //     const pieceElement = pieceRef.current;
    //     if (pieceElement) {
    //         const updateEventListeners = () => {
    //             if (!piece.isTaken()) {
    //                 pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    //                 pieceElement.addEventListener('mousedown', handleClickStart, { passive: false });
    //             } else {
    //                 pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
    //                 pieceElement.removeEventListener('mousedown', handleClickStart, { passive: false });
    //             }
    //         };

    //         updateEventListeners();

    //         return () => {
    //             pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
    //             pieceElement.removeEventListener('mousedown', handleClickStart, { passive: false });
    //         };
    //     }
    // }, [piece, takenPieces]);


    return (
        <Image 
            ref={pieceRef}
            alt={PIECE_NAMES[fenChar as PieceKey] ?? 'Chess piece'}
            src={imageSrc}
            className={styles.chessPiece}
            width={50}
            height={50}
            unoptimized={true}
            placeholder="blur"
        />

    )
}
