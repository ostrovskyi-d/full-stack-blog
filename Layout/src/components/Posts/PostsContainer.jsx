import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getPostsPageNumberTC, requestPostTC} from "../../redux/posts-reducer";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";
import {compose} from 'redux';

const PostsContainer = (props) => {
    // ------ DESTRUCT PROPS ------ //
    const {
        posts: {isFetching},
        getAllPostsTC,
        getPostsPageNumberTC
    } = props;

    // ------ EFFECTS ------ //
    useEffect(() => {
        getAllPostsTC();
    }, [getAllPostsTC, props.posts.postsStore]);

    // ------ CUSTOM FUNCTIONS ------ //
    const onPostsPageChange = (pageNumber) => {
        getPostsPageNumberTC(pageNumber);
    };

    // ------ RENDERING ------ //
    if (isFetching)
        return <Preloader/>;
    else
        return <Posts {...props} onPostsPageChange={onPostsPageChange}/>;
};

const mapStateToProps = (state) => {
    return {
        posts: state.postsPage
    }
};

const mapDispatchToProps = {
    getAllPostsTC,
    requestPostTC,
    getPostsPageNumberTC
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(PostsContainer);