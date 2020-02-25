// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";
const TOGGLE_FETCHING = "TOGGLE-FETCHING-STATUS";

let initialState = {
    initialized: false,
    isFetching: false
};


let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
};

export const setInitializedSuccessAC = () => ({type: INITIALIZED_SUCCESS});
export const toggleFetchingAC = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});

export const initializeApp = () => async (dispatch) =>
    await dispatch(setInitializedSuccessAC());

export default appReducer;