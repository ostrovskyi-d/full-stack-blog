import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../redux/posts-reducer";
import Preloader from "../common/Preloader";
import {compose} from 'redux';

const PostsContainer = (props) => {
    const {
        posts: {postsStore},
        getAllPostsTC,
        totalPostsCount,

    } = props;

    useEffect(() => {
        getAllPostsTC();
    }, [getAllPostsTC]);

    if(!(totalPostsCount > 0))
        return <Posts {...props} />;
    else
        return <Preloader />
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