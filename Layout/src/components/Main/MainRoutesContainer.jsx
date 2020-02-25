import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import {connect} from "react-redux";
import {initializeApp} from "../../redux/common-app-reducer";
import FullPost from "../Posts/FullPost/FullPost";
import Home from "../Newest/Newest";
import ProfileContainer from "../Profile/ProfileContainer";
import PostAdd from "../Posts/PostAdd/PostAdd";

const MainRoutesContainer = (props) => {
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>

                    <Route exact strict path={`/`} render={() => <Home/>}/>
                    <Route path={`/post/add`} render={() => <PostAdd/> }/>
                    <Route path={`/posts/:postName`} render={() => <FullPost/>}/>
                    <Route path={`/archive/:page`} render={() => <PostsContainer/>}/>
                    <Route path={`/users/:userName`} render={() => <ProfileContainer />} />
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