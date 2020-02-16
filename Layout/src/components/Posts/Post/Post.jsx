import React from "react";
import s from "../Posts.module.scss";
import {Link} from "react-router-dom";

const Post = (props) => {
    return (
        <div className={s.post}>
            <div className={s.top}>
                <h2>
                    <Link to={props.url}>
                        {props.postTitle}
                    </Link>
                </h2>
            </div>
            <div className={s.body}>{props.postBody}</div>
            <div className={s.bottom}>
                <div className={s.author}>
                    Author:&nbsp;
                    <Link to={null}>
                        {props.author}
                    </Link>
                </div>
                <div className={s.comments}>
                    <Link to={null}>Comments</Link>
                </div>
            </div>
        </div>
    )
};

export default Post;