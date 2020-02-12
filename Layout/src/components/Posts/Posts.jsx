import React from "react";
import s from "../Main/Main.module.scss";
import Post from "./Post";

const Posts = () => {
    return (
        <div className={s.content}>
            <Post />
        </div>
    )
};

export default Posts;