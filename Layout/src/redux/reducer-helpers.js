import {toggleFetchingAC} from "./posts-reducer";

export const withFetchToggling = async (dispatch, callback) => {
    dispatch(toggleFetchingAC(true));
    let data = await callback;
    dispatch(toggleFetchingAC(false));
    return data;

};