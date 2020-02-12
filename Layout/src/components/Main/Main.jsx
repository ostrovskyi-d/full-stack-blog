import React from "react";
import Sidebar from '../Sidebar/Sidebar'
import Post from '../Posts/Post'
import PostAddForm from '../Posts/PostAddForm'
import Paginator from '../common/Paginator'
import s from './Main.module.scss'
import Posts from "../Posts/Posts";

const Main = () => {
    const renderPostPage = true;
    return (
        <main className={s.main}>
            <div className={s.container}>
                <Posts />
                <Sidebar />
            </div>
        </main>
    )
};


export default Main;