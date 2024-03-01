import { useCallback, useState, useRef, useEffect } from 'react';
import { useThrottle } from '@/app/lib/hooks/useThrottle'; // Assuming useThrottle is already defined elsewhere
import { ChessBoard } from '../chessClasses/chessBoard';
import { Piece } from '../chessClasses/piece';
import { getSquareBeneathPosition, mouseMovePos, playMoveifValid } from '@/app/ui/activeBoard/utils';

// Custom hook for draggable chess pieces
export function useDraggableChessPiece(chessBoard: ChessBoard, userColor: 'white' | 'black') {
    const [position, setPosition] = useState<null | {x: number, y: number}>(null);
    const [hoverSquare, setHoverSquare] = useState<null | string>(null);
    const [isDragging, setIsDragging] = useState(false);
    const selectedPieceRef = useRef<null | Piece>(null);

    // Logic to start dragging
    const startDrag = useCallback((piece: Piece, e: MouseEvent) => {
        const [x, y] = mouseMovePos(e);
        setIsDragging(true);
        setPosition({ x, y });
        selectedPieceRef.current = piece;
        // Add more logic if needed
    }, []);

    // Logic to handle dragging movement
    const moveActions = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const [x, y] = mouseMovePos(e);
        setPosition({ x, y });
        const squareBelow = getSquareBeneathPosition({ x, y });
        setHoverSquare(squareBelow);
        // Add more logic if needed
    }, [isDragging]);

    // Throttle the moveActions to avoid performance issues
    const throttledMoveActions = useThrottle(moveActions, 60);

    // Logic to end dragging
    const endDrag = useCallback(() => {
        setIsDragging(false);
        setPosition(null);
        setHoverSquare(null);
        // Perform any additional cleanup or actions needed
        const endSquare = hoverSquare;
        const piece = selectedPieceRef.current;
        playMoveifValid(endSquare, piece, chessBoard, userColor);
    }, [hoverSquare, userColor, chessBoard]);

    // Attach and remove event listeners for mouse movement and mouse up
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', throttledMoveActions);
            document.addEventListener('mouseup', endDrag);
        } else {
            document.removeEventListener('mousemove', throttledMoveActions);
            document.removeEventListener('mouseup', endDrag);
        }

        return () => {
            document.removeEventListener('mousemove', throttledMoveActions);
            document.removeEventListener('mouseup', endDrag);
        };
    }, [isDragging, throttledMoveActions, endDrag]);

    return {
        startDrag,
        isDragging,
        position,
        hoverSquare,
    };
}
