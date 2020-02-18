import React, {useEffect} from "react";
import s from "../Posts.module.scss";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getOnePostTC} from "../../../redux/posts-reducer";
import {compose} from "redux";

const FullPost = props => {
    const {match: {params}} = props;
    useEffect(() => {
        debugger
        props.getOnePostTC(params.postName)
    },[props.getOnePostTC,params.postName]);
    debugger
    return props.post.map(post => <RenderPost {...post} key={post.id} />)
};
const RenderPost = (post) => (
    <div className={s.post}>
        <div className={s.top}>
            <h2>
                <Link to={post.url || '#'}>
                    {post.title}
                </Link>
            </h2>
        </div>
        <div className={s.body}>{post.body}</div>
        <div className={s.bottom}>
            <div className={s.author}>
                Author:&nbsp;
                <Link to='#'>
                    {post.author}
                </Link>
            </div>
            <div className={s.comments}>
                <Link to='#'>Comments</Link>
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