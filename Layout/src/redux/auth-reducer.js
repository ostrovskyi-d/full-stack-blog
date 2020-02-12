const SET_CAPTCHA_URL = "network/auth/SET-CAPTCHA-URL";
const SET_USER_DATA   = "network/auth/SET-USER-DATA";
const LOG_IN          = "network/auth/LOG-IN";
const LOG_OUT         = "network/auth/LOG-OUT";
const REGISTER        = "network/auth/REGISTER";

let initialState = {
    authType: 'login',
    userId: null,
    email: null,
    login: null,
    rememberMe: false,
    isAuth: false,
    captchaImgURL: null,
};


let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case LOG_IN: {
            return {
                ...state,
                userId: action.userId,
                isAuth: true,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                ...action.payload
            }
        }
        case SET_CAPTCHA_URL: {
            return {
                ...state,
                captchaImgURL: action.captchaURL
            }
        }
        case REGISTER: {
            return state
        }
        default:
            return state;
    }
};

// export const setUserDataAC = (userId, login, email) => (
//     {
//         type: SET_USER_DATA,
//         data: {userId, login, email}
//     });




export default authReducer;