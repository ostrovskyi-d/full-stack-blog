import {authAPI} from "../API/api";
// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
const CHANGE_AUTH_DATA = "network/auth/SET-USER-DATA";
const TOGGLE_AUTH_TYPE = "TOGGLE-AUTH-TYPE";

let initialState = {
    isAuthorised: false,
    currentAuthType: null,
    userLogin: null,
    userId: null
};


let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_AUTH_DATA: {
            return {
                ...state,
                ...action.data,
                isAuthorised: action.isAuthorised,
                userLogin: action.login,
                userId: action.id
            }
        }

        case TOGGLE_AUTH_TYPE: {
            return {
                ...state,
                currentAuthType: action.authType
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


export const logOutTC = () => (dispatch) =>
    dispatch(setAuthorisedDataAC(null, null, false));

export const toggleAuthTypeTC = (authType) => (dispatch) =>
    dispatch(toggleAuthTypeAC(authType));

export const getMyUserDataTC = () =>
    async (dispatch) => {
        let {data} = await authAPI.getUserData();
        debugger
        if (data.user) {
            dispatch(setAuthorisedDataAC(data.user.id, data.user.login, true))
        }
    };

export const sendRegisterDataTC = (data) =>
    async (dispatch) => {
        let {data: body} = await authAPI.sendFormData(data);
        console.log(body);
        console.log(data);
        if (body.resultCode === 101) {
            dispatch(setAuthorisedDataAC(body.userId, body.userLogin, true))
        }
    };


export default authReducer;