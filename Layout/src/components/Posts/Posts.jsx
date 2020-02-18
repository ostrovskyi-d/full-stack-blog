import React from "react";
import PostItem from "./Post/PostItem";
import Paginator from "../common/Paginator";

const Posts = (props) => {
    const onPageChange = (reqPage) => {
        props.getReqPageTC(reqPage)
    };
    debugger
    const RenderPosts = props => props.posts.map(post =>
        <PostItem
            {...post}
            url={`posts/${post.url}`}
            key={post.id}
        />
    );

    return (
        <>
            <Paginator {...props} onPageChange={onPageChange}/>
            <RenderPosts posts={props.posts.postsStore}/>
        </>
    )
};

export default Posts;