import React from "react";
import s from "./PostItem.module.css";
import {Link, NavLink} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import {Avatar, Button} from "antd";


const PostItem = (props) => {

    return (
        <div className={s.post_item}>

            <div className={s.top}>

                <h2>
                    <NavLink to={props.url}>
                        {props.title}
                    </NavLink>
                </h2>
                <div className={s.buttons}>
                    <Button
                        icon='edit'
                        size='default'
                        shape='circle-outline'
                        type='primary'
                    />
                    <Button
                        icon='delete'
                        size='default'
                        shape='circle-outline'
                        type='danger'
                    />
                </div>


            </div>
            <div className={s.item_body}>
                <ReactMarkdown source={props.body}/>
            </div>

            <section className={s.bottom}>
                {props.showAuthor ? <RenderAuthor {...props}/> : null}

                <div className={s.timestamp}>
                    {/*Created at:&nbsp;*/}
                    <Link to='#'>
                        {props.createdAt}
                    </Link>
                </div>
                <div className={s.comments}>
                    <Link to='#'>Comments</Link>
                </div>
            </section>
        </div>
    )
};
const RenderAuthor = props => (
    <div className={s.author}>
        <Link className={s.author_link} to={`/users/${props.author.login}`}>
            <Avatar className={s.author_link_avatar} size='small' icon='user'/>
            <span className={s.author_link_name}>
                 {props.author.login}
            </span>
        </Link>
    </div>
)
export default PostItem;