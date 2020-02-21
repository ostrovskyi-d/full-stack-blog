import React from "react";
import PostItem from "./Post/PostItem";
import Paginator from "../common/Paginator";
import Preloader from "../common/Preloader";

const Posts = (props) => {
    return (
        <>
            <Paginator {...props} />
            {props.posts.isFetching
                ? <Preloader/>
                : <RenderPosts posts={props.posts.postsStore}/>
            }
        </>
    )

};

export const RenderPosts = React.memo(props => props.posts.map(post => {
    return <PostItem
        {...post}
        url={`/posts/${post.url}`}
        key={post.id}
    />
}));
export default Posts;