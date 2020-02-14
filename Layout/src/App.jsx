import React, {useEffect} from 'react';
import s from './App.module.scss';
import HeaderContainer from './components/Header/HeaderContainer'
import FooterContainer from './components/Footer/FooterContainer'
import MainRoutesContainer from "./components/Main/MainRoutesContainer";
import {initializeApp} from "./redux/app-reducer";
import {connect} from "react-redux";
import {getMyUserDataTC} from "./redux/auth-reducer";
import Preloader from "./components/common/Preloader";


const App = (props) => {
    const {initializeApp, getMyUserDataTC, initialized} = props;

    useEffect(() => {
        getMyUserDataTC();
        initializeApp();
    }, [initializeApp, initialized, getMyUserDataTC]);

    if (!initialized) return <Preloader/>
    else return (
        <div className={s.wrapper}>
            <HeaderContainer/>
            <MainRoutesContainer/>
            <FooterContainer/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        initialized: state.init.initialized
    }
};

export default connect(mapStateToProps, {initializeApp, getMyUserDataTC})(App);