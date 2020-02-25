////// initialized: boolean
//------↑- On initialize app (no needed from start, but it would be useful for future)

////// isFetching: boolean
//------↑- Fetching status for listening all data fetching from server

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";
const TOGGLE_FETCHING = "TOGGLE-FETCHING-STATUS";

let initialState = {
    initialized: false,
    isFetching: false
};


export let commonAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case TOGGLE_FETCHING: {
            debugger
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
};

// DRY: SHARED action-creators

export const shared = {
    toggleFetchingAC: isFetching => ({type: TOGGLE_FETCHING, isFetching})
};

export const setInitializedSuccessAC = () => ({type: INITIALIZED_SUCCESS});


export const initializeApp = () => (dispatch) => dispatch(setInitializedSuccessAC());


export default commonAppReducer;
