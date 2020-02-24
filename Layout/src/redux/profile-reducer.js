import {usersApi} from "../API/api";

const SET_USER_PROFILE = 'SET-USER-PROFILE';
// const SET_USER_POSTS_STORE = 'SET-USER-POSTS-STORE'

const initialState = {
    userProfile: null,

};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {
                ...state,
                userProfile: action.userProfile
            }
        }

        default:
            return state;
    }
};

export const setUserProfileAC = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
// export const setUserPostsAC = (userPosts) => ({type: SET_USER_POSTS_STORE, userPosts});

export const getUserProfileTC = (reqUser) =>
    async (dispatch) => {
        let {data} = await usersApi.getUserPosts(reqUser);
        dispatch(setUserProfileAC(data.userData));
    };

export default profileReducer;
