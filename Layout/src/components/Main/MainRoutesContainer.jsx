import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import {connect} from "react-redux";
import {initializeApp} from "../../redux/app-reducer";
import PostAddForm from "../Posts/PostAddForm";
import FullPost from "../Posts/Post/FullPost";

const MainRoutesContainer = (props) => {
    // MOCK

    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>
                    <Route exact path={'/'} render={() => <PostsContainer/>}/>
                    <Route path={`/post/add`} render={() => <PostAddForm />} />
                    <Route path={`/posts/:postName`} render={() => <FullPost />} />
                </div>
                <Sidebar/>
            </div>
        </main>
    )
};


const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {initializeApp})(MainRoutesContainer);