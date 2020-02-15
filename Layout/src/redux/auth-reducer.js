import {authAPI} from "../API/api";
// On initialize app (no needed from start, but it would be useful for future)
// Actions Types
const CHANGE_AUTH_DATA = "network/auth/CHANGE-AUTH-DATA";
const TOGGLE_AUTH_TYPE = "TOGGLE-AUTH-TYPE";
const TOGGLE_FETCHING = "TOGGLE-FETCHING";


let initialState = {
    isAuthorised: false,
    currentAuthType: null,
    userLogin: null,
    userId: null,

    isFetching: false
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

export const setAuthorisedDataAC = (userId, login, isAuthorised) => ({
    type: CHANGE_AUTH_DATA,
    userId, login, isAuthorised
});
export const toggleAuthTypeAC = (authType) => ({
    type: TOGGLE_AUTH_TYPE,
    authType
});
export const toggleFetchingAC = (isFetching) => ({
    type: TOGGLE_FETCHING,
    isFetching
});

export const logOutTC = () =>{
    return async (dispatch) => {
        const {data} = await authAPI.logOut();
        if (data.resultCode === 102)
            dispatch(setAuthorisedDataAC(null, null, false));
    }};

export const toggleAuthTypeTC = (authType) => (dispatch) =>
    dispatch(toggleAuthTypeAC(authType));

export const getMyUserDataTC = () =>{
    return async (dispatch) => {
        let response = await authAPI.getUserData();
        if (response.data.resultCode === 101){
            dispatch(setAuthorisedDataAC(response.data.user.id, response.data.user.login, true))
        }
    }};

export const sendRegisterDataTC = (data) =>
    async (dispatch) => {
        let {data: body} = await authAPI.sendFormData(data);
        console.log(body);
        console.log(data);
        if (body.resultCode === 101) {
            dispatch(setAuthorisedDataAC(body.authorisedUserId, body.authorisedUserName, true))
        }
    };


export default authReducer;