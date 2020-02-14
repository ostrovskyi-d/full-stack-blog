import React, {useEffect} from 'react';
import s from './App.module.scss';
import HeaderContainer from './components/Header/HeaderContainer'
import FooterContainer from './components/Footer/FooterContainer'
import MainRoutesContainer from "./components/Main/MainRoutesContainer";
import {initializeApp} from "./redux/app-reducer";
import {connect} from "react-redux";
import {getMyUserDataTC} from "./redux/auth-reducer";



const App = (props) => {
    const {initializeApp} = props;
    useEffect(() => {
        initializeApp();
        getMyUserDataTC();
    }, [initializeApp]);

    return (
        <div className={s.wrapper}>
            <HeaderContainer/>
            <MainRoutesContainer/>
            <FooterContainer/>
        </div>
    );
};


export default connect(null, {initializeApp,getMyUserDataTC})(App);