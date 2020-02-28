import React from "react";
import s from "./PostItem.module.scss";
import { Link, NavLink } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { Avatar, Button } from "antd";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
// import ReactJson from 'react-json-view';


const PostItem = (props) => {

    // const { author } = props;
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
                        icon={<EditOutlined />}
                        size='default'
                        shape='circle-outline'
                        type='primary'
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        size='default'
                        shape='circle-outline'
                        type='danger'
                    />
                </div>


            </div>
            <div className={s.item_body}>
                <ReactMarkdown source={props.body} />
            </div>

            <section className={s.bottom}>
                {props.renderAuthor && <RenderAuthor  {...props} />}
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

const RenderAuthor = props => {
    if (props.author) {
        return (
            <div className={s.author}>
                <Link className={s.author_link} to={`/users/${props.author.login}`}>
                    <Avatar className={s.author_link_avatar} icon={<UserOutlined />} size='small' />
                    <span className={s.author_link_name}>
                        {props.author.login}
                    </span>
                </Link>
            </div>
        )
    } else return <div className={s.author}>
            Maybe Hacker
        </div>
}
export default PostItem;
