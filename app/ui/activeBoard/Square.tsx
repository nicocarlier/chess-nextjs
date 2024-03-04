import React from 'react';
import styles from './Square.module.css'
import { StaticImageData } from 'next/image';
import { Piece } from '@/app/lib/chessClasses/piece';
import { ChessBoard } from '@/app/lib/chessClasses/chessBoard';

const Square = React.memo(({
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
}) => {

    return (
        <div></div>
    )
})
