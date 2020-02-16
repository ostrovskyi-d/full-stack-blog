import React from "react";
import Post from "./Post/Post";
import {Pagination} from "antd";

const Posts = (props) => {
    const {
        postsStore: posts,
        requestedPost,
    } = props.posts;

    debugger

    const pagination = {
        totalPages: 50,
        current: 1
    };
    const onPaginatorChange = (e) => {
        console.log(`SEND_PAGE_NUMBER:${e}`)
    };
    const RenderPosts = props => props.posts.map(post =>
        <Post
            postTitle={post.title}
            postBody={post.body}
            author={post.author}
            url={`posts/${post.url}`}
            key={post.id}
        />
    );

    return (
        <>
            {requestedPost.length !== 0
                ? <RenderPosts posts={requestedPost}/>
                :  <RenderPosts posts={posts}/>
            }

            <Pagination onChange={onPaginatorChange} defaultCurrent={pagination.current} total={pagination.totalPages}/>

        </>
    )
};

export default Posts;