import {authAPI, postsApi} from "../API/api";
import {toggleFetchingAC} from "./auth-reducer";
// On initialize app (no needed from start, but it would be useful for future)

// Actions Types
const IS_FETCHING = "IS-FETCHING";
const SET_TOTAL_POSTS_COUNT = "SET-TOTAL-POSTS-COUNT";
const GET_REQ_POST = "GET-REQ-POST";
const GET_REQ_PAGE = "GET-REQ-PAGE";
const SET_PAGES_COUNT = "SET-TOTAL-PAGES-COUNT";
const SET_POSTS_STORE = "GET-PAGE-SIZE";


let initialState = {
    postsStore: [],
    isFetching: false,
    totalPostsCount: null,
    requiredPage: 1,
    totalPages: null,
    pageSize: 5,
};


let postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS_STORE: {
            debugger
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
        case GET_REQ_PAGE: {
            return {
                ...state,
                requiredPage: action.reqPage
            }
        }
        case SET_PAGES_COUNT: {
            return {
                ...state,
                totalPages: action.totalPages
            }
        }
        default:
            return state;
    }
};

export const setPostsStoreAC = (posts) => ({type: SET_POSTS_STORE, posts});
export const isFetchingAC = (isFetching) => ({type: IS_FETCHING, isFetching});
export const setTotalPostsCountAC = (totalPostsCount) => ({type: SET_TOTAL_POSTS_COUNT, totalPostsCount});
// export const getReqPostAC = (reqPost) => ({type: GET_REQ_POST, reqPost});
export const getReqPageAC = (reqPage) => ({type: GET_REQ_PAGE, reqPage});
export const setTotalPagesAC = (totalPages) => ({type: SET_PAGES_COUNT, totalPages});

export const getOnePostTC = (postName) =>
    async (dispatch) => {
        let {data} = await postsApi.getReqPost(postName);
        debugger
        dispatch(setPostsStoreAC(data.post))
    };

export const getAllPostsTC = () => {
    return async (dispatch) => {
        dispatch(isFetchingAC(true));
        let {data} = await authAPI.getUserData();
        dispatch(isFetchingAC(false));
        dispatch(setTotalPagesAC(data.totalPages));
        dispatch(setTotalPostsCountAC(data.totalPostsCount));
        dispatch(setPostsStoreAC(data.posts))
    };
};
export const getReqPageTC = (reqPage) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let {data} = await postsApi.getReqPage(reqPage);
        dispatch(setPostsStoreAC(data.posts));
        dispatch(getReqPageAC(data.reqPage));
        dispatch(toggleFetchingAC(false))
    };
export default postsReducer;