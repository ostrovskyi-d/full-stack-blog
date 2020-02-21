import React, {useEffect} from "react";
import s from "../Posts.module.scss";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getOnePostTC} from "../../../redux/posts-reducer";
import {compose} from "redux";
import ReactMarkdown from "react-markdown";

const FullPost = props => {
    const {match: {params}} = props;
    useEffect(() => {
        props.getOnePostTC(params.postName)
    }, []);
    return props.post.map(post => <RenderPost {...post} key={post.id}/>)
};
const RenderPost = (post) => (
    <div>
        <div className={s.post}>
            <div className={s.top}>
                <h2>
                    <Link to={post.url || '#'}>
                        {post.title}
                    </Link>
                </h2>
            </div>
            <div className={s.body}>
                <ReactMarkdown source={post.body}/>
            </div>
            <div className={s.bottom}>
                <div className={s.author}>
                    Author:&nbsp;
                    <Link to='#'>
                        {post.author.login}
                    </Link>
                </div>
                <div className={s.comments}>
                    <Link to='#'>Comments</Link>
                </div>
            </div>
        </div>
    </div>
)
const mapStateToProps = (state) => ({
    post: state.postsPage.postsStore
});
const mapDispatchToProps = {
    getOnePostTC
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(FullPost);