import {authAPI} from "../API/api";
import {shared} from "./common-app-reducer";
// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
const CHANGE_AUTH_DATA = "network/auth/CHANGE-AUTH-DATA";
const TOGGLE_AUTH_TYPE = "TOGGLE-AUTH-TYPE";

// Setting server message as result of handling form
const SET_VALIDATING_MESSAGE = "SET-VALIDATING-MESSAGE";

let initialState = {
    isAuthorised: false,
    currentAuthType: null,
    userLogin: null,
    userId: null,
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

        case SET_VALIDATING_MESSAGE: {
            return {
                ...state,
                authMessage: action.message
            }
        }
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

export const setValidatingMessageAC = (message) => ({
    type: SET_VALIDATING_MESSAGE,
    message
});

export const logOutTC = () =>
    async (dispatch) => {

        dispatch(shared.toggleFetchingAC(true));
        debugger
        const {data} = await authAPI.logOut();
        dispatch(shared.toggleFetchingAC(false));

        dispatch(setValidatingMessageAC(data));
        if (data.resultCode === 101)
            dispatch(setAuthorisedDataAC(null, null, false));
    };


export const toggleAuthTypeTC = (authType) => (dispatch) =>
    dispatch(toggleAuthTypeAC(authType));

export const getMyUserDataTC = () => {
    return async (dispatch) => {

        dispatch(shared.toggleFetchingAC(true));
        let response = await authAPI.getUserData();
        dispatch(shared.toggleFetchingAC(false));

        if (response.data.resultCode === 101) {
            dispatch(setAuthorisedDataAC(response.data.user.id, response.data.user.login, true))
        }
    }
};

export const sendRegisterDataTC = (data) =>
    async (dispatch) => {

        dispatch(shared.toggleFetchingAC(true));
        let {data: body} = await authAPI.sendFormData(data);
        dispatch(shared.toggleFetchingAC(false));

        dispatch(setValidatingMessageAC(body));
        if (body.resultCode === 101) {
            dispatch(setAuthorisedDataAC(body.authorisedUserId, body.authorisedUserName, true))
        }
    };


export default authReducer;