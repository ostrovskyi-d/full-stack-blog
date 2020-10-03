import PostItem from "./PostItem/PostItem";
import Paginator from "../common/Paginator";
import Preloader from "../common/Preloader";
import {useRouter} from "next/router";


const Posts = React.memo((props) => {
    const router = useRouter();
    // const {history} = router;
    console.log(router)
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
    console.log(props)
    return <PostItem
        {...post}
        renderAuthor={true}
        url={`/posts/${post.url}`}
        key={post.id}
    />
}));
export default Posts;
