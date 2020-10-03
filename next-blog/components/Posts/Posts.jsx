 ;
import PostItem from "./PostItem/PostItem";
import Paginator from "../common/Paginator";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";

const Posts = React.memo((props) => {
    const {posts: {postsStore, pageSize}, isFetching, history} = props;
    return (
        <>
            {history.location.pathname !== '/' && <Paginator  {...props} />}
            {isFetching
                ? <Preloader/>
                : <RenderPosts posts={postsStore}/>
            }
        </>
    )

});

export const RenderPosts = React.memo(props => props.posts.map(post => {
    return <PostItem
        {...post}
        renderAuthor={true}
        url={`/posts/${post.url}`}
        key={post.id}
    />
}));
export default withRouter(Posts);
