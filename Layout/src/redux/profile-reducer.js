import {usersApi} from "../API/api";

const SET_USER_PROFILE = 'SET-USER-PROFILE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
// const SET_USER_POSTS_STORE = 'SET-USER-POSTS-STORE'

const initialState = {
    userProfile: null,
    isFetching: false
};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {
                ...state,
                userProfile: action.userProfile
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

export const setUserProfileAC = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const toggleFetchingAC = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});

export const getUserProfileTC = (reqUser) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true))
        let {data} = await usersApi.getUserPosts(reqUser);        
        dispatch(setUserProfileAC(data.userData));
        dispatch(toggleFetchingAC(false))
    };

export default profileReducer;
