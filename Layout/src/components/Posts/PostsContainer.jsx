import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../redux/posts-reducer";
import {compose} from 'redux';
import Preloader from "../common/Preloader";
import {Empty} from "antd";
import {withRouter} from "react-router-dom";

const PostsContainer = (props) => {
    const {posts, getReqPageTC, match} = props;
    useEffect(()=> {
        getReqPageTC(match.params.page)
    }, [getReqPageTC]);
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
    withRouter
)(PostsContainer);
