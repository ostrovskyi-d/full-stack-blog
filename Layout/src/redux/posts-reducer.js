import {postsApi, authAPI} from '../API/api'
// On initialize app (no needed from start, but it would be useful for future)

// Action Types
const IS_FETCHING = "IS-FETCHING";
const SET_TOTAL_POSTS_COUNT = "SET-TOTAL-POSTS-COUNT";
const GET_REQ_PAGE = "GET-REQ-PAGE";
const SET_PAGES_COUNT = "SET-TOTAL-PAGES-COUNT";
const SET_POSTS_STORE = "GET-PAGE-SIZE";


let initialState = {
    postsStore: [],
    isFetching: false,
    totalPostsCount: null,
    requiredPage: null,
    totalPages: null,
    pageSize: 5,
};


let postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS_STORE: {
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
                isFetching: action.isFetching
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
export const toggleFetchingAC = (isFetching) => ({type: IS_FETCHING, isFetching});
export const setTotalPostsCountAC = (totalPostsCount) => ({type: SET_TOTAL_POSTS_COUNT, totalPostsCount});
export const getReqPageAC = (reqPage) => ({type: GET_REQ_PAGE, reqPage});
export const setTotalPagesAC = (totalPages) => ({type: SET_PAGES_COUNT, totalPages});

export const getOnePostTC = (postName) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let {data} = await postsApi.getReqPost(postName);
        dispatch(toggleFetchingAC(false));
        dispatch(setPostsStoreAC(data.post));
    };

export const getAllPostsTC = () =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let {data} = await authAPI.getUserData();
        dispatch(toggleFetchingAC(false));
        dispatch(setTotalPagesAC(data.totalPages));
        dispatch(getReqPageAC(data.currentPage));
        dispatch(setTotalPostsCountAC(data.totalPostsCount));
        dispatch(setPostsStoreAC(data.posts))
    };

export const getReqPageTC = (reqPage) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let {data} = await postsApi.getReqPage(reqPage);

        dispatch(toggleFetchingAC(false));
        dispatch(setTotalPagesAC(data.totalPages));
        dispatch(setPostsStoreAC(data.posts));
        dispatch(getReqPageAC(data.currentPage));


    };
export const sendCreatedPostTC = (data) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true))
        let response = await postsApi.sendNewPost(data);
        dispatch(toggleFetchingAC(false))
        debugger
    };
export default postsReducer;