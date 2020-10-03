import {toggleFetchingAC} from "./reducers/posts-reducer";


export const withFetchToggling = async (dispatch, callback) => {
    dispatch(toggleFetchingAC(true));
    console.log(this)
    let data = await callback;
    dispatch(toggleFetchingAC(false));
    return data;

};
