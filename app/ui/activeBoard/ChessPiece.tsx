import styles from './ActiveChessBoard.module.css'
import Image, { StaticImageData } from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '../../lib/pieceUtils'
import { fetchCurrentUser } from '@/app/lib/data';
import { useEffect, useRef } from 'react';
import { Piece } from '@/app/lib/chessClasses/piece';
import { useSelector } from 'react-redux';
import { selectDraggingPiece } from '@/redux/draggingSlice';
import { useDraggableChessPiece } from '@/app/lib/hooks/useDraggableChessPiece';
import { ChessBoard } from '@/app/lib/chessClasses/chessBoard';

export default function ChessPiece({ 
    fenChar, 
    userColor="white",
    imageSrc,
    piece,
    selected,
    isDragging,
    handlePieceClick,
    chessBoard
    
}: { 
    fenChar: string;
    userColor: "black" | "white";
    imageSrc: StaticImageData;
    piece: Piece;
    selected: boolean;
    isDragging: boolean;
    handlePieceClick: Function;
    chessBoard: ChessBoard;
}) {

    const pieceRef = useRef<HTMLImageElement | null>(null);

    // const { startDrag, position, hoverSquare } = useDraggableChessPiece(chessBoard, userColor);

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

    if (isDragging){
        return null;
    }
    


    return (
        <Image 
            ref={pieceRef}
            alt={PIECE_NAMES[fenChar as PieceKey] ?? 'Chess piece'}
            src={imageSrc}
            className={styles.chessPiece}
            width={50}
            height={50}
            unoptimized={true}
        />

    )
}
