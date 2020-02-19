import React from "react";
import PostItem from "./Post/PostItem";
import Paginator from "../common/Paginator";
import Preloader from "../common/Preloader";

const Posts = (props) => {
    const onPageChange = (reqPage) => {
        props.getReqPageTC(reqPage)
    };
    return (
        <>
            <Paginator {...props} onPageChange={onPageChange}/>
            {props.posts.isFetching
                ? <Preloader/>
                : <RenderPosts posts={props.posts.postsStore}/>
            }
        </>
    )

};

const RenderPosts = props => props.posts.map(post => {
    return <PostItem
        {...post}
        url={`posts/${post.url}`}
        key={post.id}
    />
});
export default Posts;