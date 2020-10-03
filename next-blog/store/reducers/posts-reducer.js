// import { postsApi, authAPI } from '../API/api'
import { toggleFetchingAC } from "./common-app-reducer";
// On initialize app (no needed from start, but it would be useful for future)

// Action Types
// const IS_FETCHING = "IS-FETCHING";
const SET_TOTAL_POSTS_COUNT = "SET-TOTAL-POSTS-COUNT";
const GET_REQ_PAGE = "GET-REQ-PAGE";
const SET_PAGES_COUNT = "SET-TOTAL-PAGES-COUNT";
const SET_POSTS_STORE = "GET-PAGE-SIZE";
const SET_MY_POSTS = "SET-MY-POSTS";
const SET_POST_CREATING_STATUS = "posts/SET-POST-CREATING-STATUS";

let initialState = {
    postsStore: [],
    isFetching: false,
    totalPostsCount: null,
    requiredPage: null,
    totalPages: null,
    pageSize: 5,
    status: null
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
        // case IS_FETCHING: {
        //     return {
        //         ...state,
        //         isFetching: action.isFetching
        //     }
        // }
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
        case SET_MY_POSTS: {
            return {
                ...state,
                myPosts: action.myPosts
            }
        }
        case SET_POST_CREATING_STATUS: {
            return {
                ...state,
                status: action.statusMessage
            }
        }
        default:
            return state;
    }
};

export const setPostsStoreAC = (posts) => ({ type: SET_POSTS_STORE, posts });
// export const toggleFetchingAC = (isFetching) => ({type: IS_FETCHING, isFetching});
export const setTotalPostsCountAC = (totalPostsCount) => ({ type: SET_TOTAL_POSTS_COUNT, totalPostsCount });
export const getReqPageAC = (reqPage) => ({ type: GET_REQ_PAGE, reqPage });
export const setTotalPagesAC = (totalPages) => ({ type: SET_PAGES_COUNT, totalPages });
export const setMyPostsAC = (myPosts) => ({ type: SET_MY_POSTS, myPosts });
export const setPostCreatingStatus = (statusMessage) => ({ type: SET_POST_CREATING_STATUS, statusMessage })

export const getOnePostTC = (postName) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let { data } = await postsApi.getReqPost(postName);
        dispatch(setPostsStoreAC(data.post));
        dispatch(toggleFetchingAC(false));
    };

// export const getMyPostsTC = () =>
//     async (dispatch) => {
//         dispatch(toggleFetchingAC(true));
//         let data = await postsApi.getMyPosts();
//         dispatch(toggleFetchingAC(false));
//
//         dispatch(setMyPostsAC(data.posts));
//     };

export const getAllPostsTC = () =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let { data } = await authAPI.getUserData();

        dispatch(setTotalPagesAC(data.totalPages));
        dispatch(getReqPageAC(data.currentPage));
        dispatch(setTotalPostsCountAC(data.totalPostsCount));
        dispatch(setPostsStoreAC(data.posts));
        dispatch(toggleFetchingAC(false));
    };

export const getReqPageTC = (reqPage) =>
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let { data } = await postsApi.getReqPage(reqPage);
        // debugger
        dispatch(setTotalPagesAC(data.totalPages));
        dispatch(setPostsStoreAC(data.posts));
        if(data.currentPage) dispatch(getReqPageAC(data.currentPage));
        dispatch(toggleFetchingAC(false));
    };

// thunk-creator
export const sendCreatedPostTC = (data) =>
    // thunk
    async (dispatch) => {
        dispatch(toggleFetchingAC(true));
        let response = await postsApi.sendNewPost(data);
        dispatch(toggleFetchingAC(false));

        const {data: {resultCode}} = response;
        // promise
        return new Promise((resolve, reject) => {
            if (resultCode === 101) {
                dispatch(setPostCreatingStatus('Post created successfully!'));
                resolve({resolved: true, message: 'Post created successfully!'})
            } else if (resultCode === 102) {
                dispatch(setPostCreatingStatus('Cant\'t create post...'));
                reject()
            }
        })
        .catch(() => ({resolved: false, message: 'Cant\'t create post now, please try again later'}))
    };


export default postsReducer;
