import React from "react";
import s from "../Posts.module.scss";
import {Link, NavLink, Redirect} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import {Button, Icon} from "antd";


const PostItem = (props) => {
    return (
        <div className={s.post_item}>
            <div className={s.top}>
                <h2>
                    <NavLink to={props.url}>
                        {props.title}
                    </NavLink>
                </h2>
                <div className="buttons">
                    <Button size='small' shape='round' type='primary'>
                        <Icon type='edit'/>
                        Edit
                    </Button>
                    <Button size='small' shape='round' type='danger'>
                        <Icon type='delete'/>
                        Delete
                    </Button>
                </div>


            </div>
            <div className={s.item_body}>
                <ReactMarkdown source={props.body}/>
            </div>

            <div className={s.bottom}>
                <div className={s.author}>
                    Author:&nbsp;
                    <Link to='#'>
                        {props.author.login}
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