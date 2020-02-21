import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import {connect} from "react-redux";
import {initializeApp} from "../../redux/app-reducer";
import FullPost from "../Posts/Post/FullPost";
import PostAddContainer from "../Posts/PostAddContainer";
import Home from "../Home/Home";

const MainRoutesContainer = (props) => {
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>

                    <Route exact strict path={`/`} render={() => <Home/>}/>
                    <Route path={`/post/add`} render={() => <PostAddContainer/> }/>
                    <Route path={`/posts/:postName`} render={() => <FullPost/>}/>
                    <Route path={`/archive/:page`} render={() => <PostsContainer/>}/>
                </div>
                <Sidebar/>
            </div>
        </main>
    )
};


const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuthorised,
    }
};

export default connect(mapStateToProps, {initializeApp})(MainRoutesContainer);