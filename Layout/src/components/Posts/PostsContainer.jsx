import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC, requestPostTC} from "../../redux/posts-reducer";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";
import {compose} from 'redux';

const PostsContainer = (props) => {
    const {
        match: {params},
        posts: {postsStore},
        getAllPostsTC,
        requestPostTC,
    } = props;

    useEffect(() => {
        let postName = params.postName;
        if(postName === undefined) getAllPostsTC();
        else requestPostTC(postName);
        debugger
    }, [getAllPostsTC, requestPostTC]);
    debugger
    if (postsStore.length > 1) return <Posts {...props}  />;
    else return <Preloader/>
};

const mapStateToProps = (state) => {
    return {
        posts: state.postsPage
    }
};

const mapDispatchToProps = {
    getAllPostsTC,
    requestPostTC,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(PostsContainer);