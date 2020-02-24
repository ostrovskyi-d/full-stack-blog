import React from "react";
import ReactJson from 'react-json-view';
import s from './Profile.module.scss';
import PostItem from "../Posts/PostItem/PostItem";

const Profile = props => {
    debugger
    const { userProfile } = props;
    const {login, posts} = userProfile;

    return (
        <>
            <section className={s.data}>
                <h2>{login.toUpperCase()}</h2>
                <h3>Total author posts: ({posts.length})</h3>
            </section>
            <section className={s.posts}>

                {posts.map(post =>
                    <PostItem
                        {...post}
                        key={post.id}
                        url={`/posts/${post.url}`}
                        showAuthor={false}
                    />)
                }
            </section>
        </>
    )


};

export default Profile;