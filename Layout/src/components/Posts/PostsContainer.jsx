import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../redux/posts-reducer";
import {compose} from 'redux';
import Preloader from "../common/Preloader";

const PostsContainer = (props) => {
    if (props.postsPage.length <= 0) return <Preloader />;
    return <Posts {...props} />;
};

const mapStateToProps = (state) => {
    return {
        posts: state.postsPage,
        isFetching: state.common.isFetching
    }
};

const mapDispatchToProps = {
    getAllPostsTC,
    getReqPageTC
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PostsContainer);