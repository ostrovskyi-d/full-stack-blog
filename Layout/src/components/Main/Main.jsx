import React from "react";
import Sidebar from '../Sidebar/Sidebar'
import Post from '../Posts/Post'
import PostAddForm from '../Posts/PostAddForm'
import Paginator from '../common/Paginator'
import s from './Main.module.scss'
import Posts from "../Posts/Posts";
import {Route, Router} from "react-router-dom"

const Main = (props) => {
    // debugger
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>
                    <Route path={`/post/add`} render={() => <PostAddForm/>}/>
                    <Route exact path={`/`} render={() => <Posts {...props.posts}/>}/>
                </div>

                <Sidebar/>
            </div>
        </main>
    )
};


export default Main;