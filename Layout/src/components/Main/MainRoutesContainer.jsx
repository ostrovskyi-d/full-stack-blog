import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'

const MainRoutesContainer = (props) => {
    // debugger
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>
                    <Route exact path={'/'} render={() => <PostsContainer />}/>
                </div>
                <Sidebar/>
            </div>

        </main>
    )
};


export default MainRoutesContainer;