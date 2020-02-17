import React from "react";
import PostItem from "./Post/PostItem";
import Paginator from "../common/Paginator";

const Posts = props => {
    const {postsStore} = props.posts;

    return <>
        {postsStore.map(post => <PostItem
            postTitle={post.title}
            postBody={post.body}
            author={post.author.login}
            url={`posts/${post.url}`}
            key={post.id}
        />)}
        {postsStore.length === 0
            ? null
            : <Paginator {...props} />

        }
    </>
};

export default Posts;