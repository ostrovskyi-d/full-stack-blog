import {getMyUserDataTC} from "./auth-reducer";
// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";


let initialState = {
    initialized: false
};


let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS});


export const initializeApp = () => async (dispatch) =>
    await dispatch(setInitializedSuccess());


export default appReducer;