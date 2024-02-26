import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Piece } from '@/app/lib/chessClasses/piece'

// Define a type for the slice state
interface DraggingState {
  piece: Piece | null,
  position: {x: number, y: number} | null
}

// Define the initial state using that type
const initialState: DraggingState = {
  piece: null,
  position: null
}

interface PieceAndPosition {
  piece: Piece;
  initialPosition: { x: number; y: number };
}

export const draggingSlice = createSlice({
  name: 'dragging',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDraggingPiece: (state, action: PayloadAction<PieceAndPosition> ) => {
      state.piece = action.payload.piece
      state.position = action.payload.initialPosition
    },

    updateDraggingPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (state.position !== null){
        state.position = action.payload;
        // state.position.x = action.payload[1];
      }
    }

  }
})

export const { setDraggingPiece, updateDraggingPosition } = draggingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDraggingPiece = (state: RootState) => state.dragging.piece
export const selectDraggingPosition = (state: RootState) => state.dragging.position

export default draggingSlice.reducer