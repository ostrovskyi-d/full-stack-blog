import React from "react";
import {Route} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import {connect} from "react-redux";
import {initializeApp} from "../../redux/app-reducer";
import {Pagination} from "antd";

const MainRoutesContainer = (props) => {
    // MOCK
    const pagination = {
        totalPages: 50,
        current: 1
    };
    const onPaginatorChange = (e) => {
        console.log(`SEND_PAGE_NUMBER:${e}`)
    };
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>
                    <Route exact path={'/'} render={() => <PostsContainer/>}/>
                    <Pagination onChange={onPaginatorChange} defaultCurrent={pagination.current} total={pagination.totalPages}/>
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