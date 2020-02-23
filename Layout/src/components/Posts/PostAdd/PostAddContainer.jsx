import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {sendCreatedPostTC} from "../../../redux/posts-reducer";
import PostAdd from "./PostAdd";
import {Redirect, withRouter} from 'react-router-dom'
import {compose} from "redux";
import {message} from "antd";

const PostAddContainer = React.memo((props) => {
    const {isAuth, location} = props;
    if(isAuth) return <PostAdd {...props}/>;
    return <Redirect to='/'/>
});

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthorised
});
const mapDispatchToProps = {
    sendCreatedPost: sendCreatedPostTC,
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(PostAddContainer);