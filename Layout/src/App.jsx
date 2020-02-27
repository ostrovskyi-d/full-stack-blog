import React, {useEffect} from 'react';
import s from './App.module.scss';
import HeaderContainer from './components/Header/HeaderContainer'
import FooterContainer from './components/Footer/FooterContainer'
import MainRoutesContainer from "./components/Main/MainRoutesContainer";
import {initializeApp} from "./redux/common-app-reducer";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader";


const App = (props) => {
    const {
        initializeApp,
        initialized,
        // isFetching
    } = props;
    useEffect(() => {
        initializeApp();
    }, [initializeApp, initialized]);

    if (!initialized) return <Preloader/>;
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
        initialized: state.common.initialized,
        isFetching: state.common.isFetching
    }
};

export default connect(mapStateToProps, {initializeApp})(App);