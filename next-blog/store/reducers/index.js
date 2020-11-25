import {combineReducers} from 'redux';
import commonAppReducer from "../reducers/common-app-reducer";
import authReducer from "../reducers/auth-reducer";
import postsReducer from "../reducers/posts-reducer";
import profileReducer from '../reducers/profile-reducer';
// import commentsReducer from '../reducers/comment-reducer';
import {reducer as formReducer} from "redux-form";

export default combineReducers({
  common: commonAppReducer,
  postsPage: postsReducer,
  auth: authReducer,
  profilePage: profileReducer,
  // comments: commentsReducer,
  form: formReducer
});
