import React, {useEffect} from 'react';
import s from './App.module.scss';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from "./components/Main/Main";
import {getMyUserDataThunkCreator} from "./redux/app-reducer";
import {connect} from "react-redux";
import postsReducer, {getAllPostsTC} from "./redux/posts-reducer";
import Preloader from "./components/common/Preloader";


const App = (props) => {
    useEffect(() => {
        props.getUserData();
        props.getPostsData();
    }, []);


    return (
        <div className={s.wrapper}>
            <Header/>
            {props.posts.isFetching ? <Preloader /> : <Main {...props}/>}
            <Footer/>
        </div>
    );
};
let mapStateToProps = (state) => {
    return {
        posts: state.postsReducer
    }
};
let mapDispatchToProps = {
    getUserData: getMyUserDataThunkCreator,
    getPostsData: getAllPostsTC
};

export default connect(mapStateToProps, mapDispatchToProps)(App);