import {authAPI} from "../API/api";
// On initialize app (no needed from start, but it would be useful for future)

// Actions Types
const SET_USER_DATA = "network/auth/SET-USER-DATA";
const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

let initialState = {
    initialized: false,
    isAuthorised: false,
    user: {login: null, id: null}
};


let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuthorised: true,
                user: {login: action.login, id: action.id}
            }
        }
        default:
            return state;
    }
};

export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const setAuthorisedDataAC = (userId, login) => ({type: SET_USER_DATA, data: {userId, login}});


export const getMyUserDataThunkCreator = () => {
    return async (dispatch) => {
        let {data} = await authAPI.getUserData();
        // console.log(data);
        if (data.user) {
            dispatch(setAuthorisedDataAC(data.user.id, data.user.login))
        }
        dispatch(setInitializedSuccess())
    };
};

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getMyUserDataThunkCreator());
    Promise.all([promise])
        .then(() => dispatch(setInitializedSuccess()))
};


export default appReducer;