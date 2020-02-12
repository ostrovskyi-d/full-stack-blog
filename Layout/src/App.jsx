import React from 'react';
import s from './App.module.scss';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'
import Main from "./components/Main/Main";
import Post from "./components/Posts/Post";
import PostAddForm from "./components/Posts/PostAddForm";
import Paginator from "./components/common/Paginator";
import {Route} from "react-router-dom"

const App = () => {
    return (
        <div className={s.wrapper}>
            <Header/>
            <Main/>

            <Footer/>
        </div>
    );
};

export default App;
