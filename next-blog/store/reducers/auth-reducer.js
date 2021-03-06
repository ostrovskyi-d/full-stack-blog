
// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
import {toggleFetchingAC} from "./common-app-reducer";
import {authAPI} from "../../API/api";

const CHANGE_AUTH_DATA = "network/auth/CHANGE-AUTH-DATA";
const TOGGLE_AUTH_TYPE = "TOGGLE-AUTH-TYPE";

// Toggling preloaders
// const TOGGLE_FETCHING = "TOGGLE-FETCHING";

// Setting server message as result of handling form
// const SET_VALIDATING_MESSAGE = "SET-VALIDATING-MESSAGE";

let initialState = {
    isAuthorised: false,
    currentAuthType: null,
    userLogin: null,
    userId: null,
    // isFetching: false,
    authMessage: null,
};


let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_AUTH_DATA: {
            return {
                ...state,
                ...action.data,
                isAuthorised: action.isAuthorised,
                userLogin: action.login,
                userId: action.userId
            }
        }
        case TOGGLE_AUTH_TYPE: {
            return {
                ...state,
                currentAuthType: action.authType
            }
        }
        // case TOGGLE_FETCHING: {
        //     return {
        //         ...state,
        //         isFetching: action.isFetching
        //     }
        // }
        // case SET_VALIDATING_MESSAGE: {
        //     return {
        //         ...state,
        //         authMessage: action.message
        //     }
        // }
        default:
            return state;
    }
};

export const setAuthorisedDataAC = (userId, login, isAuthorised) => ({
    type: CHANGE_AUTH_DATA,
    userId, login, isAuthorised
});
export const toggleAuthTypeAC = (authType) => ({
    type: TOGGLE_AUTH_TYPE,
    authType
});
// export const toggleFetchingAC = (isFetching) => ({
//     type: TOGGLE_FETCHING,
//     isFetching
// });
// export const setValidatingMessageAC = (message) => ({
//     type: SET_VALIDATING_MESSAGE,
//     message
// });

export const logOutTC = () =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        const {data} = await authAPI.logOut();
        // dispatch(setValidatingMessageAC(data));
        if (data.resultCode === 101)
            dispatch(setAuthorisedDataAC(null, null, false));
        dispatch(toggleFetchingAC(false));
    };


export const toggleAuthTypeTC = (authType) => (dispatch) =>
    dispatch(toggleAuthTypeAC(authType));

export const getMyUserDataTC = () =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let response = await authAPI.getUserData();

        if (response.data.resultCode === 101) {
            dispatch(setAuthorisedDataAC(response.data.user.id, response.data.user.login, true))
        }
        dispatch(toggleFetchingAC(false));
    };


export const sendRegisterDataTC = (data) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let response = await authAPI.sendFormData(data);

        if (response.data.resultCode === 101) {
            dispatch(setAuthorisedDataAC(response.data.userId, response.data.userLogin, true))
        }
        dispatch(toggleFetchingAC(false));
    };


export default authReducer;
