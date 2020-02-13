import {authAPI} from "../API/api";
import {pureFinalPropsSelectorFactory} from "react-redux/lib/connect/selectorFactory";
// On initialize app (no needed from start, but it would be useful for future)

// Actions Types
const GET_ALL_POSTS = "GET-ALL-POSTS";
const IS_FETCHING = "IS-FETCHING";


let initialState = {
    postsStore: null,
    isFetching: true
};


let postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            return {
                ...state,
                postsStore: action.posts,
                isFetching: false
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: true
            }
        }
        default:
            return state;
    }
};

export const fillPostsStoreAC = (posts) => ({type: GET_ALL_POSTS, posts});
export const isFetching = () => ({type: IS_FETCHING});


export const getAllPostsTC = () => {
    return async (dispatch) => {
        dispatch(isFetching());
        let {data: {posts}} = await authAPI.getUserData();
        dispatch(fillPostsStoreAC(posts))
    };
};



export default postsReducer;