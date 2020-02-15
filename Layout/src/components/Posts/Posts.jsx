import React from "react";
import Post from "./Post";

const Posts = (props) => {
    const {postsStore: posts} = props.posts;
    // debugger


    return posts.map(post =>
        <Post
            postTitle={post.title}
            postBody={post.body}
            author={post.author}
            url={post.url}
            key={post.id}
        />
    )
};

export default Posts;