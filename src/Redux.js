import { createStore } from 'redux'

const INC_BREAK = 'INC_BREAK';
const DEC_BREAK = 'DEC_BREAK';
const INC_SESS = 'INC_SESS';
const DEC_SESS = 'DEC_SESS';
const START = 'START';
const PAUSE = 'PAUSE';
const RESET = 'RESET';
const UPDATE = 'UPDATE';
const TOGGLE_BREAK = 'TOGGLE_BREAK';
const UPDATE_BREAK = 'UPDATE_BREAK';

const defaultState = {
    breakLength: 5,
    breakDurationLeft: 5,
    sessionLength: 25,
    durationLeft: 25,
    sessionStarted: false,
    breakInProgress: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case INC_BREAK:
            {
                let newBreak = Math.min(state.breakLength + 1, 60);
                let newState = {
                    breakLength: newBreak,
                    breakDurationLeft: newBreak
                };
                return Object.assign({}, state, newState);
            }
        case DEC_BREAK:
            {
                let newBreak = Math.max(state.breakLength - 1, 1);
                let newState = {
                    breakLength: newBreak,
                    breakDurationLeft: newBreak
                };
                return Object.assign({}, state, newState);
            }
        case INC_SESS:
            {
                let newSession = Math.min(state.sessionLength + 1, 60);
                let newState = {
                    sessionLength: newSession,
                    durationLeft: newSession
                };
                return Object.assign({}, state, newState);
            }
        case DEC_SESS:
            {
                let newSession = Math.max(state.sessionLength - 1, 1);
                let newState = {
                    sessionLength: newSession,
                    durationLeft: newSession
                };
                return Object.assign({}, state, newState);
            }
        case START:
            {
                let newState = { sessionStarted: true };
                return Object.assign({}, state, newState);
            }
        case PAUSE:
            {
                let newState = { sessionStarted: false };
                return Object.assign({}, state, newState);
            }
        case RESET:
            {
                return defaultState;
            }
        case UPDATE:
            {
                let newState = { durationLeft: action.durationLeft }
                return Object.assign({}, state, newState);;
            }
        case TOGGLE_BREAK:
            {
                let newState = { 
                    durationLeft: state.sessionLength,
                    breakDurationLeft: state.breakLength,
                    breakInProgress: !state.breakInProgress 
                }
                return Object.assign({}, state, newState);;
            }
        case UPDATE_BREAK:
            {
                let newState = { breakDurationLeft: action.breakDurationLeft }
                return Object.assign({}, state, newState);;
            }
        default: return state;
    }
}

const increaseBreak = () => {
    return {
        type: INC_BREAK
    }
}

const decreaseBreak = () => {
    return {
        type: DEC_BREAK
    }
}

const increaseSession = () => {
    return {
        type: INC_SESS
    }
}

const decreaseSession = () => {
    return {
        type: DEC_SESS
    }
}

const start = () => {
    return {
        type: START
    }
}

const pause = () => {
    return {
        type: PAUSE
    }
}

const reset = () => {
    return {
        type: RESET
    }
}

const updateSession = (durationLeft) => {
    return {
        type: UPDATE,
        durationLeft
    }
}

const toggleBreak = () => {
    return {
        type: TOGGLE_BREAK,
    }
}

const updateBreak = (breakDurationLeft) => {
    return {
        type: UPDATE_BREAK,
        breakDurationLeft
    }
}

const store = createStore(reducer);

const mapStateToProps = (state) => {
    return {
        breakLength: state.breakLength,
        sessionLength: state.sessionLength,
        durationLeft: state.durationLeft,
        breakDurationLeft: state.breakDurationLeft,
        sessionStarted: state.sessionStarted,
        breakInProgress: state.breakInProgress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseBreak: () => {
            dispatch(increaseBreak());
        },
        decreaseBreak: () => {
            dispatch(decreaseBreak());
        },
        increaseSession: () => {
            dispatch(increaseSession());
        },
        decreaseSession: () => {
            dispatch(decreaseSession());
        },
        start: () => {
            dispatch(start());
        },
        pause: () => {
            dispatch(pause());
        },
        reset: () => {
            dispatch(reset());
        },
        updateSession: (durationLeft) => {
            dispatch(updateSession(durationLeft));
        },
        toggleBreak: () => {
            dispatch(toggleBreak());
        },
        updateBreak: (breakDurationLeft) => {
            dispatch(updateBreak(breakDurationLeft));
        }
    }
}

export { store, mapStateToProps, mapDispatchToProps }; 