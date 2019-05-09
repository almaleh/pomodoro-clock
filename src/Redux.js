import { createStore } from 'redux'

const INC_BREAK = 'INC_BREAK';
const DEC_BREAK = 'DEC_BREAK';
const INC_SESS = 'INC_SESS';
const DEC_SESS = 'DEC_SESS';
const RESET = 'RESET';

const defaultState = {
    breakLength: 5,
    sessionLength: 25,
    durationLeft: 25
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case INC_BREAK:
            {
                let newState = { breakLength: state.breakLength + 1 };
                return Object.assign({}, state, newState);
            }
        case DEC_BREAK:
            {
                let newBreak = Math.max(state.breakLength - 1, 0); 
                let newState = { breakLength: newBreak };
                return Object.assign({}, state, newState);
            }
        case INC_SESS:
            {
                let newState = { sessionLength: state.sessionLength + 1 };
                return Object.assign({}, state, newState);
            }
        case DEC_SESS:
            {
                let newSession = Math.max(state.sessionLength - 1, 0); 
                let newState = { sessionLength: newSession };
                return Object.assign({}, state, newState);
            }
        case RESET:
            {
                let newState = { durationLeft: 25 };
                return Object.assign({}, state, newState);
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

const reset = () => {
    return {
        type: RESET
    }
}

const store = createStore(reducer);

const mapStateToProps = (state) => {
    return {
        breakLength: state.breakLength,
        sessionLength: state.sessionLength,
        durationLeft: state.durationLeft
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
        reset: () => {
            dispatch(reset());
        },
    }
}

export { store, mapStateToProps, mapDispatchToProps }; 