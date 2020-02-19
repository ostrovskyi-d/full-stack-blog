import {applyMiddleware, combineReducers, createStore} from "redux";
import appReducer from "./app-reducer";
import thunk from 'redux-thunk';
import postsReducer from "./posts-reducer";
import { reducer as formReducer } from 'redux-form'
import authReducer from "./auth-reducer";


let reducers = combineReducers({
    init: appReducer,
    postsPage: postsReducer,
    auth: authReducer,
    // form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;