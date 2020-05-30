import React, { useEffect } from "react";
import s from "./FullPost.module.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getOnePostTC } from "../../../redux/posts-reducer";
import { compose } from "redux";
import ReactMarkdown from "react-markdown";
import Preloader from "../../common/Preloader";
import CommentsContainer from "../Comments/CommentsContainer";
import Moment from "react-moment";
import {Button} from "antd";
// import ReactJson from 'react-json-view'
import {timeStampPrettifier} from '../../common/helpers/helpers.js';

const FullPost = props => {
    const { match: { params: {postName} }, isFetching, getOnePostTC } = props;

    useEffect(() => {
        getOnePostTC(postName)
    }, [getOnePostTC, postName]);

    return (
        isFetching
            ? <Preloader />
            : props.post.map(post => <RenderPost postName={postName} {...post} key={post.id} />)
    )
};
const RenderPost = (post) => {
    timeStampPrettifier(post.createdAt)
    return (
        <div className={s.post}>
            <div className={s.post_top}>
                <h2 className={s.post_top_title}>
                    {post.title}
                </h2>
            </div>

            <div className={s.post_bottom}>
                <div className={s.post_bottom_author}>

                    {post.author
                        ? <div>Author: <Link to={`/users/${post.author.login}`}>
                            {post.author.login || 'Hacker'}
                        </Link></div>
                        : null
                    }

                </div>
                <div>
                    Created: <Moment date={post.createdAt} />
                </div>

            </div>

            <div className={s.post_body}>
                <ReactMarkdown source={post.body} />
            </div>
            <div className={s.post_bottom_comments}>
                <Link to={`/post/${post.postName}/comments`}><Button>Comments</Button></Link>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    post: state.postsPage.postsStore,
    isFetching: state.common.isFetching
});
const mapDispatchToProps = {
    getOnePostTC
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(FullPost);
