import React, {useEffect} from "react";
import s from "./FullPost.module.scss";
// noinspection ES6CheckImport
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getOnePostTC} from "../../../redux/posts-reducer";
import {compose} from "redux";
import ReactMarkdown from "react-markdown";
import Preloader from "../../common/Preloader";

const FullPost = props => {
    const {match: {params}, isFetching} = props;
    useEffect(() => {
        props.getOnePostTC(params.postName)
    }, []);

    return (
        isFetching
            ? <Preloader />
            : props.post.map(post => <RenderPost {...post} key={post.id}/>)
    )
};
const RenderPost = (post) => (
    <div className={s.post}>
        <div className={s.post_top}>
            <h2 className={s.post_top_title}>
                {post.title}
            </h2>
        </div>
        <div className={s.post_body}>
            <ReactMarkdown source={post.body}/>
        </div>
        <div className={s.post_bottom}>
            <div className={s.post_bottom_author}>
                Author:&nbsp;
                <Link to={`/users/${post.author.login}`}>
                    {post.author.login}
                </Link>
            </div>
            <div>
                Created: {post.createdAt}
            </div>
            <div className={s.post_bottom_comments}>
                <Link to='#'>Comments</Link>
            </div>
        </div>
    </div>

)
const mapStateToProps = (state) => ({
    post: state.postsPage.postsStore,
    isFetching: state.postsPage.isFetching
});
const mapDispatchToProps = {
    getOnePostTC
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(FullPost);