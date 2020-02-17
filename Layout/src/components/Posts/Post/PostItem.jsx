import React from "react";
import s from "../Posts.module.scss";

const PostItem = React.memo(props => {
    const {url, postTitle, postBody, author} = props;

    return (
        <div className={s.post}>
            <div className={s.top}>
                <h2>
                    <a href={url}>
                        {postTitle}
                    </a>
                </h2>
            </div>
            <div className={s.body}>{postBody}</div>
            <div className={s.bottom}>
                <div className={s.author}>
                    Author:&nbsp;
                    <a href='/'>
                        {author}
                    </a>
                </div>
                <div className={s.comments}>
                    <a href='/'>Comments</a>
                </div>
            </div>
        </div>
    )
});

export default PostItem;