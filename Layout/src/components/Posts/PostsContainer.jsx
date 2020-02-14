import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getAllPostsTC} from "../../redux/posts-reducer";
import Preloader from "../common/Preloader";


const PostsContainer = (props) => {
    const {posts: {postsStore}, getAllPostsTC} = props;
    useEffect(() => {
        getAllPostsTC()
    }, [getAllPostsTC]);

    if (postsStore.length) return <Posts {...props} />;
    else return <Preloader/>
};

const mapStateToProps = (state) => {
    return {
        posts: state.postsPage
    }
};

const mapDispatchToProps = {
    getAllPostsTC
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);