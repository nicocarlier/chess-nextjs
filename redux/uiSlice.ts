import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface UiState {
  sideNavMinimized: boolean
}

// Define the initial state using that type
const initialState: UiState = {
  sideNavMinimized: false
}

export const uiSlice = createSlice({
  name: 'ui',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    minimizeSideNav: state => {
      state.sideNavMinimized = true;
    },
    maximizeSideNav: state => {
      state.sideNavMinimized = false;
    },
  }
})

export const { minimizeSideNav, maximizeSideNav } = uiSlice.actions

export const isSideNavMinimized = (state: RootState) => state.ui.sideNavMinimized

export default uiSlice.reducer