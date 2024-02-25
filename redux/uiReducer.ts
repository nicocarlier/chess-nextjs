// CONSTANTS
export const RECEIVE_SELECTED = 'RECEIVE_SELECTED';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';

export const RECEIVE_MOVE_OPTIONS = 'RECEIVE_MOVE_OPTIONS';
export const REMOVE_MOVE_OPTIONS = 'REMOVE_MOVE_OPTIONS';

export const RECEIVE_HIGHLIGHTED_SQUARE  = "RECEIVE_HIGHLIGHTED_SQUARE";
export const REMOVE_HIGHLIGHTED_SQUARE = "REMOVE_HIGHLIGHTED_SQUARE";

export const RECEIVE_TOUCH_HIGHLIGHTED_SQUARE  = "RECEIVE_TOUCH_HIGHLIGHTED_SQUARE";
export const REMOVE_TOUCH_HIGHLIGHTED_SQUARE = "REMOVE_TOUCH_HIGHLIGHTED_SQUARE";

export const RECEIVE_DRAGGING_PIECE = "RECEIVE_DRAGGING_PIECE"
export const REMOVE_DRAGGING_PIECE = "REMOVE_DRAGGING_PIECE"

export const RECEIVE_DRAG_POSITION = "RECEIVE_DRAG_POSITION"
export const REMOVE_DRAG_POSITION = "REMOVE_DRAG_POSITION"

export const RECEIVE_DRAG_TYPE = "RECEIVE_DRAG_TYPE"
export const REMOVE_DRAG_TYPE = "REMOVE_DRAG_TYPE"

export const OPEN_SELECT_TIME_MODAL = "OPEN_SELECT_TIME_MODAL"
export const CLOSE_SELECT_TIME_MODAL = "CLOSE_SELECT_TIME_MODAL"

// ACTION CREATORS
export const receiveSelected = selectedId => {
    return {
        type: RECEIVE_SELECTED,
        payload: selectedId
    };
};

export const removeSelected = () => {
    return {
        type: REMOVE_SELECTED
    };
};

export const receiveMoveOptions = movesObject => {
    return {
        type: RECEIVE_MOVE_OPTIONS,
        payload: movesObject
    };
};

export const removeMoveOptions = () => {
    return {
        type: REMOVE_MOVE_OPTIONS,
    };
};

export const receiveHighlightedSquare = (squareId) => {
    return {
        type: RECEIVE_HIGHLIGHTED_SQUARE,
        payload: squareId
    }
}

export const removeHighlightedSquare  = () => {
    return {
        type: REMOVE_HIGHLIGHTED_SQUARE
    }
}


export const receiveTouchHighlightedSquare = (squareId) => {
    return {
        type: RECEIVE_TOUCH_HIGHLIGHTED_SQUARE,
        payload: squareId
    }
}

export const removeTouchHighlightedSquare  = () => {
    return {
        type: REMOVE_TOUCH_HIGHLIGHTED_SQUARE
    }
}


export const receiveDraggingPiece = (piece) => {
    return {
        type: RECEIVE_DRAGGING_PIECE,
        payload: piece
    }
}

export const removeDraggingPiece = () => {
    return {
        type: REMOVE_DRAGGING_PIECE
    }
}

export const receiveDragPosition = (pos) => {
    return {
        type: RECEIVE_DRAG_POSITION,
        payload: pos
    }
}

export const removeDragPosition = () => {
    return {
        type: REMOVE_DRAG_POSITION,
    }
}

export const receiveDragType = (type) => {
    return {
        type: RECEIVE_DRAG_TYPE,
        payload: type
    }
}

export const removeDragType = () => {
    return {
        type: REMOVE_DRAG_TYPE,
    }
}


export const openSelectTimeModal = () => {
    return {
        type: OPEN_SELECT_TIME_MODAL,
    }
}

export const exitSelectTimeModal = () => {
    return {
        type: CLOSE_SELECT_TIME_MODAL,
    }
}

// SELECTORS
export const getSelected = state => state.ui.selectedId;

export const getMoveOptions = state => state.ui.validMoves;

export const getTakeOptions = state => state.ui.validTakes;

export const getHighlightedSquare = state => state.ui.highlightedSquare;

export const getTouchHighlightedSquare = state => state.ui.touchHighlightedSquare;

export const getDraggingPiece = state => state.ui.draggingPiece;

export const getDragPosition = state => state.ui.dragPosition;

export const getDragType = state => state.ui.dragType;

// REDUCER
const initialState = {
    selectedId: null,
    validMoves: null,
    validTakes: null,
    highlightedSquare: null,
    touchHighlightedSquare: null,
    draggingPiece: null,
    dragPosition: null,
    dragType: null,
    selectTimeModal: false,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SELECTED:
            return {
                ...state,
                selectedId: action.payload
            };
        case REMOVE_SELECTED:
            return {
                ...state,
                selectedId: null,
                validMoves: null,
                validTakes: null,
                highlightedSquare: null
            }
        case RECEIVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: action.payload.options,
                validTakes: action.payload.takeOptions.size ? action.payload.takeOptions : null
            }
        case REMOVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: null,
                validTakes: null
            }
        case RECEIVE_HIGHLIGHTED_SQUARE:
            return {
                ...state,
                highlightedSquare: action.payload
            }
        case REMOVE_HIGHLIGHTED_SQUARE:
            return {
                ...state,
                highlightedSquare: null
            }
        case RECEIVE_TOUCH_HIGHLIGHTED_SQUARE:
            return {
                ...state,
                touchHighlightedSquare: action.payload
            }
        case REMOVE_TOUCH_HIGHLIGHTED_SQUARE:
            return {
                ...state,
                touchHighlightedSquare: null
            }
        case RECEIVE_DRAGGING_PIECE:
            return {
                ...state,
                draggingPiece: action.payload
            }
        case REMOVE_DRAGGING_PIECE:
            return {
                ...state,
                draggingPiece: null
            }
        case RECEIVE_DRAG_POSITION:
            return {
                ...state,
                dragPosition: action.payload
            }
        case REMOVE_DRAG_POSITION:
            return {
                ...state,
                dragPosition: null
            }
        case RECEIVE_DRAG_TYPE:
            return {
                ...state,
                dragType: action.payload
            }
        case REMOVE_DRAG_TYPE:
            return {
                ...state,
                dragType: null
            }
        case OPEN_SELECT_TIME_MODAL:
            return {
                ...state,
                selectTimeModal: true,
            }
        case CLOSE_SELECT_TIME_MODAL:
            return {
                ...state,
                selectTimeModal: false,
            }
        default:
            return state;
    }
};

export default uiReducer;