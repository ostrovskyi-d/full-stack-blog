import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import FullPost from "../Posts/FullPost/FullPost";
import PostAddContainer from "../Posts/PostAdd/PostAddContainer";
import Home from "../Newest/Newest";
import ProfileContainer from "../Profile/ProfileContainer";

const MainRoutesContainer = (props) => {
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>

                    <Route exact strict path={`/`} render={() => <Home/>}/>
                    <Route path={`/post/add`} render={() => <PostAddContainer/> }/>
                    <Route path={`/posts/:postName`} render={() => <FullPost/>}/>
                    <Route path={`/archive/:page`} render={() => <PostsContainer/>}/>
                    <Route path={`/users/:userName`} render={() => <ProfileContainer />} />
                </div>
                <Sidebar/>
            </div>
        </main>
    )
};




export default MainRoutesContainer;