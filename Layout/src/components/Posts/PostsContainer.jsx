import React from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../redux/posts-reducer";
import {compose} from 'redux';
import Preloader from "../common/Preloader";
import {Empty} from "antd";

const PostsContainer = (props) => {
    const {posts} = props;
    if(posts.postsStore.length <= 0) return <Empty />;
    else return <Posts {...props} />;
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
