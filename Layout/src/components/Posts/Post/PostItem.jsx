import React from "react";
import s from "../Posts.module.scss";
import {Link} from "react-router-dom";

const PostItem = (props) => {
    debugger
    return (
        <div className={s.post}>
            <div className={s.top}>
                <h2>
                    <Link to={props.url}>
                        {props.title}
                    </Link>
                </h2>
            </div>
            <div className={s.body}>{props.body}</div>
            <div className={s.bottom}>
                <div className={s.author}>
                    Author:&nbsp;
                    <Link to='#'>
                        {props.author}
                    </Link>
                </div>
                <div className={s.comments}>
                    <Link to='#'>Comments</Link>
                </div>
            </div>
        </div>
    )
};

export default PostItem;