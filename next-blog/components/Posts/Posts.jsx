import PostItem from "./PostItem/PostItem";
import Paginator from "../common/Paginator";
import Preloader from "../common/Preloader";
import {useRouter} from "next/router";
import React from "react";



const Posts = React.memo((props) => {
  const router = useRouter();
  const {posts: {postsStore, pageSize}, isFetching} = props;

  return (
      <>
        {router.pathname !== '/' && <Paginator  {...props} />}
        {isFetching
            ? <Preloader/>
            : <RenderPosts posts={postsStore}/>
        }
      </>
  )

});

export const RenderPosts = React.memo(props => props.posts.map(post => {
  console.log(post)
  return <PostItem
      {...post}
      renderAuthor={true}
      url={`/posts/${post.url}`}
      key={post.id}
  />
}));
export default Posts;
