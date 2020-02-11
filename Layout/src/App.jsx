import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'
import Main from "./components/Main/Main";
import Post from "./components/Post/Post";
import PostAddForm from "./components/Post/PostAddForm";
import Paginator from "./components/Common/Paginator";
import { Route } from "react-router-dom"

const App = () => {
    return (
        <div className="wrapper">
            <Header />
                <div className="mainWrapper">
                    <Route path={`/`} render={() => <Main />}/>
                    <Route path={`/post`} render={() => <Post />}/>
                    <Sidebar />
                    <Footer />
                </div>

        </div>
    );
};

export default App;
