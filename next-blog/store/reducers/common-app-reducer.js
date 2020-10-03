// import { getMyUserDataTC } from "./auth-reducer";

// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";
const TOGGLE_FETCHING = "TOGGLE-FETCHING";
const SET_AUTHENTICATED = "SET-AUTHENTICATED";

let initialState = {
    initialized: false,
    isFetching: false,
    isAuthenticated: false
};

let commonAppReducer = (state = initialState, action) => {
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
        case SET_AUTHENTICATED: {
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        }
        default:
            return state;
    }
};

export const setInitializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const toggleFetchingAC = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });
export const setAuthenticatedAC = (isAuthenticated) => ({ type: SET_AUTHENTICATED, isAuthenticated });

export const initializeApp = () =>
    async (dispatch) => await dispatch(setInitializedSuccess());

export const authenticateTC = () =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let { data } = await authAPI.getUserData();
        if (data.resultCode === 101) {
            dispatch(setAuthenticatedAC(true));
        }
        dispatch(toggleFetchingAC(false));
    };
export default commonAppReducer;
