import {authAPI, postsApi} from "../API/api";
// On initialize app (no needed from start, but it would be useful for future)

// Actions Types
const GET_ALL_POSTS = "GET-ALL-POSTS";
const IS_FETCHING = "IS-FETCHING";
const SET_TOTAL_POSTS_COUNT = "SET-TOTAL-POSTS-COUNT";

let initialState = {
    postsStore: [],
    isFetching: false,
    totalPostsCount: null,
    requiredPage: 1,
    pageSize: 5
};


let postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            return {
                ...state,
                postsStore: action.posts,
            }
        }
        case SET_TOTAL_POSTS_COUNT: {
            return {
                ...state,
                totalPostsCount: action.totalPostsCount
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
export const isFetchingAC = () => ({type: IS_FETCHING});
export const setTotalPostsCountAC = () => ({type: SET_TOTAL_POSTS_COUNT});

export const requestPosts = () =>
    async (dispatch) => {
        // MOCK
        let data = await postsApi.getPosts();
    }


export const getAllPostsTC = () => {
    return async (dispatch) => {
        dispatch(isFetchingAC());
        let {data: {posts}} = await authAPI.getUserData();
        dispatch(fillPostsStoreAC(posts))
    };
};


export default postsReducer;