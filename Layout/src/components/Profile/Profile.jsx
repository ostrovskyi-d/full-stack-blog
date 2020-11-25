import React from "react";
import s from './Profile.module.scss';
import PostItem from "../Posts/PostItem/PostItem";
import {Empty, Button, Avatar} from 'antd';
import {  withRouter } from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const Profile = props => {

    const { userProfile, history } = props;
    const { login, posts } = userProfile;

    return (
        <>
            <section className={s.data}>

                <div className={s.profileInfo}>
                    {/*<span>Profile</span>*/}
                    <div className={s.avaLogin}>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <h2>{login.toUpperCase()}</h2>
                        <h3>Posts: ({posts.length})</h3>
                        <span>....</span>
                    </div>


                </div>


            </section>
            <section className={s.posts}>

                {posts.length !== 0 ? posts.map(post =>
                    <PostItem
                        {...post}
                        key={post.id}
                        url={`/posts/${post.url}`}
                        showAuthor={false}
                    />)
                    : <Empty
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                No posts yet
                            </span>
                        }
                    >
                        <Button onClick={() => history.push('/post/add')} type="primary">Create Post</Button>
                    </Empty>
                }
            </section>
        </>
    )


};

export default withRouter(Profile);
