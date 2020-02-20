import React from 'react';
import {connect} from "react-redux";
import {sendCreatedPostTC} from "../../redux/posts-reducer";
import PostAdd from "./PostAdd";
import {Redirect} from 'react-router-dom'

const PostAddContainer = (props) => {
    const {isAuth} = props;
    if(isAuth) return <PostAdd {...props}/>;
    return <Redirect to='/'/>
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthorised
});
const mapDispatchToProps = {
    sendCreatedPost: sendCreatedPostTC,
};
export default connect(mapStateToProps, mapDispatchToProps)(PostAddContainer);