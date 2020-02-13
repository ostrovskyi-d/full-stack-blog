import React from "react";
import Post from "./Post";

const Posts = (props) => {
    let {postsStore: posts} = props;
    return <>
        {
            props.postsStore.map(post =>
                <Post
                    postTitle={post.title}
                    postBody={post.body}
                    author={post.author}
                />
            )
        }
    </>
};

export default Posts;