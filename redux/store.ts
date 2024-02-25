// import { createStore, combineReducers, applyMiddleware, compose, Store, AnyAction } from 'redux';
import { combineReducers, applyMiddleware, compose} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
// import uiReducer, { UiState } from './uiReducer';
// import gameReducer, { GameState } from './gameReducer';
import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'; 

// import loggerMiddleware from './middleware/logger'
import { Middleware } from 'redux'

// const middleware = [logger]
// const enhancers = applyMiddleware(...middleware)

// export default createStore(rootReducer, enhancers)
import counterReducer from './counterSlice';

const rootReducer = combineReducers({         
    // ui: uiReducer,
    // game: gameReducer,
    counter: counterReducer
});

// const store = configureStore({
//     reducer: rootReducer,
//     // middleware: (getDefaultMiddleware: () => any[]) => getDefaultMiddleware().concat([logger])
// })


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


