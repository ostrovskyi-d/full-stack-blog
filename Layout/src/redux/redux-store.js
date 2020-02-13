import {applyMiddleware, combineReducers, createStore} from "redux";
import appReducer from "./app-reducer";
import thunk from 'redux-thunk';
import postsReducer from "./posts-reducer";
let reducers = combineReducers({
    appReducer,
    postsReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;