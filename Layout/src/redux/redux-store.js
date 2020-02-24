import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import postsReducer from "./posts-reducer";
import profileReducer from './profile-reducer';
import commentsReducer from './comment-reducer';

let reducers = combineReducers({
    init: appReducer,
    postsPage: postsReducer,
    auth: authReducer,
    profilePage: profileReducer,
    comments: commentsReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;