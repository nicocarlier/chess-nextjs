import styles from './DragClone.module.css';
// import '../ChessPiece/ChessPiece.css';
import React, { useEffect, useRef, useState } from 'react';
// import { getDragType, getHighlightedSquare, getTouchHighlightedSquare, receiveHighlightedSquare, receiveTouchHighlightedSquare } from '../../store/uiReducer';
// import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { PIECE_IMAGES, PIECE_NAMES, PieceKey } from '@/app/lib/pieceUtils';
import { Piece } from '@/app/lib/chessClasses/piece';
// import { PIECE_IMAGES } from '../../Utils/chessPieces'
// import { findChessSquareFromCoordinates } from '../../Utils/findChessSquare';
// import { useGame } from '../GameContext';

function DragClone( {
    piece, 
    position
}:{
    piece: Piece,
    position: {x: number, y: number}
} ){

    // console.log("DRAG CLONE RE-RENDERED")

    const cloneRef = useRef<HTMLImageElement | null>(null);


    // const highlightedSquare = useSelector(getHighlightedSquare)
    // const touchHighlightedSquare = useSelector(getTouchHighlightedSquare)

    // const dispatch = useDispatch();

    // const pieceType = piece.getType().slice(2);
    // const dragType = useSelector(getDragType);

    // const [enlarged, setEnlarged] = useState('');

    const fenChar = piece?.getFenChar() as PieceKey;
    const imageSrc = PIECE_IMAGES[fenChar] ?? null;

    // console.log("fenChar" , fenChar)
    // console.log("imageSrc" , imageSrc)


    if (piece === null || imageSrc === null) return null;

    useEffect(()=>{
        if (cloneRef.current && position){
            cloneRef.current.style.left = `${position.x}px`;
            cloneRef.current.style.top = `${position.y}px`;
            // const squareBelow = findChessSquareFromCoordinates(position.x, position.y, cloneRef.current)
            // if (dragType === 'touch'){
            //     if (touchHighlightedSquare !== squareBelow){
            //         dispatch(receiveTouchHighlightedSquare(squareBelow));
            //         if (touchHighlightedSquare){
            //             setEnlarged('enlarged');
            //         }
            //     }
            // } else {
            //     if (highlightedSquare !== squareBelow){
            //         dispatch(receiveHighlightedSquare(squareBelow))
            //     }
            // }
        }

    }, [position])

    // const touchDrag = dragType === 'touch' ? 'touchHighlight' : '';
    // const desktop = isDesktop ? 'desktop' : 'non-desktop';
    // only add dragging once a touch drag has left it's square
    // const dragging = dragType === 'mouse' ? 'dragging' : 


    return (
        // <img 
        //     alt={`${piece.getColor()} ${piece.getType()}`}
        //     src={PIECE_IMAGES[piece.getType()]} 
        //     ref={cloneRef}
        //     className={`chess-piece dragging ${pieceType} ${touchDrag} ${enlarged} ${desktop}`}
        // />

        <Image 
            ref={cloneRef}
            alt={PIECE_NAMES[fenChar as PieceKey] ?? 'Chess piece'}
            src={imageSrc}
            className={styles.dragClonePiece}
            width={50}
            height={50}
            unoptimized={true}
            style={{}}
        />
    );

}

export default DragClone;