import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import commonAppReducer from "./common-app-reducer";
import authReducer from "./auth-reducer";
import postsReducer from "./posts-reducer";
import profileReducer from './profile-reducer';
import commentsReducer from './comment-reducer';

let reducers = combineReducers({
    common: commonAppReducer,
    postsPage: postsReducer,
    auth: authReducer,
    profilePage: profileReducer,
    comments: commentsReducer,
    form: formReducer
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
let store = createStore(reducers, enhancer);
window.store = store;

export default store;