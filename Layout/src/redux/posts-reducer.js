import {authAPI} from "../API/api";
import {pureFinalPropsSelectorFactory} from "react-redux/lib/connect/selectorFactory";
// On initialize app (no needed from start, but it would be useful for future)

// Actions Types
const GET_ALL_POSTS = "GET-ALL-POSTS";

let initialState = {
    postsStore: null
};


let postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            return {
                ...state,
                postsStore: action.posts
            }
        }
        default:
            return state;
    }
};

export const fillPostsStoreAC = (posts) => ({type: GET_ALL_POSTS, posts});



export const getAllPostsTC = () => {
    return async (dispatch) => {
        let {data: {posts}} = await authAPI.getUserData();
        dispatch(fillPostsStoreAC(posts))
    };
};



export default postsReducer;