import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import {connect} from "react-redux";
import {initializeApp} from "../../redux/app-reducer";
import {getMyUserDataTC} from "../../redux/auth-reducer";
import {isFetching} from "../../redux/posts-reducer";
import Preloader from "../common/Preloader";

const MainRoutesContainer = (props) => {

    return (
        <main className={s.main}>
            {
                !props.isFetching
                    ? <div className={s.container}>
                        <div className={s.content}>
                            <Route exact path={'/'} render={() => <PostsContainer/>}/>
                        </div>
                        <Sidebar/>
                      </div>
                    : <Preloader/>
            }


        </main>
    )
};


const mapStateToProps = (state) => {
    console.log(state);
    return {
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {initializeApp, getMyUserDataTC})(MainRoutesContainer);