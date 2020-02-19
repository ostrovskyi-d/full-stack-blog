import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../redux/posts-reducer";
import {compose} from 'redux';

const PostsContainer = (props) => {
    const {
        getAllPostsTC,
    } = props;

    useEffect(() => {
        getAllPostsTC();
    }, [getAllPostsTC]);

    return <Posts {...props} />;
};

const mapStateToProps = (state) => {
    return {
        posts: state.postsPage
    }
};

const mapDispatchToProps = {
    getAllPostsTC,
    getReqPageTC
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(PostsContainer);