import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'

import counterReducer from './counterSlice';

const rootReducer = combineReducers({         
    // ui: uiReducer,
    // game: gameReducer,
    counter: counterReducer
});

const additionalMiddleware: Middleware[] = [];

// console.log("environment type: ", process.env.NODE_ENV)
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