import {authAPI, postsApi} from "../API/api";
// On initialize app (no needed from start, but it would be useful for future)

// Actions Types
const GET_ALL_POSTS = "GET-ALL-POSTS";
const IS_FETCHING = "IS-FETCHING";
const SET_TOTAL_POSTS_COUNT = "SET-TOTAL-POSTS-COUNT";
const GET_REQ_POST = "GET-REQ-POST";
const GET_REQ_PAGE = "GET-REQUESTED-PAGE";
const SET_TOTAL_POSTS = "GET-TOTAL-POSTS";
const SET_PAGES_COUNT = "SET-PAGES-COUNT";
const SET_PAGE_SIZE = "SET-PAGE-SIZE";


let initialState = {
    postsStore: [],
    isFetching: false,
    totalPostsCount: null,
    pageSize: null,
    pagesCount: null,
    requestedPostsPage: 1,
    requestedPost: [],
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
                isFetching: action.isFetching
            }
        }
        case GET_REQ_POST: {
            return {
                ...state,
                postsStore: [action.reqPost]
            }
        }
        case GET_REQ_PAGE: {
            return {
                ...state,
                requestedPostsPage: [action.requestedPostsPage]
            }
        }
        case SET_TOTAL_POSTS: {
            return {
                ...state,
                totalPostsCount: action.postsTotalCount
            }
        }
        case SET_PAGES_COUNT: {
            return {
                ...state,
                pagesCount: action.pagesCount
            }
        }
        case SET_PAGE_SIZE: {
            return {
                ...state,
                pageSize: action.pageSize
            }
        }
        default:
            return state;
    }
};

export const fillPostsStoreAC = (posts) => ({type: GET_ALL_POSTS, posts});
export const isFetchingAC = () => ({type: IS_FETCHING});
// export const setTotalPostsCountAC = () => ({type: SET_TOTAL_POSTS_COUNT});
export const getReqPostAC = (reqPost) => ({type: GET_REQ_POST, reqPost});
// export const requestedPostsPageAC = (requestedPostsPageNumber) => ({type: GET_REQ_PAGE, requestedPostsPageNumber});
export const setTotalPostsAC = (postsTotalCount) => ({type: SET_TOTAL_POSTS, postsTotalCount});
// export const setPagesCountAC = (pagesCount) => ({type: SET_PAGES_COUNT, pagesCount});
export const setPageSizeAC  = (pageSize) => ({type: SET_PAGE_SIZE, pageSize});

export const getPostsPageNumberTC = (pageNumber) =>
    async (dispatch) => {
        dispatch(isFetchingAC(true));
        let {data: {posts}} = await postsApi.getReqPostsPage(pageNumber);
        dispatch(fillPostsStoreAC(posts));
    };

export const requestPostTC = (postName) =>
    async (dispatch) => {
        dispatch(isFetchingAC(true));
        let {data} = await postsApi.getReqPost(postName);
        dispatch(isFetchingAC(false));
        if (data.resultCode === 101) {
            // let {id, title, body, author, url, createdAt} = data.post;
            dispatch(getReqPostAC(data.post))
        }
    };


export const getAllPostsTC = () => {
    return async (dispatch) => {
        dispatch(isFetchingAC(true));
        let {data: {posts, postsTotal, perPage}} = await authAPI.getUserData();
        dispatch(isFetchingAC(false));
        dispatch(setTotalPostsAC(postsTotal));
        dispatch(setPageSizeAC(perPage));
        dispatch(fillPostsStoreAC(posts))
    };
};


export default postsReducer;