// import { createStore, combineReducers, applyMiddleware, compose, Store, AnyAction } from 'redux';
// import thunk, { ThunkMiddleware } from 'redux-thunk';
import uiReducer, { UiState } from './uiReducer';
import gameReducer, { GameState } from './gameReducer';
import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'; 

// export interface RootState {
//     ui: UiState;
//     game: GameState;
// }

// const rootReducer = combineReducers<RootState>({
//     ui: uiReducer,
//     game: gameReducer
// });

// const rootReducer = combineReducers({
//     ui: uiReducer,
//     game: gameReducer
// });

// Define the root action type
// export type RootAction = AnyAction;

// Define the thunk type
// export type ThunkResult<R> = ThunkMiddleware<RootState, RootAction, R>;

// let enhancer;

// if (process.env.NODE_ENV === 'production') {
//     enhancer = applyMiddleware(thunk as ThunkResult<void>);
// } else {
//     enhancer = compose(
//         applyMiddleware(thunk as ThunkResult<void>, logger),
//         (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//     );
// }


export const store = configureStore({
    reducer: {
        ui: uiReducer,
        game: gameReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


