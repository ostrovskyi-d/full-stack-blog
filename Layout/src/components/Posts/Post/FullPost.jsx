import React from "react";
import s from "../Posts.module.scss";
import {Link} from "react-router-dom";

const FullPostContainer = props => {

    return <FullPost {...props} />;
};
const FullPost = props =>
    <div className={s.post}>
        <div className={s.top}>
            <h2>
                {props.postTitle}
            </h2>
        </div>
        <div className={s.body}>{props.postBody}</div>
        <div className={s.bottom}>
            <div className={s.author}>
                Author:&nbsp;
                <Link to='/'>
                    {props.author}
                </Link>
            </div>
            <div className={s.comments}>
                <Link to='/'>Comments</Link>
            </div>
        </div>
    </div>
;


export default FullPostContainer;