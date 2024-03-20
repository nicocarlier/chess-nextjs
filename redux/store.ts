import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'

import counterReducer from './counterSlice';
import draggingReducer from './draggingSlice';
import uiSlice from './uiSlice';

const rootReducer = combineReducers({         
    // ui: uiReducer,
    // game: gameReducer,
    counter: counterReducer,
    dragging: draggingReducer,
    ui: uiSlice,
});

const additionalMiddleware: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger').default;
    additionalMiddleware.push(logger)
} 

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(additionalMiddleware)
})

export default store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch 